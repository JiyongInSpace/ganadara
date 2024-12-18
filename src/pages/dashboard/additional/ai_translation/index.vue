<template>
    <PageTemplate
        space="pa-0"
        header-background="secondary"
        background="secondary"
        back-button
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                AI 번역
            </span>
        </template>

        <template v-slot:content>
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
                height: `calc(var(--vh, 1vh) * 100 - 132px)`,
            }">
                <div
                    class="position-relative d-flex background-primary overflow-y-auto ga-2 py-3 px-5 w-100"
                    :style="{ height: '50%' }"
                >
                    <div
                        v-if="!state.translationInput"
                        class="position-absolute d-flex justify-center align-center top-0 bottom-0 right-0 left-0 z-1 pointer-event-none"
                    >
                        <span class="text-text-placeholder">
                            번역할 내용을 입력하세요.
                        </span>
                    </div>

                    <div class="flex-grow-1">
                        <!-- 번역 내용 -->
                        <div class="h-100 overflow-y-auto d-flex flex-column">
                            <span v-if="state.inputMethod == 'voice'">
                                {{ state.translationInput }}

                                <IconRecording
                                    v-if="state.translationInput"
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
                </div>

                <v-sheet
                    class="d-flex flex-1-1-100 overflow-y-auto py-3 px-5 background-secondary"
                    height="50%"
                >
                    <!-- 번역 결과 -->
                    <div class="flex-grow-1">
                        {{ state.translationOutput }}

                        <IconRecording
                            v-if="state.translationOutput"
                            :size="24"
                            :isActive="state.isRecording"
                        />
                    </div>

                    <div>
                        <v-btn
                            :variant="state.outputMethod == 'voice' ? 'tonal' : 'outlined'"
                            class="rounded-xl px-0"
                            :class="state.outputMethod == 'voice' ? 'primary' : 'secondary'"
                            size="x-small"
                            width="36"
                            height="36"
                            @click="onClickMicrophone2"
                        >
                            <v-icon
                                icon="mdi-microphone-outline"
                                size="20"
                            ></v-icon>
                        </v-btn>
                    </div>
                </v-sheet>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
const state = reactive({
    language: {
        input: 'ko',
        output: 'en',
    },
    inputMethod: 'text',
    outputMethod: 'text',
    isRecording: false,
    isRecording2: false,

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

const onClickMicrophone2 = () => {
    if (state.outputMethod == 'voice') {
        state.outputMethod = 'text';
        return;
    }
    state.outputMethod = 'voice';
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