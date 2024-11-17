<template>
    <div class="overflow-y-auto flex-grow-1">
        <v-img
            src="/images/class/regular/chapter_start.svg"
            alt="chapter start"
        />

        <div
            v-for="(lessonItem, key) in lessonList"
            :key="key"
        >
            <div
                v-if="lessonItem.type === 'lesson'"
                :class="{
                    'mt-n2': key !== 0,
                    'mt-0': key === 0,
                }"
            >
                <lesson-item :info="lessonItem" />
            </div>

            <div
                v-else-if="lessonItem.type === 'test'"
                class="mt-n2"
            >
                <test-item :info="lessonItem" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const lessonList = [
    {
        type: "lesson",
        title: '애정 표현하기 : ‘너를 사랑해',
        order: 0,
        step: 4,
    },
    {
        type: "lesson",
        title: '애정 표현하기 : ‘너를 사랑해',
        order: 1,
        step: 1,
    },
    {
        type: "lesson",
        title: '애정 표현하기2 : ‘너를 사랑해2',
        order: 2,
        step: 0,
    },
    {
        type: "lesson",
        title: '애정 표현하기3 : ‘너를 사랑해3',
        order: 3,
        step: 0,
    },
    {
        type: "test",
        title: "",
        step: 0,
    }
]

</script>
