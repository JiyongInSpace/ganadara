<template>
  <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
    <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
      <span class="text-t-xl font-weight-semibold">
        이용권
      </span>
    </div>

    <div class="d-flex flex-column flex-grow-1 overflow-y-auto">
      <div class="d-flex flex-column ga-2-5 pt-5 pb-5 px-4">
        <div class="text-t-lg font-weight-bold mb-2-5">
          앱이름 이용권 결제가 완료되었습니다.
        </div>

        <div class="text-t-sm font-weight-medium text-text-tertiary mb-5">
          모든 콘텐츠를 무제한으로 즐기세요!
        </div>
      </div>

      <DashboardTicketItem
        :ticketInfo="state.ticket"
        :isInProgress="false"
      />

      <v-spacer />

      <div class="pt-4 px-2-5 pb-8">
        <v-btn
          variant="tonal"
          size="x-large"
          class="primary flex-grow-0"
          block
        >
          확인
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();

const state = reactive({
  ticket: {
    id: 3,
    planName: "스탠다드 1개월",
    billingType: "recurring",
    startDate: "2024-11-27T14:30:15.123Z",
    endDate: "2024-12-27T14:30:15.123Z",
    payNumber: "20241241000001",
    payInfo: "신한카드(1234) 일시불",
    paymentPrice: 10000,
    timestamp: "2024-11-10T14:30:15.123Z",
    isPopular: false,
    category: ["tag0", "tag1", "tag2",],
  },
});

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