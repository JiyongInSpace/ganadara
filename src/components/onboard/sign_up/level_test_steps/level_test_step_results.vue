<template>
    <v-spacer />

    <div class="w-100 d-flex justify-center rounded-xl">
        <Progress-bar
            :strokeWidth="24"
            :percentage="percentage"
            :size="{ width: 241, height: 228 }"
            hasBackground
            class="mb-5"
        >
            <div class="text-center">
                <div class="text-t-sm">
                    레벨테스트 결과
                </div>

                <div class="text-d-md font-weight-semibold">
                    Level <span v-text="level" />
                </div>
            </div>
        </Progress-bar>
    </div>

    <div class="text-t-sm font-weight-regular text-center mb-2">
        레벨 테스트가 완료되었습니다!
    </div>

    <div class="w-100 text-t-lg font-weight-bold text-center">
        당신은 Lvl.7 사용자 중에<br />
        상위 10%입니다.
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

const level = ref(7);
const percentage = ref(50);


const buttonGoToHome = {
    event: {
        onClick: () => {
            emit('onClickGoToHome', null);
        }
    }
}
</script>