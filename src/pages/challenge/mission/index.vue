<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                전체 미션
            </span>

            <v-spacer />
        </div>

        <v-chip-group
            class="px-4 py-6 flex-shrink-0"
            selected-class="bg-black text-text-primary_on-brand"
            v-model="selectedContentCategory"
            column
        >
            <v-chip
                v-for="tag in state.tagList"
                :key="tag.key"
                :value="tag.key"
                variant="outlined"
                size="small"
                class="border-border-primary my-0 ml-0 mr-2"
            >
                <span v-text="tag.value" />
            </v-chip>
        </v-chip-group>

        <div class="px-4">
            <ChallengeMissionList :list="filteredMissionList" />
        </div>
    </v-container>
</template>

<script lang="ts" setup>

const selectedContentCategory = ref("all");

const state = reactive({
    tagList: [
        {
            key: "all",
            value: "전체",
        },
        {
            key: "reward",
            value: "혜택",
        },
        {
            key: "donate",
            value: "후원",
        },
    ],
    missionList: [
        {
            id: 1,
            title: "오늘도 룰렛 돌리고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/point.png",
            point: 2000
        },
        {
            id: 2,
            title: "친구 초대하고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/invite.png",
            point: 2000
        },
        {
            id: 3,
            title: "퀴즈 풀고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/quiz.png",
            point: 2000
        },
        {
            id: 4,
            title: "오늘 100% 혜택!",
            reward: "gift",
            tag: "reward",
            imageUrl: "/images/challenge/reward.png",
            point: 0
        },
        {
            id: 5,
            title: "AI 채팅하고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/chat_ai.png",
            point: 2000
        },
        {
            id: 6,
            title: "매일매일 출석체크",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/check.png",
            point: 2000
        },
        {
            id: 7,
            title: "학습도! 추가 혜택도!",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/quiz.png",
            point: 2000
        },
        {
            id: 8,
            title: "커뮤니티 다녀오고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/community.png",
            point: 2000
        },
        {
            id: 9,
            title: "같이하면 더 가치있는",
            reward: "social",
            tag: "donate",
            imageUrl: "/images/challenge/donate_social.png",
            point: 0
        },
        {
            id: 10,
            title: "좋은 콘텐츠를 부탁해!",
            reward: "creator",
            tag: "donate",
            imageUrl: "/images/challenge/donate_creator.png",
            point: 0
        },
    ]
})

const filteredMissionList = computed(() => {
    return state.missionList.filter((mission) => {
        if (selectedContentCategory.value === "all") {
            return true;
        }

        return mission.tag === selectedContentCategory.value;
    });
});

</script>
