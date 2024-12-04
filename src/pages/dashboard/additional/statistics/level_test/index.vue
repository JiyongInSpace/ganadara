<template>
    <v-container
        class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto background-secondary"
    >
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                레벨테스트
            </span>

            <v-spacer />
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto ga-2 px-4 py-5">
            <div
                v-for="testItem in state.chapterTestList"
                class="py-2-5"
            >
                <TestResultItem
                    :info="testItem"
                    @click="onClickTestItem(testItem.id)"
                />
            </div>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { IExamItem } from '@/interfaces';


const router = useRouter();

onMounted(() => {
    // 데이터
    state.chapterTestList = [
        {
            id: 1,
            name: '레벨테스트1',
            date: "2024-12-09T14:30:15.123Z",
            level: 3,
            wrong: 0,
        },
        {
            id: 2,
            name: '레벨테스트2',
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
    router.push(`/dashboard/additional/statistics/level_test/${_id}`);
}

</script>

<style lang="scss" scoped></style>