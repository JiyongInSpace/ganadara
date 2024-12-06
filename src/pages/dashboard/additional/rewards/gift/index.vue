<template>
    <PageTemplate
        space="pa-0"
        back-button
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                스토어
            </span>
        </template>

        <template v-slot:center-header>
        </template>

        <template v-slot:append-header>
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
        </template>

        <template v-slot:bottom>
        </template>

        <template v-slot:actions>
            <app-bottom-navigation />

        </template>
    </PageTemplate>
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