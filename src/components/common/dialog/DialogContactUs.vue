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

            <slot name="subtitle">
                <div class="mb-6 font-weight-medium text-text-quaternary">
                    운영팀에서 도움을 드릴 수 있도록 <br />
                    개선할 수 있는 사항을 알려주세요.
                </div>
            </slot>

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
                    class="text-t-sm px-0 cursor-pointer flex-shrink-0 text-decoration-underline text-fg-quinary"
                    @click="buttonFileInput.event.onClick"
                >
                    파일 첨부하기
                </div>

                <div
                    v-if="fileInputCapture.files.length > 0"
                    class="text-t-xs font-weight-medium"
                >
                    <div
                        v-for="(file, index) in fileInputCapture.files"
                        :key="index"
                        class="d-flex align-center ga-1 mb-1"
                    >
                        <span class="truncate">
                            {{ file.name }}
                        </span>

                        <v-icon
                            icon="mdi-close"
                            size="small"
                            class="cursor-pointer"
                            @click="removeFile(index)"
                        ></v-icon>
                    </div>
                </div>
            </div>

            <div class="d-none">
                <input
                    type="file"
                    ref="fileInput"
                    multiple
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
import { useSnackbarStore } from '@/stores/snackbar';

const dialog = defineModel("dialog");
const snackbar = useSnackbarStore();

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickContactUs'): void
}>();

const fileInput = ref();

onMounted(() => {
    fileInput.value;
});

const textareaMessage = {
    value: ref(),
    event: {
        onChange: (_event: any) => {
            textareaMessage.value.value = _event.target.value;
        }
    }
};

const buttonFileInput = {
    event: {
        onClick: () => {
            fileInput.value.click();
        }
    }
};

const fileInputCapture = {
    files: reactive<any[]>([]), // 파일들을 배열로 저장
    event: {
        onChange: (_event: any) => {
            const newFiles = Array.from(_event.target.files);
            fileInputCapture.files.push(...newFiles); // 새 파일 추가
        }
    }
};

const removeFile = (index: number) => {
    fileInputCapture.files.splice(index, 1); // 파일 제거
};

const buttonCancel = {
    event: {
        onClick: () => {
            dialog.value = false;
            emit('onClickCancel');
        }
    }
};

const buttonContactUs = {
    event: {
        onClick: () => {
            dialog.value = false;
            emit('onClickContactUs');

            // API call
            console.log("Message:", textareaMessage.value.value);
            console.log("Files:", fileInputCapture.files);

            textareaMessage.value.value = "";
            fileInputCapture.files.length = 0; // 파일 배열 초기화

            snackbar.showSnackbar("문의가 완료되었습니다.");
        }
    }
};
</script>

<style lang="scss" scoped></style>