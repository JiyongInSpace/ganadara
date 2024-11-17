<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-t-16">
            <div class="text-t-xl font-weight-bold text-center mb-1">
                회원 가입 후 이용할 수 있어요
            </div>

            <div class="text-t-md font-weight-medium mb-8 text-center text-text-quaternary">
                회원 가입하고 혜택을 받아보세요.
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    @click="buttonCancel.event.onClick"
                    variant="outlined"
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
                    회원 가입하고 혜택 받기
                </v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>
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