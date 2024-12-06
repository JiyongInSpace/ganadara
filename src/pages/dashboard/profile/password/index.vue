<template>
    <PageTemplate pre-close-button>
        <template v-slot:center-header>
            비밀번호 재설정
        </template>

        <template v-slot:content>
            <v-text-field
                v-model="currentPassword.value.value"
                class="flex-grow-0 mb-2-5"
                :class="{ 'v-input--success': currentPassword.isValid.value }"
                hide-details
                variant="outlined"
                name="currentPassword"
                placeholder="현재 비밀번호를 입력하세요"
                :rules="currentPassword.rules"
                :type="currentPassword.type.value"
                :append-inner-icon="currentPassword.type.value === 'password' ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click:append-inner="togglePasswordVisibility(currentPassword)"
            />

            <!-- 새 비밀번호 -->
            <v-text-field
                v-model="newPassword.value.value"
                class="flex-grow-0 mb-2-5"
                :class="{ 'v-input--success': newPassword.isValid.value }"
                variant="outlined"
                name="newPassword"
                placeholder="새 비밀번호를 입력하세요"
                :rules="newPassword.rules"
                :type="newPassword.type.value"
                messages="비밀번호를 입력해 주세요. (영문+숫자+특수문자 조합 8~32자)"
                :append-inner-icon="newPassword.type.value === 'password' ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @input="validateNewPassword"
                @click:append-inner="togglePasswordVisibility(newPassword)"
            />

            <!-- 새 비밀번호 확인 -->
            <v-text-field
                v-model="confirmPassword.value.value"
                class="flex-grow-0"
                :class="{ 'v-input--success': confirmPassword.isValid.value }"
                variant="outlined"
                name="confirmPassword"
                placeholder="새 비밀번호를 한 번 더 입력해 주세요"
                :rules="confirmPassword.rules"
                :type="confirmPassword.type.value"
                :append-inner-icon="confirmPassword.type.value === 'password' ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @input="validateConfirmPassword"
                @click:append-inner="togglePasswordVisibility(confirmPassword)"
            />
        </template>

        <template v-slot:actions>
            <div class="pt-4 px-2-5 pb-8">
                <v-btn
                    variant="tonal"
                    size="x-large"
                    class="primary flex-grow-0"
                    block
                    :disabled="!allFieldsValid"
                    @click="onSubmit"
                >
                    확인
                </v-btn>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

// 정규식: 영문+숫자+특수문자 조합 8~32자
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,32}$/;

// 현재 비밀번호
const currentPassword = {
    value: ref(""),
    type: ref("password"),
    isValid: ref(false),
    rules: [
        (v: string) => !!v || "현재 비밀번호를 입력해 주세요.",
    ],
};

// 새 비밀번호
const newPassword = {
    value: ref(""),
    type: ref("password"),
    isValid: ref(false),
    rules: [
        (v: string) =>
            !!v || "새 비밀번호를 입력해 주세요. (영문+숫자+특수문자 조합 8~32자)",
        (v: string) =>
            passwordRegex.test(v) ||
            "영문+숫자+특수문자 조합 8~32자로 입력해 주세요.",
    ],
};

// 새 비밀번호 확인
const confirmPassword = {
    value: ref(""),
    type: ref("password"),
    isValid: ref(false),
    rules: [
        (v: string) => !!v || "비밀번호 확인을 입력해 주세요.",
        (v: string) =>
            v === newPassword.value.value || "비밀번호가 일치하지 않습니다.",
    ],
};

// 비밀번호 보기 토글
const togglePasswordVisibility = (passwordField: any) => {
    passwordField.type.value =
        passwordField.type.value === "password" ? "text" : "password";
};

// 새 비밀번호 유효성 검사
const validateNewPassword = () => {
    newPassword.isValid.value = passwordRegex.test(newPassword.value.value);
    validateConfirmPassword();
};

// 새 비밀번호 확인 유효성 검사
const validateConfirmPassword = () => {
    confirmPassword.isValid.value =
        newPassword.value.value === confirmPassword.value.value;
};

// 모든 필드의 유효성 검사
const allFieldsValid = computed(() => {
    return (
        currentPassword.value.value.length > 0 &&
        newPassword.isValid.value &&
        confirmPassword.isValid.value
    );
});

// 제출 핸들러
const onSubmit = () => {
    console.log("현재 비밀번호:", currentPassword.value.value);
    console.log("새 비밀번호:", newPassword.value.value);
};
</script>