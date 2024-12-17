<template>
    <div class="position-relative d-flex flex-column flex-grow-1 overflow-y-auto">
        <div class="pa-4">
            <v-text-field
                v-model="state.ui.input"
                variant="outlined"
                name="code"
                placeholder="쿠폰 번호를 입력해 주세요."
                validate-on="blur"
                class="mb-1 flex-grow-0 pr-0"
                hide-details
            >
                <template v-slot:append-inner>
                    <v-btn
                        size="large"
                        variant="tonal"
                        class="rounded-s-0 rounded-e-lg"
                        :class="{'primary': state.ui.input}"
                        :disabled="!state.ui.input"
                        min-height="44"
                    >
                        등록
                    </v-btn>
                </template>
            </v-text-field>
        </div>

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

.v-input.v-text-field {
    --v-input-control-height: "auto";
}
</style>