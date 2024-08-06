<template>
    <v-sheet
        :width="size.width"
        :height="132"
        class="d-flex position-relative"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            :width="size.width"
            :height="size.height"
            :viewBox="`0 0 ${size.width} ${size.height}`"
            fill="none"
        >
            <path
                v-if="hasBackground"
                d="M228.5 120C228.5 105.817 225.706 91.7734 220.279 78.6702C214.851 65.567 206.896 53.6612 196.868 43.6325C186.839 33.6037 174.933 25.6485 161.83 20.221C148.727 14.7935 134.683 12 120.5 12C106.317 12 92.2734 14.7935 79.1702 20.221C66.0671 25.6485 54.1612 33.6037 44.1325 43.6324C34.1038 53.6611 26.1485 65.567 20.721 78.6701C15.2935 91.7733 12.5 105.817 12.5 120"
                :style="backgroundStyle"
            />
            <path
                d="M12.5 120C12.5 98.6396 18.8341 77.7589 30.7013 59.9984C42.5685 42.2379 59.4358 28.3953 79.1702 20.221C98.9046 12.0467 120.62 9.90799 141.57 14.0752C162.52 18.2424 181.763 28.5284 196.868 43.6325"
                :style="progressStyle"
            />
        </svg>

        <div class="position-absolute text-center position-center">
            <slot />
        </div>
    </v-sheet>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

export default defineComponent({
    name: 'SemiCircleProgress',
    props: {
        strokeWidth: { type: Number, required: true },
        strokeLinecap: { type: String as PropType<"butt" | "round" | "square" | "inherit">, default: 'round' },
        percentage: { type: Number, required: true },
        percentageSeperator: { type: String, default: '%' },
        size: { type: Object as PropType<{ width: number; height: number }>, required: true },
        strokeColor: { type: String, default: '#FF0DDF' },
        fontStyle: { type: Object as PropType<{ fontSize: string; fontFamily?: string; fontWeight: string; fill: string }>, default: () => ({}) },
        hasBackground: { type: Boolean, default: false },
        bgStrokeColor: { type: String, default: '#EAECF0' },
    },
    setup(props) {
        const radius = computed(() => 50 - props.strokeWidth / 2);
        const circumference = computed(() => 1.1 * Math.PI * radius.value);
        const strokeDashoffset = computed(() => circumference.value - (props.percentage / 100) * circumference.value);
        const bgStrokeDashoffset = computed(() => circumference.value - 1 * circumference.value);
        const pathDescription = "M5,64 a1,1 0 0,1 90,0";

        const backgroundStyle = computed(() => ({
            transition: "stroke-dashoffset 0.35s",
            stroke: props.bgStrokeColor,
            strokeLinecap: props.strokeLinecap,
            strokeDashoffset: `${bgStrokeDashoffset.value}`,
            strokeWidth: `${props.strokeWidth}`,
        }));

        const progressStyle = computed(() => ({
            transition: "stroke-dashoffset 0.35s",
            stroke: props.strokeColor,
            strokeLinecap: props.strokeLinecap,
            // strokeDasharray: `${circumference.value}`,
            strokeDashoffset: `${strokeDashoffset.value}`,
            strokeWidth: `${props.strokeWidth}`,
        }));

        const textStyle = computed(() => ({
            fontSize: props.fontStyle.fontSize,
            fontFamily: props.fontStyle.fontFamily,
            fontWeight: props.fontStyle.fontWeight,
            fill: props.fontStyle.fill,
        }));

        return {
            backgroundStyle,
            progressStyle,
            textStyle,
            pathDescription
        };
    }
});
</script>

<style scoped>
.position-center {
    left: 50%;
    bottom: 4px;
    transform: translateX(-50%);
}
</style>