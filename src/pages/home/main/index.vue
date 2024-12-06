
<template>
  <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
    <app-header-navigation />

    <div class="overflow-y-auto flex-grow-1">
      <div class="text-t-lg font-weight-bold px-4 mb-3">
        숏폼
      </div>

      <div className="d-flex ga-4 overflow-x-auto px-4 mb-8">
        <v-sheet
          v-for="count in 10"
          :key="count"
          min-height="200"
          color="secondary"
          class="d-flex align-end text-shadow text-t-sm font-weight-semibold pa-3 rounded-4"
          :style="{
            aspectRatio: '122/200',
          }"
        >
          Hi!
        </v-sheet>
      </div>

      <div class="text-t-lg font-weight-bold px-4 mb-3">
        최근 학습
      </div>

      <div className="d-flex ga-4 overflow-x-auto px-4 mb-8">
        <VideoThumbnail
          v-for="(recentVideoItem, index) in state.recentVideoList"
          :key="index"
          video-type="square"
          :video-info="recentVideoItem"
        />
      </div>

      <div class="text-t-lg font-weight-bold px-4 mb-3">
        신규 영상
      </div>

      <div className="d-flex ga-4 overflow-x-auto px-4 mb-8">

        <VideoThumbnail
          v-for="(newVideoItem, index) in state.recentVideoList"
          :key="index"
          video-type="square"
          :video-info="newVideoItem"
        />
      </div>

      <div class="text-t-lg font-weight-bold px-4 mb-3">
        내가 좋아할 만한 영상
      </div>

      <div className="d-flex ga-4 overflow-x-auto px-4 mb-8">
        <VideoThumbnail
          v-for="(recommendedVideoItem, index) in state.recommendedVideoList"
          :key="index"
          video-type="rectangle"
          :video-info="recommendedVideoItem"
        />
      </div>

      <div class="text-t-lg font-weight-bold px-4 mb-3">
        테마 영상
      </div>

      <div className="d-flex ga-4 overflow-x-auto px-4 mb-8">
        <VideoThumbnail
          v-for="(themeVideoItem, index) in state.themeVideoList"
          :key="index"
          video-type="square"
          :video-info="themeVideoItem"
        />
      </div>

      <div class="text-t-lg font-weight-bold px-4 mb-4">
        놓치면 안 되는 따끈한 인기 콘텐츠
      </div>

      <v-chip-group
        class="mb-4 px-4 py-0"
        selected-class="bg-black text-text-primary_on-brand"
        v-model="selectedContentCategory"
        column
      >
        <v-chip
          v-for="tag in state.popularTagList"
          :key="tag.key"
          :value="tag.key"
          variant="outlined"
          size="small"
          class="border-border-primary my-0 ml-0 mr-2"
        >
          <span v-text="tag.value" />
        </v-chip>
      </v-chip-group>

      <div className="d-flex ga-4 overflow-x-auto px-4 mb-8">
        <VideoThumbnail
          v-for="(popularVideoItem, index) in state.popularVideoList"
          :key="index"
          :video-info="popularVideoItem"
          video-type="square"
        />
      </div>

      <div class="background-secondary py-8">
        <div class="d-flex justify-space-between px-4 mb-3">
          <span class="text-t-lg font-weight-bold">
            데일리 미션
          </span>

          <v-btn
            variant="text"
            size="small"
            class="px-0"
            @click="onClickTotalDailyMission"
          >
            전체 보기

            <v-icon
              icon="mdi-chevron-right"
              class="ml-1"
            />
          </v-btn>
        </div>

        <div className="d-flex overflow-x-auto px-4">
          <div
            v-for="(dailyMissionItem, index) in dailyMissionList"
            :key="index"
            className="d-flex flex-column justify-center text-center cursor-pointer px-5 py-4"
            @click="() => onClickDailyMission(dailyMissionItem)"
          >
            <v-img
              :src="dailyMissionItem.imageUrl"
              height="56"
              width="56"
              class="mb-2 rounded-circle"
            />

            <span class="text-t-md font-weight-semibold">
              {{ dailyMissionItem.title }}
            </span>
          </div>
        </div>
      </div>

      <div class="py-8">
        <div class="text-t-lg font-weight-bold px-4 mb-3">
          인기 유저
        </div>

        <v-chip-group
          class="mb-4 px-4 py-0"
          selected-class="bg-black text-text-primary_on-brand"
          v-model="selectedUserCategory"
          column
        >
          <v-chip
            v-for="tag in [{
              key: '1',
              value: '일반유저',
            }, {
              key: '2',
              value: '크리에이터',
            }]"
            :key="tag.key"
            :value="tag.key"
            variant="outlined"
            size="small"
            class="border-border-primary my-0 ml-0 mr-2"
          >
            <span v-text="tag.value" />
          </v-chip>
        </v-chip-group>

        <div className="d-flex overflow-x-auto px-4 ga-4 mb-3">
          <!-- v-model="feedItem.currentCarouselIndex" -->
          <v-card
            v-for="(popularUserItem, index) in state.popularUserList"
            :key="index"
            variant="outlined"
            class="d-flex pa-4 border-border-primary ga-3"
            min-width="320"
          >
            <v-img
              :src="popularUserItem.profileImage"
              height="32"
              width="32"
              cover
              class="rounded-circle flex-grow-0"
            />

            <div class="d-flex flex-column">
              <span class="text-t-xs font-weight-semibold">
                {{ popularUserItem.name }}
              </span>

              <p class="text-t-sm line-clamp-2">
                {{ popularUserItem.content }}
              </p>
            </div>

            <v-spacer />

            <div class="d-flex flex-column align-self-center align-center">
              <IconHeart
                :isActive="popularUserItem.isLiked"
                lineColor="--v-text-primary"
                class="pointer-events-auto mb-1-5"
                size="16"
              />

              <span class="text-t-xs">
                {{ popularUserItem.likes }}
              </span>
            </div>
          </v-card>
        </div>

        <div class="d-flex justify-center ga-2">
          <v-sheet
            v-for="(popularUserItem, index) in state.popularUserList"
            width="8"
            height="8"
            class="rounded-circle"
            :class="popularUserItem.id === selectedUserCategory ? 'bg-primary' : 'background-quaternary'"
          />
        </div>
      </div>

      <v-sheet
        class="mx-4 pa-4 rounded-8 background-secondary mb-16"
        color="bg-secondary"
      >
        <div class="d-flex align-center ga-4 mb-4">
          <v-img
            src="/images/class/dummy_profile_image.png"
            height="60"
            width="60"
            cover
            class="rounded-circle flex-grow-0"
          />

          <div>
            <div class="text-t-sm mb-0-5">
              학습언어로 채팅하고 싶다면?
            </div>

            <div class="text-t-md font-weight-semibold">
              AI랑 채팅하기
            </div>
          </div>
        </div>

        <v-btn
          block
          variant="tonal"
          class="primary"
        >
          AI랑 채팅하러 가기
        </v-btn>
      </v-sheet>
    </div>

    <app-bottom-navigation />
  </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

export interface IShortForm {
  title: string;
  thumbnail: string;
  progressPercentage: number;
  singlePurchase: boolean;
  creator: {
    name: string;
    profileImage: string;
    isFollowed: boolean;
  };
}
export interface IPopularUser {
  id: string;
  name: string;
  profileImage: string;
  content: string;
  isLiked: boolean;
  likes: number;
}
export interface IPopularTag {
  key: string;
  value: string;
}

const state = reactive({
  shortFormList: [
    {
      title: "Short-form Title",
      creator: {
        name: "creator",
        profileImage: "/images/class/dummy_profile_image.png",
      },
    },
  ] as IShortForm[],
  recentVideoList: [] as IShortForm[],
  newVideoList: [] as IShortForm[],
  recommendedVideoList: [] as IShortForm[],
  themeVideoList: [] as IShortForm[],
  popularTagList: [] as IPopularTag[],
  popularVideoList: [] as IShortForm[],
  popularUserList: [] as IPopularUser[],
});

const loading = ref(false);

onMounted(() => {
  state.recentVideoList = dummy_data.videoList;
  state.newVideoList = dummy_data.videoList;
  state.recommendedVideoList = dummy_data.videoList;
  state.themeVideoList = dummy_data.videoList;
  state.popularTagList = dummy_tags;
  state.popularVideoList = dummy_data.videoList;
  state.popularUserList = dummy_users;
})


// UI ========================================
const selectedContentCategory = ref("1");
const selectedUserCategory = ref("1");

const dailyMissionList = [
  {
    title: "roulette",
    imageUrl: "/images/home/roulette.png",
  },
  {
    title: "invite",
    imageUrl: "/images/home/invite.png",
  },
  {
    title: "quiz",
    imageUrl: "/images/home/quiz.png",
  },
  {
    title: "gift",
    imageUrl: "/images/home/gift.png",
  },
];

// 번역
const { t } = useI18n({
  messages: {
    en: {
      main_tab: {
        all: "전체",
        following: "팔로잉",
        my_comments: "내가 남긴 댓글",
      },
    },
    ko: {
      main_tab: {
        all: "전체",
        following: "팔로잉",
        my_comments: "내가 남긴 댓글",
      },
    },
  },
  inheritLocale: true, // 전역 locale 상속
  useScope: "local", // 로컬 스코프 설정
});

const dummy_data = {
  videoList: [
    {
      title: "Theme Video Title1",
      creator: {
        name: "creator",
        profileImage: "/images/class/dummy_profile_image.png",
      },
      thumbnail: "/images/home/dummy_thumbnail.png",
      progressPercentage: 0,
      singlePurchase: true
    },
    {
      title: "Theme Video Title2",
      creator: {
        name: "creator",
        profileImage: "/images/class/dummy_profile_image.png",
      },
      thumbnail: "/images/home/dummy_thumbnail2.png",
      progressPercentage: 80,
      singlePurchase: false
    },
    {
      title: "Theme Video Title3 Theme Video Title3 Theme Video Title3",
      creator: {
        name: "creator",
        profileImage: "/images/class/dummy_profile_image.png",
      },
      thumbnail: "/images/home/dummy_thumbnail.png",
      progressPercentage: 40,
      singlePurchase: true
    },
  ] as IShortForm[],
}

const dummy_users = [
  {
    id: "1",
    name: "creator",
    profileImage: "/images/class/dummy_profile_image.png",
    content: "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    isLiked: false,
    likes: 9999,
  },
  {
    id: "2",
    name: "creator2",
    profileImage: "/images/class/dummy_profile_image.png",
    content: "lorem",
    isLiked: true,
    likes: 10,
  },
  {
    id: "3",
    name: "creator3",
    profileImage: "/images/class/dummy_profile_image.png",
    content: "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    isLiked: false,
    likes: 33,
  },
]

const dummy_tags = [
  {
    key: "1",
    value: "tag1",
  },
  {
    key: "2",
    value: "tag2",
  },
  {
    key: "3",
    value: "tag3",
  },
] as IPopularTag[];


// EVENT
const onClickTotalDailyMission = () => {
  alert("onClickTotalDailyMission");
}

const onClickDailyMission = (_mission: any) => {
  alert(_mission.title);
}

</script>


<style lang="scss" scoped></style>
