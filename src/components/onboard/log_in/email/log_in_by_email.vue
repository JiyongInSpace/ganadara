<template>
    <div class="pt-4 w-100 flex-grow-1 d-flex flex-column">
        <div class="mb-4 text-d-xs font-weight-bold">
            이메일로 로그인해 주세요.
        </div>

        <div class="mb-5 text-t-sm">
            계정 정보를 입력해 주세요.
        </div>

        <v-text-field
            v-model="inputEmail.value.value"
            type="email"
            variant="outlined"
            name="email"
            placeholder="이메일 주소"
            validate-on="blur"
            class="mb-2-5 flex-grow-0"
            :error="inputPassword.errorMessages.value || false"
            @input="inputPassword.errorMessages.value = ''"
            hide-details
        >
            <template v-slot:prepend-inner>
                <v-icon icon="mdi-email-outline" />
            </template>
        </v-text-field>

        <v-text-field
            v-model="inputPassword.value.value"
            class="mb-3 flex-grow-0"
            variant="outlined"
            name="password"
            placeholder="비밀번호"
            :type="inputPassword.type.value"
            :append-inner-icon="inputPassword.type.value == 'password' ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            @click:append-inner="inputPassword.event.onClickEye"
            @input="inputPassword.errorMessages.value = ''"
            :error-messages="inputPassword.errorMessages.value"
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
            :disabled="!inputEmail.value.value || !inputPassword.value.value"
            @click="buttonNext.event.onClick"
        >
            로그인
        </v-btn>

        <div class="d-flex justify-center w-100">
            <v-btn
                variant="text"
                size="small"
                class="my-2 text-decoration-underline"
                @click="buttonFindAccount.event.onClick"
            >
                <!-- to="/onboard/find_email" -->
                계정 정보를 잊으셨나요?
            </v-btn>
        </div>

        <!-- 임시 (시스템 메시지 대용) -->
        <DialogTempFindAccount 
            v-model:dialog="dialogTemp"
        />
        <!-- -------------------- -->
    </div>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
    (e: 'onClickNext', id: string): void // 패스워드 반환
}>()

const router = useRouter();

const inputEmail = {
    value: ref(''),
};


const inputPassword = {
    value: ref(''),
    errorMessages: ref(''),
    type: ref("password"),
    event: {
        onClickEye: () => {
            inputPassword.type.value = inputPassword.type.value === "password" ? "text" : "password";
        },
    }
};


const buttonNext = {
    event: {
        onClick: () => {
            // const emailIsValid = true;

            // if(!emailIsValid) {
            if (inputEmail.value.value != "test@ganadara.com") {
                inputPassword.errorMessages.value = "이메일이나 비밀번호를 확인해 주세요.";
                return;
            }

            alert("HOME!");

            // 로그인후 가는곳
            router.push("/");
        }
    }
}

const buttonFindAccount = {
    event: {
        onClick: () => {
            dialogTemp.value = true;
        }
    }
}


// <!-- 임시 (시스템 메시지 대용) -->
const dialogTemp = ref(false);



</script>

<style scoped lang="scss"></style>