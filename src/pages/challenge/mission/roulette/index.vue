<template>
    <ChallengeTemplate :info="state.missioninfo">
        <template v-slot:title>
            룰렛
        </template>

        <template v-slot:content>
            <div class="pb-12">
                <SvgRoulette
                    :completed="state.missionResult.completed"
                    :reward="state.missioninfo.reward"
                    @onStopRoulette="onStopRoulette"
                />
            </div>
        </template>

        <template v-slot:notice>
            <ul class="text-t-sm text-text-secondary">
                <li class="dot">1일 1회 참여 가능한 미션입니다.</li>
                <li class="dot">해당 미션는 개인정보 수집 및 이용 동의 및 알림 PUSH 설정 회원만 참여 가능합니다.</li>
                <li class="dot">보상 포인트 발급 시, 발급일 기준으로 90일까지 사용 가능하며 이후 자동으로 소멸됩니다.</li>
                <li class="dot">포인트 적립은 실시간이 아니며, 적립 완료 안내 팝업이 뜨더라도 실제 적립까지는 시간이 소요될 수 있습니다.</li>
                <li class="dot">적립 받은 포인트는 전체보기 > 포인트 내역에서 확인 가능합니다.</li>
                <li class="dot">일시적으로 사용자가 증가하거나 광고 정책에 맞지 않는 대상자의 경우 참여가 제한될 수 있습니다.</li>
                <li class="dot">비정상적, 불법적인 방법으로 이벤트에 참여하신 경우, 당첨 후에도 취소될 수 있습니다.</li>
                <li class="dot">당사 사정에 따라 조기 종료 또는 사전 고지 없이 변경하거나 종료될 수 있습니다.</li>
            </ul>
        </template>
    </ChallengeTemplate>

    <DialogGetPoint
        v-model:dialog="state.missionResult.dialog"
        :point="state.missionResult.point"
        mission="룰렛 미션"
    />
    <DialogLose v-model:dialog="state.missionResult.dialogLose" />
</template>

<script lang="ts" setup>

const state = reactive({
    missioninfo: {
        daily: true,
        point: true,
        gift: true,
        hot: true,
        title: "룰렛 돌리고 포인트 받으세요!",
        description: "최대 {{포인트}}를 받을 수 있어요.",
        linkUrl: "https://www.naver.com",
        reward: 'point' as "point" | "gift",
    },

    missionResult: {
        dialog: false,
        dialogLose: false,
        point: 0,
        completed: false,
    },
})

const rouletteInfo = [
    20, 50, 100, 5, 0, 1000
]

const onStopRoulette = (_point: number) => {
    state.missionResult.point = rouletteInfo[_point];
    state.missionResult.completed = true;

    if(state.missionResult.point === 0) {
        state.missionResult.dialogLose = true;
        return;
    } else {
        state.missionResult.dialog = true;
    }
}

</script>
