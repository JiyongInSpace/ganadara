<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <v-card
            class="w-100 d-flex flex-column position-relative flex-shrink-0 rounded-0 px-4 pb-4"
            image="/images/home/dummy_thumbnail.png"
            height="420"
        >
            <div class="d-flex align-center h-14">
                <v-btn
                    icon
                    variant="text"
                    size="20"
                    @click="onClickBack"
                >
                    <v-icon
                        icon="mdi-chevron-left"
                        size="24"
                        color="white"
                    ></v-icon>
                </v-btn>
            </div>

            <v-spacer />

            <div class="text-shadow">
                <div class="d-flex align-center pointer-events-auto mb-1">
                    <v-img
                        :src="state.creator.profileImage"
                        height="32"
                        width="32"
                        cover
                        class="rounded-circle mr-1 flex-grow-0"
                    />

                    <span class="mr-3 text-t-sm font-weight-semibold text-text-primary_on-brand">
                        {{ state.creator.name }}
                    </span>
                </div>

                <div class="text-t-lg font-weight-bold text-text-primary_on-brand">
                    {{ state.content.title }}
                </div>
                <div class="d-flex align-end text-t-sm text-text-placeholder_subtle mb-8">
                    <div
                        :class="state.view_more ? '' : 'line-clamp-2'"
                        v-html="state.content.description"
                    >
                    </div>

                    <div
                        v-if="!state.view_more"
                        class="truncate flex-shrink-0 text-decoration-underline font-weight-semibold"
                        @click="state.view_more = !state.view_more"
                    >
                        더보기
                    </div>
                </div>

                <div class="d-flex ga-2">
                    <v-btn
                        variant="tonal"
                        class="primary"
                        width="165"
                        @click="onClickPurchase"
                    >
                        묶음 구매하기
                    </v-btn>

                    <v-btn
                        :icon="state.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
                        size="small"
                        variant="tonal"
                        class="rounded-circle custom-background text-border-primary"
                        @click="onClickLike"
                    />

                    <v-btn
                        :icon="state.isBookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
                        size="small"
                        variant="tonal"
                        class="rounded-circle custom-background text-border-primary"
                        @click="onClickBookmark"
                    />

                    <v-btn
                        icon="mdi-share-variant-outline"
                        size="small"
                        variant="tonal"
                        class="rounded-circle custom-background text-border-primary"
                        @click="onClickShare"
                    />

                </div>
            </div>
        </v-card>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto pa-4">
            <div class="d-flex justify-space-between align-center mb-5">
                <span class="text-t-lg font-weight-bold">
                    강의 목록
                </span>

                <span class="font-weight-medium text-text-tertiary">
                    총 0강
                </span>
            </div>

            <div
                v-for="(recentVideoItem, index) in dummy_data.videoList"
                :key="index"
                v-ripple
                class="d-flex ga-4 mb-6"
                @click="onClickLecture(recentVideoItem)"
            >
                <div class="flex-shrink-0">
                    <VideoThumbnail
                        video-type="square"
                        :video-info="recentVideoItem"
                        v-ripple
                        only-thumbnail
                        :defaultWidth="120"
                    />
                </div>

                <div>
                    <div class="mb-2">
                        <v-chip
                            class="bg-black mr-1"
                            size="x-small"
                        >
                            0강
                        </v-chip>

                        <v-chip
                            size="x-small"
                            variant="outlined"
                            class="background-secondary border-border-primary"
                        >
                            경험치 0
                        </v-chip>
                    </div>

                    <div class="font-weight-medium mb-1-5 line-clamp-2">
                        {{ recentVideoItem.title }}
                    </div>

                    <v-btn
                        variant="outlined"
                        class="px-3-5"
                        :class="recentVideoItem.status == 'in_progress' ? 'primary' : 'secondary'"
                        :disabled="recentVideoItem.status != 'in_progress'"
                    >
                        문제 풀기
                        <span
                            v-if="recentVideoItem.status == 'completed'"
                            class="ml-1"
                        >
                            완료
                        </span>
                    </v-btn>
                </div>
            </div>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import IconBookAdd from '@/components/common/icons/IconBookAdd.vue';


const router = useRouter();


const state = reactive({
    creator: {
        name: "creator",
        profileImage: "/images/class/dummy_profile_image.png",
        isFollowed: false,
    },
    isLiked: false,
    isBookmarked: false,
    content: {
        title: "[Lv.1] 즐거운 주말, 연인과 데이트",
        description: "영어를 쓰는 연인과의 데이트에 좋은 표현들!<br/> 약속을 잡는 것부터 의사 결정을 하는 것까지 학습할 수 있어요. 다른 나라 친구와의 만남을 용기 있게 시작해보세요!",
    },
    view_more: false,
})

const onClickBack = () => {
    router.back();
}

const onClickPurchase = () => {
    alert("구매창")
}

const onClickLecture = (lecture: any) => {
    router.push(`/class/regular/${lecture.id}`);
}

const onClickLike = () => {
    state.isLiked = !state.isLiked;
}

const onClickBookmark = () => {
    state.isBookmarked = !state.isBookmarked;
}

const onClickShare = () => {
    navigator.share({
        text: window.location.href,
    })
}

// ================================================================================
const dummy_data = {
    videoList: [
        {
            id: "1",
            title: "우리 언제 만날까? 이번 주 토요일 시간 돼? 약속 잡기",
            thumbnail: "/images/home/dummy_thumbnail.png",
            progressPercentage: 0,
            singlePurchase: true,
            status: "completed",
        },
        {
            id: "1",
            title: "강의 타이틀 최대 두 줄 강의 타이틀 최대 두 줄",
            thumbnail: "/images/home/dummy_thumbnail2.png",
            progressPercentage: 80,
            singlePurchase: false,
            status: "in_progress",
        },
        {
            id: "1",
            title: "Theme Video Title3 Theme Video Title3 Theme Video Title3",
            thumbnail: "/images/home/dummy_thumbnail.png",
            progressPercentage: 40,
            singlePurchase: true,
            status: "not_started",
        },
    ] as any[],
}

</script>


<style lang="scss" scoped>
</style>