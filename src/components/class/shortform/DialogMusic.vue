<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card class="pt-9 px-5 pb-5 rounded-t-16">
            <div class="text-t-xl font-weight-bold text-center mb-3">
                음원 출처
            </div>

            <div class="text-t-md font-weight-medium text-text-secondary mb-3">
                오리지널 사운드
            </div>

            <div class="d-flex flex-column ga-3">
                <div v-for="(item, index) in props.list">
                    <div
                        class="d-flex"
                        :key="index"
                    >
                        <div class="text-t-md font-weight-medium">
                            {{ item.title }}
                        </div>

                        •

                        <div class="text-t-md font-weight-medium">
                            {{ item.artist }}
                        </div>
                    </div>

                    <div class="text-t-xs text-text-quaternary">
                        {{ item.source }}
                    </div>
                </div>
                <div></div>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const props = defineProps<{
    list: {
        title: string;
        artist: string;
        source: string;
    }[]
}>();
</script>

<style lang="scss" scoped></style>