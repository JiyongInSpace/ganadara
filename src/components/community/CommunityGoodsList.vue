<template>
    <div class="py-8 text-center border-b">
        <div class="text-t-lg font-weight-semibold mb-2">
            {{ isMine ? "나" : state.user.name }}의 대표 굿즈
        </div>

        <div
            v-if="!state.mainGoods"
            class="text-t-sm text-text-tertiary"
        >
            <span v-if="!isMine">
                설정한 대표 굿즈가 없습니다.
            </span>

            <span v-else>
                마음에 드는 굿즈를 골라 <br />
                대표 굿즈로 설정해 보세요.
            </span>
        </div>

        <div v-else>
            <div class="position-relative w-fit mx-auto">
                <v-img
                    :src="state.mainGoods?.imageUrl"
                    alt="goods"
                    class="mx-auto mb-3"
                    width="96"
                />

                <v-img
                    class="position-absolute top-2 right-2"
                    src="/images/community/Badge.png"
                    width="24"
                    height="24"
                />
            </div>

            <div class="text-t-md font-weight-medium">
                {{ state.mainGoods.name }}
            </div>
        </div>
    </div>

    <div class="d-flex align-center justify-space-between pt-5 px-4 mb-4">
        <div class="font-weight-bold text-t-md ">
            <span>
                {{ isMine ? "내 굿즈" : state.user.name + " 굿즈" }}
            </span>

            <span class="text-primary ml-1">
                {{ list.length }}
            </span>
        </div>

        <div>
            <v-btn
                variant="text"
                size="small"
                class="px-0 ml-auto"
                @click="onClickOtherGoods"
            >
                다른 디지털 굿즈 보러 가기
            </v-btn>
        </div>
    </div>

    <div class="flex-grow-1 overflow-y-auto py-5 px-4">
        <v-row>
            <v-col
                v-for="goodItem in list"
                cols="4"
            >
                <div @click="() => onClickGood(goodItem)">
                    <div class="position-relative mx-auto">
                        <v-img
                            :src="goodItem.imageUrl"
                            alt="goods"
                            class="mb-2"
                        />

                        <v-img
                            v-if="state.mainGoods?.name == goodItem.name"
                            class="position-absolute top-2 right-2"
                            src="/images/community/Badge.png"
                            width="24"
                            height="24"
                        />
                    </div>

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
                :src="state.currentGoods.imageUrl"
                alt="goods"
                class="mx-auto mb-3"
                width="96"
            />

            <div class="text-t-xl font-weight-semibold text-center mb-1">
                {{ state.currentGoods.name }}
            </div>

            <div class="text-t-sm font-weight-medium text-text-quaternary text-center mb-6">
                {{ state.currentGoods.description }}
            </div>

            <div class="d-flex justify-center align-center mx-auto mb-3">
                <v-img
                    :src="state.currentGoods.user.profileImage"
                    alt="profile"
                    width="24"
                    height="24"
                    class="mr-2-5"
                />

                <span class="text-t-sm font-weight-semibold">
                    {{ state.currentGoods.user.name }}
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
                    {{ state.currentGoods.points.toLocaleString() }} Point
                </v-chip>
            </div>

            <v-btn
                v-if="isMine"
                variant="outlined"
                class="flex-1-1-100"
                size="large"
                @click="() => setMainGoods(state.currentGoods)"
            >
                {{ state.mainGoods?.name == state.currentGoods.name ? "대표 굿즈 해제하기" : "대표 굿즈 설정하기" }}
            </v-btn>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
import { IGoods } from '@/interfaces';
import { useSnackbarStore } from '@/stores/snackbar';

const router = useRouter();

const props = defineProps<{
    isMine?: boolean;
    list: IGoods[];
}>();

const state = reactive({
    mainGoods: undefined as IGoods | undefined,
    user: {
        name: "userNickName",
    },
    currentGoods: {
        imageUrl: "",
        name: "",
        description: "",
    } as IGoods,
    ui: {
        dialog: false,
    }
})

const snackbar = useSnackbarStore();

const onClickGood = (_good: IGoods) => {
    state.ui.dialog = true;
    state.currentGoods = _good;
}

const setMainGoods = (_good: IGoods) => {
    if (state.mainGoods == _good) {
        state.mainGoods = undefined;
        state.ui.dialog = false;
        snackbar.showSnackbar("대표 굿즈를 해제했습니다.");
        return;
    }

    state.mainGoods = _good;
    state.ui.dialog = false;
    snackbar.showSnackbar("대표 굿즈를 설정했습니다.");
}

const onClickOtherGoods = () => {
    router.push("/dashboard/additional/rewards")
}

</script>
