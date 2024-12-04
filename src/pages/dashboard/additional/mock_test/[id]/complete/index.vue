<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                모의고사 완료
            </span>
        </div>

        <div class="d-flex flex-column justify-center items-center text-center flex-grow-1 overflow-y-auto px-4 py-5">
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
    </v-container>
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