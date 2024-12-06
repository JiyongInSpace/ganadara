<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        fullscreen
    >
        <v-card>
            <!-- TITLE -->
            <v-toolbar
                class="bg-transparent position-relative"
                height="56"
            >
                <v-btn
                    icon="mdi-chevron-left"
                    size="small"
                    @click="dialog = false"
                />

                <div class="text-t-lg font-weight-bold position-center">
                    직접 추가
                </div>
            </v-toolbar>

            <v-container class="overflow-y-auto mb-22">
                <div class="d-flex justify-space-between align-center">
                    <!-- 숨겨진 파일 입력 필드 -->
                    <v-file-input
                        ref="fileInput"
                        type="file"
                        accept="image/*"
                        class="d-none"
                        v-model="files"
                        @change="handleFileChange"
                        multiple
                    />

                    <v-btn
                        variant="outlined"
                        @click="triggerFileInput"
                    >
                        <template v-slot:prepend>
                            <v-img
                                src="/icons/IconImagePlus.svg"
                                width="20"
                                height="20"
                            />
                        </template>

                        <span class="text-t-sm font-weight-semibold">
                            이미지 추가
                        </span>
                    </v-btn>

                    <span class="text-t-xs text-text-tertiary">
                        최대 3장 추가 가능
                    </span>
                </div>

                <v-row
                    v-if="files.length > 0"
                    class="d-flex"
                >
                    <v-col
                        v-for="(file, index) in fileDisplays"
                        :key="index"
                        cols="4"
                        class="mt-4 position-relative"
                    >
                        <div>
                            <v-img
                                :src="file.src"
                                :alt="'Selected Image ' + index"
                                width="100"
                                height="100"
                            />

                            <v-btn
                                icon="mdi-close"
                                @click="removeImage(index)"
                                class="position-absolute top-1 right-1"
                                variant="text"
                                size="x-small"
                                width="24"
                                height="24"
                            />
                        </div>
                    </v-col>
                </v-row>

                <v-card
                    variant="outlined"
                    class="border-border-primary border-solid rounded-8 mt-8"
                >
                    <v-textarea
                        v-model="state.textarea.value"
                        variant="solo"
                        placeholder="텍스트를 입력해 주세요."
                        flat
                        auto-grow
                        hide-details
                    />

                    <div class="d-flex justify-space-between align-end pa-3">
                        <span class="text-t-xs text-text-placeholder">
                            {{ state.textarea.value.length }}/1000
                        </span>

                        <v-btn variant="outlined">
                            <template v-slot:prepend>
                                <v-img
                                    src="/images/community/AI.svg"
                                    width="20"
                                    height="20"
                                />
                            </template>

                            <span class="text-t-sm font-weight-semibold text-fg-disabled">
                                맞춤법 교정
                            </span>
                        </v-btn>
                    </div>
                </v-card>


                <div class="pb-5 px-4 flex-grow-0 position-fixed bottom-0 right-0 left-0 shadow">
                    <v-btn
                        block
                        variant="tonal"
                        size="x-large"
                        class="primary"
                        @click="onClickNext"
                        :disabled="!state.textarea.value"
                    >
                        등록하기
                    </v-btn>
                </div>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar';

const snackbar = useSnackbarStore();

const fileInput = ref();
const files = ref<any>([]);  // 파일들을 저장할 ref
const fileDisplays = ref<any>([]);  // Display previews

onMounted(() => {
    fileInput.value;
})

const dialog = defineModel("dialog");

const state = reactive({
    textarea: {
        value: "",
        max: 1000,
    },
});


// 파일 입력 필드를 활성화하는 함수
function triggerFileInput() {
    if (fileInput.value) {
        fileInput.value.click();
    }
}

// 파일이 선택되었을 때 실행되는 함수
function handleFileChange(event: any) {
    // console.log(event.target.files);  // 선택된 파일들을 콘솔에 출력
}

// 이미지 제거 함수
function removeImage(index: number) {
    fileDisplays.value.splice(index, 1);
}

watch(files, (newFiles) => {
    fileDisplays.value = []; // Reset previews when files change
    Array.from(newFiles).forEach((file: any) => {
        if (fileDisplays.value.length < 3) { // 최대 3장
            const reader = new FileReader();
            reader.onload = (e) => {
                fileDisplays.value.push({ src: e.target?.result });
            };
            reader.readAsDataURL(file);
        }
    });
});

// ================================

const onClickNext = () => {
    // console.log(state.textarea.value);
    // console.log(files.value);

    dialog.value = false;
    state.textarea.value = "";
    snackbar.showSnackbar("피드를 등록했습니다.");
}

</script>

<style lang="scss" scoped></style>
