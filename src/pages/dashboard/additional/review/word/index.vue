<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto background-secondary">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                단어 모아보기
            </span>
        </div>

        <div class="d-flex flex-column px-4 py-10 ">
            <ReviewWordList :words="state.words" />
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
            id: 3,
            word: "Hi",
            meaning: "안녕",
        }, {
            id: 4,
            word: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
            meaning: "긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어",
        },
    ],
});

const review_options = [
    {
        key: 'word',
        title: '단어 모아보기',
    },
    {
        key: 'sentence',
        title: '문장 모아보기',
    },
    {
        key: 'video',
        title: '학습한 영상',
    },
    {
        key: 'wrong',
        title: '오답 관리',
    },
]


//  ======
const onClickReview = (key: string) => {
    router.push('/dashboard/additional/review/' + key);
}


</script>


<style lang="scss" scoped></style>