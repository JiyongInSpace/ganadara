<template>
    <PageTemplate
        space="pa-0"
        back-button
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                랭킹
            </span>
        </template>

        <template v-slot:content>
            <div>
                <v-tabs
                    v-model="tabMain.tab.value"
                    align-tabs="center"
                    stacked
                    grow
                    height="48"
                >
                    <v-tab
                        v-for="(mainTabItem, i) in tabMain.list"
                        :key="i"
                        :value="mainTabItem"
                        class="border-b flex-1-1-100"
                    >
                        {{ t(mainTabItem) }}
                    </v-tab>
                </v-tabs>
            </div>

            <div class="d-flex justify-space-between pt-6 pb-3 px-4 flex-wrap">
                <span class="text-t-md font-weight-semibold">
                    {{ rankingLabel }}
                </span>

                <v-spacer />

                <div
                    v-if="tabMain.tab.value != 'total'"
                    class="d-flex align-center ga-1"
                >
                    <span class="text-t-sm">남은 시간</span>
                    <span class="text-t-md font-weight-semibold">{{ remainingTime }}</span>
                </div>
            </div>


            <CommunityRanking
                v-if="tabMain.tab.value == 'daily'"
                :rankerList="state.rankingDaily"
            />
            <CommunityRanking
                v-if="tabMain.tab.value == 'monthly'"
                :rankerList="state.rankingDaily"
            />
            <CommunityRanking
                v-if="tabMain.tab.value == 'total'"
                :rankerList="state.rankingDaily"
            />
        </template>

        <template v-slot:bottom>
        </template>

        <template v-slot:actions>
            <app-bottom-navigation />

        </template>
    </PageTemplate>

</template>

<script lang="ts" setup>
import { IRanker } from "@/interfaces";
import { format } from "date-fns";
import { useI18n } from "vue-i18n";

const tabMain = {
    list: [
        'daily',
        'monthly',
        'total',
    ],
    tab: ref('daily'),
}

const currentDate = ref(new Date());
const remainingTime = ref("");

const formattedDate = computed(() => {
    return format(currentDate.value, "MM월 dd일");
});

// 날짜 형식 포맷터
const rankingLabel = computed(() => {
  const currentTab = tabMain.tab.value;

  if (currentTab === "daily") {
    return `${format(currentDate.value, "MM월 dd일")} 데일리 랭킹`;
  } else if (currentTab === "monthly") {
    return `${format(currentDate.value, "MM월")} 랭킹`;
  } else if (currentTab === "total") {
    return "누적 랭킹";
  }
  return ""; // 기본값 처리
});

const updateRemainingTime = () => {
    const now = new Date();

    let endOfPeriod;
    if (tabMain.tab.value === 'daily') {
        // 하루 기준
        endOfPeriod = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    } else if (tabMain.tab.value === 'monthly') {
        // 한 달 기준 (이번 달의 마지막 날)
        endOfPeriod = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else {
        // total 또는 기타 경우
        remainingTime.value = "∞"; // 제한 없음
        return;
    }

    const timeDiff = Number(endOfPeriod) - Number(now);

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    // 결과 저장
    if (tabMain.tab.value === 'monthly') {
        remainingTime.value = `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        remainingTime.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
};


onMounted(() => {
    // 데이터
    state.rankingDaily = dummy_rankers;
    state.rankingMonthly = dummy_rankers;
    state.rankingTotal = dummy_rankers;

    // 시간 설정
    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 1000);

    onUnmounted(() => clearInterval(timer));
});

watch(
    () => tabMain.tab.value,
    () => {
        updateRemainingTime();
    }
)

const state = reactive({
    rankingDaily: [] as IRanker[],
    rankingMonthly: [] as IRanker[],
    rankingTotal: [] as IRanker[],
});



const dummy_rankers = [
    {
        rank: 1,
        id: "1",
        name: '김철수',
        profileImage: '/images/class/dummy_profile_image.png',
        score: 1000,
        isFollowing: false,
    },
    {
        rank: 2,
        id: "2",
        name: '김영희',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        score: 900,
    },
    {
        rank: 3,
        id: "3",
        name: '박민수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        score: 800,
    },
    {
        rank: 4,
        id: "4",
        name: '이지수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        score: 700,
    },
    {
        rank: 5,
        id: "5",
        name: '최영수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        score: 600,
    },
    {
        rank: 6,
        id: "6",
        name: '이민지',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        score: 500,
    },
    {
        rank: 7,
        id: "7",
        name: '박영희',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        score: 400,
    },
    {
        rank: 8,
        id: "8",
        name: '김민수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        score: 300,
    },
    {
        rank: 9,
        id: "9",
        name: '최지수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        score: 200,
    },
    {
        rank: 10,
        id: "10",
        name: '박철수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        score: 100,
    }
] as IRanker[];

const { t } = useI18n({
    messages: {
        ko: {
            daily: "데일리",
            monthly: "한달",
            total: "누적",
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

</script>

<style lang="scss" scoped>
:deep(.v-list-item__spacer) {
    width: 8px !important;
}
</style>