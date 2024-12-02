<template>
    <div class="pt-4 w-100 flex-grow-1 d-flex flex-column">
        <div class="mb-4 text-d-xs font-weight-bold">
            닉네임을 설정해주세요.
        </div>

        <v-text-field
            v-model="inputUserName.value.value"
            type="text"
            variant="outlined"
            name="user_name"
            placeholder="닉네임"
            hide-details
            class="mb-2-5 flex-grow-0"
        >
            <template v-slot:prepend-inner>
                <v-icon icon="mdi-account" />
            </template>
        </v-text-field>

        <v-text-field
            v-model="inputReferralCode.value.value"
            type="number"
            variant="outlined"
            name="referral_code"
            placeholder="추천코드 (선택)"
            hide-details
            class="mb-10 flex-grow-0"
        >
            <template v-slot:prepend-inner>
                <v-icon icon="mdi-check" />
            </template>
        </v-text-field>

        <v-divider class="mb-10" />

        <div class="mb-4 text-d-xs font-weight-bold">
            서비스 이용에 동의해주세요.
        </div>

        <v-checkbox
            v-model="allTerms"
            class="border rounded-lg px-3-5 mb-2 font-weight-bold text-t-md background-secondary"
            label="필수 약관 모두 동의"
            true-icon="mdi-check-circle"
            false-icon="mdi-check-circle"
            hide-details
            color="primary"
            @update:modelValue="checkboxGroupServiceTerms.event.onChangeAllTerms"
        />

        <v-checkbox
            v-model="checkboxGroupServiceTerms.value.value"
            value="terms"
            true-icon="mdi-check-circle"
            false-icon="mdi-check-circle"
            hide-details
            class="px-2-5"
            color="primary"
        >
            <template v-slot:label>
                <div class="d-flex flex-grow-1">
                    <div class="text-t-md font-weight-medium">
                        이용약관 (필수)
                    </div>

                    <v-btn
                        class="ml-auto flex-grow-0"
                        icon
                        variant="text"
                        width="20"
                        height="20"
                        @click="checkboxGroupServiceTerms.event.onClickChevron"
                    >
                        <v-img
                            src="/icons/IconChevronRight.svg"
                            width="20"
                            height="20"
                        ></v-img>
                    </v-btn>
                </div>
            </template>
        </v-checkbox>

        <v-checkbox
            v-model="checkboxGroupServiceTerms.value.value"
            value="service"
            true-icon="mdi-check-circle"
            false-icon="mdi-check-circle"
            hide-details
            class="px-2-5"
            color="primary"
        >
            <template v-slot:label>
                <div class="d-flex flex-grow-1">
                    <div class="text-t-md font-weight-medium">
                        위치기반 서비스 이용약관 (필수)
                    </div>

                    <v-btn
                        class="ml-auto flex-grow-0"
                        icon
                        variant="text"
                        width="20"
                        height="20"
                        @click="checkboxGroupServiceTerms.event.onClickChevron"
                    >
                        <v-img
                            src="/icons/IconChevronRight.svg"
                            width="20"
                            height="20"
                        ></v-img>
                    </v-btn>
                </div>
            </template>
        </v-checkbox>

        <v-checkbox
            v-model="checkboxGroupServiceTerms.value.value"
            value="privacy"
            true-icon="mdi-check-circle"
            false-icon="mdi-check-circle"
            hide-details
            class="px-2-5"
            color="primary"
        >
            <template v-slot:label>
                <div class="d-flex flex-grow-1">
                    <div class="text-t-md font-weight-medium">
                        개인정보처리방침 (필수)
                    </div>

                    <v-btn
                        class="ml-auto flex-grow-0"
                        icon
                        variant="text"
                        width="20"
                        height="20"
                        @click="checkboxGroupServiceTerms.event.onClickChevron"
                    >
                        <v-img
                            src="/icons/IconChevronRight.svg"
                            width="20"
                            height="20"
                        ></v-img>
                    </v-btn>
                </div>
            </template>
        </v-checkbox>

        <v-checkbox
            v-model="checkboxGroupServiceTerms.value.value"
            value="age"
            true-icon="mdi-check-circle"
            false-icon="mdi-check-circle"
            hide-details
            class="px-2-5"
            color="primary"
        >
            <template v-slot:label>
                <div class="d-flex flex-grow-1">
                    <div class="text-t-md font-weight-medium">
                        만 14세 이상입니다. (필수)
                    </div>

                    <v-btn
                        class="ml-auto flex-grow-0"
                        icon
                        variant="text"
                        width="20"
                        height="20"
                        @click="checkboxGroupServiceTerms.event.onClickChevron"
                    >
                        <v-img
                            src="/icons/IconChevronRight.svg"
                            width="20"
                            height="20"
                        ></v-img>
                    </v-btn>
                </div>
            </template>
        </v-checkbox>

        <v-checkbox
            v-model="checkboxGroupServiceTerms.value.value"
            value="marketing"
            true-icon="mdi-check-circle"
            false-icon="mdi-check-circle"
            hide-details
            class="px-2-5"
            color="primary"
        >
            <template v-slot:label>
                <div class="d-flex flex-grow-1">
                    <div class="text-t-md font-weight-medium">
                        마케팅 목적에 개인정보 수집 및 이용동의 (선택)
                    </div>

                    <v-btn
                        class="ml-auto flex-grow-0"
                        icon
                        variant="text"
                        width="20"
                        height="20"
                        @click="checkboxGroupServiceTerms.event.onClickChevron"
                    >
                        <v-img
                            src="/icons/IconChevronRight.svg"
                            width="20"
                            height="20"
                        ></v-img>
                    </v-btn>
                </div>
            </template>
        </v-checkbox>

        <v-checkbox
            v-model="checkboxGroupServiceTerms.value.value"
            value="cookie"
            true-icon="mdi-check-circle"
            false-icon="mdi-check-circle"
            hide-details
            class="px-2-5"
            color="primary"
        >
            <template v-slot:label>
                <div class="d-flex flex-grow-1">
                    <div class="text-t-md font-weight-medium">
                        쿠키 수집동의 (옵션선택) (GDPR / CPRA)
                    </div>

                    <v-btn
                        class="ml-auto flex-grow-0"
                        icon
                        variant="text"
                        width="20"
                        height="20"
                        @click="checkboxGroupServiceTerms.event.onClickChevron"
                    >
                        <v-img
                            src="/icons/IconChevronRight.svg"
                            width="20"
                            height="20"
                        ></v-img>
                    </v-btn>
                </div>
            </template>
        </v-checkbox>

        <v-spacer />

        <v-btn
            variant="tonal"
            size="x-large"
            class="primary flex-grow-0"
            block
            :disabled="!inputUserName.value.value ||
                !checkboxGroupServiceTerms.value.value.includes('terms') ||
                !checkboxGroupServiceTerms.value.value.includes('service') ||
                !checkboxGroupServiceTerms.value.value.includes('privacy') ||
                !checkboxGroupServiceTerms.value.value.includes('age')"
            @click="buttonNext.event.onClick"
        >
            확인
        </v-btn>

        <Cookie_settings
            v-model:modelValue="dialogTermsOfService.value.value"
            v-model:termsValues="checkboxGroupServiceTerms.value.value"
            @click:allTerms="checkboxGroupServiceTerms.event.onChangeAllTerms"
        />
    </div>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
    (e: 'onClickNext', id: any): void // 국가코드 반환
}>()

const props = defineProps<{
    defaultValue?: any
}>();

onMounted(() => {
    if(!props.defaultValue.results.user_name) return;
    inputUserName.value.value = props.defaultValue.results.user_name;
    inputReferralCode.value.value = props.defaultValue.results.referral_code;
    checkboxGroupServiceTerms.value.value = props.defaultValue.results.service_terms;
})

const allTerms = ref(false);

const serviceTermsItems = [
    "terms",
    "service",
    "privacy",
    "age",
    "marketing",
    "cookie",
];

const inputUserName = {
    value: ref(''),
    rules: [
        (v: string) => !!v || 'User Name is required',
    ],
};

const inputReferralCode = {
    value: ref(''),
};

const checkboxGroupServiceTerms = {
    value: ref<string[]>([]),
    event: {
        onChangeAllTerms: (_event: boolean) => {
            if (_event) {
                checkboxGroupServiceTerms.value.value = serviceTermsItems;
            } else {
                checkboxGroupServiceTerms.value.value = [];
            }
        },

        onClickChevron: () => {
            dialogTermsOfService.value.value = true;
        },
    },
};

const buttonNext = {
    event: {
        onClick: () => {
            if (!inputUserName.value.value) return;
            if (!checkboxGroupServiceTerms.value.value.includes('terms') ||
                !checkboxGroupServiceTerms.value.value.includes('service') ||
                !checkboxGroupServiceTerms.value.value.includes('privacy')) return;

            emit('onClickNext', {
                user_name: inputUserName.value.value,
                referral_code: inputReferralCode.value.value || null,
                service_terms: checkboxGroupServiceTerms.value.value,
            });
        }
    }
}

const dialogTermsOfService = {
    value: ref(false),
}

watch(
    checkboxGroupServiceTerms.value,
    (_event) => {
        if(_event.length === serviceTermsItems.length) {
            allTerms.value = true;
        } else {
            allTerms.value = false;
        }
    }
)

</script>

<style scoped>
.ga-3-5 {
    gap: 14px;
}

.mb-2-5 {
    margin-bottom: 10px;
}

.px-2-5 {
    padding-left: 10px;
    padding-right: 10px;
}

.px-3-5 {
    padding-left: 14px;
    padding-right: 14px;
}
</style>