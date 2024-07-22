<template>
    <div class="w-100 flex-grow-1 d-flex flex-column">
        <div class="mb-1 text-d-xs font-weight-semibold">
            목표를 선택해 주세요.
        </div>

        <div class="text-t-sm mb-6">
            복수선택이 가능합니다.
        </div>

        <v-list
            lines="one"
            select-strategy="classic"
            v-model:selected="selectedGoals"
            class="mb-15"
        >
            <v-list-item
                v-for="(goalItem, index) in goalsList"
                :key="goalItem.key"
                :value="goalItem.key"
                variant="outlined"
                class="border rounded-lg px-3-5 font-weight-bold text-t-md"
                active-class="bg-primary"
                :class="index == goalsList.length - 1 ? 'mb-0' : 'mb-2-5'"
            >
                <div class="d-flex align-center">
                    <v-icon
                        :icon="goalItem.icon"
                        class="mr-2"
                        size="small"
                    />

                    <span v-text="goalItem.text">

                    </span>
                </div>


                <template v-slot:append>
                    <v-icon icon="mdi-check-circle" />
                </template>
            </v-list-item>
        </v-list>
    </div>

    <v-spacer />

    <div class="actions">
        <v-btn
            variant="outlined"
            size="x-large"
            @click="buttonPrev.event.onClick"
        >
            이전
        </v-btn>

        <v-btn
            class="primary"
            variant="tonal"
            size="x-large"
            :disabled="selectedGoals.length === 0"
            @click="buttonNext.event.onClick"
        >
            다음
        </v-btn>
    </div>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
    (e: 'onClickNext', id: any): void,
    (e: 'onClickPrev', id: any): void
}>()

const props = defineProps<{
    defaultValue?: any;
}>();

onMounted(() => {
    //
})

const selectedGoals = ref<string[]>([]);

const goalsList = [
    {
        "key": "conversation",
        "text": "회화",
        "icon": "mdi-message-processing-outline"
    },
    {
        "key": "academics",
        "text": "학업",
        "icon": "mdi-pencil-outline"
    },
    {
        "key": "test",
        "text": "시험",
        "icon": "mdi-book-open-outline"
    },
    {
        "key": "employment",
        "text": "취업",
        "icon": "mdi-laptop"
    },
    {
        "key": "work",
        "text": "업무",
        "icon": "mdi-calendar-blank-outline"
    },
    {
        "key": "job_change",
        "text": "이직",
        "icon": "mdi-briefcase-outline"
    },
    {
        "key": "travel",
        "text": "여행",
        "icon": "mdi-umbrella-beach-outline"
    },
    {
        "key": "hobby",
        "text": "취미",
        "icon": "mdi-cart-outline"
    },
    {
        "key": "self_development",
        "text": "자기계발",
        "icon": "mdi-book-open-outline"
    },
    {
        "key": "foreign_friends",
        "text": "외국인 친구",
        "icon": "mdi-hand-heart-outline"
    },
    {
        "key": "cultural_understanding",
        "text": "언어권 문화 이해",
        "icon": "mdi-star-four-points-outline"
    },
    {
        "key": "multicultural_family",
        "text": "다문화 가정",
        "icon": "mdi-emoticon-happy-outline"
    }
];

const buttonNext = {
    event: {
        onClick: () => {
            emit('onClickNext', { selectedGoals: selectedGoals.value });
        }
    }
}

const buttonPrev = {
    event: {
        onClick: () => {
            emit('onClickPrev', null);
        }
    }
}
</script>