<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                전체보기
            </span>

        </div>

        <div class="px-4">
            <v-card
                variant="outlined"
                class="border-none background-secondary rounded-12 flex-shrink-0 pa-5 mb-5"
            >
                <!-- class="rounded-12 pa-4 mb-4" -->
                <div class="d-flex align-center mb-3">
                    <div
                        className="position-relative"
                        @click="onClickProfile"
                    >
                        <v-img
                            :src="profile_image"
                            alt="profile image"
                            width="52"
                            height="52"
                            class="flex-grow-0 rounded-circle overflow-hidden mr-2"
                        />

                        <v-sheet
                            height="24"
                            width="24"
                            class="position-absolute bottom-0 right-0 rounded-circle d-flex justify-center align-center"
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
                        학습 언어
                    </span>

                    <div class="d-flex align-center text-t-md font-weight-bold">
                        <span class="mr-1">
                            {{ learning.language }}

                        </span>

                        <v-chip
                            size="small"
                            class="secondary"
                            variant="outlined"
                        >
                            Lv.{{ learning.level }}
                        </v-chip>
                        <v-icon icon="mdi-chevron-right" />
                    </div>
                </v-card>

                <v-card
                    variant="outlined"
                    class="rounded-12 background-primary border-border-primary py-2 pl-4 pr-2"
                >
                    <div class="d-flex justify-space-between py-2">
                        <span class="text-t-sm font-weight-medium">
                            사용 가능 포인트
                        </span>


                        <div class="d-flex align-center text-t-md font-weight-bold">
                            {{ wallet.point.toLocaleString() }} P

                            <v-icon icon="mdi-chevron-right" />
                        </div>
                    </div>

                    <div class="d-flex justify-space-between py-2">
                        <span class="text-t-sm font-weight-medium">
                            나의 이용권
                        </span>

                        <v-spacer />

                        <div
                            v-if="subscription"
                            class="d-flex align-center text-t-md font-weight-bold"
                        >
                            <div>
                                {{ subscription?.planName }}

                                <v-chip
                                    size="small"
                                    class="brand"
                                    variant="outlined"
                                >
                                    {{ subscription?.billingType }}
                                </v-chip>
                            </div>
                            <v-icon icon="mdi-chevron-right" />
                        </div>
                    </div>
                </v-card>
            </v-card>

            <v-card
                variant="outlined"
                class="border-none background-secondary rounded-12 flex-shrink-0 d-flex flex-wrap rounded-12 pa-3"
            >
                <div
                    v-for="(dashboard_item, key) in dashboard_menu"
                    :key="key"
                    :style="{
                        width: '80px',
                        height: '72px'
                    }"
                    class="d-flex flex-column justify-center text-center cursor-pointer mb-4"
                    @click="onClickDashboardItem(dashboard_item)"
                >
                    <v-img
                        :src="dashboard_item.imageUrl"
                        width="40"
                        height="40"
                        class="mx-auto mb-1"
                    />

                    <span class="text-t-xs">
                        {{ dashboard_item.title }}
                    </span>
                </div>
            </v-card>
        </div>

        <v-spacer />

        <div class="pa-3">
            <div class="d-flex justify-center mb-2">
                <v-btn
                    class="mr-7"
                    variant="text"
                    @click="onClickNotice"
                >
                    <v-icon
                        icon="mdi-bell-outline"
                        class="mr-1-5"
                        size="large"
                    />

                    <span>
                        공지사항
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
                        고객센터
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
                    @click="onclickSns(sns.href)"
                >
                    <v-img
                        :src="sns.imageUrl"
                        width="32"
                        height="32"
                    ></v-img>
                </v-btn>
            </div>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { name, profile_image, wallet, subscription, learning } = storeToRefs(userStore);
const router = useRouter();

const state = reactive({

});

const onClickProfile = () => {
    router.push("/dashboard/profile");
}

const onClickDashboardItem = (dashboard_item: any) => {
    if(dashboard_item.to) {
        router.push(dashboard_item.to);
        return;
    }
    alert(dashboard_item);
}

const onClickNotice = () => {
    alert('onClickNotice');
}

const onClickContact = () => {
    alert('onClickContact');
}


const onclickSns = (href: string) => {
    window.open(href, '_blank');
}

const dashboard_menu = [
    {
        imageUrl: '/images/dashboard/main/menu_learningStats.png',
        title: '학습통계',
    },
    {
        imageUrl: '/images/dashboard/main/menu_learningRanking.png',
        title: '학습랭킹',
    },
    {
        imageUrl: '/images/dashboard/main/menu_shortFormLearning.png',
        title: '숏폼학습',
    },
    {
        imageUrl: '/images/dashboard/main/menu_reviewSession.png',
        title: '복습하기',
        to: '/dashboard/additional/review',
    },
    {
        imageUrl: '/images/dashboard/main/menu_levelTest.png',
        title: '레벨테스트',
        to: '/dashboard/additional/level_test',
    },
    {
        imageUrl: '/images/dashboard/main/menu_aiChat.png',
        title: 'AI채팅',
        to: '/dashboard/additional/ai_chat',
    },
    {
        imageUrl: '/images/dashboard/main/menu_aiTranslation.png',
        title: 'AI번역',
        to: '/dashboard/additional/ai_translation',
    },
    {
        imageUrl: '/images/dashboard/main/menu_learningMissions.png',
        title: '학습미션',
    },
    {
        imageUrl: '/images/dashboard/main/menu_attendanceCheck.png',
        title: '출석체크',
    },
    {
        imageUrl: '/images/dashboard/main/menu_donate.png',
        title: '후원하기',
    },
    {
        imageUrl: '/images/dashboard/main/menu_badge.png',
        title: '배지',
    },
    {
        imageUrl: '/images/dashboard/main/menu_store.png',
        title: '스토어',
        to: '/dashboard/additional/rewards',
    },
    {
        imageUrl: '/images/dashboard/main/menu_event.png',
        title: '이벤트',
    },
    {
        imageUrl: '/images/dashboard/main/menu_mockTest.png',
        title: '모의고사',
        to: '/dashboard/additional/mock_test',
    },
    {
        imageUrl: '/images/dashboard/main/menu_brand.png',
        title: '브랜드',
    }
]

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


</script>


<style lang="scss" scoped></style>