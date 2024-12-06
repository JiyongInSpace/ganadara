<template>
    <PageTemplate
        back-button
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                AI 채팅
            </span>
        </template>

        <template v-slot:content>
            <AiChatList :list="state.chatList"></AiChatList>
        </template>

        <template v-slot:actions>
            <div v-if="!state.isFreeConversation && state.answerList && state.answerList.length > 0">
                <div class="d-flex ga-2 overflow-x-auto pt-2 px-2 pb-5">
                    <v-card
                        v-for="answerItem, index in state.answerList"
                        color="#FEF0C7"
                        max-width="326"
                        min-height="92"
                        class="py-2-5 px-3-5 flex-shrink-0"
                        flat
                        @click="onClickAnswer(answerItem)"
                    >
                        {{ answerItem.message }}
                    </v-card>
                </div>
            </div>

            <v-btn
                v-if="!state.isFreeConversation"
                block
                variant="tonal"
                class="primary rounded-0 flex-grow-0 text-none"
                size="large"
                @click="onClickGoingForFreeConversation"
            >
                Going for a free conversation
            </v-btn>

            <div class="d-flex align-center background-secondary ga-1 py-4 px-6">
                <div
                    class="flex-grow-1"
                >
                    <v-textarea
                        v-if="state.inputMethod == 'text'"
                        v-model="state.message"
                        :append-inner-icon="state.message && 'mdi-send-outline'"
                        hide-details
                        variant="outlined"
                        placeholder="메세지를 입력하세요."
                        auto-grow
                        rows="1"
                        max-rows="10"
                        min-height="40"
                        @click:appendInner="onClickSendMessage"
                    />

                    <div
                        v-else
                        class="d-flex justify-center align-center h-100"
                    >
                        <v-img
                            src="/images/dashboard/ai_chat/voice.png"
                            height="30"
                        >
                        </v-img>
                    </div>
                </div>

                <div>
                    <v-btn
                        size="small"
                        variant="text"
                        class="pa-0"
                        width="28"
                        min-width="28"
                        height="28"
                        @click="onClickMicrophone"
                    >
                        <v-icon
                            icon="mdi-microphone-outline"
                            size="20"
                        ></v-icon>
                    </v-btn>
                </div>

                <v-btn
                    size="small"
                    variant="text"
                    class="pa-0"
                    width="28"
                    min-width="28"
                    height="28"
                    @click="onClickQuestion"
                >
                    <v-icon
                        icon="mdi-comment-question-outline"
                        size="20"
                    ></v-icon>
                </v-btn>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { IAnswerItem, IChatItem } from '@/components/dashboard/additional/ai_chat/AiChatList.vue';


const state = reactive({
    chatList: [
        {
            id: 0,
            message: "Lily_G_ai가 채팅방에 입장했습니다.",
            date: "2024-12-09T14:29:15.123Z",
            type: "notification",
        },
        {
            id: 1,
            message: '안녕하세요',
            date: "2024-12-09T14:30:15.123Z",
        },
        {
            id: 2,
            user: {
                name: '홍길동',
                profile_image: "/logo/ganadara.png",
            },
            message: '안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요',
            date: "2024-12-09T14:30:15.123Z",
            image: "https://cdn.vuetifyjs.com/images/cards/desert.jpg",
            link: 'https://www.naver.com',
        },
        {
            id: 3,
            user: {
                name: '김철수',
                profile_image: "/logo/ganadara.png",
            },
            message: '안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요',
            date: "2024-12-09T14:30:15.123Z",
        },
        {
            id: 4,
            user: {
                name: '홍길동',
                profile_image: "/logo/ganadara.png",
            },
            message: '안녕하세요',
            date: "2024-12-09T14:30:15.123Z",
        },
        {
            id: 5,
            message: '안녕하세요',
            date: "2024-12-10T14:30:15.123Z",
        },
        {
            id: 6,
            message: '안녕하세요',
            date: "2024-12-10T14:30:15.123Z",
        },
        {
            id: 7,
            message: '안녕하세요',
            date: "2024-12-10T14:30:15.123Z",
        },
        {
            id: 8,
            message: '안녕하세요',
            date: "2024-12-10T14:30:15.123Z",
        },
        {
            id: 9,
            user: {
                name: '홍길동',
                profile_image: "/logo/ganadara.png",
            },
            message: '안녕하세요',
            date: "2024-12-10T14:30:15.123Z",
        },
        {
            id: 10,
            user: {
                name: '홍길동',
                profile_image: "/logo/ganadara.png",
            },
            message: '안녕하세요',
            date: "2024-12-10T14:30:15.123Z",
            loading: true,
        },
    ] as IChatItem[],
    answerList: [
        {
            id: 0,
            message: '안녕하세요',
        },
        {
            id: 1,
            message: '안녕하세요',
        },
        {
            id: 2,
            message: `IT involves respecting other’s time and opinios,
            and following social norms. This helps create a
            productive work environment.`,
        },
    ] as IAnswerItem[],
    isFreeConversation: false,
    inputMethod: 'text',
    message: '',
})

const onClickAnswer = (answerItem: IAnswerItem) => {
    alert(answerItem.message);
    state.message = answerItem.message;
}

const onClickGoingForFreeConversation = () => {
    alert("Going for a free conversation");
    state.isFreeConversation = true;
}

const onClickSendMessage = () => {
    alert(state.message);
    state.message = '';
}

const onClickMicrophone = () => {
    if (state.inputMethod === 'voice') {
        state.inputMethod = 'text';
        return;
    }
    state.inputMethod = 'voice';
}

const onClickQuestion = () => {
    alert("Question");
}

</script>

<style lang="scss" scoped>
:deep(.v-field.v-field--appended){
    align-items: end;
}
:deep(.v-field__append-inner) {
    padding-bottom: 10px;
}
</style>