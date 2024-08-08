<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <v-sheet>
            <CustomVideo
                :src="state.class.videoSrc"
                :isAvailable="state.class.isAvailable"
                @onNeedToBuy="state.ui.dialogBuy = true"
                @onEnded="customVideo.event.onEnded"
            />
            <!-- <DialogContactUs v-model:dialog="testtest" /> -->
        </v-sheet>

        <div
            ref="refScrollArea"
            class="d-flex flex-column overflow-y-auto position-relative flex-grow-1"
            :class="{ 'background-quaternary': tabMain.tab.value === MAIN_TAB.EXPRESSION }"
            @scroll="throttledUpdateRect"
        >
            <div class="pt-2 pb-4 px-4 foreground-white">

                <div class="mb-3 text-t-lg font-weight-bold">
                    {{ state.class.name }}
                </div>

                <DialogCreators
                    v-model:dialog="state.ui.dialogCreators"
                    :creators="state.class.creators"
                />

                <div class="d-flex ga-2">
                    <v-btn
                        :icon="state.class.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
                        size="small"
                        variant="tonal"
                        class="rounded-circle secondary"
                        @click="buttonLike.onClick"
                    />

                    <v-btn
                        :icon="state.class.isBookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
                        size="small"
                        variant="tonal"
                        class="rounded-circle secondary"
                        @click="buttonBookmark.onClick"
                    />

                    <v-btn
                        icon="mdi-share-variant-outline"
                        size="small"
                        variant="tonal"
                        class="rounded-circle secondary"
                        @click="buttonShare.onClick"
                    />

                    <DialogDownload
                        :fileName="state.class.name"
                        @onClickDownload="buttonDownload.onClick"
                    />

                    <div
                        v-if="!state.class.isAvailable"
                        class="ml-auto flex-grow-1"
                    >
                        <DialogBuy
                            v-model:dialog="state.ui.dialogBuy"
                            @onClickSubscribe="buttonSubscribe.onClick"
                        />
                    </div>
                </div>
            </div>

            <div class="d-flex flex-column">
                <div
                    ref="refTabs"
                    class="position-sticky top-0 z-1 foreground-white border-b border-border-primary"
                >
                    <v-tabs
                        v-model="tabMain.tab.value"
                        stacked
                        class="flex-shrink-0 text-text-quaternary font-weight-bold px-4 main-tab"
                        height="48"
                        selected-class="text-text-primary"
                    >
                        <v-tab
                            v-for="tabMainItem in tabMain.list"
                            :key="tabMainItem"
                            :value="tabMainItem"
                            class="text-lowercase font-weight-bold "
                        >
                            {{ t(`main_tab.${tabMainItem}`) }}
                        </v-tab>
                    </v-tabs>
                </div>

                <v-tabs-window
                    v-model="tabMain.tab.value"
                    class="overflow-y-auto"
                >
                    <!-- 학습 내용 -->
                    <v-tabs-window-item
                        :value="MAIN_TAB.TRANSCRIPT"
                        class="py-6 px-4"
                        :class="tabMain.transcriptFontSize.value"
                    >
                        <span v-for="count in 20">
                            {{ state.class.transcript }}
                        </span>

                        <!-- <div
                            v-for="(cue, index) in state.class.cues"
                            :key="index"
                            class="mb-10"
                        >
                            <div class="text-t-xl font-weight-bold mb-4">
                                {{ cue.text_en }}
                            </div>

                            <div class="text-t-md font-weight-medium text-text-quaternary">
                                {{ cue.text_ko }}
                            </div>
                        </div> -->
                    </v-tabs-window-item>

                    <!-- 복습 -->
                    <v-tabs-window-item
                        :value="MAIN_TAB.EXPRESSION"
                        class="py-4 px-4"
                    >
                        <v-chip-group
                            class="ga-2 mb-4"
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

                        <v-tabs-window v-model="chipExpression.tab.value">
                            <v-tabs-window-item :value="EXPRESSION_CHIP.SENTENCE">
                                <ExpressionSentenceList :sentences="state.class.expression.sentences" />
                            </v-tabs-window-item>

                            <v-tabs-window-item :value="EXPRESSION_CHIP.WORD">
                                <ExpressionWordList :words="state.class.expression.words" />
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </v-tabs-window-item>
                </v-tabs-window>
            </div>
        </div>

        <div
            v-if="tabMain.tab.value === MAIN_TAB.TRANSCRIPT"
            class="position-absolute pointer-event-none bottom-18 transition-all w-100"
            :style="{ top: (tabMain.rect?.value?.y + 48) + 'px' }"
        >
            <!-- 상하단 페이드 효과 -->
            <div class="position-absolute w-100 h-100 masking-image" />

            <div class="position-relative w-100 h-100">
                <!-- 확대/축소 버튼 -->
                <v-card
                    class="position-absolute z-1 top-8 right-4 w-fit ml-auto rounded-xl d-flex justify-center align-center flex-column ga-2 pointer-event-auto"
                    height="76"
                    width="36"
                >
                    <v-icon
                        icon="mdi-magnify-plus-outline"
                        @click="buttonZoomIn.onClick"
                    />

                    <v-divider
                        height="1"
                        width="20"
                    />

                    <v-icon
                        icon="mdi-magnify-minus-outline"
                        @click="buttonZoomOut.onClick"
                    />
                </v-card>

                <!-- 스크롤다운 버튼 -->
                <v-btn
                    icon="mdi-chevron-down"
                    size="small"
                    class="position-absolute bottom-8 right-4 rounded-circle secondary pointer-event-auto"
                    @click="buttonScrollDown.onClick"
                >
                </v-btn>
            </div>

        </div>

        <div
            class="pb-5 px-4 flex-grow-0"
            :class="{ 'background-quaternary': tabMain.tab.value === MAIN_TAB.EXPRESSION }"
        >
            <v-btn
                block
                variant="tonal"
                size="x-large"
                class="primary"
                @click="buttonQuestion.event.onClick"
            >
                문제 풀기
            </v-btn>
        </div>

        <DialogUnitCompleted
            v-model:dialog="state.ui.dialogCompleted"
            :state="state"
            :expressions="state.class.expression"
        />


    </v-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { throttle } from 'lodash-es';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const classId = computed(() => route.params.id);

const MAIN_TAB = {
    TRANSCRIPT: 'transcript',
    EXPRESSION: 'expression',
}

const EXPRESSION_CHIP = {
    SENTENCE: 'sentence',
    WORD: 'word',
}

const state = reactive({
    class: {
        id: 0,
        name: "",
        videoSrc: "",
        creators: [] as {
            id: string,
            name: string,
            image: string,
            isFollowed: boolean,
        }[],
        isLiked: false,
        isBookmarked: false,
        isSubscribed: false,
        transcript: "",
        cues: [] as {
            time: number,
            text_en: string,
            text_ko: string,
        }[],
        isAvailable: false,
        expression: {
            sentences: [] as any,
            words: [] as any,
        }
    },

    ui: {
        dialogCompleted: false,
        dialogCreators: false,
        dialogBuy: false,
    }
});

const loading = ref(false);

const fetchData = (id: number) => {
    // id 기반 API 호출
    console.log(id);
    loading.value = true;


    // 결과 반환 - dummy 테스트, 추후 삭제
    loading.value = false;
    const result = {
        classId: id,
        className: "자연스러운 영어인사",
        videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
        creators: [
            {
                id: "1",
                name: "제작자 이름",
                image: "/images/class/dummy_profile_image.png",
                isFollowed: true,
            },
            {
                id: "2",
                name: "제작자 이름2",
                image: "/images/class/dummy_profile_image.png",
                isFollowed: false,
            },
            {
                id: "3",
                name: "제작자 이름3",
                image: "/images/class/dummy_profile_image.png",
                isFollowed: true,
            },
            {
                id: "4",
                name: "제작자 이름4",
                image: "/images/class/dummy_profile_image.png",
                isFollowed: false,
            },
        ],
        isLiked: false,
        isBookmarked: false,
        isSubscribed: false,
        isAvailable: false,
        transcaript: `Guns change everything, and a bullet is foreverGuns change everything, and a bullet is
                foreverGuns change everything, and a bullet is foreverGuns change everything, and a bullet
                is
                foreverGuns change everything, and a bullet is foreverGuns change everything, and a bullet
                is
                foreverGuns change everything, and a bullet is forever and a bullet is foreverGuns change
                everything, and a bullet is foreverGuns change everything, and a bullet is forever`,
        cues: [
            {
                time: 0,
                text_en: "0choe naol moon-goo ibnida.",
                text_ko: "0초에 나올 문구입니다.",
            },
            {
                time: 3,
                text_en: "3choe naol moon-goo ibnida.",
                text_ko: "3초에 나올 문구입니다.",
            },
            {
                time: 5,
                text_en: "5choe naol moon-goo ibnida.",
                text_ko: "5초에 나올 문구입니다.",
            },
            {
                time: 10,
                text_en: "10choe naol moon-goo ibnida.",
                text_ko: "10초에 나올 문구입니다.",
            },
            {
                time: 20,
                text_en: "10choe naol moon-goo ibnida.",
                text_ko: "20초에 나올 문구입니다.",
            },
        ],
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
                }
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
    };

    state.class = {
        id: result.classId,
        name: result.className,
        videoSrc: result.videoSrc,
        creators: result.creators,
        isLiked: result.isLiked,
        isBookmarked: result.isBookmarked,
        isSubscribed: result.isSubscribed,
        isAvailable: result.isAvailable,
        transcript: result.transcaript,
        cues: result.cues,
        expression: result.expression,
    };
};

// route.params.id가 변경될 때마다 fetchData 함수를 호출
watch(() => route.params.id, (newId: any) => {
    fetchData(newId);
}, { immediate: true });

// CSS 관련 ========================================
const updateRect = () => {
    if (refTabs.value) {
        const elTabs = refTabs.value as HTMLElement;
        tabMain.rect.value = elTabs.getBoundingClientRect();
    }
}
const throttledUpdateRect = throttle(updateRect, 100);

onMounted(() => {
    window.addEventListener('resize', throttledUpdateRect);
    setTimeout(() => {
        updateRect();
    }, 100)
});

onUnmounted(() => {
    window.removeEventListener('resize', throttledUpdateRect);
});

const refScrollArea = ref();
const refTabs = ref();

// UI ========================================

const tabMain = {
    list: [
        MAIN_TAB.TRANSCRIPT,
        MAIN_TAB.EXPRESSION,
    ],
    tab: ref(MAIN_TAB.TRANSCRIPT),
    rect: ref(),
    transcriptFontSize: ref('text-t-md'),
    transcriptFontSizeList: [
        'text-t-xs',
        'text-t-sm',
        'text-t-md',
        'text-t-lg',
        'text-t-xl',
        'text-d-xs',
        'text-d-sm',
        'text-d-md',
        'text-d-lg',
    ],
}

const buttonLike = {
    onClick: () => {
        state.class.isLiked = !state.class.isLiked;
        alert("LIKE");
    }
}

const buttonBookmark = {
    onClick: () => {
        state.class.isBookmarked = !state.class.isBookmarked;
        alert("BOOKMARK");
    }
}

const buttonShare = {
    onClick: () => {
        if (navigator.share) { // Navigator를 지원하는 경우만 실행
            navigator
                .share()
                .then(() => {
                    // 정상 동작할 경우 실행
                    alert('공유하기 성공')
                })
                .catch((error) => {
                    alert('에러가 발생했습니다.')
                })
        } else { // navigator를 지원하지 않는 경우
            alert('페이지 공유를 지원하지 않습니다.')
        }
    }
}

const buttonDownload = {
    onClick: () => {
        alert("DOWNLOAD");
    }
}

const buttonSubscribe = {
    onClick: () => {
        alert("SUBSCRIBE");
    }
}

const chipExpression = {
    list: [
        EXPRESSION_CHIP.SENTENCE,
        EXPRESSION_CHIP.WORD,
    ],
    tab: ref(EXPRESSION_CHIP.SENTENCE),
}

const buttonQuestion = {
    event: {
        onClick: () => {
            alert("QUESTION");
        }
    }
}

const buttonZoomIn = {
    onClick: () => {
        const currentIndex = tabMain.transcriptFontSizeList.indexOf(tabMain.transcriptFontSize.value);
        if (currentIndex < tabMain.transcriptFontSizeList.length - 1) {
            tabMain.transcriptFontSize.value = tabMain.transcriptFontSizeList[currentIndex + 1];
        }
    }
}

const buttonZoomOut = {
    onClick: () => {
        const currentIndex = tabMain.transcriptFontSizeList.indexOf(tabMain.transcriptFontSize.value);
        if (currentIndex > 0) {
            tabMain.transcriptFontSize.value = tabMain.transcriptFontSizeList[currentIndex - 1];
        }
    }
}

const buttonScrollDown = {
    onClick: () => {
        if (refScrollArea.value) {
            // 현재 스크롤 위치에서 100px 아래로 스크롤
            const newScrollPosition = refScrollArea.value.scrollTop + 200;
            refScrollArea.value.scrollTo({
                top: newScrollPosition,
                behavior: 'smooth' // 스크롤을 부드럽게 처리
            });
        }
    }
}

const customVideo = {
    event: {
        onEnded: () => {
            // alert("VIDEO ENDED");
            state.ui.dialogCompleted = true;
        }
    }
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


<style lang="scss" scoped>
.masking-image {
    mask-image: linear-gradient(to bottom, white, transparent 50px, transparent calc(100% - 50px), white);
    /* 상하 흐릿한 효과 */
    background-color: white;
}

.bottom-8 {
    bottom: 2rem;
}

.top-8 {
    top: 2rem;
}

.right-4 {
    right: 1rem;
}

.bottom-18 {
    bottom: 4.5rem;
}

:deep(.v-tab.v-tab.v-btn) {
    min-width: unset !important;
    padding-left: 0px;
    padding-right: 0px;
}

.main-tab {
    :deep(.v-slide-group__content) {
        gap: 20px;
    }
}
</style>