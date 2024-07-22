<template>
    <div class="w-100 pt-5">
        <div class="mb-1 text-d-md font-weight-bold text-center">
            <span v-text="userName"/> 님에 대해<br />
            더 알고싶어요!
        </div>

        <div class="text-t-sm text-center">
            성향 설문 조사를 통해 추천 알고리즘이 더 똑똑해져요!<br />
            내 정보는 가입 후 언제든 수정할 수 있어요.
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
            다음
        </v-btn>
    </div>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
    (e: 'onClickNext', id: any): void,
    (e: 'onClickSkip', id: any): void
}>()

const props = defineProps<{
    userName?: string;
}>();

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