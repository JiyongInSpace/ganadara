<template>
    <PageTemplate
        back-button
        space="px-0"
    >
        <template v-slot:center-header>
            후원
        </template>

        <template v-slot:content>
            <v-carousel
                class="bg-layer-1 flex-grow-0 flex-shrink-0"
                hide-delimiters
                height="fit-content"
            >
                <v-carousel-item
                    v-for="(image, i) in state.details.images"
                    :key="i"
                >
                    <v-img
                        :src="image"
                        :aspect-ratio="375 / 235"
                        cover
                    />
                </v-carousel-item>
            </v-carousel>

            <div class="d-flex pt-3 px-4 mb-8">
                <div class="flex-grow-1 truncate">
                    <div class="text-t-xs font-weight-medium text-info">
                        {{ state.details.group }}
                    </div>

                    <div class="d-flex ga-4 mb-5">
                        <div class="flex-grow-1 truncate">
                            <div class="font-weight-semibold truncate mb-1">
                                {{ state.details.title }}
                            </div>

                            <div class="text-t-sm truncate mb-2">
                                {{ state.details.description }}
                            </div>
                        </div>

                        <div>
                            <v-btn
                                variant="outlined"
                                size="small"
                                icon
                            >
                                <v-icon icon="mdi-link"></v-icon>
                            </v-btn>
                        </div>
                    </div>

                    <div class="text-t-sm text-text-secondary mb-1">
                        모금 기간 : 2024.01.01 ~ 2024.12.31
                    </div>

                    <div class="text-t-sm text-text-secondary mb-3">
                        목표 모금액 : 1,000,000원
                    </div>

                    <v-progress-linear
                        :max="100"
                        :model-value="state.details.percent"
                        height="8"
                        rounded
                        class="mb-0-5"
                    />

                    <div class="d-flex justify-space-between mb-8">
                        <div>
                            <span class="font-weight-bold">
                                {{ state.details.percent }}%
                            </span>
                        </div>

                        <div>
                            <span class="font-weight-bold">
                                {{ state.details.donation.toLocaleString() }}
                            </span>
                            <span>원</span>
                        </div>
                    </div>

                    <div class="text-t-lg font-weight-bold mb-3">
                        {{ state.details.header }}
                    </div>

                    <div class="text-t-sm text-wrap mb-8">
                        {{ state.details.content }}
                    </div>

                    <div class="mb-12">
                        <v-btn
                            class="primary flex-1-1-100"
                            variant="tonal"
                            size="large"
                            :disabled="state.details.isCompleted"
                            block
                            @click="onClickDonate"
                        >
                            {{ state.details.isCompleted ? '모금 종료' : '후원하기' }}
                        </v-btn>

                        <v-btn
                            v-if="state.details.isCompleted"
                            class="border-border-primary flex-1-1-100 mt-2"
                            variant="outlined"
                            size="large"
                            block
                        >
                            후원 후기
                        </v-btn>
                    </div>

                    <div class="text-t-lg font-weight-bold mb-3">
                        함께하는 후원자들
                    </div>

                    <div class="d-flex justify-space-between align-center text-t-sm mb-4">
                        <div class="d-flex align-center ga-2">
                            <v-sheet
                                class="d-flex position-relative"
                                height="24"
                                :width="24 + (state.details.donateMembers.slice(0, 3).length - 1) * 20"
                            >
                                <v-img
                                    v-for="(creator, index) in state.details.donateMembers.slice(0, 3)"
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
                                <span class="font-weight-bold">{{ state.details.donateMembers[0].name }}</span>
                                <span> 님 외 </span>
                                <span class="font-weight-bold">{{ state.details.donateMembers.length }}명</span>
                            </div>
                        </div>

                        <DialogDonationMembers />
                    </div>
                </div>
            </div>

            <div class="py-8 px-4">
                <div class="font-weight-bold mb-3">
                    확인해 주세요!
                </div>

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
            </div>
        </template>

        <template v-slot:bottom>
            <AppFooter />
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
const router = useRouter();

const props = defineProps<{
    loading: boolean;
}>();

const state = reactive({
    details: {
        images: [
            "/images/class/default_video.png",
            "/images/class/default_video.png",
            "/images/class/default_video.png",
        ],
        id: "1",
        group: "아동복지재단",
        title: "어린이 체험 교육 학습비 후원",
        description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
        thumbnailImage: "/images/class/dummy_profile_image.png",
        percent: 80,
        donation: 999999,
        type: "tag1",
        header: "후원 상세 내용",
        content: `어린이들의 체험 교육을 위한 학습 비용을 후원합니다. 이 후원을 통해 아이들은 다양한 활동을 경험하며 더 넓은 시각을 가지고 미래를 위해 성장해 갈 수 있습니다. 어린이들의 체험 교육을 위한 학습 비용을 후원합니다. 이 후원을 통해 아이들은 다양한 활동을 경험하며 더 넓은 시각을 가지고 미래를 위해 성장해 갈 수 있습니다.
어린이들의 체험 교육을 위한 학습 비용을 후원합니다. 이 후원을 통해 아이들은 다양한 활동을 경험하며 더 넓은 시각을 가지고 미래를 위해 성장해 갈 수 있습니다.어린이들의 체험 교육을 위한 학습 비용을 후원합니다. 이 후원을 통해 아이들은 다양한 활동을 경험하며 더 넓은 시각을 가지고 미래를 위해 성장해 갈 수 있습니다.어린이들의 체험 교육을 위한 학습 비용을 후원합니다. 이 후원을 통해 아이들은 다양한 활동을 경험하며 더 넓은 시각을 가지고 미래를 위해 성장해 갈 수 있습니다.`,
        donateMembers: [
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
        isCompleted: false,
    },
})

const onClickDonate = () => {
    router.push('/challenge/mission/donate/wizard')
}
</script>
