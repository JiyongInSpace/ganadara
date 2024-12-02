<template>
  <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
    <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
      <span class="text-t-xl font-weight-semibold">
        나의 결제 내역
      </span>
    </div>

    <div class="d-flex flex-column ga-2-5 flex-grow-1 overflow-y-auto py-10 px-4">
      <DashboardPaymentHistoryItem
        v-for="historyItem in state.historyList"
        :key="historyItem.id"
        :historyItem="historyItem"
      />
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { IPaymentHistoryItem } from '@/interfaces';
import { useI18n } from 'vue-i18n';

const MAIN_TAB = {
  COUPONS: "coupons",
  HISTORY: "history",
}

const state = reactive({
  historyList: [
    {
      id: 1,
      planName: "스탠다드 1개월",        // 이용권 이름
      amount: 10000,                  // 결제 금액
      payNumber: "20241241000001",        // 결제 번호
      billingType: "recurring",    // 결제 방식
      payInfo: "신한카드(1234) 일시불",
      timestamp: "2024-11-10T14:30:15.123Z",     // 이용권 시작일
    },
    {
      id: 1,
      planName: "스탠다드 1개월",        // 이용권 이름
      amount: 10000,                  // 결제 금액
      payNumber: "20241241000001",        // 결제 번호
      billingType: "recurring",    // 결제 방식
      payInfo: "신한카드(1234) 일시불",
      timestamp: "2024-11-10T14:30:15.123Z",     // 이용권 시작일
    },
    {
      id: 1,
      planName: "스탠다드 1개월",        // 이용권 이름
      amount: 10000,                  // 결제 금액
      payNumber: "20241241000001",        // 결제 번호
      billingType: "recurring",    // 결제 방식
      payInfo: "신한카드(1234) 일시불",
      timestamp: "2024-11-10T14:30:15.123Z",     // 이용권 시작일
    },
    {
      id: 1,
      planName: "스탠다드 1개월",        // 이용권 이름
      amount: 10000,                  // 결제 금액
      payNumber: "20241241000001",        // 결제 번호
      billingType: "recurring",    // 결제 방식
      payInfo: "신한카드(1234) 일시불",
      timestamp: "2024-11-10T14:30:15.123Z",     // 이용권 시작일
    },
    {
      id: 1,
      planName: "스탠다드 1개월",        // 이용권 이름
      amount: 10000,                  // 결제 금액
      payNumber: "20241241000001",        // 결제 번호
      billingType: "recurring",    // 결제 방식
      payInfo: "신한카드(1234) 일시불",
      timestamp: "2024-11-10T14:30:15.123Z",     // 이용권 시작일
    },
    {
      id: 1,
      planName: "스탠다드 1개월",        // 이용권 이름
      amount: 10000,                  // 결제 금액
      payNumber: "20241241000001",        // 결제 번호
      billingType: "recurring",    // 결제 방식
      payInfo: "신한카드(1234) 일시불",
      timestamp: "2024-11-10T14:30:15.123Z",     // 이용권 시작일
    },
  ] as IPaymentHistoryItem[],
});

const loading = ref(false);

// UI ========================================

const tabMain = {
  list: [
    MAIN_TAB.COUPONS,
    MAIN_TAB.HISTORY,
  ],
  tab: ref(MAIN_TAB.COUPONS),
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


<style lang="scss" scoped></style>