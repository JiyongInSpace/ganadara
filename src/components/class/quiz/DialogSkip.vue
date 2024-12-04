<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-t-16">
            <div class="text-t-xl font-weight-bold mb-1 text-center">
                문제를 스킵 하시겠습니까?
            </div>

            <div class="mb-6 font-weight-medium text-text-quaternary">
                한 번 스킵할 때마다 경험치가 총 -30씩 차감됩니다.
            </div>

            <div class="d-flex justify-center ga-3 mb-6">
                <v-btn
                    @click="buttonCancel.event.onClick"
                    variant="outlined"
                    class="flex-1-1-100"
                    size="large"
                >
                    돌아가기
                </v-btn>

                <v-btn
                    @click="buttonSkip.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    스킵 하기
                </v-btn>
            </div>

            <div>
                <v-btn
                    variant="text"
                    size="x-small"
                    class="text-t-sm px-0 cursor-pointer flex-shrink-0 text-decoration-underline text-fg-quinary"
                    @click="buttonAllSkip"
                >
                    전체 문제 스킵 하기
                </v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>

    <v-dialog
        v-model="dialogSecond"
        transition="dialog-bottom-transition"
        max-width="400"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-16">
            <div class="text-t-xl font-weight-bold mb-1 text-center">
                전체 문제를 스킵 하시겠습니까?
            </div>

            <div class="mb-6 font-weight-medium text-text-quaternary text-center">
                전체 문제를 스킵 하면 <br/>경험치가 총 -400 차감됩니다.
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
                    @click="buttonSkip.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    스킵 하기
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");
const dialogSecond = ref(false);

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickSkip'): void
}>();

const props = defineProps<{
    // losing: number;
    // totalLosing: number;
}>();

const buttonCancel = {
    event: {
        onClick: () => {
            dialog.value = false;
            // emit('onClickCancel');
        }
    }
}

const buttonSkip = {
    event: {
        onClick: () => {
            emit('onClickSkip');
            dialog.value = false;
        }
    }
}

const buttonAllSkip = () => {
    dialog.value = false;
    dialogSecond.value = true;
}

</script>

<style lang="scss" scoped></style>