
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <QuizWizard :quizList="state.quizList" />
    </v-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { IQuizItem } from '@/interfaces';

const route = useRoute();

const questionId = computed(() => {
    const id = route.params.id;
    return Array.isArray(id) ? Number(id[0]) : Number(id);
});

const state = reactive({
    quizList: [] as IQuizItem[],
    currentQuiz: 1,
});

const loading = ref(false);


// ========================================
// Dummy Data
const dummy_01 = [
    {
        id: "id_11",
        question: {
            type: 'text',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: " 나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는   나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는  ",
        },
        answer: {
            type: 'text',
            options: [
                { id: 'a', resource: '옵션 1' },
                { id: 'b', resource: '옵션 2' },
                { id: 'c', resource: '옵션 3' },
                { id: 'd', resource: '옵션 4' },
            ],
        }
    },
    {
        id: "id_12",
        question: {
            type: 'text',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: " 나는 너를 사랑해나는",
        },
        answer: {
            type: 'image',
            options: [
                { id: 'a', resource: "/images/class/default_video.png" },
                { id: 'b', resource: "/images/class/default_video.png" },
                { id: 'c', resource: "/images/class/default_video.png" },
                { id: 'd', resource: "/images/class/default_video.png" }
            ],
        }
    },
    {
        id: "id_13",
        question: {
            type: 'text',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: " 나는 너를 사랑해나는",
        },
        answer: {
            type: 'audio',
            options: [
                { id: 'a', resource: "/audios/audio_01.wav" },
                { id: 'b', resource: "/audios/audio_01.wav" },
                { id: 'c', resource: "/audios/audio_01.wav" },
                { id: 'd', resource: "/audios/audio_01.wav" }
            ],
        }
    },
]

const dummy_02 = [
    {
        id: "id_21",
        question: {
            type: 'image',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "/images/class/dummy_question_image.png",
        },
        answer: {
            type: 'text',
            options: [
                { id: 'a', resource: '옵션 1' },
                { id: 'b', resource: '옵션 2' },
                { id: 'c', resource: '옵션 3' },
                { id: 'd', resource: '옵션 4' },
            ],
        }
    },
    {
        id: "id_22",
        question: {
            type: 'image',
            // type: 'image',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "/images/class/dummy_question_image.png",
        },
        answer: {
            type: 'image',
            options: [
                { id: 'a', resource: "/images/class/default_video.png" },
                { id: 'b', resource: "/images/class/default_video.png" },
                { id: 'c', resource: "/images/class/default_video.png" },
                { id: 'd', resource: "/images/class/default_video.png" }
            ],
        }
    },
    {
        id: "id_23",
        question: {
            type: 'image',
            // type: 'image',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "/images/class/dummy_question_image.png",
        },
        answer: {
            type: 'audio',
            options: [
                { id: 'a', resource: "/audios/audio_01.wav" },
                { id: 'b', resource: "/audios/audio_01.wav" },
                { id: 'c', resource: "/audios/audio_01.wav" },
                { id: 'd', resource: "/audios/audio_01.wav" }
            ],
        }
    },
]

const dummy_03 = [
    {
        id: "id_1",
        question: {
            type: 'audio',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "/audios/audio_01.wav",
        },
        answer: {
            type: 'text',
            options: [
                { id: 'a', resource: '옵션 1' },
                { id: 'b', resource: '옵션 2' },
                { id: 'c', resource: '옵션 3' },
                { id: 'd', resource: '옵션 4' },
            ],
        }
    },
    {
        id: "id_2",
        question: {
            type: 'audio',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "/audios/audio_01.wav",
        },
        answer: {
            type: 'image',
            options: [
                { id: 'a', resource: "/images/class/default_video.png" },
                { id: 'b', resource: "/images/class/default_video.png" },
                { id: 'c', resource: "/images/class/default_video.png" },
                { id: 'd', resource: "/images/class/default_video.png" }
            ],
        }
    },
    {
        id: "id_3",
        question: {
            type: 'audio',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "/audios/audio_01.wav",
        },
        answer: {
            type: 'audio',
            options: [
                { id: 'a', resource: "/audios/audio_01.wav" },
                { id: 'b', resource: "/audios/audio_01.wav" },
                { id: 'c', resource: "/audios/audio_01.wav" },
                { id: 'd', resource: "/audios/audio_01.wav" }
            ],
        }
    },
]

const dummy_04 = [
    {
        id: "id_1",
        question: {
            type: 'video',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "https://videocdn.cdnpk.net/videos/e2e74372-70c9-47eb-9432-ccebd8d998fb/vertical/previews/watermarked/large.mp4",
        },
        answer: {
            type: 'text',
            options: [
                { id: 'a', resource: '옵션 1' },
                { id: 'b', resource: '옵션 2' },
                { id: 'c', resource: '옵션 3' },
                { id: 'd', resource: '옵션 4' },
            ],
        }
    },
    {
        id: "id_2",
        question: {
            type: 'video',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "https://videocdn.cdnpk.net/videos/e2e74372-70c9-47eb-9432-ccebd8d998fb/vertical/previews/watermarked/large.mp4",
        },
        answer: {
            type: 'image',
            options: [
                { id: 'a', resource: "/images/class/default_video.png" },
                { id: 'b', resource: "/images/class/default_video.png" },
                { id: 'c', resource: "/images/class/default_video.png" },
                { id: 'd', resource: "/images/class/default_video.png" }
            ],
        }
    },
    {
        id: "id_3",
        question: {
            type: 'video',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "https://videocdn.cdnpk.net/videos/e2e74372-70c9-47eb-9432-ccebd8d998fb/vertical/previews/watermarked/large.mp4",
        },
        answer: {
            type: 'audio',
            options: [
                { id: 'a', resource: "/audios/audio_01.wav" },
                { id: 'b', resource: "/audios/audio_01.wav" },
                { id: 'c', resource: "/audios/audio_01.wav" },
                { id: 'd', resource: "/audios/audio_01.wav" }
            ],
        }
    },
]

const dummy_05 = [
    {
        id: "id_111",
        question: {
            type: 'text',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: " 나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는   나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는  ",
            content: "스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)",
        },
        answer: {
            type: 'input',
            options: [],
        }
    },
    {
        id: "id_112",
        question: {
            type: 'image',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "/images/class/dummy_question_image.png",
            content: '스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
        },
        answer: {
            type: 'input',
            options: [],
        }
    },
    {
        id: "id_113",
        question: {
            type: 'audio',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "/audios/audio_01.wav",
            content: "스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)",
        },
        answer: {
            type: 'input',
            options: [],
        }
    },
    {
        id: "id_114",
        question: {
            type: 'video',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "https://videocdn.cdnpk.net/videos/e2e74372-70c9-47eb-9432-ccebd8d998fb/vertical/previews/watermarked/large.mp4",
            content: '스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
        },
        answer: {
            type: 'input',
            options: [],
        }
    },
]

const dummy_06 = [
    {
        id: "id_0",
        question: {
            type: 'blank',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "My favorite movie __ is science fiction (제가 가장 좋아하는 영화 장르는 공상과학입니다.)",
            content: "스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)",
        },
        answer: {
            type: 'shortWord',
            options: [
                { id: 'a', resource: '옵션 1' },
                { id: 'b', resource: '옵션 2' },
                { id: 'c', resource: '옵션 3' },
                { id: 'd', resource: '옵션 4' },
                { id: 'e', resource: '옵션 4' },
                { id: 'f', resource: '옵션 4' },
                { id: 'g', resource: '옵션 4' },
                { id: 'h', resource: '옵션 4' },
            ],
        }
    },
    {
        id: "id_02",
        question: {
            type: 'blank',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "My favorite movie __ is science fiction (제가 가장 좋아하는 영화 장르는 공상과학입니다.)",
            content: "스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)",
        },
        answer: {
            type: 'input',
            options: [],
        }
    },
    {
        id: "id_03",
        question: {
            type: 'blank',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "My favorite movie __ is science fiction (제가 가장 좋아하는 영화 장르는 공상과학입니다.)",
            content: "스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)",
        },
        answer: {
            type: 'audio',
            options: [
                { id: 'a', resource: "/audios/audio_01.wav" },
                { id: 'b', resource: "/audios/audio_01.wav" },
                { id: 'c', resource: "/audios/audio_01.wav" },
                { id: 'd', resource: "/audios/audio_01.wav" }
            ],
        }
    },
    {
        id: "id_04",
        question: {
            type: 'blank',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "My favorite movie __ is science fiction (제가 가장 좋아하는 영화 장르는 공상과학입니다.)",
            content: "스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)",
        },
        answer: {
            type: 'speaking',
            options: [],
        }
    },
]

const dummy_07 = [
    {
        id: "id_123122341333",
        question: {
            type: 'sentence',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "제가 가장 좋아하는 영화 장르는 공상과학입니다. ",
            content: "스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)",
        },
        answer: {
            type: 'sentence',
            options: [
                { id: 'a', resource: 'science' },
                { id: 'b', resource: 'fiction' },
                { id: 'c', resource: 'favorite' },
                { id: 'd', resource: 'My' },
                { id: 'e', resource: 'is' },
                { id: 'f', resource: 'movie' },
            ],
        }
    },
    {
        id: "id_1231223413332",
        question: {
            type: 'sentence',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "제가 가장 좋아하는 영화 장르는 공상과학입니다. ",
            content: "스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)",
        },
        answer: {
            type: 'input',
            options: [],
        }
    },
]

const dummy_08 = [
    {
        id: "id_111",
        question: {
            type: 'text',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: " 나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는   나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는 너를 사랑해나는  ",
            content: "스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)",
        },
        answer: {
            type: 'speaking',
            options: [],
        }
    },
    {
        id: "id_112",
        question: {
            type: 'image',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "/images/class/dummy_question_image.png",
            content: '스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
        },
        answer: {
            type: 'speaking',
            options: [],
        }
    },
    {
        id: "id_113",
        question: {
            type: 'audio',
            prompt: '아래 문장을 보고 답하세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "/audios/audio_01.wav",
            content: "스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)",
        },
        answer: {
            type: 'speaking',
            options: [],
        }
    },
    {
        id: "id_114",
        question: {
            type: 'video',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: "https://videocdn.cdnpk.net/videos/e2e74372-70c9-47eb-9432-ccebd8d998fb/vertical/previews/watermarked/large.mp4",
            content: '스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
        },
        answer: {
            type: 'speaking',
            options: [],
        }
    },
]

const dummy_09 = [
    {
        id: "23423423",
        question: {
            type: 'text',
            // type: 'image',
            prompt: '다음 그림의 알맞은 의미를 골라주세요 (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            content: '스크립트 영역입니다. (문장 2줄 이상일 경우 케이스는 이렇게 됩니다.)',
            resource: " 나는 너를 사랑해나는",
            // resource: "path/to/image.jpg"
        },
        answer: {
            type: 'multiple',
            options: [
                {
                    id: "1-1",
                    question: 'what does the man offer to do?',
                    options: [
                        { id: 'a', resource: '옵션 1' },
                        { id: 'b', resource: '옵션 2' },
                        { id: 'c', resource: '옵션 3' },
                        { id: 'd', resource: '옵션 4' },
                    ],
                },
                {
                    id: "1-2",
                    question: 'what does the man offer to do2?',
                    options: [
                        { id: 'a', resource: '옵션 11' },
                        { id: 'b', resource: '옵션 22' },
                        { id: 'c', resource: '옵션 33' },
                        { id: 'd', resource: '옵션 44' },
                    ],
                },
                {
                    id: "1-3",
                    question: 'what does the man offer to do3?',
                    options: [
                        { id: 'a', resource: '옵션 111' },
                        { id: 'b', resource: '옵션 222' },
                        { id: 'c', resource: '옵션 333' },
                        { id: 'd', resource: '옵션 444' },
                    ],
                },
            ],
        }
    },
]
// ========================================


const fetchData = (id: number) => {
    // id 기반 API 호출
    // console.log(id);
    loading.value = true;

    // 결과 반환 - dummy 테스트, 추후 삭제
    setTimeout(() => {
        loading.value = false;
        let result = [] as any[];

        switch(questionId.value) {
            case 1:
                result = dummy_01;
                break;
            case 2:
                result = dummy_02;
                break;
            case 3:
                result = dummy_03;
                break;
            case 4:
                result = dummy_04;
                break;
            case 5:
                result = dummy_05;
                break;
            case 6:
                result = dummy_06;
                break;
            case 7:
                result = dummy_07;
                break;
            case 8:
                result = dummy_08;
                break;
            case 9:
                result = dummy_09;
                break;
        }

        state.quizList = result;
    }, 0)
};

// route.params.id가 변경될 때마다 fetchData 함수를 호출
watch(() => route.params.id, (newId: any) => {
    fetchData(newId);
}, { immediate: true });


</script>


<style lang="scss" scoped></style>
