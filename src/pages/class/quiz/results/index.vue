<template>
    <PageTemplate
        back-button
        no-gap
    >
        <template v-slot:center-header>
            문제 풀기 완료
        </template>

        <template v-slot:content>
            <div class="text-center mb-10">
                <v-img
                    :src="getImageUrl(state.grade)"
                    width="142"
                    height="122"
                    class="mx-auto"
                ></v-img>

                <div class="text-d-lg font-weight-semibold mb-2">
                    <span>{{ state.correctQuiz }}</span><span class="opacity-30">/</span><span class="opacity-60">{{
                        state.allQuiz }}</span>
                </div>

                <div class="font-weight-medium">
                    {{ getComment(state.grade) }}
                </div>
            </div>

            <v-card
                class="d-flex text-center flex-shrink-0 border-border-primary background-secondary rounded-8 py-4 mb-5"
                variant="outlined"
                flat
            >
                <div class="flex-1-1-100 pa-1 border-e-md border-border-primary">
                    <div class="mb-1 text-t-sm font-weight-medium text-text-secondary">
                        경험치
                    </div>

                    <div class="font-weight-bold text-d-xs animate__animated animate__bounceIn d-flex justify-center align-center ga-1">
                        <v-img
                            src="/images/class/results/exp.svg"
                            width="24"
                            height="24"
                            class="flex-grow-0"
                        ></v-img>
                        {{ state.experience }}
                    </div>
                </div>

                <div class="flex-1-1-100 pa-1">
                    <div class="mb-1 text-t-sm font-weight-medium text-text-secondary">
                        학습시간
                    </div>

                    <div class="font-weight-bold text-d-xs animate__animated animate__bounceIn d-flex justify-center align-center ga-1">
                        <v-img
                            src="/images/class/results/time.svg"
                            width="24"
                            height="24"
                            class="flex-grow-0"
                        ></v-img>
                        {{ state.studyTime }}
                    </div>
                </div>
            </v-card>

            <div class="flex-grow-0 mb-6">
                <v-btn
                    block
                    variant="outlined"
                    size="large"
                    class="secondary"
                    @click="onClickReview"
                >
                    배운 내용 복습하기
                </v-btn>
            </div>

            <div class="text-t-lg font-weight-bold mb-4">
                강의 추천
            </div>

            <div class="d-flex flex-column ga-3 pb-4">
                <div
                    v-for="(count, key) in state.recommendedLectures"
                    :key="key"
                    v-ripple
                    class="d-flex ga-4"
                    @click="onClickLecture(count.id)"
                >
                    <v-img
                        :src="count.thumbnail"
                        width="173"
                        height="110"
                        class="flex-grow-0 rounded-8"
                        cover
                    />

                    <div class="font-weight-medium">
                        <span class="text-t-sm line-clamp-3 mb-1">
                            {{ count.title }}
                        </span>

                        <span class="text-t-sm text-text-disabled opacity-70">
                            {{ count.category }}
                        </span>
                    </div>


                </div>
            </div>
        </template>

        <template v-slot:bottom>
        </template>

        <template v-slot:actions>
            <div
                class="px-4 mb-7"
                v-ripple
                background="fg-quaternary"
                width="100%"
                height="60"
            >
                <v-btn
                    block
                    variant="tonal"
                    size="large"
                    class="primary"
                    @click="onClickRoulette"
                >
                    룰렛 돌리러 가기
                </v-btn>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>

const router = useRouter();

const state = reactive({
    experience: 300,
    allQuiz: 20,
    correctQuiz: 17,
    grade: 1,
    studyTime: '30분',
    recommendedLectures: [
        {
            title: '강의 타이틀 최대 세 줄 강의 타이틀 최대 세 줄 강의 타이틀 최대 세 줄 최대 세 줄 최대 세',
            category: '강의 카테고리명',
            thumbnail: '/images/class/default_video.png',
            id: "1",
        },
        {
            title: '영어회화 2강',
            category: '강의 카테고리명',
            thumbnail: '/images/class/default_video.png',
            id: "1",
        },
        {
            title: '영어회화 3강',
            category: '강의 카테고리명',
            thumbnail: '/images/class/default_video.png',
            id: "1",
        },
        {
            title: '영어회화 4강',
            category: '강의 카테고리명',
            thumbnail: '/images/class/default_video.png',
            id: "1",
        },
        {
            title: '영어회화 5강',
            category: '강의 카테고리명',
            thumbnail: '/images/class/default_video.png',
            id: "1",
        },
    ],
})

const getImageUrl = (grade: number) => {
    switch (grade) {
        case 1:
            return '/images/class/results/result_1.png';
        case 2:
            return '/images/class/results/result_2.png';
        case 3:
            return '/images/class/results/result_3.png';
        case 4:
            return '/images/class/results/result_4.png';
        default:
            return '/images/class/results/result_5.png';
    }
}
const getComment = (grade: number) => {
    switch (grade) {
        case 1:
            return '아주 잘했어요!';
        case 2:
            return '잘했어요!';
        case 3:
            return '거의 다 왔어요!';
        case 4:
            return '조금 더 노력해봐요!';
        default:
            return '다시 해볼까요?';
    }
}


const onClickReview = () => {
    router.push('/class/quiz/review');
}

const onClickRoulette = () => {
    router.push('/challenge/mission/roulette');
}

const onClickLecture = (id: string) => {
    router.push('/class/regular/' + id);
}
</script>