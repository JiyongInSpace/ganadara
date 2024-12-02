<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                결제 수단 등록
            </span>
        </div>

        <div class="px-4 py-10">
            <v-card
                variant="outlined"
                class="border-border-secondary background-secondary rounded-12 mb-16"
            >
                <div class="py-2 px-5 border-b">
                    <div class="font-weight-bold mb-0-5">
                        카드 번호
                    </div>

                    <div>
                        <v-text-field
                            v-model="state.cardNumber"
                            variant="solo"
                            flat
                            placeholder="카드 번호 ‘-’ 없이 입력"
                            class="xs"
                            hide-details
                        />
                    </div>
                </div>

                <div class="d-flex border-b">
                    <div class="flex-1-1-100 py-2 px-5 border-e">
                        <div class="font-weight-bold mb-0-5">
                            유효기간
                        </div>

                        <div>
                            <v-text-field
                                v-model="state.expirationDate"
                                variant="solo"
                                flat
                                placeholder="MMYY"
                                class="xs"
                                hide-details
                            />
                        </div>
                    </div>

                    <div class="flex-1-1-100 py-2 px-5">
                        <div class="font-weight-bold mb-0-5">
                            CVC
                        </div>

                        <div>
                            <v-text-field
                                v-model="state.cvc"
                                variant="solo"
                                flat
                                placeholder="뒷면 숫자 3자리"
                                class="xs"
                                hide-details
                            />
                        </div>
                    </div>
                </div>

                <div class="py-2 px-5">
                    <div class="font-weight-bold mb-0-5">
                        카드 비밀번호
                    </div>

                    <div>
                        <v-text-field
                            v-model="state.cardPassword"
                            variant="solo"
                            flat
                            placeholder="비밀번호 앞 2자리 숫자"
                            class="xs"
                            hide-details
                        />
                    </div>
                </div>
            </v-card>

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
        </div>

        <v-spacer />

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
    </v-container>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar';

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
    snackbar.showSnackbar(`ㅋ카드를 등록했습니다.`);
}
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
</style>