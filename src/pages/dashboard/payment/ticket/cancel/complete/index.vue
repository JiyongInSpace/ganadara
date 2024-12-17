<template>
  <PageTemplate
    ap-close-button
    no-spacer
    no-gap
  >
    <template v-slot:center-header>
      정기 결제 해지
    </template>

    <template v-slot:content>
      <div class="text-d-xs font-weight-bold mb-2-5">
        정기 결제가 해지되었습니다.
      </div>

      <div class="text-t-sm font-weight-medium text-text-tertiary mb-10">
        {{ subscription?.endDate }}까지 이용할 수 있습니다.
      </div>

      <v-spacer />

      <div class="mx-auto">
        <v-img
          src="/favicon.png"
          width="130"
          height="130"
        ></v-img>
      </div>

      <v-spacer />
    </template>

    <template v-slot:actions>
      <div class="pt-4 px-2-5 pb-8">
        <v-btn
          variant="tonal"
          size="x-large"
          class="primary flex-grow-0"
          block
          @click="handleConfirm"
        >
          확인
        </v-btn>
      </div>
    </template>
  </PageTemplate>

  <DialogUnsubscribe v-model:dialog="state.dialog" />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const router = useRouter();
const { subscription } = storeToRefs(userStore);

const state = reactive({
  dialog: false,
});


const handleConfirm = () => {
  router.push("/dashboard/payment/ticket")
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