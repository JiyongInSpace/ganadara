<template>
    <div class="position-relative rounded-8 overflow-hidden">
        <div class="video-wrapper">
            <video
                ref="videoElement"
                class="video-js video-player"
            />

            <div
                class="video-inner"
                @click="event.click"
            >
                <v-overlay
                    v-model="state.isPaused"
                    contained
                    persistent
                >
                    <div class="d-flex justify-center align-center h-100 ">
                        <v-icon
                            icon="mdi-play"
                            size="44"
                            color="primary"
                            class="mx-7-5 flex-grow-0 cursor-pointer"
                            @click.stop="event.controls.play"
                        />
                    </div>
                </v-overlay>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import videojs from 'video.js';
import 'video.js/dist/video-js.css'

const router = useRouter();

const props = defineProps<{
    src?: string;
}>();

const emit = defineEmits<{
    (e: 'onEnded'): void,
    (e: 'onNeedToBuy'): void
}>();

const videoElement = ref(null);
const player = ref<ReturnType<typeof videojs>>();

const state = reactive({
    currentTime: 0,
    duration: 0,
    isPaused: false,
    isMovingSlider: false,
    playbackRate: 1.0,
    playbackRates: [1.0, 1.1, 1.2, 1.3],
});

watch(
    () => state.currentTime,
    (newVal) => {
        if (player.value && state.isMovingSlider) {
            player.value.currentTime(newVal);
        }
    }
);

const onSetVideo = () => {
    if (videoElement.value && props.src) {
        player.value = videojs(videoElement.value, {
            sources: [{
                src: props.src,
                type: 'video/mp4'
            }],
            autoplay: true,
            muted: true,
            controls: false,
            responsive: true,
            playsinline: true
        });

        // 이벤트 리스너 설정
        // player.value.on('click', () => event.click());
        player.value.on('ready', () => event.ready());
        player.value.on('play', () => event.play());
        player.value.on('pause', () => event.pause());
        player.value.on('ended', () => event.ended());
        player.value.on('timeupdate', () => event.timeupdate());
        player.value.on('loadedmetadata', () => event.loadedmetadata());
        // 추가 이벤트 핸들러 필요시 여기에 등록
    }
}

onMounted(() => {
    onSetVideo();
})

watch(
    () => props.src,
    () => onSetVideo(),
    { immediate: true }
);

const event = {
    ready: () => {
        // console.log('Video is ready');
    },

    loadedmetadata: () => {
        if (!player.value) return;
    },

    // 시간갱신
    timeupdate: () => {
        if (!player.value) return;
    },

    // 클릭
    click: () => {
        if (!player.value) return;
        player.value.pause();
        state.isPaused = true;
    },

    // 재생
    play: () => {
        // console.log('Video is playing')
    },

    // 정지
    pause: () => {
        // console.log('Video is paused')
    },

    // 재생완료
    ended: () => {
        state.isPaused = true;
    },

    controls: {
        back: () => {
            router.back();
        },

        play: () => {
            if (!player.value) return;
            player.value.play();
            state.isPaused = false;
        },
    }
}
</script>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';
// @import '@/styles/mixins.scss';
.video-wrapper {
    background-color: black;
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
    position: absolute;
    // pointer-events: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.mt-n3-5 {
    margin-top: -14px !important;
}

:deep(.v-overlay__content) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 16px;
    // pointer-events: none;
}
</style>