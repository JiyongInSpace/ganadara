<template>
    <v-card
        :class="cardClass"
        variant="outline"
        v-ripple="hasClickListener"
    >
        <!-- @click="onCardClick" -->
        <div class="d-flex justify-space-between">
            <span class="text-t-lg font-weight-bold">
                {{ info?.name }}
            </span>

            <v-icon
                v-if="hasClickListener"
                icon="mdi-chevron-right"
                size="large"
                class="text-text-disabled"
            />
        </div>

        <div class="text-t-sm font-weight-medium mt-2-5">
            날짜:
            <span>
                {{ info?.date }}
            </span>
        </div>

        <div
            v-if="info?.score"
            class="text-t-sm font-weight-medium mt-2-5"
        >
            점수:
            <span>
                {{ info?.score }}점
            </span>
        </div>

        <div
            v-if="info?.level"
            class="text-t-sm font-weight-medium mt-2-5"
        >
            레벨:
            <span>
                Lv.{{ info?.level }}
            </span>
        </div>

        <div class="text-t-sm font-weight-medium mt-2-5">
            오답:
            <span>
                {{ info?.wrong }}개
            </span>
        </div>

        <div
            v-if="info?.elapsed_time"
            class="text-t-sm font-weight-medium mt-2-5"
        >
            문제풀이 시간 / 권장 시간 :
            <span>
                {{ info?.elapsed_time }} / {{ info?.ideal_time }}
            </span>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import { IExamItem } from '@/interfaces';

const props = defineProps<{
    info?: IExamItem;
}>();

const { attrs } = getCurrentInstance()!; // Vue의 내부 인스턴스에서 $attrs 접근

// 부모로부터 전달된 클릭 이벤트 확인
const hasClickListener = computed(() => !!attrs.onClick);

const cardClass = computed(() =>
    hasClickListener.value
        ? 'border-border-secondary background-primary cursor-pointer rounded-12 pa-4'
        : 'border-border-secondary background-primary rounded-12 pa-4'
);
</script>