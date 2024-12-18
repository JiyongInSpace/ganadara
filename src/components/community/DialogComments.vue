<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <div
                class="text-t-sm text-text-quaternary mb-0-5"
                v-bind="activatorProps"
            >
                댓글 {{ countComments(commentList) }}개 모두 보기
            </div>
        </template>

        <v-card
            class="pt-9 pb-5 rounded-t-16 elevation-0"
            :style="{
                maxHeight: `calc(var(--vh, 1vh) * 90)`,
            }"
        >
            <div class="text-t-xl font-weight-bold text-center mb-0-5">
                댓글
            </div>

            <div class="overflow-y-auto">
                <div
                    v-for="(commentItem, key) in commentList"
                    :key="key"
                >
                    <CommentItem
                        :commentItem="commentItem"
                        :isReply="false"
                        :isMine="commentItem.id == '1'"
                        @onClickReply="onClickReply"
                    />

                    <v-expansion-panels
                        v-model="commentItem.expanded"
                        v-if="commentItem.replies && commentItem.replies.length > 0"
                        flat
                    >
                        <v-expansion-panel hide-actions>
                            <v-expansion-panel-text class="px-0">
                                <CommentItem
                                    v-for="(replyItem, key) in commentItem.replies"
                                    :key="key"
                                    :commentItem="replyItem"
                                    :isMine="replyItem.id == '1'"
                                    isReply
                                    @onClickReply="onClickReply"
                                />
                            </v-expansion-panel-text>

                            <v-expansion-panel-title
                                v-ripple="false"
                                class="pt-1 pb-2 px-14"
                                min-height="1px"
                                height="1px"
                            >
                                <div class="d-flex align-center">
                                    <v-card
                                        width="20"
                                        height="1"
                                        flat
                                        class="border-border-primary border-b mr-2"
                                    ></v-card>
                                    <span
                                        v-if="commentItem.expanded == 0"
                                        class="text-t-xs font-weight-medium text-text-quaternary"
                                    >
                                        답글 숨기기
                                    </span>
                                    <span
                                        v-else
                                        class="text-t-xs font-weight-medium text-text-quaternary"
                                    >
                                        답글 {{ commentItem.replies.length }}개 더 보기
                                    </span>
                                </div>
                            </v-expansion-panel-title>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <div>
                    </div>
                </div>
            </div>
        </v-card>

        <div>
            <div
                v-if="state.isReply"
                class="d-flex justify-space-between align-center background-secondary py-3 px-4"
            >
                <span class="text-t-sm">
                    @Username님에게 남기는 답글
                </span>

                <v-icon
                    icon="mdi-close"
                    class="text-text-quaternary"
                    @click="state.isReply = undefined"
                />
            </div>

            <v-sheet class="d-flex align-end ga-3 pa-4 border-t">
                <v-img
                    src="/images/class/dummy_profile_image.png"
                    width="32"
                    height="32"
                    class="flex-grow-0"
                />

                <div class="w-100 position-relative">
                    <v-textarea
                        v-if="!state.isAi"
                        v-model="state.inputValue"
                        variant="outlined"
                        name="email"
                        hide-details
                        class="text-t-sm"
                        auto-grow
                        rows="1"
                        max-rows="5"
                        no-resize
                        placeholder="댓글을 입력해 주세요."
                        @keydown.enter="() => { }"
                    >
                        <template v-slot:append-inner>
                            <div
                                v-if="state.inputValue"
                                class="d-flex ga-1"
                            >
                                <v-btn
                                    icon
                                    size="32"
                                    variant="tonal"
                                    class="secondary rounded-circle text-text-quaternary"
                                >
                                    <v-img
                                        v-if="!state.isAi"
                                        src="/images/community/Ai_inactive.svg"
                                        width="32"
                                        height="32"
                                        class="flex-grow-1 flex-shrink-0"
                                        @click="state.isAi = true"
                                    />
                                    <v-img
                                        v-else
                                        src="/images/community/AI.svg"
                                        width="32"
                                        height="32"
                                        class="flex-grow-1 flex-shrink-0"
                                        @click="state.isAi = false"
                                    />
                                </v-btn>

                                <v-btn
                                    icon
                                    size="32"
                                    variant="tonal"
                                    class="primary rounded-circle"
                                    @click="onClickSubmit"
                                >
                                    <v-icon
                                        icon="mdi-arrow-up"
                                        size="16"
                                    />
                                </v-btn>
                            </div>
                        </template>
                    </v-textarea>

                    <div
                        v-if="state.isAi"
                        class="d-flex align-center pr-3 border-border-primary border rounded-8"
                        :style="{
                            minHeight: '56px'
                        }"
                    >
                        <div
                            class="flex-grow-1 align-self-stretch text-break py-2 px-3"
                            v-html="computedAiText"
                        >
                        </div>

                        <div
                            v-if="state.inputValue"
                            class="d-flex ga-1"
                        >
                            <v-btn
                                icon
                                size="32"
                                variant="tonal"
                                class="secondary rounded-circle text-text-quaternary"
                            >
                                <v-img
                                    v-if="!state.isAi"
                                    src="/images/community/Ai_inactive.svg"
                                    width="32"
                                    height="32"
                                    class="flex-grow-1 flex-shrink-0"
                                    @click="state.isAi = true"
                                />
                                <v-img
                                    v-else
                                    src="/images/community/AI.svg"
                                    width="32"
                                    height="32"
                                    class="flex-grow-1 flex-shrink-0"
                                    @click="state.isAi = false"
                                />
                            </v-btn>

                            <v-btn
                                icon
                                size="32"
                                variant="tonal"
                                class="primary rounded-circle"
                                @click="onClickSubmit"
                            >
                                <v-icon
                                    icon="mdi-arrow-up"
                                    size="16"
                                />
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-sheet>
        </div>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
import { IComment } from '@/interfaces';


const props = defineProps<{
    commentList: any[];
}>();

const dialog = defineModel("dialog");

function countComments(comments: IComment[]) {
    let total = 0;
    comments.forEach(comment => {
        total += 1; // 댓글 자체를 세고
        if (comment.replies && comment.replies.length > 0) {
            total += countComments(comment.replies); // 대댓글 수를 재귀적으로 센다
        }
    });
    return total;
}

const state = reactive({
    inputValue: '',
    isReply: undefined as number | undefined,
    isAi: false,
});

const onClickReply = (_id: number) => {
    state.isReply = _id;
}

const onClickSubmit = () => {
    alert(state.inputValue);
    state.inputValue = '';
}


// TEST!
function setDynamicVH() {
    const vh = window.innerHeight * 0.01; // 현재 뷰포트 높이의 1%
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 초기 설정 및 이벤트 리스너 추가
window.addEventListener('resize', setDynamicVH);
window.addEventListener('orientationchange', setDynamicVH);
setDynamicVH(); // 초기 호출



// AI 변환 함수 (퍼블리싱 확인용 임시) ============================
function wrapRandomSpan(input: string, wrapClass: string, wrapCount = 1) {
    // 문자열을 배열로 변환
    let chars = input.split('');

    // 래핑 횟수만큼 반복
    for (let i = 0; i < wrapCount; i++) {
        if (chars.length === 0) break;

        // 랜덤 시작 인덱스 선택
        const startIndex = Math.floor(Math.random() * chars.length);

        // 랜덤 끝 인덱스 선택 (최소 1글자 이상)
        const endIndex = Math.min(
            startIndex + Math.floor(Math.random() * (chars.length - startIndex)),
            chars.length - 1
        );

        // 선택한 부분 래핑
        const wrapped = `<span class="${wrapClass}">${chars
            .slice(startIndex, endIndex + 1)
            .join('')}</span>`;

        // 원래 배열에서 해당 부분 교체
        chars.splice(startIndex, endIndex - startIndex + 1, wrapped);
    }

    // 배열을 다시 문자열로 변환하여 반환
    return chars.join('');
}

const computedAiText = computed(() => {
    return wrapRandomSpan(state.inputValue, "text-warning font-weight-medium", 2)
})

</script>

<style lang="scss" scoped>
:deep(.v-field.v-field--active.v-field--appended) {
    align-items: end;
}

:deep(.v-field__append-inner) {
    padding-bottom: 10px;
}

:deep(.v-expansion-panel-title) {
    min-height: unset !important;
}

:deep(.v-expansion-panel-text__wrapper) {
    padding: 0px !important;
}
</style>