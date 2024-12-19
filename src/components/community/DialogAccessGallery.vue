<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="400"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-16">
            <div class="text-t-xl font-weight-bold mb-1 text-center">
                사진 라이브러리에 접근할 수 있도록<br/>
                허가해 주세요.
            </div>

            <div class="text-t-md font-weight-medium mb-6 text-center text-text-quaternary">
                액세스를 허용하면 가나다라에서 회원님의<br/>
                라이브러리에 있는 사진을 공유하고<br/>
                카메라 롤에 사진을 저장할 수 있습니다.
            </div>

            <div class="d-flex justify-center ga-1-5">
                <v-btn
                    @click="buttonCancel.event.onClick"
                    variant="outlined"
                    class="flex-1-1-100 secondary"
                    size="large"
                >
                    취소
                </v-btn>

                <v-btn
                    @click="buttonAccess.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    허용
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickAccess'): void
}>();

const buttonCancel = {
    event: {
        onClick: () => {
            dialog.value = false;
            // emit('onClickCancel');
        }
    }
}

const buttonAccess = {
    event: {
        onClick: () => {
            emit('onClickAccess');
            dialog.value = false;
        }
    }
}


</script>

<style lang="scss" scoped></style>