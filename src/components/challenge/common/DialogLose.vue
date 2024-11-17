<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="400"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-16">
            <v-img
                src="/images/challenge/dialog/lose.png"
                alt="gift"
                width="160"
                height="160"
                class="mx-auto mb-6"
            />

            <div class="text-t-xl font-weight-bold mb-1 text-center">
                내일 다시 도전!
            </div>

            <div class="text-t-md font-weight-medium mb-6 text-center text-text-quaternary">
                당첨되지 않았어요. <br/>
                다른 미션에도 참여해 보세요!
            </div>

            <div class="d-flex flex-column justify-center ga-1-5">
                <v-btn
                    @click="buttonDownload.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    확인
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const emit = defineEmits<{
    (e: 'onClickConfirm'): void
}>();

const buttonDownload = {
    event: {
        onClick: () => {
            emit('onClickConfirm');
            dialog.value = false;
        }
    }
}


</script>

<style lang="scss" scoped></style>