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
                로그아웃 하시겠습니까?
            </div>

            <div class="text-t-md font-weight-medium mb-8 text-center text-text-quaternary">
                계정을 로그아웃하면, 다시 로그인해야 합니다.<br/>
                모든 진행 중인 작업은 저장됩니다.
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    @click="buttonCancel.event.onClick"
                    variant="outlined"
                    size="large"
                    class="flex-1-1-100 border-border-primary"
                >
                    취소
                </v-btn>

                <v-btn
                    @click="buttonLogout.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    로그아웃
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickLogout'): void
}>();

const buttonCancel = {
    event: {
        onClick: () => {
            dialog.value = false;
            // emit('onClickCancel');
        }
    }
}

const buttonLogout = {
    event: {
        onClick: () => {
            emit('onClickLogout');
            dialog.value = false;
        }
    }
}


</script>

<style lang="scss" scoped></style>