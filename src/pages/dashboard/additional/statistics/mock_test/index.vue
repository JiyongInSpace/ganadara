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
                모의고사
            </span>

            <v-spacer />
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto ga-2 px-4 py-5">
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
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { IExamItem } from '@/interfaces';


const router = useRouter();

onMounted(() => {
    // 데이터
    state.mockExamInfo = {
        lc: [
            {
                id: 1,
                name: 'LC1',
                date: "2024-12-09T14:30:15.123Z",
                score: 100,
                wrong: 0,
                elapsed_time: 223,
                ideal_time: 600,
            },
            {
                id: 2,
                name: 'LC2',
                date: "2024-12-09T14:30:15.123Z",
                score: 100,
                wrong: 0,
                elapsed_time: 223,
                ideal_time: 600,
            },
        ],
        rc: [
            {
                id: 3,
                name: 'RC1',
                date: "2024-12-09T14:30:15.123Z",
                score: 100,
                wrong: 0,
                elapsed_time: 223,
                ideal_time: 600,
            },
        ]
    };
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

</script>

<style lang="scss" scoped></style>