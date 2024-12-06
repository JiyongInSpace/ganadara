<template>
    <PageTemplate
        space="pa-0"
        back-button
        no-spacer
    >
        <template v-slot:prepend-header>
        </template>

        <template v-slot:center-header>
            탈퇴
        </template>

        <template v-slot:append-header>
        </template>

        <template v-slot:content>
            <div class="d-flex flex-column ga-2-5 pt-5 pb-5 px-4">
                <div class="text-t-lg font-weight-bold mb-2-5">
                    정말 탈퇴하시려고요?<br />
                    {{ name }}님께만 한 달 구독 50% 할인 쿠폰<br />
                    혜택을 드릴게요!
                </div>
            </div>

            <div class="flex-grow-1 background-secondary pa-4">
                <dashboard-coupon-item
                    :coupon-info="state.coupon"
                    class="px-4"
                />
            </div>

            <dialog-withdraw-confirm
                v-model:dialog="state.withdrawDialog"
                @onClickWithdrawConfirm="handleWithdrawConfirm"
            />
        </template>

        <template v-slot:bottom>
        </template>

        <template v-slot:actions>

            <div class="d-flex flex-column background-secondary ga-2-5 pt-4 px-2-5 pb-8">
                <v-btn
                    variant="outlined"
                    size="x-large"
                    class="secondary border-border-primary flex-grow-0"
                    block
                    @click="handleWithdraw"
                >
                    탈퇴하기
                </v-btn>

                <v-btn
                    variant="tonal"
                    size="x-large"
                    class="primary flex-grow-0"
                    block
                    @click="handleCancel"
                >
                    가나다라 계속 이용하기
                </v-btn>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const router = useRouter();
const { name } = storeToRefs(userStore);

const state = reactive({
    coupon: {
        id: 2,
        tag: "스탠다드 1개월",
        name: "첫 결제 50% 할인",
        desc: "첫 결제 고객이라면 스탠다드 1개월 이용권을 50% 할인된 금액으로 이용해 보세요!",
        startDate: "2024-11-25T14:30:15.123Z",
        endDate: "2024-12-25T14:30:15.123Z",
        isUsed: false,
    },
    withdrawDialog: false,
});

const handleCancel = () => {
    router.back();
};

const handleWithdraw = () => {
    state.withdrawDialog = true;
};

const handleWithdrawConfirm = () => {
    alert('탈퇴');
}

// 번역
const { t } = useI18n({
    messages: {
        en: {
            main_tab: {
                coupons: "나의 쿠폰",
                history: "쿠폰 내역",
            },
        },
        ko: {
            main_tab: {
                coupons: "전체",
                history: "팔로잉",
            },
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

</script>


<style lang="scss" scoped>
:deep(.v-selection-control__wrapper) {
    order: 1;
}
</style>