<template>
    <div
        v-if="computedFoundedEmail"
        class="pt-4 w-100 flex-grow-1 d-flex flex-column"
    >
        <div class="mb-4 text-d-md font-weight-bold text-center mb-10">
            이메일 주소를<br />
            성공적으로 찾았습니다.
        </div>

        <v-card
            variant="outlined"
            height="60"
            class="py-4 pl-6 pr-3 rounded-lg border border-border-primary d-flex justify-space-between align-center"
        >
            <span
                class="text-t-lg font-weight-semibold"
                v-text="computedFoundedEmail"
            />

            <v-btn
                icon="mdi-content-copy"
                variant="text"
                size="small"
                :disabled="!computedFoundedEmail"
                @click="buttonCopy.event.onClick"
            />
        </v-card>

        <v-spacer />

        <v-btn
            variant="tonal"
            size="large"
            class="primary flex-grow-0"
            block
            to="log_in"
        >
            <!-- @click="buttonNext.event.onClick" -->
            로그인하러 가기
        </v-btn>
    </div>

    <div
        v-else
        class="pt-4 w-100 flex-grow-1 d-flex flex-column"
    >
        <div class="mb-4 text-d-xs font-weight-bold">
            없어용
        </div>

    </div>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
    (e: 'onClickNext', id: string): void // 패스워드 반환
}>()

const props = defineProps<{
    foundedEmail: string
}>();

const computedFoundedEmail = computed(() => {
    return props.foundedEmail || false;
});

const buttonCopy = {
    event: {
        onClick: () => {
            computedFoundedEmail.value &&
                navigator.clipboard.writeText(computedFoundedEmail.value);
        }
    }
}

// const buttonNext = {
//     event: {
//         onClick: () => {
//             //
//         }
//     }
// }

</script>

<style scoped lang="scss"></style>