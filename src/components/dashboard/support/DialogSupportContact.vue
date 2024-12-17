<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        fullscreen
    >
        <v-card class="px-5 pb-5">
            <div class="text-t-lg font-weight-bold text-center py-3-5 mb-5 position-relative">
                <span>
                    1:1 문의
                </span>

                <v-icon
                    icon="mdi-close"
                    size="small"
                    class="position-absolute top-4 left-0 cursor-pointer"
                    @click="buttonCancel.event.onClick"
                />
            </div>

            <div class="text-t-lg font-weight-bold mb-1-5">
                {{ name }}님 무엇을 도와드릴까요?
            </div>

            <v-textarea
                v-model="textareaMessage.value.value"
                variant="outlined"
                class="flex-grow-0 mb-3"
                placeholder="궁금하신 점을 문의해 주세요."
                rows="6"
                hide-details
                maxLength="1000"
            />

            <div class="font-weight-bold text-end mb-1-5">
                <span>
                    {{ textareaMessage.value?.value?.length.toLocaleString() || "0" }}
                </span>
                / 1,000
            </div>

            <div class="mb-6">
                <div class="d-flex flex-wrap ga-1-5">
                    <div
                        v-for="fileItem in fileInputCapture.files.value"
                        class="text-t-xs font-weight-medium truncate mb-2 border w-fit px-2 rounded-6 py-0-5"
                    >
                        <span class="mr-1">
                            {{ fileItem.name }}
                        </span>
    
                        <v-icon
                            icon="mdi-close"
                            size="small"
                            class="cursor-pointer flex-shrink-0"
                            @click="fileInputCapture.files.value.splice(fileInputCapture.files.value.indexOf(fileItem), 1)"
                        ></v-icon>
                    </div>
                </div>

                <div
                    variant="text"
                    class="text-t-sm px-0 cursor-pointer flex-shrink-0 text-decoration-underline text-text-tertiary mb-1-5"
                    @click="buttonFileInput.event.onClick"
                >
                    파일 첨부하기
                </div>

                <div class="text-t-xs font-weight-medium text-text-quaternary">
                    최대 3장까지 5MB jpg, jpeg, png 이미지만 첨부 가능합니다. <br />
                    첨부된 이미지는 최대 30일까지 보관되며 이후 영구 삭제됩니다.
                </div>
            </div>

            <div class="d-none">
                <input
                    type="file"
                    ref="fileInput"
                    multiple
                    accept="image/*"
                    @change="fileInputCapture.event.onChange"
                />
            </div>

            <v-spacer />

            <div class="text-t-xs font-weight-medium text-fg-quaternary mb-9">
                <li>문의해 주신 내역 및 답변은 <span class="text-text-brand-tertiary">전체 보기 > 고객센터 > 1:1문의</span> 메뉴에서 확인할 수 있습니다.
                </li>
                <li>운영팀의 추가 확인 요청 이후 3일 이내 고객님 답변이 없을 경우, 1:1 문의는 종료됩니다. 새로운 1:1문의를 이용해 주시기 바랍니다.</li>
                <li>개인정보(이름, 핸드폰 번호, 계좌번호 등)을 작성하실 경우 소중한 개인정보 보호를 위해 임의 삭제될 수 있습니다.</li>
            </div>

            <div class="d-flex justify-center ga-3">
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
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { name } = storeToRefs(userStore);
const dialog = defineModel("dialog");
const snackbar = useSnackbarStore();

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
    files: ref<any[]>([]),
    event: {
        onChange: (_event: any) => {
            const files = Array.from(_event.target.files); // 선택된 파일 목록
            if (files.length > 3) {
                snackbar.showSnackbar("최대 3장까지만 선택할 수 있습니다.");
            }

            // 최대 3개의 파일만 저장
            console.log(files.slice(0, 3));
            fileInputCapture.files.value = files.slice(0, 3);

            console.log(fileInputCapture.files.value);

            // input의 파일 선택 상태 초기화
            _event.target.value = "";
        }
    }
    // fileInput.value.$refs.input.click();
}

const buttonCancel = {
    event: {
        onClick: () => {
            dialog.value = false;
            emit('onClickCancel');
        }
    }
}

const buttonContactUs = {
    event: {
        onClick: () => {
            dialog.value = false;
            emit('onClickContactUs');

            // API call
            // console.log(textareaMessage.value.value);
            // console.log(fileInputCapture.files.value);

            textareaMessage.value.value = "";
            fileInputCapture.files.value = [];

            snackbar.showSnackbar("문의가 완료되었습니다.");
        }
    }
}


</script>

<style lang="scss" scoped></style>