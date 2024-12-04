<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                전화번호 변경
            </span>
        </div>

        <div class="pt-5 px-4 w-100 flex-grow-1 d-flex flex-column">
            <v-text-field
                v-model="phoneNumber"
                type="tel"
                variant="outlined"
                name="phone"
                placeholder="010 - 0000 - 0000"
                class="mb-1 flex-grow-0 pr-0"
                :class="{ 'v-input--success': isPhoneValid }"
                :messages="isPhoneValid ? '올바른 전화번호 형식입니다.' : ''"
                :error-messages="errorMessages"
                @input="formatPhoneNumber"
            >
            </v-text-field>
        </div>

        <v-spacer />

        <div class="pt-4 px-2-5 pb-8">
            <v-btn
                variant="tonal"
                size="x-large"
                class="primary flex-grow-0"
                block
                :disabled="!isPhoneValid"
                @click="onSubmit"
            >
                전화번호 변경
            </v-btn>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const router = useRouter();
// 전화번호 입력 상태
const phoneNumber = ref('');
const errorMessages = ref('');

// 유효성 검사
const isPhoneValid = computed(() => {
    // 전화번호 형식 정규식 (010-0000-0000)
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(phoneNumber.value);
});

// 전화번호 형식 자동 변환
const formatPhoneNumber = () => {
    let rawNumber = phoneNumber.value.replace(/[^0-9]/g, ''); // 숫자만 추출
    if (rawNumber.length <= 3) {
        phoneNumber.value = rawNumber;
    } else if (rawNumber.length <= 7) {
        phoneNumber.value = `${rawNumber.slice(0, 3)}-${rawNumber.slice(3)}`;
    } else {
        phoneNumber.value = `${rawNumber.slice(0, 3)}-${rawNumber.slice(3, 7)}-${rawNumber.slice(7, 11)}`;
    }
    errorMessages.value = isPhoneValid.value ? '' : '유효한 전화번호를 입력해 주세요.';
};

// 제출 버튼 클릭 핸들러
const onSubmit = () => {
    if (!isPhoneValid.value) {
        errorMessages.value = '전화번호를 올바르게 입력해 주세요.';
        return;
    }

    router.push("/dashboard/profile/phone/pass");
    // alert(`전화번호 ${phoneNumber.value}가 제출되었습니다.`);
};
</script>