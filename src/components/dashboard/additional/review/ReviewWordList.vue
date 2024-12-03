<template>
    <div class="d-flex flex-column ga-2">
        <v-expansion-panels
            v-model="state.expanded"
            disabled
        >
            <v-expansion-panel
                v-for="wordItem in words"
                :key="wordItem.id"
                hide-actions
                class="rounded-8 overflow-hidden"
            >
                <template v-slot:title>
                    <v-card class="d-flex align-center ga-2 py-2-5 elevation-0 w-100">
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

                        <div class="truncate">
                            <div class="text-t-md font-weight-bold truncate">
                                {{ wordItem.word }}
                            </div>

                            <div class="text-t-sm text-text-quaternary truncate">
                                {{ wordItem.meaning }}
                            </div>
                        </div>

                        <div class="d-flex align-center ml-auto ga-1-5">
                            <v-btn
                                :variant="state.expanded == wordItem.id ? 'tonal' : 'outlined'"
                                size="small"
                                class="border-border-secondary"
                                :class="{ 'primary': state.expanded === wordItem.id }"
                                @click="togglePanel(wordItem.id)"
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
                    </v-card>
                </template>

                <template v-slot:text>
                    <div>
                        <div class="text-t-sm font-weight-semibold text-text-quaternary mb-2">
                            예문
                        </div>

                        <div class="font-weight-bold text-break mb-1">
                            {{ wordItem.example?.title }}
                        </div>

                        <div class="text-t-sm text-text-quaternary text-break">
                            {{ wordItem.example?.content }}
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
    words: {
        id: number;
        word: string;
        meaning: string;
        example?: {
            title: string;
            content: string;
        }
    }[];
}>();

const state = reactive({
    expanded: null as number | null,
    action: false,
})

const togglePanel = (id: number) => {
    state.expanded = state.expanded === id ? null : id;
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

    .v-expansion-panel--active:not(:first-child), .v-expansion-panel--active + .v-expansion-panel {
        margin-top: 0px !important;
    }

    .v-expansion-panel-text__wrapper {
        padding: 20px 0 !important;
    }
}
</style>