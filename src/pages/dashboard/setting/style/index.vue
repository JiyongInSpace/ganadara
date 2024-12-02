<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                설정
            </span>
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto background-secondary">
            <div class="px-4 py-5 mb-2 background-primary">
                <div class="mb-5 text-d-xs font-weight-semibold">
                    기본 학습 정보
                </div>

                <div class="text-t-sm mb-1-5">연령대</div>

                <v-select
                    v-model="selectAge.value.value"
                    :items="selectAge.items"
                    item-title="name"
                    item-text="name"
                    item-value="code"
                    variant="outlined"
                    return-object
                    placeholder="나이 선택"
                    class="mb-5"
                    hide-details
                >
                    <template v-slot:message>
                        <div class="text-t-md font-weight-bold py-2 px-4">
                            message
                        </div>
                    </template>

                    <template v-slot:no-data>
                        <div class="text-t-md font-weight-bold py-2 px-4">
                            no-data
                        </div>
                    </template>

                    <template v-slot:prepend-item>
                        <div class="text-t-md font-weight-bold py-2 px-4">
                            나이를 선택해주세요
                        </div>
                    </template>
                </v-select>

                <div class="text-t-sm mb-1-5">방해 금지 시간</div>

                <div class="d-flex ga-2">
                    <v-select
                        v-model="selectStudyTime.startDate.value"
                        :items="selectStudyTime.items"
                        item-title="name"
                        item-text="name"
                        item-value="code"
                        variant="outlined"
                        return-object
                        placeholder="시작 시간"
                        hide-details
                        class="flex-1-1-100"
                    >
                        <template v-slot:prepend-item>
                            <div class="text-t-md font-weight-bold py-2 px-4">
                                방해 금지 시작 시간을 선택해주세요
                            </div>
                        </template>
                    </v-select>

                    <v-select
                        v-model="selectStudyTime.endDate.value"
                        :items="selectStudyTime.items"
                        item-title="name"
                        item-text="name"
                        item-value="code"
                        variant="outlined"
                        return-object
                        placeholder="종료 시간"
                        hide-details
                        class="flex-1-1-100"
                    >
                        <template v-slot:prepend-item>
                            <div class="text-t-md font-weight-bold py-2 px-4">
                                방해 금지 종료 시간을 선택해주세요
                            </div>
                        </template>
                    </v-select>
                </div>
            </div>

            <div class="flex-grow-1 px-4 py-5 background-primary">
                <div class="mb-1 text-d-xs font-weight-semibold">
                    관심 주제
                </div>

                <v-chip-group
                    selected-class="primary"
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
        </div>

        <div class="d-flex flex-column ga-5 pt-4 px-2-5 pb-8 background-primary">
            <v-btn
                variant="tonal"
                block
                size="large"
                class="primary"
                @click="onClickSave"
            >
                저장하기
            </v-btn>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();

const selectAge = {
    value: ref(),
    items: [
        { name: '14~19', code: '10' },
        { name: '20~29', code: '20' },
        { name: '30~39', code: '30' },
        { name: '40~49', code: '40' },
        { name: '50~59', code: '50' },
        { name: '60~99', code: '60' },
        { name: "선택 안함", code: '00' },
    ],
}


const selectStudyTime = {
    startDate: ref(),
    endDate: ref(),

    items: [
        { name: '09:00', code: '0' },
        { name: '10:00', code: '1' },
        { name: '11:00', code: '2' },
        { name: '12:00', code: '3' },
        { name: '13:00', code: '4' },
        { name: '14:00', code: '5' },
        { name: '15:00', code: '6' },
        { name: '16:00', code: '7' },
        { name: '17:00', code: '8' },
        { name: '18:00', code: '9' },
        { name: '19:00', code: '10' },
        { name: '20:00', code: '11' },
    ],
}


const interests = ref<string[]>([]);

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


const onClickSave = () => {
    alert('저장');
}

</script>

<style lang="scss" scoped>
.h-14 {
    height: 56px;
}
</style>