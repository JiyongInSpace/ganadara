<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="400"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                v-bind="activatorProps"
                variant="outlined"
                block
            >
                구매하기
            </v-btn>
        </template>

        <v-card class="pt-9 px-5 pb-5 text-center rounded-16">
            <div class="text-t-xl font-weight-bold mb-6 text-center">
                구독하고 콘텐츠 계속 보기
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    @click="buttonCancel.event.onClick"
                    variant="outlined"
                    class="flex-1-1-100"
                    size="large"
                >
                    돌아가기
                </v-btn>

                <v-btn
                    @click="buttonDownload.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    구독하기
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickSubscribe'): void
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
            emit('onClickSubscribe');
            dialog.value = false;
        }
    }
}


</script>

<style lang="scss" scoped></style>