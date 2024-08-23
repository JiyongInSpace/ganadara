<template>
    <v-container class="pa-0 d-flex flex-column overflow-y-auto background-secondary ga-2">
        <v-card class="rounded-0 pt-5 px-4 elevation-0">
            <!-- TITLE -->
            <div
                class="bg-transparent d-flex justify-center align-center ga-2 mb-2"
                height="56"
            >
                <v-img
                    src="/images/class/image_book.png"
                    width="24"
                    height="24"
                    class="flex-grow-0"
                />

                <span class="text-t-lg font-weight-bold">
                    문제풀기 완료
                </span>
            </div>

            <div class="pt-15 text-center mb-7">
                <span class="text-d-2xl font-weight-bold">
                    17/20
                </span>
            </div>

            <div class="flex-grow-0 mb-6">
                <v-btn
                    block
                    variant="tonal"
                    size="large"
                    class="primary"
                    @click="onClickReview"
                >
                    배운 내용 복습하기
                </v-btn>
            </div>

            <div class="d-flex text-center mb-5 elevation-0">
                <div class="flex-1-1-100 pa-1 border-e-md">
                    <div class="mb-1 text-t-sm font-weight-medium text-text-secondary">
                        경험치
                    </div>

                    <div class="font-weight-bold text-d-xs animate__animated animate__bounceIn">
                        {{ state.experience }}
                    </div>
                </div>

                <div class="flex-1-1-100 pa-1">
                    <div class="mb-1 text-t-sm font-weight-medium text-text-secondary">
                        학습시간
                    </div>

                    <div class="font-weight-bold text-d-xs animate__animated animate__bounceIn">
                        {{ state.studyTime }}
                    </div>
                </div>
            </div>
        </v-card>

        <v-card class="rounded-0 pt-8 px-4 elevation-0 mb-15">
            <div class="text-t-lg font-weight-bold mb-4">
                강의 추천
            </div>

            <div class="d-flex flex-column ga-3 pb-4">
                <div
                    v-for="(count, key) in state.recommendedLectures"
                    :key="key"
                    class="d-flex align-center ga-4 "
                >
                    <v-img
                        :src="count.thumbnail"
                        width="80"
                        height="80"
                        class="flex-grow-0 rounded-8"
                        cover
                    />

                    <div class="font-weight-medium">
                        {{ count.title }}
                    </div>
                </div>
            </div>
        </v-card>
    </v-container>

    <div
        class="position-fixed bottom-0 left-0 foreground-quaternary right-0 py-4 text-center"
        v-ripple
        background="fg-quaternary"
        width="100%"
        height="60"
        @click="onClickRoulette"
    >
        <span class="text-t-lg font-weight-semibold text-text-placeholder_subtle">
            룰렛 돌리기
        </span>
    </div>
</template>

<script lang="ts" setup>

const router = useRouter();

const state = reactive({
    experience: 300,
    studyTime: '30분',
    recommendedLectures: [
        {
            title: '영어회화 1강',
            thumbnail: '/images/class/default_video.png',
        },
        {
            title: '영어회화 2강',
            thumbnail: '/images/class/default_video.png',
        },
        {
            title: '영어회화 3강',
            thumbnail: '/images/class/default_video.png',
        },
        {
            title: '영어회화 4강',
            thumbnail: '/images/class/default_video.png',
        },
        {
            title: '영어회화 5강',
            thumbnail: '/images/class/default_video.png',
        },
    ],
})

const onClickReview = () => {
    router.push('/class/quiz/review');
}

const onClickRoulette = () => {
    alert('룰렛 돌리기');
}
</script>