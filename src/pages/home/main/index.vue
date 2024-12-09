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
        class="flex-grow-0 mr-3-5"
      />

      <v-select
        v-model="state.category"
        :items="sort_options"
        return-object
        class="flex-grow-0 background-primary"
        hide-details
        flat
        variant="solo"
        item-title="code"
        item-text="code"
        item-value="value"
        density="compact"
        bg-color="bg-primary"
      >
        <template v-slot:prepend-item>
          <div class="pt-1 px-4 pb-3 border-b">
            <span class="text-t-sm font-weight-semibold">
              언어 변경
            </span>
          </div>
        </template>

        <template v-slot:selection="{ item }">
          <div class="d-flex align-center text-t-sm font-weight-semibold mt-1">
            <v-img
              :src="`/icons/country/${item.value}.png`"
              width="24"
              height="24"
              class="flex-shrink-0 mr-1-5"
            />

            <span class="text-t-sm font-weight-medium">
              {{ item.value }}
            </span>
          </div>
        </template>

        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :title="t(`language.${item.title}`)"
            class="text-t-sm font-weight-medium"
            :style="{
              minWidth: '140px',
            }"
          >
            <template v-slot:prepend>
              <v-img
                :src="`/icons/country/${item.value}.png`"
                width="24"
                height="24"
                class="flex-shrink-0 mr-1-5"
              />
            </template>
          </v-list-item>
        </template>
      </v-select>
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
        {{ t(`category.category1`) }}
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
        {{ t(`category.category2`) }}
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
        {{ t(`category.category3`) }}
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
        {{ t(`category.category4`) }}
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
        {{ t(`category.category5`) }}
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
        {{ t(`category.category6`) }}
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
            {{ t(`category.category7`) }}
          </span>

          <v-btn
            variant="text"
            size="small"
            class="px-0"
            @click="onClickTotalDailyMission"
          >
            {{ t(`view_all`) }}

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
            className="d-flex flex-column justify-center text-center cursor-pointer flex-1-1-100 px-5 py-4"
            @click="() => onClickDailyMission(dailyMissionItem)"
          >
            <v-img
              :src="dailyMissionItem.imageUrl"
              height="56"
              width="56"
              class="mx-auto mb-2 rounded-circle"
            />

            <div
              class="text-t-md font-weight-semibold"
              :style="{
                height: '48px'
              }"
            >
              {{ t(`mission.${dailyMissionItem.key}`) }}
            </div>
          </div>
        </div>
      </div>

      <div class="py-8">
        <div class="text-t-lg font-weight-bold px-4 mb-3">
          {{ t(`category.category8`) }}
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
              value: t(`regular_user`),
            }, {
              key: '2',
              value: t(`creator`),
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

        <swiper
          :slides-per-view="'auto'"
          :space-between="30"
          :pagination="{
            clickable: true,
          }"
          :modules="modules"
          class="px-4 ga-4 mb-3 pb-8"
        >
          <swiper-slide
            v-for="(popularUserItem, index) in state.popularUserList"
            :key="index"
            :style="{
              width: '340px',
            }"
          >
            <v-card
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
          </swiper-slide>
        </swiper>
      </div>

      <v-sheet
        class="mx-4 pa-4 rounded-8 background-secondary mb-16"
        color="bg-secondary"
      >
        <div class="d-flex align-center ga-4 mb-4">
          <v-img
            src="/images/home/ai.png"
            height="60"
            width="60"
            cover
            class="rounded-circle flex-grow-0"
          />

          <div>
            <div class="text-t-sm mb-0-5">
              {{ t("banner_title") }}
            </div>

            <div class="text-t-md font-weight-semibold">
              {{ t("banner_subtitle") }}
            </div>
          </div>
        </div>

        <v-btn
          block
          variant="tonal"
          class="primary"
          @click="onClickChat"
        >
          {{ t("banner_button") }}
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
import { useLangStore } from '@/stores/lang'
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

// Swiper 모듈 설정
const modules = ref([Pagination]);

const router = useRouter();
const langStore = useLangStore();
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
  category: {
    code: 'ko' as any,
    value: 'KR',
  },
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
    title: "룰렛",
    key: "roulette",
    imageUrl: "/images/home/roulette.png",
  },
  {
    title: "친구초대",
    key: "invite",
    imageUrl: "/images/home/invite.png",
  },
  {
    title: "퀴즈",
    key: "quiz",
    imageUrl: "/images/home/quiz.png",
  },
  {
    title: "선물",
    key: "gift",
    imageUrl: "/images/home/gift.png",
  },
];



const dummy_shortform = [
  {
    id: "1",
    thumbnail: "/images/home/dummy_thumbnail2.png",
    title: "Short-form Title",
    description: "Short-form Description",
  },
  {
    id: "1",
    thumbnail: "/images/home/dummy_thumbnail2.png",
    title: "Short-form Title",
    description: "Short-form Description",
  },
  {
    id: "1",
    thumbnail: "/images/home/dummy_thumbnail2.png",
    title: "Short-form Title",
    description: "Short-form Description",
  },
  {
    id: "1",
    thumbnail: "/images/home/dummy_thumbnail2.png",
    title: "Short-form Title",
    description: "Short-form Description",
  },
  {
    id: "1",
    thumbnail: "/images/home/dummy_thumbnail2.png",
    title: "Short-form Title",
    description: "Short-form Description",
  },
  {
    id: "1",
    thumbnail: "/images/home/dummy_thumbnail2.png",
    title: "Short-form Title",
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
    content: "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
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
  {
    id: "2",
    name: "creator2",
    profileImage: "/images/class/dummy_profile_image.png",
    content: "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
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
  router.push("/challenge/mission/" + _mission.key)
}

const onClickChat = () => {
  router.push("/dashboard/additional/ai_chat")
}


const sort_options = [
  {
    code: 'ko',
    value: 'KR',
  },
  {
    code: 'en',
    value: 'US',
  },
  {
    code: 'cn',
    value: 'CN',
  },
  {
    code: 'sp',
    value: 'ES',
  },
  {
    code: 'vi',
    value: 'VN',
  },
  {
    code: 'jp',
    value: 'JP',
  },
  {
    code: 'fr',
    value: 'FR',
  },
]

// 다국어
const { t, locale } = useI18n({
  messages: {
    ko: {
      language: {
        ko: "한국어",
        en: "영어",
        cn: "중국어",
        sp: "스페인어",
        vi: "베트남어",
        jp: "일본어",
        fr: "프랑스어",
      },
      category: {
        category1: "숏폼",
        category2: "최근 학습",
        category3: "신규 영상",
        category4: "내가 좋아할 만한 영상",
        category5: "테마 영상",
        category6: "놓치면 안 되는 따끈한 인기 콘텐츠",
        category7: "데일리 미션",
        category8: "인기 유저",
      },
      view_all: "전체 보기",
      regular_user: "일반유저",
      creator: "크리에이터",
      banner_title: "학습언어로 채팅하고 싶다면?",
      banner_subtitle: "AI랑 채팅하기",
      banner_button: "AI랑 채팅하러 가기",
      mission: {
        roulette: "룰렛",
        invite: "친구초대",
        quiz: "퀴즈",
        gift: "선물",
      }
    },
    en: {
      language: {
        ko: "Korean",
        en: "English",
        cn: "Chinese",
        sp: "Spanish",
        vi: "Vietnamese",
        jp: "Japanese",
        fr: "French",
      },
      category: {
        category1: "Short-form",
        category2: "Recent Studies",
        category3: "New Videos",
        category4: "Must-See Popular Content",
        category5: "Themed Videos",
        category6: "Must-see hot trending content",
        category7: "Daily Mission",
        category8: "Popular User",
      },
      view_all: "View All",
      regular_user: "Regular User",
      creator: "Creator",
      banner_title: "If you want to chat with AI",
      banner_subtitle: "Chat with AI",
      banner_button: "Go Chat with AI",
      mission: {
        roulette: "Roulette",
        invite: "Invite Friends",
        quiz: "Quiz",
        gift: "Gift",
      }
    },
    cn: {
      language: {
        ko: "한국어",
        en: "영어",
        cn: "중국어",
        sp: "스페인어",
        vi: "베트남어",
        jp: "일본어",
        fr: "프랑스어",
      },
      category: {
        category1: "简式",
        category2: "最近的研究",
        category3: "新视频",
        category4: "必看热门内容",
        category5: "主题视频",
        category6: "必看的热门趋势内容",
        category7: "每日任务",
        category8: "热门用户",
      },
      view_all: "查看全部",
      regular_user: "普通用户",
      creator: "创作者",
      banner_title: "如果您想与人工智能聊天",
      banner_subtitle: "与 AI 聊天",
      banner_button: "去与 AI 聊天",
      mission: {
        roulette: "轮盘",
        invite: "邀请好友",
        quiz: "测验",
        gift: "礼物",
      }
    },
    sp: {
      language: {
        ko: "Korean",
        en: "English",
        cn: "Chinese",
        sp: "Spanish",
        vi: "Vietnamese",
        jp: "Japanese",
        fr: "French",
      },
      category: {
        category1: "Formulario corto",
        category2: "Estudios Recientes",
        category3: "Nuevos Vídeos",
        category4: "Contenido Popular que Debes Ver",
        category5: "Vídeos Temáticos",
        category6: "Contenido de tendencia caliente que no te puedes perder",
        category7: "Misión diaria",
        category8: "Usuario popular",
      },
      view_all: "Ver todo",
      regular_user: "Usuario regular",
      creator: "Creador",
      banner_title: "Si quieres chatear con IA",
      banner_subtitle: "Chatear con IA",
      banner_button: "Ir a chatear con IA",
      mission: {
        roulette: "Ruleta",
        invite: "Invitar amigos",
        quiz: "Quiz",
        gift: "Regalo",
      }
    },
    vi: {
      language: {
        ko: "Korean",
        en: "English",
        cn: "Chinese",
        sp: "Spanish",
        vi: "Vietnamese",
        jp: "Japanese",
        fr: "French",
      },
      category: {
        category1: "Biểu mẫu ngắn",
        category2: "Các Nghiên Cứu Gần Đây",
        category3: "Video Mới",
        category4: "Nội Dung Phổ Biến Cần Xem",
        category5: "Video Theo Chủ Đề",
        category6: "Nội dung nổi bật đáng xem",
        category7: "Nhiệm vụ hàng ngày",
        category8: "Người Dùng Phổ Biến",
      },
      view_all: "Xem Tất cả",
      regular_user: "Người Dùng Thường Xuyên",
      creator: "Người Tạo Nội dung",
      banner_title: "Nếu bạn muốn trò chuyện với trí tuệ nhân tạo?",
      banner_subtitle: "Trò chuyện với Trí Tuệ Nhân Tạo",
      banner_button: "Đi Trò chuyện với Trí Tuệ Nhân Tạo",
      mission: {
        roulette: "Rơle",
        invite: "Mời Bạn Bè",
        quiz: "Trắc nghiệm",
        gift: "Quà tặng",
      }
    },
    jp: {
      language: {
        ko: "Korean",
        en: "English",
        cn: "Chinese",
        sp: "Spanish",
        vi: "Vietnamese",
        jp: "Japanese",
        fr: "French",
      },
      category: {
        category1: "短い形式",
        category2: "最近の研究",
        category3: "新しい動画",
        category4: "必見の人気コンテンツ",
        category5: "テーマ別動画",
        category6: "必見のホットなトレンドコンテンツ",
        category7: "デイリーミッション",
        category8: "人気ユーザー",
      },
      view_all: "すべてを表示",
      regular_user: "通常ユーザー",
      creator: "クリエイター",
      banner_title: "AIとチャットしたい場合",
      banner_subtitle: "AIとチャット",
      banner_button: "AIとチャットに移動",
      mission: {
        roulette: "ルーレット",
        invite: "友達を招待",
        quiz: "クイズ",
        gift: "ギフト",
      }
    },
    fr: {
      language: {
        ko: "Korean",
        en: "English",
        cn: "Chinese",
        sp: "Spanish",
        vi: "Vietnamese",
        jp: "Japanese",
        fr: "French",
      },
      category: {
        category1: "Forme courte",
        category2: "Études Récentes",
        category3: "Nouvelles Vidéos",
        category4: "Contenu Populaire à Voir Absolument",
        category5: "Vidéos Thématiques",
        category6: "Contenu Tendance à ne pas Manquer",
        category7: "Mission Quotidienne",
        category8: "Utilisateur Populaire",
      },
      view_all: "Voir Tout",
      regular_user: "Utilisateur Régulier",
      creator: "Créateur",
      banner_title: "Si vous souhaitez discuter avec une IA",
      banner_subtitle: "Discuter avec l'IA",
      banner_button: "Aller Discuter avec l'IA",
      mission: {
        roulette: "Roulette",
        invite: "Inviter des Amis",
        quiz: "Quiz",
        gift: "Cadeau",
      }
    },
  },
  inheritLocale: true, // 전역 locale 상속
  useScope: "local", // 로컬 스코프 설정
});

watch(
  () => state.category,
  () => {
    locale.value = state.category.code;
    langStore.setLang(state.category.code);
  },
  {
    immediate: true
  }
)

</script>


<style lang="scss" scoped>
:deep(.v-select) {
  &.v-select--single .v-field__input {
    padding: 0 0 !important;
  }
}

:deep(.swiper-pagination-bullet-active) {
  background: var('--v-fg-brand-primary') !important;
}
</style>
