<template>
    <v-snackbar
        v-model="snackbarStore.isActive"
        :timeout="snackbarStore.timeout"
        vertical
    >
        <div class="text-t-sm font-weight-medium">
            {{ snackbarStore.content }}
        </div>
    </v-snackbar>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar';
const snackbarStore = useSnackbarStore();
</script>

<style scoped>
</style>