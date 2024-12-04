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

        <v-card class="pt-9 pb-5 rounded-t-16 elevation-0">
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
                    />

                    <div>
                        <CommentItem
                            v-for="(replyItem, key) in commentItem.replies"
                            :key="key"
                            :commentItem="replyItem"
                            isReply
                        />
                    </div>
                </div>
            </div>
        </v-card>

        <v-sheet class="d-flex ga-3 pa-4 border-t">
            <v-img
                src="/images/class/dummy_profile_image.png"
                width="48"
                height="48"
                class="flex-grow-0"
            />

            <!-- v-model="inputValue" -->
            <v-textarea
                variant="outlined"
                name="email"
                hide-details
                auto-grow
                rows="1"
                max-rows="5"
                no-resize
                placeholder="댓글을 입력해 주세요."
                @keydown.enter="() => { }"
            />
        </v-sheet>
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

</script>

<style lang="scss" scoped></style>