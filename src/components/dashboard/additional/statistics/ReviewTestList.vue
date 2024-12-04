<template>
    <div class="d-flex flex-column ga-2">
        <v-expansion-panels v-model="state.expanded">
            <v-expansion-panel
                v-for="sentenceItem in list"
                :key="sentenceItem.id"
                hide-actions
                class="rounded-8 overflow-hidden"
            >
                <template v-slot:title>
                    <v-card class="d-flex flex-column ga-2 py-2-5 pb-5 elevation-0 w-100">
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
                                <v-icon
                                    icon="mdi-chevron-down"
                                    variant="text"
                                    size="large"
                                    width="24"
                                    height="24"
                                    min-height="unset"
                                    class="flex-shrink-0 transition"
                                    :class="{ 'rotate-180': state.expanded === sentenceItem.id }"
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
                    <div>
                        <span class="text-t-sm text-text-quaternary text-break">
                            {{ sentenceItem.explanation }}
                        </span>
                    </div>
                </template>
            </v-expansion-panel>
        </v-expansion-panels>

        <DialogReviewAction v-model:dialog="state.action" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    list: {
        id: number;
        word: string;
        meaning: string;
        content: string;
        explanation: string;
    }[];
}>();

const state = reactive({
    expanded: null as number | null,
    action: false,
})

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
            border-bottom: 1px solid #F2F4F7;
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

.rotate-180 {
    transform: rotate(180deg);
}
</style>