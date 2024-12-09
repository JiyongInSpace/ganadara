<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
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
                    {{ t('purchase') }}
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
import { useLangStore } from '@/stores/lang'
const langStore = useLangStore();


const props = defineProps<{
    // videoInfo: IShortForm | undefined;
    videoType: "shortForm" | "square" | "rectangle";
    videoInfo: IShortForm;
}>();

// UI ========================================

const onClickVideoThumbnail = () => {
    console.log("onClickVideoThumbnail");
};



// 다국어
const { t, locale } = useI18n({
    messages: {
        ko: {
            purchase: "개별구매",
        },
        en: {
            purchase: "Individual Purchase",
        },
        cn: {
            purchase: "个人购买",
        },
        sp: {
            purchase: "Compra Individual",
        },
        vi: {
            purchase: "Mua Lẻ Cá Nhân",
        },
        jp: {
            purchase: "個人購入",
        },
        fr: {
            purchase: "Achat Individuel",
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

watch(
    () => langStore.currentLang,
    () => {
        locale.value = langStore.currentLang as any;
    }
)

</script>


<style lang="scss" scoped>


</style>