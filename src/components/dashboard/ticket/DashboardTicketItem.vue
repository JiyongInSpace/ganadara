<template>
    <v-card
        variant="outlined"
        class=" background-secondary rounded-12 flex-shrink-0 pa-5 mb-5"
        :class="`${couponIsExpired ? 'text-text-quaternary' : ''} ${isInProgress ? 'border-border-brand' : 'border-none'}`"
    >
        <div class="d-flex align-center pb-3 mb-3 border-b">
            <span class=" text-t-xl font-weight-bold mr-2">
                {{ ticketInfo.planName }}
            </span>

            <v-chip
                v-if="ticketInfo.billingType"
                size="small"
                class="brand"
                variant="outlined"
            >
                {{ t(`billingType.${ticketInfo.billingType}`) }}
            </v-chip>
        </div>

        <div class="d-flex justify-space-between align-center mb-3">
            <span class="font-weight-medium">
                이용 기간
            </span>

            <span class="font-weight-bold">
                {{ format(ticketInfo.startDate, "yyyy.MM.dd") }} ~
                {{ format(ticketInfo.endDate, "yyyy.MM.dd") }}
            </span>
        </div>

        <div class="d-flex justify-space-between align-center">
            <span class="font-weight-medium">
                결제 금액
            </span>

            <div>

                <span
                    v-if="ticketInfo.originalPrice"
                    class="font-weight-medium text-text-secondary text-decoration-line-through mr-1"
                >
                    {{ ticketInfo.originalPrice.toLocaleString() }} {{ currency || '원' }}
                </span>

                <span class="font-weight-bold">
                    {{ ticketInfo.paymentPrice.toLocaleString() }} {{ currency || '원' }}
                </span>
            </div>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';
import { ITicketItem } from '@/interfaces';
import { useI18n } from "vue-i18n";

const props = defineProps<{
    ticketInfo: ITicketItem;
    isInProgress?: boolean;
    currency?: string
}>();

const couponIsExpired = computed(() => {
    return new Date() > new Date(props.ticketInfo.endDate);
});

const { t } = useI18n({
    messages: {
        //
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

</script>
