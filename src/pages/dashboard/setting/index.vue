<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                설정
            </span>
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto background-secondary">
            <div class="px-4 py-5 background-primary mb-2">
                <div class="text-t-sm text-text-quaternary mb-2-5">
                    앱 및 기능
                </div>

                <div class="pb-2 mb-2-5 border-b">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                        @click="onClickSetting('notification')"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            알림
                        </div>

                        <v-switch hide-details />
                    </v-sheet>
                </div>

                <div class="pb-2 mb-2-5 border-b">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                        @click="onClickSetting('sound')"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            효과음/진동
                        </div>

                        <v-switch hide-details />
                    </v-sheet>
                </div>

                <div class="pb-2 mb-2-5 border-b">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                        @click="onClickSetting('marketing')"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            마케팅 안내
                        </div>

                        <v-icon
                            icon="mdi-chevron-right"
                            class="text-text-disabled"
                        ></v-icon>
                    </v-sheet>
                </div>

                <div class="pb-2 mb-2-5 border-b">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                        @click="onClickSetting('language')"
                    >
                        <div class="text-t-sm font-weight-medium">
                            언어
                        </div>

                        <v-icon
                            icon="mdi-chevron-right"
                            class="text-text-disabled"
                        ></v-icon>
                    </v-sheet>
                </div>

                <div class="pb-2">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                        @click="onClickSetting('style')"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            학습 성향
                        </div>

                        <v-icon
                            icon="mdi-chevron-right"
                            class="text-text-disabled"
                        ></v-icon>
                    </v-sheet>
                </div>
            </div>

            <div class="flex-grow-1 px-4 py-5 background-primary">
                <div class="text-t-sm text-text-quaternary mb-2-5">
                    앱 및 기능
                </div>

                <div class="pb-2">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                        @click="onClickSetting('cache')"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            캐시 데이터
                        </div>

                        <v-icon
                            icon="mdi-chevron-right"
                            class="text-text-disabled"
                        ></v-icon>
                    </v-sheet>
                </div>
            </div>

            <div class="d-flex flex-column ga-5 pt-4 px-2-5 pb-8 background-primary">
                <v-btn
                    variant="tonal"
                    size="x-large"
                    class="primary flex-grow-0"
                    block
                    @click="state.dialogLogout = true"
                >
                    로그아웃
                </v-btn>

                <v-btn
                    variant="text"
                    class="flex-grow-0 w-fit mx-auto"
                    @click="state.dialogWithdraw = true"
                >
                    <span class="text-decoration-underline">
                        탈퇴하기
                    </span>
                </v-btn>
            </div>
        </div>

        <DialogLogout 
            v-model:dialog="state.dialogLogout"
            @onClickLogout="onClickLogout"
        />
        <DialogWithdraw 
            v-model:dialog="state.dialogWithdraw"
            @onClickWithdraw="onClickWithdraw"
        />
    </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const router = useRouter();
const { name, subscription } = storeToRefs(userStore);

const state = reactive({
    dialogLogout: false,
    dialogWithdraw: false,
});

const onClickSetting = (_settingKey: string) => {
    router.push(`/dashboard/setting/${_settingKey}`);
}

const onClickLogout = () => {
    alert('로그아웃');
}

const onClickWithdraw = () => {
    router.push(`/dashboard/setting/withdraw`);
}

// 번역
const { t } = useI18n({
    messages: {
        en: {
            main_tab: {
                coupons: "나의 쿠폰",
                history: "쿠폰 내역",
            },
        },
        ko: {
            main_tab: {
                coupons: "전체",
                history: "팔로잉",
            },
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

</script>


<style lang="scss" scoped>
:deep(.v-selection-control__wrapper) {
    order: 1;
}
</style>