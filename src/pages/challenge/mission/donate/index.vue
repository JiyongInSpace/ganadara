<template>
    <ChallengeTemplate :info="state.missioninfo">
        <template v-slot:title>
            후원
        </template>

        <template v-slot:content>
            <div class="pb-12">
                <div class="d-flex justify-space-between mb-3">
                    <div class="text-t-lg font-weight-bold">
                        나의 후원 현황
                    </div>

                    <DialogMyDonation />
                </div>

                <div class="mb-12">
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
                                총 후원 포인트
                            </span>
                        </div>

                        <div class="text-t-xl font-weight-bold text-center">
                            {{ state.detail.point.toLocaleString() }}
                        </div>
                    </v-card>
                </div>

                <div class="d-flex justify-space-between  mb-3">
                    <div class="text-t-lg font-weight-bold">
                        진행 중인 후원
                    </div>

                    <v-btn
                        variant="text"
                        class="pa-0"
                        size="small"
                        @click="onClickAllDonation"
                    >
                        전체 보기
                    </v-btn>
                </div>

                <div>
                    <div
                        v-for="donationItem in state.detail.donationInProgress"
                        class="d-flex mb-5"
                    >
                        <v-img
                            :src="donationItem.thumbnailImage"
                            width="80"
                            height="80"
                            class="flex-grow-0 mr-2"
                        />

                        <div class="flex-grow-1 truncate">
                            <div class="text-t-xs font-weight-medium text-info">
                                {{ donationItem.group }}
                            </div>

                            <div class="font-weight-semibold">
                                {{ donationItem.title }}
                            </div>

                            <div class="text-t-sm truncate mb-2">
                                {{ donationItem.description }}
                            </div>

                            <v-progress-linear
                                :max="100"
                                :model-value="donationItem.percent"
                                height="8"
                                rounded
                                class="mb-0-5"
                            />

                            <div class="d-flex justify-space-between">
                                <div>
                                    <span class="font-weight-bold">
                                        {{ donationItem.percent }}%
                                    </span>
                                </div>

                                <div>
                                    <span class="font-weight-bold">
                                        {{ donationItem.donation.toLocaleString() }}
                                    </span>
                                    <span>원</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
        title: "같이 하면 더 가치 있는 후원",
        description: "더 나은 세상 만들기에 함께해 주세요.",
        linkUrl: "https://www.naver.com",
    },
    detail: {
        point: 100000,
        donationInProgress: [
            {
                id: "1",
                group: "아동복지재단",
                title: "어린이 체험 교육 학습비 후원",
                description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
                thumbnailImage: "/images/class/dummy_profile_image.png",
                percent: 80,
                donation: 999999,
            },
            {
                id: "2",
                group: "아동복지재단",
                title: "어린이 체험 교육 학습비 후원",
                description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
                thumbnailImage: "/images/class/dummy_profile_image.png",
                percent: 80,
                donation: 999999,
            },
            {
                id: "3",
                group: "아동복지재단",
                title: "어린이 체험 교육 학습비 후원",
                description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
                thumbnailImage: "/images/class/dummy_profile_image.png",
                percent: 80,
                donation: 999999,
            },
            {
                id: "4",
                group: "아동복지재단",
                title: "어린이 체험 교육 학습비 후원",
                description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
                thumbnailImage: "/images/class/dummy_profile_image.png",
                percent: 80,
                donation: 999999,
            },
        ],
    }
})

const onClickAllDonation = () => {
    router.push("/challenge/mission/donate/list");
}

</script>
