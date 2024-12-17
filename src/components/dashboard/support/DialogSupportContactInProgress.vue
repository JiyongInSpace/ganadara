<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        fullscreen
    >
        <v-card class="background-secondary pb-5">
            <div class="text-t-lg font-weight-bold text-center py-3-5 position-relative background-primary">
                <span>
                    1:1 문의
                </span>

                <v-icon
                    icon="mdi-close"
                    size="small"
                    class="position-absolute top-4 left-4 cursor-pointer"
                    @click="buttonCancel.event.onClick"
                />
            </div>

            <div class="background-primary pa-5 mb-2">
                <div class="mb-3">
                    <v-chip
                        v-if="state.status === 'submit'"
                        class="xxs orange"
                        variant="outlined"
                    >
                        접수
                    </v-chip>

                    <v-chip
                        v-if="state.status === 'in_progress'"
                        class="xxs info"
                        variant="outlined"
                    >
                        진행중
                    </v-chip>

                    <v-chip
                        v-if="state.status === 'done'"
                        class="xxs success"
                        variant="outlined"
                    >
                        완료
                    </v-chip>
                </div>

                <div class="text-t-xs font-weight-medium">
                    답변까지 최대 48시간(영업일 기준)이 소요될 수 있습니다. <br />
                    최대한 빠른 답변드리도록 하겠습니다.
                </div>
            </div>

            <div
                v-for="(contact, key) in state.contactContents"
                :key="key"
                class="background-primary pa-5 mb-2"
            >
                <div
                    class="text-t-lg font-weight-bold mb-3"
                    :class="contact.type === 'question' ? 'text-text-primary' : 'text-text-brand-tertiary'"
                >
                    {{ contact.type === 'question' ? '문의' : '답변' }}
                </div>

                <div class="text-t-sm font-weight-medium text-text-quaternary mb-3">
                    {{ contact.created_at }}
                </div>

                <div class="font-weight-medium mb-3">
                    {{ contact.content }}
                </div>

                <div
                    v-if="contact.files && contact.files.length > 0"
                    class="d-flex ga-1-5"
                >
                    <div
                        v-for="(file, key) in contact.files"
                        :key="key"
                        class="text-t-xs font-weight-medium truncate mb-2 border w-fit px-2 rounded-6 py-0-5"
                    >
                        {{ file }}
                    </div>
                </div>
            </div>

            <div class="background-primary pa-5 mb-2">
                <div class="text-t-lg font-weight-bold mb-3">
                    추가문의
                </div>

                <v-textarea
                    v-model="textareaMessage.value.value"
                    variant="outlined"
                    class="flex-grow-0 mb-3"
                    placeholder="궁금하신 점을 문의해 주세요."
                    rows="6"
                    hide-details
                />

                <div class="d-flex justify-center ga-3 mb-5">
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

                    <div class="d-none">
                        <input
                            type="file"
                            ref="fileInput"
                            multiple
                            accept="image/*"
                            @change="fileInputCapture.event.onChange"
                        />
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>
<!-- buttonCancel.event.onClick / -->
<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const router = useRouter();
const { name } = storeToRefs(userStore);
const dialog = defineModel("dialog");
const snackbar = useSnackbarStore();

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickContactUs'): void
}>();

const state = reactive({
    status: "submit",
    contactContents: [
        {
            id: 1,
            type: "question",
            title: "문의 내용",
            content: "문의 내용이 들어갑니다.",
            created_at: "2024-11-25T14:30:15.123Z",
            files: [
                "img1212.png",
                "img1212.png"
            ]
        },
        {
            id: 2,
            type: "answer",
            title: "답변",
            content: "답변이 들어갑니다.",
            created_at: "2024-11-25T14:30:15.123Z"
        },
        {
            id: 3,
            type: "question",
            title: "문의 내용",
            content: "문의 내용이 들어갑니다.",
            created_at: "2024-11-25T14:30:15.123Z"
        },
        {
            id: 4,
            type: "answer",
            title: "답변",
            content: "답변이 들어갑니다.",
            created_at: "2024-11-25T14:30:15.123Z"
        }
    ]
})

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