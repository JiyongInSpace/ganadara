<template>
    <!-- :style="{ transform: 'translateX(-96px)' }" -->
    <div
        class="overflow-hidden"
        :class="{ 'background-util-blue': isMine }"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
    >
        <div
            class="d-flex py-2 ga-2 position-relative transition-all px-4"
            :class="{ 'pl-15': isReply }"
            :style="{ transform: `translateX(${currentSwipe}px)` }"
        >
            <v-img
                :src="commentItem.profileImage"
                width="32"
                height="32"
                class="flex-grow-0"
            />

            <div>
                <div class="text-t-xs d-flex ga-2 mb-0-5">
                    <span class="font-weight-semibold">
                        {{ commentItem.name }}
                    </span>

                    <span class="text-text-quaternary">
                        {{
                            formatDistanceToNow(
                                new Date(commentItem.date),
                                { locale: ko }
                            )
                        }}
                    </span>
                </div>

                <div class="text-t-sm mb-1">
                    {{ commentItem.text }}
                </div>

                <div class="text-t-xs font-weight-medium text-text-quaternary">
                    답글 달기
                </div>
            </div>

            <v-spacer />

            <div class="d-flex flex-column items-center justify-center text-center text-t-xs px-2-5">
                <IconHeart
                    :is-active="commentItem.isLiked!!"
                    size="16"
                    class="mb-1-5"
                    line-color="--v-text-primary"
                />

                <div class="text-text-tertiary">
                    {{ commentItem.likes }}
                </div>
            </div>

            <!-- 신고 및 답글 -->
            <div class="position-absolute left-100 top-0 bottom-0 d-flex">
                <v-sheet
                    class="foreground-quaternary d-flex align-center"
                    width="48"
                    height="100%"
                >
                    <v-img
                        src="/icons/IconCornerUpLeft.svg"
                        alt="more"
                        width="24"
                        height="24"
                        class="cursor-pointer flex-shrink-0"
                    />
                </v-sheet>

                <v-sheet
                    v-if="isMine"
                    class="foreground-error-primary d-flex align-center justify-center"
                    width="48"
                    height="100%"
                    @click="dialogSecond = true"
                >
                    <v-img
                        src="/icons/IconTrash.svg"
                        alt="delete"
                        width="24"
                        height="24"
                    />
                </v-sheet>

                <v-sheet
                    v-else
                    class="foreground-secondary d-flex align-center justify-center"
                    width="48"
                    height="100%"
                >
                    <DialogReport
                        :report-id="commentItem.id"
                    />
                </v-sheet>
            </div>
        </div>
    </div>

    <v-dialog
        v-model="dialogSecond"
        transition="dialog-bottom-transition"
        max-width="400"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-16">
            <div class="text-t-xl font-weight-bold mb-1 text-center">
                댓글을 삭제하시겠습니까?
            </div>

            <div class="mb-6 font-weight-medium text-text-quaternary text-center">
                해당 댓글을 삭제하면 되돌릴 수 없으며,
                댓글에 달린 답글도 함께 삭제됩니다.
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    variant="outlined"
                    class="flex-1-1-100"
                    size="large"
                    @click="buttonCancel.event.onClick"
                >
                    취소
                </v-btn>

                <v-btn
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    @click="buttonReport.event.onClick"
                >
                    삭제하기
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { IComment } from '@/interfaces';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useSnackbarStore } from '@/stores/snackbar'

const snackbar = useSnackbarStore();

const props = withDefaults(defineProps<{
    commentItem: IComment;
    isReply: boolean;
    isMine?: boolean;
}>(), {
    isReply: false,
    isMine: false,
});

const startX = ref(0);
const currentSwipe = ref(0);
const isSwiping = ref(false);
const isOpen = ref(false);

function handleTouchStart(event: any) {
    startX.value = event.touches[0].clientX;
    isSwiping.value = true;
}

function handleTouchMove(event: any) {
    if (!isSwiping.value) return;

    const currentX = event.touches[0].clientX;
    const diffX = currentX - startX.value;

    if (diffX > 0 && isOpen.value) {
        // 오른쪽으로 스와이프할 때 이미 열려 있으면 아무 동작도 하지 않음
        currentSwipe.value = 0;
    } else if (diffX < 0 && !isOpen.value) {
        // 왼쪽으로 스와이프할 때 닫혀 있으면 최대 -96px만큼 이동
        currentSwipe.value = Math.max(-96, diffX);
    }
}

function handleTouchEnd() {
    isSwiping.value = false;
    // 여기에서 스와이프 거리에 따른 로직을 추가할 수 있습니다.
    // 예: 스와이프 거리가 특정 임계값을 넘으면 액션을 실행
    if (Math.abs(currentSwipe.value) > 50) {
        isOpen.value = true;
    } else {
        isOpen.value = false;
    }
    // 스와이프 후 위치 초기화
    if (isOpen.value) {
        currentSwipe.value = -96;
    } else {
        currentSwipe.value = 0;
    }
}

const dialogSecond = ref(false);

const buttonCancel = {
    event: {
        onClick: () => {
            dialogSecond.value = false;
        }
    }
}

const buttonReport = {
    event: {
        onClick: () => {
            snackbar.showSnackbar("신고 접수가 완료되었습니다.");
            dialogSecond.value = false;
        }
    }
}

</script>
