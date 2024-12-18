<template>
    <PageTemplate
        back-button
        header-background="secondary"
        background="secondary"
    >
        <template v-slot:center-header>
            알림 내역
        </template>

        <template v-slot:content>
            <div class="d-flex justify-space-between align-center mb-2-5">
                <span class="text-t-lg font-weight-bold">
                    알림 리스트
                </span>

                <div class="d-flex ga-2-5">
                    <v-select
                        v-model="state.category"
                        :items="sort_options"
                        return-object
                        class="flex-grow-0 background-secondary"
                        hide-details
                        flat
                        variant="solo"
                        item-title="name"
                        item-text="name"
                        item-value="code"
                        density="compact"
                        bg-color="bg-secondary"
                    >
                        <template v-slot:selection="{ item }">
                            <div class="text-t-sm font-weight-semibold mt-1">
                                {{ item.title }}
                            </div>
                        </template>

                        <template v-slot:item="{ props, item }">
                            <v-list-item
                                v-bind="props"
                                :title="item.title"
                            >
                                <template v-slot:prepend>
                                    <v-img
                                        :src="getIcon(item.value)"
                                        width="16"
                                        height="16"
                                        class="mr-2"
                                    />
                                </template>
                            </v-list-item>
                        </template>
                    </v-select>
                    <!-- <DialogSelectNotice v-model:category="state.category" /> -->
                </div>
            </div>

            <div
                v-for="item, key in computedList"
                :key="key"
                class="d-flex py-4"
            >
                <v-img
                    :src="getIcon(item.type)"
                    width="24"
                    height="24"
                    class="flex-grow-0 mr-2"
                />


                <div class="flex-grow-1">
                    <div class="d-flex justify-space-between mb-1-5">
                        <span class="text-t-sm font-weight-semibold">{{ item.title }}</span>

                        <span class="text-t-sm text-text-quaternary">
                            {{ formatDistanceToNow(item.created_at, {
                                locale: ko
                            }) }}
                        </span>
                    </div>

                    <div class="text-t-sm">{{ item.content }}</div>
                </div>
            </div>

            <div
                v-if="computedOldList.length > 0"
                class="d-flex align-center"
            >
                <div class="flex-1-1-100">
                    <v-divider></v-divider>
                </div>

                <div class="text-t-sm font-weight-medium flex-shrink-0 opacity-40 px-1-5">
                    이전 알림
                </div>

                <div class="flex-1-1-100">
                    <v-divider></v-divider>
                </div>
            </div>

            <div
                v-for="item, key in computedOldList"
                :key="key"
                class="d-flex py-4"
            >
                <v-img
                    :src="getIcon(item.type)"
                    width="24"
                    height="24"
                    class="flex-grow-0 mr-2"
                />

                <div class="flex-grow-1">
                    <div class="d-flex justify-space-between mb-1-5">
                        <span class="text-t-sm font-weight-semibold">{{ item.title }}</span>

                        <span class="text-t-sm text-text-quaternary">
                            {{ formatDistanceToNow(item.created_at, {
                                locale: ko
                            }) }}
                        </span>
                    </div>

                    <div class="text-t-sm">{{ item.content }}</div>
                </div>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const state = reactive({
    category: {
        code: 'all',
        name: '전체',
    },
    notifications: [
        {
            id: 1,
            type: 'notice',
            title: '공지 사항',
            content: '가나다라와 마이풀의 공지사항입니다. 가나다라와 마이풀의 공지사항입니다. 가나다라와 마이풀의 공지사항입니다.',
            created_at: '2024-12-04T14:30:15.123Z',
        },
        {
            id: 1,
            type: 'community',
            title: '커뮤니티 피드 댓글 알림',
            content: '피드에 새로운 댓글이 달렸어요. 지금 바로 확인해보세요.',
            created_at: '2024-12-04T14:30:15.123Z',
        },
        {
            id: 1,
            type: 'challenge',
            title: '챌린지 미션 알림',
            content: '000님을 위한 새로운 미션이 도착했어요. 위한 새로운 미션이 도착했어요.',
            created_at: '2024-12-04T14:30:15.123Z',
        },
        {
            id: 1,
            type: 'class',
            title: '영상 학습의 숏폼 영상',
            content: '000님, 숏폼 영상을 감상해보세요.',
            created_at: '2024-12-02T14:30:15.123Z',
        },
    ],
    old_notifications: [
        {
            id: 1,
            type: 'notice',
            title: '공지 사항',
            content: '가나다라와 마이풀의 공지사항입니다. 가나다라와 마이풀의 공지사항입니다. 가나다라와 마이풀의 공지사항입니다.',
            created_at: '2024-12-01T14:30:15.123Z',
        },
        {
            id: 1,
            type: 'community',
            title: '커뮤니티 피드 댓글 알림',
            content: '피드에 새로운 댓글이 달렸어요. 지금 바로 확인해보세요.',
            created_at: '2024-11-04T14:30:15.123Z',
        },
        {
            id: 1,
            type: 'challenge',
            title: '챌린지 미션 알림',
            content: '000님을 위한 새로운 미션이 도착했어요. 위한 새로운 미션이 도착했어요.',
            created_at: '2024-11-04T14:30:15.123Z',
        },
        {
            id: 1,
            type: 'class',
            title: '영상 학습의 숏폼 영상',
            content: '000님, 숏폼 영상을 감상해보세요.',
            created_at: '2024-11-02T14:30:15.123Z',
        },
    ],
});

const computedList = computed(() => {
    return state.notifications.filter((item) => {
        if (state.category?.code === 'all') return true;
        return item.type === state.category.code;
    });
})

const computedOldList = computed(() => {
    return state.old_notifications.filter((item) => {
        if (state.category?.code === 'all') return true;
        return item.type === state.category.code;
    });
})

const getIcon = (_type: string) => {
    switch (_type) {
        case 'notice':
            return '/icons/IconNoticeAnnouncement.svg';
        case 'community':
            return '/icons/IconNoticeMessage.svg';
        case 'challenge':
            return '/icons/IconNoticeDate.svg';
        case 'class':
            return '/icons/IconNoticePlay.svg';
        case 'ai':
            return '/icons/IconNoticeAi.svg';
        case 'etc':
            return '/icons/IconNoticeSlider.svg';
        default:
            return '/icons/IconNoticeAll.svg';
    }
}

const sort_options = [
    {
        code: 'all',
        name: '전체',
    },
    {
        code: 'notice',
        name: '공지사항',
    },
    {
        code: 'community',
        name: '커뮤니티',
    },
    {
        code: 'challenge',
        name: '챌린지',
    },
    {
        code: 'class',
        name: '클래스',
    },
    {
        code: 'ai',
        name: 'AI',
    },
    {
        code: 'etc',
        name: '기타',
    },
]

</script>


<style lang="scss" scoped>
:deep(.v-field__input) {
    padding: 0 !important;
}

:deep(.v-field--appended) {
    align-items: center;
    padding: 0 !important;
}
</style>