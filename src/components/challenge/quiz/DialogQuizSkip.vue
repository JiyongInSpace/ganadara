<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-t-16">
            <div class="text-t-xl font-weight-bold text-center mb-8">
                다음 문제로 넘어가시겠습니까?
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    @click="buttonCancel.event.onClick"
                    variant="outlined flex-1-1-100"
                    size="large"
                    class="secondary"
                >
                    돌아가기
                </v-btn>

                <v-btn
                    @click="buttonDownload.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    건너뛰기
                </v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickSkip'): void
}>();

const buttonCancel = {
    event: {
        onClick: () => {
            dialog.value = false;
            emit('onClickCancel');
        }
    }
}

const buttonDownload = {
    event: {
        onClick: () => {
            emit('onClickSkip');
            dialog.value = false;
        }
    }
}


</script>

<style lang="scss" scoped></style>