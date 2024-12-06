
<template>
    <PageTemplate
        no-spacer
        back-button
    >
        <template v-slot:center-header>
            모의고사 완료
        </template>

        <template v-slot:content>
            <div
                class="d-flex flex-column justify-center items-center text-center flex-grow-1 overflow-y-auto px-4 py-5">
                <v-img
                    src="/images/dashboard/mock_test/mock_test_complete.png"
                    max-width="226"
                    width="100%"
                    class="flex-grow-0 mx-auto mb-6"
                ></v-img>

                <div class="text-d-lg font-weight-semibold mb-2">
                    <span>{{ state.testResultInfo.score }}</span>
                    <span class="text-fg-quinary">/</span>
                    <span class="text-text-disabled">{{ state.testResultInfo.totalNumber }}</span>
                </div>

                <div class="text-text-secondary mb-6">
                    모의고사 풀이가 완료되었습니다!<br />
                    당신은 <span class="font-weight-bold">상위 {{ state.testResultInfo.rank }}%</span>입니다.
                </div>

                <div>
                    <v-btn
                        variant="outlined"
                        class="secondary"
                        @click="onClickMockTest"
                    >
                        결과 상세 보기
                    </v-btn>
                </div>
            </div>
        </template>

        <template v-slot:actions>
            <div class="d-flex pt-4 pb-8 px-2-5 ga-1-5">
                <v-btn
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    @click="onClickCheck"
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
    testResultInfo: {
        totalNumber: 20,
        score: 18,
        rank: 10,
    }
});

//  ======
const onClickMockTest = () => {
    alert("결과 상세 보기");
}

const onClickCheck = () => {
    router.push('/dashboard/additional/mock_test');
}


</script>


<style lang="scss" scoped></style>