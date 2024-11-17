<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                후원
            </span>

            <v-spacer />
        </div>

        <v-chip-group
            class="px-4 py-6"
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

        <div class="px-4">
            <div
                v-for="donationItem in filteredMissionList"
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
    </v-container>
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
            key: "tag1",
            value: "태그1",
        },
        {
            key: "tag2",
            value: "태그2",
        },
        {
            key: "tag3",
            value: "태그3",
        },
    ],
    donationList: [
        {
            id: "1",
            group: "아동복지재단",
            title: "어린이 체험 교육 학습비 후원",
            description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
            thumbnailImage: "/images/class/dummy_profile_image.png",
            percent: 80,
            donation: 999999,
            type: "tag1"
        },
        {
            id: "2",
            group: "아동복지재단",
            title: "어린이 체험 교육 학습비 후원",
            description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
            thumbnailImage: "/images/class/dummy_profile_image.png",
            percent: 80,
            donation: 999999,
            type: "tag1"
        },
        {
            id: "3",
            group: "아동복지재단",
            title: "어린이 체험 교육 학습비 후원",
            description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
            thumbnailImage: "/images/class/dummy_profile_image.png",
            percent: 80,
            donation: 999999,
            type: "tag2"
        },
        {
            id: "4",
            group: "아동복지재단",
            title: "어린이 체험 교육 학습비 후원",
            description: "어린이들의 체험 교육을 위한 학습 비용을 후원합니다.",
            thumbnailImage: "/images/class/dummy_profile_image.png",
            percent: 80,
            donation: 999999,
            type: "tag3"
        },
    ],
})

const filteredMissionList = computed(() => {
    return state.donationList.filter((donation) => {
        if (selectedContentCategory.value === "all") {
            return true;
        }

        return donation.type === selectedContentCategory.value;
    });
});

</script>
