<template>
    <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0">
        <v-btn
            icon="mdi-chevron-left"
            size="small"
            variant="text"
            @click="buttonBack.onClick"
        />

        <div class="text-t-lg font-weight-bold position-center">
            문제 풀기
        </div>

        <v-btn
            size="small"
            variant="text"
            class="mt-1 font-weight-semibold"
            @click="buttonSkip.onClick"
        >
            건너뛰기
        </v-btn>

        <DialogSkip
            v-model:dialog="state.ui.dialogSkip"
            @onClickSkip="buttonNext.onClick"
        />
    </div>

    <div class="px-4 mb-5">
        <v-expand-transition>
            <v-progress-linear
                color="primary"
                v-model="progress"
                :max="totalQuizCount"
                class="flex-shrink-0 overflow-visible"
                height="8"
                rounded-bar
                rounded="4"
            >
                <v-card
                    variant="outlined"
                    class="text-t-xs font-weight-semibold rounded-8 background-primary border-border-primary transition-all py-2 px-3 mt-14"
                    elevation="1"
                    :style="{
                        position: 'absolute',
                        left: `calc(${progress * 100 / totalQuizCount}% - 30px)`,
                    }"
                >
                    {{ progress }}/{{ totalQuizCount }}
                </v-card>
            </v-progress-linear>
        </v-expand-transition>
    </div>

    <v-container class="d-flex flex-column overflow-y-auto flex-grow-1 position-relative pt-0">

        <!-- {{ state.currentQuizId }}/{{ totalQuizCount }} -->

        <!-- 문제 컨텐츠 -->
        <ContentLoader
            :contentInfo="currentQuiz"
            :answerInfo="(state.answerList.find((response: IUserResponse) => response.quizItemId === currentQuiz?.id) as IUserResponse)"
        />

        <div class="d-flex flex-column flex-grow-1 w-100">
            <AnswerOptions
                :quizInfo="currentQuiz?.answer"
                :answerInfo="(state.answerList.find((response: IUserResponse) => response.quizItemId === currentQuiz?.id) as IUserResponse)"
                :disabledButton="disabledButton"
                @onClickAnswer="onSelectAnswer"
                @onClickNext="buttonNext.onClick"
            />
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { IQuizItem, IUserResponse } from '@/interfaces';

const router = useRouter();


const props = defineProps<{
    quizList: IQuizItem[];
}>();

const state = reactive({
    currentQuizId: "" as string,
    answerList: [] as IUserResponse[],
    ui: {
        dialogSkip: false,
    }
});

// 퀴즈리스트가 변경되면 첫번째 퀴즈로 초기화
watch(
    () => props.quizList,
    () => {
        if (props.quizList.length > 0) {
            state.currentQuizId = props.quizList[0].id;
        }
    },
    { deep: true }
)

// 진행률
const progress = computed(() => {
    const currentIndex = props.quizList.findIndex(quiz => quiz.id === state.currentQuizId);
    return currentIndex + 1; // 0 인덱스이므로 +1을 해줍니다.
});

// 전체 퀴즈 개수
const totalQuizCount = computed(() => {
    return props.quizList.length;
});

// 현재 퀴즈
const currentQuiz = computed(() => {
    return props.quizList.find(quiz => quiz.id === state.currentQuizId);
});


// 퀴즈 진행 상황
const onSelectAnswer = (_answer: string | undefined) => {
    if (_answer) {
        if (state.answerList.some(response => response.quizItemId === state.currentQuizId)) {
            state.answerList = state.answerList.map(response => {
                if (response.quizItemId === state.currentQuizId) {
                    return {
                        quizItemId: state.currentQuizId,
                        selectedOptionId: _answer,
                    }
                }
                return response;
            });
        } else {
            state.answerList.push({
                quizItemId: state.currentQuizId,
                selectedOptionId: _answer,
            });
        }
    } else {
        // _answer가 undefined인 경우 해당 quizItemId를 가진 항목 삭제
        state.answerList = state.answerList.filter(response => response.quizItemId !== state.currentQuizId);
    }
}

// 버튼 이벤트
const buttonBack = {
    onClick: () => {
        const currentIndex = props.quizList.findIndex(quiz => quiz.id === state.currentQuizId);

        if (currentIndex > 0) {
            state.currentQuizId = props.quizList[currentIndex - 1].id;
        } else {
            router.back();  // 최초 퀴즈에서 '뒤로 가기' 처리
        }
    }
};

const buttonSkip = {
    onClick: () => {
        state.ui.dialogSkip = true;
    }
};

const buttonNext = {
    onClick: () => {
        const currentIndex = props.quizList.findIndex(quiz => quiz.id === state.currentQuizId);

        if (currentIndex !== -1) {
            if (currentIndex + 1 < props.quizList.length) {
                state.currentQuizId = props.quizList[currentIndex + 1].id;
            } else {
                // Redirect to the quiz result page when reaching the last quiz
                router.push('/class/quiz/results');
            }
        }
    }
};

const disabledButton = computed(() => {
    // 대답이 없거나, answerId가 undefined인 경우
    const currentQuizResponse = state.answerList.find(response => response.quizItemId === state.currentQuizId);
    return !currentQuizResponse || currentQuizResponse.selectedOptionId.length < 1;
});
</script>
