<template>
    <PageTemplate
        space="pa-0"
        back-button
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                나의 서랍
            </span>
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
                    no-label
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

const tabMain = {
    list: [
        'goods',
        'gift',
    ],
    tab: ref('goods'),
}

onMounted(() => {
    // 데이터
    state.goods = dummy_follower;
    state.gifts = dummy_follower;
});

const state = reactive({
    goods: [] as IRewardItem[],
    gifts: [] as IRewardItem[],
});

const dummy_follower = [
    {
        id: 1,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "ongoing",
    },
    {
        id: 1,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "completed",
    },
    {
        id: 1,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "completed",
    },
    {
        id: 1,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "ongoing",
    },
    {
        id: 1,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "ongoing",
    },
    {
        id: 1,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "ongoing",
    },
] as IRewardItem[];


const { t } = useI18n({
    messages: {
        ko: {
            gift: "상품권",
            goods: "디지털 굿즈",
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
