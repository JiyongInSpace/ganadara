<template>
    <PageTemplate back-button>
        <template v-slot:center-header>
            전체 미션
        </template>

        <template v-slot:content>
            <v-chip-group
                class="flex-shrink-0 mb-2"
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

            <div>
                <ChallengeMissionList :list="filteredMissionList" />
            </div>
        </template>
    </PageTemplate>

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
            to: "roulette",
            point: 2000
        },
        {
            id: 2,
            title: "친구 초대하고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/invite.png",
            to: "invite",
            point: 2000
        },
        {
            id: 3,
            title: "퀴즈 풀고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/quiz.png",
            to: "quiz",
            point: 2000
        },
        {
            id: 4,
            title: "오늘 100% 혜택!",
            reward: "gift",
            tag: "reward",
            imageUrl: "/images/challenge/reward.png",
            to: "",
            point: 0
        },
        {
            id: 5,
            title: "AI 채팅하고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/chat_ai.png",
            to: "chat_ai",
            point: 2000
        },
        {
            id: 6,
            title: "매일매일 출석체크",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/check.png",
            to: "check",
            point: 2000
        },
        {
            id: 7,
            title: "학습도! 추가 혜택도!",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/quiz.png",
            to: "study",
            point: 2000
        },
        {
            id: 8,
            title: "커뮤니티 다녀오고",
            reward: "point",
            tag: "reward",
            imageUrl: "/images/challenge/community.png",
            to: "community",
            point: 2000
        },
        {
            id: 9,
            title: "같이하면 더 가치있는",
            reward: "social",
            tag: "donate",
            imageUrl: "/images/challenge/donate_social.png",
            to: "donate",
            point: 0
        },
        {
            id: 10,
            title: "좋은 콘텐츠를 부탁해!",
            reward: "creator",
            tag: "donate",
            imageUrl: "/images/challenge/donate_creator.png",
            to: "",
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
