<template>
    <v-card
        variant="outlined"
        class="border-border-secondary background-primary rounded-12 pa-5 mb-4"
    >
        <div>
            <v-chip
                variant="outlined"
                class="sm mb-1"
            >
                {{ couponInfo.tag }}
            </v-chip>
        </div>

        <div class="text-t-xl font-weight-bold mb-1">
            {{ couponInfo.name }}
        </div>

        <div class="text-t-sm text-text-tertiary mb-5">
            {{ couponInfo.desc }}
        </div>

        <div class="text-t-sm font-weight-medium text-text-quaternary mb-5">
            ~ {{ format(couponInfo.endDate, "yyyy.MM.dd") }}
        </div>

        <v-btn
            variant="tonal"
            class="flex-grow-0 primary"
            block
            :disabled="couponIsExpired"
        >
            <!-- 기간이 지났을 경우 "기간만료" 출력 -->
            {{ couponIsExpired ? "기간만료" : "사용하기" }}
        </v-btn>
    </v-card>
</template>

<script lang="ts" setup>
import { ICouponItem } from '@/interfaces';
import { format } from 'date-fns';

const props = defineProps<{
    couponInfo: ICouponItem;
}>();

const couponIsExpired = computed(() => {
    return new Date() > new Date(props.couponInfo.endDate);
});

</script>
