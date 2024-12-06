<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                스토어
            </span>

            <v-spacer />
        </div>

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
                    {{ mainTabItem }}
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
            />
        </div>

        <v-spacer />

        <app-bottom-navigation />
    </v-container>
</template>

<script lang="ts" setup>
import { IRewardItem } from "@/interfaces";

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
        limit: 39990,
    },
    {
        id: 1,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "completed",
        limit: 39990,
    },
    {
        id: 1,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "completed",
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
    {
        id: 1,
        name: "스타벅스_아이스아메리카노 ",
        imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
        price: 2450,
        status: "ongoing",
        limit: 39990,
    },
] as IRewardItem[];

</script>

<style lang="scss" scoped>
:deep(.v-list-item__spacer) {
    width: 8px !important;
}
</style>