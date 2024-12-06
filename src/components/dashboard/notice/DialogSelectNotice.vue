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
                    @click="() => onClickCategory(option.key)"
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
const category = defineModel("category");

const state = reactive({
    selectedLevel: 'all',
})

const sort_options = [
    {
        key: 'all',
        text: '전체',
    },
    {
        key: 'notice',
        text: '공지사항',
    },
    {
        key: 'community',
        text: '커뮤니티',
    },
    {
        key: 'challenge',
        text: '챌린지',
    },
    {
        key: 'class',
        text: '클래스',
    },
    {
        key: 'ai',
        text: 'AI',
    },
    {
        key: 'etc',
        text: '기타',
    },
]

const onClickCategory = (_key: string) => {
    dialog.value = false;
    category.value = _key;
    state.selectedLevel = _key;
    emit('onSelectLevel', _key);
}

const selectedLevelText = computed(() => {
    return sort_options.find((option) => option.key === state.selectedLevel)?.text;
})

</script>

<style lang="scss" scoped></style>