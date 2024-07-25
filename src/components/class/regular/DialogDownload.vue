<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="400"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                v-bind="activatorProps"
                icon="mdi-tray-arrow-down"
                size="small"
                variant="tonal"
                class="rounded-circle secondary"
            />
        </template>

        <v-card class="pt-9 px-5 pb-5 text-center rounded-lg">
            <div class="text-d-xs font-weight-bold mb-1 text-center">
                “{{ fileName }}.pdf”
            </div>

            <div class="mb-6 text-center">
                파일을 다운로드 합니다.
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    @click="buttonCancel.event.onClick"
                    variant="outlined"
                    class="flex-1-1-100"
                    size="large"
                >
                    취소
                </v-btn>

                <v-btn
                    @click="buttonDownload.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    다운로드
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickDownload'): void
}>();

const props = defineProps<{
    fileName: string;
}>();

const buttonCancel = {
    event: {
        onClick: () => {
            dialog.value = false;
            // emit('onClickCancel');
        }
    }
}

const buttonDownload = {
    event: {
        onClick: () => {
            emit('onClickDownload');
            dialog.value = false;
        }
    }
}


</script>

<style lang="scss" scoped></style>