<template>
  <PageTemplate back-button>
    <template v-slot:center-header>
      정기 결제 해지
    </template>

    <template v-slot:content>
      <div>
        <div class="text-t-lg font-weight-bold mb-2-5">
          {{ name }}님 정말 해지하시겠습니까?
        </div>
  
        <div class="text-t-sm font-weight-medium text-text-tertiary mb-10">
          지금 정기 결제를 해지하시면 {{ subscription?.endDate }}까지만 이용할 수 있습니다.
        </div>
  
        <div class="text-t-lg font-weight-bold">
          해지하시는 이유는 무엇인가요?<br />
          (복수 선택 가능)
        </div>
  
        <v-checkbox
          v-for="option in reason_option"
          :key="option.key"
          v-model="selectedReasons"
          :value="option.value"
          hide-details
          class="rounded-12 py-2-5"
          color="primary"
        >
          <template v-slot:label>
            <div class="text-t-sm font-weight-medium">
              {{ option.value }}
            </div>
          </template>
        </v-checkbox>
      </div>
    </template>

    <template v-slot:actions>
      <div class="pt-4 px-2-5 pb-8">
        <v-btn
          variant="tonal"
          size="x-large"
          class="primary flex-grow-0"
          block
          :disabled="selectedReasons.length === 0"
          @click="handleConfirm"
        >
          정기 결제 해지
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
const { name, subscription } = storeToRefs(userStore);
const selectedReasons = ref<string[]>([]);

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

const reason_option = [
  {
    key: 0,
    value: "학습할 시간이 없어요",
  },
  {
    key: 1,
    value: "이용권 요금이 부담돼요.",
  },
  {
    key: 2,
    value: "다양한 콘텐츠가 필요해요.",
  },
  {
    key: 3,
    value: "다른 서비스를 이용해요.",
  },
  {
    key: 4,
    value: "다른 이용권을 사용하려고 해요.",
  },
]

const handleConfirm = () => {
  // alert("해지 사유:" + selectedReasons.value); // 선택된 해지 사유 출력
  // 추가 처리 로직 작성 (예: 서버에 데이터 전송)
  // router.push('/dashboard'); // 처리 후 다른 페이지로 이동
  router.push("/dashboard/payment/ticket/cancel/retention_offer");
};

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