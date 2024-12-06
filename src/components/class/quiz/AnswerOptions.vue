<template>
    <div>
        <!-- SPEAKING -->
        <div
            v-if="quizInfo?.type === 'speaking'"
            class="d-flex flex-column align-center"
        >
            <v-btn
                class="bg-primary elevation-0 mb-6"
                height="85"
                width="85"
                :icon="isSpeaking ? 'mdi-microphone' : 'mdi-microphone-outline'"
                @mousedown="buttonSpeaking.event.onMousedown"
                @mouseup="buttonSpeaking.event.onMouseup"
                @touchstart="buttonSpeaking.event.onMousedown"
                @touchend="buttonSpeaking.event.onMouseup"
            />

            <div class="text-t-md font-weight-medium text-text-disabled mb-6">탭하고 말하기</div>

            <v-sheet
                max-height="56"
                height="56"
                class="text-t-lg font-weight-semibold mb-2"
            >
                <span class="line-clamp-2">
                    {{ transcript }}
                </span>
            </v-sheet>
        </div>

        <!-- AUDIO -->
        <v-list
            v-if="quizInfo?.type === 'audio'"
            lines="one"
            class="d-flex flex-wrap ma-n1"
            :selected="selectedAnswer"
            @update:selected="selectedAnswer = $event"
        >
            <v-card
                v-for="(answerItem) in quizInfo?.options"
                :key="answerItem.id"
                class="pa-1 border-none elevation-0"
                width="50%"
                height="124"
                variant="outlined"
            >
                <v-list-item
                    :value="answerItem.id"
                    variant="outlined"
                    class="rounded-lg border border-2 w-100 h-100 d-flex justify-center align-center"
                    active-class="foreground-secondary text-white"
                >
                    <v-icon
                        icon="mdi-volume-high"
                        size="54"
                    />
                </v-list-item>
            </v-card>
        </v-list>

        <!-- IMAGE -->
        <v-list
            v-if="quizInfo?.type === 'image'"
            lines="one"
            class="d-flex flex-wrap ma-n1"
            :selected="selectedAnswer"
            @update:selected="selectedAnswer = $event"
        >
            <v-card
                v-for="(answerItem) in quizInfo?.options"
                :key="answerItem.id"
                class="pa-1 border-none elevation-0"
                width="50%"
                height="124"
                variant="outlined"
            >
                <v-list-item
                    :value="answerItem.id"
                    variant="outlined"
                    class="rounded-lg px-3-5 text-t-md border border-2 w-100 h-100 d-block position-relative overflow-hidden"
                    active-class="foreground-secondary text-white"
                >
                    <v-img
                        :src="answerItem.resource"
                        height="100%"
                        width="100%"
                        cover
                        class="position-center"
                    />
                </v-list-item>
            </v-card>
        </v-list>

        <!-- TEXT -->
        <v-list
            v-if="quizInfo?.type === 'text'"
            lines="one"
            :selected="selectedAnswer"
            @update:selected="selectedAnswer = $event"
        >
            <v-list-item
                v-for="(answerItem, index) in quizInfo?.options"
                :key="answerItem.id"
                :value="answerItem.id"
                variant="outlined"
                class="border rounded-lg px-3-5 text-t-md"
                active-class="foreground-secondary text-white"
                :class="index == quizInfo?.options.length - 1 ? 'mb-0' : 'mb-2-5'"
            >
                <div class="d-flex align-center">
                    <span class="font-weight-medium truncate">
                        {{ answerItem.resource }}
                    </span>
                </div>
            </v-list-item>
        </v-list>

        <!-- SHORTWORD -->
        <v-list
            v-if="quizInfo?.type === 'shortWord'"
            lines="one"
            :selected="selectedAnswer"
            @update:selected="selectedAnswer = $event"
            class="d-flex flex-wrap ga-2 justify-center"
        >
            <v-list-item
                v-for="(answerItem, index) in quizInfo?.options"
                :key="answerItem.id"
                :value="answerItem.id"
                variant="outlined"
                class="border rounded-lg px-3-5 text-t-m w-fit"
                active-class="foreground-secondary text-white"
            >
                <div class="d-flex align-center">
                    <span class="font-weight-medium truncate">
                        {{ answerItem.resource }}
                    </span>
                </div>
            </v-list-item>
        </v-list>

        <!-- SENTENCE -->
        <div
            v-if="quizInfo?.type === 'sentence'"
            class="d-flex flex-wrap ga-2 justify-center mb-2"
        >
            <v-list-item
                v-for="(answerItem, index) in quizInfo?.options"
                :key="answerItem.id"
                :active="selectedAnswer.includes(answerItem.id)"
                class="border rounded-lg px-3-5 text-t-m w-fit"
                active-class="foreground-secondary text-white"
                @click="onClickListItem(answerItem.id)"
            >
                <div class="d-flex align-center">
                    <span class="font-weight-medium truncate">
                        {{ answerItem.resource }}
                    </span>
                </div>
            </v-list-item>
        </div>

        <!-- MULTIPLE -->
        <div
            v-if="quizInfo?.type === 'multiple'"
            class="d-flex flex-wrap ga-2 justify-center mb-2"
        >
            <v-card class="pt-4 px-4 pb-0 w-100 background-tertiary rounded-16 overflow-auto elevation-0">
                <div class="d-flex justify-space-between w-full px-5 mb-2">
                    <span class="text-t-sm font-weight-medium text-text-disabled">
                        Q{{ currentQuizIndex + 1 }}
                    </span>

                    <div class="d-flex ga-1">
                        <v-card
                            v-for="(subQuizList, i) in quizInfo?.options"
                            :key="i"
                            class="foreground-disabled-subtle elevation-0 transition-all"
                            :class="currentQuizIndex === i ? 'bg-primary' : ''"
                            :width="currentQuizIndex === i ? 16 : 8"
                            height="8"
                        />
                    </div>
                </div>

                <v-carousel
                    v-model="currentQuizIndex"
                    :continuous="false"
                    :show-arrows="false"
                    :show-delimiters="false"
                    hide-delimiter-background
                    hide-delimiters
                    height="fit-content"
                >
                    <v-carousel-item
                        v-for="(subQuizList, i) in quizInfo?.options"
                        :key="subQuizList.id"
                    >
                        <div
                            class="text-center font-weight-bold text-t-lg mb-2"
                            v-html="(subQuizList as any).question"
                        />

                        <v-list
                            v-model="selectedAnswer[i]"
                            lines="one"
                            class="bg-transparent"
                            @update:selected="updateSelectedAnswer(i, $event)"
                        >
                            <!-- :selected="selectedAnswer" -->
                            <v-list-item
                                v-for="(subQuizItem, index) in (subQuizList as any).options"
                                :key="subQuizItem.id"
                                :value="subQuizItem.id"
                                variant="outlined"
                                class="border rounded-lg px-3-5 text-t-md bg-white mb-2-5"
                                active-class="foreground-secondary text-white"
                            >
                                <div class="d-flex align-center">
                                    <span class="font-weight-medium truncate">
                                        {{ subQuizItem.resource }}
                                    </span>
                                </div>
                            </v-list-item>
                        </v-list>
                    </v-carousel-item>
                </v-carousel>

            </v-card>
        </div>
    </div>

    <!-- 주관식 -->
    <v-text-field
        v-if="quizInfo?.type == 'input'"
        v-model="inputValue"
        variant="outlined"
        name="email"
        validate-on="blur"
        hide-details
        @keydown.enter="() => {
            if (!disabledButton) {
                buttonNext.onClick();
            }
        }"
    />

    <v-spacer />

    <!-- NEXT -->
     <div>
         <v-btn
             v-if="quizInfo?.type != 'input'"
             variant="tonal"
             size="x-large"
             class="primary "
             block
             :disabled="disabledButton"
             @click="buttonNext.onClick"
         >
             확인
         </v-btn>
     </div>
</template>

<script lang="ts" setup>
import { IAnswer, IUserResponse, } from '@/interfaces';

interface AudioMap {
    [key: string]: HTMLAudioElement;
}

declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

const props = defineProps<{
    quizInfo: IAnswer | undefined;
    answerInfo: IUserResponse | undefined;
    disabledButton: boolean;
}>();

const emit = defineEmits<{
    (e: 'onClickAnswer', id: any): void // 패스워드 반환
    (e: 'onClickNext'): void // 다음 버튼 클릭
}>()

const selectedAnswer = ref<string[]>([]);
const inputValue = ref<string>('');

// ## watcher 

// 객관식 문제 버튼 클릭시
watch(
    () => selectedAnswer.value,
    () => {
        emit('onClickAnswer', [...selectedAnswer.value]);

        // 오디오 재생
        if (props.quizInfo?.type === 'audio' && selectedAnswer.value[0]) {
            currentAudio.value = audios.value[selectedAnswer.value[0]];
            playAudio(selectedAnswer.value[0]);
        }
    }
);

// 주관식 문제 인풋 입력시
watch(
    () => inputValue.value,
    () => {
        emit('onClickAnswer', [inputValue.value]);
    }
);

// 뒤로가기 등으로 문제가 바뀌었을때, 이미 선택한 답이 있는 경우 체크
watch(
    () => props.quizInfo,
    () => {
        if (props.answerInfo) {
            selectedAnswer.value = [...props.answerInfo.selectedOptionId];
        }
    }
);

// ## MULTIPLE
// 임시 ============================================================
// 문제별 선택된 답변을 관리할 배열
// 캐러셀의 현재 아이템 인덱스

// TO DO: 뒤로갔을때 체크하기

const currentQuizIndex = ref(0);

// 선택된 답변 업데이트 함수
const updateSelectedAnswer = (index: any, value: any) => {
    selectedAnswer.value[index] = value[0];

    if (currentQuizIndex.value < props.quizInfo?.options.length! - 1 && value.length > 0) {
        currentQuizIndex.value++;
    }

    if (selectedAnswer.value.length === props.quizInfo?.options.length && selectedAnswer.value.every(answer => answer !== null)) {
        emit('onClickAnswer', selectedAnswer.value);
    } else {
        emit('onClickAnswer', null);
    }
};

// ============================================================


// ## AUDIO

// computed를 사용하여 오디오 객체 생성
const audios = computed(() => {
    const loadedAudios: AudioMap = {};
    // return props.quizInfo.options;
    props.quizInfo?.options.forEach(option => {
        loadedAudios[option.id] = new Audio(option.resource);
    });
    return loadedAudios;
});

const currentAudio = ref<any>();

const playAudio = (audioId: string) => {
    if (currentAudio.value) {
        currentAudio.value.pause();
        currentAudio.value.currentTime = 0;
    }

    currentAudio.value = audios.value[audioId];
    currentAudio.value.play();
};


// ## SENTENCE
const onClickListItem = (_answerItemId: string) => {
    if (selectedAnswer.value.includes(_answerItemId)) {
        selectedAnswer.value = selectedAnswer.value.filter((item) => item !== _answerItemId);
    } else {
        selectedAnswer.value = [...selectedAnswer.value, _answerItemId];
        // selectedAnswer.value.push(_answerItemId)
    }

    emit('onClickAnswer', selectedAnswer.value);
}

// ## SPEAKING
const isDesktop = navigator.platform.startsWith('Win') || navigator.platform.startsWith('Mac');

const recognition = ref();
const transcript = ref('');
const isSpeaking = ref(false);

onMounted(() => {
    // 데스크탑 환경
    if (isDesktop) {
        recognition.value = new window.webkitSpeechRecognition();
        recognition.value.lang = 'ko-KR';
        recognition.value.continuous = false;

        recognition.value.onresult = function (event: any) {
            transcript.value = event.results[0][0].transcript;
        };

        recognition.value.onerror = function (event: any) {
            console.error('음성 인식 오류:', event.error);
        };
    }
})

const buttonSpeaking = {
    event: {
        onMousedown: () => {
            // 데스크탑 환경
            if (isDesktop) {
                recognition.value.start();
            }
            isSpeaking.value = true;
        },
        onMouseup: () => {
            // 데스크탑 환경
            if (isDesktop) {
                recognition.value.stop();
            }
            isSpeaking.value = false;
            emit('onClickAnswer', transcript.value);
        }
    }
}

const buttonNext = {
    onClick: () => {
        emit('onClickNext');
        selectedAnswer.value = [];
    }
};
</script>
