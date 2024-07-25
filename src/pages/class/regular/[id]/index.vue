<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <v-sheet>
            <!-- <v-img src="/images/class/default_video.png"></v-img> -->
            <CustomVideo />
        </v-sheet>

        <div
            class="d-flex flex-column overflow-y-auto position-relative flex-grow-1"
            :class="{ 'background-quaternary': tabMain.tab.value === MAIN_TAB.EXPRESSION }"
        >
            <div class="pa-4 foreground-white">

                <div class="mb-3 text-t-lg font-weight-bold">
                    {{ state.className }}
                </div>

                <div class="d-flex ga-1 align-center mb-3">
                    <v-img
                        :src="state.creatorImage"
                        width="25"
                        height="25"
                        cover
                        class="flex-grow-0 rounded-circle"
                    />

                    <div class="text-t-xs font-weight-medium">
                        {{ state.creatorName }}
                    </div>
                </div>

                <div class="d-flex ga-2">
                    <v-btn
                        :icon="state.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
                        size="small"
                        variant="tonal"
                        class="rounded-circle secondary"
                        @click="buttonLike.onClick"
                    />

                    <v-btn
                        :icon="state.isBookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
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
                        :fileName="state.className"
                        @onClickDownload="buttonDownload.onClick"
                    />
                </div>
            </div>

            <div class="d-flex flex-column">
                <div class="position-sticky top-0 z-1 foreground-white border-b border-border-primary">
                    <v-tabs
                        v-model="tabMain.tab.value"
                        stacked
                        class="flex-shrink-0 text-text-quaternary font-weight-bold"
                        height="48"
                        selected-class="text-text-primary"
                    >
                        <v-tab :value="MAIN_TAB.TRANSCRIPT">
                            transcript
                        </v-tab>

                        <v-tab :value="MAIN_TAB.EXPRESSION">
                            expression
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
                    >
                        <span v-for="count in 20">
                            Guns change everything, and a bullet is foreverGuns change everything, and a bullet is
                            foreverGuns change everything, and a bullet is foreverGuns change everything, and a bullet
                            is
                            foreverGuns change everything, and a bullet is foreverGuns change everything, and a bullet
                            is
                            foreverGuns change everything, and a bullet is forever and a bullet is foreverGuns change
                            everything, and a bullet is foreverGuns change everything, and a bullet is forever
                        </span>
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
                        >
                            <v-chip
                                class="background-tertiary"
                                :value="EXPRESSION_CHIP.SENTENCE"
                            >
                                문장
                            </v-chip>

                            <v-chip
                                class="background-tertiary"
                                :value="EXPRESSION_CHIP.WORD"
                            >
                                단어
                            </v-chip>
                        </v-chip-group>

                        <v-tabs-window v-model="chipExpression.tab.value">
                            <v-tabs-window-item :value="EXPRESSION_CHIP.SENTENCE">
                                <ExpressionSentenceList />
                            </v-tabs-window-item>

                            <v-tabs-window-item :value="EXPRESSION_CHIP.WORD">
                                <ExpressionWordList />
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </v-tabs-window-item>
                </v-tabs-window>
            </div>
        </div>

        <!-- <v-spacer /> -->

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
    </v-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

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
    classId: classId.value,
    className: "자연스러운 영어인사",
    creatorName: "제작자 이름",
    creatorImage: "/images/class/default_video.png",
    isLiked: false,
    isBookmarked: false,
});

const tabMain = {
    list: [
        MAIN_TAB.TRANSCRIPT,
        MAIN_TAB.EXPRESSION,
    ],
    tab: ref(MAIN_TAB.TRANSCRIPT),
}

const buttonLike = {
    onClick: () => {
        state.isLiked = !state.isLiked;
        alert("LIKE");
    }
}

const buttonBookmark = {
    onClick: () => {
        state.isBookmarked = !state.isBookmarked;
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

</script>


<style lang="scss" scoped>
.scrollable-content {
    mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
    /* 상하 흐릿한 효과 */
}
</style>