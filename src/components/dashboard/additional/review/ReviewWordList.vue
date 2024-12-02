<template>
    <div class="d-flex flex-column ga-2">
        <v-expansion-panels class="pt-5 mt-5">
            <v-expansion-panel
                v-for="wordItem in words"
                :key="wordItem.id"
                hide-actions
            >
                <template v-slot:title>
                    <v-card class="d-flex align-center ga-2 px-4 py-2-5 elevation-0 rounded-8 w-100">
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
                                variant="outlined"
                                size="small"
                                class="border-border-secondary"
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
                            />
                        </div>
                    </v-card>
                </template>
            </v-expansion-panel>
        </v-expansion-panels>


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

</script>


<style lang="sass" scoped>

</style>