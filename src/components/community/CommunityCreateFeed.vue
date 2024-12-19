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
                    등록
                </div>
            </v-toolbar>

            <v-container class="overflow-y-auto mb-22">

                <div
                    v-if="props.defaultValue"
                    class="d-flex align-center justify-start mb-5"
                >
                    <v-img
                        :src="props.defaultValue?.user.profileImage"
                        width="32"
                        height="32"
                        class="mr-2-5 flex-grow-0"
                    />

                    <span class="text-t-sm font-weight-semibold">
                        {{ props.defaultValue?.user.name }}
                    </span>
                </div>

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
                        class="secondary"
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
                    v-if="fileDisplays.length > 0"
                    class="d-flex pa-0"
                    no-gutters
                    :style="{
                        margin: '-2.5px'
                    }"
                >
                    <v-col
                        v-for="(file, index) in fileDisplays"
                        :key="index"
                        cols="4"
                        class="mt-4 position-relative"
                        :style="{
                            padding: '2.5px'
                        }"
                    >
                        <div :style="{
                            aspectRatio: '1 / 1',
                        }">
                            <v-img
                                :src="file.src"
                                :alt="'Selected Image ' + index"
                                width="100%"
                                height="100%"
                            />

                            <v-btn
                                icon
                                @click="removeImage(index)"
                                class="position-absolute top-2 right-2"
                                variant="text"
                                size="x-small"
                                width="24"
                                height="24"
                                :style="{
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                }"
                            >
                                <v-icon
                                    icon="mdi-close"
                                    size="18"
                                    color="white"
                                ></v-icon>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>

                <v-card
                    variant="outlined"
                    class="border-border-primary border-solid rounded-8 mt-8"
                >
                    <div class="position-relative">
                        <v-textarea
                            v-model="state.textarea.value"
                            variant="solo"
                            placeholder="텍스트를 입력해 주세요."
                            flat
                            auto-grow
                            hide-details
                            maxLength="1000"
                            :class="{ 'opacity-0': state.isAi }"
                        />

                        <div
                            v-if="state.isAi"
                            class="position-absolute top-0 left-0 px-3 py-2 w-100 h-100"
                            v-html="computedAiText"
                        >
                        </div>
                    </div>


                    <div class="d-flex justify-space-between align-end pa-3">
                        <span class="text-t-xs text-text-placeholder">
                            {{ state.textarea.value.length }}/1000
                        </span>

                        <v-btn
                            icon
                            size="32"
                            variant="tonal"
                            class="secondary rounded-circle text-text-quaternary"
                        >
                            <v-img
                                v-if="!state.isAi"
                                src="/images/community/Ai_inactive.svg"
                                width="32"
                                height="32"
                                class="flex-grow-1 flex-shrink-0"
                                @click="state.isAi = true"
                            />
                            <v-img
                                v-else
                                src="/images/community/AI.svg"
                                width="32"
                                height="32"
                                class="flex-grow-1 flex-shrink-0"
                                @click="state.isAi = false"
                            />
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
                        {{ props.defaultValue ? '수정하기' : '등록하기' }}
                    </v-btn>
                </div>
            </v-container>
        </v-card>
    </v-dialog>

    <DialogAccessGallery
        v-model:dialog="state.dialogAccess"
        @onClickAccess="state.accessGallery = true"
    />
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar';
import DialogAccessGallery from './DialogAccessGallery.vue';
import { IFeedItem } from '@/interfaces';

const props = withDefaults(defineProps<{
    defaultValue?: IFeedItem | null;
}>(), {
    defaultValue: null
});


const snackbar = useSnackbarStore();

const fileInput = ref();
const files = ref<any>([]); // 파일들을 저장할 ref
const fileDisplays = ref<any>([]); // Display previews

const MAX_IMAGES = 3; // 최대 이미지 수

onMounted(() => {
    fileInput.value;

    if (props.defaultValue) {
        state.textarea.value = props.defaultValue.content.text;
        fileDisplays.value = props.defaultValue.content.images.map((src) => ({ src }));
    }
});

const dialog = defineModel("dialog");

const state = reactive({
    textarea: {
        value: "",
        max: 1000,
    },
    isAi: false,
    accessGallery: false,
    dialogAccess: false,
});

// 파일 입력 필드를 활성화하는 함수
function triggerFileInput() {
    if (!state.accessGallery) {
        state.dialogAccess = true;
        return;
    }

    if (fileDisplays.value.length >= MAX_IMAGES) {
        snackbar.showSnackbar(`최대 ${MAX_IMAGES}개의 이미지만 첨부할 수 있습니다.`);
        return;
    }

    if (fileInput.value) {
        fileInput.value.click();
    }
}

// 파일이 선택되었을 때 실행되는 함수
function handleFileChange(event: any) {
    const selectedFiles = Array.from(event.target.files);

    // 추가 가능한 파일 수 확인
    const remainingSlots = MAX_IMAGES - fileDisplays.value.length;
    if (selectedFiles.length > remainingSlots) {
        snackbar.showSnackbar(`최대 ${remainingSlots}개의 이미지만 추가할 수 있습니다.`);
    }

    selectedFiles.slice(0, remainingSlots).forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            fileDisplays.value.push({ src: e.target?.result });
        };
        reader.readAsDataURL(file);
    });

    // 파일 입력 필드 초기화 (같은 파일을 다시 선택할 수 있도록)
    event.target.value = "";
}

// 이미지 제거 함수
function removeImage(index: number) {
    fileDisplays.value.splice(index, 1);
}

// ================================

const onClickNext = () => {
    dialog.value = false;
    state.textarea.value = "";
    snackbar.showSnackbar("피드를 등록했습니다.");
};




// AI 변환 함수 (퍼블리싱 확인용 임시) ============================
function wrapRandomSpan(input: string, wrapClass: string, wrapCount = 1) {
    // 문자열을 배열로 변환
    let chars = input.split('');

    // 래핑 횟수만큼 반복
    for (let i = 0; i < wrapCount; i++) {
        if (chars.length === 0) break;

        // 랜덤 시작 인덱스 선택
        const startIndex = Math.floor(Math.random() * chars.length);

        // 랜덤 끝 인덱스 선택 (최소 1글자 이상)
        const endIndex = Math.min(
            startIndex + Math.floor(Math.random() * (chars.length - startIndex)),
            chars.length - 1
        );

        // 선택한 부분 래핑
        const wrapped = `<span class="${wrapClass}">${chars
            .slice(startIndex, endIndex + 1)
            .join('')}</span>`;

        // 원래 배열에서 해당 부분 교체
        chars.splice(startIndex, endIndex - startIndex + 1, wrapped);
    }

    // 배열을 다시 문자열로 변환하여 반환
    return chars.join('');
}

const computedAiText = computed(() => {
    return wrapRandomSpan(state.textarea.value, "text-warning font-weight-medium", 2)
})

</script>

<style lang="scss" scoped></style>
