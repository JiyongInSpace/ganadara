<template>
    <PageTemplate
        back-button
        space="pa-0"
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                스토어
            </span>
        </template>

        <template v-slot:append-header>
            <v-btn
                icon
                variant="text"
                class="secondary"
                size="24"
                @click="onClickStorage"
            >
                <v-img
                    src="/icons/IconStorage.svg"
                    width="24"
                    height="24"
                />
            </v-btn>
        </template>

        <template v-slot:content>
            <div>
                <v-tabs
                    v-model="tabMain.tab.value"
                    align-tabs="center"
                    stacked
                    grow
                    height="48"
                >
                    <v-tab
                        v-for="(mainTabItem, i) in tabMain.list"
                        :key="i"
                        :value="mainTabItem"
                        class="border-b flex-1-1-100"
                    >
                        {{ t(mainTabItem) }}
                    </v-tab>
                </v-tabs>
            </div>

            <div class="d-flex flex-column flex-grow-1 overflow-y-auto px-3 py-4">
                <RewardsList
                    v-if="tabMain.tab.value == 'goods'"
                    :list="state.goods"
                    type="goods"
                />

                <RewardsList
                    v-if="tabMain.tab.value == 'gift'"
                    :list="state.gifts"
                    type="gift"
                    no-label
                />
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { IRewardItem } from "@/interfaces";
import { useI18n } from "vue-i18n";

const router = useRouter();
const tabMain = {
    list: [
        'goods',
        'gift',
    ],
    tab: ref('goods'),
}

onMounted(() => {
    // 데이터
    state.goods = dummy_goods;
    state.gifts = dummy_gifts;
});

const state = reactive({
    goods: [] as IRewardItem[],
    gifts: [] as IRewardItem[],
});

const onClickStorage = () => {
    router.push('/dashboard/additional/rewards/inventory');
}

const dummy_goods = [
    {
        id: 1,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "ongoing",
        limit: 39990,
    },
    {
        id: 2,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "completed",
        limit: 39990,
    },
    {
        id: 2,
        name: "스타벅스_아이스아메리카노",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "completed",
        limit: 39990,
    },
    {
        id: 3,
        name: "스타벅스_아이스아메리카노 두 잔",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 100050,
        status: "ongoing",
        limit: 39990,
    },
    {
        id: 1,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "ongoing",
        limit: 39990,
    },
    {
        id: 1,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "ongoing",
        limit: 39990,
    },
] as IRewardItem[];

const dummy_gifts = [
    {
        id: 1,
        name: "스타벅스_카페라떼",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "ongoing",
        limit: 39990,
    },
    {
        id: 2,
        name: "스타벅스_카페라떼두 잔",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 100050,
        status: "ongoing",
        limit: 39990,
    },
    {
        id: 1,
        name: "스타벅스_카페라떼",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "ongoing",
        limit: 39990,
    },
    {
        id: 1,
        name: "스타벅스_카페라떼",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "ongoing",
        limit: 39990,
    },
] as IRewardItem[];


const { t } = useI18n({
    messages: {
        ko: {
            goods: "디지털 굿즈",
            gift: "상품권",
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

</script>

<style lang="scss" scoped>
:deep(.v-list-item__spacer) {
    width: 8px !important;
}
</style>