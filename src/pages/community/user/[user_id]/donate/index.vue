<template>
    <PageTemplate back-button>
        <template v-slot:center-header>
            후원
        </template>

        <template v-slot:content>
            <div class="d-flex flex-column align-center pt-4 mb-11">
                <v-img
                    :src="state.user.profileImage"
                    width="56"
                    height="56"
                    class="mx-auto mb-4"
                />

                <div class="text-center text-t-lg font-weight-medium mb-4">
                    {{ state.user.nickname }} 님에게
                </div>

                <div class="text-center text-d-xs font-weight-bold mb-2">
                    <span v-if="state.howMuch === 0">
                        얼마를 보낼까요?
                    </span>
                    <span v-else>
                        {{ state.howMuch.toLocaleString() }} 포인트
                    </span>
                </div>

                <div class="text-t-xs text-text-quaternary">
                    후원 후 취소 또는 변경할 수 없습니다.
                </div>
            </div>
        </template>

        <template v-slot:actions>
            <div class="pa-4">
                <div v-if="state.donationStep == 1">
                    <v-card
                        variant="tonal"
                        class="d-flex align-center rounded-6 px-4 py-2 mb-3"
                        @click="toggleCurrency"
                    >
                        <span class="text-t-sm font-weight-medium mr-3">
                            내 {{ state.currency === 'won' ? '원화달러' : '포인트' }}
                        </span>

                        <v-img
                            :src="state.currency === 'won' ? '/icons/IconDollarCircle.png' : '/icons/IconPointCircle.png'"
                            width="16"
                            height="16"
                            class="flex-grow-0 mr-1"
                        />

                        <span class="text-t-sm font-weight-medium">
                            {{ wallet[state.currency].toLocaleString() }}
                        </span>

                        <v-spacer />

                        <v-icon
                            icon="mdi-chevron-right"
                            size="20"
                        />
                    </v-card>

                    <div class="d-flex ga-2 mb-7">
                        <v-btn
                            class="flex-1-1-100 secondary"
                            variant="outlined"
                            @click="updateHowMuch(10000)"
                        >
                            10,000
                        </v-btn>
                        <v-btn
                            class="flex-1-1-100 secondary"
                            variant="outlined"
                            @click="updateHowMuch(30000)"
                        >
                            30,000
                        </v-btn>
                        <v-btn
                            class="flex-1-1-100 secondary"
                            variant="outlined"
                            @click="updateHowMuch(50000)"
                        >
                            50,000
                        </v-btn>
                        <v-btn
                            class="flex-1-1-100 secondary"
                            variant="outlined"
                            @click="updateHowMuch(wallet[state.currency])"
                        >
                            전액
                        </v-btn>
                    </div>


                    <div class="mb-1">
                        <v-row no-gutters>
                            <v-col
                                v-for="(keypadItem, index) in keypad"
                                :key="index"
                                cols="4"
                                class="mb-5"
                            >
                                <div class="px-2">
                                    <v-btn
                                        block
                                        variant="text"
                                        class="text-d-xs font-weight-medium"
                                        @click="handleKeypadClick(keypadItem.value)"
                                    >
                                        {{ keypadItem.value }}
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </div>

                <div v-if="state.donationStep === 2">
                    <div class="font-weight-semibold mb-3">
                        전달 메시지 (선택사항)
                    </div>

                    <v-radio-group v-model="state.radios">
                        <v-radio
                            v-for="radio in radioList"
                            :key="radio.value"
                            :value="radio.value"
                            true-icon="mdi-record-circle"
                            false-icon="mdi-checkbox-blank-circle-outline"
                            color="primary"
                            class="align-start ga-3 border border-md rounded-12 px-4 py-4 mb-3"
                            :class="state.radios != radio.value ? 'border-border-primary' : 'border-border-brand-solid'"
                        >
                            <template v-slot:label>
                                <div class="text-t-sm font-weight-medium text-text-secondary">
                                    {{ radio.label }}
                                </div>
                            </template>
                        </v-radio>
                    </v-radio-group>
                </div>

                <v-btn
                    variant="tonal"
                    size="x-large"
                    class="primary"
                    block
                    :disabled="!canDonate"
                    @click="onClickDonate"
                >
                    {{ state.donationStep === 1 ? '다음' : '후원하기' }}
                </v-btn>
            </div>
        </template>
    </PageTemplate>


    <DialogDonate
        v-model:dialog="state.dialogSelectDonate"
        @onSelectDonate="onClickSelectDonate"
    />
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { reactive, computed } from 'vue';

const userStore = useUserStore();
const { wallet } = storeToRefs(userStore);
const router = useRouter();

const state = reactive({
    user: {
        id: "1",
        nickname: "홍길동",
        profileImage: "/images/class/dummy_profile_image.png",
    },
    howMuch: 0,
    currency: 'point' as 'won' | 'point', // 타입을 'won' | 'point'로 지정
    donationStep: 1,
    radios: null,
    dialogSelectDonate: false,
});

const keypad = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "00" },
    { value: "0" },
    { value: "←" },
];

// 보유 금액 초과 여부를 확인하는 계산된 속성
const isOverLimit = computed(() => state.howMuch > wallet.value[state.currency]);

function toggleCurrency() {
    state.dialogSelectDonate = true;
    // state.currency = state.currency === 'won' ? 'point' : 'won';
    // state.howMuch = 0; // 통화 전환 시 입력 금액 초기화
}

function onClickSelectDonate(methods: string) {
    console.log(methods);
    state.currency = methods as 'won' | 'point';
}

function updateHowMuch(amount: number) {
    const maxAmount = wallet.value[state.currency];
    state.howMuch = amount > maxAmount ? maxAmount : amount;
}

function handleKeypadClick(value: string) {
    if (value === '←') {
        // 백스페이스 기능
        state.howMuch = Math.floor(state.howMuch / 10);
    } else {
        // 새로운 숫자 추가
        const newValue = state.howMuch.toString() + value;
        const parsedValue = parseInt(newValue, 10);

        // 최대 한도를 초과하지 않도록 설정
        const maxAmount = wallet.value[state.currency];
        state.howMuch = parsedValue > maxAmount ? maxAmount : parsedValue;
    }
}

const canDonate = computed(() => {
    if (state.donationStep == 1) {
        return state.howMuch > 0 && !isOverLimit.value
    } else if (state.donationStep == 2) {
        return state.radios !== null;
    } else {
        return false;
    }
});

const onClickDonate = () => {
    if (state.donationStep === 1) {
        state.donationStep++;
    } else if (state.donationStep === 2) {
        router.push(`/community/user/${state.user.id}/donate/complete`);
    }
}

const radioList = [
    {
        label: "선택 안 함",
        value: "1"
    },
    {
        label: "좋은 콘텐츠 만들어주세요!",
        value: "2"
    },
    {
        label: "콘텐츠 잘 보고 있습니다!",
        value: "3"
    },
    {
        label: "콘텐츠 너무 좋아요!",
        value: "4"
    },
    {
        label: "응원합니다!",
        value: "5"
    },
]

</script>

<style lang="scss" scoped>
:deep(.v-list-item__spacer) {
    width: 8px !important;
}
</style>