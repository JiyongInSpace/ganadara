<template>
  <PageTemplate
    back-button
    background="secondary"
    space="pa-0"
  >
    <template v-slot:center-header>
      이용권
    </template>

    <template v-slot:content>
      <div
        v-if="subscription"
        class="d-flex flex-column background-primary ga-2-5 pt-10 pb-5 px-4"
      >
        <div class="text-t-lg font-weight-bold mb-5">
          나의 이용권 내역
        </div>

        <DashboardTicketItem
          :ticketInfo="state.currentSubscriptionInfo"
          isInProgress
        />

        <div
          class="d-flex justify-space-between border-t cursor-pointer py-4"
          v-ripple
          @click="onClickCancelSubscription"
        >
          <span class="font-weight-medium text-text-disabled">
            정기결제 해지
          </span>

          <v-icon
            class="text-text-disabled"
            icon="mdi-chevron-right"
          />
        </div>
      </div>

      <div class="d-flex flex-column background-primary ga-2-5 pt-5 pb-5 px-4">
        <div class="text-t-lg font-weight-bold mb-5">
          만료 이용권
        </div>

        <DashboardTicketItem
          v-for="(historyItem, key) in state.historyList"
          :ticketInfo="historyItem"
          :key="key"
        />
      </div>
    </template>
  </PageTemplate>
</template>

<script lang="ts" setup>
import { IPaymentHistoryItem } from '@/interfaces';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const { subscription } = storeToRefs(userStore);


const state = reactive({
  currentSubscriptionInfo: {
    planName: "스탠다드 1개월",
    paymentPrice: 10000,
    originalPrice: 20000,
    billingType: "recurring",
    startDate: "2024-11-25T14:30:15.123Z",
    endDate: "2024-12-25T14:30:15.123Z",
  },
  historyList: [
    {
      id: 1,
      planName: "스탠다드 1개월",
      paymentPrice: 10000,
      originalPrice: 20000,
      billingType: "recurring",
      startDate: "2024-11-10T14:30:15.123Z",
      endDate: "2024-11-25T14:30:15.123Z",
    },
    {
      id: 1,
      planName: "스탠다드 1개월",
      paymentPrice: 10000,
      originalPrice: 20000,
      billingType: "recurring",
      startDate: "2024-11-10T14:30:15.123Z",
      endDate: "2024-11-25T14:30:15.123Z",
    },
    {
      id: 1,
      planName: "스탠다드 1개월",
      paymentPrice: 10000,
      originalPrice: 20000,
      billingType: "recurring",
      startDate: "2024-11-10T14:30:15.123Z",
      endDate: "2024-11-25T14:30:15.123Z",
    },
    {
      id: 1,
      planName: "스탠다드 1개월",
      paymentPrice: 10000,
      originalPrice: 20000,
      billingType: "recurring",
      startDate: "2024-11-10T14:30:15.123Z",
      endDate: "2024-11-25T14:30:15.123Z",
    },
  ],
});

const onClickCancelSubscription = () => {
  router.push("/dashboard/payment/ticket/cancel");
};



// UI ========================================


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


<style lang="scss" scoped></style>