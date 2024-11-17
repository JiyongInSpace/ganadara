<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-t-16">
            <div class="text-t-xl font-weight-bold mb-1 text-center">
                구독하고 콘텐츠 계속 보기
            </div>

            <div class="text-t-md font-weight-medium text-text-quaternary mb-6 text-center mb-6">
                미션 참여하고 포인트를 받으세요!
            </div>

            <v-checkbox
                v-model="state.policy"
                value="marketing"
                hide-details
                class="border rounded-12 pa-4 mb-1"
                color="primary"
            >
                <template v-slot:label>
                    <div class="text-t-sm font-weight-medium">
                        개인정보 수집 및 이용 동의
                    </div>
                </template>
            </v-checkbox>

            <div class="d-flex justify-center mb-7">
                <v-btn
                    variant="text"
                    @click="onClickPolicy"
                >자세히 보기</v-btn>
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    @click="buttonCancel.event.onClick"
                    variant="outlined"
                    class="flex-1-1-100"
                    size="large"
                >
                    나중에 하기
                </v-btn>

                <v-btn
                    @click="buttonDownload.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    :disabled="!state.policy"
                >
                    동의하기
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

const state = reactive({
    policy: false,
})


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

const onClickPolicy = () => {
    alert("자세히 보기")
}

</script>

<style lang="scss" scoped></style>