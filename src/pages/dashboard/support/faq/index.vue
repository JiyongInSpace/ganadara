<template>
    <PageTemplate
        back-button
        space="pa-0"
    >
        <template v-slot:center-header>
            자주 묻는 질문
        </template>

        <template v-slot:content>
            <div class="d-flex flex-column ga-2-5 px-4">
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
                        class="border-border-primary my-0 ml-0"
                    >
                        <span v-text="tag.value" />
                    </v-chip>
                </v-chip-group>
            </div>

            <div class="d-flex flex-column flex-grow-1 overflow-y-auto px-4">
                <div
                    v-for="item in computedFaqList"
                    class="d-flex justify-space-between align-center font-weight-bold py-4 border-b cursor-pointer"
                    v-ripple
                    @click="onClickFaqItem(item.id)"
                >
                    <span>
                        {{ item.title }}
                    </span>

                    <v-icon
                        icon="mdi-chevron-right"
                        class="text-text-disabled"
                    />
                </div>
            </div>

            <DialogFaqDetails v-model:dialog="dialog" />
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const route = useRoute();

onMounted(() => {
    if(route.query.id) {
        onClickFaqItem(Number(route.query.id));
    }
})

const state = reactive({
    category: [
        {
            key: "popular",
            value: "인기",
        },
        {
            key: "payment",
            value: "결제 방법",
        },
        {
            key: "refund",
            value: "환불",
        },
        {
            key: "member",
            value: "회원 정보",
        },
        {
            key: "error",
            value: "오류",
        },
    ],

    selectedCategory: undefined as string | undefined,

    faqList: [
        {
            id: 1,
            title: "[결제 방법] 아이폰에서 어떻게 결제하나요?",
            category: "payment"
        },
        {
            id: 2,
            title: "[환불] 아이폰에서 어떻게 결제하나요?",
            category: "refund"
        },
        {
            id: 3,
            title: "[오류] 아이폰에서 어떻게 결제하나요?",
            category: "error"
        },
        {
            id: 4,
            title: "[결제 방법] 아이폰에서 어떻게 결제하나요?",
            category: "member"
        },
        {
            id: 5,
            title: "[결제 방법] 아이폰에서 어떻게 결제하나요?",
            category: "payment"
        },
        {
            id: 11,
            title: "[결제 방법] 아이폰에서 어떻게 결제하나요?",
            category: "popular"
        },
        {
            id: 22,
            title: "[환불] 아이폰에서 어떻게 결제하나요?",
            category: "refund"
        },
        {
            id: 33,
            title: "[오류] 아이폰에서 어떻게 결제하나요?",
            category: "error"
        },
        {
            id: 44,
            title: "[결제 방법] 아이폰에서 어떻게 결제하나요?",
            category: "payment"
        },
        {
            id: 55,
            title: "[결제 방법] 아이폰에서 어떻게 결제하나요?",
            category: "error"
        },
    ],
});

const computedFaqList = computed(() => {
    return state.faqList.filter((faq) => {
        return state.selectedCategory === undefined || faq.category === state.selectedCategory;
    });
});

const dialog = ref(false);

const onClickFaqItem = (key: number) => {
    dialog.value = true;
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