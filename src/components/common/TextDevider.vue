<template>
    <v-row
        class="w-100 flex-grow-0"
        no-gutters
        align="center"
    >
        <v-col>
            <v-divider />
        </v-col>

        <v-col
            cols="auto"
            class="mx-4"
        >
            <span v-text="text" />
        </v-col>

        <v-col>
            <v-divider />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
interface Props {
    text: string;
}

const { text } = defineProps<Props>();
</script>
