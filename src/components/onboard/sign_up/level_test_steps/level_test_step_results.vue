<template>
    <v-spacer />

    <div class="w-100 d-flex justify-center rounded-xl">
        <ProgressBar
            :level="level"
            :size="{ width: 241, height: 228 }"
            class="mb-5"
        >
            <div class="text-center">
                <div class="text-t-sm">
                    레벨 테스트 결과
                </div>

                <div class="text-d-md font-weight-semibold">
                    Level <span v-text="level" />
                </div>
            </div>
        </ProgressBar>
    </div>

    <div class="text-t-sm font-weight-regular text-center mb-2">
        레벨 테스트가 완료되었습니다!
    </div>

    <div class="w-100 text-t-lg text-center mb-10">
        당신은 Lvl.{{ level }} 사용자 중<br />
        <span class="font-weight-bold">상위 {{ percentage }}%</span>입니다.
    </div>

    <v-spacer />

    <v-btn
        variant="tonal"
        size="x-large"
        class="primary flex-grow-0"
        block
        @click="buttonGoToHome.event.onClick"
    >
        확인
    </v-btn>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
    (e: 'onClickGoToHome', id: any): void,
}>()

const level = ref(4);
const percentage = ref(50);


const buttonGoToHome = {
    event: {
        onClick: () => {
            emit('onClickGoToHome', null);
        }
    }
}
</script>