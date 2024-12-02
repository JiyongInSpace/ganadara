<template>
    <div class="position-relative d-flex flex-column flex-grow-1 overflow-y-auto">
        <div class="d-flex flex-column flex-grow-1 w-100 background-secondary py-5 px-4">
            <DashboardCouponItem
                v-for="(couponItem, key) in couponList"
                :key="key"
                :couponInfo="couponItem"
            />

            <div
                v-if="couponList.length === 0"
                class="d-flex justify-center align-center w-100 flex-grow-1"
            >
                <span class="text-t-sm font-weight-medium">
                    쿠폰 내역이 없습니다.
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ICouponItem } from '@/interfaces';
import DashboardCouponItem from './DashboardCouponItem.vue';

const props = withDefaults(defineProps<{
    couponList: ICouponItem[];
}>(), {
    couponList: () => [],
});

const state = reactive({
    ui: {
        input: "",
    },
});

</script>


<style lang="scss" scoped>
:deep(.v-field--appended) {
    padding-right: 0px;
}
</style>