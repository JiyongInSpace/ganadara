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
                {{ selectedLevelText }}

                <v-icon icon="mdi-chevron-down"></v-icon>
            </v-btn>
        </template>

        <v-card class="pt-9 px-5 pb-5 text-center rounded-t-16">
            <div class="text-t-lg font-weight-bold mb-6">
                레벨 선택
            </div>

            <div>
                <v-btn
                    v-for="option in sort_options"
                    class="text-start-button w-100 px-0 mb-1-5"
                    variant="text"
                    size="large"
                    @click="() => onClickLevel(option.key)"
                >
                    <div class="d-flex justify-space-between flex-grow-1">
                        <span :class="option.key == state.selectedLevel ? 'text-text-brand-tertiary' : ''">
                            {{ option.text }}
                        </span>

                        <v-icon
                            v-if="option.key == state.selectedLevel"
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

const state = reactive({
    selectedLevel: '0',
})

const sort_options = [
    {
        key: '0',
        text: '모든 레벨',
    },
    {
        key: '1',
        text: 'LV.1',
    },
    {
        key: '2',
        text: 'LV.2',
    },
    {
        key: '3',
        text: 'LV.3',
    },
    {
        key: '4',
        text: 'LV.4',
    },
    {
        key: '5',
        text: 'LV.5',
    },
    {
        key: '6',
        text: 'LV.6',
    },
    {
        key: '7',
        text: 'LV.7',
    },
]

const onClickLevel = (_key: string) => {
    dialog.value = false;
    state.selectedLevel = _key;
    emit('onSelectLevel', _key);
}

const selectedLevelText = computed(() => {
    return sort_options.find((option) => option.key === state.selectedLevel)?.text;
})

</script>

<style lang="scss" scoped></style>