<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                캐시 데이터
            </span>
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto">
            <div class="px-4 py-5 mb-2">
                <div class="text-t-sm text-text-quaternary mb-5">
                    가나다라/마이풀의 혜택과 소식을 알려드릴게요.
                </div>

                <div class="pb-2 mb-2-5 border-b">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            캐시 데이터 수집 허용
                        </div>

                        <v-switch
                            color="primary"
                            v-model="state.cache"
                            hide-details
                        />
                    </v-sheet>
                </div>

                <v-card
                    variant="outlined"
                    class="text-t-sm border-border-primary background-secondary py-5 px-3 rounded-8"
                    v-html="guide_text"
                >
                </v-card>
            </div>
        </div>

        <div class="d-flex flex-column ga-5 pt-4 px-2-5 pb-8 background-primary">
            <v-btn
                variant="tonal"
                block
                size="large"
                class="primary"
                @click="onClickDeleteCache"
            >
                캐시 데이터 삭제하러 가기
            </v-btn>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const router = useRouter();

const state = reactive({
    cache: false,
});

const guide_text = `
<캐시 데이터 삭제 가이드><br />
- iOS<br />
설정 열기: 홈 화면에서 "설정" 앱을 엽니다.<br />
일반 선택: 설정 메뉴에서 "일반"을 선택합니다.<br />
iPhone 저장 공간: "아이폰 저장 공간"을 클릭합니다.<br />
앱 선택: 리스트에서 캐시 데이터를 삭제할 앱을 선택합니다.<br />
앱 삭제 또는 데이터 삭제:<br />
앱을 삭제하면 해당 앱의 모든 데이터가 삭제됩니다.<br />
앱을 삭제하지 않고 캐시를 비우려면, 앱을 삭제 후 재설치해야 합니다.<br /><br />

Android<br />
설정 열기: 홈 화면에서 "설정" 앱을 엽니다.<br />
앱 선택: "앱" 또는 "애플리케이션" 메뉴를 선택합니다.<br />
앱 선택: 캐시 데이터를 삭제할 앱을 찾아 선택합니다.<br />
저장 공간 선택: "저장 공간" 또는 "스토리지"를 클릭합니다.<br />
캐시 데이터 삭제: "캐시 삭제" 또는 "캐시 데이터 삭제" 버튼을 눌러 캐시 데이터를 삭제합니다.<br />
`;

const onClickDeleteCache = () => {
    alert('캐시 데이터 삭제');
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