<template>
    <PageTemplate
        back-button
        header-background="secondary"
        background="secondary"
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                문장 모아보기
            </span>
        </template>

        <template v-slot:content>
            <div class="d-flex justify-space-between align-center mb-2-5">
                <span class="text-t-lg font-weight-bold">
                    {{ state.sentences.length }}개 문장
                </span>

                <div class="d-flex ga-2-5">
                    <DialogSelectLevel />
                    <DialogSelectSort />
                </div>
            </div>

            <ReviewSentenceList :sentences="state.sentences" />
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { format } from 'date-fns';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { subscription } = storeToRefs(userStore);
const router = useRouter();

const state = reactive({
    sentences: [
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