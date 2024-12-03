<template>
    <v-container
        class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto background-secondary"
    >
        <div
            class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 background-primary px-5">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                디지털 굿즈
            </span>

            <v-spacer />
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto ga-2">
            <div class="background-primary">
                <v-img
                    :src="state.goodsInfo.imgUrl"
                    :aspect-ratio="375 / 300"
                    cover
                    class="flex-grow-0"
                ></v-img>

                <div class="py-5 px-4">
                    <div class="font-weight-medium mb-1">
                        {{ state.goodsInfo.name }}
                    </div>

                    <div class="text-t-xl font-weight-bold mb-1">
                        {{ state.goodsInfo.price?.toLocaleString() }}원
                    </div>

                    <div class="text-t-xs font-weight-medium text-text-quaternary">
                        {{ state.goodsInfo.limit?.toLocaleString() }}개 남음
                    </div>
                </div>
            </div>

            <div class="background-primary py-2-5">
                <div class="py-5 px-4">
                    <div class="text-t-md font-weight-bold mb-1">
                        상품 설명
                    </div>

                    <div class="text-t-sm font-weight-medium">
                        {{ state.goodsInfo.description }}
                    </div>
                </div>
            </div>

            <div class="background-primary flex-grow-1 py-2-5">
                <div class="py-5 px-4">
                    <div class="text-t-md font-weight-bold mb-2-5">
                        크리에이터
                    </div>

                    <div class="d-flex align-center ga-2">
                        <div>
                            <v-img
                                :src="state.goodsInfo.creator?.profileImgUrl"
                                aspect-ratio="1"
                                cover
                                class="rounded-circle"
                                width="40"
                                height="40"
                            ></v-img>
                        </div>

                        <div class="text-t-sm font-weight-semibold text-text-tertiary">
                            {{ state.goodsInfo.creator?.name }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="background-primary pt-4 pb-8 px-2-5">
                <v-btn
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    block
                    :disabled="state.goodsInfo.status == 'completed'"
                    @click="onClickPurchase"
                >
                    {{ state.goodsInfo.status != 'completed' ? '구매하기' : '판매 종료' }}
                </v-btn>
            </div>
        </div>

        <v-dialog
            v-model="state.dialog"
            transition="dialog-bottom-transition"
            max-width="400"
        >
            <v-card class="pt-9 px-5 pb-5 text-center rounded-16">
                <div class="text-t-xl font-weight-bold mb-1 text-center">
                    포인트가 부족합니다
                </div>

                <div class="mb-6 font-weight-medium text-text-quaternary text-center">
                    상품 구입을 위한 포인트가 부족합니다. <br />
                    잔여 포인트 확인 후 구매해 주세요.
                </div>

                <div class="d-flex justify-center ga-3">
                    <v-btn
                        class="primary flex-1-1-100"
                        variant="tonal"
                        size="large"
                        @click="onClickOk"
                    >
                        확인
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts" setup>
import { IRewardItem } from "@/interfaces";

const router = useRouter();
const route = useRoute();

onMounted(() => {
    state.goodsInfo = dummy_follower;
});

const state = reactive({
    goodsInfo: {} as IRewardItem,
    dialog: false,
});

const onClickPurchase = () => {
    const isAbleToPurchase = true;

    if (!isAbleToPurchase) {
        // 구매 불가능
        state.dialog = true;
        return;
    }

    router.push("/dashboard/additional/rewards/complete")
}

const onClickOk = () => {
    state.dialog = false;
}

// ================================================================================================================================
const dummy_follower = {
    id: 1,
    name: "스타벅스_아이스아메리카노 ",
    imgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
    price: 2450,
    status: "ongoing",
    limit: 39990,
    description: "디지털로 만든 세상에 단 하나뿐인 일러스트 작품입니다. 구매시 정품 인증서까지 함께 배송됩니다.디지털로 만든 세상에 단 하나뿐인 일러스트 작품입니다. 구매시 정품 인증서까지 함께 배송됩니다.디지털로 만든 세상에 단 하나뿐인 일러스트 작품입니다. 구매시 정품 인증서까지 함께 배송됩니다.디지털로 만든 세상에 단 하나뿐인 일러스트 작품입니다. 구매시 정품 인증서까지 함께 배송됩니다.",
    creator: {
        id: 1,
        name: "김민수",
        profileImgUrl: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
    },
    isSelling: true,
} as IRewardItem;

</script>

<style lang="scss" scoped>
:deep(.v-list-item__spacer) {
    width: 8px !important;
}
</style>