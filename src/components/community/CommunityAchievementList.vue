<template>
    <div class="py-8 text-center border-b">
        <div class="text-t-lg font-weight-semibold mb-2">
            나의 대표 배지
        </div>

        <div
            v-if="!state.mainBadge"
            class="text-t-sm text-text-tertiary"
        >
            마음에 드는 배지를 골라 <br />
            대표 배지로 설정해보세요.
        </div>

        <div v-else>
            <v-img
                :src="state.mainBadge?.imageUrl"
                alt="badge"
                class="mx-auto mb-3"
                width="96"
            />

            <div class="text-t-md font-weight-medium">
                {{ state.mainBadge.name }}
            </div>
        </div>
    </div>

    <div class="font-weight-bold text-t-md pt-5 px-4 mb-4">
        <span>
            내 배지
        </span>

        <span class="text-primary">
            {{ achievedBadges.length }}
        </span>
    </div>

    <div class="flex-grow-1 overflow-y-auto py-5 px-4">
        <v-row>
            <v-col
                v-for="badgeItem in badges"
                cols="4"
            >
                <div @click="() => onClickBadge(badgeItem)">
                    <v-img
                        :src="badgeItem.isAchieved ? badgeItem.imageUrl : '/images/community/badges/locked_badge.png'"
                        alt="badge"
                        class="mb-2"
                    />

                    <div class="text-t-sm font-weight-medium text-center">
                        {{ badgeItem.name }}
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>

    <v-bottom-sheet
        v-model="state.ui.dialog"
        transition="dialog-bottom-transition"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-t-16">
            <v-img
                :src="state.currentBadge.imageUrl"
                alt="badge"
                class="mx-auto mb-3"
                width="96"
            />

            <div class="text-t-xl font-weight-semibold text-center mb-1">
                {{ state.currentBadge.name }}
            </div>

            <div class="text-t-sm font-weight-medium text-text-quaternary text-center mb-8">
                {{ state.currentBadge.description }}
            </div>

            <v-btn
                variant="outlined"
                class="flex-1-1-100"
                size="large"
                @click="() => setMainBadge(state.currentBadge)"
            >
                대표 배지 설정하기
            </v-btn>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar';


interface IBadge {
    imageUrl: string;
    name: string;
    description: string;
    isAchieved: boolean;
}

const state = reactive({
    ownBadges: [] as IBadge[],
    mainBadge: undefined as IBadge | undefined,
    currentBadge: {
        imageUrl: "",
        name: "",
        description: "",
        isAchieved: false,
    } as IBadge,
    ui: {
        dialog: false,
    }
})

const snackbar = useSnackbarStore();

onMounted(() => {
    state.ownBadges = badges;
})

const onClickBadge = (_badge: IBadge) => {
    if (!_badge.isAchieved) return;
    state.ui.dialog = true;
    state.currentBadge = _badge;
}

const setMainBadge = (_badge: IBadge) => {
    console.log(_badge);
    state.mainBadge = _badge;
    state.ui.dialog = false;
    snackbar.showSnackbar("대표 배지를 설정했습니다.");
}

const badges: IBadge[] = [
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

const achievedBadges = computed(() => {
    return badges.filter((badge) => badge.isAchieved);
})

</script>
