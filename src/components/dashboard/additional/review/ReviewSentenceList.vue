<template>
    <div class="d-flex flex-column ga-2">
        <v-expansion-panels
            v-model="state.expanded"
            disabled
        >
            <v-expansion-panel
                v-for="sentenceItem in sentences"
                :key="sentenceItem.id"
                hide-actions
                class="rounded-8 overflow-hidden"
            >
                <template v-slot:title>
                    <v-card class="d-flex flex-column ga-2 py-2-5 elevation-0 w-100">
                        <div class="d-flex align-center w-100">
                            <v-btn
                                icon="mdi-headphones"
                                class="squared border-border-primary"
                                variant="outlined"
                            >
                                <v-img
                                    src="/icons/IconListen.png"
                                    alt="listen"
                                    width="13"
                                    height="13"
                                    class="flex-grow-0"
                                />
                            </v-btn>


                            <div class="d-flex align-center ml-auto ga-1-5">
                                <v-btn
                                    :variant="state.expanded == sentenceItem.id && state.selectedCategory == 'explanation' ? 'tonal' : 'outlined'"
                                    size="small"
                                    class="border-border-secondary"
                                    :class="{ 'primary': state.expanded == sentenceItem.id && state.selectedCategory == 'explanation' }"
                                    @click="togglePanel(sentenceItem.id, 'explanation')"
                                >
                                    해설
                                </v-btn>

                                <v-btn
                                    :variant="state.expanded == sentenceItem.id && state.selectedCategory == 'example' ? 'tonal' : 'outlined'"
                                    size="small"
                                    class="border-border-secondary"
                                    :class="{ 'primary': state.expanded == sentenceItem.id && state.selectedCategory == 'example' }"
                                    @click="togglePanel(sentenceItem.id, 'example')"
                                >
                                    예문
                                </v-btn>

                                <!-- variant="text" -->
                                <v-btn
                                    icon="mdi-dots-vertical"
                                    variant="text"
                                    size="large"
                                    width="24"
                                    height="24"
                                    min-height="unset"
                                    class="flex-shrink-0"
                                    @click="state.action = !state.action"
                                />
                            </div>
                        </div>

                        <div>
                            <div class="text-t-md font-weight-bold mb-2">
                                {{ sentenceItem.word }}
                            </div>

                            <div class="text-t-sm text-text-quaternary ">
                                {{ sentenceItem.meaning }}
                            </div>
                        </div>
                    </v-card>
                </template>

                <template v-slot:text>
                    <div v-if="state.selectedCategory == 'example'">
                        <div class="text-t-sm font-weight-semibold text-text-quaternary mb-2">
                            예문
                        </div>

                        <div class="font-weight-bold text-break mb-1">
                            {{ sentenceItem.example?.title }}
                        </div>

                        <div class="text-t-sm text-text-quaternary text-break">
                            {{ sentenceItem.example?.content }}
                        </div>
                    </div>

                    <div v-if="state.selectedCategory == 'explanation'">
                        <div class="text-t-sm font-weight-semibold text-text-quaternary mb-2">
                            해설
                        </div>

                        <div class="text-t-sm text-text-quaternary text-break">
                            {{ sentenceItem.explanation }}
                        </div>
                    </div>
                </template>
            </v-expansion-panel>
        </v-expansion-panels>

        <DialogReviewAction v-model:dialog="state.action" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    sentences: {
        id: number;
        word: string;
        meaning: string;
        example?: {
            title: string;
            content: string;
        };
        explanation: string;
    }[];
}>();

const state = reactive({
    expanded: null as number | null,
    action: false,
    selectedCategory: "explanation" as 'explanation' | 'example',
})

const togglePanel = (id: number, category: 'explanation' | 'example') => {
    if (state.expanded === id && state.selectedCategory === category) {
        state.expanded = null;
        return;
    }
    state.expanded = id;
    state.selectedCategory = category;
}

</script>


<style lang="scss" scoped>
:deep(.v-expansion-panels) {
    .v-expansion-panel {
        padding: 0 16px;
        margin-bottom: 10px;

        &:not(:first-child)::after {
            border: none;
        }
    }

    .v-expansion-panel__shadow {
        display: none;
    }

    .v-expansion-panel-title {
        padding: 0px !important;

        &.v-expansion-panel-title--active {
            border-bottom: 1px solid;
        }
    }

    .v-expansion-panel--active:not(:first-child),
    .v-expansion-panel--active+.v-expansion-panel {
        margin-top: 0px !important;
    }

    .v-expansion-panel-text__wrapper {
        padding: 20px 0 !important;
    }
}
</style>