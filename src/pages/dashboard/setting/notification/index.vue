<template>
    <PageTemplate
        space="pa-0"
        background="secondary"
        back-button
        no-spacer
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                알림
            </span>
        </template>

        <template v-slot:content>
            <div class="px-4 py-5 mb-2 background-primary">
                <div class="text-t-sm text-text-quaternary mb-5">
                    퀴즈 알림
                </div>

                <div class="pb-2 mb-2-5 border-b">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                        @change="onChange"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            알림 내용1
                        </div>

                        <v-switch
                            color="primary"
                            v-model="state.notification1"
                            hide-details
                        />
                    </v-sheet>
                </div>

                <div class="pb-2 mb-2-5">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                        @change="onChange"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            알림 내용2
                        </div>

                        <v-switch
                            color="primary"
                            v-model="state.notification2"
                            hide-details
                        />
                    </v-sheet>
                </div>
            </div>

            <div class="flex-grow-1 px-4 py-5 background-primary">
                <div class="text-t-sm text-text-quaternary mb-2-5">
                    학습 및 시스템 관련 이메일
                </div>

                <div class="pb-2">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            알림 받기
                        </div>

                        <v-switch
                            color="primary"
                            v-model="state.notification3"
                            hide-details
                        />
                    </v-sheet>
                </div>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const router = useRouter();

const state = reactive({
    notification1: false,
    notification2: false,
    notification3: false,
});

const onChange = () => {
    console.log(state);
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