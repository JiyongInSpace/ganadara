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
                탈퇴하시겠습니까?
            </div>

            <div class="text-t-md font-weight-medium mb-8 text-center text-text-quaternary">
                탈퇴하신다니 정말 아쉬워요!
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
                    @click="buttonWithdraw.event.onClick"
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
    (e: 'onClickWithdraw'): void
}>();

const buttonCancel = {
    event: {
        onClick: () => {
            dialog.value = false;
            emit('onClickCancel');
        }
    }
}

const buttonWithdraw = {
    event: {
        onClick: () => {
            emit('onClickWithdraw');
            dialog.value = false;
        }
    }
}


</script>

<style lang="scss" scoped></style>