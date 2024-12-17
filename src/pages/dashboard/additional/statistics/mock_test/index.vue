<template>
    <PageTemplate
        back-button
        header-background="secondary"
        background="secondary"
    >
        <template v-slot:center-header>
            모의고사
        </template>

        <template v-slot:content>
            <div v-for="item in computedMockExaxmInfo">
                <div class="font-weight-bold text-uppercase">
                    {{ item.title }}
                </div>

                <div
                    v-for="testItem in item.list"
                    class="py-2-5"
                >
                    <TestResultItem
                        :info="testItem"
                        @click="onClickTestItem(testItem.id)"
                    />
                </div>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { IExamItem } from '@/interfaces';

const router = useRouter();

onMounted(() => {
    // 데이터
    state.mockExamInfo = dummy;
});

const computedMockExaxmInfo = computed(() => {
    return Object.keys(state.mockExamInfo).map((key) => {
        return {
            title: key,
            list: state.mockExamInfo[key],
        };
    });
});

const state = reactive<{
    mockExamInfo: {
        [key: string]: IExamItem[];
    };
}>({
    mockExamInfo: {},
});

const onClickTestItem = (_id: number) => {
    router.push(`/dashboard/additional/statistics/mock_test/${_id}`);
}


// ================================================================================================================================
const dummy = {
    lc: [
        {
            id: 1,
            name: '마이풀로 배우는 필수 영어 회화',
            date: "2024-12-09T14:30:15.123Z",
            score: 100,
            wrong: 0,
            elapsed_time: 203,
            ideal_time: 540,
        },
        {
            id: 2,
            name: 'LC2',
            date: "2024-12-09T14:30:15.123Z",
            score: 100,
            wrong: 0,
            elapsed_time: 203,
            ideal_time: 540,
        },
    ],
    rc: [
        {
            id: 3,
            name: 'RC1',
            date: "2024-12-09T14:30:15.123Z",
            score: 100,
            wrong: 0,
            elapsed_time: 203,
            ideal_time: 540,
        },
    ]
}
</script>

<style lang="scss" scoped></style>