<template>
    <ChallengeTemplate :info="state.missioninfo">
        <template v-slot:title>
            커뮤니티 미션
        </template>

        <template v-slot:content>
            <div class="pb-12">

                <div class="d-flex justify-space-between align-center mb-3">
                    <span class="text-t-lg font-weight-bold">
                        진행 현황
                    </span>

                    <span class="text-t-sm font-weight-semibold">
                        {{ computedTotalClearMission }}/{{ state.detail.missions.length }}
                    </span>
                </div>

                <v-progress-linear
                    :max="state.detail.missions.length"
                    :model-value="computedTotalClearMission"
                    height="8"
                    rounded
                    class="mb-8"
                />

                <div class="d-flex flex-column ga-6 mb-8">
                    <div
                        v-for="(missionItem, index) in state.detail.missions"
                        :key="index"
                        class="d-flex align-center ga-3"
                    >
                        <v-card
                            class="text-t-sm font-weight-semibold rounded-circle  d-flex justify-center align-center flex-shrink-0"
                            :class="missionItem.complete >= missionItem.total ? 'bg-black' : 'background-tertiary'
                                "
                            width="24"
                            height="24"
                            elevation="0"
                        >
                            <v-icon
                                icon="mdi-check"
                                size="small"
                            ></v-icon>
                        </v-card>

                        <div class="flex-grow-1">
                            <div class="text-t-sm mb-0-5">
                                <span class="font-weight-semibold">
                                    {{ missionItem.title }}
                                </span>

                                <span class="font-weight-regular">
                                    ({{ missionItem.complete }}/{{ missionItem.total }})
                                </span>
                            </div>

                            <div class="text-t-sm">
                                {{ missionItem.description }}
                            </div>
                        </div>

                        <v-btn
                            class="px-2-5 py-1"
                            variant="outlined"
                            @click="onClickCommunity"
                        >
                            <span class="text-t-xs font-weight-semibold">
                                바로가기
                            </span>
                        </v-btn>
                    </div>
                </div>

                <div>
                    <v-btn
                        class="primary flex-1-1-100"
                        variant="tonal"
                        size="large"
                        block
                        :disabled="computedTotalClearMission !== state.detail.missions.length"
                    >
                        포인트 적립하기
                    </v-btn>
                </div>
            </div>
        </template>

        <template v-slot:notice>
            <ul class="text-t-sm">
                <li>
                    1일 1회 참여 가능한 미션입니다.
                </li>

                <li>
                    해당 미션은 개인정보 수집 및 이용 동의 및 알림 PUSH 설정 회원만 참여 가능합니다.
                </li>

                <li>
                    보상 포인트 발급 시, 발급일 기준으로 90일까지 사용 가능하며 이후 자동으로 소멸됩니다.
                </li>

                <li>
                    포인트 적립은 실시간이 아니며, 적립 완료 안내 팝업이 뜨더라도 실제 적립까지는 시간이 소요될 수 있습니다.
                </li>

                <li>
                    적립 받은 포인트는 전체 보기 > 포인트 내역에서 확인 가능합니다.
                </li>

                <li>
                    AI 채팅 대화, 관련 제품 사용 정보, 위치 정보, 의견을 수집합니다.
                </li>

                <li>
                    AI 채팅 대화는 지속적으로 개선되고 있으며 때때로 마이풀의 입장을 대변하지 않는 부정확하거나 불쾌감을 주거나 부적절한 정보를 제공할 수도 있습니다.
                </li>

                <li>
                    일시적으로 사용자가 증가하거나 광고 정책에 맞지 않는 대상자의 경우 참여가 제한될 수 있습니다.
                </li>

                <li>
                    비정상적, 불법적인 방법으로 이벤트에 참여하신 경우, 당첨 후에도 취소될 수 있습니다.
                </li>

                <li>
                    당사 사정에 따라 조기 종료 또는 사전 고지 없이 변경하거나 종료될 수 있습니다.
                </li>

            </ul>
        </template>
    </ChallengeTemplate>
</template>

<script lang="ts" setup>

const router = useRouter();

const state = reactive({
    missioninfo: {
        daily: true,
        point: true,
        gift: true,
        hot: true,
        title: "커뮤니티 참여하고 포인트 받으세요!",
        description: "하나만 참여해도 최대 {{포인트}}를 받을 수 있어요.",
        linkUrl: "https://www.naver.com",
    },
    detail: {
        missions: [
            {
                title: "피드 올리기",
                description: "소중한 순간을 공유해 보세요.",
                total: 3,
                complete: 0,
                linkUrl: "https://www.naver.com",
            },
            {
                title: "댓글 달기",
                description: "따뜻한 댓글로 소통을 시작해 보세요.",
                total: 5,
                complete: 0,
                linkUrl: "https://www.naver.com",
            },
        ]
    }
})

const computedTotalClearMission = computed(() => {
    return state.detail.missions.filter((missionItem) => missionItem.complete === missionItem.total).length
})


const onClickCommunity = () => {
    router.push("/community")
}
</script>
