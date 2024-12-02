<template>
    <v-card
        variant="outlined"
        class="border-border-secondary background-primary rounded-12 flex-shrink-0 pa-5 mb-4"
    >
        <div class="d-flex align-center pb-3 mb-3 border-b">
            <span class="text-t-xl font-weight-bold mr-2">
                {{ historyItem.planName }}
            </span>

            <v-chip
                size="small"
                class="brand"
                variant="outlined"
            >
                {{ historyItem.billingType }}
            </v-chip>
        </div>

        <div class="d-flex justify-space-between align-center mb-2-5">
            <span class="font-weight-medium">
                결제금액
            </span>

            <span class="font-weight-bold">
                {{ historyItem.amount.toLocaleString() }}원
            </span>
        </div>

        <div class="d-flex justify-space-between align-center mb-2-5">
            <span class="font-weight-medium">
                주문번호
            </span>

            <span class="font-weight-bold">
                {{ historyItem.payNumber }}
            </span>
        </div>

        <div class="d-flex justify-space-between align-center mb-2-5">
            <span class="font-weight-medium">
                결제정보
            </span>

            <span class="font-weight-bold">
                {{ historyItem.payInfo }}
            </span>
        </div>

        <div class="d-flex justify-space-between align-center mb-5">
            <span class="font-weight-medium">
                결제일
            </span>

            <span class="font-weight-bold">
                {{ format(historyItem.timestamp, "yyyy.MM.dd HH:mm") }}
            </span>
        </div>

        <v-btn
            variant="outlined"
            class="flex-grow-0 primary"
            block
        >
            영수증
        </v-btn>
    </v-card>
</template>

<script lang="ts" setup>
import { IPaymentHistoryItem } from '@/interfaces';
import { format } from 'date-fns';

const props = defineProps<{
    historyItem: IPaymentHistoryItem;
}>();

</script>
