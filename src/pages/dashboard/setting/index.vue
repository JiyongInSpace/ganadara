<template>
    <PageTemplate
        space="pa-0"
        back-button
        background="secondary"
        no-spacer
    >
        <template v-slot:center-header>
            설정
        </template>

        <template v-slot:content>
            <div class="px-4 py-5 background-primary">
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

                        <v-switch
                            color="primary"
                            hide-details
                            :model-value="notification.notification1
                                || notification.notification2
                                || notification.notification3
                                "
                        />
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

                        <v-switch
                            color="primary"
                            hide-details
                            :model-value="sound"
                        />
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

                        <v-img
                            src="@/assets/icons/basic/chevron-right.svg"
                            width="24"
                            height="24"
                            class="flex-grow-0 opacity-40"
                        />
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

                        <v-img
                            src="@/assets/icons/basic/chevron-right.svg"
                            width="24"
                            height="24"
                            class="flex-grow-0 opacity-40"
                        />
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

                        <v-img
                            src="@/assets/icons/basic/chevron-right.svg"
                            width="24"
                            height="24"
                            class="flex-grow-0 opacity-40"
                        />
                    </v-sheet>
                </div>
            </div>

            <div class="flex-grow-1 px-4 py-5 background-primary">
                <div class="text-t-sm text-text-quaternary mb-2-5">
                    데이터
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

                        <v-img
                            src="@/assets/icons/basic/chevron-right.svg"
                            width="24"
                            height="24"
                            class="flex-grow-0 opacity-40"
                        />
                    </v-sheet>
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
        </template>

        <template v-slot:actions>
            <div class="d-flex flex-column ga-3 pt-4 px-2-5 pb-8 background-primary">
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
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';

const router = useRouter();
const settingStore = useSettingStore();
const { notification, sound } = storeToRefs(settingStore);


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