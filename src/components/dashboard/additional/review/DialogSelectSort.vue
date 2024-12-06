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
                {{ state.selectedSort == 'saveDate' ? '저장 날짜순' : '학습 날짜순' }}

                <v-icon icon="mdi-chevron-down"></v-icon>
            </v-btn>
        </template>

        <v-card class="pt-9 px-5 pb-5 text-center rounded-t-16">
            <div class="text-t-lg font-weight-bold mb-6">
                정렬 선택
            </div>

            <div>
                <v-btn
                    v-for="option in sort_options"
                    class="text-start-button w-100 px-0 mb-1-5"
                    variant="text"
                    size="large"
                    @click="() => onClickSort(option.key)"
                >
                    <div class="d-flex justify-space-between flex-grow-1">
                        <span :class="option.key == state.selectedSort ? 'text-text-brand-tertiary' : ''">
                            {{ option.text }}
                        </span>

                        <v-icon
                            v-if="option.key == state.selectedSort"
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
    (e: 'onSelectSort', key: string): void,
}>();
const dialog = defineModel("dialog");

const state = reactive({
    selectedSort: 'saveDate',
})

const sort_options = [
    {
        key: 'saveDate',
        text: '저장 날짜순',
    },
    {
        key: 'learnDate',
        text: '학습 날짜순',
    }
]

const onClickSort = (_key: string) => {
    dialog.value = false;
    state.selectedSort = _key;
    emit('onSelectSort', _key);
}
</script>

<style lang="scss" scoped></style>