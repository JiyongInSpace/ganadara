<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container
        class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto background-secondary"
    >
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                문장 모아보기
            </span>
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto px-4 py-5">
            <div class="d-flex justify-space-between align-center mb-2-5">
                <span class="text-t-lg font-weight-bold">
                    {{ state.words.length }}개 문장
                </span>

                <div>
                    <DialogSelectLevel />
                    <DialogSelectSort />
                </div>
            </div>

            <ReviewSentenceList :sentences="state.words" />
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { format } from 'date-fns';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { subscription } = storeToRefs(userStore);
const router = useRouter();

const state = reactive({
    words: [
        {
            id: 0,
            word: "Hi",
            meaning: "안녕",
            example: {
                title: "Hi, how are you?",
                content: "기억하다"
            },
            explanation: "‘Wake up on the wrong side of the bed’는 ‘별다른 이유 없이 기분이 안 좋다'라고 해석해요. 일어났는데 평소보다 컨디션이 안 좋거나 일이 잘 안 풀릴 때 이 표현을 쓸 수 있어요.",
        },
        {
            id: 1,
            word: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
            meaning: "긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어",
            example: {
                title: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
                content: "긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장",
            },
            explanation: "‘Wake up on the wrong side of the bed’는 ‘별다른 이유 없이 기분이 안 좋다'라고 해석해요. 일어났는데 평소보다 컨디션이 안 좋거나 일이 잘 안 풀릴 때 이 표현을 쓸 수 있어요.",
        },
    ],
});

</script>


<style lang="scss" scoped></style>