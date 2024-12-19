<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
        :scrim="false"
    >
        <v-card
            class="pt-7 px-5 pb-5 text-center background-error-primary"
            elevation="0"
        >
            <div class="d-flex justify-center align-center ga-2-5 text-t-lg font-weight-medium text-center mb-4">
                <div
                    variant="outlined"
                    class="text-t-xs font-weight-medium text-text-error-primary border border-error rounded-6 px-1-5 py-0-5"
                >
                    Tip
                </div>

                <span>
                    I love you 가 맞는 표현입니다.
                </span>
            </div>

            <div>
                <v-btn
                    @click="buttonDownload.event.onClick"
                    variant="tonal"
                    size="large"
                    class="foreground-error-secondary text-white"
                    block
                >
                    다시 풀기
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