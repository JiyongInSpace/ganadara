<template>
  <PageTemplate
    space="px-0"
    no-gap
  >
    <template v-slot:prepend-header>
      <v-img
        src="/images/home/main_logo.svg"
        alt="logo"
        width="32"
        height="32"
        class="flex-grow-0"
      />
    </template>

    <template v-slot:append-header>
      <div>
        <v-btn
          icon
          variant="text"
          size="24"
          class="mr-3"
          @click="onClickNotice"
        >
          <v-badge
            color="error"
            dot
          >
            <v-img
              src="@/assets/icons/basic/bell.svg"
              width="24"
              height="24"
            />
          </v-badge>
        </v-btn>
      </div>


      <v-img
        :src="profile_image"
        width="32"
        height="32"
        v-ripple
        class="flex-grow-0 cursor-pointer ml-2"
        @click="onClickProfile"
      />
    </template>

    <template v-slot:content>
      <div class="text-t-lg font-weight-bold px-4 mb-3">
        숏폼
      </div>

      <div className="flex-shrink-0 d-flex ga-4 overflow-x-auto px-4 mb-8">
        <div
          v-for="shortformItem, index in dummy_shortform"
          :key="shortformItem.id"
          v-ripple
          class="position-relative pa-0-5 flex-shrink-0 cursor-point"
          @click="onClickShortForm(shortformItem.id)"
        >
          <v-img
            :src="shortformItem.thumbnail"
            width="122"
            height="200"
            alt="contact-us"
            class="flex-grow-0 rounded-4 flex-shrink-0"
            cover
            :aspect-ratio="122 / 200"
          />

          <div class="position-absolute left-3 right-3 bottom-3 z-1">
            <span class="text-t-sm text-text-white text-shadow font-weight-semibold">
              {{ shortformItem.description }}
            </span>
          </div>
        </div>
      </div>

      <div class="text-t-lg font-weight-bold px-4 mb-3">
        최근 학습
      </div>

      <div className="flex-shrink-0 d-flex ga-4 overflow-x-auto px-4 mb-8">
        <VideoThumbnail
          v-for="(recentVideoItem, index) in state.recentVideoList"
          :key="index"
          video-type="square"
          :video-info="recentVideoItem"
          v-ripple
          @click="onClickLecture(recentVideoItem.id)"
        />
      </div>

      <div class="text-t-lg font-weight-bold px-4 mb-3">
        신규 영상
      </div>

      <div className="flex-shrink-0 d-flex ga-4 overflow-x-auto px-4 mb-8">

        <VideoThumbnail
          v-for="(newVideoItem, index) in state.recentVideoList"
          :key="index"
          video-type="square"
          :video-info="newVideoItem"
          v-ripple
          @click="onClickLecture(newVideoItem.id)"
        />
      </div>

      <div class="text-t-lg font-weight-bold px-4 mb-3">
        내가 좋아할 만한 영상
      </div>

      <div className="flex-shrink-0 d-flex ga-4 overflow-x-auto px-4 mb-8">
        <VideoThumbnail
          v-for="(recommendedVideoItem, index) in state.recommendedVideoList"
          :key="index"
          video-type="rectangle"
          :video-info="recommendedVideoItem"
          :max-height="163"
          v-ripple
          @click="onClickLecture(recommendedVideoItem.id)"
        />
      </div>

      <div class="text-t-lg font-weight-bold px-4 mb-3">
        테마 영상
      </div>

      <div className="flex-shrink-0 d-flex ga-4 overflow-x-auto px-4 mb-8">
        <VideoThumbnail
          v-for="(themeVideoItem, index) in state.themeVideoList"
          :key="index"
          video-type="square"
          :video-info="themeVideoItem"
          v-ripple
          @click="onClickLecture(themeVideoItem.id)"
        />
      </div>

      <div class="text-t-lg font-weight-bold px-4 mb-4">
        놓치면 안 되는 따끈한 인기 콘텐츠
      </div>

      <v-chip-group
        class="flex-shrink-0 mb-4 px-4 py-0"
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

      <div className="flex-shrink-0 d-flex ga-4 overflow-x-auto px-4 mb-8">
        <VideoThumbnail
          v-for="(popularVideoItem, index) in state.popularVideoList"
          :key="index"
          :video-info="popularVideoItem"
          video-type="square"
          v-ripple
          @click="onClickLecture(popularVideoItem.id)"
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
          @click="onClickChat"
        >
          AI랑 채팅하러 가기
        </v-btn>
      </v-sheet>
    </template>

    <template v-slot:bottom>
    </template>

    <template v-slot:actions>
      <app-bottom-navigation />
    </template>
  </PageTemplate>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const router = useRouter();
const userStore = useUserStore();
const { profile_image } = storeToRefs(userStore);

export interface IShortForm {
  id: string;
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

const dummy_shortform = [
  {
    id: "1",
    title: "Short-form Title",
    thumbnail: "/images/home/dummy_thumbnail2.png",
    description: "Short-form Description",
  },
  {
    id: "1",
    title: "Short-form Title",
    thumbnail: "/images/home/dummy_thumbnail2.png",
    description: "Short-form Description",
  },
  {
    id: "1",
    title: "Short-form Title",
    thumbnail: "/images/home/dummy_thumbnail2.png",
    description: "Short-form Description",
  },
  {
    id: "1",
    title: "Short-form Title",
    thumbnail: "/images/home/dummy_thumbnail2.png",
    description: "Short-form Description",
  },
  {
    id: "1",
    title: "Short-form Title",
    thumbnail: "/images/home/dummy_thumbnail2.png",
    description: "Short-form Description",
  },
  {
    id: "1",
    title: "Short-form Title",
    thumbnail: "/images/home/dummy_thumbnail2.png",
    description: "Short-form Description",
  },
]

const dummy_data = {
  videoList: [
    {
      id: "1",
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
      id: "1",
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
      id: "1",
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
const onClickProfile = () => {
  router.push("/dashboard/profile")
}
const onClickNotice = () => {
  router.push("/dashboard/notice")
}


const onClickShortForm = (id: string) => {
  router.push("/class/shortform/" + id)
}

const onClickLecture = (id: string) => {
  router.push("/class/regular/" + id)
}

const onClickTotalDailyMission = () => {
  router.push("/challenge/mission")
}

const onClickDailyMission = (_mission: any) => {
  router.push("/challenge/mission/" + _mission.title)
}

const onClickChat = () => {
  router.push("/dashboard/additional/ai_chat")
}

</script>


<style lang="scss" scoped></style>
