<template>
    <div class="d-flex flex-column ga-2">
        <v-card
            class="px-4 py-2-5"
            v-for="count in 5"
            :key="count"
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
                Hi, Where are you going?
            </div>

            <div class="text-t-sm text-text-quaternary">
                안녕, 지금 어디 가고 있어?
            </div>
        </v-card>
    </div>
</template>

<script lang="ts" setup>

</script>
