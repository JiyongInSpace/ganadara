<!-- 디자인 단계에서 소멸 -->
<template>
    <div class="w-100">

        <div class="mb-1 text-h5 font-weight-bold">
            Your interests
        </div>

        <div class="text-body-2 mb-6">
            Select multiple interests
        </div>

        <v-chip-group
            selected-class="bg-pink-lighten-4 text-pink"
            v-model="interests"
            column
            multiple
        >
            <v-chip
                v-for="tag in languagesTags"
                :key="tag.code"
                :value="tag.code"
                variant="outlined"
                size="x-large"
            >
                <v-icon
                    icon="mdi-town-hall"
                    start
                />

                <span v-text="tag.text" />
            </v-chip>
        </v-chip-group>
    </div>

    <v-spacer />

    <div class="d-flex flex-column flex-grow-0 ga-2 w-100">
        <v-btn
            variant="tonal"
            size="x-large"
            class="primary"
            block
            :disabled="!interests"
            @click="buttonNext.event.onClick"
        >
            Next
        </v-btn>

        <v-btn
            variant="text"
            size="x-large"
            block
            @click="buttonSkip.event.onClick"
        >
            Skip (4/5)
        </v-btn>
    </div>
</template>

<script lang="ts" setup>

const interests = ref<string[]>([]);

const emit = defineEmits<{
    (e: 'onClickNext', id: any): void,
    (e: 'onClickSkip', id: any): void
}>()

const languagesTags = [
    {
        text: '회화',
        code: 'conversation'
    },
    {
        text: '학업',
        code: 'studies'
    },
    {
        text: '시험',
        code: 'exams'
    },
    {
        text: '취업',
        code: 'employment'
    },
    {
        text: '업무',
        code: 'work'
    },
    {
        text: '이직',
        code: 'job_change'
    },
    {
        text: '여행',
        code: 'travel'
    },
    {
        text: '취미',
        code: 'hobbies'
    },
    {
        text: '자기계발',
        code: 'self_development'
    },
    {
        text: '외국인친구',
        code: 'foreign_friends'
    },
    {
        text: '언어권문화이해',
        code: 'understanding_of_culture'
    },
    {
        text: '다문화가정',
        code: 'multicultural_family'
    },
]

const buttonNext = {
    event: {
        onClick: () => {
            emit('onClickNext', {
                interests: interests.value
            });
        }
    }
}

const buttonSkip = {
    event: {
        onClick: () => {
            emit('onClickSkip', null);
        }
    }
}
</script>