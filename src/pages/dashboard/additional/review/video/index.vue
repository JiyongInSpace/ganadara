<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container
        class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto background-secondary"
    >
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                학습한 영상
            </span>
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto px-4 py-5">
            <ReviewVideoList :videos="state.videos" />
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { IVideoItem } from '@/components/dashboard/additional/review/ReviewVideoList.vue';
import { useUserStore } from '@/stores/user';
import { format } from 'date-fns';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { subscription } = storeToRefs(userStore);
const router = useRouter();

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
            status: "not-started",
        },
    ] as IVideoItem[],
});

</script>


<style lang="scss" scoped></style>