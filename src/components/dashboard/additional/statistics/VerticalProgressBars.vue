<template>
    <div v-if="!list || list.length < 1">
        <div
            class="d-flex justify-center align-center text-t-xs font-weight-medium text-center"
            :style="{
                height: '240px'
            }"
        >
            학습 내용이 없습니다.
        </div>
    </div>

    <div
        v-else
        class="d-flex justify-space-around position-relative px-3"
    >
        <div v-for="({ label, percentage }, index) in props.list">
            <div class="d-flex align-end line-path background-util-blue rounded-xl mb-2-5 mx-auto">
                <div
                    class="w-100 rounded-xl"
                    :class="index == isActive ? 'foreground-brand-primary' : 'background-brand-primary'"
                    :style="{
                        height: `${percentage || 0}%`,
                    }"
                >
                </div>
            </div>

            <div
                class="text-t-xs text-center text-text-tertiary"
                :class="index == isActive ? 'font-weight-bold text-text-brand-quaternary' : ''"
                v-html="label"
            />
        </div>

        <!-- averageExperience의 비율만큼 선 추가 -->
        <div
            v-if="averageExperience"
            class="position-absolute border-dashed-trick w-100 left-0"
            :style="{
                top: `${averageExperience}%`,
                height: '1px',
            }"
        >
            <v-chip
                size="small"
                class="position-absolute bg-black bottom-2 right-0 px-4"
            >
                전체 사용자 평균
            </v-chip>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    list: {
        label: string;
        percentage: number;
    }[];
    isActive: number;
    averageExperience: number;
}>(), {
    isActive: 0,
});

</script>

<style lang="scss" scoped>
.line-path {
    width: 20px;
    height: 198px;
}

.border-dashed-trick {
    background-image: linear-gradient(to right, black 60%, rgba(255, 255, 255, 0) 0%);
    background-position: bottom;
    background-size: 10px 1px;
    background-repeat: repeat-x;
}
</style>