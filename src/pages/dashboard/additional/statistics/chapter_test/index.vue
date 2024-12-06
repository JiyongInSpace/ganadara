<template>
    <PageTemplate
        back-button
        header-background="secondary"
        background="secondary"
    >
        <template v-slot:center-header>
            단원평가
        </template>

        <template v-slot:content>
            <div
                v-for="testItem in state.chapterTestList"
                class="py-2-5"
            >
                <TestResultItem
                    :info="testItem"
                    @click="onClickTestItem(testItem.id)"
                />
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { IExamItem } from '@/interfaces';


const router = useRouter();

onMounted(() => {
    // 데이터
    state.chapterTestList = [
        {
            id: 1,
            name: '단원평가1',
            date: "2024-12-09T14:30:15.123Z",
            level: 3,
            wrong: 0,
        },
        {
            id: 2,
            name: '단원평가2',
            date: "2024-12-09T14:30:15.123Z",
            level: 3,
            wrong: 0,
        },
    ]
});

const state = reactive<{
    chapterTestList: IExamItem[];
}>({
    chapterTestList: [],
});

const onClickTestItem = (_id: number) => {
    router.push(`/dashboard/additional/statistics/chapter_test/${_id}`);
}

</script>

<style lang="scss" scoped></style>