<template>
    <div class="w-100 pt-5">
        <div class="mb-1 text-d-md font-weight-bold text-center">
            레벨 테스트를<br />
            진행해 주세요!
        </div>

        <div class="text-t-sm text-center">
            레벨 테스트 결과에 따라<br />
            나에게 맞는 학습 콘텐츠를 추천받을 수 있어요.
        </div>

    </div>

    <div class="d-flex justify-center align-center py-5 flex-grow-1 w-100">
        <v-img
            src="/images/onboard/carousel_01.png"
            cover
            max-width="247"
            max-height="239"
            aspect-ratio="1/1"
        />
    </div>

    <div class="actions">
        <v-btn
            variant="outlined"
            size="x-large"
            @click="buttonSkip.event.onClick"
        >
            건너뛰기
        </v-btn>

        <v-btn
            variant="tonal"
            size="x-large"
            class="primary"
            @click="buttonNext.event.onClick"
        >
            테스트하러 가기
        </v-btn>
    </div>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
    (e: 'onClickNext', id: any): void,
    (e: 'onClickSkip', id: any): void
}>()


const buttonNext = {
    event: {
        onClick: () => {
            emit('onClickNext', null);
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