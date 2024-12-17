<template>
  <PageTemplate back-button>
    <template v-slot:center-header>
      이용권
    </template>

    <template v-slot:content>
      <div class="d-flex flex-column ga-2-5">
        <div class="text-t-lg font-weight-bold mb-2-5">
          가나다라 이용권 결제가<br/> 완료되었습니다.
        </div>

        <div class="text-t-sm font-weight-medium text-text-tertiary mb-5">
          모든 콘텐츠를 무제한으로 즐기세요!
        </div>
      </div>

      <DashboardTicketItem
        :ticketInfo="state.ticket"
        :isInProgress="false"
      />

    </template>

    <template v-slot:bottom>
    </template>

    <template v-slot:actions>
      <div class="px-2-5 pb-8">
        <v-btn
          variant="tonal"
          size="x-large"
          class="primary flex-grow-0"
          block
        >
          확인
        </v-btn>
      </div>
    </template>
  </PageTemplate>
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