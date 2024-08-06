<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card class="pt-9 px-5 pb-5 rounded-t-16">
            <div class="text-t-xl font-weight-bold text-center mb-3">
                {{ info.title }}
            </div>

            <div class="text-t-md font-weight-medium text-text-secondary mb-2">
                {{ info.subtitle }}
            </div>

            <div class="ga-1-5 flex-shrink-0 text-text-tertiary">
                {{ info.description }}
            </div>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const props = defineProps<{
    info: {
        title: string;
        subtitle: string;
        description: string;
    }
}>();
</script>

<style lang="scss" scoped></style>