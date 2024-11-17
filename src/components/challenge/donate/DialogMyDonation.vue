<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                variant="text"
                class="pa-0"
                size="small"
                v-bind="activatorProps"
            >
                자세히 보기
            </v-btn>
        </template>

        <v-card class="pt-9 pb-5 rounded-t-16 elevation-0">
            <div class="text-t-xl font-weight-bold text-center mb-0-5">
                나의 후원 현황
            </div>

            <div class="text-t-sm text-center mb-7">
                총 1,000,000, 502원
            </div>

            <div
                v-for="(donations, date) in groupedDonations"
                :key="date"
                class="px-4 mb-1"
            >
                <div class="text-t-xs text-text-tertiary">{{ date }}</div>

                <div
                    v-for="(donation, index) in donations"
                    :key="index"
                    class="mb-3"
                >
                    <p class="font-weight-semibold">{{ donation.amount }}</p>
                    <p class="text-t-sm text-text-tertiary">
                        {{ donation.organization }} | {{ donation.description }}
                    </p>
                </div>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
interface Donation {
    date: string;
    amount: string;
    organization: string;
    description: string;
}

const dialog = defineModel("dialog");

const state = reactive({
    donationList: [
        {
            date: "2024.12.12",
            amount: "99,999원",
            organization: "아동복지재단",
            description: "어린이 체험 교육 학습비 후원",
        },
        {
            date: "2024.12.12",
            amount: "1,999원",
            organization: "아동복지재단",
            description: "어린이 체험 교육 학습비 후원",
        },
        {
            date: "2024.12.08",
            amount: "3,999원",
            organization: "아동복지재단",
            description: "어린이 체험 교육 학습비 후원",
        },
        {
            date: "2024.12.06",
            amount: "4,999원",
            organization: "아동복지재단",
            description: "어린이 체험 교육 학습비 후원",
        },
    ] as Donation[],
});

const groupedDonations = computed(() => {
    return state.donationList.reduce((grouped: Record<string, Donation[]>, donation: Donation) => {
        if (!grouped[donation.date]) {
            grouped[donation.date] = [];
        }
        grouped[donation.date].push(donation);
        return grouped;
    }, {});
})

</script>

<style lang="scss" scoped></style>
