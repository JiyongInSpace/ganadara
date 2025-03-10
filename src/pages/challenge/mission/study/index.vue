<template>
    <ChallengeTemplate :info="state.missioninfo">
        <template v-slot:title>
            학습 미션
        </template>


        <!-- 퍼블리싱 확인용 버튼 (개발단계에서 삭제) -->
        <template v-slot:append-header>
            <v-btn @click="onClickCompleteMission">
                <span class="text-t-xs">
                    완료하기(검수용)
                </span>
            </v-btn>
        </template>
        <!-- ------------------------------- -->

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
                            @click="onClickLink(missionItem.linkUrl)"
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
                        :disabled="computedTotalClearMission !== state.detail.missions.length || state.missioninfo.completed"
                        @click="onClickPoint"
                    >
                        포인트 적립하기
                    </v-btn>
                </div>
            </div>
        </template>

        <template v-slot:notice>
            <ul class="text-t-sm">
                <li class="dot">1일 1회 참여 가능한 미션이며, 매일 0시에 초기화됩니다.</li>
                <li class="dot">해당 미션은 개인정보 수집 및 이용 동의 및 알림 PUSH 설정 회원만 참여 가능합니다.</li>
                <li class="dot">매일 00:00 ~ 23:59 기준으로 포인트를 받을 수 있습니다.</li>
                <li class="dot">보상 포인트 발급 시, 발급일 기준으로 90일까지 사용 가능하며 이후 자동으로 소멸됩니다.</li>
                <li class="dot">포인트 적립은 실시간이 아니며, 적립 완료 안내 팝업이 뜨더라도 실제 적립까지는 시간이 소요될 수 있습니다.</li>
                <li class="dot">적립 받은 포인트는 전체보기 > 포인트 내역에서 확인 가능합니다.</li>
                <li class="dot">부당한 방법으로 이벤트에 참여한 것으로 판단되는 경우, 이벤트 보상이 지급되지 않으며 이용 제한 조치를 받을 수 있습니다.</li>
                <li class="dot">당사 사정에 따라 조기 종료 또는 사전 고지 없이 변경하거나 종료될 수 있습니다.</li>
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
        title: "꾸준하게 학습하고 포인트 받으세요! ",
        description: "학습 습관 만들고 포인트도 놓치지 마세요.",
        linkUrl: "https://www.naver.com",
        completed: false,
    },
    detail: {
        missions: [
            {
                title: "정규 학습 (영상)",
                description: "매일 레슨 하나씩 꾸준히 한다면?",
                total: 1,
                complete: 1,
                linkUrl: "/class/regular/1",
            },
            {
                title: "정규 학습 (문제풀이)",
                description: "영상으로 배우고 바로 문제를 풀어보세요.",
                total: 10,
                complete: 10,
                linkUrl: "/class/quiz/1",
            },
            {
                title: "숏폼 학습",
                description: "1분 이내 학습 콘텐츠?!",
                total: 5,
                complete: 0,
                linkUrl: "/class/shortform/1",
            },
            {
                title: "표현 저장하기 (복습)",
                description: "오늘 배운 표현들을 저장하고 복습해 보세요.",
                total: 1,
                complete: 0,
                linkUrl: "/dashboard/additional/review",
            },
            {
                title: "학습 경험치 획득",
                description: "하루 10~20분 꾸준하게 학습해 보세요.",
                total: 50,
                complete: 0,
                linkUrl: "/dashboard/additional/statistics",
            }
        ]
    }
})

const computedTotalClearMission = computed(() => {
    return state.detail.missions.filter((missionItem) => missionItem.complete >= missionItem.total).length
})

const onClickPoint = () => {
    alert('포인트 적립');
    state.missioninfo.completed = true;
}

const onClickLink = (linkUrl: string) => {
    router.push(linkUrl)
}

// 퍼블리싱 확인용 (개발단계에서 삭제) =========
const onClickCompleteMission = () => {
    state.detail.missions.forEach((missionItem) => {
        missionItem.complete = missionItem.total
    })
}
</script>
