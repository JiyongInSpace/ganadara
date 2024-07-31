<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="400"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-16">
            <div class="text-t-xl font-weight-bold mb-1 text-center">
                1:1 문의하기
            </div>

            <div class="mb-6 font-weight-medium text-text-quaternary">
                운영팀에서 도움을 드릴 수 있도록 <br />
                개선할 수 있는 사항을 알려주세요.
            </div>

            <v-textarea
                v-model="textareaMessage.value.value"
                variant="outlined"
                class="tertiary mb-3"
                rows="6"
                hide-details
            />

            <div class="d-flex justify-start mb-6 ga-2">
                <div
                    variant="text"
                    size="x-small"
                    class="text-t-sm px-0 cursor-pointer flex-shrink-0 text-decoration-underline text-fg-quinary"
                    @click="buttonFileInput.event.onClick"
                >
                    파일 첨부하기
                </div>

                <div
                    v-if="fileInputCapture.files.value"
                    class="text-t-xs font-weight-medium truncate"
                >
                    <span class="mr-1">
                        {{ fileInputCapture.files.value?.name }}
                    </span>

                    <v-icon
                        icon="mdi-close"
                        size="small"
                        class="cursor-pointer"
                        @click="fileInputCapture.files.value = null"
                    ></v-icon>
                </div>
            </div>

            <div class="d-none">
                <input
                    type="file"
                    ref="fileInput"
                    @change="fileInputCapture.event.onChange"
                />
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
                    @click="buttonContactUs.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    :disabled="!textareaMessage.value.value"
                >
                    문의하기
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickContactUs'): void
}>();

const fileInput = ref();

onMounted(() => {
    fileInput.value;
})

const textareaMessage = {
    value: ref(),
    event: {
        onChange: (_event: any) => {
            textareaMessage.value.value = _event.target.value;
        }
    }
}

const buttonFileInput = {
    event: {
        onClick: () => {
            fileInput.value.click();
        }
    }
}

const fileInputCapture = {
    files: ref(),
    event: {
        onChange: (_event: any) => {
            fileInputCapture.files.value = _event.target.files[0];
        }
    }
    // fileInput.value.$refs.input.click();
}

const buttonCancel = {
    event: {
        onClick: () => {
            dialog.value = false;
            // emit('onClickCancel');
        }
    }
}

const buttonContactUs = {
    event: {
        onClick: () => {
            emit('onClickContactUs');
            dialog.value = false;

            console.log("TEST");
        }
    }
}


</script>

<style lang="scss" scoped></style>