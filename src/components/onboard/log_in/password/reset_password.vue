<template>
    <div class="pt-4 w-100 flex-grow-1 d-flex flex-column">
        <div class="mb-4 text-d-xs font-weight-bold">
            비밀번호를 재설정하세요.
        </div>

        <v-text-field
            v-model="inputPassword.value.value"
            class="mb-3 flex-grow-0"
            :class="{ 'v-input--success': inputPassword.isValid.value }"
            variant="outlined"
            name="password"
            placeholder="비밀번호"
            :messages="inputPassword.isValid.value ? '사용 가능한 비밀번호입니다.': '비밀번호를 입력해 주세요. (영문+숫자+특수문자 조합 8~32자)'"
            :rules="inputPassword.rules"
            :type="inputPassword.type.value"
            :append-inner-icon="inputPassword.type.value == 'password' ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            @input="inputPassword.event.onInput"
            @click:append-inner="inputPassword.event.onClickEye"
        >
            <template v-slot:prepend-inner>
                <v-icon icon="mdi-lock-outline" />
            </template>
        </v-text-field>

        <v-text-field
            v-model="inputPasswordConfirm.value.value"
            class="mb-3 flex-grow-0"
            :class="{ 'v-input--success': inputPasswordConfirm.isValid.value }"
            variant="outlined"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            :messages="inputPasswordConfirm.isValid.value ? '비밀번호가 일치합니다.': '비밀번호를 한 번 더 입력해 주세요.'"
            :rules="inputPasswordConfirm.rules"
            :type="inputPasswordConfirm.type.value"
            :append-inner-icon="inputPasswordConfirm.type.value == 'password' ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            @input="inputPasswordConfirm.event.onInput"
            @click:append-inner="inputPasswordConfirm.event.onClickEye"
        >
            <template v-slot:prepend-inner>
                <v-icon icon="mdi-lock-outline" />
            </template>
        </v-text-field>

        <v-spacer />

        <v-btn
            variant="tonal"
            size="x-large"
            class="primary flex-grow-0"
            block
            :disabled="!inputPassword.isValid.value || !inputPasswordConfirm.isValid.value"
            @click="buttonNext.event.onClick"
        >
            비밀번호 재설정
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
    (e: 'onClickNext', id: any): void // 패스워드 반환
}>()

const props = defineProps<{
    defaultValue?: any
}>();

onMounted(() => {
    if (!props.defaultValue.results.password) return;
    inputPassword.value.value = props.defaultValue.results.password;
    inputPasswordConfirm.value.value = props.defaultValue.results.password;
    inputPassword.isValid.value = passwordRegex.test(inputPassword.value.value);
    inputPasswordConfirm.isValid.value = passwordRegex.test(inputPasswordConfirm.value.value);
})


const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


const inputPassword = {
    value: ref(''),
    isValid: ref(false),
    rules: [
        (v: string) => !!v || '비밀번호를 입력해 주세요. (영문+숫자+특수문자 조합 8~32자)',
        (v: string) => passwordRegex.test(v) || '영문+숫자+특수문자 조합 8~32자로 입력해 주세요.'
    ],
    type: ref("password"),
    event: {
        onClickEye: () => {
            inputPassword.type.value = inputPassword.type.value === "password" ? "text" : "password";
        },
        onInput: () => {
            // 이 함수는 비밀번호가 입력될 때마다 호출됩니다.
            inputPassword.isValid.value = passwordRegex.test(inputPassword.value.value);
        },
    }
};

const inputPasswordConfirm = {
    value: ref(''),
    isValid: ref(false),
    rules: [
        (v: string) => !!v || '비밀번호를 한 번 더 입력해 주세요.',
        (v: string) => v === inputPassword.value.value || '비밀번호가 일치하지 않습니다.'
    ],
    type: ref("password"),
    event: {
        onClickEye: () => {
            inputPasswordConfirm.type.value = inputPasswordConfirm.type.value === "password" ? "text" : "password";
        },
        onInput: () => {
            // 이 함수는 비밀번호가 입력될 때마다 호출됩니다.
            inputPasswordConfirm.isValid.value = (inputPassword.value.value == inputPasswordConfirm.value.value);
        },
    }
};

const buttonNext = {
    event: {
        onClick: () => {
            // if (!inputPassword.value.value) {
            //     // showPasswordRules.value = true;
            // }

            if (inputPassword.value.value !== inputPasswordConfirm.value.value) {
                inputPasswordConfirm.isValid.value = true;
            } else {
                inputPasswordConfirm.isValid.value = false;
            }

            if (inputPassword.isValid.value && !inputPasswordConfirm.isValid.value) {
                emit('onClickNext', { password: inputPassword.value.value });
            }
        }
    }
}

</script>

<style scoped lang="scss">
.mt-0-5 {
    margin-top: 2px;
}
</style>