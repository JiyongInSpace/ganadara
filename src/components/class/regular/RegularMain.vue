<template>
    <v-container
        class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto"
        @touchstart="onTouchstart"
        @touchmove="onTouchmove"
        @touchend="onTouchend"
        :style="{
            transform: `translateX(${-0.1 * diffX}px)`
        }"
    >
        <DialogChapterList
            v-model:dialog="dialog"
            v-model:selectedChapter="selectedChapter"
        />

        <LessonList />
    </v-container>
</template>

<script lang="ts" setup>
import { CHAPTER_STATES, IChapter, LEVELS } from '@/interfaces';

const router = useRouter();
const dialog = ref(false);
const selectedChapter = ref<IChapter>();

onMounted(() => {
    selectedChapter.value = {
        levels: LEVELS.LOWINT,
        name: '테마 제목 최대 한 줄',
        id: 3,
        groupSize: 12341234231,
        isOpen: true,
        state: CHAPTER_STATES.TESTED,
        totalProblems: 20,
        solvedProblems: 17
    };
})


const startX = ref(0);
const endX = ref(0);
const diffX = ref(0);

const onTouchstart = (_event: TouchEvent) => {
    startX.value = _event.touches[0].clientX;
};

const onTouchmove = (_event: TouchEvent) => {
    const currentX = _event.touches[0].clientX;
    diffX.value = startX.value - currentX;
};
const onTouchend = (_event: TouchEvent) => {
    endX.value = _event.changedTouches[0].clientX;
    checkSwipeAction();
    diffX.value = 0;
};


const checkSwipeAction = () => {
    const threshold = 100; // 최소 이동 거리 (px)
    const diffX = startX.value - endX.value;

    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            // 왼쪽으로 스와이프
            router.push('/class/shortform/1');
        } else {
            // 오른쪽으로 스와이프

        }
    }
};


</script>

<style lang="scss" scoped></style>