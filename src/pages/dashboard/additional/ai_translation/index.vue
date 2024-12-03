<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container
        class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto background-secondary"
    >
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                AI 번역
            </span>
        </div>

        <div class="d-flex justify-center align-center ga-5 py-5 px-4">
            <div class="d-flex justify-end flex-1-1-100">
                <DialogSelectLanguage v-model:language="state.language.input" />
            </div>

            <v-btn
                variant="outlined"
                class="secondary rounded-xl px-6"
                icon="mdi-swap-horizontal"
                size="small"
                @click="onClickChangeLanguage"
            />

            <div class="d-flex justify-start flex-1-1-100">
                <DialogSelectLanguage v-model:language="state.language.output" />
            </div>
        </div>

        <div :style="{
            height: 'calc(100vh - 132px)',
        }">
            <v-sheet
                class="d-flex background-primary overflow-y-auto ga-2 py-3 px-5"
                height="50%"
            >
                <div class="flex-grow-1">
                    <!-- 번역 내용 -->
                    <div class="h-100 overflow-y-auto d-flex flex-column">
                        <span v-if="state.inputMethod == 'voice'">
                            {{ state.translationInput }}

                            <IconRecording
                                v-if="state.inputMethod == 'voice'"
                                :size="24"
                                :isActive="state.isRecording"
                            />
                        </span>

                        <v-textarea
                            v-if="state.inputMethod == 'text'"
                            v-model="state.translationInput"
                            class="pa-0 flex-grow-1"
                            rows="20"
                            hide-details
                            no-resize
                            variant="solo"
                            density="compact"
                            flat
                        />
                    </div>

                </div>

                <div>
                    <v-btn
                        :variant="state.inputMethod == 'voice' ? 'tonal' : 'outlined'"
                        class="rounded-xl px-0"
                        :class="state.inputMethod == 'voice' ? 'primary' : 'secondary'"
                        size="x-small"
                        width="36"
                        height="36"
                        @click="onClickMicrophone"
                    >
                        <v-icon
                            icon="mdi-microphone-outline"
                            size="20"
                        ></v-icon>
                    </v-btn>
                </div>
            </v-sheet>

            <v-sheet
                class="flex-1-1-100 overflow-y-auto py-3 px-5 background-secondary"
                height="50%"
            >
                <!-- 번역 결과 -->
                {{ state.translationOutput }}
            </v-sheet>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
const state = reactive({
    language: {
        input: 'ko',
        output: 'en',
    },
    inputMethod: 'text',
    isRecording: false,

    translationInput: '',
    translationOutput: '',
});

const onClickMicrophone = () => {
    if (state.inputMethod == 'voice') {
        state.inputMethod = 'text';
        return;
    }
    state.inputMethod = 'voice';
};

const onClickChangeLanguage = () => {
    const temp = state.language.input;
    state.language.input = state.language.output;
    state.language.output = temp;
};


watch(
    [
        () => state.language.input,
        () => state.language.output,
    ],
    ([inputLang, outputLang], [oldInputLang, oldOutputLang]) => {
        if (inputLang == outputLang) {
            if (inputLang == oldInputLang) {
                state.language.input = oldOutputLang;
            } else {
                state.language.output = oldInputLang;
            }
        }
    }
);

watch(
    [
        () => state.language.input,
        () => state.language.output,
        () => state.translationInput
    ],
    () => {
        // 번역 요청
        state.translationOutput = state.translationInput;
    }
)

</script>


<style lang="scss" scoped>
:deep(.v-input) {
    .v-field__input {
        height: 100%;
        padding: 0px !important;
        border: none;
        background: none;
    }

    .v-field__overlay {
        background: none !important;
        border-bottom: none !important;
    }
}
</style>