<template>
    <div class="pt-4 w-100">
        <div class="mb-4 text-h5 font-weight-bold">
            휴대폰을 인증해 주세요
        </div>

        <div class="mb-6 text-body-1">
            PASS 앱 혹은 SNS를 통해 본인을 인증해 주세요
        </div>

        <v-btn
            variant="tonal"
            size="x-large"
            class="primary flex-grow-0 mb-2"
            block
            @click="buttonPass.event.onClick"
        >
            PASS 앱으로 인증하기
        </v-btn>

        <v-btn
            variant="outlined"
            size="x-large"
            class="flex-grow-0"
            block
            @click="buttonSns.event.onClick"
        >
            SNS 으로 인증하기
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
    (e: 'onComplete', id: any): void // 전화번호 반환
}>()

const buttonPass = {
    event: {
        onClick: () => {
            alert("PASS");
        }
    }
}

const buttonSns = {
    event: {
        onClick: () => {
            alert("SNS");
        }
    }
}

</script>