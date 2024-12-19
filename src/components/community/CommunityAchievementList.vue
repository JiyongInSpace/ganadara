<template>
    <div class="py-8 text-center border-b">
        <div class="text-t-lg font-weight-semibold mb-2">
            {{ isMine ? "나" : state.user.name }}의 대표 배지
        </div>

        <div
            v-if="!state.mainBadge"
            class="text-t-sm text-text-tertiary"
        >
            <span v-if="!isMine">
                설정한 대표 배지가 없습니다.
            </span>

            <span v-else>
                마음에 드는 배지를 골라 <br />
                대표 배지로 설정해 보세요.
            </span>
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
            {{ isMine ? "내 배지" : state.user.name + " 배지" }}
        </span>

        <span class="text-primary ml-1">
            {{ achievedBadges.length }}
        </span>
    </div>

    <div class="flex-grow-1 overflow-y-auto py-5 px-4">
        <v-row>
            <v-col
                v-for="badgeItem in list"
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
                v-if="isMine"
                variant="outlined"
                class="flex-1-1-100"
                size="large"
                @click="() => setMainBadge(state.currentBadge)"
            >
                {{ state.mainBadge?.name == state.currentBadge.name ? "대표 배지 해제하기" : "대표 배지 설정하기" }}
            </v-btn>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
import { IBadge } from '@/interfaces';
import { useSnackbarStore } from '@/stores/snackbar';

const props = defineProps<{
    isMine?: boolean;
    list: IBadge[];
}>();

const state = reactive({
    mainBadge: undefined as IBadge | undefined,
    user: {
        name: "userNickName",
    },
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

const onClickBadge = (_badge: IBadge) => {
    if (!_badge.isAchieved) {
        snackbar.showSnackbar("잠긴 배지는 볼 수 없습니다.");
        return;
    };
    state.ui.dialog = true;
    state.currentBadge = _badge;
}

const setMainBadge = (_badge: IBadge) => {
    if (state.mainBadge == _badge) {
        state.mainBadge = undefined;
        state.ui.dialog = false;
        snackbar.showSnackbar("대표 배지를 해제했습니다.");
        return;
    }
    state.mainBadge = _badge;
    state.ui.dialog = false;
    snackbar.showSnackbar("대표 배지를 설정했습니다.");
}


const achievedBadges = computed(() => {
    return props.list.filter((badge) => badge.isAchieved);
})

</script>
