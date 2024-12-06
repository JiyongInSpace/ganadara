<template>
    <PageTemplate
        space="pa-0"
        back-button
        no-gap
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                {{ state.user.nickName }}
            </span>
        </template>

        <template v-slot:content>
            <div>
                <v-tabs
                    v-model="tabMain.tab.value"
                    align-tabs="center"
                    stacked
                    grow
                    height="48"
                >
                    <v-tab
                        v-for="(mainTabItem, i) in tabMain.list"
                        :key="i"
                        :value="mainTabItem"
                        class="border-b flex-1-1-100"
                    >
                        {{ t(mainTabItem) }}
                    </v-tab>
                </v-tabs>
            </div>

            <v-tabs-window v-model="tabMain.tab.value">
                <v-tabs-window-item value="follow">
                    <CommunityFollowing
                        :followList="state.follow"
                        follower
                    />
                </v-tabs-window-item>

                <v-tabs-window-item value="follower">
                    <CommunityFollowing
                        :followList="state.follower"
                    />
                </v-tabs-window-item>
            </v-tabs-window>
        </template>

        <template v-slot:bottom>
        </template>

        <template v-slot:actions>
            <app-bottom-navigation />
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { IUser } from "@/interfaces";
import { useI18n } from "vue-i18n";

const tabMain = {
    list: [
        'follow',
        'follower',
    ],
    tab: ref('follow'),
}

onMounted(() => {
    // 데이터
    state.follow = dummy_follower;
    state.follower = dummy_follower;
});

const state = reactive({
    user: {
        name: 'userName',
        nickName: 'UserNickName',
        description: 'Descriptions',
        following: 9999,
        follower: 9999,
        rank: 9999,
        contents: 9999,
    },
    follow: [] as IUser[],
    follower: [] as IUser[],
});

const dummy_follower = [
    {
        id: "1",
        name: '김철수',
        profileImage: '/images/class/dummy_profile_image.png',
        description: "lorem ipsum dolor",
        isFollowing: false,
    },
    {
        id: "2",
        name: '김영희',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor",
    },
    {
        id: "3",
        name: '박민수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: false,
        description: "lorem ipsum dolor",
    },
    {
        id: "4",
        name: '이지수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor",
    },
    {
        id: "5",
        name: '최영수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: false,
        description: "lorem ipsum dolor",
    },
    {
        id: "6",
        name: '이민지',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor",
    },
    {
        id: "7",
        name: '박영희',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor",
    },
    {
        id: "8",
        name: '김민수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor",
    },
    {
        id: "9",
        name: '최지수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor",
    },
    {
        id: "10",
        name: '박철수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor",
    }
] as IUser[];

const { t } = useI18n({
    messages: {
        ko: {
            follow: "팔로우",
            following: "팔로잉",
            follower: "팔로워",
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});
</script>

<style lang="scss" scoped>
:deep(.v-list-item__spacer) {
    width: 8px !important;
}
</style>