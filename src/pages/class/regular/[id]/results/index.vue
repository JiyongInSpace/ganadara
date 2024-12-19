<template>
    <PageTemplate
        back-button
        no-gap
        space="pt-4"
        no-spacer
    >
        <template v-slot:center-header>
            영상 학습 완료
        </template>

        <template v-slot:content>
            <div class="text-center mt-10 mb-10">
                <v-img
                    src="/images/class/regular/video_result.png"
                    width="180"
                    height="97"
                    class="mx-auto mb-8"
                ></v-img>

                <div class="font-weight-medium text-text-quaternary">
                    학습을 완료했어요!
                </div>
            </div>

            <v-card
                class="d-flex text-center flex-shrink-0 border-border-primary background-secondary rounded-8 py-4 mx-4 mb-5"
                variant="outlined"
                flat
            >
                <div class="flex-1-1-100 pa-1 border-e-md border-border-primary">
                    <div class="mb-1 text-t-sm font-weight-medium text-text-secondary">
                        경험치
                    </div>

                    <div
                        class="font-weight-bold text-d-xs animate__animated animate__bounceIn d-flex justify-center align-center ga-1">
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

                    <div
                        class="font-weight-bold text-d-xs animate__animated animate__bounceIn d-flex justify-center align-center ga-1">
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

            <div class="pa-4 background-secondary flex-grow-1">
                <div class="text-t-lg font-weight-bold mb-4">
                    핵심 표현
                </div>
    
                <ExpressionWordList :words="state.words" />
            </div>
        </template>

        <template v-slot:bottom>
        </template>

        <template v-slot:actions>
            <div
                class="px-4 pb-7"
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
                    @click="onClickNext"
                >
                    계속하기
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
    words: [
        {
            id: 0,
            word: "Hi",
            meaning: "안녕",
            example: {
                title: "Hi, how are you?",
                content: "기억하다"
            }
        },
        {
            id: 1,
            word: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
            meaning: "긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어",
            example: {
                title: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
                content: "긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장",
            }
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

const onClickNext = () => {
    // router.push('/class/regular/1');
}

const onClickLecture = (id: string) => {
    router.push('/class/regular/' + id);
}
</script>