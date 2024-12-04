<template>
    <v-container
        class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto background-secondary"
    >
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                모의고사
            </span>

            <v-spacer />
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto ga-2 px-4 py-5">
            <div class="py-2-5 mb-2">
                <TestResultItem :info="state.testInfo" />
            </div>

            <div class="d-flex justify-space-between align-center">
                <span class="font-weight-bold">
                    오답 {{ state.wrongAnswers.length }}개
                </span>

                <v-btn
                    variant="text"
                    class="px-0"
                >
                    오답 풀러가기
                </v-btn>
            </div>

            <ReviewTestList :list="state.wrongAnswers" />

            <div class="d-flex justify-space-between align-center">
                <span class="font-weight-bold">
                    전체 문제 {{ state.allProblems.length }}개
                </span>
            </div>

            <ReviewTestList :list="state.allProblems" />
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { IExamItem } from '@/interfaces';


const router = useRouter();

onMounted(() => {
    // 데이터
    state.testInfo = {
        id: 1,
        name: 'LC1',
        date: "2024-12-09T14:30:15.123Z",
        score: 100,
        wrong: 0,
        elapsed_time: 223,
        ideal_time: 600,
    }

    state.wrongAnswers = [
        {
            id: 0,
            word: "Hi",
            meaning: "안녕",
            explanation: "‘Wake up on the wrong side of the bed’는 ‘별다른 이유 없이 기분이 안 좋다'라고 해석해요. 일어났는데 평소보다 컨디션이 안 좋거나 일이 잘 안 풀릴 때 이 표현을 쓸 수 있어요.",
        },
        {
            id: 1,
            word: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
            meaning: "긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어",
            explanation: "‘Wake up on the wrong side of the bed’는 ‘별다른 이유 없이 기분이 안 좋다'라고 해석해요. 일어났는데 평소보다 컨디션이 안 좋거나 일이 잘 안 풀릴 때 이 표현을 쓸 수 있어요.",
        },
    ];

    state.allProblems = [
        {
            id: 0,
            word: "Hi",
            meaning: "안녕",
            explanation: "‘Wake up on the wrong side of the bed’는 ‘별다른 이유 없이 기분이 안 좋다'라고 해석해요. 일어났는데 평소보다 컨디션이 안 좋거나 일이 잘 안 풀릴 때 이 표현을 쓸 수 있어요.",
        },
        {
            id: 1,
            word: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
            meaning: "긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어",
            explanation: "‘Wake up on the wrong side of the bed’는 ‘별다른 이유 없이 기분이 안 좋다'라고 해석해요. 일어났는데 평소보다 컨디션이 안 좋거나 일이 잘 안 풀릴 때 이 표현을 쓸 수 있어요.",
        },
        {
            id: 0,
            word: "Hi",
            meaning: "안녕",
            explanation: "‘Wake up on the wrong side of the bed’는 ‘별다른 이유 없이 기분이 안 좋다'라고 해석해요. 일어났는데 평소보다 컨디션이 안 좋거나 일이 잘 안 풀릴 때 이 표현을 쓸 수 있어요.",
        },
        {
            id: 1,
            word: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
            meaning: "긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어",
            explanation: "‘Wake up on the wrong side of the bed’는 ‘별다른 이유 없이 기분이 안 좋다'라고 해석해요. 일어났는데 평소보다 컨디션이 안 좋거나 일이 잘 안 풀릴 때 이 표현을 쓸 수 있어요.",
        },
    ];
});

const state = reactive<{
    testInfo: IExamItem | undefined;
    allProblems: any;
    wrongAnswers: any;
}>({
    testInfo: undefined,
    allProblems: [],
    wrongAnswers: [],
});


</script>

<style lang="scss" scoped></style>