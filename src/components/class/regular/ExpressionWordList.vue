<template>
    <div class="d-flex flex-column ga-2">
        <v-card
            class="d-flex align-center ga-2 px-4 py-2-5"
            v-for="count in 5"
            :key="count"
        >
            <v-btn
                icon="mdi-headphones"
                class="squared"
            />

            <div class="truncate">
                <div class="text-t-md font-weight-bold truncate">
                    Hi, Where are you going?
                </div>

                <div class="text-t-sm text-text-quaternary truncate">
                    안녕, 지금 어디 가고 있어?
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

</script>
