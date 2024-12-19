<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-icon
                icon="mdi-dots-horizontal"
                v-bind="activatorProps"
            ></v-icon>
        </template>

        <v-card class="pt-9 px-4 pb-5 rounded-t-16">
            <div class="ga-3">
                <v-btn
                    class="primary flex-1-1-100 text-start text-start-button px-3"
                    variant="text"
                    block
                    size="large"
                    @click="onClickEdit"
                >
                    <div class="w-full">
                        <v-icon
                            icon="mdi-pencil-outline"
                            width="20"
                            height="20"
                            class="mr-1"
                        />
                        수정
                    </div>
                </v-btn>

                <v-btn
                    class="flex-1-1-100 text-start-button px-3 text-error"
                    variant="text"
                    size="large"
                    @click="onClickDeleteConfirm"
                >
                    <div class="w-full">
                        <v-icon
                            icon="mdi-trash-can-outline"
                            width="20"
                            height="20"
                            class="mr-1"
                        />
                        삭제
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
                게시물을 삭제하시겠습니까?
            </div>

            <div class="mb-6 font-weight-medium text-text-quaternary text-center">
                게시물을 삭제하면 되돌릴 수 없으며, <br />
                게시물에 달린 댓글도 함께 삭제됩니다.
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    variant="outlined"
                    class="flex-1-1-100"
                    size="large"
                    @click="onClickCancel"
                >
                    취소
                </v-btn>

                <v-btn
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    @click="onClickDelete"
                >
                    삭제
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar'

const snackbar = useSnackbarStore();

const props = defineProps<{
    editId: string;
}>();

const emit = defineEmits<{
    (e: 'onClickEdit'): void,
    (e: 'onClickDelete'): void,
    (e: 'onClickDeleteConfirm'): void,
}>();

const dialog = defineModel("dialog");
const dialogSecond = ref(false);

const state = reactive({
    radios: null,
});

const onClickEdit = () => {
    emit('onClickEdit');
}

const onClickCancel = () => {
    dialogSecond.value = false;
}

const onClickDelete = () => {
    // console.log(props.editId);

    snackbar.showSnackbar("게시글이 삭제되었습니다.");
    dialog.value = false;
    dialogSecond.value = false;
    state.radios = null;
}

const onClickDeleteConfirm = () => {
    dialogSecond.value = true;
}
</script>

<style lang="scss" scoped></style>