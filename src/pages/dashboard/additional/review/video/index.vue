<template>
    <PageTemplate
        back-button
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                학습한 영상
            </span>
        </template>

        <template v-slot:content>
            <ReviewVideoList :videos="state.videos" />
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { IVideoItem } from '@/components/dashboard/additional/review/ReviewVideoList.vue';

const state = reactive({
    videos: [
        {
            id: 0,
            thumbnail: "https://vjs.zencdn.net/v/oceans.png",
            title: "Oceans",
            description: "This is a video about oceans",
            status: "completed",
        },
        {
            id: 1,
            thumbnail: "https://vjs.zencdn.net/v/oceans.png",
            title: "Oceans",
            description: "This is a video about oceans",
            status: "ongoing",
        },
        {
            id: 2,
            thumbnail: "https://vjs.zencdn.net/v/oceans.png",
            title: "Oceans",
            description: "This is a video about oceans",
            status: "not_started",
        },
    ] as IVideoItem[],
});
</script>


<style lang="scss" scoped></style>