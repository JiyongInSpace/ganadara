<template>
    <div>
        <div
            v-for="(group, groupIndex) in groupedMessages"
            :key="groupIndex"
        >
            <!-- 날짜 표시 -->
            <div class="text-center my-4">
                <v-chip
                    class="secondary"
                    variant="outlined"
                    size="x-small"
                >
                    {{ group.date }}
                </v-chip>
            </div>

            <!-- 해당 날짜의 메시지들 -->
            <div class="d-flex flex-column ga-5">
                <AiChatItem
                    v-for="(item, messageIndex) in group.messages"
                    :key="item.id"
                    :item="item"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

export interface IChatItem {
    id: number;
    user?: {
        name: string;
        profile_image: string;
    }
    message: string;
    date: string;
    link?: string;
    image?: string;
    type?: 'message' | 'notification';
    loading?: boolean;
}

export interface IAnswerItem {
    id: number;
    message: string;
}

const props = defineProps<{
    list: IChatItem[];
}>();

// 날짜별로 그룹화된 메시지 리스트 생성
const groupedMessages = computed(() => {
    // 날짜를 키로 하고, 메시지 배열을 값으로 갖는 객체 타입 정의
    const grouped: Record<string, IChatItem[]> = {};

    props.list.forEach(item => {
        const dateKey = new Date(item.date).toLocaleDateString(); // "YYYY.MM.DD" 형식 생성
        if (!grouped[dateKey]) {
            grouped[dateKey] = []; // 초기화
        }
        grouped[dateKey].push(item);
    });

    // 날짜별로 그룹화된 데이터를 반환
    return Object.keys(grouped).map(date => ({
        date,
        messages: grouped[date],
    }));
});
</script>

<style scoped>
.my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>