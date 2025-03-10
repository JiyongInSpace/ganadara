<template>
    <div class="position-relative">
        <div class="video-wrapper">
            <video
                ref="videoElement"
                class="video-js video-player"
                :class="state.isFullscreen ? 'w-screen h-screen z-9999' : ''"
            />

            <div
                class="video-inner"
                :class="state.isFullscreen ? 'w-screen h-screen z-9999' : ''"
                @click="event.click"
            >
                <v-overlay
                    v-if="state.isLock"
                    v-model="state.isPaused"
                    contained
                    persistent
                >
                    <div
                        class="d-flex h-100 justify-center align-end"
                        :class="state.isFullscreen ? 'mb-10' : ''"
                    >
                        <v-chip
                            class="custom-background text-t-sm font-weight-medium text-white mr-2"
                            @click.stop="event.controls.lock"
                        >
                            <v-icon
                                icon="mdi-lock-outline"
                                size="16"
                                class="mr-1"
                            ></v-icon>
                            잠김
                        </v-chip>
                    </div>
                </v-overlay>
                <v-overlay
                    v-if="!state.isLock"
                    v-model="state.isPaused"
                    contained
                    persistent
                >
                    <div class="d-flex w-100 justify-space-between">
                        <v-img
                            src="/icons/IconChevronLeft.png"
                            alt="play-button"
                            width="24"
                            height="24"
                            class="flex-grow-0 cursor-pointer"
                            @click.stop="event.controls.back"
                        />

                        <div class="d-flex align-center ga-2">
                            <v-chip
                                class="xs on-brand-primary bg-rate-chip cursor-pointer"
                                @click.stop="event.controls.playbackRate"
                            >
                                {{ state.playbackRate.toFixed(1) }}x
                            </v-chip>

                            <v-img
                                src="/icons/IconMessageQuestionSquare.png"
                                alt="question-button"
                                width="24"
                                height="24"
                                class="flex-grow-0 cursor-pointer"
                                @click.stop="event.controls.contactUs"
                            />
                        </div>
                    </div>

                    <div class="d-flex justify-center align-center">
                        <v-img
                            src="/icons/IconTrickBackward.png"
                            alt="play-button"
                            width="40"
                            height="40"
                            class="flex-grow-0 cursor-pointer"
                            @click.stop="event.controls.prev"
                        />
                        <v-img
                            src="/icons/IconPlay.png"
                            alt="play-button"
                            width="48"
                            height="48"
                            class="mx-7-5 flex-grow-0 cursor-pointer"
                            @click.stop="event.controls.play"
                        />
                        <v-img
                            src="/icons/IconTrickForward.png"
                            alt="play-button"
                            width="40"
                            height="40"
                            class="flex-grow-0 cursor-pointer"
                            @click.stop="event.controls.next"
                        />
                    </div>

                    <div
                        class="d-flex justify-space-between text-t-xs"
                        :class="state.isFullscreen ? 'mb-10' : ''"
                    >
                        <div class="d-flex align-center ga-2">
                            <div class="font-weight-medium">
                                <span class="text-text-placeholder_subtle">{{ currentTime }}</span>
                                <span class="text-text-placeholder_subtle mx-0-5">/</span>
                                <span class="text-text-primary_on-brand font-weight-bold">{{ duration }}</span>
                            </div>

                            <div
                                v-if="!isAvailable"
                                class="text-text-secondary_on-brand font-weight-bold"
                            >
                                30초 미리보기
                            </div>
                        </div>

                        <div class="d-flex align-center">
                            <v-chip
                                v-if="state.isFullscreen"
                                class="custom-background text-t-sm font-weight-medium text-white mr-2"
                                @click.stop="event.controls.lock"
                            >
                                <v-icon
                                    icon="mdi-lock-outline"
                                    size="16"
                                    class="mr-1"
                                ></v-icon>
                                잠그기
                            </v-chip>

                            <v-img
                                src="/icons/IconFullPlayer.png"
                                alt="fullpage-button"
                                width="20"
                                height="20"
                                class="flex-grow-0 cursor-pointer"
                                @click.stop="event.controls.fullpage"
                            />
                        </div>
                    </div>
                </v-overlay>
            </div>
        </div>

        <div
            :class="{ 'd-flex align-end position-absolute h-screen w-100 top-0 left-0 z-9999 px-4 pb-5': state.isFullscreen }"
            :style="{
                pointerEvents: 'none'
            }"
        >
            <v-slider
                v-if="!state.isLock"
                v-model="state.currentTime"
                :max="state.duration"
                hide-details
                class="mx-0 mt-n3-5"
                thumb-size="16"
                @start="event.slider.start"
                @end="event.slider.end"
                :style="{
                    pointerEvents: 'auto'
                }"
            />
        </div>
    </div>

    <DialogContactUs v-model:dialog="state.ui.dialogContactUs" />
</template>

<script lang="ts" setup>
import { intervalToDuration } from 'date-fns';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'

const router = useRouter();

const props = defineProps<{
    src: string;
    isAvailable: boolean;
}>();

const emit = defineEmits<{
    (e: 'onEnded'): void,
    (e: 'onNeedToBuy'): void
    (e: 'onTimeUpdate', currentTime: number): void
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
    isFullscreen: false,
    isLock: false,
    ui: {
        dialogContactUs: false,
    }
});

watch(
    () => state.currentTime,
    (newVal) => {
        if (player.value && state.isMovingSlider) {
            player.value.currentTime(newVal);
        }
    }
);

onMounted(() => {
    if (videoElement.value) {
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
        // 전체 화면 변경 이벤트
        player.value.on('fullscreenchange', () => {
            const isFullscreen = player.value?.isFullscreen();

            if (isFullscreen) {
                // 비디오 플레이어 요소
                const playerElement = player.value?.el();
                if (playerElement) {
                    let customOverlay = playerElement.querySelector('.video-custom-overlay');

                    if (!customOverlay) {
                        // 커스텀 오버레이 생성
                        customOverlay = document.createElement('div');
                        customOverlay.className = 'video-custom-overlay';

                        // 버튼 및 이벤트 추가
                        const backButton = document.createElement('img');
                        backButton.src = '/icons/IconChevronLeft.png';
                        backButton.style.width = '24px';
                        backButton.style.height = '24px';
                        backButton.className = 'flex-grow-0 cursor-pointer';
                        backButton.onclick = () => {
                            console.log('Back button clicked!');
                        };

                        const playbackSpeed = document.createElement('div');
                        playbackSpeed.className = 'cursor-pointer';
                        playbackSpeed.innerText = 'Playback Speed';
                        playbackSpeed.onclick = () => {
                            state.playbackRate = state.playbackRate === 1.0 ? 1.5 : 1.0;
                            player.value?.playbackRate(state.playbackRate);
                            console.log(`Playback rate changed to: ${state.playbackRate}`);
                        };

                        // 오버레이에 추가
                        customOverlay.appendChild(backButton);
                        customOverlay.appendChild(playbackSpeed);

                        playerElement.appendChild(customOverlay);
                    }
                }
            } else {
                // 전체 화면 종료 시 오버레이 제거
                const playerElement = player.value?.el();
                const customOverlay = playerElement?.querySelector('.video-custom-overlay');
                if (customOverlay) {
                    customOverlay.remove();
                }
            }
        });
    }
});


const event = {

    ready: () => {
        // console.log('Video is ready');
    },

    loadedmetadata: () => {
        if (!player.value) return;
        const duration = player.value.duration();
        state.duration = duration;
    },

    // 시간갱신
    timeupdate: () => {
        if (!player.value) return;
        state.currentTime = player.value.currentTime();
        emit("onTimeUpdate", state.currentTime);

        if (!props.isAvailable && state.currentTime >= 30) {
            player.value.pause();
            emit("onNeedToBuy");
        }
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
        emit("onEnded");
    },

    slider: {
        start: () => {
            if (!player.value) return;
            player.value.pause();
            state.isMovingSlider = true;
        },
        end: () => {
            if (!player.value) return;
            if (!state.isPaused) player.value.play();
            state.isMovingSlider = false;
        }
    },

    controls: {
        back: () => {
            router.back();
        },

        playbackRate: () => {
            const index = state.playbackRates.indexOf(state.playbackRate);
            const nextIndex = index + 1 >= state.playbackRates.length ? 0 : index + 1;
            state.playbackRate = state.playbackRates[nextIndex];
            if (!player.value) return;
            player.value.playbackRate(state.playbackRate);
        },

        contactUs: () => {
            state.ui.dialogContactUs = true;
        },

        play: () => {
            if (!player.value) return;
            if (!props.isAvailable && state.currentTime >= 30) {
                emit("onNeedToBuy");
                return;
            }
            player.value.play();
            state.isPaused = false;
        },

        next: () => {
            // 클릭시 10초 후로
            if (!player.value) return;
            player.value.currentTime(player.value.currentTime() + 10);
        },

        prev: () => {
            // 클릭시 10초 전으로
            if (!player.value) return;
            player.value.currentTime(player.value.currentTime() - 10);
        },

        fullpage: () => {
            // 클릭시 10초 전으로
            if (!player.value) return;
            state.isFullscreen = !state.isFullscreen;
            // player.value.requestFullscreen();
            // screen.orientation.lock("landscape");

        },

        lock: () => {
            state.isLock = !state.isLock;
            if(state.isLock) {
                player.value?.play();
            } else {
                player.value?.pause();
            }
        }
    }
}


// UTIL
function formatVideoTime(seconds: any) {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    const formatted = [
        duration.hours?.toString().padStart(2, '0') || "00",
        duration.minutes?.toString().padStart(2, '0') || "00",
        duration.seconds?.toString().padStart(2, '0') || "00"
    ].join(':');
    return formatted;
}
const currentTime = computed(() => {
    // return player.value?.currentTime();
    return formatVideoTime(state.currentTime);
});

const duration = computed(() => {
    return formatVideoTime(state.duration);
});

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
    z-index: 10;
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

.bg-rate-chip {
    background-color: rgba(255, 255, 255, 0.10);
}
</style>