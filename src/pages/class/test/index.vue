<template>
    <PageTemplate back-button>
        <template v-slot:center-header>
            평가테스트
        </template>

        <template v-slot:content>
            <v-spacer />

            <div class="d-flex flex-column align-center pt-4 mb-11">
                <v-img
                    src="/images/class/test/test.png"
                    width="100%"
                    height="269"
                    class="mx-auto mb-10"
                />

                <div class="text-d-xs font-weight-bold text-text-primary text-center mb-3">
                    평가테스트 하기
                </div>

                <div class="text-t-lg font-weight-medium text-text-primary text-center">
                    평가테스트를 완료해야 <br />
                    다음 단원으로 넘어갈 수 있습니다.
                </div>
            </div>

            <v-spacer />
        </template>


        <template v-slot:actions>
            <div class="d-flex ga-2 px-4 pb-8">
                <v-btn
                    variant="outlined"
                    size="large"
                    class="secondary"
                    @click="onClickBack"
                >
                    다음에 하기
                </v-btn>

                <v-btn
                    variant="tonal"
                    size="large"
                    class="primary flex-1-1-100"
                    @click="onClickStart"
                >
                    시작하기
                </v-btn>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>

const state = reactive({
    howMuch: 3000,
    currency: 'won' as 'won' | 'point', // 타입을 'won' | 'point'로 지정
});

const router = useRouter();

const onClickBack = () => {
    router.push('/class');
};

const onClickStart = () => {
    alert("평가테스트 화면");
    router.push('/class/test/results');
};

</script>
