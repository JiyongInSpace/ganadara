<template>
    <PageTemplate
        back-button
        no-gap
    >
        <template v-slot:center-header>
            평가테스트 완료
        </template>

        <template v-slot:content>
            <div class="text-center mt-4 mb-10">
                <div class="text-d-xs font-weight-bold mb-1">
                    테스트이름
                </div>

                <div class="font-weight-medium text-text-quaternary mb-8">
                    2024.09.10 16:55
                </div>

                <v-img
                    src="/images/class/results/result_2.png"
                    width="142"
                    height="122"
                    class="mx-auto"
                ></v-img>

                <div class="text-d-lg font-weight-semibold mb-2">
                    <span>{{ state.correctQuiz }}</span><span class="opacity-30">/</span><span class="opacity-60">{{
                        state.allQuiz }}</span>
                </div>

                <div class="font-weight-medium text-text-quaternary">
                    문제를 다 풀었어요!
                </div>
            </div>


            <div class="mx-auto">
                <v-btn
                    variant="outlined"
                    size="large"
                    class="secondary"
                    width="173"
                    @click="onClickReview"
                >
                    결과 상세보기
                </v-btn>
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
                    @click="onClickNext"
                >
                    확인
                </v-btn>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>

const router = useRouter();

const state = reactive({
    allQuiz: 20,
    correctQuiz: 20,
})



const onClickReview = () => {
    router.push('/class/test/results/details');
}

const onClickNext = () => {
    router.push('/class');
}

</script>