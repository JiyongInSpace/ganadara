<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                모의고사
            </span>
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto px-4 py-5">
            <div
                v-for="testItem, index in state.testList"
                class="d-flex align-center border-b py-2 cursor-pointer"
                v-ripple
                @click="() => onClickMockTest(testItem.key)"
            >
                <div class="py-2 flex-grow-1">
                    <div class="mb-1">
                        <span class="font-weight-bold">
                            {{ testItem.title }}
                        </span>

                        <v-chip
                            v-if="testItem.status === 'completed'"
                            variant="outlined"
                            class="xxs brand ml-2"
                        >
                            {{ testItem.status }}
                        </v-chip>
                        <v-chip
                            v-if="testItem.status === 'ongoing'"
                            variant="outlined"
                            class="xxs border-border-brand text-text-brand-tertiary ml-2"
                        >
                            {{ testItem.status }}
                        </v-chip>
                        <v-chip
                            v-if="testItem.status === 'not_started'"
                            variant="outlined"
                            size="x-small"
                            class="xxs secondary ml-2"
                        >
                            {{ testItem.status }}
                        </v-chip>
                    </div>

                    <div class="text-t-sm font-weight-medium">
                        총 {{ testItem.quizNumber }}문제
                    </div>
                </div>

                <div
                    v-if="testItem.score"
                    class="font-weight-bold"
                >
                    {{ testItem.score }}점
                </div>
            </div>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();

const state = reactive({
    testList: [
        {
            key: '1',
            title: '모의고사 1',
            quizNumber: 10,
            status: 'completed',
            score: 80,
        },
        {
            key: '2',
            title: '모의고사 2',
            quizNumber: 10,
            status: 'ongoing',
            score: null,
        },
        {
            key: '3',
            title: '모의고사 3',
            quizNumber: 10,
            status: 'not_started',
            score: null,
        },
        {
            key: '4',
            title: '모의고사 4',
            quizNumber: 10,
            status: 'completed',
            score: 80,
        },
        {
            key: '5',
            title: '모의고사 5',
            quizNumber: 10,
            status: 'completed',
            score: 80,
        },
    ]
});

//  ======
const onClickMockTest = (key: string) => {
    alert("TEST");
    router.push(`/dashboard/additional/mock_test/${key}/complete`);
}


</script>


<style lang="scss" scoped></style>