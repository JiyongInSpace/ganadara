<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
        :scrim="false"
    >
        <v-card
            class="pt-7 px-5 pb-5 text-center background-success-primary"
            elevation="0"
        >
            <div class="text-t-lg font-weight-medium text-center mb-4">
                맞았어요!
            </div>

            <div>
                <v-btn
                    @click="buttonDownload.event.onClick"
                    variant="tonal"
                    size="large"
                    class="foreground-success-secondary text-white"
                    block
                >
                    확인
                </v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const emit = defineEmits<{
    (e: 'onClickButton'): void
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
            emit('onClickButton');
            dialog.value = false;
        }
    }
}


</script>

<style lang="scss" scoped></style>