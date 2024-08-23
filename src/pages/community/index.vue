<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
  <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
    <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
      <span class="text-t-xl font-weight-semibold">
        커뮤니티
      </span>

      <v-img
        src="/images/class/dummy_profile_image.png"
        width="32"
        height="32"
        class="flex-grow-0"
      />
    </div>

    <div
      ref="refTabs"
      class="position-sticky top-0 z-1 foreground-white border-b border-border-primary"
    >
      <v-tabs
        v-model="tabMain.tab.value"
        stacked
        class="flex-shrink-0 text-text-quaternary font-weight-bold main-tab"
        height="48"
        selected-class="text-text-primary"
        grow
      >
        <v-tab
          v-for="tabMainItem in tabMain.list"
          :key="tabMainItem"
          :value="tabMainItem"
          class="text-lowercase font-weight-bold flex-1-1-100"
        >
          {{ t(`main_tab.${tabMainItem}`) }}
        </v-tab>
      </v-tabs>
    </div>

    <v-tabs-window
      v-model="tabMain.tab.value"
      class="overflow-y-auto flex-grow-1"
    >
      <v-tabs-window-item :value="MAIN_TAB.ALL">
        <CommunityFeedList :feedList="state.feedList" />
      </v-tabs-window-item>

      <v-tabs-window-item :value="MAIN_TAB.FOLLOWING">
        FOLLOWING
      </v-tabs-window-item>

      <v-tabs-window-item :value="MAIN_TAB.MY_COMMENTS">
        MY_COMMENTS
      </v-tabs-window-item>
    </v-tabs-window>

  </v-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { IFeedItem } from '@/interfaces';

const MAIN_TAB = {
  ALL: "all",
  FOLLOWING: "following",
  MY_COMMENTS: "my_comments",
}

const state = reactive({
  feedList: [
    {
      user: {
        id: "1",
        name: "김철수",
        profileImage: "/images/class/dummy_profile_image.png",
      },
      content: {
        id: "1",
        date: "2024-08-22",
        text: "영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
        images: [
          "/images/class/default_video.png",
          "/images/class/default_video.png",
          "/images/class/default_video.png",
        ],
      },
      likes: [
        {
          id: "1",
          name: "홍길동",
          profileImage: "/images/class/dummy_profile_image.png",
        },
        {
          id: "1",
          name: "홍길동",
          profileImage: "/images/class/dummy_profile_image.png",
        },
        {
          id: "1",
          name: "홍길동",
          profileImage: "/images/class/dummy_profile_image.png",
        },
      ],
      comments: [
        {
          id: "1",
          name: "김영희",
          profileImage: "/images/class/dummy_profile_image.png",
          text: "와우 대단하다! 영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
          likes: 5,
          isLiked: true,
          date: "2024-08-22",
          replies: [
            {
              id: "2",
              name: "박준호",
              profileImage: "/images/class/dummy_profile_image.png",
              text: "정말 대단해요! 저도 김영희님처럼 열심히 해야겠어요.",
              likes: 3,
              isLiked: false,
              date: "2024-08-22",
              replies: []
            },
            {
              id: "4",
              name: "최영철",
              profileImage: "/images/class/dummy_profile_image.png",
              text: "함께 해요!",
              likes: 1,
              isLiked: false,
              date: "2024-08-22",
              replies: []
            }
          ]
        },
        {
          id: "1",
          name: "김영희",
          profileImage: "/images/class/dummy_profile_image.png",
          text: "와우 대단하다! 영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
          likes: 5,
          isLiked: true,
          date: "2024-08-22",
          replies: [
            {
              id: "2",
              name: "박준호",
              profileImage: "/images/class/dummy_profile_image.png",
              text: "정말 대단해요! 저도 김영희님처럼 열심히 해야겠어요.",
              likes: 3,
              isLiked: true,
              date: "2024-08-22",
              replies: []
            },
            {
              id: "4",
              name: "최영철",
              profileImage: "/images/class/dummy_profile_image.png",
              text: "함께 해요!",
              likes: 1,
              isLiked: false,
              date: "2024-08-22",
              replies: []
            }
          ]
        },
      ]
    },
    {
      user: {
        id: "1",
        name: "김철수",
        profileImage: "/images/class/dummy_profile_image.png",
      },
      content: {
        id: "1",
        date: "2024-08-22",
        text: "영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
        images: [
          "/images/class/default_video.png",
          "/images/class/default_video.png",
          "/images/class/default_video.png",
        ],
        isCommercial: true,
      },
      likes: [
        {
          id: "1",
          name: "홍길동",
          profileImage: "/images/class/dummy_profile_image.png",
        },
        {
          id: "1",
          name: "홍길동",
          profileImage: "/images/class/dummy_profile_image.png",
        },
        {
          id: "1",
          name: "홍길동",
          profileImage: "/images/class/dummy_profile_image.png",
        },
      ],
      comments: [
        {
          id: "1",
          name: "김영희",
          profileImage: "/images/class/dummy_profile_image.png",
          text: "와우 대단하다! 영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
          likes: 5,
          isLiked: true,
          date: "2024-08-22",
          replies: [
            {
              id: "2",
              name: "박준호",
              profileImage: "/images/class/dummy_profile_image2.png",
              text: "정말 대단해요! 저도 김영희님처럼 열심히 해야겠어요.",
              likes: 3,
              isLiked: false,
              date: "2024-08-22",
              replies: [] // 추가 대댓글이 있다면 이 배열에 또 다른 댓글 객체를 추가
            }
          ]
        }
      ]
    },
    {
      user: {
        id: "1",
        name: "김철수",
        profileImage: "/images/class/dummy_profile_image.png",
      },
      content: {
        id: "1",
        date: "2024-08-22",
        text: "영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
        images: [
          "/images/class/default_video.png",
          "/images/class/default_video.png",
          "/images/class/default_video.png",
        ],
        isCommercial: false,
      },
      likes: [
        {
          id: "1",
          name: "홍길동",
          profileImage: "/images/class/dummy_profile_image.png",
        },
        {
          id: "1",
          name: "홍길동",
          profileImage: "/images/class/dummy_profile_image.png",
        },
        {
          id: "1",
          name: "홍길동",
          profileImage: "/images/class/dummy_profile_image.png",
        },
      ],
      comments: [
        {
          id: "1",
          name: "김영희",
          profileImage: "/images/class/dummy_profile_image.png",
          text: "와우 대단하다! 영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
          likes: 5,
          isLiked: true,
          date: "2024-08-22",
          replies: [
            {
              id: "2",
              name: "박준호",
              profileImage: "/images/class/dummy_profile_image2.png",
              text: "정말 대단해요! 저도 김영희님처럼 열심히 해야겠어요.",
              likes: 3,
              isLiked: false,
              date: "2024-08-22",
              replies: []
            },
            {
              id: "4",
              name: "최영철",
              profileImage: "/images/class/dummy_profile_image4.png",
              text: "함께 해요!",
              likes: 1,
              isLiked: false,
              date: "2024-08-22",
              replies: []
            }
          ]
        },
        {
          id: "3",
          name: "이수진",
          profileImage: "/images/class/dummy_profile_image3.png",
          text: "저도요! 모두 함께 힘내요!",
          likes: 2,
          isLiked: true,
          date: "2024-08-22",
          replies: []
        }
      ]
    },
  ] as IFeedItem[],
});

const loading = ref(false);

// UI ========================================

const tabMain = {
  list: [
    MAIN_TAB.ALL,
    MAIN_TAB.FOLLOWING,
    MAIN_TAB.MY_COMMENTS,
  ],
  tab: ref(MAIN_TAB.ALL),
}

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

</script>


<style lang="scss" scoped></style>