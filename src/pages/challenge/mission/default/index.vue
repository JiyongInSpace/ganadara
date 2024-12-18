<template>
    <ChallengeTemplate :info="state.missioninfo">
        <template v-slot:title>
            기본 프레임
        </template>

        <template v-slot:content>
            <div class="pb-12">

                <div class="mb-12">
                    <v-img
                        src="/images/class/default_video.png"
                        aspect-ratio="1"
                        cover
                        class="mb-8"
                    ></v-img>

                    <v-btn
                        class="primary flex-1-1-100 mb-2"
                        variant="tonal"
                        size="large"
                        block
                    >
                        액션버튼
                    </v-btn>

                    <v-btn
                        class="flex-1-1-100 secondary mb-2"
                        variant="outlined"
                        size="large"
                        block
                    >
                        클립보드 복사하기
                    </v-btn>

                    <v-btn
                        class="flex-1-1-100 secondary"
                        variant="outlined"
                        size="large"
                        block
                    >
                        후원 결과 보고 이동
                    </v-btn>
                </div>

                <div>
                    <div class="text-t-lg font-weight-bold mb-3">
                        친구 초대 현황
                    </div>

                    <div class="d-flex justify-space-between align-center text-t-sm mb-4">
                        <div class="d-flex align-center ga-2">
                            <v-sheet
                                class="d-flex position-relative"
                                height="24"
                                :width="24 + (state.detail.inviteMember.slice(0, 3).length - 1) * 20"
                            >
                                <v-img
                                    v-for="(creator, index) in state.detail.inviteMember.slice(0, 3)"
                                    :key="creator.id"
                                    :src="creator.profileImage"
                                    width="24"
                                    height="24"
                                    cover
                                    class="position-absolute rounded-circle flex-grow-0"
                                    :style="{
                                        left: (index * 20) + 'px',
                                        zIndex: index,
                                    }"
                                />
                            </v-sheet>

                            <div>
                                <span class="font-weight-bold">{{ state.detail.inviteMember[0].name }}</span>
                                <span> 님 외 </span>
                                <span class="font-weight-bold">{{ state.detail.inviteCount }}명</span>
                                <span> 완료</span>
                            </div>
                        </div>

                        <v-btn
                            variant="text"
                            class="pa-0"
                            size="small"
                        >
                            자세히 보기
                        </v-btn>
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
                                    총 지급 포인트
                                </span>
                            </div>

                            <div class="text-t-xl font-weight-bold text-center">
                                {{ state.detail.point.toLocaleString() }}
                            </div>
                        </v-card>
                    </div>
                </div>

                <v-row dense class="mb-8"> 
                    <v-col cols="12"> 
                        <v-img
                            src="/images/class/default_video.png"
                            aspect-ratio="1"
                            cover
                        ></v-img>
                    </v-col>
                    <v-col cols="4"> 
                        <v-img
                            src="/images/class/default_video.png"
                            aspect-ratio="1"
                            cover
                        ></v-img>
                    </v-col>
                    <v-col cols="4"> 
                        <v-img
                            src="/images/class/default_video.png"
                            aspect-ratio="1"
                            cover
                        ></v-img>
                    </v-col>
                    <v-col cols="4"> 
                        <v-img
                            src="/images/class/default_video.png"
                            aspect-ratio="1"
                            cover
                        ></v-img>
                    </v-col>
                    <v-col cols="6"> 
                        <v-img
                            src="/images/class/default_video.png"
                            aspect-ratio="1"
                            cover
                        ></v-img>
                    </v-col>
                    <v-col cols="6"> 
                        <v-img
                            src="/images/class/default_video.png"
                            aspect-ratio="1"
                            cover
                        ></v-img>
                    </v-col>
                    <v-col cols="12"> 
                        <v-img
                            src="/images/class/default_video.png"
                            cover
                        ></v-img>
                    </v-col>
                </v-row>

                <div>
                    <v-card class="d-flex align-center border-border-primary pa-4 mb-8"
                        variant="outlined"
                    >
                        <div class="flex-grow-1">
                            <div class="text-t-sm font-weight-semibold">
                                로고 혹은 라벨 영역
                            </div>
                            <div class="text-t-lg font-weight-bold">
                                알림 관련 문구 영역 알림 ON
                            </div>
                        </div>

                        <v-switch
                            hide-details
                            color="primary"
                            :model-value="true"
                        ></v-switch>
                    </v-card>

                    <v-card class="d-flex align-center border-border-primary pa-4"
                        variant="outlined"
                    >
                        <div class="flex-grow-1">
                            <div class="text-t-sm font-weight-semibold">
                                로고 혹은 라벨 영역
                            </div>
                            <div class="text-t-lg font-weight-bold">
                                알림 관련 문구 영역 알림 OFF
                            </div>
                        </div>

                        <v-switch
                            hide-details
                            color="primary"
                        ></v-switch>
                    </v-card>
                </div>
            </div>
        </template>

        <template v-slot:notice>
            <ul class="text-t-sm">
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
        title: "미션 제목 영역",
        description: "미션 간단 설명 영역입니다.미션 간단 설명 영역입니다.미션 간단 설명 영역입니다.",
        linkUrl: "https://www.naver.com",
    },
    detail: {
        point: 100000,
        invitationCode: "124A2BDF",
        inviteCount: 16,
        inviteMember: [
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
        donationInProgress: [
            {
                id: "1",
                group: "아동복지재단",
                title: "어린이 체험 교육 학습비 후원",
                description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
                thumbnailImage: "/images/challenge/donation_default.jpeg",
                percent: 80,
                donation: 999999,
            },
            {
                id: "2",
                group: "아동복지재단",
                title: "어린이 체험 교육 학습비 후원",
                description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
                thumbnailImage: "/images/challenge/donation_default.jpeg",
                percent: 80,
                donation: 999999,
            },
            {
                id: "3",
                group: "아동복지재단",
                title: "어린이 체험 교육 학습비 후원",
                description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
                thumbnailImage: "/images/challenge/donation_default.jpeg",
                percent: 80,
                donation: 999999,
            },
            {
                id: "4",
                group: "아동복지재단",
                title: "어린이 체험 교육 학습비 후원",
                description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
                thumbnailImage: "/images/challenge/donation_default.jpeg",
                percent: 80,
                donation: 999999,
            },
        ],
    }
})

const onClickAllDonation = () => {
    router.push("/challenge/mission/donate/list");
}

const onClickDonation = (donationItem: any) => {
    router.push(`/challenge/mission/donate/${donationItem.id}`);
}

</script>
