
<template>
    <div
        class="overflow-x-auto flex-shrink-0 cursor-pointer"
        :style="{
            width: videoType == 'square' ? '150px' : '312px',
        }"
        @click="onClickVideoThumbnail"
    >
        <v-card
            :height="videoType == 'square' ? 150 : 163"
            color="secondary"
            :image="videoInfo.thumbnail"
            class="pa-2 mb-2 rounded-4 d-flex flex-column justify-space-between"
            :style="{
                aspectRatio: videoType == 'square' ? '1/1' : '312/163',
            }"
        >
            <div v-if="videoInfo.singlePurchase">
                <v-chip class="bg-black rounded-4 sm ">
                    개별 구매
                </v-chip>
            </div>

            <v-spacer />

            <v-progress-linear
                :model-value="videoInfo.progressPercentage"
                :max="100"
                color="primary"
                bg-color="white"
                bg-opacity="0.5"
                :height="6"
                :rounded="3"
            />
        </v-card>

        <div class="d-flex align-center pointer-events-auto mb-1">
            <v-img
                :src="videoInfo.creator.profileImage"
                height="20"
                width="20"
                cover
                class="rounded-circle mr-1-5 flex-grow-0"
            />

            <span class="mr-3 text-t-xs font-weight-medium">
                {{ videoInfo.creator.name }}
            </span>
        </div>

        <div class="line-clamp-2 text-t-sm">
            {{ videoInfo.title }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { IShortForm } from '@/pages/home/main/index.vue';
import { useI18n } from 'vue-i18n';


const props = defineProps<{
    // videoInfo: IShortForm | undefined;
    videoType: "shortForm" | "square" | "rectangle";
    videoInfo: IShortForm;
}>();

// UI ========================================

const onClickVideoThumbnail = () => {
    console.log("onClickVideoThumbnail");
};


// 번역
const { t } = useI18n({
    messages: {
        en: {
            main_tab: {
                all: "전체",
                following: "팔로잉",
                my_comments: "내가 남긴 댓글",
            },
        },
        ko: {
            main_tab: {
                all: "전체",
                following: "팔로잉",
                my_comments: "내가 남긴 댓글",
            },
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

</script>


<style lang="scss" scoped></style>