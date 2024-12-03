<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-t-16">

            <div class="ga-3">
                <v-btn
                    class="text-start-button w-100 px-0 mb-1-5"
                    variant="text"
                    size="large"
                    @click="onClickReport"
                >
                    <div class="w-full">
                        <v-icon
                            icon="mdi-comment-alert-outline"
                            class="mr-1"
                        />

                        <span>
                            음성 오류 신고하기
                        </span>
                    </div>
                </v-btn>

                <v-btn
                    class="text-start-button w-100 px-0"
                    variant="text"
                    size="large"
                    @click="onClickDelete"
                >
                    <div class="w-full">
                        <v-icon
                            icon="mdi-trash-can-outline"
                            class="mr-1"
                        />

                        <span>
                            삭제하기
                        </span>
                    </div>
                </v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>

    <v-dialog
        v-model="dialogSecond"
        transition="dialog-bottom-transition"
        max-width="400"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-16">
            <div class="text-t-xl font-weight-bold mb-1 text-center">
                단어를 삭제하시겠어요?
            </div>

            <div class="mb-6 font-weight-medium text-text-quaternary text-center">
                해당 단어가 단어 복습 목록에서 사라집니다.
                삭제하시겠어요?
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    variant="outlined"
                    class="flex-1-1-100 border-border-secondary"
                    size="large"
                    @click="dialogSecond = false"
                >
                    취소
                </v-btn>

                <v-btn
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    @click="onClickDeleteConfirm"
                >
                    확인
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar';

const snackbar = useSnackbarStore();
const dialog = defineModel("dialog");
const dialogSecond = ref(false);

const emit = defineEmits<{
    (e: 'onClickReport'): void,
    (e: 'onClickSubscribe'): void
}>();

const onClickReport = () => {
    emit('onClickReport');
    dialog.value = false;
    snackbar.showSnackbar('음성 오류가 신고되었습니다.');
}

const onClickDelete = () => {
    dialog.value = false;
    dialogSecond.value = true;
}

const onClickDeleteConfirm = () => {
    dialogSecond.value = false;
    snackbar.showSnackbar('단어를 삭제했습니다.');
    emit('onClickReport');
}

</script>

<style lang="scss" scoped></style>