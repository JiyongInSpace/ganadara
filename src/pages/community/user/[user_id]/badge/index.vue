<template>
    <PageTemplate
        space="pa-0"
        back-button
    >
        <template v-slot:center-header>
            {{ t("badge") }}
        </template>

        <template v-slot:content>
            <div>
                <v-tabs
                    v-model="tabMain.tab.value"
                    align-tabs="center"
                    stacked
                    grow
                    height="48"
                >
                    <v-tab
                        v-for="(mainTabItem, i) in tabMain.list"
                        :key="i"
                        :value="mainTabItem"
                        class="border-b flex-1-1-100"
                    >
                        {{ t(mainTabItem) }}
                    </v-tab>
                </v-tabs>
            </div>

            <CommunityAchievementList
                v-if="tabMain.tab.value == 'achievement'"
                :list="state.badges"
                :isMine="isMypage"
            />

            <CommunityGoodsList
                v-if="tabMain.tab.value == 'goods'"
                :list="state.goods"
                :isMine="isMypage"
            />
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { IBadge, IGoods } from "@/interfaces";
import { useI18n } from "vue-i18n";
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { RouteLocationNormalizedLoaded } from "vue-router/auto";

const userStore = useUserStore();
const route = useRoute() as RouteLocationNormalizedLoaded & { params: { user_id: string } };
const { id } = storeToRefs(userStore);

const tabMain = {
    list: [
        'achievement',
        'goods',
    ],
    tab: ref('achievement'),
}

onMounted(() => {
    // 데이터
    state.badges = dummy_badges;
    state.goods = dummy_goods;
});

const state = reactive({
    user: {
        name: 'userName',
        nickName: 'UserNickName',
        description: 'Descriptions',
        following: 9999,
        follower: 9999,
        rank: 9999,
        contents: 9999,
    },
    badges: [] as IBadge[],
    goods: [] as IGoods[],
});

const isMypage = computed(() => {
    // 내 페이지인지 확인 (추후 수정)
    return route.params.user_id == "3" || route.params.user_id == "4";
})

const { t } = useI18n({
    messages: {
        ko: {
            badge: "배지",
            achievement: "성과",
            goods: "디지털 굿즈",
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});
// ================================================================================================================================
const dummy_badges: IBadge[] = [
    {
        imageUrl: "/images/community/badges/badge_1.svg",
        name: "첫 번째 배지",
        description: "첫 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_2.svg",
        name: "두 번째 배지",
        description: "두 번째 배지를 획득했습니다.",
        isAchieved: false,
    },
    {
        imageUrl: "/images/community/badges/badge_3.svg",
        name: "세 번째 배지",
        description: "세 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_4.svg",
        name: "네 번째 배지",
        description: "네 번째 배지를 획득했습니다.",
        isAchieved: false,
    },
    {
        imageUrl: "/images/community/badges/badge_5.svg",
        name: "다섯 번째 배지",
        description: "다섯 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_6.svg",
        name: "여섯 번째 배지",
        description: "여섯 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_7.svg",
        name: "일곱 번째 배지",
        description: "일곱 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_8.svg",
        name: "여덟 번째 배지",
        description: "여덟 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_9.svg",
        name: "아홉 번째 배지",
        description: "아홉 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_10.svg",
        name: "열 번째 배지",
        description: "열 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_11.svg",
        name: "열한 번째 배지",
        description: "열한 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_12.svg",
        name: "열두 번째 배지",
        description: "열두 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_13.svg",
        name: "열세 번째 배지",
        description: "열세 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_14.svg",
        name: "열네 번째 배지",
        description: "열네 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_15.svg",
        name: "열다섯 번째 배지",
        description: "열다섯 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
    {
        imageUrl: "/images/community/badges/badge_16.svg",
        name: "열여섯 번째 배지",
        description: "열여섯 번째 배지를 획득했습니다.",
        isAchieved: true,
    },
]

const dummy_goods: IGoods[] = [
    {
        imageUrl: "/images/community/badges/badge_1.svg",
        name: "첫 번째 굿즈",
        description: "첫 번째 굿즈를 획득했습니다.",
        points: 1000,
        user: {
            name: "김철수",
            profileImage: "/images/class/dummy_profile_image.png",
        }
    },
    {
        imageUrl: "/images/community/badges/badge_2.svg",
        name: "두 번째 굿즈",
        description: "두 번째 굿즈를 획득했습니다.",
        points: 1000,
        user: {
            name: "김철수",
            profileImage: "/images/class/dummy_profile_image.png",
        }
    },
    {
        imageUrl: "/images/community/badges/badge_3.svg",
        name: "세 번째 굿즈",
        description: "세 번째 굿즈를 획득했습니다.",
        points: 1000,
        user: {
            name: "김철수",
            profileImage: "/images/class/dummy_profile_image.png",
        }
    },
    {
        imageUrl: "/images/community/badges/badge_4.svg",
        name: "네 번째 굿즈",
        description: "네 번째 굿즈를 획득했습니다.",
        points: 1000,
        user: {
            name: "김철수",
            profileImage: "/images/class/dummy_profile_image.png",
        }
    },
    {
        imageUrl: "/images/community/badges/badge_5.svg",
        name: "다섯 번째 굿즈",
        description: "다섯 번째 굿즈를 획득했습니다.",
        points: 1000,
        user: {
            name: "김철수",
            profileImage: "/images/class/dummy_profile_image.png",
        }
    },
    {
        imageUrl: "/images/community/badges/badge_6.svg",
        name: "여섯 번째 굿즈",
        description: "여섯 번째 굿즈를 획득했습니다.",
        points: 1000,
        user: {
            name: "김철수",
            profileImage: "/images/class/dummy_profile_image.png",
        }
    },
    {
        imageUrl: "/images/community/badges/badge_7.svg",
        name: "일곱 번째 굿즈",
        description: "일곱 번째 굿즈를 획득했습니다.",
        points: 1000,
        user: {
            name: "김철수",
            profileImage: "/images/class/dummy_profile_image.png",
        }
    },
    {
        imageUrl: "/images/community/badges/badge_8.svg",
        name: "여덟 번째 굿즈",
        description: "여덟 번째 굿즈를 획득했습니다.",
        points: 1000,
        user: {
            name: "김철수",
            profileImage: "/images/class/dummy_profile_image.png",
        }
    },
    {
        imageUrl: "/images/community/badges/badge_9.svg",
        name: "아홉 번째 굿즈",
        description: "아홉 번째 굿즈를 획득했습니다.",
        points: 1000,
        user: {
            name: "김철수",
            profileImage: "/images/class/dummy_profile_image.png",
        }
    },
]

</script>

<style lang="scss" scoped>
:deep(.v-list-item__spacer) {
    width: 8px !important;
}
</style>