<template>
    <div class="d-flex flex-column">
        <v-sheet
            class="d-flex px-4 justify-space-between align-center"
            height="56"
        >
            <div
                class="d-flex ga-2 align-center cursor-pointer"
                @click="onClickProfile(feedItem.user.id)"
            >
                <v-img
                    :src="feedItem.user.profileImage"
                    width="32"
                    height="32"
                    class="rounded-8"
                />

                <div>
                    <div class="text-t-sm font-weight-semibold">
                        {{ feedItem.user.name }}
                    </div>

                    <div
                        v-if="feedItem.content.isCommercial"
                        class="text-t-xs text-text-tertiary"
                    >
                        광고
                    </div>
                </div>
            </div>

            <DialogEdit
                v-if="isMyFeed"
                :edit-id="feedItem.content.id"
            />
            <!-- v-else -->
            <DialogReport
                v-if="!isMyFeed && !feedItem.content.isCommercial"
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
                class="position-relative"
            >
                <v-img
                    :src="image"
                    :aspect-ratio="1 / 1"
                    cover
                    :style="{
                        filter: feedItem.isReported ? 'blur(25px)' : 'blur(0)'
                    }"
                />

                <div
                    v-if="feedItem.isReported"
                    class="position-absolute top-0 left-0 w-100 h-100 d-flex flex-column justify-center align-center"
                >
                    <v-img
                        src="/logo/logo_alert.svg"
                        width="24"
                        height="24"
                        class="flex-grow-0 mb-1"
                    ></v-img>

                    <div class="font-weight-bold text-text-primary_on-brand text-shadow">
                        콘텐츠를 확인 중입니다
                    </div>
                </div>
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
                    class="cursor-pointer"
                    @click="onClickLike"
                />
                <v-img
                    src="/icons/IconMessageCircle.svg"
                    width="24"
                    height="24"
                    alt="message"
                    class="flex-grow-0 cursor-pointer"
                    @click="onClickComment"
                />
                <v-img
                    src="/icons/IconLink.svg"
                    width="24"
                    height="24"
                    alt="link"
                    class="flex-grow-0 cursor-pointer"
                    @click="onClickShare"
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
                    class="d-flex position-relative flex-shrink-0"
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
                        class="position-absolute rounded-circle flex-grow-0 flex-shrink-0"
                        :style="{
                            left: (index * 20) + 'px',
                            zIndex: index,
                        }"
                    />
                </v-sheet>

                <span class="font-weight-medium">
                    <span class="font-weight-bold">
                        Olivia Rhye</span>님 외
                    <span class="font-weight-bold">
                        16명</span>이 좋아합니다.
                </span>
            </div>

            <div
                v-if="feedItem.isReported"
                class="d-flex align-center text-t-sm mb-1"
            >
                <v-img
                    src="/logo/logo_alert.svg"
                    width="16"
                    height="16"
                    class="flex-grow-0 mr-1"
                ></v-img>
                콘텐츠를 확인 중입니다
            </div>

            <div
                v-else
                class="text-t-sm mb-1"
            >
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

                <span
                    v-if="feedItem.comments[0].isReported"
                    class="d-flex align-center text-t-sm mb-1 truncate"
                >
                    <v-img
                        src="/logo/logo_alert.svg"
                        width="16"
                        height="16"
                        class="flex-grow-0 mr-1"
                    ></v-img>
                    콘텐츠를 확인 중입니다
                </span>

                <span v-else>
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
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

interface FeedItemWithCarousel extends IFeedItem {
    currentCarouselIndex?: number;
}

const props = withDefaults(defineProps<{
    feedItem: FeedItemWithCarousel;
    myFeed: boolean;
}>(), {
    feedList: () => [],
    myFeed: false,
});

const state = reactive({
    ui: {
        dialogReport: false,
        dialogComment: false,
    }
});


const { id } = storeToRefs(userStore);


const isMyFeed = computed(() => {
    return String(id.value) == props.feedItem.user.id;
})

const onClickProfile = (userId: string) => {
    router.push(`/community/user/${userId}`)
};

const onClickCommercial = () => {
    alert('더 알아보기');
};

const onClickLike = () => {
    alert('좋아요');
};

const onClickComment = () => {
    state.ui.dialogComment = true;
};

const onClickShare = async () => {
    try {
        await navigator.share({
            url: window.location.href, // 현재 페이지 URL
        });
    } catch (error) {
        console.error("공유 실패:", error);
    }
};
</script>