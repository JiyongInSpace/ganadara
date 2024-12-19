<template>
    <div>
        <!-- SPEAKING -->
        <div
            v-if="quizInfo?.type === 'speaking'"
            class="d-flex flex-column align-center"
        >
            <v-card
                :image="isSpeaking ? '/images/class/voice_active.png' : '/images/class/voice_inactive.png'"
                width="120"
                height="120"
                flat
                @mousedown="buttonSpeaking.event.onMousedown"
                @mouseup="buttonSpeaking.event.onMouseup"
                @touchstart="buttonSpeaking.event.onMousedown"
                @touchend="buttonSpeaking.event.onMouseup"
                class="mb-6"
            />


            <div class="text-t-md font-weight-medium text-text-disabled mb-6">
                {{ isSpeaking ? '듣는 중' : '탭하고 말하기' }}
            </div>

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
            class="d-flex flex-wrap mx-n2 py-0 mb-2"
            :selected="selectedAnswer"
            @update:selected="selectedAnswer = $event"
        >
            <v-card
                v-for="(answerItem) in quizInfo?.options"
                :key="answerItem.id"
                class="pa-2 border-none elevation-0"
                width="50%"
                height="124"
                variant="outlined"
            >
                <v-list-item
                    :value="answerItem.id"
                    variant="outlined"
                    class="rounded-lg border-border-primary border-2 w-100 h-100 d-flex justify-center align-center background-secondary"
                    active-class="foreground-secondary text-white border-fg-tertiary"
                >
                    <svg
                        width="54"
                        height="54"
                        viewBox="0 0 54 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M44.4328 11.25C47.6218 15.683 49.5 21.1221 49.5 27C49.5 32.8778 47.6218 38.3169 44.4328 42.75M35.4269 18C37.2064 20.5511 38.25 23.6536 38.25 27C38.25 30.3463 37.2064 33.4488 35.4269 36M21.6772 12.0727L14.5544 19.1955C14.1653 19.5847 13.9707 19.7793 13.7436 19.9184C13.5423 20.0418 13.3229 20.1327 13.0933 20.1878C12.8343 20.25 12.5592 20.25 12.0088 20.25H8.1C6.83988 20.25 6.20982 20.25 5.72852 20.4952C5.30516 20.7109 4.96095 21.0551 4.74524 21.4785C4.5 21.9598 4.5 22.5898 4.5 23.85V30.15C4.5 31.4101 4.5 32.0401 4.74524 32.5214C4.96095 32.9448 5.30516 33.289 5.72852 33.5047C6.20982 33.75 6.83988 33.75 8.1 33.75H12.0088C12.5592 33.75 12.8343 33.75 13.0933 33.8121C13.3229 33.8672 13.5423 33.9582 13.7436 34.0815C13.9707 34.2207 14.1653 34.4152 14.5544 34.8044L21.6772 41.9272C22.6411 42.891 23.123 43.3729 23.5367 43.4055C23.8957 43.4338 24.2466 43.2884 24.4805 43.0146C24.75 42.699 24.75 42.0175 24.75 40.6544V13.3455C24.75 11.9825 24.75 11.3009 24.4805 10.9853C24.2466 10.7115 23.8957 10.5662 23.5367 10.5944C23.123 10.627 22.6411 11.1089 21.6772 12.0727Z"
                            stroke="currentColor"
                            stroke-width="3.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </v-list-item>
            </v-card>
        </v-list>

        <div
            v-if="quizInfo?.type === 'audio'"
            class="font-weight-medium text-center text-text-disabled"
        >
            탭하고 듣기
        </div>

        <!-- IMAGE -->
        <v-list
            v-if="quizInfo?.type === 'image'"
            lines="one"
            class="d-flex flex-wrap ma-n2"
            :selected="selectedAnswer"
            @update:selected="selectedAnswer = $event"
        >
            <v-card
                v-for="(answerItem) in quizInfo?.options"
                :key="answerItem.id"
                class="pa-2 border-none elevation-0"
                width="50%"
                height="124"
                variant="outlined"
            >
                <v-list-item
                    :value="answerItem.id"
                    variant="outlined"
                    class="rounded-lg px-3-5 text-t-md border border-2 w-100 h-100 d-block position-relative overflow-hidden transition-all"
                    :class="selectedAnswer.length > 0 && 'opacity-50'"
                    active-class="foreground-secondary text-white opacity-100"
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
    <div v-if="quizInfo?.type == 'input'">
        <v-text-field
            v-model="inputValue"
            variant="outlined"
            name="email"
            validate-on="blur"
            hide-details
            @keydown.enter="() => {
                if (!disabledButton) {
                    inputValue = '';
                    dialogCorrect = true;
                }
            }"
        />
    </div>

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
            @click="onClickConfirm"
        >
            <!-- @click="buttonNext.onClick" -->
            확인
        </v-btn>
    </div>

    <DialogCorrect
        v-model:dialog="dialogCorrect"
        @onClickButton="buttonNext.onClick"
    />
    <DialogWrong v-model:dialog="dialogWrong" />
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
const dialogCorrect = ref(false);
const dialogWrong = ref(false);

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

const onClickConfirm = () => {
    if(selectedAnswer.value[currentQuizIndex.value] == 'a') {
        dialogCorrect.value = true;
    } else {
        dialogWrong.value = true;
    }
}
</script>
