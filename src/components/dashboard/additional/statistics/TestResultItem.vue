<template>
    <v-card
        :class="cardClass"
        variant="outline"
        v-ripple="hasClickListener"
    >
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
                {{ info?.date && format(info.date, "yyyy.MM.dd") }}
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
                {{ formattedStudyTime(info?.elapsed_time) }} / {{ formattedStudyTime(info?.ideal_time) }}
            </span>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import { IExamItem } from '@/interfaces';
import { format } from 'date-fns';

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

const formattedStudyTime = (_number: number | undefined) => {
    if (!_number) return '00:00';

    const minutes = Math.floor(_number / 60); // 분 계산
    const seconds = _number % 60; // 초 계산

    // 두 자리 형식으로 변환
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};

</script>