<template>
    <div
        className="position-absolute right-0 left-0 top-0 bottom-0 bg-black overflow-hidden"
        @click="videoPlayer.event.onClick"
        @touchstart="videoPlayer.event.onTouchstart"
        @touchmove="videoPlayer.event.onTouchmove"
        @touchend="videoPlayer.event.onTouchend"
    >
        <video
            ref="videoRef"
            class="w-100 h-100"
            autoplay
            loop
            :muted="state.shortform.isMuted"
            :style="{
                transform: `translateX(${-0.1 * diffX}px)`
            }"
            @mounted="videoPlayer.event.onMounted"
            @ended="videoPlayer.event.onEnded"
            @timeupdate="videoPlayer.event.timeupdate"
        >
            <!-- @ready="event.event($event)"
            @play="event.play($event)"
            @pause="event.pause($event)"
            @loadeddata="event.loadeddata($event)"
            @waiting="event.event($event)"
            @playing="event.event($event)"
            @canplay="event.event($event)"
            @canplaythrough="event.event($event)"
            @timeupdate="event.timeupdate(player?.currentTime())" -->
            <source
                src="https://videocdn.cdnpk.net/videos/723c2417-05d1-4643-b42a-c136b6e386f7/vertical/previews/watermarked/large.mp4"
                type="video/mp4"
            >
            Your browser does not support the video tag.
        </video>
    </div>

    <!-- HEADER -->
    <div
        class="w-100 h-14 d-flex align-center px-2 text-shadow text-text-primary_on-brand position-absolute top-0 left-0 pointer-events-none">

        <v-btn
            icon="mdi-message-question-outline"
            size="small"
            variant="text"
            @click="state.ui.dialogContactUs = true"
        />

        <v-chip
            size="x-small"
            class="on-brand ml-2"
        >
            미리보기 중입니다. {{ state.shortform.limit }}/5
        </v-chip>

        <v-spacer />

        <v-btn
            :icon="state.shortform.isMuted ? 'mdi-volume-high' : 'mdi-volume-off'"
            size="small"
            variant="text"
            @click="state.shortform.isMuted = !state.shortform.isMuted"
        />

        <v-btn
            icon="mdi-close"
            size="small"
            variant="text"
            @click="buttonBack.event.onClick"
        />
    </div>

    <DialogContactUs v-model:dialog="state.ui.dialogContactUs">
        <template v-slot:subtitle>
            <div className="text-t-md font-weight-medium py-3 text-start">
                {{ state.shortform.title }}
            </div>
        </template>
    </DialogContactUs>


    <!-- ACTIONS -->
    <div
        class="d-flex justify-space-between align-end px-4 pb-8 ga-6 text-shadow text-text-primary_on-brand position-absolute bottom-0 left-0 w-100 pointer-events-none">
        <!-- LEFT -->
        <div>
            <div className="d-flex align-center mb-2">
                <div
                    className="d-flex align-center pointer-events-auto"
                    @click="areaProfile.event.onClick"
                >
                    <v-img
                        :src="state.shortform.creator.profileImage"
                        height="32"
                        width="32"
                        cover
                        class="rounded-circle mr-2-5 flex-grow-0"
                    />

                    <span class="mr-3 text-t-sm font-weight-semibold">
                        {{ state.shortform.creator.name }}
                    </span>
                </div>

                <v-chip
                    variant="elevated"
                    size="small"
                    class="flex-shrink-0 shadow-0 transition pointer-events-auto"
                    :class="`${state.shortform.creator.isFollowed ? 'bg-primary' : 'bg-white'}`"
                    @click="buttonFollow.event.onClick"
                >
                    {{ state.shortform.creator.isFollowed ? "팔로잉" : "팔로우" }}
                </v-chip>
            </div>

            <div class="text-t-md font-weight-semibold mb-2">
                {{ state.shortform.title }}
            </div>


            <div
                v-if="state.shortform.description"
                class="line-clamp-2 mb-1"
            >

                {{ state.shortform.description }}
            </div>

            <div
                v-if="state.shortform.description"
                class="mb-2 pointer-events-auto w-fit"
                @click="state.ui.dialogDescription = true"
            >
                <span className="text-t-sm font-weight-semibold">
                    More
                </span>

                <v-icon icon="mdi-chevron-down" />
            </div>

            <DialogDescripntion
                v-model:dialog="state.ui.dialogDescription"
                :info="{
                    title: state.shortform.title,
                    subtitle: state.shortform.title,
                    description: state.shortform.description
                }"
            />

            <v-chip
                variant="elevated"
                class="on-brand-primary xs pointer-events-auto"
                @click="state.ui.dialogMusic = true"
            >
                <v-icon
                    icon="mdi-music"
                    class="mr-1"
                />
                {{ state.shortform.music[0].title }} - {{ state.shortform.music[0].artist }}
            </v-chip>

            <DialogMusic
                v-model:dialog="state.ui.dialogMusic"
                :list="state.shortform.music"
            />
        </div>
        <!-- RIGHT -->
        <div class="text-center d-flex flex-column ga-6">
            <div>
                <IconHeart
                    :isActive="state.shortform.isLiked"
                    class="pointer-events-auto"
                    @click="iconHeart.event.onClick"
                />

                <div class="text-t-xs font-weight-semibold">
                    {{ state.shortform.likes }}
                </div>
            </div>

            <div>
                <v-img
                    src="/icons/share.svg"
                    width="32"
                    height="32"
                    class="mx-auto mb-1 pointer-events-auto"
                    @click="iconShare.event.onClick"
                />

                <div class="text-t-xs font-weight-semibold">
                    공유
                </div>
            </div>

            <div>
                <IconBookAdd
                    :isActive="state.shortform.isSaved"
                    class="pointer-events-auto"
                    @click="iconBookAdd.event.onClick"
                />

                <div class="text-t-xs font-weight-semibold truncate">
                    표현 저장
                </div>
            </div>
        </div>
    </div>

    <!-- DialogFollowing -->
    <SimpleDialog
        v-model="state.ui.dialogCancleFollow"
        @onClickSub="buttonFollow.event.dialog.onClickSub"
        @onClickMain="buttonFollow.event.dialog.onClickMain"
    >
        <template v-slot:title>
            팔로우를 취소하시겠습니까?
        </template>

        <template v-slot:buttonSub>
            돌아가기
        </template>

        <template v-slot:buttonMain>
            팔로우 취소
        </template>
    </SimpleDialog>

    <!-- DialogPricing -->
    <DialogPricing v-model:dialog="state.ui.dialogPricing" />
    <!-- @onClickSub="buttonPricing.event.onClickSub"
        @onClickMain="buttonPricing.event.onClickMain" -->
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar'

const snackbar = useSnackbarStore()
const router = useRouter()


// STATE
const state = reactive({
    shortform: {
        // video info
        title: "Short-form Title",
        description: "Descriptions about this short-form will show up on the bottomsheet. Descriptions about this short-form will show up on the bottomsheet. Descriptions about this short-form will show up on the bottomsheet. Descriptions about this short-form will show up on the bottomsheet.",
        // description: "",
        videoUrl: "https://videocdn.cdnpk.net/videos/691242e9-ec82-42d6-a693-c6b22db4f5da/vertical/previews/watermarked/large.mp4",
        creator: {
            name: "creator",
            profileImage: "/images/class/dummy_profile_image.png",
            isFollowed: false,
        },
        music: [{
            title: "Music Title",
            artist: "Artist",
            source: "여기저기",
        }, {
            title: "Music Title2",
            artist: "Artist2",
            source: "음원출처",
        },],
        likes: 66,

        // user info 
        isLiked: false,
        isSaved: false,
        isPlaying: false,
        isMuted: false,
        isAvailable: false,
        limit: 5,
    },

    ui: {
        dialogContactUs: false,
        dialogCancleFollow: false,
        dialogPricing: false,
        dialogDescription: false,
        dialogMusic: false,
    }
});



// UI Components

const videoRef = ref();
const startX = ref(0);
const endX = ref(0);
const diffX = ref(0);


onMounted(() => {
    console.log(videoRef.value);
    // videoRef.value;
})

const videoPlayer = {
    event: {
        onMounted: () => {
            // alert("onMounted");
        },
        onEnded: () => {
            alert("onEnded");
        },
        timeupdate: (event: any) => {
            if (state.shortform.isAvailable) {
                return;
            }

            if (event.target.currentTime >= 5 && state.shortform.limit > 0) {
                state.shortform.isAvailable = true;
                state.shortform.limit--;
            }

            if (event.target.currentTime >= 5 && state.shortform.limit === 0) {
                event.target.pause();
                state.ui.dialogPricing = true;
            }
        },
        onClick: () => {
            state.shortform.isPlaying = !state.shortform.isPlaying;
        },
        onTouchstart: (_event: TouchEvent) => {
            startX.value = _event.touches[0].clientX;
        },
        onTouchmove: (_event: TouchEvent) => {
            const currentX = _event.touches[0].clientX;
            diffX.value = startX.value - currentX;
        },
        onTouchend: (_event: TouchEvent) => {
            endX.value = _event.changedTouches[0].clientX;
            checkSwipeAction();
            diffX.value = 0;
        }
    }
};

const checkSwipeAction = () => {
    const threshold = 100; // 최소 이동 거리 (px)
    const diffX = startX.value - endX.value;

    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            // 왼쪽으로 스와이프
            router.back();
        } else {
            // 오른쪽으로 스와이프
            console.log('Swipe right');
            // 이전 비디오 또는 컨텐츠로 이동
        }
    }
};

watch(
    () => state.shortform.isPlaying,
    (isPlaying: boolean) => {
        if (isPlaying) {
            videoRef.value.play();
        } else {
            videoRef.value.pause();
        }
    }
);


const areaProfile = {
    event: {
        onClick: () => {
            alert("Profile");
        }
    }
};

const buttonFollow = {
    event: {
        onClick: () => {
            if (state.shortform.creator.isFollowed) {
                state.ui.dialogCancleFollow = true;
            } else {
                state.shortform.creator.isFollowed = !state.shortform.creator.isFollowed;
            }
        },

        dialog: {
            onClickSub: () => {
                state.ui.dialogCancleFollow = false;
            },
            onClickMain: () => {
                state.shortform.creator.isFollowed = !state.shortform.creator.isFollowed;
                state.ui.dialogCancleFollow = false;
            }
        }
    }
};

const iconHeart = {
    event: {
        onClick: () => {
            state.shortform.isLiked = !state.shortform.isLiked;
            state.shortform.likes = state.shortform.isLiked ? state.shortform.likes + 1 : state.shortform.likes - 1;

            // API call
            alert("Liked!");
        }
    }
};

const iconBookAdd = {
    event: {
        onClick: () => {
            state.shortform.isSaved = !state.shortform.isSaved;

            if (state.shortform.isSaved) {
                snackbar.showSnackbar("단어와 표현이 저장되었습니다.");
            } else {
                snackbar.showSnackbar("단어와 표현 저장이 취소되었습니다.");
            }

            // API call
            // alert("Saved!");
        }
    }
};

const iconShare = {
    event: {
        onClick: () => {
            if (navigator.share) { // Navigator를 지원하는 경우만 실행
                navigator
                    .share({
                        title: 'WebShare API Example',
                        text: 'Check out this web site!',
                        url: 'https://example.com',
                    })
                    .then(() => {
                        // 정상 동작할 경우 실행
                        alert('공유하기 성공')
                    })
                    .catch((error) => {
                        alert('에러가 발생했습니다.')
                    })
            } else { // navigator를 지원하지 않는 경우
                alert('페이지 공유를 지원하지 않습니다.')
            }
        }
    }
};

const buttonBack = {
    event: {
        onClick: () => {
            alert("정규학습");
            router.back();
        }
    }
};

</script>

<style lang="scss" scoped>
.text-shadow {
    text-shadow: 0px 1px 3px rgba(16, 24, 40, 0.10), 0px 1px 2px rgba(16, 24, 40, 0.06);
}

.video-wrapper {
    position: relative;
    width: 100%;
    /* 16:9 Aspect Ratio */
    height: 100vh;
    /* Collapse the container to the padding */
}
</style>