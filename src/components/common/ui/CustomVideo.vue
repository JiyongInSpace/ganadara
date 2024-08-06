<template>
    <div class="video-wrapper">
        <video-player
            class="video-player vjs-big-play-centered relative"
            :src="src"
            crossorigin="anonymous"
            playsinline
            controls
            :volume="0.5"
            :playback-rates="[0.7, 1.0, 1.5, 2.0]"
            @mounted="event.mounted"
            @ready="event.event($event)"
            @play="event.play($event)"
            @pause="event.pause($event)"
            @ended="event.ended($event)"
            @loadeddata="event.loadeddata($event)"
            @waiting="event.event($event)"
            @playing="event.event($event)"
            @canplay="event.event($event)"
            @canplaythrough="event.event($event)"
            @timeupdate="event.timeupdate(player?.currentTime())"
        >

            <!-- <v-slider
                v-model="state.currentTime"
                :max="state.duration"
                thumb-label
                class="mx-0 mt-n3-5"
                hide-details
            ></v-slider> -->
        </video-player>

        <!-- @input="seekVideo" -->
    </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const props = defineProps<{
    src: string
}>();

const emit = defineEmits<{
    (e: 'onEnded'): void,
}>();

type VideoJsPlayer = ReturnType<typeof videojs>

const player = shallowRef<VideoJsPlayer>()

const state = reactive({
    currentTime: 0,
    duration: 0,
});

const event = {
    // onMounted
    mounted: (payload: any) => {
        // player.value = payload.player
        // console.log('Basic player mounted', payload)
    },

    loadeddata: (log: any) => {
        // console.log('Basic player loadeddata', log.target.player.cache_.duration)

        state.duration = log.target.player.cache_.duration;
    },

    event: (log: any) => {
        // console.log('Basic player event', log)
    },

    // 시간갱신
    timeupdate: (log: any) => {
        // console.log(log);
    },

    // 재생
    play: (log: any) => {
        // console.log('Basic player started')
    },

    // 정지
    pause: (log: any) => {
        // console.log('Basic player paused')
    },

    // 재생완료
    ended: (log: any) => {
        emit("onEnded");
    },
}


</script>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';
// @import '@/styles/mixins.scss';
.video-wrapper {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    /* 16:9 Aspect Ratio */
    height: 0;
    /* Collapse the container to the padding */
}

.video-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.video-inner {
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
}

.mt-n3-5 {
    margin-top: -14px !important;
}
</style>