<template>
    <div class="d-flex flex-column ga-2">
        <v-card
            class="d-flex align-center ga-2 px-4 py-2-5"
            v-for="wordItem in words"
            :key="wordItem.id"
        >
            <v-btn
                icon="mdi-headphones"
                class="squared"
            />

            <div class="truncate">
                <div class="text-t-md font-weight-bold truncate">
                    {{ wordItem.word }}
                </div>

                <div class="text-t-sm text-text-quaternary truncate">
                    {{ wordItem.meaning }}
                </div>
            </div>

            <v-btn
                icon="mdi-plus"
                class="squared ml-auto"
            />
        </v-card>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    words: {
        id: number;
        word: string;
        meaning: string;
    }[];
}>();

</script>
