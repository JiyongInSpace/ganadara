<template>
    <div class="pt-4 w-100 flex-grow-1 d-flex flex-column">
        <div class="mb-1 text-d-xs font-weight-bold">
            이메일을 입력해 주세요.
        </div>

        <div class="mb-5 text-t-sm">
            이메일 인증이 필요합니다.
        </div>

        <v-text-field
            v-model="inputEmail.value.value"
            type="email"
            variant="outlined"
            name="email"
            placeholder="이메일 주소"
            validate-on="blur"
            class="mb-1 flex-grow-0"
            :readonly="isSended"
            :rules="inputEmail.rules"
        >
            <template v-slot:prepend-inner>
                <v-icon icon="mdi-email-outline" />
            </template>
        </v-text-field>

        <v-spacer v-if="!isSended" />

        <v-btn
            v-if="!isSended"
            variant="tonal"
            size="x-large"
            class="primary flex-grow-0"
            block
            :disabled="!isValidEmail"
            @click="buttonNext.event.onClick"
        >
            확인
        </v-btn>

        <div>
            <v-text-field
                v-if="isSended"
                v-model="inputValidationCode.value.value"
                type="number"
                variant="outlined"
                name="code"
                placeholder="인증번호 입력"
                validate-on="blur"
                class="mb-1 flex-grow-0"
                messages="메일을 받지 못하신 경우 스팸메일함을 확인해 주세요."
            >
                <template v-slot:append-inner>
                    <v-btn
                        size="large"
                        variant="outlined"
                        class="rounded-e-lg"
                    >
                        인증 확인
                    </v-btn>
                </template>
            </v-text-field>
        </div>

        <v-spacer v-if="isSended" />

        <v-btn
            v-if="isSended"
            variant="text"
            class="mx-auto text-t-sm text-error px-0 mb-4"
            size="x-small"
            :disabled="countdown > 0"
            @click="buttonResend.event.onClick"
        >
            재전송 (<span v-text="countdown" />)
        </v-btn>

        <v-btn
            v-if="isSended"
            variant="tonal"
            size="x-large"
            class="primary flex-grow-0"
            block
            :disabled="!inputValidationCode.value.value"
            @click="buttonVerify.event.onClick"
        >
            확인
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
    (e: 'onClickNext', id: any): void // 국가코드 반환
}>();

const isSended = ref(false);
const countdown = ref(60);

// ui
const inputEmail = {
    value: ref(''),
    rules: [
        (v: string) => !!v || '이메일 주소를 입력하세요.',
        (v: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(v) || '이메일 주소를 확인하세요.',
    ],
};

const isValidEmail = computed(() => {
    // 모든 규칙을 반복하며 확인
    return inputEmail.rules.every(rule => rule(inputEmail.value.value) === true);
});

const inputValidationCode = {
    value: ref(''),
    rules: [
        (v: string) => !!v || 'Validation code is required',
    ],
};

const buttonNext = {
    event: {
        onClick: () => {
            alert("email is sended")
            isSended.value = true;
            startTimer();
        },
    }
}

const buttonResend = {
    event: {
        onClick: () => {
            // =================================
            // 이메일을 보냅니다.
            alert("email is sended")
            // =================================

            startTimer();
        },
    }
}

const buttonVerify = {
    event: {
        onClick: () => {
            // =================================
            // 이메일을 확인합니다.
            alert("email is verified")
            // =================================

            const emailVerifyResult = true;

            if (emailVerifyResult) {
                clearTimer();
                emit('onClickNext', { email: inputEmail.value.value });
            } else {
                //
            }
        },
    }
}

// mail verification
let timerId = null as any;

const startTimer = () => {
    countdown.value = 60; // 60초로 리셋
    clearTimer();
    timerId = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--;
        } else {
            clearTimer();
        }
    }, 1000);
}

const clearTimer = () => {
    clearInterval(timerId);
}

onUnmounted(() => {
    clearTimer();
});

</script>