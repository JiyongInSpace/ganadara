<template>
    <PageTemplate space="px-4">
        <template v-slot:prepend-header>
            {{ t(`category.dashboard`) }}
        </template>

        <template v-slot:append-header>
            <v-btn
                icon
                variant="text"
                size="24"
                class="mr-5"
                @click="onClickNotice"
            >
                <v-badge
                    color="error"
                    dot
                >
                    <v-img
                        src="@/assets/icons/basic/bell.svg"
                        width="24"
                        height="24"
                    />
                </v-badge>
            </v-btn>

            <v-btn
                icon
                variant="text"
                size="24"
                @click="onClickSettings"
            >
                <v-img
                    src="@/assets/icons/basic/settings.svg"
                    width="24"
                    height="24"
                />
            </v-btn>
        </template>

        <template v-slot:content>
            <v-card
                variant="outlined"
                class="flex-shrink-0 border-none background-secondary rounded-12 pa-5 mb-5"
            >
                <div class="d-flex align-center mb-3">
                    <div className="position-relative mr-2">
                        <v-img
                            :src="profile_image"
                            alt="profile image"
                            width="52"
                            height="52"
                            class="flex-grow-0 rounded-circle overflow-hidden"
                        />

                        <v-sheet
                            height="24"
                            width="24"
                            v-ripple
                            class="position-absolute bottom-0 right-0 rounded-circle d-flex justify-center align-center cursor-pointer"
                            @click="onClickProfile"
                        >
                            <v-icon
                                icon="mdi-pencil-outline"
                                size="x-small"
                            ></v-icon>
                        </v-sheet>
                    </div>

                    <div class="text-t-lg font-weight-bold">
                        {{ name }}
                    </div>
                </div>

                <v-card
                    variant="outlined"
                    class="d-flex justify-space-between align-center background-primary border-border-primary rounded-12 py-2 pl-4 pr-2 mb-2"
                    height="56"
                >
                    <span class="text-t-sm font-weight-medium">
                        {{ t(`dashboard_language`) }}
                    </span>

                    <div class="d-flex align-center text-t-md font-weight-bold">
                        <v-img
                            :src="`/icons/country/${learning.country}.png`"
                            width="20"
                            height="20"
                            class="mr-1"
                        />

                        <span class="mr-1">
                            {{ t(`language.${learning.language}`) }}
                        </span>

                        <v-chip
                            size="small"
                            class="secondary font-weight-medium mr-2"
                            variant="outlined"
                        >
                            Lv.{{ learning.level }}
                        </v-chip>

                        <v-btn
                            icon
                            variant="text"
                            size="20"
                            @click="onClickLanguage"
                        >
                            <v-img
                                src="@/assets/icons/basic/chevron-right.svg"
                                width="20"
                                height="20"
                            />
                        </v-btn>
                    </div>
                </v-card>

                <v-card
                    variant="outlined"
                    class="rounded-12 background-primary border-border-primary py-2 pl-4 pr-2"
                >
                    <div class="d-flex justify-space-between py-2">
                        <span class="text-t-sm font-weight-medium">
                            {{ t(`dashboard_point`) }}
                        </span>


                        <div class="d-flex align-center text-t-md font-weight-bold">
                            <span class="mr-1">
                                {{ wallet.point.toLocaleString() }} P
                            </span>

                            <v-btn
                                icon
                                variant="text"
                                size="20"
                                @click="onClickPoint"
                            >
                                <v-img
                                    src="@/assets/icons/basic/chevron-right.svg"
                                    width="20"
                                    height="20"
                                />
                            </v-btn>
                        </div>
                    </div>

                    <div class="d-flex justify-space-between py-2">
                        <span class="text-t-sm font-weight-medium">
                            {{ t("dashboard_subscription") }}
                        </span>

                        <v-spacer />

                        <div
                            v-if="subscription"
                            class="d-flex align-center text-t-md font-weight-bold"
                        >
                            <div class="mr-1">
                                <span class="mr-1">
                                    {{ subscription?.planName }}
                                </span>

                                <v-chip
                                    size="small"
                                    class="brand"
                                    variant="outlined"
                                >
                                    {{ t(`billingType.${subscription?.billingType}`) }}
                                </v-chip>
                            </div>

                            <v-btn
                                icon
                                variant="text"
                                size="20"
                                @click="onClickTicket"
                            >
                                <v-img
                                    src="@/assets/icons/basic/chevron-right.svg"
                                    width="20"
                                    height="20"
                                />
                            </v-btn>
                        </div>
                    </div>
                </v-card>
            </v-card>

            <v-card
                variant="outlined"
                class="border-none background-secondary rounded-12 flex-shrink-0 d-flex flex-wrap rounded-12 pa-3 mb-4"
            >
                <v-row no-gutters>
                    <v-col
                        v-for="(dashboard_item, key) in dashboard_menu"
                        :key="key"
                        cols="3"
                    >
                        <div
                            :style="{
                                height: '72px'
                            }"
                            class="d-flex flex-column justify-center text-center cursor-pointer mx-auto mb-4"
                            @click="onClickDashboardItem(dashboard_item)"
                        >
                            <v-img
                                :src="dashboard_item.imageUrl"
                                width="40"
                                height="40"
                                class="mx-auto mb-1"
                            />

                            <span class="text-t-xs">
                                {{ t(`dashboard.${dashboard_item.title}`) }}
                            </span>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </template>

        <template v-slot:bottom>
            <div class="pa-3">
                <div class="d-flex justify-center mb-2">
                    <v-btn
                        class="mr-7"
                        variant="text"
                        @click="onClickNotification"
                    >
                        <v-icon
                            icon="mdi-bell-outline"
                            class="mr-1-5"
                            size="large"
                        />

                        <span>
                            {{ t(`dashboard_notice`) }}
                        </span>
                    </v-btn>

                    <v-btn
                        variant="text"
                        @click="onClickContact"
                    >
                        <v-icon
                            icon="mdi-help-circle-outline"
                            class="mr-1-5"
                            size="large"
                        />

                        <span>
                            {{ t(`dashboard_contact`) }}
                        </span>
                    </v-btn>
                </div>

                <div class="d-flex justify-center ga-2">
                    <v-btn
                        v-for="(sns, key) in footer_sns"
                        :key="key"
                        icon
                        size="x-small"
                        variant="text"
                        @click="onClickSns(sns.href)"
                    >
                        <v-img
                            :src="sns.imageUrl"
                            width="32"
                            height="32"
                        ></v-img>
                    </v-btn>
                </div>
            </div>
        </template>

        <template v-slot:actions>
            <app-bottom-navigation />
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import PageTemplate from '@/components/common/template/PageTemplate.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useI18n } from "vue-i18n";

const userStore = useUserStore();
const { name, profile_image, wallet, subscription, learning } = storeToRefs(userStore);
const router = useRouter();

const state = reactive({

});

// HEADER
const onClickNotice = () => {
    router.push("/dashboard/notice");
}

const onClickSettings = () => {
    router.push("/dashboard/setting");
}

// CONTENT
const onClickProfile = () => {
    router.push("/dashboard/profile");
}

const onClickLanguage = () => {
    router.push("/dashboard/setting/language");
}

const onClickPoint = () => {
    alert('onClickPoint');
}

const onClickTicket = () => {
    router.push("/dashboard/payment");
}

const onClickDashboardItem = (dashboard_item: any) => {
    if (dashboard_item.to) {
        router.push(dashboard_item.to);
        return;
    }
    alert(dashboard_item);
}


const dashboard_menu = [
    {
        imageUrl: '/images/dashboard/main/menu_learningStats.png',
        title: 'learningStats',
        to: '/dashboard/additional/statistics',
    },
    {
        imageUrl: '/images/dashboard/main/menu_learningRanking.png',
        title: 'learningRanking',
        to: '/community/ranking',
    },
    {
        imageUrl: '/images/dashboard/main/menu_shortFormLearning.png',
        title: 'shortFormLearning',
        to: '/community'
    },
    {
        imageUrl: '/images/dashboard/main/menu_reviewSession.png',
        title: 'reviewSession',
        to: '/dashboard/additional/review',
    },
    {
        imageUrl: '/images/dashboard/main/menu_levelTest.png',
        title: 'levelTest',
        to: '/dashboard/additional/level_test',
    },
    {
        imageUrl: '/images/dashboard/main/menu_aiChat.png',
        title: 'aiChat',
        to: '/dashboard/additional/ai_chat',
    },
    {
        imageUrl: '/images/dashboard/main/menu_aiTranslation.png',
        title: 'aiTranslation',
        to: '/dashboard/additional/ai_translation',
    },
    {
        imageUrl: '/images/dashboard/main/menu_learningMissions.png',
        title: 'learningMissions',
        to: '/challenge/mission/study',
    },
    {
        imageUrl: '/images/dashboard/main/menu_attendanceCheck.png',
        title: 'attendanceCheck',
        to: '/challenge/mission/check',
    },
    {
        imageUrl: '/images/dashboard/main/menu_donate.png',
        title: 'donate',
        to: '/challenge/mission/donate',
    },
    {
        imageUrl: '/images/dashboard/main/menu_badge.png',
        title: 'badge',
        to: '/dashboard/additional/badge',
    },
    {
        imageUrl: '/images/dashboard/main/menu_store.png',
        title: 'store',
        to: '/dashboard/additional/rewards',
    },
    {
        imageUrl: '/images/dashboard/main/menu_event.png',
        title: 'event',
    },
    {
        imageUrl: '/images/dashboard/main/menu_mockTest.png',
        title: 'mockTest',
        to: '/dashboard/additional/mock_test',
    },
    {
        imageUrl: '/images/dashboard/main/menu_brand.png',
        title: 'brand',
    }
]


// FOOTER
const onClickContact = () => {
    router.push("/dashboard/support");
}

const onClickNotification = () => {
    router.push("/dashboard/support/notice");
}

const onClickSns = (href: string) => {
    window.open(href, '_blank');
}


const footer_sns = [
    {
        imageUrl: '/images/dashboard/main/sns_youtube.png',
        href: 'https://www.youtube.com/channel/UC3yv7JU3aZvJj5Y1rZK4JhA',
    },
    {
        imageUrl: '/images/dashboard/main/sns_facebook.png',
        href: 'https://www.youtube.com/channel/UC3yv7JU3aZvJj5Y1rZK4JhA',
    },
    {
        imageUrl: '/images/dashboard/main/sns_insta.png',
        href: 'https://www.youtube.com/channel/UC3yv7JU3aZvJj5Y1rZK4JhA',
    },
    {
        imageUrl: '/images/dashboard/main/sns_tiktok.png',
        href: 'https://www.youtube.com/channel/UC3yv7JU3aZvJj5Y1rZK4JhA',
    },
    {
        imageUrl: '/images/dashboard/main/sns_x.png',
        href: 'https://www.youtube.com/channel/UC3yv7JU3aZvJj5Y1rZK4JhA',
    },
    {
        imageUrl: '/images/dashboard/main/sns_naver.png',
        href: 'https://www.youtube.com/channel/UC3yv7JU3aZvJj5Y1rZK4JhA',
    },
]


const { t } = useI18n({
    messages: {
        ko: {
            dashboard_language: "학습 언어",
            dashboard_point: "사용 가능 포인트",
            dashboard_subscription: "나의 이용권",
            dashboard_contact: "고객센터",
            dashboard_notice: "공지사항",
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

</script>


<style lang="scss" scoped></style>