<template>
    <div class="d-flex flex-column">
        <v-sheet
            class="d-flex px-4 justify-space-between align-center"
            height="56"
        >
            <div class="d-flex ga-2 align-center">
                <v-img
                    :src="feedItem.user.profileImage"
                    width="32"
                    height="32"
                    class="rounded-8"
                />

                <div class="text-t-sm font-weight-semibold">
                    {{ feedItem.user.name }}
                </div>
            </div>

            <DialogReport
                v-model:dialog="state.ui.dialogReport"
                :report-id="feedItem.content.id"
            />
        </v-sheet>

        <v-carousel
            v-model="feedItem.currentCarouselIndex"
            :show-arrows="false"
            class="bg-layer-1 flex-grow-0"
            hide-delimiters
            height="fit-content"
        >
            <v-carousel-item
                v-for="(image, i) in feedItem.content.images"
                :key="i"
            >
                <v-img
                    :src="image"
                    :aspect-ratio="1 / 1"
                    cover
                />
            </v-carousel-item>
        </v-carousel>

        <v-sheet
            v-if="feedItem.content.isCommercial"
            class="elevation-0 foreground-brand-secondary text-text-primary_on-brand px-4 py-3 d-flex justify-space-between align-center cursor-pointer"
            v-ripple
            @click="onClickCommercial"
        >
            <span class="text-t-sm font-weight-semibold">
                더 알아보기
            </span>

            <v-icon icon="mdi-chevron-right" />
        </v-sheet>

        <div class="position-relative pa-4">
            <div class="d-flex ga-4">
                <IconHeart
                    :is-active="false"
                    line-color="--v-text-primary"
                    size="24"
                />
                <v-img
                    src="/icons/IconMessageCircle.svg"
                    width="24"
                    height="24"
                    alt="message"
                    class="flex-grow-0"
                />
                <v-img
                    src="/icons/IconLink.svg"
                    width="24"
                    height="24"
                    alt="link"
                    class="flex-grow-0"
                />
            </div>

            <div class="d-flex ga-1-5 position-center">
                <v-card
                    v-for="(subQuizList, i) in feedItem.content.images"
                    :key="i"
                    class="elevation-0 transition-all"
                    :class="(feedItem.currentCarouselIndex != i) ? 'foreground-disabled-subtle' : 'foreground-brand-primary'"
                    width="8"
                    height="8"
                />
            </div>
        </div>

        <div class="px-4">
            <div class="text-t-sm mb-3 d-flex align-center ga-2">
                <v-sheet
                    class="d-flex position-relative"
                    height="24"
                    :width="24 + (feedItem.likes.slice(0, 3).length - 1) * 20"
                >
                    <v-img
                        v-for="(creator, index) in feedItem.likes.slice(0, 3)"
                        :key="creator.id"
                        :src="creator.profileImage"
                        width="24"
                        height="24"
                        cover
                        class="position-absolute rounded-circle flex-grow-0"
                        :style="{
                            left: (index * 20) + 'px',
                            zIndex: index,
                        }"
                    />
                </v-sheet>

                <span class="font-weight-medium">
                    <span class="font-weight-bold">
                        Olivia
                    </span>
                    님 외
                    <span class="font-weight-bold">
                        16명
                    </span>
                    이 좋아합니다.
                </span>
            </div>

            <div class="text-t-sm mb-1">
                {{ feedItem.content.text }}
            </div>

            <DialogComments
                v-model:dialog="state.ui.dialogComment"
                :comment-list="feedItem.comments"
            />

            <div class="d-flex truncate ga-1 text-t-sm mb-1-5">
                <span class="font-weight-semibold">
                    {{ feedItem.comments[0].name }}
                </span>

                <span class="truncate">
                    {{ feedItem.comments[0].text }}
                </span>
            </div>

            <div class="text-t-xs text-text-quaternary">
                {{ format(new Date(feedItem.content.date), 'MM월 dd일') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';
import IconHeart from '../common/icons/IconHeart.vue';
import { IFeedItem } from '@/interfaces';
import DialogReport from './DialogReport.vue';

interface FeedItemWithCarousel extends IFeedItem {
    currentCarouselIndex?: number;
}


const props = defineProps<{
    feedItem: FeedItemWithCarousel;
}>();


const state = reactive({
    ui: {
        dialogReport: false,
        dialogComment: false,
    }
});


const onClickCommercial = () => {
    alert('더 알아보기');
};
</script>