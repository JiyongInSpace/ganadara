<template>
    <PageTemplate
        back-button
        header-background="secondary"
        background="secondary"
    >
        <template v-slot:center-header>
            레벨 테스트
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
    state.chapterTestList = dummy_list;
});

const state = reactive<{
    chapterTestList: IExamItem[];
}>({
    chapterTestList: [],
});

const onClickTestItem = (_id: number) => {
    router.push(`/dashboard/additional/statistics/level_test/${_id}`);
}

const dummy_list = [
    {
        id: 1,
        name: '레벨 테스트1',
        date: "2024-12-09T14:30:15.123Z",
        level: 3,
        wrong: 0,
    },
    {
        id: 2,
        name: '레벨 테스트2',
        date: "2024-12-09T14:30:15.123Z",
        level: 3,
        wrong: 0,
    },
]
</script>

<style lang="scss" scoped></style>