<template>
    <div class="d-flex flex-column ga-2">
        <v-card
            class="px-4 py-2-5 elevation-0"
            v-for="sentenceItem in sentences"
            :key="sentenceItem.id"
        >
            <div class="d-flex justify-space-between mb-2">
                <v-btn
                    icon="mdi-headphones"
                    class="squared"
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

                <v-btn
                    icon="mdi-plus"
                    class="squared ml-auto foreground-senary text-white"
                    variant="tonal"
                />
            </div>

            <div class="text-t-md font-weight-bold">
                {{ sentenceItem.sentence }}
            </div>

            <div class="text-t-sm text-text-quaternary">
                {{ sentenceItem.meaning }}
            </div>
        </v-card>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    sentences: {
        id: number;
        sentence: string;
        meaning: string;
    }[];
}>();



</script>
