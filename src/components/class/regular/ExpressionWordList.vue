<template>
    <div class="d-flex flex-column ga-2">
        <v-card
            class="d-flex align-center ga-2 px-4 py-2-5 elevation-0 rounded-8"
            v-for="wordItem in words"
            :key="wordItem.id"
        >
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
                class="squared ml-auto foreground-senary text-white"
                variant="tonal"
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
