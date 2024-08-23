<template>
    <div class="position-relative d-flex flex-column ga-5">
        <CommunityFeedItem
            v-for="(feedItem, key) in feedList"
            :key="key"
            :feedItem="feedItem"
        />

        <div class="position-fixed bottom-4 right-4">
            <v-btn
                size="x-large"
                class="primary"
                icon="mdi-plus"
                @click="state.ui.dialog = true"
            />

            <CommunityCreateFeed 
                v-model:dialog="state.ui.dialog"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { IFeedItem } from '@/interfaces';

const props = defineProps<{
    feedList: IFeedItem[];
}>();

const state = reactive({
    ui: {
        dialog: false,
    },
});

</script>