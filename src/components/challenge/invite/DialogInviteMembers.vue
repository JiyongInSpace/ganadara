<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                variant="text"
                class="pa-0"
                size="small"
                v-bind="activatorProps"
            >
                자세히 보기
            </v-btn>
        </template>

        <v-card class="pt-9 pb-5 rounded-t-16 elevation-0">
            <div class="text-t-xl font-weight-bold text-center mb-0-5">
                친구 초대 현황
            </div>

            <div class="text-t-sm text-center mb-7">
                총 {{ state.donationNumber }}명
            </div>

            <div
                v-for="(member, index) in state.donateMembers"
                :key="index"
                class="d-flex align-center px-4 mb-3"
            >
                <v-img
                    :width="32"
                    :height="32"
                    :src="member.profileImage"
                    class="flex-grow-0 mr-2-5"
                ></v-img>

                <div class="text-t-sm font-weight-semibold">{{ member.name }}</div>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
interface Donation {
    date: string;
    amount: string;
    organization: string;
    description: string;
}

const dialog = defineModel("dialog");

const state = reactive({
    donationNumber: 16,
    donateMembers: [
        {
            id: "1",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "2",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "3",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "1",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "2",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "3",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "1",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "2",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "3",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "3",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "1",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "2",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "3",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "1",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "2",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
        {
            id: "3",
            name: "홍길동",
            profileImage: "/images/class/dummy_profile_image.png",
        },
    ],
});

</script>

<style lang="scss" scoped></style>
