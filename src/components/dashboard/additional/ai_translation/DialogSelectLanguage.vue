<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                variant="text"
                class="pa-0"
                size="small"
                v-bind="activatorProps"
            >
                {{ selectedLanguageText }}

                <v-icon icon="mdi-chevron-down"></v-icon>
            </v-btn>
        </template>

        <v-card class="pt-9 px-5 pb-5 text-center rounded-t-16">
            <div class="text-t-lg font-weight-bold mb-6">
                언어 선택
            </div>

            <div>
                <v-btn
                    v-for="option in language_options"
                    class="text-start-button w-100 px-0 mb-1-5"
                    variant="text"
                    size="large"
                    @click="() => onClickLanguage(option.key)"
                >
                    <div class="d-flex justify-space-between flex-grow-1">
                        <span :class="option.key == language ? 'text-text-brand-tertiary' : ''">
                            {{ option.text }}
                        </span>

                        <v-icon
                            v-if="option.key == language"
                            icon="mdi-check"
                            class="text-text-brand-tertiary"
                        />
                    </div>
                </v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
    (e: 'onSelectLevel', key: string): void,
}>();
const dialog = defineModel("dialog");
const language = defineModel("language");

const language_options = [
    {
        key: 'ko',
        text: '한국어',
    },
    {
        key: 'en',
        text: '영어',
    },
    {
        key: 'sp',
        text: '스페인어',
    },
    {
        key: 'vi',
        text: '베트남어',
    },
]

const onClickLanguage = (_key: string) => {
    dialog.value = false;
    language.value = _key;
}

const selectedLanguageText = computed(() => {
    return language_options.find((option) => option.key === language.value)?.text;
})

</script>

<style lang="scss" scoped></style>