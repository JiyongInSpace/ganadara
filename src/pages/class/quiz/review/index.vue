<template>
    <PageTemplate
        back-button
        header-background="tertiary"
        background="tertiary"
        no-gap
    >
        <template v-slot:center-header>
            배운 내용 복습하기
        </template>

        <template v-slot:content>
            <div class="d-flex justify-space-between align-center mb-4">
                <v-chip-group
                    v-model="chipExpression.tab.value"
                    class="ga-2 flex-shrink-0"
                    selected-class="foreground-primary text-text-primary_on-brand"
                    mandatory
                >
                    <v-chip
                        v-for="chipExpressionItem in chipExpression.list"
                        class="border-border-primary ma-0 mr-2 background-secondary"
                        :value="chipExpressionItem"
                    >
                        <span class="text-t-xs">
                            {{ t(`sub_tab.${chipExpressionItem}`) }}
                        </span>
                    </v-chip>
                </v-chip-group>

                <div class="d-flex align-center ga-3">
                    <span class="text-t-xs font-weight-medium text-text-secondary">
                        오답 리스트에 자동 저장하기
                    </span>
                    <v-switch
                        hide-details
                        density="compact"
                        color="primary"
                    />
                </div>
            </div>

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
        </template>
    </PageTemplate>


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
