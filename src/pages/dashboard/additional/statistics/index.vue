<template>
    <PageTemplate
        space="pa-0"
        back-button
        background="secondary"
    >
        <template v-slot:center-header>
            학습 통계
        </template>

        <!-- (임시) 퍼블리싱 확인용 -->
        <template v-slot:append-header>
            <v-btn @click="onClickAllDelete">(임시)데이터 비우기</v-btn>
        </template>

        <template v-slot:content>
            <div class="background-primary px-4 py-5">
                <v-chip-group
                    class="py-0 mb-5"
                    selected-class="bg-black text-text-primary_on-brand"
                    v-model="state.selectedTag"
                    column
                    mandatory
                >
                    <v-chip
                        v-for="tag in tag_options"
                        :key="tag.key"
                        :value="tag.key"
                        variant="outlined"
                        size="large"
                        class="border-border-primary px-4 my-0 ml-0 mr-2"
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
                    <VerticalProgressBars
                        :list="state.experienceList"
                        :is-active="state.experienceList.length - 1"
                    />
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
                            {{ state.attendanceStreak.toLocaleString() }}
                        </div>
                    </div>

                    <div class="flex-1-1-100">
                        <div class="text-t-sm font-weight-medium mb-1">
                            학습 시간
                        </div>

                        <div class="text-d-xs font-weight-bold">
                            {{ formattedStudyTime(state.studyTime) }}
                        </div>
                    </div>

                    <div class="flex-1-1-100">
                        <div class="text-t-sm font-weight-medium mb-1">
                            문제
                        </div>

                        <div class="text-d-xs font-weight-bold">
                            {{ state.questionCount.toLocaleString() }}
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
                            color="primary"
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
                            color="primary"
                            :model-value="state.levelTop"
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
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { IExperienceItem } from '@/interfaces';

const router = useRouter();

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
    selectedTag: "",

    // 학습 경험치
    experience: 0,
    experienceList: [] as IExperienceItem[],

    studyTime: 0,
    attendanceStreak: 0,
    questionCount: 0,

    // 레벨 테스트
    level: 0,
    levelTop: 0,

    // 모의고사
    mockTestNumber: 0,
    mockTestAverage: 0,
    mockTestTop: 0,

    // 단원평가
    chapterTestNumber: 0,
    chapterTestAverage: 0,
    chapterTestTop: 0,
});

onMounted(() => {
    state.selectedTag = "daily";

    setDummyDaily();
})
watch(
    () => state.selectedTag,
    () => {
        // 테스트용
        if (state.selectedTag === "daily") {
            setDummyDaily();

        } else if (state.selectedTag === "monthly") {
            setDummyMonthly();

        } else {
            setDummyTotally();
        }
    })

const tag_options = [
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

const formattedStudyTime = (_number: number) => {
    if (!_number) return '00:00';

    const minutes = Math.floor(_number / 60); // 분 계산
    const seconds = _number % 60; // 초 계산

    // 두 자리 형식으로 변환
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};


// 임시 함수
const onClickAllDelete = () => {
    state.experience = 0;
    state.studyTime = 0;
    state.attendanceStreak = 0;
    state.questionCount = 0;
    state.experienceList = [];

    state.level = 0;
    state.levelTop = 0;

    state.mockTestNumber = 0;
    state.mockTestAverage = 0;
    state.mockTestTop = 0;

    state.chapterTestNumber = 0;
    state.chapterTestAverage = 0;
    state.chapterTestTop = 0;
}

//=========================================================


const setDummyDaily = () => {
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
    // 레벨 테스트
    state.level = 2;
    state.levelTop = 10;

    // 모의고사
    state.mockTestNumber = 2;
    state.mockTestAverage = 92;
    state.mockTestTop = 10;

    // 단원평가
    state.chapterTestNumber = 2;
    state.chapterTestAverage = 92;
    state.chapterTestTop = 10;

}
const setDummyMonthly = () => {
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
}
const setDummyTotally = () => {
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
</script>

<style lang="scss" scoped></style>