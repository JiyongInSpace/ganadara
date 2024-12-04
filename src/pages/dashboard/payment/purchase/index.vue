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
          앱 이름의 모든 콘텐츠를
          무제한으로 즐기세요!
        </div>

        <div class="text-t-sm font-weight-medium text-text-tertiary mb-5">
          이용권을 선택하세요.
        </div>

        <v-chip-group
          selected-class="bg-black text-text-primary_on-brand"
          v-model="state.selectedCategory"
          column
        >
          <v-chip
            v-for="tag in state.category"
            :key="tag.key"
            :value="tag.key"
            variant="outlined"
            size="small"
            class="border-border-primary my-0 ml-0 mr-2 mb-2"
          >
            <span v-text="tag.value" />
          </v-chip>
        </v-chip-group>

        <div>
          <div
            v-for="ticket in filteredTickets"
            :key="ticket.id"
          >
            <v-card
              variant="outlined"
              class="position-relative background-base rounded-12 flex-shrink-0 py-5 px-4 mt-5 overflow-visible cursor-pointer"
              :class="`${state.selectedTicketId === ticket.id ? 'border-border-brand' : 'border-border-primary'}`"
              @click="onClickTicket(ticket.id)"
            >
              <v-chip
                v-if="ticket.isPopular"
                class="position-absolute primary xxs left-2 px-4"
                :style="{
                  left: '10px',
                  top: '-10px',
                }"
              >
                인기
              </v-chip>

              <div class="d-flex align-center mb-2">
                <span class="text-t-xl font-weight-bold mr-2">
                  {{ ticket.planName }}
                </span>

                <v-chip
                  v-if="ticket.billingType == 'recurring'"
                  size="small"
                  class="brand"
                  variant="outlined"
                >
                  {{ ticket.billingType }}
                </v-chip>

                <div class="ml-auto">
                  <v-icon
                    v-if="state.selectedTicketId === ticket.id"
                    icon="mdi-record-circle"
                    class="text-text-brand-tertiary"
                  />

                  <v-icon
                    v-else
                    icon="mdi-checkbox-blank-circle-outline"
                    class="text-text-placeholder_subtle"
                  />
                </div>
              </div>

              <div>
                <span>
                  <span class="font-weight-medium text-text-quaternary text-decoration-line-through mr-1">
                    {{ ticket.originalPrice.toLocaleString() }}원
                  </span>
                  <span class="font-weight-bold text-primary">
                    {{ ticket.paymentPrice.toLocaleString() }}원
                  </span>
                </span>
              </div>
            </v-card>

            <div
              v-if="state.selectedTicketId === ticket.id && ticket.billingType == 'recurring'"
              class="px-4 mt-5"
            >
              <div class="text-t-lg font-weight-bold pb-2-5 mb-5 border-b">
                주문 및 정기 자동 결제 신청 동의
              </div>

              <v-checkbox
                v-model="state.isCheckOrder"
                value="marketing"
                hide-details
                class="py-0 mb-1"
                color="primary"
                true-icon="mdi-record-circle"
                false-icon="mdi-checkbox-blank-circle-outline"
              >
                <template v-slot:label>
                  <div class="text-text-primary text-t-sm font-weight-medium">
                    주문 상품 정보에 대한 동의
                  </div>
                </template>
              </v-checkbox>

              <v-card
                variant="outlined"
                class="text-t-sm border-none background-secondary rounded-12 flex-shrink-0 pa-2-5 mb-5"
              >
                주문하실 상품, 가격 등을 최종 확인하였으며, 구매에 동의하시겠습니다?
              </v-card>

              <v-checkbox
                v-model="state.isCheckAutoPayment"
                value="marketing"
                hide-details
                class="mb-1"
                color="primary"
                true-icon="mdi-record-circle"
                false-icon="mdi-checkbox-blank-circle-outline"
              >
                <template v-slot:label>
                  <div class="text-t-sm font-weight-medium">
                    정기 자동 결제 신청 동의
                  </div>
                </template>
              </v-checkbox>

              <v-card
                variant="outlined"
                class="text-t-sm border-none background-secondary rounded-12 flex-shrink-0 pa-2-5 mb-5"
              >
                결제 요금은 최초 등록한 결제 수단으로 결제됩니다. 최초 등록 이후 비밀번호 등 결제 정보 입력의 절차 없이 결제됩니다.
              </v-card>

              <div class="text-center text-t-sm font-weight-medium">
                정기 결제는 언제든지 해지할 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>

      <v-spacer />

      <div class="pt-4 px-2-5 pb-8">
        <div class="d-flex justify-center mb-5">
          <v-btn variant="text">
            지난 이용권 보러 가기
          </v-btn>
        </div>

        <v-btn
          variant="tonal"
          size="x-large"
          class="primary flex-grow-0"
          block
          :disabled="!state.selectedTicketId ||
            (selectedTicket?.billingType === 'recurring' &&
              (!state.isCheckOrder || !state.isCheckAutoPayment))"
          @click="onClickPayment"
        >
          결제하기
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
  category: [
    {
      key: "tag0",
      value: "콘텐츠 무제한",
    },
    {
      key: "tag1",
      value: "AI 기능 지원",
    },
    {
      key: "tag2",
      value: "광고 제거",
    },
    {
      key: "tag3",
      value: "학습 언어 무제한",
    },
    {
      key: "tag4",
      value: "백그라운드 학습 지원",
    },
  ],
  selectedCategory: undefined as string | undefined,

  ticketList: [
    {
      id: 1,
      planName: "스탠다드 1개월",
      billingType: "recurring",
      paymentPrice: 10000,
      originalPrice: 20000,
      payNumber: "20241241000001",
      payInfo: "신한카드(1234) 일시불",
      timestamp: "2024-11-10T14:30:15.123Z",
      isPopular: true,
      category: ["tag0", "tag3", "tag4"],
    },
    {
      id: 2,
      planName: "스탠다드 1개월",
      billingType: "single",
      paymentPrice: 10000,
      originalPrice: 20000,
      payNumber: "20241241000001",
      payInfo: "신한카드(1234) 일시불",
      timestamp: "2024-11-10T14:30:15.123Z",
      isPopular: false,
      category: ["tag0", "tag1", "tag2",],
    },
    {
      id: 3,
      planName: "스탠다드 1개월",
      billingType: "recurring",
      paymentPrice: 10000,
      originalPrice: 20000,
      payNumber: "20241241000001",
      payInfo: "신한카드(1234) 일시불",
      timestamp: "2024-11-10T14:30:15.123Z",
      isPopular: false,
      category: ["tag0", "tag1", "tag2",],
    },
  ],
  selectedTicketId: undefined as number | undefined,

  isCheckOrder: false,
  isCheckAutoPayment: false,
});

// 선택된 티켓 ID 설정
const onClickTicket = (id: number) => {
  state.selectedTicketId = id;
};

// 선택된 카테고리에 따라 필터링된 티켓
const filteredTickets = computed(() => {
  if (!state.selectedCategory) return state.ticketList;

  return state.ticketList.filter((ticket) => {
    if (!state.selectedCategory) return;

    return ticket.category.includes(state.selectedCategory)
  }
  );
});

// 선택된 티켓 정보
const selectedTicket = computed(() => {
  return state.ticketList.find((ticket) => ticket.id === state.selectedTicketId);
});

// 카테고리 변경 시 초기화
watch(
  () => state.selectedCategory,
  () => {
    state.selectedTicketId = undefined;
    state.isCheckOrder = false;
    state.isCheckAutoPayment = false;
  }
);

watch(
  () => state.selectedTicketId,
  () => {
    state.isCheckOrder = false;
    state.isCheckAutoPayment = false;
  }
);

// 결제하기

const onClickPayment = () => {
  alert("onClickPayment");
  router.push("/dashboard/purchase/complete");
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