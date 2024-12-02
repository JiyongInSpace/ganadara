<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card
            class="pt-9 px-5 pb-5 text-center rounded-16 mx-auto"
            width="100%"
            max-width="400"
        >
            <div class="text-t-xl font-weight-bold text-center mb-1">
                정말 탈퇴 하시겠습니까?
            </div>

            <div class="text-t-md font-weight-medium mb-8 text-center text-text-quaternary">
                계정을 탈퇴하면 모든 데이터가 영구적으로
                삭제됩니다. 복구는 불가능합니다.
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    @click="buttonCancel.event.onClick"
                    variant="outlined"
                    size="large"
                    class="flex-1-1-100"
                >
                    취소
                </v-btn>

                <v-btn
                    @click="buttonWithdrawConfirm.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    탈퇴하기
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickWithdrawConfirm'): void
}>();

const buttonCancel = {
    event: {
        onClick: () => {
            dialog.value = false;
            emit('onClickCancel');
        }
    }
}

const buttonWithdrawConfirm = {
    event: {
        onClick: () => {
            emit('onClickWithdrawConfirm');
            dialog.value = false;
        }
    }
}


</script>

<style lang="scss" scoped></style>