<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen d-flex flex-column">
        <v-sheet
            class="flex-1-1-100 flex-shrink-0"
            aspect-ratio="16:9"
        >
            <v-img src="/images/class/default_video.png"></v-img>
        </v-sheet>

        <div class="pa-4">
            <div class="mb-3 text-t-lg font-weight-bold">
                자연스러운 영어인사
            </div>

            <div class="d-flex ga-1 align-center mb-3">
                <v-img
                    src="/images/class/default_video.png"
                    width="25"
                    height="25"
                    cover
                    class="flex-grow-0 rounded-circle"
                />

                <div class="text-t-xs font-weight-medium">
                    제작자 이름
                </div>
            </div>

            <div class="d-flex ga-2">
                <v-btn
                    icon="mdi-heart-outline"
                    size="small"
                    variant="tonal"
                    class="rounded-circle"
                />

                <v-btn
                    icon="mdi-bookmark-outline"
                    size="small"
                    variant="tonal"
                    class="rounded-circle"
                />

                <v-btn
                    icon="mdi-share-variant-outline"
                    size="small"
                    variant="tonal"
                    class="rounded-circle"
                />
                <v-btn
                    icon="mdi-tray-arrow-down"
                    size="small"
                    variant="tonal"
                    class="rounded-circle"
                />
            </div>

        </div>

        <div class="overflow-auto">
            <v-tabs
                v-model="tabMain.tab.value"
                align-tabs="center"
                stacked
                grow
            >
                <v-tab value="transcript">
                    transcript
                </v-tab>

                <v-tab value="review">
                    review
                </v-tab>
            </v-tabs>

            <v-tabs-window
                v-model="tabMain.tab.value"
                class="py-6 px-4"
            >
                <!-- 학습 내용 -->
                <v-tabs-window-item value="transcript">
                    <span v-for="count in 20">
                        Guns change everything, and a bullet is foreverGuns change everything, and a bullet is
                        foreverGuns change everything, and a bullet is foreverGuns change everything, and a bullet
                        is
                        foreverGuns change everything, and a bullet is foreverGuns change everything, and a bullet
                        is
                        foreverGuns change everything, and a bullet is forever and a bullet is foreverGuns change
                        everything, and a bullet is foreverGuns change everything, and a bullet is forever
                    </span>
                </v-tabs-window-item>

                <!-- 복습 -->
                <v-tabs-window-item value="review">
                    review
                </v-tabs-window-item>
            </v-tabs-window>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const classId = computed(() => route.params.id);

const tabMain = {
    list: [
        'regular',
        'lecture',
    ],
    tab: ref('regular'),
}
</script>
