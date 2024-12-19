<template>
    <div class="text-text-disabled text-t-md font-weight-medium text-center pt-12 mb-4">
        {{ contentInfo?.question.prompt }}
    </div>

    <!-- VIDEO -->
    <div
        v-if="contentInfo?.question.type === 'video'"
        class="mb-4 overflow-auto"
    >
        <CustomVideoSimple :src="contentInfo?.question.resource" />
    </div>

    <!-- BLANK - SENTENCE -->
    <v-card
        v-if="contentInfo?.question.type === 'sentence'"
        class="py-5 pr-2 pl-4 background-secondary rounded-16 mb-4 overflow-auto elevation-0"
    >
        <div class="overflow-auto text-t-md font-weight-bold pr-4 overflow-auto text-center">
            <div class="d-flex flex-wrap align-center justify-center mb-3 ga-1">
                <v-card
                    class="border-2 elevation-0 rounded-8 mx-1 d-flex justify-center align-center ga-1"
                    min-width="100%"
                    min-height="45"
                >
                    <span
                        v-for="(selectedOptionItem, key) in selectedOptionArray"
                        :key="key"
                    >
                        {{ selectedOptionItem?.resource }}
                    </span>
                </v-card>
            </div>

            <div class="text-t-sm font-weight-medium text-text-secondary">
                {{ contentInfo?.question.resource }}
            </div>
        </div>
    </v-card>

    <!-- BLANK - WORD -->
    <v-card
        v-if="contentInfo?.question.type === 'blank'"
        class="py-5 pr-2 pl-4 background-secondary rounded-16 mb-4 overflow-auto elevation-0"
    >
        <div class="overflow-auto text-t-md font-weight-bold pr-4 overflow-auto text-center">
            <div class="d-flex flex-wrap align-center justify-center mb-3 ga-1">
                <span
                    v-for="(englishWord, index) in englishSentence"
                    :key="index"
                >
                    <v-card
                        v-if="englishWord === '__'"
                        class="border-2 elevation-0 rounded-8 mx-1 d-flex justify-center align-center"
                        min-width="100"
                        height="45"
                    >
                        <!-- {{ selectedOption?.resource }} -->
                    </v-card>

                    <span v-else>{{ englishWord }}</span>
                </span>
            </div>

            <div class="text-t-sm font-weight-medium text-text-secondary">
                {{ koreanTranslation }}
            </div>
        </div>
    </v-card>

    <!-- AUDIO -->
    <div
        v-if="contentInfo?.question.type === 'audio'"
        class="mb-4 overflow-auto"
    >
        <v-img
            :src="isPlaying ? '/images/class/listen_active.png' : '/images/class/listen_inactive.png'"
            class="rounded-16 mb-4 cursor-pointer mx-auto"
            width="120"
            height="120"
            @click="onClickAudio"
        />
    </div>

    <!-- IMAGE -->
    <div
        v-if="contentInfo?.question.type === 'image'"
        class="rounded-16 mb-4 overflow-auto"
    >
        <v-img :src="contentInfo?.question.resource" />
    </div>

    <!-- TEXT -->
    <v-card
        v-if="contentInfo?.question.type === 'text'"
        class="py-5 px-4 background-secondary rounded-16 mb-4 overflow-auto elevation-0"
    >
        <div class="overflow-auto text-t-md font-weight-bold overflow-auto">
            {{ contentInfo?.question.resource }}
        </div>
    </v-card>

    <div
        v-if="contentInfo?.question.content"
        class="text-text-disabled text-t-md font-weight-bold text-center mb-9"
    >
        {{ contentInfo?.question.content }}
    </div>
</template>

<script lang="ts" setup>
import { IQuestion, IQuizItem, IUserResponse, } from '@/interfaces';

const props = defineProps<{
    contentInfo: IQuizItem | undefined;
    answerInfo: IUserResponse | undefined;
}>();


// BLANK
const englishSentence = computed(() => {
    // 괄호 전의 문장을 추출
    if (props.contentInfo?.question.type !== 'blank') return null;
    if (!props.contentInfo?.question.resource) return null;

    return props.contentInfo?.question.resource.split(' (')[0].split(' ');;
});

const koreanTranslation = computed(() => {
    // 괄호 안의 내용을 추출하고, 괄호는 제거
    if (props.contentInfo?.question.type !== 'blank') return null;
    if (!props.contentInfo?.question.resource) return null;

    const match = props.contentInfo?.question.resource?.match(/\(([^)]+)\)/);
    return match ? match[1] : '';
});

// AUDIO
const audios = computed(() => {
    if (props.contentInfo?.question.type !== 'audio') return null;
    return new Audio(props.contentInfo?.question.resource);
});

// 음성 재생 상태 관리
const isPlaying = ref(false);

const onClickAudio = () => {
    if (!audios.value) return;

    if (audios.value.paused) {
        audios.value.play();
        isPlaying.value = true;

        audios.value.addEventListener('ended', () => {
            isPlaying.value = false; // 재생이 끝나면 상태를 변경
        });
    } else {
        audios.value.pause();
        isPlaying.value = false;
    }
};

// SELECTED OPTION (SINGLE)
const selectedOption = computed(() => {
    return props.contentInfo?.answer.options.find(option => option.id === props.answerInfo?.selectedOptionId[0]);
})

// SELECTED OPTION (ARRAY)
const selectedOptionArray = computed(() => {
    // props.contentInfo와 props.answerInfo가 모두 정의되어 있는지 확인
    if (!props.contentInfo || !props.answerInfo?.selectedOptionId) {
        return [];
    }

    // 선택된 옵션 ID를 기준으로 필터링
    const filteredOptions = props.contentInfo.answer.options.filter(option =>
        props.answerInfo?.selectedOptionId.includes(option.id)
    );

    // 선택된 ID의 순서에 따라 정렬
    return filteredOptions.sort((a, b) => {
        const indexA = props.answerInfo?.selectedOptionId.indexOf(a.id)!;
        const indexB = props.answerInfo?.selectedOptionId.indexOf(b.id)!;

        // 'undefined' 상태를 안전하게 처리하기 위해 선택적 체이닝을 사용하지 않고 먼저 검사
        return (indexA !== -1 ? indexA : Number.MAX_VALUE) - (indexB !== -1 ? indexB : Number.MAX_VALUE);
    });
});
</script>
