<template>
    <ChallengeTemplate :info="state.missioninfo">
        <template v-slot:title>
            친구 초대
        </template>

        <template v-slot:content>
            <div class="pb-12">
                <div class="border py-8 mb-8 rounded-8">
                    <div class="text-t-sm text-center mb-1">
                        나의 초대 코드
                    </div>

                    <div class="text-d-md font-weight-bold text-center mb-6">
                        {{ state.detail.invitationCode }}
                    </div>

                    <div class="d-flex flex-column px-9 ga-5">
                        <div
                            v-for="(step, index) in steps"
                            :key="index"
                            class="d-flex align-center ga-3"
                        >
                            <v-card
                                class="text-t-sm font-weight-semibold rounded-circle background-tertiary d-flex justify-center align-center flex-shrink-0"
                                width="24"
                                height="24"
                                elevation="0"
                            >
                                {{ index + 1 }}
                            </v-card>

                            <div>
                                <div class="text-t-sm font-weight-semibold mb-0-5">
                                    {{ step.title }}
                                </div>

                                <div class="text-t-sm">
                                    {{ step.description }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-12">
                    <v-btn
                        class="primary flex-1-1-100 mb-2"
                        variant="tonal"
                        size="large"
                        block
                        @click="onClickShare"
                    >
                        나의 초대 코드 공유하기
                    </v-btn>

                    <v-btn
                        class="flex-1-1-100 secondary"
                        variant="outlined"
                        size="large"
                        block
                        @click="onClickCopy"
                    >
                        클립보드 복사하기
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
                            @click="onClickInviteMembers"
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
            </div>
        </template>

        <template v-slot:notice>
            <ul class="text-t-sm text-text-secondary">
                <li class="dot">해당 미션은 개인정보 수집 및 이용 동의 및 알림 PUSH 설정 회원만 참여 가능합니다.</li>
                <li class="dot">보상 포인트 발급 시, 발급일 기준으로 90일까지 사용 가능하며 이후 자동으로 소멸됩니다.</li>
                <li class="dot">포인트 적립은 실시간이 아니며, 적립 완료 안내 팝업이 뜨더라도 실제 적립까지는 시간이 소요될 수 있습니다.</li>
                <li class="dot">적립 받은 포인트는 전체보기 > 포인트 내역에서 확인 가능합니다.</li>
                <li class="dot">일시적으로 사용자가 증가하거나 광고 정책에 맞지 않는 대상자의 경우 참여가 제한될 수 있습니다.</li>
                <li class="dot">비정상적, 불법적인 방법으로 이벤트에 참여하신 경우, 당첨 후에도 취소될 수 있습니다.</li>
                <li class="dot">당사 사정에 따라 조기 종료 또는 사전 고지 없이 변경하거나 종료될 수 있습니다.</li>
                <li class="dot">친구 초대 코드는 회원 가입 시에만 입력할 수 있습니다.<br />초대받은 친구의 계정은 3일 동안 로그인 이력이 확인되어야 하며, 확인 되지 않을 경우
                    지급되지 않습니다.</li>
                <li class="dot">초대코드 오입력 등으로 인한 리워드 미적립은 추가 또는 재지급되지 않습니다.</li>
                <li class="dot">본인인증 기준으로 지급되므로 탈퇴 후 재가입하더라도 중복 지급되지 않습니다.</li>
            </ul>
        </template>
    </ChallengeTemplate>

    <DialogInviteMembers v-model:dialog="state.dialog" />
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar';

const snackbar = useSnackbarStore();

const state = reactive({
    missioninfo: {
        daily: true,
        point: true,
        gift: true,
        hot: true,
        title: "친구 초대하고 포인트 받으세요!",
        description: "{{포인트}}를 받을 수 있어요.",
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
    },
    dialog: false,
})

const steps = [
    {
        title: "친구 초대하기",
        description: "친구에게 공유하고 함께 포인트 받으세요!",
    },
    {
        title: "신규 회원 가입",
        description: "초대 코드는 회원가입 시에만 입력 가능해요",
    },
    {
        title: "3일 동안 로그인",
        description: "모두에게 포인트를 지급해 드려요!",
    },
]

const onClickShare = () => {
    navigator.share({
        text: state.detail.invitationCode,
    })
}

const onClickCopy = () => {

    navigator.clipboard.writeText(state.detail.invitationCode);
    snackbar.showSnackbar('초대 코드가 클립보드에 복사되었습니다.');
}

const onClickInviteMembers = () => {
    state.dialog = true;
}
</script>
