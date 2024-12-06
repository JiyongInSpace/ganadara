<template>
    <PageTemplate
        space="px-4"
        back-button
    >
        <template v-slot:center-header>
            공지사항
        </template>

        <template v-slot:content>
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
                            {{ format(item.created_at, "yyyy.MM.dd") }}
                        </div>
                    </div>

                    <v-icon
                        icon="mdi-chevron-right"
                        class="text-text-disabled"
                    />
                </div>
            </div>

            <DialogNoticeDetails v-model:dialog="dialog" />
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';
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