<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                유저네임
            </span>

            <v-spacer />
        </div>

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
                    {{ mainTabItem }}
                </v-tab>
            </v-tabs>
        </div>

        <CommunityAchievementList v-if="tabMain.tab.value == 'achievement'" />
        <CommunityGoodsList v-if="tabMain.tab.value == 'goods'" />

        <v-spacer />

        <app-bottom-navigation />
    </v-container>
</template>

<script lang="ts" setup>
import { IUser } from "@/interfaces";

const tabMain = {
    list: [
        'achievement',
        'goods',
    ],
    tab: ref('achievement'),
}

onMounted(() => {
    // 데이터
    state.following = dummy_follower;
    state.follower = dummy_follower;
});

const state = reactive({
    following: [] as IUser[],
    follower: [] as IUser[],
});

const dummy_follower = [
    {
        id: "1",
        name: '김철수',
        profileImage: '/images/class/dummy_profile_image.png',
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        isFollowing: false,
    },
    {
        id: "2",
        name: '김영희',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
        id: "3",
        name: '박민수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
        id: "4",
        name: '이지수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
        id: "5",
        name: '최영수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
        id: "6",
        name: '이민지',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
        id: "7",
        name: '박영희',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
        id: "8",
        name: '김민수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
        id: "9",
        name: '최지수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
        id: "10",
        name: '박철수',
        profileImage: '/images/class/dummy_profile_image.png',
        isFollowing: true,
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    }
] as IUser[];

</script>

<style lang="scss" scoped>
:deep(.v-list-item__spacer) {
    width: 8px !important;
}
</style>