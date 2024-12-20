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
                @onClickEdit="onClickEdit"
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
                class="d-flex align-end text-t-sm mb-1 w-full"
                :class="{ 'truncate': !state.ui.moreView }"
            >
                <div
                    v-if="!state.ui.moreView"
                    v-html="feedItem.content.text"
                    class="truncate"
                >
                </div>

                <div
                    v-else
                    v-html="feedItem.content.text"
                    class="w-100"
                >
                </div>

                <div
                    v-if="feedItem.content.text.length > 40 && !state.ui.moreView"
                    class="text-decoration-underline cursor-pointer text-text-quaternary"
                    @click="state.ui.moreView = true"
                >
                    더보기
                </div>
            </div>

            <DialogComments
                v-model:dialog="state.ui.dialogComment"
                :comment-list="feedItem.comments"
            />

            <div class="d-flex align-center ga-1 text-t-sm mb-1-5">
                <span
                    v-if="!myCommentHighlight"
                    class="font-weight-semibold flex-shrink-0"
                >
                    {{ feedItem.comments[0].name }}
                </span>

                <v-chip
                    v-else
                    class="font-weight-semibold text-text-primary background-util-blue flex-shrink-0"
                    size="x-small"
                >
                    <v-card
                        width="4"
                        height="4"
                        class="bg-blue mr-0-5 rounded-circle"
                    ></v-card>
                    {{ feedItem.comments[0].name }}
                </v-chip>

                <div
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
                </div>

                <div
                    v-else
                    class="truncate"
                >
                    {{ feedItem.comments[0].text }}
                </div>

                <div
                    class="flex-shrink-0"
                    v-if="!feedItem.comments[0].isReported"
                >
                    <IconHeart
                        size="16"
                        class="cursor-pointer"
                        line-color="--v-text-primary"
                        :isActive="true"
                    />
                </div>
            </div>

            <div class="text-t-xs text-text-quaternary">
                {{ format(new Date(feedItem.content.date), 'MM월 dd일') }}
            </div>
        </div>
    </div>

    <CommunityCreateFeed
        v-model:dialog="state.ui.dialogEdit"
        :default-value="feedItem"
    />
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
    myCommentHighlight: boolean;
}>(), {
    myCommentHighlight: false,
});

const state = reactive({
    ui: {
        dialogReport: false,
        dialogComment: false,
        dialogEdit: false,
        moreView: false,
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

const onClickEdit = () => {
    state.ui.dialogEdit = true;
}

const firstMyComment = computed(() => {
    return props.feedItem.comments.find((comment) => comment.id === String(id.value));
});

const showingComment = computed(() => {
    if (props.myCommentHighlight && firstMyComment.value) {
        return firstMyComment;
    }
    return props.feedItem.comments[0];
});
</script>