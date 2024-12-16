<template>
    <v-dialog
        v-model="computedModelValue"
        max-width="400"
    >
        <v-card class="pt-11 px-6 pb-6 text-center rounded-lg">
            <div class="text-d-xs font-weight-bold mb-1">
                다음에 하시겠습니까?
            </div>

            <div class="text-t-sm text-text-tertiary mb-5">
                언제든 내 정보를 수정할 수 있어요.
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    @click="buttonCancel.event.onClick"
                    variant="outlined"
                    class="secondary flex-1-1-100"
                    size="large"
                >
                    취소
                </v-btn>

                <v-btn
                    @click="buttonSkip.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    건너뛰기
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickSkip'): void
    (e: 'update:modelValue', id: any): boolean
}>();

const props = defineProps<{
    modelValue: boolean,
}>();

const computedModelValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

const buttonCancel = {
    event: {
        onClick: () => {
            emit('onClickCancel');
        }
    }
}

const buttonSkip = {
    event: {
        onClick: () => {
            emit('onClickSkip');
        }
    }
}

</script>