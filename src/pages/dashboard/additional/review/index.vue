<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                복습하기
            </span>
        </div>

        <div class="d-flex flex-column px-4 py-10">
            <div class="font-weight-bold pa-5 mb-2-5">
                복습을 통해 <br />
                더 빠르게 성장하세요 !
            </div>

            <v-card
                v-for="option in review_options"
                variant="outlined"
                class="border-none background-secondary rounded-12 px-4 py-5 mb-2-5"
                @click="() => onClickReview(option.key)"
            >

                <div class="d-flex justify-space-between align-center">
                    <div class="text-t-md font-weight-medium">
                        {{ option.title }}
                    </div>

                    <v-icon icon="mdi-chevron-right" />
                </div>
            </v-card>
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