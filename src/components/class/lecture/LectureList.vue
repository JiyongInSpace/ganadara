<template>
    <div class="background-secondary flex-grow-1">
        <div class="pa-4">
            <div class="d-flex justify-space-around background-primary">
                <v-btn
                    v-for="tab, key in tabSub.list"
                    :key="key"
                    variant="text"
                    v-ripple="false"
                    class="my-1"
                    @click="tabSub.tab.value = tab"
                >
                    <span
                        class="text-t-sm"
                        :class="tabSub.tab.value == tab ? 'text-text-primary font-weight-semibold' : 'text-text-disabled'"
                    >
                        {{ t(tab) }}
                    </span>
                </v-btn>
            </div>
        </div>

        <!-- 레벨별 -->
        <div v-if="tabSub.tab.value == 'level'">
            <v-chip-group
                v-model="tabSub.subtab.value"
                class="px-4 py-0 mb-5"
                selected-class="bg-black text-text-primary_on-brand"
                column
                mandatory
            >
                <v-chip
                    v-for="tag, key in tabSub.subList"
                    :key="key"
                    :value="tag"
                    variant="outlined"
                    size="small"
                    class="border-border-primary my-0 ml-0 mr-2"
                >
                    <span v-text="t(tag)" />
                </v-chip>
            </v-chip-group>

            <div class="text-t-lg font-weight-bold px-4 mb-3">
                [초급] Lv.1 모음
            </div>

            <div className="flex-shrink-0 d-flex ga-4 overflow-x-auto px-4 mb-8">
                <VideoThumbnail
                    v-for="(recentVideoItem, index) in dummy_data.videoList"
                    :key="index"
                    video-type="square"
                    :video-info="recentVideoItem"
                    v-ripple
                    @click="onClickLecture(recentVideoItem.id)"
                />
            </div>

            <div class="text-t-lg font-weight-bold px-4 mb-3">
                [초급] 완수해야 할 Unit 모음
            </div>

            <div className="flex-shrink-0 d-flex ga-4 overflow-x-auto px-4 mb-8">
                <VideoThumbnail
                    v-for="(recentVideoItem, index) in dummy_data.videoList"
                    :key="index"
                    video-type="square"
                    :video-info="recentVideoItem"
                    v-ripple
                    @click="onClickLecture(recentVideoItem.id)"
                />
            </div>
        </div>

        <!-- 테마별 -->
        <div v-if="tabSub.tab.value == 'theme'">
            <div class="text-t-lg font-weight-bold px-4 mb-3">
                즐거운 주말, 연인과 데이트
            </div>

            <div className="flex-shrink-0 d-flex ga-4 overflow-x-auto px-4 mb-8">
                <VideoThumbnail
                    v-for="(recentVideoItem, index) in dummy_data.videoList"
                    :key="index"
                    video-type="square"
                    :video-info="recentVideoItem"
                    v-ripple
                    @click="onClickLecture(recentVideoItem.id)"
                />
            </div>

            <div class="text-t-lg font-weight-bold px-4 mb-3">
                직장 생활, 이거면 충분해.
            </div>

            <div className="flex-shrink-0 d-flex ga-4 overflow-x-auto px-4 mb-8">
                <VideoThumbnail
                    v-for="(recentVideoItem, index) in dummy_data.videoList"
                    :key="index"
                    video-type="square"
                    :video-info="recentVideoItem"
                    v-ripple
                    @click="onClickLecture(recentVideoItem.id)"
                />
            </div>
        </div>

        <!-- 북마크 -->
        <div v-if="tabSub.tab.value == 'favorite'">
            <v-chip-group
                v-model="tabSub.subtab2.value"
                class="px-4 py-0 mb-5"
                selected-class="bg-black text-text-primary_on-brand"
                column
                mandatory
            >
                <v-chip
                    v-for="tag, key in tabSub.subList2"
                    :key="key"
                    :value="tag"
                    variant="outlined"
                    size="small"
                    class="border-border-primary my-0 ml-0 mr-2"
                >
                    <span v-text="t(tag)" />
                </v-chip>
            </v-chip-group>

            <div v-if="tabSub.subtab2.value == 'category'">
                <div class="text-t-lg font-weight-bold px-4 mb-3">
                    즐거운 주말, 연인과 데이트
                </div>

                <div className="flex-shrink-0 d-flex ga-4 overflow-x-auto px-4 mb-8">
                    <VideoThumbnail
                        v-for="(recentVideoItem, index) in dummy_data.videoList"
                        :key="index"
                        video-type="square"
                        :video-info="recentVideoItem"
                        v-ripple
                        @click="onClickLecture(recentVideoItem.id)"
                    />
                </div>

                <div class="text-t-lg font-weight-bold px-4 mb-3">
                    직장 생활, 이거면 충분해.
                </div>

                <div className="flex-shrink-0 d-flex ga-4 overflow-x-auto px-4 mb-8">
                    <VideoThumbnail
                        v-for="(recentVideoItem, index) in dummy_data.videoList"
                        :key="index"
                        video-type="square"
                        :video-info="recentVideoItem"
                        v-ripple
                        @click="onClickLecture(recentVideoItem.id)"
                    />
                </div>
            </div>

            <div v-if="tabSub.subtab2.value == 'video'">
                <div class="text-t-lg font-weight-bold px-4 mb-3">
                    즐거운 주말, 연인과 데이트
                </div>

                <div className="flex-shrink-0 d-flex flex-column ga-4 overflow-x-auto px-4 mb-8">
                    <VideoThumbnail
                        v-for="(recentVideoItem, index) in dummy_data.videoList"
                        :key="index"
                        video-type="rectangle"
                        :video-info="recentVideoItem"
                        v-ripple
                        @click="onClickLecture(recentVideoItem.id)"
                    />
                </div>

                <div class="text-t-lg font-weight-bold px-4 mb-3">
                    직장 생활, 이거면 충분해.
                </div>

                <div className="flex-shrink-0 d-flex flex-column ga-4 overflow-x-auto px-4 mb-8">
                    <VideoThumbnail
                        v-for="(recentVideoItem, index) in dummy_data.videoList"
                        :key="index"
                        video-type="rectangle"
                        :video-info="recentVideoItem"
                        v-ripple
                        @click="onClickLecture(recentVideoItem.id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { IShortForm } from "@/pages/home/main/index.vue";
import { useI18n } from "vue-i18n";

const router = useRouter();

const tabSub = {
    tab: ref('level'),
    list: [
        'level',
        'theme',
        'favorite',
    ],
    subtab: ref('beginner'),
    subList: [
        "beginner",
        "intermediate",
        "advanced"
    ],
    subtab2: ref('category'),
    subList2: [
        "category",
        "video",
    ],
}

const onClickLecture = (id: string) => {
    router.push("/class/regular/" + id)
}

const { t } = useI18n({
    messages: {
        ko: {
            level: "레벨별",
            theme: "테마별",
            favorite: "북마크",
            beginner: "초급",
            intermediate: "중급",
            advanced: "고급",
            category: "카테고리",
            video: "영상",
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

// ================================================================================
const dummy_data = {
    videoList: [
        {
            id: "1",
            title: "Theme Video Title1",
            creator: {
                name: "creator",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            thumbnail: "/images/home/dummy_thumbnail.png",
            progressPercentage: 0,
            singlePurchase: true
        },
        {
            id: "1",
            title: "Theme Video Title2",
            creator: {
                name: "creator",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            thumbnail: "/images/home/dummy_thumbnail2.png",
            progressPercentage: 80,
            singlePurchase: false
        },
        {
            id: "1",
            title: "Theme Video Title3 Theme Video Title3 Theme Video Title3",
            creator: {
                name: "creator",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            thumbnail: "/images/home/dummy_thumbnail.png",
            progressPercentage: 40,
            singlePurchase: true
        },
    ] as IShortForm[],
}

</script>