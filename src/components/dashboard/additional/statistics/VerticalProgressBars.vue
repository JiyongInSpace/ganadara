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
        class="d-flex justify-space-around px-3"
    >
        <div
            v-for="({ label, percentage }, index) in props.list"
        >
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
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    list: {
        label: string;
        percentage: number;
    }[];
    isActive: number;
}>(), {
    isActive: 0,
});

</script>

<style lang="scss" scoped>
.line-path {
    width: 20px;
    height: 198px;
}
</style>