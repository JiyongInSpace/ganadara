<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        persistent
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-16 z-1">
            <div class="text-t-xl font-weight-bold text-center mb-6">
                회원 가입하고 콘텐츠 계속 보기
            </div>

            <div class="d-flex flex-column justify-center ga-1-5 flex-shrink-0">
                <v-btn
                    @click="buttonMain.event.onClick"
                    class="primary"
                    variant="tonal"
                    size="large"
                >
                    이메일 가입하기
                </v-btn>

                <v-btn
                    @click="buttonSub.event.onClick"
                    variant="outlined"
                    size="large"
                    class="primary"
                >
                    SNS 가입하기
                </v-btn>

                <v-btn
                    @click="buttonBack.event.onClick"
                    variant="text"
                    size="large"
                >
                    돌아가기
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");
const router = useRouter();

const emit = defineEmits<{
    (e: 'onClickMain'): void
    (e: 'onClickSub'): void,
    (e: 'onClickBack'): void,
}>();

const buttonMain = {
    event: {
        onClick: () => {
            emit('onClickMain');
            dialog.value = false;
            router.push('/onboard/sign_up');
        }
    }
}


const buttonSub = {
    event: {
        onClick: () => {
            emit('onClickSub');
            dialog.value = false;
            router.push('/onboard/sign_up');
        }
    }
}

const buttonBack = {
    event: {
        onClick: () => {
            router.back();
        }
    }
}


</script>

<style lang="scss" scoped></style>