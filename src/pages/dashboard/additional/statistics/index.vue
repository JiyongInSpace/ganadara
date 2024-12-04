<template>
    <v-container
        class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto background-secondary"
    >
        <div
            class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5 background-primary">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                학습 통계
            </span>

            <v-spacer />
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto ga-2">
            <div class="background-primary px-4 py-5">
                <v-chip-group
                    class="py-0 mb-5"
                    selected-class="bg-black text-text-primary_on-brand"
                    v-model="state.selectedTag"
                    column
                >
                    <v-chip
                        v-for="tag in dummy_tags"
                        :key="tag.key"
                        :value="tag.key"
                        variant="outlined"
                        size="small"
                        class="border-border-primary my-0 ml-0 mr-2"
                    >
                        <span v-text="tag.value" />
                    </v-chip>
                </v-chip-group>

                <div class="d-flex justify-space-between align-center mb-5">
                    <span class="text-t-lg font-weight-bold">
                        학습 경험치
                    </span>

                    <span class="text-d-sm font-weight-bold text-text-brand-quaternary">
                        {{ state.experience.toLocaleString() }} EXP
                    </span>
                </div>

                <div class="mb-5">
                    <VerticalProgressBars :list="state.experienceList" />
                </div>


                <!-- 일간 -->
                <v-card
                    class="d-flex background-secondary border-border-primary rounded-8 text-center py-5"
                    variant="outlined"
                >
                    <div class="flex-1-1-100">
                        <div class="text-t-sm font-weight-medium mb-1">
                            {{ state.selectedTag === 'daily' ? '연속 출석' : '출석' }}
                        </div>

                        <div class="text-d-xs font-weight-bold">
                            {{ state.attendanceStreak }}
                        </div>
                    </div>

                    <div class="flex-1-1-100">
                        <div class="text-t-sm font-weight-medium mb-1">
                            학습 시간
                        </div>

                        <div class="text-d-xs font-weight-bold">
                            {{ state.studyTime }}
                        </div>
                    </div>

                    <div class="flex-1-1-100">
                        <div class="text-t-sm font-weight-medium mb-1">
                            문제
                        </div>

                        <div class="text-d-xs font-weight-bold">
                            {{ state.questionCount }}
                        </div>
                    </div>
                </v-card>
            </div>

            <div
                v-if="state.selectedTag === 'daily'"
                class="background-primary px-4 py-10"
            >
                <div class="d-flex justify-space-between align-center mb-2-5">
                    <span class="text-t-lg font-weight-bold">
                        레벨 테스트
                    </span>

                    <v-btn
                        variant="text"
                        class="px-0"
                        @click="onClickLevelTest"
                    >

                        전체 보기 <v-icon icon="mdi-chevron-right"></v-icon>
                    </v-btn>
                </div>

                <div class="pa-5 mb-10">
                    <div class="mb-5">
                        <div class="d-flex justify-space-between mb-2">
                            <span class="text-t-sm font-weight-medium">
                                나의 레벨
                            </span>

                            <span class="text-t-xl font-weight-bold">
                                LV.{{ state.level }}
                            </span>
                        </div>

                        <v-progress-linear
                            color="red-darken-2"
                            :max="7"
                            :model-value="state.level"
                            rounded
                            height="9"
                        />
                    </div>

                    <div>
                        <div class="d-flex justify-space-between mb-2">
                            <span class="text-t-sm font-weight-medium">
                                LV.{{ state.level }} 상위
                            </span>

                            <span class="text-t-xl font-weight-bold">
                                {{ state.levelTop }}%
                            </span>
                        </div>

                        <v-progress-linear
                            color="red-darken-2"
                            :model-value="100 - state.levelTop"
                            rounded
                            height="9"
                        />
                    </div>
                </div>

                <div class="d-flex justify-space-between align-center mb-2-5">
                    <span class="text-t-lg font-weight-bold">
                        모의고사
                    </span>

                    <v-btn
                        variant="text"
                        class="px-0"
                        @click="onClickMockTest"
                    >

                        전체 보기 <v-icon icon="mdi-chevron-right"></v-icon>
                    </v-btn>
                </div>

                <v-card
                    class="d-flex background-secondary border-border-primary rounded-8 text-center py-5 mb-10"
                    variant="outlined"
                >
                    <div class="flex-1-1-100">
                        <div class="text-t-sm font-weight-medium mb-1">
                            모의고사 수
                        </div>

                        <div class="text-d-xs font-weight-bold">
                            {{ state.mockTestNumber }}
                        </div>
                    </div>

                    <div class="flex-1-1-100">
                        <div class="text-t-sm font-weight-medium mb-1">
                            평균 점수
                        </div>

                        <div class="text-d-xs font-weight-bold">
                            {{ state.mockTestAverage }}
                        </div>
                    </div>

                    <div class="flex-1-1-100">
                        <div class="text-t-sm font-weight-medium mb-1">
                            상위
                        </div>

                        <div class="text-d-xs font-weight-bold">
                            {{ state.mockTestTop }}%
                        </div>
                    </div>
                </v-card>

                <div class="d-flex justify-space-between align-center mb-2-5">
                    <span class="text-t-lg font-weight-bold">
                        단원평가
                    </span>

                    <v-btn
                        variant="text"
                        class="px-0"
                        @click="onClickChapterTest"
                    >

                        전체 보기 <v-icon icon="mdi-chevron-right"></v-icon>
                    </v-btn>
                </div>

                <v-card
                    class="d-flex background-secondary border-border-primary rounded-8 text-center py-5"
                    variant="outlined"
                >
                    <div class="flex-1-1-100">
                        <div class="text-t-sm font-weight-medium mb-1">
                            단원평가 수
                        </div>

                        <div class="text-d-xs font-weight-bold">
                            {{ state.chapterTestNumber }}
                        </div>
                    </div>

                    <div class="flex-1-1-100">
                        <div class="text-t-sm font-weight-medium mb-1">
                            평균 점수
                        </div>

                        <div class="text-d-xs font-weight-bold">
                            {{ state.chapterTestAverage }}
                        </div>
                    </div>

                    <div class="flex-1-1-100">
                        <div class="text-t-sm font-weight-medium mb-1">
                            상위
                        </div>

                        <div class="text-d-xs font-weight-bold">
                            {{ state.chapterTestTop }}%
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { IRewardItem } from "@/interfaces";

const router = useRouter();

export interface IExperienceItem {
    label: string;
    percentage: number;
}

onMounted(() => {
    // 데이터
    state.experienceList = [
        {
            label: "01",
            percentage: 30,
        },
        {
            label: "02",
            percentage: 50,
        },
        {
            label: "03",
            percentage: 70,
        },
        {
            label: "04",
            percentage: 40,
        },
        {
            label: "05",
            percentage: 90,
        },
        {
            label: "06",
            percentage: 100,
        },
        {
            label: "07",
            percentage: 50,
        },
    ];
});

const state = reactive({
    selectedTag: "daily",

    // 학습 경험치
    experience: 300,
    experienceList: [] as IExperienceItem[],

    studyTime: 22,
    attendanceStreak: 2,
    questionCount: 126,

    // 레벨테스트
    level: 2,
    levelTop: 10,

    // 모의고사
    mockTestNumber: 2,
    mockTestAverage: 92,
    mockTestTop: 10,

    // 단원평가
    chapterTestNumber: 2,
    chapterTestAverage: 92,
    chapterTestTop: 10,
});

watch(
    () => state.selectedTag,
    () => {
        // 테스트용
        if (state.selectedTag === "daily") {
            state.experience = 300;
            state.studyTime = 22;
            state.attendanceStreak = 2;
            state.questionCount = 126;
            state.experienceList = [
                {
                    label: "01",
                    percentage: 30,
                },
                {
                    label: "02",
                    percentage: 50,
                },
                {
                    label: "03",
                    percentage: 70,
                },
                {
                    label: "04",
                    percentage: 40,
                },
                {
                    label: "05",
                    percentage: 90,
                },
                {
                    label: "06",
                    percentage: 100,
                },
                {
                    label: "07",
                    percentage: 50,
                },
            ];
        } else if (state.selectedTag === "monthly") {
            state.experience = 1200;
            state.studyTime = 120;
            state.attendanceStreak = 10;
            state.questionCount = 100;
            state.experienceList = [
                {
                    label: "2024<br/>02",
                    percentage: 30,
                },
                {
                    label: "2024<br/>03",
                    percentage: 50,
                },
                {
                    label: "2024<br/>04",
                    percentage: 70,
                },
                {
                    label: "2024<br/>05",
                    percentage: 40,
                },
                {
                    label: "2024<br/>06",
                    percentage: 90,
                },
                {
                    label: "2024<br/>07",
                    percentage: 100,
                },
                {
                    label: "2024<br/>08",
                    percentage: 50,
                },
            ];
        } else {
            state.experience = 10000;
            state.studyTime = 1000;
            state.attendanceStreak = 100;
            state.questionCount = 1000;
            state.experienceList = [
                {
                    label: "출석",
                    percentage: 30,
                },
                {
                    label: "연속<br/>출석",
                    percentage: 50,
                },
                {
                    label: "나의<br/>경험치",
                    percentage: 70,
                },
                {
                    label: "연습<br/>통계",
                    percentage: 40,
                },
                {
                    label: "학습<br/>시간",
                    percentage: 90,
                },
            ];
        }
    })

const dummy_tags = [
    {
        key: "daily",
        value: "일간",
    },
    {
        key: "monthly",
        value: "월간",
    },
    {
        key: "totally",
        value: "전체",
    },
]

const onClickLevelTest = () => {
    router.push("/dashboard/additional/statistics/level_test");
}

const onClickMockTest = () => {
    router.push("/dashboard/additional/statistics/mock_test");
}

const onClickChapterTest = () => {
    router.push("/dashboard/additional/statistics/chapter_test");
}

</script>

<style lang="scss" scoped></style>