<template>
    <PageTemplate
        space="pa-0"
        back-button
        background="secondary"
        no-spacer
    >
        <template v-slot:center-header>
            결제 수단 등록
        </template>

        <template v-slot:content>
            <v-card
                class="pt-5 px-4 pb-8"
                flat
            >
                <div class="border border-border-secondary background-secondary rounded-12">
                    <div class="pt-2 px-5 border-b">
                        <div class="font-weight-bold">
                            카드 번호
                        </div>

                        <div>
                            <v-text-field
                                v-model="state.cardNumber"
                                variant="solo"
                                flat
                                placeholder="카드 번호 ‘-’ 없이 입력"
                                class="xs"
                                density="compact"
                                hide-details
                                maxlength="16"
                                @input="validateCardNumber"
                            />
                        </div>
                    </div>

                    <div class="d-flex border-b">
                        <div class="flex-1-1-100 pt-2 px-5 border-e">
                            <div class="font-weight-bold">
                                유효기간
                            </div>

                            <div>
                                <v-text-field
                                    v-model="state.expirationDate"
                                    variant="solo"
                                    flat
                                    placeholder="MMYY"
                                    class="xs"
                                    density="compact"
                                    hide-details
                                    maxlength="4"
                                    @input="validateExpirationDate"
                                />
                            </div>
                        </div>

                        <div class="flex-1-1-100 pt-2 px-5">
                            <div class="font-weight-bold">
                                CVC
                            </div>

                            <div>
                                <v-text-field
                                    v-model="state.cvc"
                                    variant="solo"
                                    flat
                                    placeholder="뒷면 숫자 3자리"
                                    class="xs"
                                    density="compact"
                                    hide-details
                                    maxlength="3"
                                    @input="validateCVC"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="pt-2 px-5">
                        <div class="font-weight-bold">
                            카드 비밀번호
                        </div>

                        <div>
                            <v-text-field
                                v-model="state.cardPassword"
                                variant="solo"
                                flat
                                placeholder="비밀번호 앞 2자리 숫자"
                                class="xs"
                                density="compact"
                                hide-details
                                maxlength="2"
                                type="password"
                                @input="validateCardPassword"
                            />
                        </div>
                    </div>
                </div>
            </v-card>

            <v-card
                class="pt-5 px-4 pb-8 flex-grow-1"
                flat
            >
                <v-checkbox
                    v-model="allTerms"
                    class="border rounded-lg px-3-5 mb-2 font-weight-bold text-t-md background-secondary px-3"
                    label="카드 등록을 위한 정보 제공 전체 동의"
                    true-icon="mdi-check-circle"
                    false-icon="mdi-check-circle-outline"
                    hide-details
                    color="primary"
                    @change="checkboxGroupServiceTerms.event.onChangeAllTerms"
                />

                <v-checkbox
                    v-model="checkboxGroupServiceTerms.value.value"
                    value="terms"
                    true-icon="mdi-check-circle"
                    false-icon="mdi-check-circle-outline"
                    hide-details
                    class="px-3"
                    color="primary"
                >
                    <template v-slot:label>
                        <div class="d-flex flex-grow-1">
                            <div class="text-t-md font-weight-medium">
                                결제 서비스를 위한 개인(신용)정보 수집·이용 동의
                            </div>

                            <v-btn
                                class="ml-auto flex-grow-0"
                                icon
                                variant="text"
                                width="20"
                                height="20"
                            >
                                <!-- @click="checkboxGroupServiceTerms.event.onClickChevron" -->
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
                    false-icon="mdi-check-circle-outline"
                    hide-details
                    class="px-3"
                    color="primary"
                >
                    <template v-slot:label>
                        <div class="d-flex flex-grow-1">
                            <div class="text-t-md font-weight-medium">
                                결제 서비스를 위한 개인(신용)정보 제공 동의 (금융사)
                            </div>

                            <v-btn
                                class="ml-auto flex-grow-0"
                                icon
                                variant="text"
                                width="20"
                                height="20"
                            >
                                <!-- @click="checkboxGroupServiceTerms.event.onClickChevron" -->
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
                    false-icon="mdi-check-circle-outline"
                    hide-details
                    class="px-3"
                    color="primary"
                >
                    <template v-slot:label>
                        <div class="d-flex flex-grow-1">
                            <div class="text-t-md font-weight-medium">
                                결제 서비스를 위한 개인(신용)정보 제공 동의 (가나다라)
                            </div>

                            <v-btn
                                class="ml-auto flex-grow-0"
                                icon
                                variant="text"
                                width="20"
                                height="20"
                            >
                                <!-- @click="checkboxGroupServiceTerms.event.onClickChevron" -->
                                <v-img
                                    src="/icons/IconChevronRight.svg"
                                    width="20"
                                    height="20"
                                ></v-img>
                            </v-btn>
                        </div>
                    </template>
                </v-checkbox>
            </v-card>
        </template>

        <template v-slot:actions>
            <div class="pt-4 px-2-5 pb-8">
                <v-btn
                    variant="tonal"
                    size="x-large"
                    class="primary flex-grow-0"
                    block
                    :disabled="!isFormValid"
                    @click="onClickSubmit"
                >
                    등록하기
                </v-btn>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { myPaymentMethods } = storeToRefs(userStore);
const snackbar = useSnackbarStore();
const router = useRouter();

const state = reactive({
    cardNumber: '',
    expirationDate: '',
    cvc: '',
    cardPassword: '',
});

const serviceTermsItems = [
    "terms",
    "service",
    "privacy",
];

const allTerms = ref(false);

const checkboxGroupServiceTerms = {
    value: ref<string[]>([]),
    event: {
        onChangeAllTerms: () => {
            if (allTerms.value) {
                checkboxGroupServiceTerms.value.value = serviceTermsItems;
            } else {
                checkboxGroupServiceTerms.value.value = [];
            }
        },
    },
};

watch(
    checkboxGroupServiceTerms.value,
    (newVal) => {
        // 전체 항목이 체크되었는지 확인
        allTerms.value = newVal.length === serviceTermsItems.length;
    },
    { deep: true } // 배열 내부의 값 변경 감지
);

const isFormValid = computed(() => {
    return (
        state.cardNumber.replace(/\s/g, '').length === 16 &&
        state.expirationDate.length === 4 &&
        state.cvc.length === 3 &&
        state.cardPassword.length === 2 &&
        checkboxGroupServiceTerms.value.value.includes('terms')
    );
});

const onClickSubmit = () => {
    router.push('/dashboard/payment');
    myPaymentMethods.value.push({
        id: myPaymentMethods.value.length + 1,
        name: '카드사명',
        icon: 'mdi-credit-card',
        type: 'credit',
        number: state.cardNumber.slice(0, 4),
        isDefault: myPaymentMethods.value.length === 0,
    });
    snackbar.showSnackbar(`{카드사명}(${state.cardNumber.slice(0, 4)}) 카드를 등록했습니다.`, 100000);
}

const validateCardNumber = () => {
    // 숫자만 입력하고 최대 16자리로 제한
    state.cardNumber = state.cardNumber.replace(/[^0-9]/g, '').slice(0, 16);
};

const validateExpirationDate = () => {
    // 숫자만 입력하고 최대 4자리로 제한
    state.expirationDate = state.expirationDate.replace(/[^0-9]/g, '').slice(0, 4);
};

const validateCVC = () => {
    // 숫자만 입력하고 최대 3자리로 제한
    state.cvc = state.cvc.replace(/[^0-9]/g, '').slice(0, 3);
};

const validateCardPassword = () => {
    // 숫자만 입력하고 최대 2자리로 제한
    state.cardPassword = state.cardPassword.replace(/[^0-9]/g, '').slice(0, 2);
};
</script>


<style lang="scss" scoped>
.text-start-button {
    text-align: start;
    align-self: flex-end;
    display: flex;
    flex-wrap: nowrap;


    :deep(.v-btn__content) {
        display: block;
        width: 100%;
    }
}

:deep(.v-field--variant-solo) {
    background: none;
}

.v-field--variant-solo {
    background: none !important;
}
</style>