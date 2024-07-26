<template>
    <div class="d-flex flex-column ga-2">
        <v-card
            class="px-4 py-2-5"
            v-for="sentenceItem in sentences"
            :key="sentenceItem.id"
        >
            <div class="d-flex justify-space-between mb-2">
                <v-btn
                    icon="mdi-headphones"
                    class="squared"
                />

                <v-btn
                    icon="mdi-plus"
                    class="squared"
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
