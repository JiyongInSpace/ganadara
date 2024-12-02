<template>
  <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
    <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
      <span class="text-t-xl font-weight-semibold">
        쿠폰
      </span>
    </div>

    <div
      ref="refTabs"
      class="position-sticky top-0 z-1 foreground-white border-b border-border-primary"
    >
      <v-tabs
        v-model="tabMain.tab.value"
        stacked
        class="flex-shrink-0 text-text-quaternary font-weight-bold main-tab"
        height="48"
        selected-class="text-text-primary"
        grow
      >
        <v-tab
          v-for="tabMainItem in tabMain.list"
          :key="tabMainItem"
          :value="tabMainItem"
          class="text-lowercase font-weight-bold flex-1-1-100"
        >
          {{ t(`main_tab.${tabMainItem}`) }}
        </v-tab>
      </v-tabs>
    </div>

    <!-- <v-tabs-window
      v-model="tabMain.tab.value"
      class="overflow-y-auto flex-grow-1"
    >
      <v-tabs-window-item :value="MAIN_TAB.COUPONS"> -->
    <DashboardCouponList
      v-if="tabMain.tab.value === MAIN_TAB.COUPONS"
      :couponList="state.couponList"
    />

    <DashboardCouponHistoryList
      v-if="tabMain.tab.value === MAIN_TAB.HISTORY"
      :couponList="state.couponHistoryList"
    />
    <!-- <CommunityFeedList :feedList="state.feedList" /> -->
    <!-- </v-tabs-window-item> -->

    <!-- <v-tabs-window-item :value="MAIN_TAB.HISTORY"> -->
    <!-- <CommunityFollowing
          :follow-list="state.following"
          is-following
        /> -->
    <!-- </v-tabs-window-item> -->
    <!-- </v-tabs-window> -->

  </v-container>
</template>

<script lang="ts" setup>
import { ICouponItem } from '@/interfaces';
import { useI18n } from 'vue-i18n';

const MAIN_TAB = {
  COUPONS: "coupons",
  HISTORY: "history",
}

const state = reactive({
  couponList: [
    {
      id: 1,
      tag: '스탠다드 1개월',
      name: '첫 결제 50% 할인',
      desc: '첫 결제 고객이라면 스탠다드 1개월 이용권을 50% 할인된 금액으로 이용해 보세요!',
      startDate: new Date(),
      endDate: new Date(),
      isUsed: false,
    },
    {
      id: 1,
      tag: '스탠다드 1개월',
      name: '첫 결제 50% 할인',
      desc: '첫 결제 고객이라면 스탠다드 1개월 이용권을 50% 할인된 금액으로 이용해 보세요!',
      startDate: new Date(),
      endDate: new Date(),
      isUsed: false,
    },
    {
      id: 1,
      tag: '스탠다드 1개월',
      name: '첫 결제 50% 할인',
      desc: '첫 결제 고객이라면 스탠다드 1개월 이용권을 50% 할인된 금액으로 이용해 보세요!',
      startDate: new Date(),
      endDate: new Date(),
      isUsed: false,
    },
    {
      id: 1,
      tag: '스탠다드 1개월',
      name: '첫 결제 50% 할인',
      desc: '첫 결제 고객이라면 스탠다드 1개월 이용권을 50% 할인된 금액으로 이용해 보세요!',
      startDate: new Date(),
      endDate: new Date(),
      isUsed: false,
    },
    {
      id: 1,
      tag: '스탠다드 1개월',
      name: '첫 결제 50% 할인',
      desc: '첫 결제 고객이라면 스탠다드 1개월 이용권을 50% 할인된 금액으로 이용해 보세요!',
      startDate: new Date(),
      endDate: new Date(),
      isUsed: false,
    },
  ] as ICouponItem[],
  couponHistoryList: [
    {
      id: 1,
      tag: '스탠다드 1개월',
      name: '첫 결제 50% 할인',
      desc: '첫 결제 고객이라면 스탠다드',
      startDate: new Date(),
      endDate: new Date(),
      isUsed: true,
    },
    {
      id: 1,
      tag: '스탠다드 1개월',
      name: '첫 결제 50% 할인',
      desc: '첫 결제 고객이라면 스탠다드',
      startDate: new Date(),
      endDate: new Date(),
      isUsed: true,
    },
    {
      id: 1,
      tag: '스탠다드 1개월',
      name: '첫 결제 50% 할인',
      desc: '첫 결제 고객이라면 스탠다드',
      startDate: new Date(),
      endDate: new Date(),
      isUsed: true,
    },
  ]
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