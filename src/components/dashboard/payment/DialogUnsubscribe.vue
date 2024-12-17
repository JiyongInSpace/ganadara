<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        persistent
        max-width="400"
    >
        <v-card
            class="pt-9 px-5 pb-5 text-center rounded-16"
        >
            <div class="text-t-xl font-weight-bold text-center mb-1">
                정말 정기 결제 해지하시겠습니까?
            </div>

            <div class="mb-6 font-weight-medium text-text-quaternary text-center">
                정기 결제 해지하시면 {{ subscription?.endDate }}까지만 이용할 수 있습니다.
            </div>

            <div class="d-flex justify-center ga-1-5">
                <v-btn
                    variant="outlined"
                    class="flex-1-1-100 border-border-secondary"
                    size="large"
                    @click="onClickButtonUnsubscribe"
                >
                    해지
                </v-btn>

                <v-btn
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    @click="onClickButtonCancel"
                >
                    취소
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { subscription } = storeToRefs(userStore);


const dialog = defineModel("dialog");
const router = useRouter();

const emit = defineEmits<{
    (e: 'onClickMain'): void
    (e: 'onClickSub'): void,
    (e: 'onClickBack'): void,
}>();

const onClickButtonCancel = () => {
    dialog.value = false;
}

const onClickButtonUnsubscribe = () => {
    dialog.value = false;
    router.push("/dashboard/payment/ticket/cancel/complete");
}



</script>

<style lang="scss" scoped></style>