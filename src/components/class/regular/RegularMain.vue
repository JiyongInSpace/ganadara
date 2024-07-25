<template>
    <div>
        <DialogChapterList
            v-model:dialog="dialog"
            v-model:selectedChapter="selectedChapter"
        />

        <LessonList/>
    </div>
</template>

<script lang="ts" setup>
import { CHAPTER_STATES, IChapter, LEVELS } from '@/interfaces';


const dialog = ref(false);
const selectedChapter = ref<IChapter>();

onMounted(() => {
    selectedChapter.value = {
        levels: LEVELS.LOWINT,
        name: '테마 제목 최대 한 줄',
        id: 3,
        groupSize: 12341234231,
        isLocked: true,
        state: CHAPTER_STATES.TESTED,
        totalProblems: 20,
        solvedProblems: 17
    };
})
</script>

<style lang="scss" scoped></style>