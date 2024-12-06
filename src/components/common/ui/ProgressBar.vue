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
                d="M228 120C228 105.817 225.206 91.7734 219.779 78.6702C214.351 65.567 206.396 53.6612 196.368 43.6325C186.339 33.6037 174.433 25.6485 161.33 20.221C148.227 14.7935 134.183 12 120 12C105.817 12 91.7734 14.7935 78.6702 20.221C65.5671 25.6485 53.6612 33.6037 43.6325 43.6324C33.6038 53.6611 25.6485 65.567 20.221 78.6701C14.7935 91.7733 12 105.817 12 120"
                :stroke="bgStrokeColor"
                stroke-width="24"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <!-- 1 -->
            <path
                v-if="level == 1"
                d="M12 120C12 110.562 13.2372 101.164 15.68 92.0475"
                :stroke="strokeColor"
                stroke-width="24"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <!-- 2 -->
            <path
                v-if="level == 2"
                d="M12 120C12 97.2485 19.185 75.0781 32.5301 56.6516"
                :stroke="strokeColor"
                stroke-width="24"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <!-- 3 -->
            <path
                v-if="level == 3"
                d="M12 120C12 99.8612 17.6309 80.1235 28.2567 63.0161C38.8825 45.9087 54.0799 32.1131 72.1326 23.1872"
                :stroke="strokeColor"
                stroke-width="24"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <!-- 4 -->
            <path
                v-if="level == 4"
                d="M12 120C12 91.3566 23.3785 63.8864 43.6325 43.6325C63.8864 23.3785 91.3566 12 120 12"
                :stroke="strokeColor"
                stroke-width="24"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <!-- 5 -->
            <path
                v-if="level == 5"
                d="M12 120.5C12 101.544 16.9894 82.9212 26.4669 66.5041C35.9444 50.0869 49.576 36.4536 65.9919 26.9739C82.4078 17.4943 101.03 12.5025 119.986 12.5C138.942 12.4975 157.565 17.4845 173.984 26.9599"
                :stroke="strokeColor"
                stroke-width="24"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <!-- 6 -->
            <path
                v-if="level == 6"
                d="M12 120.5C12 97.7159 19.2056 75.5154 32.5862 57.0743C45.9667 38.6331 64.8366 24.896 86.4967 17.828C108.157 10.7601 131.497 10.7233 153.18 17.723C174.862 24.7227 193.775 38.4002 207.214 56.7991"
                :stroke="strokeColor"
                stroke-width="24"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <!-- 7 -->
            <path
                v-if="level == 7"
                d="M12 120.5C12 91.8566 23.3785 64.3864 43.6325 44.1325C63.8864 23.8785 91.3566 12.5 120 12.5C148.643 12.5 176.114 23.8785 196.368 44.1325C216.621 64.3864 228 91.8566 228 120.5"
                :stroke="strokeColor"
                stroke-width="24"
                stroke-linecap="round"
                stroke-linejoin="round"
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
        level: { type: Number, required: true },
        size: { type: Object as PropType<{ width: number; height: number }>, required: true },
        strokeColor: { type: String, default: '#FF0DDF' },
        fontStyle: { type: Object as PropType<{ fontSize: string; fontFamily?: string; fontWeight: string; fill: string }>, default: () => ({}) },
        bgStrokeColor: { type: String, default: '#EAECF0' },
    },
    setup(props) {
        const backgroundStyle = computed(() => ({
            stroke: props.bgStrokeColor,
        }));

        const textStyle = computed(() => ({
            fontSize: props.fontStyle.fontSize,
            fontFamily: props.fontStyle.fontFamily,
            fontWeight: props.fontStyle.fontWeight,
            fill: props.fontStyle.fill,
        }));

        return {
            backgroundStyle,
            textStyle,
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