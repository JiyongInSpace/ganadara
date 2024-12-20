<template>
  <PageTemplate back-button>
    <template v-slot:center-header>
      정기 결제 해지
    </template>

    <template v-slot:content>
      <div>
        <div class="text-t-lg font-weight-bold mb-2-5">
          {{ name }}님께 다음 결제 이용료 50% 할인 혜택을 드릴게요!
        </div>

        <div class="text-t-sm font-weight-medium text-text-tertiary mb-10">
          자동으로 할인된 금액이 청구됩니다.
        </div>
      </div>
    </template>

    <template v-slot:actions>
      <div class="pt-4 px-2-5 pb-8">
        <v-btn
          variant="tonal"
          size="x-large"
          class="secondary flex-grow-0 mb-2-5"
          block
          @click="handleDelete"
        >
          정기 결제 해지
        </v-btn>

        <v-btn
          variant="tonal"
          size="x-large"
          class="primary flex-grow-0"
          block
          @click="handleConfirm"
        >
          정기 결제 유지하기
        </v-btn>
      </div>
    </template>
  </PageTemplate>

  <DialogUnsubscribe 
    v-model:dialog="state.dialog"
  />
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
  dialog: false,
});


const handleConfirm = () => {
  router.push("/dashboard/payment/ticket")
};

const handleDelete = () => {
  state.dialog = true;
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