<template>
    <PageTemplate
        back-button
        no-gap
        space="pt-4"
        no-spacer
    >
        <template v-slot:center-header>
            평가테스트 결과 상세보기
        </template>

        <template v-slot:content>
            <div class="mt-4 px-4 mb-10">
                <div class="text-t-xl font-weight-bold mb-1">
                    테스트이름
                </div>

                <div class="font-weight-medium text-text-quaternary mb-8">
                    2024.09.10 16:55
                </div>

                <div class="d-flex ga-3 text-center">
                    <v-card
                        class="flex-1-1-100 background-secondary py-2 px-3"
                        flat
                    >
                        <div class="font-weight-medium mb-1">
                            맞은 문제
                        </div>
                        <div class="text-d-xs font-weight-bold">
                            10
                        </div>
                    </v-card>

                    <v-card
                        class="flex-1-1-100 background-error-primary py-2 px-3"
                        flat
                    >
                        <div class="text-text-error-primary font-weight-medium mb-1 ">
                            틀린 문제
                        </div>
                        <div class="text-text-error-primary text-d-xs font-weight-bold">
                            10
                        </div>
                    </v-card>
                </div>
            </div>

            <div class="pt-10 px-4 background-secondary flex-grow-1 pb-10">
                <div class="text-t-lg font-weight-bold mb-3">
                    문제 전체 보기
                </div>

                <v-card
                    variant="outlined"
                    class="border-border-primary background-primary py-2"
                >
                    <div class="d-flex text-t-sm text-center">
                        <div class="flex-1-1-100 py-2-5">
                            문항
                        </div>
                        <div class="flex-1-1-100 py-2-5">
                            결과
                        </div>
                        <div class="flex-1-1-100 py-2-5">
                            해설
                        </div>
                    </div>

                    <div
                        v-for="index in 20"
                        :key="index"
                        class="d-flex text-center"
                        :class="index % 2 === 0 ? 'background-error-primary' : 'background-primary'"
                    >
                        <div class="flex-1-1-100 py-2-5 font-weight-medium">
                            {{ index }}번
                        </div>
                        <div class="flex-1-1-100 py-2-5">
                            <v-img
                                v-if="index % 2 === 0"
                                src="/images/class/test/circle.svg"
                                width="24"
                                height="24"
                                class="mx-auto"
                            ></v-img>
                            <v-img
                                v-else
                                src="/images/class/test/x-close.svg"
                                width="24"
                                height="24"
                                class="mx-auto"
                            ></v-img>
                        </div>
                        <div class="flex-1-1-100 py-2-5">
                            <v-btn
                                variant="outlined"
                                class="background-primary secondary px-2-5 rounded-6"
                                size="small"
                                @click="onClickReview"
                            >
                                해설보기
                            </v-btn>
                        </div>
                    </div>
                </v-card>
            </div>
        </template>

        <template v-slot:bottom>
        </template>

        <template v-slot:actions>
            <div
                class="background-secondary px-4 mb-7"
                v-ripple
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
    alert("해설보기")
}

const onClickNext = () => {
    router.push('/class');
}

</script>