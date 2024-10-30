<template>

    <div class="py-8 text-center border-b">
        <div class="text-t-lg font-weight-semibold mb-2">
            나의 대표 굿즈
        </div>

        <div
            v-if="!state.mainGood"
            class="text-t-sm text-text-tertiary"
        >
            마음에 드는 굿즈를 골라 <br />
            대표 굿즈로 설정해보세요.
        </div>

        <div v-else>
            <v-img
                :src="state.mainGood?.imageUrl"
                alt="goods"
                class="mx-auto mb-3"
                width="96"
            />

            <div class="text-t-md font-weight-medium">
                {{ state.mainGood.name }}
            </div>
        </div>
    </div>

    <div class="d-flex align-center justify-space-between pt-5 px-4 mb-4">
        <div class="font-weight-bold text-t-md ">
            <span>
                내 굿즈
            </span>
    
            <span class="text-primary">
                {{ state.ownGoods.length }}
            </span>
        </div>

        <div>
            <v-btn
                variant="text"
                size="small"
                class="px-0 ml-auto"
            >
                다른 디지털 굿즈 보러가기
            </v-btn>
        </div>
    </div>

    <div class="flex-grow-1 overflow-y-auto py-5 px-4">
        <v-row>
            <v-col
                v-for="goodItem in goods"
                cols="4"
            >
                <div @click="() => onClickGood(goodItem)">
                    <v-img
                        :src="goodItem.imageUrl"
                        alt="goods"
                        class="mb-2"
                    />

                    <div class="text-t-sm font-weight-medium text-center">
                        {{ goodItem.name }}
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
                :src="state.currentGood.imageUrl"
                alt="goods"
                class="mx-auto mb-3"
                width="96"
            />

            <div class="text-t-xl font-weight-semibold text-center mb-1">
                {{ state.currentGood.name }}
            </div>

            <div class="text-t-sm font-weight-medium text-text-quaternary text-center mb-6">
                {{ state.currentGood.description }}
            </div>

            <div class="d-flex justify-center align-center mx-auto mb-3">
                <v-img
                    :src="state.currentGood.user.profileImage"
                    alt="profile"
                    width="24"
                    height="24"
                    class="mr-2-5"
                />

                <span class="text-t-sm font-weight-semibold">
                    {{ state.currentGood.user.name }}
                </span>
            </div>

            <div class="mb-8">
                <v-chip
                    size="small"
                    class="on-brand"
                >
                    <v-icon
                        icon="mdi-wallet-outline"
                        class="mr-1"
                    />
                    {{ state.currentGood.points.toLocaleString() }} Point
                </v-chip>
            </div>

            <v-btn
                variant="outlined"
                class="flex-1-1-100"
                size="large"
                @click="() => setMainGood(state.currentGood)"
            >
                대표 굿즈 설정하기
            </v-btn>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar';

interface IGood {
    imageUrl: string;
    name: string;
    description: string;
    points: number;
    user: {
        name: string;
        profileImage: string;
    }
}

const state = reactive({
    ownGoods: [] as IGood[],
    mainGood: undefined as IGood | undefined,
    currentGood: {
        imageUrl: "",
        name: "",
        description: "",
    } as IGood,
    ui: {
        dialog: false,
    }
})

const snackbar = useSnackbarStore();

onMounted(() => {
    state.ownGoods = goods;
})

const onClickGood = (_good: IGood) => {
    state.ui.dialog = true;
    state.currentGood = _good;
}

const setMainGood = (_good: IGood) => {
    state.mainGood = _good;
    state.ui.dialog = false;
    snackbar.showSnackbar("대표 굿즈를 설정했습니다.");
}

const goods: IGood[] = [
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
