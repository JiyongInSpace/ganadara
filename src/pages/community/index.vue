
<template>
  <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
    <div
      ref="refTabs"
      class="position-sticky top-0 z-1 foreground-white"
    >
      <v-tabs
        v-model="tabMain.tab.value"
        stacked
        class="flex-shrink-0 text-text-quaternary font-weight-bold main-tab px-4 my-3"
        height="30"
        selected-class="text-text-primary"
      >
        <v-tab
          v-for="tabMainItem in tabMain.list"
          :key="tabMainItem"
          :value="tabMainItem"
          min-width="auto"
          class="text-lowercase font-weight-bold px-0 mr-5"
        >
          <span class="text-t-xl">
            {{ t(`main_tab.${tabMainItem}`) }}
          </span>
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
        <CommunityFeedList :feedList="state.feedList" />
      </v-tabs-window-item>

      <v-tabs-window-item :value="MAIN_TAB.MY_COMMENTS">
        <CommunityFeedList :feedList="state.feedList" />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { IFeedItem, IUser } from '@/interfaces';

const MAIN_TAB = {
  ALL: "all",
  FOLLOWING: "following",
  MY_COMMENTS: "my_comments",
}

const state = reactive({
  feedList: [
    {
      user: {
        id: "5",
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
          id: "6",
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
  following: [
    {
      id: "1",
      name: '김철수',
      profileImage: '/images/class/dummy_profile_image.png',
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      isFollowing: false,
    },
    {
      id: "2",
      name: '김영희',
      profileImage: '/images/class/dummy_profile_image.png',
      isFollowing: true,
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: "3",
      name: '박민수',
      profileImage: '/images/class/dummy_profile_image.png',
      isFollowing: true,
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: "4",
      name: '이지수',
      profileImage: '/images/class/dummy_profile_image.png',
      isFollowing: true,
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: "5",
      name: '최영수',
      profileImage: '/images/class/dummy_profile_image.png',
      isFollowing: true,
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: "6",
      name: '이민지',
      profileImage: '/images/class/dummy_profile_image.png',
      isFollowing: true,
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: "7",
      name: '박영희',
      profileImage: '/images/class/dummy_profile_image.png',
      isFollowing: true,
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: "8",
      name: '김민수',
      profileImage: '/images/class/dummy_profile_image.png',
      isFollowing: true,
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: "9",
      name: '최지수',
      profileImage: '/images/class/dummy_profile_image.png',
      isFollowing: true,
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: "10",
      name: '박철수',
      profileImage: '/images/class/dummy_profile_image.png',
      isFollowing: true,
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    }
  ] as IUser[],
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