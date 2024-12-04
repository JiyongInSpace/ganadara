<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                구매 완료
            </span>

            <v-spacer />
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto py-5 px-4 ga-2">

            <div class="text-d-xs font-weight-bold mb-2-5">
                구매가 완료되었습니다!
            </div>

            <div class="mb-10">
                상품은 --- 에서 확인할 수 있습니다.
            </div>


            <div class="d-flex ga-2-5">
                <v-img
                    :src="state.goodsInfo.imgUrl"
                    :aspect-ratio="1"
                    cover
                    width="120"
                    height="120"
                    class="rounded-8 flex-grow-0"
                ></v-img>

                <div>
                    <div class="font-weight-medium mb-1">
                        {{ state.goodsInfo.name }}
                    </div>

                    <div class="text-t-xl font-weight-bold mb-1">
                        {{ state.goodsInfo.price?.toLocaleString() }}원
                    </div>
                </div>
            </div>

            <v-spacer />
        </div>

        <div class="d-flex pt-4 pb-8 px-2-5 ga-1-5">
            <v-btn
                class="secondary flex-1-1-100"
                variant="outlined"
                size="large"
                @click="onClickGoToGoods"
            >
                상품 보러 가기
            </v-btn>

            <v-btn
                class="primary flex-1-1-100"
                variant="tonal"
                size="large"
                @click="onClickInventory"
            >
                보유한 상품 보러 가기
            </v-btn>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { IRewardItem } from "@/interfaces";

const router = useRouter();

onMounted(() => {
    state.goodsInfo = dummy_follower;
});

const state = reactive({
    goodsInfo: {} as IRewardItem,
});

const onClickGoToGoods = () => {
    router.push('/dashboard/additional/rewards/goods');
}

const onClickInventory = () => {
    router.push('/dashboard/additional/rewards/inventory');
}


// ================================================================================================================================
const dummy_follower = {
    id: 1,
    name: "스타벅스_아이스아메리카노 ",
    imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
    price: 2450,
    status: "completed",
    limit: 39990,
    description: "디지털로 만든 세상에 단 하나뿐인 일러스트 작품입니다. 구매시 정품 인증서까지 함께 배송됩니다.디지털로 만든 세상에 단 하나뿐인 일러스트 작품입니다. 구매시 정품 인증서까지 함께 배송됩니다.디지털로 만든 세상에 단 하나뿐인 일러스트 작품입니다. 구매시 정품 인증서까지 함께 배송됩니다.디지털로 만든 세상에 단 하나뿐인 일러스트 작품입니다. 구매시 정품 인증서까지 함께 배송됩니다.",
    creator: {
        id: 1,
        name: "김민수",
        profileImgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
    },
} as IRewardItem;

</script>

<style lang="scss" scoped>
:deep(.v-list-item__spacer) {
    width: 8px !important;
}
</style>