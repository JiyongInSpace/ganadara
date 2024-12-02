<template>
    <div class="w-100">
        <div class="mb-5 text-d-xs font-weight-semibold">
            <span v-text="userName"/> 님에 대해 더 알고 싶어요!
        </div>

        <div class="text-t-sm mb-1-5">나이</div>

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

        <v-select
            v-model="selectStudyTime.startDate.value"
            :items="selectStudyTime.items"
            item-title="name"
            item-text="name"
            item-value="code"
            variant="outlined"
            return-object
            placeholder="시작 시간"
            class="mb-2-5"
            hide-details
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
        >
            <template v-slot:prepend-item>
                <div class="text-t-md font-weight-bold py-2 px-4">
                    방해 금지 종료 시간을 선택해주세요
                </div>
            </template>
        </v-select>
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
            :disabled="!selectAge.value.value || !selectStudyTime.startDate.value || !selectStudyTime.endDate.value"
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
    defaultValue?: any
    userName?: string;
    setting?: boolean;
}>();

onMounted(() => {
    if(!props.defaultValue.results.age) return; 
    selectAge.value.value = selectAge.items.find((item) => item.code === props.defaultValue.results.age);
    selectStudyTime.startDate.value = selectStudyTime.items.find((item) => item.code === props.defaultValue.results.startDate);
    selectStudyTime.endDate.value = selectStudyTime.items.find((item) => item.code === props.defaultValue.results.endDate);
})

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

const buttonNext = {
    event: {
        onClick: () => {
            emit('onClickNext', {
                age: selectAge.value.value.code,
                startDate: selectStudyTime.startDate.value.code,
                endDate: selectStudyTime.endDate.value.code,
            });
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

<style lang="scss" scoped>
.mb-1-5 {
    margin-bottom: 6px;
}

.mb-2-5 {
    margin-bottom: 6px;
}
</style>