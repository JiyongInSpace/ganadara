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
                        :isMine="commentItem.id === '1'"
                        @onClickReply="onClickReply"
                    />

                    <div>
                        <CommentItem
                            v-for="(replyItem, key) in commentItem.replies"
                            :key="key"
                            :commentItem="replyItem"
                            isReply
                            @onClickReply="onClickReply"
                        />
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

                <v-textarea
                    v-model="state.inputValue"
                    variant="outlined"
                    name="email"
                    hide-details
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
</script>

<style lang="scss" scoped>
:deep(.v-field.v-field--active.v-field--appended) {
    align-items: end;
}

:deep(.v-field__append-inner) {
    padding-bottom: 10px;
}
</style>