<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="400"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-16">
            <div class="text-t-xl font-weight-bold mb-1 text-center">
                힌트
            </div>

            <div class="text-t-md font-weight-medium mb-6 text-center text-text-quaternary">
                퀴즈에 대한 힌트 내용을 노출합니다.퀴즈에 대한 힌트 내용을 노출합니다.퀴즈에 대한 힌트 내용을 노출합니다.퀴즈에 대한 힌트 내용을 노출합니다.
                퀴즈에 대한 힌트 내용을 노출합니다.
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
    (e: 'onClickHint'): void
}>();

const buttonDownload = {
    event: {
        onClick: () => {
            emit('onClickHint');
            dialog.value = false;
        }
    }
}


</script>

<style lang="scss" scoped></style>