<template>
    <v-container
        class="height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto background-quaternary"
    >
        <!-- TITLE -->
        <v-toolbar
            class="bg-transparent"
            height="56"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M15 18L9 12L15 6"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>

            <div class="text-t-lg font-weight-bold position-center">
                배운 내용 복습하기
            </div>
        </v-toolbar>

        <v-chip-group
            class="ga-2 mb-4 flex-shrink-0"
            selected-class="bg-black"
            v-model="chipExpression.tab.value"
            mandatory
        >
            <v-chip
                v-for="chipExpressionItem in chipExpression.list"
                class="background-tertiary"
                :value="chipExpressionItem"
            >
                <span class="text-t-xs">
                    {{ t(`sub_tab.${chipExpressionItem}`) }}
                </span>
            </v-chip>
        </v-chip-group>

        <v-tabs-window
            v-model="chipExpression.tab.value"
            class="overflow-y-auto"
        >
            <v-tabs-window-item :value="EXPRESSION_CHIP.SENTENCE">
                <ExpressionSentenceList :sentences="state.class.expression.sentences" />
            </v-tabs-window-item>

            <v-tabs-window-item :value="EXPRESSION_CHIP.WORD">
                <ExpressionWordList :words="state.class.expression.words" />
            </v-tabs-window-item>
        </v-tabs-window>
    </v-container>

</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';


const EXPRESSION_CHIP = {
    SENTENCE: 'sentence',
    WORD: 'word',
}

const state = reactive({
    class: {
        expression: {
            sentences: [
                {
                    id: 1,
                    sentence: "Hi, Where are you going?",
                    meaning: "안녕, 지금 어디 가고 있어?",
                }, {
                    id: 2,
                    sentence: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
                    meaning: "긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장"
                },
                {
                    id: 1,
                    sentence: "Hi, Where are you going?",
                    meaning: "안녕, 지금 어디 가고 있어?",
                }, {
                    id: 2,
                    sentence: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
                    meaning: "긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장"
                },
                {
                    id: 1,
                    sentence: "Hi, Where are you going?",
                    meaning: "안녕, 지금 어디 가고 있어?",
                }, {
                    id: 2,
                    sentence: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
                    meaning: "긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장"
                },
                {
                    id: 1,
                    sentence: "Hi, Where are you going?",
                    meaning: "안녕, 지금 어디 가고 있어?",
                }, {
                    id: 2,
                    sentence: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
                    meaning: "긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장"
                },
                {
                    id: 1,
                    sentence: "Hi, Where are you going?",
                    meaning: "안녕, 지금 어디 가고 있어?",
                }, {
                    id: 2,
                    sentence: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
                    meaning: "긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장"
                },
                {
                    id: 1,
                    sentence: "Hi, Where are you going?",
                    meaning: "안녕, 지금 어디 가고 있어?",
                }, {
                    id: 2,
                    sentence: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
                    meaning: "긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장긴문장"
                },
            ],
            words: [
                {
                    id: 3,
                    word: "Hi",
                    meaning: "안녕",
                }, {
                    id: 4,
                    word: "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
                    meaning: "긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어긴단어",
                },
            ],
        }
    },
});
const chipExpression = {
    list: [
        EXPRESSION_CHIP.SENTENCE,
        EXPRESSION_CHIP.WORD,
    ],
    tab: ref(EXPRESSION_CHIP.SENTENCE),
}

// 번역
const { t } = useI18n({
    messages: {
        en: {
            main_tab: {
                transcript: "학습 내용",
                expression: "표현",
            },
            sub_tab: {
                sentence: "문장",
                word: "단어",
            },
        },
        ko: {
            main_tab: {
                transcript: "학습 내용",
                expression: "표현",
            },
            sub_tab: {
                sentence: "문장",
                word: "단어",
            },
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

</script>
