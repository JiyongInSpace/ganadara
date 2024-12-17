<template>
    <div
        v-if="item.type == 'notification'"
        class="text-t-xs font-weight-bold text-center text-text-quaternary"
    >
        {{ item.message }}
    </div>

    <div
        v-if="item.type != 'notification' && item.user"
        class="d-flex ga-3"
    >
        <v-img
            :src="item.user.profile_image"
            width="40"
            height="40"
            class="flex-grow-0"
        ></v-img>

        <div>
            <div class="d-flex ga-3 mb-1-5">
                <div class="w-fit">
                    <div class="text-t-sm font-weight-medium mb-1-5">
                        {{ item.user.name }}
                    </div>

                    <div
                        v-if="item.information"
                        class="font-weight-medium"
                    >
                        {{ item.information }}
                    </div>

                    <v-img
                        v-if="item.image"
                        :src="item.image"
                        :aspect-ratio="231 / 120"
                        cover
                        class="flex-grow-0 rounded-8 mb-1-5"
                    ></v-img>

                    <v-card
                        v-if="!item.loading && item.message"
                        class="border-border-primary background-secondary rounded-8 rounded-ts-0 py-2-5 px-3-5"
                        variant="outlined"
                    >
                        <div
                            class="font-weight-medium"
                            v-html="item.message"
                        />
                    </v-card>

                    <v-card
                        v-if="item.select"
                        class="border-border-primary rounded-8 rounded-ts-0"
                        variant="outlined"
                    >
                        <div
                            v-for="selectItem in item.select"
                            class="d-flex justify-space-between border-b py-2-5 px-3-5 cursor-pointer"
                            @click="onClickSelect(selectItem)"
                        >
                            {{ selectItem.text }}

                            <div>
                                <v-chip
                                    v-if="selectItem.isBest"
                                    variant="outlined"
                                    color="primary"
                                    class="sm flex-grow-0 flex-shrink-0"
                                >
                                    BEST
                                </v-chip>
                            </div>
                        </div>

                        <div
                            class="text-center py-2-5 px-3-5 cursor-pointer"
                            @click="onClickMore"
                        >
                            more <v-icon icon="mdi-chevron-down" />
                        </div>
                    </v-card>

                    <div
                        v-if="item.loading"
                        class="d-flex ga-1 pt-1"
                    >
                        <v-card
                            v-for="(color, index) in loadingColors"
                            :key="index"
                            width="6"
                            height="6"
                            flat
                            :color="color"
                        ></v-card>
                    </div>
                </div>

                <div
                    v-if="!item.loading"
                    class="text-t-xs text-text-quaternary align-self-end truncate flex-shrink-0"
                >
                    {{ computedDate }}
                </div>
            </div>

            <div v-if="item.link">
                <v-btn
                    class="secondary rounded-xl py-1-5 mb-1-5"
                    variant="outlined"
                    size="small"
                    @click="onClickLink(item.link)"
                >
                    <span class="text-text-brand-tertiary text-decoration-underline">
                        외부 링크
                    </span>
                </v-btn>
            </div>

            <IconRecording
                v-if="item.type == 'message' && !item.loading"
                :size="24"
                :isActive="false"
            />
        </div>
    </div>

    <div v-if="item.type != 'notification' && !item.user">
        <div class="d-flex justify-end ga-3 mb-1-5">
            <div class="text-t-xs text-text-quaternary align-self-end truncate flex-shrink-0">
                {{ computedDate }}
            </div>

            <div class="w-fit">
                <v-card
                    class="border-border-primary background-secondary rounded-8 rounded-te-0 py-2-5 px-3-5"
                    variant="outlined"
                >
                    {{ item.message }}
                </v-card>
            </div>
        </div>

        <div class="d-flex justify-end">
            <IconRecording
                v-if="item.type == 'message' && !item.loading"
                :size="24"
                :isActive="false"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';
import { IChatItem } from './AiChatList.vue';

const props = defineProps<{
    item: IChatItem;
}>();


// date format -> 오전 05:55
const computedDate = computed(() => {
    return format(new Date(props.item.date), 'a hh:mm');
})

// 애니메이션 색상
const loadingColors = ref<string[]>(['#E0F2FE', '#E0F2FE', '#0BA5EC']); // 초기 색상
let colorIndex = 0; // 현재 활성화된 색상 인덱스
let intervalId: number | undefined;

// 색상 업데이트 함수
const updateColors = () => {
    // 색상 배열 초기화
    const newColors = ['#E0F2FE', '#E0F2FE', '#E0F2FE'];
    // 현재 활성화된 색상만 진하게 설정
    newColors[colorIndex] = '#0BA5EC';
    loadingColors.value = newColors;

    // 다음 색상 인덱스로 이동
    colorIndex = (colorIndex + 1) % 3;
};

const onClickLink = (link: string) => {
    window.open(link, '_blank');
};

const onClickSelect = (selectItem: { text: string }) => {
    alert(selectItem.text);
};

const onClickMore = () => {
    alert("서버에서 목록을 더 불러옵니다.");
};

// 컴포넌트가 마운트될 때 애니메이션 시작
onMounted(() => {
    intervalId = setInterval(updateColors, 1000); // 1초 간격으로 색상 업데이트
});

// 컴포넌트가 언마운트되면 애니메이션 정리
onBeforeUnmount(() => {
    if (intervalId) clearInterval(intervalId);
});
</script>
