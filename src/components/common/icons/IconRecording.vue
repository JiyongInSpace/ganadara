<template>
    <v-card
        class="d-inline rounded-circle border-warning-300 flex-shrink-0 flex-grow-0 px-1"
        :class="props.isActive ? 'background-warning-500' : 'background-warning-300'"
        aspect-ratio="1"
        :width="size"
        :height="size"
        elevation="0"
    >
        <svg
            :width="12"
            :height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="recording-02">
                <path
                    id="Icon"
                    d="M2.30078 5L2.30078 7M4.55078 5.5V6.5M6.80078 3V9M9.05078 1.5V10.5M11.3008 5V7"
                    :stroke="props.isActive ? '#FFF':'#101828'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </g>
        </svg>
    </v-card>
</template>

<script lang="ts" setup>
const props = defineProps<{
    size: number,
    isActive: boolean
}>();

const iconStyle = computed(() => ({
    color: props.isActive ? '#FF0DDF' : '#FFFFFF',  // 활성화면 빨간색, 비활성화면 흰색
    opacity: props.isActive ? 1 : 0.6  // 활성화면 불투명, 비활성화면 반투명
}));
</script>

<style scoped lang="scss">
.border-warning-300 {
    border: 1px solid #FEC84B;
}

.background-warning-500 {
    background-color: #F79009;
}

.background-warning-300 {
    background-color: #FEC84B;
}
</style>