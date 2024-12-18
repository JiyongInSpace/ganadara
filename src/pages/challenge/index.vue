<template>
    <PageTemplate>
        <template v-slot:prepend-header>
            <div
                ref="refTabs"
                class="position-sticky top-0 z-1 foreground-white"
            >
                <v-tabs
                    v-model="tabMain.tab.value"
                    stacked
                    class="flex-shrink-0 text-text-quaternary font-weight-bold main-tab"
                    height="30"
                    selected-class="text-text-primary"
                >
                    <v-tab
                        v-for="tabMainItem in tabMain.list"
                        :key="tabMainItem"
                        :value="tabMainItem"
                        min-width="auto"
                        class="text-lowercase font-weight-bold px-0 mr-5"
                    >
                        <span class="text-t-xl">
                            {{ t(`main_tab.${tabMainItem}`) }}
                        </span>
                    </v-tab>
                </v-tabs>
            </div>
        </template>


        <template v-slot:content>
            <div class="d-flex justify-space-between">
                <span class="text-t-lg font-weight-bold">
                    데일리 미션
                </span>

                <v-btn
                    variant="text"
                    size="small"
                    class="px-0"
                    @click="onClickTotalDailyMission"
                >
                    전체 보기

                    <v-icon
                        icon="mdi-chevron-right"
                        class="ml-1"
                    />
                </v-btn>
            </div>

            <div>
                <swiper
                    :slides-per-view="'auto'"
                    :space-between="30"
                    :pagination="{
                        clickable: true,
                    }"
                    :modules="modules"
                    class="ga-4 mb-3 pb-8"
                >
                    <swiper-slide
                        v-for="(popularUserItem, index) in 5"
                        :key="index"
                        :style="{
                            width: '308px',
                        }"
                    >
                        <v-card
                            variant="outlined"
                            class="border-0 background-secondary d-flex flex-column ga-3 pt-4 px-4 pb-6"
                            min-width="288"
                            @click="router.push('/challenge/mission/quiz')"
                        >
                            <v-img
                                src="/images/challenge/quiz.png"
                                :aspect-ratio="288 / 200"
                                cover
                            ></v-img>

                            <div class="d-flex ga-1">
                                <v-chip
                                    variant="outlined"
                                    class="xxs info"
                                >
                                    데일리
                                </v-chip>

                                <v-chip
                                    variant="outlined"
                                    class="xxs-circle warning"
                                >
                                    <v-img
                                        src="/images/challenge/mission/point.png"
                                        class="shrink-0"
                                        alt="point"
                                        width="12"
                                        height="12"
                                    />
                                </v-chip>

                                <v-chip
                                    variant="outlined"
                                    class="xxs-circle purple"
                                >
                                    <v-img
                                        src="/images/challenge/mission/gift.png"
                                        class="shrink-0"
                                        alt="point"
                                        width="12"
                                        height="12"
                                    />
                                </v-chip>
                                
                                <v-chip
                                    variant="outlined"
                                    class="xxs brand"
                                >
                                    HOT
                                </v-chip>
                            </div>

                            <div>
                                <div class="text-t-xl font-weight-bold mb-1">
                                    퀴즈 풀고 포인트 받으세요!
                                </div>
                                <div class="text-t-sm text-text-secondary">
                                    3개 이상 맞추면 300P를 받을 수 있어요.
                                </div>
                            </div>
                        </v-card>
                    </swiper-slide>
                </swiper>
            </div>

            <div>
                <span class="text-t-lg font-weight-bold">
                    더 나은 세상 만들기
                </span>
            </div>

            <div class="mb-5">
                <v-card
                    variant="outlined"
                    class="border-0 background-secondary d-flex align-center ga-3 pa-4"
                    min-width="288"
                    @click="router.push('/challenge/mission/donate')"
                >
                    <v-img
                        src="/images/challenge/donate.png"
                        width="60"
                        height="60"
                        class="flex-grow-0"
                    ></v-img>
                    <div>
                        <div class="text-t-sm text-text-secondary">
                            같이하면 더 가치있는
                        </div>
                        <div class="font-weight-semibold">
                            따뜻한 마음 기부하기
                        </div>
                    </div>
                </v-card>
            </div>

            <div>
                <span class="text-t-lg font-weight-bold">
                    참여 가능 미션
                </span>
            </div>

            <div>
                <ChallengeMissionList :list="state.missionList" />
            </div>
        </template>

        <template v-slot:bottom>
        </template>

        <template v-slot:actions>
            <app-bottom-navigation />
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

// Swiper 모듈 설정
import { useI18n } from 'vue-i18n';

const router = useRouter();
const modules = ref([Pagination]);

const MAIN_TAB = {
    MISSION: "mission",
    RANKING: "ranking",
}

const state = reactive({
    missionList: [
        {
            id: 1,
            title: "오늘도 룰렛 돌리고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/point.png",
            to: "roulette",
            point: 2000
        },
        {
            id: 1,
            title: "오늘도 룰렛 돌리고",
            reward: "gift",
            tag: "reward",
            imageUrl: "/images/challenge/point.png",
            to: "roulette_gift",
            point: 0
        },
        {
            id: 2,
            title: "친구 초대하고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/invite.png",
            to: "invite",
            point: 2000
        },
        {
            id: 3,
            title: "퀴즈 풀고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/quiz.png",
            to: "quiz",
            point: 2000
        },
        {
            id: 4,
            title: "오늘 100% 혜택!",
            reward: "gift",
            tag: "reward",
            imageUrl: "/images/challenge/reward.png",
            to: "",
            point: 0
        },
        {
            id: 5,
            title: "AI 채팅하고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/chat_ai.png",
            to: "chat_ai",
            point: 2000
        },
        {
            id: 6,
            title: "매일매일 출석체크",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/check.png",
            to: "check",
            point: 2000
        },
        {
            id: 7,
            title: "학습도! 추가 혜택도!",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/quiz.png",
            to: "study",
            point: 2000
        },
        {
            id: 8,
            title: "커뮤니티 다녀오고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/community.png",
            to: "community",
            point: 2000
        },
        {
            id: 9,
            title: "같이하면 더 가치있는",
            reward: "social",
            tag: "donate",
            imageUrl: "/images/challenge/donate_social.png",
            to: "donate",
            point: 0
        },
        {
            id: 10,
            title: "좋은 콘텐츠를 부탁해!",
            reward: "creator",
            tag: "donate",
            imageUrl: "/images/challenge/donate_creator.png",
            to: "",
            point: 0
        },
    ]
})

// UI ========================================

const tabMain = {
    list: [
        MAIN_TAB.MISSION,
        MAIN_TAB.RANKING,
    ],
    tab: ref(MAIN_TAB.MISSION),
}

const onClickTotalDailyMission = () => {
    router.push("/challenge/mission");
}

// 번역
const { t } = useI18n({
    messages: {
        ko: {
            main_tab: {
                mission: "미션",
                ranking: "랭킹",
            },
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

watch(
    () => tabMain.tab.value,
    () => {
        if(tabMain.tab.value == MAIN_TAB.RANKING) {
            router.push("/community/ranking");
        }
    }
)

</script>


<style lang="scss" scoped></style>