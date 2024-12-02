<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                공지사항
            </span>
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto px-4">
            <div
                v-for="item, key in state.noticeList"
                :key="key"
                class="border-b py-2"
            >
                <div
                    class="d-flex justify-space-between align-center cursor-pointer py-2"
                    v-ripple
                    @click="onClickFaqItem(item.id)"
                >
                    <div>
                        <div class="font-weight-bold mb-1">
                            {{ item.title }}
                        </div>

                        <div class="text-t-sm font-weight-medium text-text-quaternary">
                            {{ item.created_at }}
                        </div>
                    </div>

                    <v-icon
                        icon="mdi-chevron-right"
                        class="text-text-disabled"
                    />
                </div>
            </div>
        </div>

        <DialogNoticeDetails 
            v-model:dialog="dialog"
        />
    </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();

const state = reactive({
    noticeList: [
        {
            id: 1,
            title: "업데이트 안내",
            created_at: "2024-11-25T14:30:15.123Z"
        },
        {
            id: 1,
            title: "업데이트 안내",
            created_at: "2024-11-25T14:30:15.123Z"
        },
        {
            id: 1,
            title: "업데이트 안내",
            created_at: "2024-11-25T14:30:15.123Z"
        },
        {
            id: 1,
            title: "업데이트 안내",
            created_at: "2024-11-25T14:30:15.123Z"
        },
        {
            id: 1,
            title: "업데이트 안내",
            created_at: "2024-11-25T14:30:15.123Z"
        },
        {
            id: 1,
            title: "업데이트 안내",
            created_at: "2024-11-25T14:30:15.123Z"
        },
    ],
});

const dialog = ref(false);

const onClickFaqItem = (key: number) => {
    dialog.value = true;
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


<style lang="scss" scoped></style>