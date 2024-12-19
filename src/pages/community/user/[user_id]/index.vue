<template>
    <PageTemplate
        space="pa-0"
        back-button
        no-gap
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                {{ state.user.nickName }}
            </span>

            <v-img
                v-if="isCreator"
                src="/logo/ganadara_yellow.png"
                width="24"
                height="24"
                alt="creator"
                class="flex-grow-0 ml-1"
            />
        </template>

        <template v-slot:append-header>
            <v-btn
                v-if="isCreator && !isMypage"
                variant="outlined"
                class="secondary px-2"
                @click="onClickDonate"
            >
                <v-img
                    src="/icons/IconDollar.png"
                    width="20"
                    height="20"
                    alt="donate"
                    class="flex-grow-0 mr-1-5"
                />
                후원
            </v-btn>

            <v-btn
                v-if="isCreator && isMypage"
                variant="outlined"
                class="secondary px-2"
            >
                <v-img
                    src="/icons/IconDollar.png"
                    width="20"
                    height="20"
                    alt="donate"
                    class="flex-grow-0 mr-1-5"
                />
                후원이력
            </v-btn>
        </template>

        <template v-slot:content>
            <div class="py-2-5 overflow-y-auto flex-grow-1">
                <div class="d-flex align-center ga-3 mb-2-5 px-4">
                    <v-img
                        src="/images/class/dummy_profile_image.png"
                        width="64"
                        height="64"
                        class="flex-grow-0"
                    />

                    <div class="d-flex justify-space-between ga-5 flex-grow-1 px-6">
                        <div
                            class="text-center flex-1-1-100 cursor-pointer"
                            @click="onClickFollow"
                        >
                            <div class="text-t-md font-weight-semibold">
                                {{ state.user.following.toLocaleString() }}
                            </div>

                            <div class="text-t-sm text-text-tertiary">
                                팔로잉
                            </div>
                        </div>

                        <div
                            class="text-center flex-1-1-100 cursor-pointer"
                            @click="onClickFollow"
                        >
                            <div class="text-t-md font-weight-semibold">
                                {{ state.user.follower.toLocaleString() }}
                            </div>

                            <div class="text-t-sm text-text-tertiary">
                                팔로워
                            </div>
                        </div>

                        <div
                            v-if="!isCreator"
                            class="text-center flex-1-1-100"
                        >
                            <div class="text-t-md font-weight-semibold">
                                {{ state.user.rank.toLocaleString() }}위
                            </div>

                            <div class="text-t-sm text-text-tertiary">
                                랭킹
                            </div>
                        </div>

                        <div
                            v-else
                            class="text-center flex-1-1-100"
                        >
                            <div class="text-t-md font-weight-semibold">
                                {{ state.user.contents.toLocaleString() }}
                            </div>

                            <div class="text-t-sm text-text-tertiary">
                                콘텐츠 수
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-t-md font-weight-semibold mb-0-5 px-4">
                    {{ state.user.nickName }}
                </div>

                <div class="text-t-sm text-text-tertiary mb-6 px-4">
                    {{ state.user.description }}
                </div>

                <div class="mb-6 px-4">
                    <div class="d-flex justify-center ga-1-5">
                        <v-btn
                            v-if="!isMypage"
                            class="primary flex-1-1-100"
                            variant="tonal"
                            @click="onClickFollow"
                        >
                            팔로우
                        </v-btn>

                        <v-btn
                            variant="outlined"
                            class="secondary flex-1-1-100"
                            @click="onClickBadge"
                        >
                            배지
                        </v-btn>

                        <v-btn
                            v-if="isMypage"
                            variant="outlined"
                            class="flex-1-1-100 secondary"
                            @click="onClickProfile"
                        >
                            프로필 수정
                        </v-btn>

                        <v-menu
                            v-if="isCreator"
                            offset="8"
                            elevation="0"
                        >
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    v-bind="props"
                                    flat
                                    variant="outlined"
                                    class="flex-1-1-100 secondary"
                                >
                                    SNS
                                    <v-icon right>mdi-chevron-down</v-icon>
                                </v-btn>
                            </template>

                            <v-card
                                flat
                                minWidth="150"
                            >
                                <div class="px-4 py-3 font-weight-semibold text-t-sm border-b">
                                    연결된 SNS 계정
                                </div>

                                <v-list>
                                    <v-list-item
                                        v-for="(item, index) in state.sns"
                                        :key="index"
                                        :value="index"
                                        @click="onClickSns(item)"
                                    >
                                        <v-list-item-title class="d-flex">
                                            <v-img
                                                :src="item.icon"
                                                width="24"
                                                height="24"
                                                class="flex-grow-0 mr-2"
                                            ></v-img>

                                            <span class="text-t-sm font-weight-medium text-text-secondary">
                                                {{ item.title }}
                                            </span>
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-menu>

                        <v-btn
                            v-if="!isMypage"
                            icon
                            class="secondary ml-auto"
                            variant="outlined"
                            width="36"
                            height="36"
                            @click="() => state.dialogReport = true"
                        >
                            <v-img
                                src="/icons/IconMessageAlertSquare.svg"
                                width="20"
                                height="20"
                                alt="contact-us"
                                class="flex-grow-0"
                            />
                        </v-btn>

                    </div>
                </div>

                <v-tabs
                    v-if="isCreator"
                    v-model="tabMain.tab.value"
                    stacked
                    class="flex-shrink-0 text-text-quaternary font-weight-bold main-tab border-b"
                    height="48"
                    selected-class="text-text-primary"
                    grow
                >
                    <v-tab
                        v-for="tabMainItem in tabMain.list"
                        :key="tabMainItem"
                        :value="tabMainItem"
                        class="text-lowercase font-weight-bold flex-1-1-100"
                    >
                        {{ t(tabMainItem) }}
                    </v-tab>
                </v-tabs>

                <div
                    v-if="tabMain.tab.value == 'content'"
                    class="d-flex justify-space-between align-center"
                >
                    <v-chip-group
                        class="my-6 px-4 py-0"
                        selected-class="bg-black text-text-primary_on-brand"
                        v-model="tabMain.subtab.value"
                        column
                        mandatory
                    >
                        <v-chip
                            v-for="tag in tabMain.subList"
                            :key="tag"
                            :value="tag"
                            variant="outlined"
                            size="large"
                            class="px-4 border-border-primary ma-0 mr-2"
                            @click="() => tabMain.subtab.value = tag"
                        >
                            <span v-text="t(tag)"></span>
                        </v-chip>
                    </v-chip-group>

                    <div class="my-6 px-4 py-0">
                        <v-btn
                            icon
                            size="small"
                            flat
                            @click="state.list_type = 'list'"
                        >
                            <v-icon
                                icon="mdi-format-list-text"
                                :class="state.list_type == 'list' ? 'text-text-primary' : 'opacity-30'"
                            />
                        </v-btn>

                        <v-btn
                            icon="mdi-square"
                            size="small"
                            flat
                            @click="state.list_type = 'square'"
                        >
                            <v-icon
                                icon="mdi-square"
                                :class="state.list_type == 'square' ? 'text-text-primary' : 'opacity-30'"
                            />
                        </v-btn>
                    </div>
                </div>

                <!-- 피드 -->
                <v-row
                    v-if="tabMain.tab.value == 'feed'"
                    no-gutters
                    class="ma-n0-5"
                >
                    <v-col
                        cols="4"
                        v-for="count in 10"
                    >
                        <div class="pa-0-5">
                            <v-img
                                src="/images/home/dummy_thumbnail2.png"
                                width="100%"
                                height="100%"
                                alt="contact-us"
                                class="flex-grow-0 cursor-pointer"
                                :aspect-ratio="1 / 1"
                                v-ripple
                                @click="onClickFeed('1')"
                            />
                        </div>
                    </v-col>
                </v-row>

                <!-- 컨텐츠 -->


                <!-- ## 정규학습 -->
                <div
                    v-if="tabMain.tab.value == 'content' && tabMain.subtab.value == 'class'"
                    class="flex-column ga-4 px-4"
                >
                    <div v-if="state.list_type == 'list'">
                        <div
                            v-for="(videoItem, index) in dummy_data.videoList"
                            :key="index"
                            class="d-flex ga-2 mb-4"
                            @click="onClickRegular('1')"
                        >
                            <v-card
                                color="secondary"
                                :image="videoItem.thumbnail"
                                class="pa-2 mb-2 rounded-4 d-flex flex-column justify-space-between flex-shrink-0"
                                width="173"
                                height="110"
                                :aspect-ratio="173 / 110"
                            >
                                <div v-if="videoItem.singlePurchase">
                                    <v-chip class="bg-black rounded-4 sm ">
                                        개별구매
                                    </v-chip>
                                </div>

                                <v-spacer />

                                <v-progress-linear
                                    :model-value="videoItem.progressPercentage"
                                    :max="100"
                                    color="primary"
                                    bg-color="white"
                                    bg-opacity="0.5"
                                    :height="6"
                                    :rounded="3"
                                />
                            </v-card>

                            <!-- <v-img
                                :src="videoItem.thumbnail"
                                max-width="173px"
                                width="100%"
                                height="100%"
                                alt="contact-us"
                                class="flex-grow-0 rounded-4"
                                cover
                                :aspect-ratio="173 / 110"
                            /> -->

                            <div>
                                <div class="text-t-sm font-weight-medium line-clamp-3 mb-1">
                                    {{ videoItem.title }}
                                </div>

                                <div class="text-text-secondary text-t-sm">
                                    {{ videoItem.category }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <v-row
                        v-if="state.list_type == 'square'"
                        dense
                    >
                        <v-col
                            v-for="(videoItem, index) in dummy_data.videoList"
                            cols="6"
                            sm="4"
                            md="3"
                            :key="index"
                            class="mb-2"
                        >
                            <div class="overflow-x-auto flex-shrink-0 cursor-pointer">
                                <v-card
                                    color="secondary"
                                    :image="videoItem.thumbnail"
                                    class="pa-2 mb-2 rounded-4 d-flex flex-column justify-space-between"
                                    :style="{
                                        aspectRatio: '1/1',
                                    }"
                                >
                                    <div v-if="videoItem.singlePurchase">
                                        <v-chip class="bg-black rounded-4 sm ">
                                            개별구매
                                        </v-chip>
                                    </div>

                                    <v-spacer />

                                    <v-progress-linear
                                        :model-value="videoItem.progressPercentage"
                                        :max="100"
                                        color="primary"
                                        bg-color="white"
                                        bg-opacity="0.5"
                                        :height="6"
                                        :rounded="3"
                                    />
                                </v-card>

                                <div class="line-clamp-2 text-t-sm mb-1">
                                    {{ videoItem.title }}
                                </div>

                                <div class="text-text-tertiary text-t-sm">
                                    {{ videoItem.category }}
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>

                <!-- ## 숏폼 -->
                <v-row
                    v-if="tabMain.tab.value == 'content' && tabMain.subtab.value == 'shortform'"
                    no-gutters
                    class="ma-n0-5"
                >
                    <v-col
                        cols="4"
                        v-for="count in 10"
                    >
                        <div
                            class="position-relative pa-0-5"
                            @click="onClickShortform('1')"
                        >
                            <v-img
                                src="/images/home/dummy_thumbnail2.png"
                                width="100%"
                                height="100%"
                                alt="contact-us"
                                class="flex-grow-0 rounded-4 flex-shrink-0"
                                cover
                                :aspect-ratio="122 / 200"
                            />

                            <div class="position-absolute left-3 right-3 bottom-3 z-1">
                                <span class="text-t-sm text-text-white text-shadow font-weight-semibold">
                                    Short-form Title maximum of three lines
                                </span>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </template>

        <template v-slot:actions>
            <app-bottom-navigation />
        </template>
    </PageTemplate>

    <DialogReport
        v-model:dialog="state.dialogReport"
        :report-id="route.params.user_id"
    />
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { useI18n } from "vue-i18n";

const router = useRouter();
const userStore = useUserStore();

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { user_id: string } };

const isMypage = computed(() => {
    // 내 페이지인지 확인 (추후 수정)
    return route.params.user_id == "3" || route.params.user_id == "4";
})

const isCreator = computed(() => {
    // 크리에이터 여부 확인 (추후 수정)
    return route.params.user_id == "2" || route.params.user_id == "4";
})

const state = reactive({
    user: {
        name: 'userName',
        nickName: 'UserNickName',
        description: 'Descriptions',
        following: 9999,
        follower: 9999,
        rank: 9999,
        contents: 9999,
    },
    feeds: [],
    contents: [],
    dialogReport: false,
    sns: [
        {
            title: 'Mypool',
            icon: '/logo/sns_mypool.png',
            url: 'https://ekyss2023.cafe24.com/default/'
        },
        {
            title: 'Instagram',
            icon: '/logo/sns_instagram.png',
            url: 'https://instagram.com'
        },
        {
            title: 'Youtube',
            icon: '/logo/sns_youtube.png',
            url: 'https://youtube.com'
        },
        {
            title: 'Tiktok',
            icon: '/logo/sns_tiktok.png',
            url: 'https://tiktok.com'
        },
    ],
    list_type: 'list' // 퍼블리싱 확인용
});


const tabMain = {
    list: [
        'feed',
        'content',
    ],
    tab: ref('feed'),
    subList: [
        'class',
        'shortform',
    ],
    subtab: ref('class'),
}

const onClickDonate = () => {
    router.push(`/community/user/${route.params.user_id}/donate`);
}

const onClickBadge = () => {
    router.push(`/community/user/${route.params.user_id}/badge`);
}

const onClickFollow = () => {
    router.push(`/community/user/${route.params.user_id}/follow`);
}

const onClickFeed = (id: string) => {
    router.push(`/community?id=${id}`)
}

const onClickRegular = (id: string) => {
    router.push(`/class/regular/${id}`)
}

const onClickShortform = (id: string) => {
    router.push(`/class/shortform/${id}`)
}

const onClickProfile = () => {
    router.push("/dashboard/profile");
}

const onClickSns = (item: any) => {
    window.open(item.url, '_blank');
}

const { t } = useI18n({
    messages: {
        ko: {
            feed: "피드",
            content: "콘텐츠",
            class: "정규학습",
            shortform: "숏폼",
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});



const dummy_data = {
    videoList: [
        {
            id: "1",
            title: "강의 타이틀 최대 세 줄 강의 타이틀 최대 세 줄 강의 타이틀 최대 세 줄 최대 세 줄 최대 세강의 타이틀 최대 세 줄 강의 타이틀 최대 세 줄 강의 타이틀 최대 세 줄 최대 세 줄 최대 세",
            creator: {
                name: "creator",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            thumbnail: "/images/home/dummy_thumbnail.png",
            progressPercentage: 0,
            singlePurchase: true,
            category: " 강의 카테고리명"
        },
        {
            id: "1",
            title: "강의 타이틀 최대 두 줄 뭐 먹고 싶어? 함께 갈 식당 고르기",
            creator: {
                name: "creator",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            thumbnail: "/images/home/dummy_thumbnail2.png",
            progressPercentage: 80,
            singlePurchase: false,
            category: " 강의 카테고리명"
        },
        {
            id: "1",
            title: "강의 타이틀 최대 두 줄 뭐 먹고 싶어? 함께 갈 식당 고르기",
            creator: {
                name: "creator",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            thumbnail: "/images/home/dummy_thumbnail.png",
            progressPercentage: 40,
            singlePurchase: true,
            category: " 강의 카테고리명"
        },
        {
            id: "1",
            title: "강의 타이틀 최대 두 줄 뭐 먹고 싶어? 함께 갈 식당 고르기",
            creator: {
                name: "creator",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            thumbnail: "/images/home/dummy_thumbnail.png",
            progressPercentage: 40,
            singlePurchase: true,
            category: " 강의 카테고리명"
        },
        {
            id: "1",
            title: "강의 타이틀 최대 두 줄 뭐 먹고 싶어? 함께 갈 식당 고르기",
            creator: {
                name: "creator",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            thumbnail: "/images/home/dummy_thumbnail2.png",
            progressPercentage: 80,
            singlePurchase: false,
            category: " 강의 카테고리명"
        },
        {
            id: "1",
            title: "강의 타이틀 최대 두 줄 뭐 먹고 싶어? 함께 갈 식당 고르기",
            creator: {
                name: "creator",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            thumbnail: "/images/home/dummy_thumbnail.png",
            progressPercentage: 40,
            singlePurchase: true,
            category: " 강의 카테고리명"
        },
        {
            id: "1",
            title: "강의 타이틀 최대 두 줄 뭐 먹고 싶어? 함께 갈 식당 고르기",
            creator: {
                name: "creator",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            thumbnail: "/images/home/dummy_thumbnail.png",
            progressPercentage: 40,
            singlePurchase: true,
            category: " 강의 카테고리명"
        },
    ]
}
</script>


<style lang="scss" scoped>
.v-select.v-select--single {
    :deep(.v-label) {
        font-size: 1.4rem;
        font-weight: 500;
        color: #000;
        opacity: 1 !important;
    }
}
</style>