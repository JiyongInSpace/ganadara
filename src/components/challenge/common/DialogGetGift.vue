<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="400"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-16">
            <v-img
                src="/images/challenge/dialog/get_gift.png"
                alt="gift"
                width="160"
                height="160"
                class="mx-auto mb-6"
            />

            <div class="text-t-xl font-weight-bold mb-1 text-center">
                {{ gift }} 획득!
            </div>

            <div class="text-t-md font-weight-medium mb-6 text-center text-text-quaternary">
                획득한 경품은 <br />
                전체 보기 > 스토어 > 나의 서랍에서 확인하세요.
            </div>

            <div class="d-flex flex-column justify-center ga-1-5">
                <v-btn
                    @click="buttonDownload.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    확인하기
                </v-btn>

                <v-btn
                    @click="buttonCancel.event.onClick"
                    variant="outlined"
                    class="flex-1-1-100"
                    size="large"
                >
                    닫기
                </v-btn>

            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const props = defineProps<{
    gift: string;
}>();

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