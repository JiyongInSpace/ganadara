<template>
    <div class="pt-4 w-100 flex-grow-1 d-flex flex-column">
        <div class="mb-1 text-d-xs font-weight-bold">
            휴대폰을 인증해 주세요
        </div>

        <div class="mb-5 text-t-sm">
            PASS를 통해 본인을 인증해 주세요.
        </div>

        <v-btn
            variant="tonal"
            size="large"
            class="primary flex-grow-0"
            block
            :disabled="buttonNext.isValid.value"
            @click="buttonPass.event.onClick"
        >
            PASS로 인증하기
        </v-btn>

        <v-spacer />

        <v-btn
            variant="tonal"
            size="large"
            class="primary flex-grow-0"
            block
            :disabled="!buttonNext.isValid.value"
            @click="buttonNext.event.onClick"
        >
            확인
        </v-btn>
    </div>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
    (e: 'onClickNext', email: string): void
}>()

const foundedEmail = ref('');

const buttonPass = {
    event: {
        onClick: () => {
            alert("PASS");

            const isValid = true;
            buttonNext.isValid.value = isValid;
            foundedEmail.value = "robin582@careerzen.org"
        }
    }
}

const buttonNext = {
    isValid: ref(false),
    event: {
        onClick: () => {
            emit('onClickNext', foundedEmail.value);
        }
    },
}

</script>

<style scoped lang="scss"></style>