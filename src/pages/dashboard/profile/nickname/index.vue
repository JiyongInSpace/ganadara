<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                닉네임 변경
            </span>
        </div>

        <div class="pt-5 px-4 w-100 flex-grow-1 d-flex flex-column">
            <v-text-field
                v-model="inputValidationNickname.value.value"
                variant="outlined"
                name="code"
                placeholder="닉네임 입력"
                validate-on="blur"
                class="mb-1 flex-grow-0 pr-0"
                :class="{ 'v-input--success': inputValidationNickname.isValid.value }"
                :messages="inputValidationNickname.isValid.value ? '닉네임 사용이 가능합니다.' : ''"
                :error-messages="inputValidationNickname.errorMessages.value"
                :readonly="inputValidationNickname.isValid.value"
                @input="inputValidationNickname.event.onInput"
            >
                <template v-slot:append-inner>
                    <v-icon
                        v-if="inputValidationNickname.errorMessages.value"
                        icon="mdi-alert-circle-outline"
                        size="small"
                        class="mr-2"
                    />

                    <v-btn
                        size="large"
                        variant="outlined"
                        class="rounded-s-0 rounded-e-lg"
                        :disabled="!inputValidationNickname.value.value || inputValidationNickname.isValid.value"
                        @click="inputValidationNickname.event.onClick"
                    >
                        중복 확인
                    </v-btn>
                </template>
            </v-text-field>
        </div>

        <v-spacer />

        <div class="pt-4 px-2-5 pb-8">
            <v-btn
                variant="tonal"
                size="x-large"
                class="primary flex-grow-0"
                block
                :disabled="!inputValidationNickname.isValid.value"
                @click="inputValidationNickname.event.onClick"
            >
                확인
            </v-btn>
        </div>
    </v-container>

</template>

<script lang="ts" setup>

const emit = defineEmits<{
    (e: 'onClickNext', id: any): void // 국가코드 반환
}>()

const props = defineProps<{
    defaultValue?: any
}>();

const inputValidationNickname = {
    value: ref(''),
    isValid: ref(false),
    rules: [
        (v: string) => !!v || 'Validation code is required',
    ],
    errorMessages: ref(''),
    event: {
        onInput: () => {
            inputValidationNickname.errorMessages.value = '';
        },
        onClick: (_event: any) => {
            // 이메일 인증번호 확인 =================
            _event.preventDefault();

            // 에러발생
            const emailVerifyResult = true;

            if (!emailVerifyResult) {
                // 오류 발생시 에러메시지 표시
                inputValidationNickname.errorMessages.value = '닉네임 사용이 불가능합니다.';
                return;
            } else {
                // 이메일 확인 성공시
                inputValidationNickname.errorMessages.value = '';
                inputValidationNickname.isValid.value = true;
            }
            // =================================
        }
    },
};
</script>

<style lang="scss" scoped>
:deep(.v-field--appended) {
    padding-right: 0px;
}
</style>