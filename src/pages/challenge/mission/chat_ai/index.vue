<template>
    <ChallengeTemplate :info="state.missioninfo">
        <template v-slot:title>
            AI 채팅
        </template>

        <template v-slot:content>
            <div class="pb-12">
                <v-img
                    src="/images/challenge/mission/chat_ai_big.png"
                    alt="quiz"
                    class="mb-8"
                />

                <v-btn
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    block
                    @click="onClickParticipate"
                >
                    미션 참여하고 적립하기
                </v-btn>
            </div>
        </template>

        <template v-slot:notice>
            <ul class="text-t-sm text-text-secondary">
                <li class="dot">1일 1회 참여 가능한 미션입니다.</li>
                <li class="dot">해당 미션은 개인정보 수집 및 이용 동의 및 알림 PUSH 설정 회원만 참여 가능합니다.</li>
                <li class="dot">보상 포인트 발급 시, 발급일 기준으로 90일까지 사용 가능하며 이후 자동으로 소멸됩니다.</li>
                <li class="dot">포인트 적립은 실시간이 아니며, 적립 완료 안내 팝업이 뜨더라도 실제 적립까지는 시간이 소요될 수 있습니다.</li>
                <li class="dot">적립 받은 포인트는 전체보기 > 포인트 내역에서 확인 가능합니다.</li>
                <li class="dot">AI 채팅 대화, 관련 제품 사용 정보, 위치 정보, 의견을 수집합니다.</li>
                <li class="dot">AI 채팅 대화는 지속적으로 개선되고 있으며 때때로 마이풀의 입장을 대변하지 않는 부정확하거나 불쾌감을 주거나 부적절한 정보를 제공할 수도 있습니다.</li>
                <li class="dot">일시적으로 사용자가 증가하거나 광고 정책에 맞지 않는 대상자의 경우 참여가 제한될 수 있습니다.</li>
                <li class="dot">비정상적, 불법적인 방법으로 이벤트에 참여하신 경우, 당첨 후에도 취소될 수 있습니다.</li>
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
        title: "AI와 채팅하고 포인트 받으세요!",
        description: "10회 이상 대화를 이어가면 {{포인트}}를 받을 수 있어요.",
        linkUrl: "https://www.naver.com",
    },
})

const onClickParticipate = () => {
    router.push("/dashboard/additional/ai_chat")
}

</script>
