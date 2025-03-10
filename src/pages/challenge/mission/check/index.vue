<template>
    <ChallengeTemplate :info="state.missioninfo">
        <template v-slot:title>
            출석 체크
        </template>

        <template v-slot:content>
            <div class="pb-12">
                <div class="mb-10">
                    <div
                        v-for="row in computedRows"
                        :key="row"
                        class="d-flex justify-center mb-4"
                    >
                        <div
                            v-for="cardIndex in 5"
                            :key="cardIndex"
                            class="px-2 position-relative"
                        >
                            <v-card
                                v-if="isEmptyCard((row - 1) * 5 + cardIndex)"
                                :width="48"
                                :height="48"
                                elevation="0"
                                class="d-flex justify-center align-center rounded-circle border-md border-border-secondary background-tertiary"
                            >
                                <v-img
                                    src="/logo/ganadara_inactive.png"
                                    width="24"
                                    height="24"
                                />

                            </v-card>

                            <v-card
                                v-else
                                :width="48"
                                :height="48"
                                elevation="0"
                                class="d-flex justify-center align-center rounded-circle transition-all"
                                :class="{
                                    'border-md border-fg-tertiary': isActive((row - 1) * 5 + cardIndex),
                                    'border-md border-border-secondary background-tertiary':
                                        !isActive((row - 1) * 5 + cardIndex),
                                }"
                            >
                                <v-card
                                    v-if="isActive((row - 1) * 5 + cardIndex)"
                                    :width="38"
                                    :height="38"
                                    elevation="0"
                                    class="d-flex justify-center align-center rounded-circle background-tertiary"
                                >
                                    <span class="text-t-lg font-weight-semibold">
                                        {{ getCardNumber((row - 1) * 5 + cardIndex) }}
                                    </span>
                                </v-card>
                                <span
                                    v-else
                                    class="text-t-lg font-weight-semibold text-text-placeholder_subtle"
                                >
                                    {{ getCardNumber((row - 1) * 5 + cardIndex) }}
                                </span>
                            </v-card>

                            <v-chip
                                v-if="state.detail.pointStep.some((step) => step.count === getCardNumber((row - 1) * 5 + cardIndex))"
                                class="position-absolute bg-black px-2 py-0-5 text-t-xs font-weight-medium"
                                size="small"
                                :style="{
                                    bottom: '-15px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                }"
                            >
                                {{ state.detail.pointStep.find((step) => step.count === getCardNumber((row - 1) * 5 +
                                    cardIndex))?.point }}P
                            </v-chip>
                        </div>
                    </div>
                </div>


                <div class="mb-12">
                    <v-btn
                        class="primary flex-1-1-100"
                        variant="tonal"
                        size="large"
                        block
                        :disabled="state.missioninfo.completed"
                        @click="onClickCheck"
                    >
                        출석 체크하기
                    </v-btn>
                </div>

                <div>
                    <div class="text-t-lg font-weight-bold mb-3">
                        출석 체크 현황
                    </div>

                    <v-card
                        class="warning py-5 px-4"
                        variant="outlined"
                    >
                        <div class="text-t-sm text-center mb-2">
                            <v-chip
                                variant="outlined"
                                class="xxs-circle warning"
                            >
                                <v-img
                                    src="/images/challenge/mission/point.png"
                                    class="shrink-0"
                                    alt="point"
                                    width="12"
                                    height="12"
                                />
                            </v-chip>

                            <span>
                                총 지급 포인트
                            </span>
                        </div>

                        <div class="text-t-xl font-weight-bold text-center">
                            {{ state.detail.point.toLocaleString() }}
                        </div>
                    </v-card>
                </div>
            </div>
        </template>

        <template v-slot:notice>
            <ul class="text-t-sm">
                <li class="dot">1일 1회 참여 가능한 미션입니다.</li>
                <li class="dot">해당 미션은 개인정보 수집 및 이용 동의 및 알림 PUSH 설정 회원만 참여 가능합니다.</li>
                <li class="dot">출석체크는 매월 1일에 초기화됩니다.</li>
                <li class="dot">매일 00:00 ~ 23:59 기준 출석 체크 포인트를 받을 수 있습니다.</li>
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
import { transform } from 'typescript';

const state = reactive({
    missioninfo: {
        daily: true,
        point: true,
        gift: true,
        hot: true,
        title: "출석 체크하고 포인트 받으세요!",
        description: "누적 출석일 수에 따라 포인트를 받을 수 있어요.",
        linkUrl: "https://www.naver.com",
        completed: false,
    },
    detail: {
        totalCards: 28, // 총 카드 개수
        activeCount: 4, // 현재 활성화된 카드 수
        pointStep: [
            {
                count: 7,
                point: 30,
            },
            {
                count: 15,
                point: 50,
            },
            {
                count: 28,
                point: 100,
            }
        ],
        point: 99999999
    }
})

const onClickCheck = () => {
    markAttendance();
    state.missioninfo.completed = true;
}

// 총 행 갯수
const computedRows = computed(() => Math.ceil(state.detail.totalCards / 5));

// isActive
const isActive = (index: number) => {
    const cardNumber = getCardNumber(index);
    return cardNumber > 0 && cardNumber <= state.detail.activeCount;
};

// markAttendance
const markAttendance = () => {
    state.detail.activeCount += 1;
}


const getCardNumber = (index: number) => {
    // 각 위치에 맞는 카드 번호 반환
    if (index === 1 || index === 30) {
        return 0; // 맨 앞(1번)과 맨 뒤(30번)은 비어있는 카드
    }
    return index - 1; // 실제 번호는 2~29를 1~28로 매핑
};

const isEmptyCard = (index: number) => {
    const cardNumber = getCardNumber(index);
    return cardNumber === 0;
}

</script>
