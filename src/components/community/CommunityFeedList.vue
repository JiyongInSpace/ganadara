<template>
    <div class="position-relative d-flex flex-column ga-5 flex-grow-1 overflow-y-auto">
        <CommunityFeedItem
            v-for="(feedItem, key) in feedList"
            :key="key"
            :feedItem="feedItem"
            :myCommentHighlight="myCommentHighlight"
        />

        <div
            class="position-fixed right-4"
            :style="{
                bottom: '96px',
            }"
        >
            <v-btn
                size="x-large"
                variant="tonal"
                class="primary rounded-circle"
                icon="mdi-plus"
                @click="state.ui.dialog = true"
            />

            <CommunityCreateFeed v-model:dialog="state.ui.dialog" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { IFeedItem } from '@/interfaces';

const props = withDefaults(defineProps<{
    feedList: IFeedItem[];
    myCommentHighlight: boolean;
}>(), {
    feedList: () => [],
    myCommentHighlight: false,
});

const state = reactive({
    ui: {
        dialog: false,
    },
});

</script>