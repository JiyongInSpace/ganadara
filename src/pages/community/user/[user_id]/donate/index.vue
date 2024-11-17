<template>
    <v-container
        class="pt-0 pb-10 px-4 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto"
    >
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                후원
            </span>

            <v-spacer />
        </div>

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
                    {{ state.howMuch.toLocaleString() }}
                </span>
            </div>

            <div class="text-t-xs text-text-quaternary">
                후원 후 취소 또는 변경할 수 없습니다.
            </div>
        </div>

        <v-spacer />

        <div v-if="state.donationStep == 1">
            <v-card
                variant="tonal"
                class="px-4 py-2 rounded-6 mb-3"
                @click="toggleCurrency"
            >
                <span class="text-t-sm font-weight-medium mr-3">
                    내 {{ state.currency === 'won' ? '원' : '포인트' }}
                </span>

                <span class="text-t-sm font-weight-medium">
                    {{ wallet[state.currency].toLocaleString() }}
                </span>
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

        <div>

            <v-radio-group
                v-if="state.donationStep === 2"
                v-model="state.radios"
            >
                <v-radio
                    v-for="radio in radioList"
                    :key="radio.value"
                    :value="radio.value"
                    class="py-2 align-start ga-3"
                    color="primary"
                >
                    <template v-slot:label>
                        <div>
                            <div class="text-t-md font-weight-medium text-text-secondary">
                                {{ radio.label }}
                            </div>

                            <div class="text-t-md text-text-quaternary">
                                {{ radio.description }}
                            </div>
                        </div>
                    </template>

                </v-radio>
            </v-radio-group>
        </div>

        <v-btn
            variant="tonal"
            size="x-large"
            class="primary"
            :disabled="!canDonate"
            @click="onClickDonate"
        >
            확인
        </v-btn>
    </v-container>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { reactive, computed } from 'vue';

const userStore = useUserStore();
const router = useRouter();
const { wallet } = storeToRefs(userStore);

const state = reactive({
    user: {
        id: "1",
        nickname: "홍길동",
        profileImage: "/images/class/dummy_profile_image.png",
    },
    howMuch: 0,
    currency: 'won' as 'won' | 'point', // 타입을 'won' | 'point'로 지정
    donationStep: 1,
    radios: null,
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
    state.currency = state.currency === 'won' ? 'point' : 'won';
    state.howMuch = 0; // 통화 전환 시 입력 금액 초기화
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
    if(state.donationStep === 1) {
        state.donationStep++;
    } else if(state.donationStep === 2) {
        router.push(`/community/user/${state.user.id}/donate/complete`);
    }
}

const radioList = [
    {
        label: "스팸",
        description: "원치 않는 홍보, 반복적인 콘텐츠",
        value: "1"
    },
    {
        label: "부적절한 콘텐츠",
        description: "나체, 성적인 콘텐츠, 폭력적이거나 불쾌한 이미지",
        value: "2"
    },
    {
        label: "사기 또는 허위 정보",
        description: "사기성 행위, 허위 정보, 잘못된 정보",
        value: "3"
    },
    {
        label: "혐오 발언 또는 심각한 폭력",
        description: "인종차별, 성차별, 동성애 혐오, 폭력적 위협.",
        value: "4"
    },
    {
        label: "자살 또는 자해",
        description: "자살, 자해, 자살을 부추기는 콘텐츠",
        value: "5"
    },
    {
        label: "지적 재산권 침해",
        description: "저작권, 상표권 침해",
        value: "6"
    },
    {
        label: "프라이버시 침해",
        description: "사생활 침해, 개인 정보 노출",
        value: "7"
    },
    {
        label: "신분 사칭",
        description: "사칭하는",
        value: "8"
    },
]

</script>

<style lang="scss" scoped>
:deep(.v-list-item__spacer) {
    width: 8px !important;
}
</style>