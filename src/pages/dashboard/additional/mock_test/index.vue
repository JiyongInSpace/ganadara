<template>
    <PageTemplate back-button>
        <template v-slot:center-header>
            모의고사
        </template>

        <template v-slot:content>
            <div>

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
                                {{ t(testItem.status) }}
                            </v-chip>
                            <v-chip
                                v-if="testItem.status === 'ongoing'"
                                variant="outlined"
                                class="xxs border-border-brand text-text-brand-tertiary ml-2"
                            >
                                {{ t(testItem.status) }}
                            </v-chip>
                            <v-chip
                                v-if="testItem.status === 'not_started'"
                                variant="outlined"
                                size="x-small"
                                class="xxs secondary ml-2"
                            >
                                {{ t(testItem.status) }}
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
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
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



const { t } = useI18n({
    messages: {
        ko: {
            completed: "완료",
            ongoing: "진행 중",
            not_started: "미응시",
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});


</script>


<style lang="scss" scoped></style>