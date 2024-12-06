<template>
    <PageTemplate
        back-button
        header-background="secondary"
        background="secondary"
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                단어 모아보기
            </span>
        </template>

        <template v-slot:content>
            <div class="d-flex justify-space-between align-center mb-2-5">
                <span class="text-t-lg font-weight-bold">
                    {{ state.words.length }}개 단어
                </span>

                <div class="d-flex ga-2-5">
                    <DialogSelectLevel />
                    <DialogSelectSort />
                </div>
            </div>

            <ReviewWordList :words="state.words" />
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
    words: [
        {
            id: 0,
            word: "Hi",
            meaning: "안녕",
            example: {
                title: "Hi, how are you?",
                content: "기억하다"
            }
        },
        {
            id: 1,
            word: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
            meaning: "긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어",
            example: {
                title: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
                content: "긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장",
            }
        },
    ],
});

</script>


<style lang="scss" scoped></style>