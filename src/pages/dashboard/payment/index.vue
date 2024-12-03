<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                이용권 관리
            </span>
        </div>

        <div class="px-4 py-10">
            <v-card
                variant="outlined"
                class="border-border-secondary background-secondary rounded-12 pa-5 mb-4"
            >
                <div class="d-flex justify-space-between align-center mb-5">
                    <div class="text-t-md font-weight-medium">
                        나의 이용권
                    </div>

                    <v-btn
                        icon
                        variant="text"
                        size="small"
                        @click="onClickTicket"
                    >
                        <v-icon icon="mdi-chevron-right" />
                    </v-btn>
                </div>

                <v-btn
                    v-if="!subscription"
                    variant="tonal"
                    size="x-large"
                    class="primary flex-grow-0"
                    block
                    @click="onClickPurchase"    
                >
                    이용권 구매하기
                </v-btn>

                <v-card
                    v-else
                    variant="outlined"
                    class="border-border-secondary background-primary rounded-12 pa-5 mb-4"
                >
                    <div class="d-flex align-center pb-3 mb-3 border-b">
                        <span class="text-t-xl font-weight-bold mr-2">
                            {{ subscription.planName }}
                        </span>

                        <v-chip
                            size="small"
                            class="brand"
                            variant="outlined"
                        >
                            {{ subscription.billingType }}
                        </v-chip>
                    </div>

                    <div class="text-t-md font-weight-bold">
                        {{ format(subscription.startDate, "yyyy.MM.dd") }} ~ {{ format(subscription.endDate,
                            "yyyy.MM.dd") }}
                    </div>
                </v-card>
            </v-card>

            <v-card
                variant="outlined"
                class="border-border-secondary background-secondary rounded-12 pa-5 mb-4"
            >
                <div class="d-flex justify-space-between align-center mb-2">
                    <div class="text-t-md font-weight-medium">
                        나의 쿠폰
                    </div>

                    <v-btn
                        icon
                        variant="text"
                        size="small"
                        @click="onClickCoupon"
                    >
                        <v-icon icon="mdi-chevron-right" />
                    </v-btn>
                </div>


                <DashboardCouponItem
                    v-for="(coupon, key) in state.myCoupons"
                    :couponInfo="coupon"
                    :key="key"
                />
            </v-card>

            <v-card
                variant="outlined"
                class="border-border-secondary background-secondary rounded-12 pa-5 mb-4"
            >

                <div class="d-flex justify-space-between align-center mb-2">
                    <div class="text-t-md font-weight-medium">
                        나의 결제내역
                    </div>

                    <v-btn
                        icon
                        variant="text"
                        size="small"
                        @click="onClickPaymentHistory"
                    >
                        <v-icon icon="mdi-chevron-right" />
                    </v-btn>
                </div>

                <DashboardPaymentHistoryItem
                    v-for="(history, key) in state.myHistory"
                    :historyItem="history"
                    :key="key"
                />
            </v-card>

            <v-card
                variant="outlined"
                class="border-border-secondary background-secondary rounded-12 pa-5 mb-4"
            >
                <div class="d-flex justify-space-between align-center mb-5">
                    <div class="text-t-md font-weight-medium">
                        나의 결제 수단
                    </div>

                    <v-icon icon="mdi-chevron-right" />
                </div>

                <v-btn
                    v-for="paymentMethod in state.myPaymentMethods"
                    variant="outlined"
                    size="x-large"
                    class="flex-grow-0 background-primary border-border-primary text-start-button mb-2-5"
                    block
                    @click="onClickSelectPaymentMethod(paymentMethod.id)"
                >
                    <div class="d-flex justify-space-between align-center">
                        <span class="text-t-lg font-weight-bold mr-1">
                            {{ paymentMethod.name }}({{ paymentMethod.number }})
                        </span>

                        <span class="text-t-md font-weight-medium text-text-quaternary flex-grow-1">
                            {{ paymentMethod.type === 'credit' ? '신용' : '체크' }}
                        </span>

                        <v-chip
                            v-if="paymentMethod.isDefault"
                            class="sm brand"
                            variant="outlined"
                        >
                            대표 카드
                        </v-chip>
                    </div>
                </v-btn>

                <v-btn
                    variant="outlined"
                    size="x-large"
                    class="flex-grow-0 background-primary border-border-primary"
                    block
                    @click="onClickRegisterPaymentMethod"
                >
                    <div class="w-100">
                        <v-icon
                            icon="mdi-plus-circle-outline"
                            class="mr-1"
                        />

                        <span class="text-t-lg font-weight-bold">
                            결제 수단 등록하기
                        </span>
                    </div>
                </v-btn>
            </v-card>
        </div>

        <DialogSelectPaymentMethod
            v-model:dialog="dialog"
            :paymentMethod="computedSelectedPaymentMethod"
        />
    </v-container>
</template>

<script lang="ts" setup>
import { ICouponItem } from '@/interfaces';
import { useUserStore } from '@/stores/user';
import { format } from 'date-fns';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { subscription } = storeToRefs(userStore);
const router = useRouter();

const state = reactive({
    myCoupons: [
        {
            id: 1,
            tag: '스탠다드 1개월',
            name: '첫 결제 50% 할인',
            desc: '첫 결제 고객이라면 스탠다드 1개월 이용권을 50% 할인된 금액으로 이용해 보세요!',
            startDate: new Date(),
            endDate: new Date(),
        },
    ] as ICouponItem[],
    myHistory: [
        {
            id: 1,
            planName: "스탠다드 1개월",        // 이용권 이름
            amount: 10000,                  // 결제 금액
            payNumber: "20241241000001",        // 결제 번호
            billingType: "recurring",    // 결제 방식
            payInfo: "신한카드(1234) 일시불",
            timestamp: "2024-11-10T14:30:15.123Z",     // 이용권 시작일
        }
    ],
    myPaymentMethods: [
        {
            id: 0,
            name: "신한",
            type: "credit",
            number: "1234",
            isDefault: true,
        },
        {
            id: 1,
            name: "카카오",
            type: "cash",
            number: "1234",
            isDefault: false,
        },
    ],
});

// 이용권 ======
const onClickTicket = () => {
    router.push("/dashboard/payment/ticket");
}

const onClickPurchase = () => {
    router.push("/dashboard/payment/purchase");
}

// 쿠폰 =======
const onClickCoupon = () => {
    router.push("/dashboard/payment/coupon");
}

// 결제 내역 =======
const onClickPaymentHistory = () => {
    router.push("/dashboard/payment/history");
}

// 결제 수단===========
const onClickRegisterPaymentMethod = () => {
    router.push("/dashboard/payment/register");
}

const dialog = ref(false);
const selectedPaymentMethod = ref(0);
const computedSelectedPaymentMethod = computed(() => {
    return state.myPaymentMethods.find((paymentMethod) => paymentMethod.id === selectedPaymentMethod.value);
});

const onClickSelectPaymentMethod = (_paymentMethodId: number) => {
    console.log(_paymentMethodId);
    selectedPaymentMethod.value = _paymentMethodId;
    dialog.value = true;
}

</script>


<style lang="scss" scoped>
</style>