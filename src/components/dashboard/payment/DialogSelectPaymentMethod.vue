<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card class="pt-9 px-5 pb-10 text-center rounded-16">
            <!-- 
            <div class="text-t-xl font-weight-bold mb-1 text-center">
                {{ paymentMethod }} 획득!
            </div> -->

            <div class="d-flex justify-space-between align-center mb-6">
                <div>
                    <span class="text-t-lg font-weight-bold mr-1">
                        {{ paymentMethod?.name }}({{ paymentMethod?.number }})
                    </span>

                    <span class="text-t-md font-weight-medium text-text-quaternary">
                        {{ paymentMethod?.type === 'credit' ? '신용' : '체크' }}
                    </span>
                </div>

                <div>
                    <v-chip
                        v-if="paymentMethod?.isDefault"
                        class="sm brand"
                        variant="outlined"
                    >
                        대표 카드
                    </v-chip>
                </div>
            </div>

            <div class="d-flex flex-column justify-center ga-1-5">
                <v-btn
                    @click="buttonSet.event.onClick"
                    variant="outlined"
                    class="flex-1-1-100 border-border-primary"
                    size="large"
                    :disabled="paymentMethod?.isDefault"
                >
                    대표카드 설정하기
                </v-btn>

                <v-btn
                    @click="buttonDelete.event.onClick"
                    variant="outlined"
                    class="flex-1-1-100 border-border-primary mb-2-5"
                    size="large"
                >
                    <span class="text-text-error-primary">
                        카드 삭제하기
                    </span>
                </v-btn>

                <div class="font-weight-medium text-text-quaternary">
                    대표 카드로 정기 결제가 진행됩니다.
                </div>
            </div>
        </v-card>
    </v-bottom-sheet>

    <v-dialog
        v-model="dialogSecond"
        transition="dialog-bottom-transition"
        max-width="400"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-16">
            <div class="text-t-xl font-weight-bold mb-1 text-center">
                카드 삭제
            </div>

            <div class="mb-6 font-weight-medium text-text-quaternary text-center">
                {{ paymentMethod?.name }}({{ paymentMethod?.number }}) 카드를 삭제하시겠습니까?
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    variant="outlined"
                    class="flex-1-1-100"
                    size="large"
                    @click="buttonCancel.event.onClick"
                >
                    취소
                </v-btn>

                <v-btn
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    @click="buttonDeleteConfirm.event.onClick"
                >
                    삭제하기
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const props = defineProps<{
    paymentMethod?: {
        id: number,
        name: string,
        type: string,
        number: string,
        isDefault: boolean,
    };
}>();

const emit = defineEmits<{
    (e: 'onClickDelete', method: any): void,
    (e: 'onClickSetDefault', method: any): void
}>();

const buttonSet = {
    event: {
        onClick: () => {
            dialog.value = false;
            emit('onClickSetDefault', props.paymentMethod);
        }
    }
}

const buttonDelete = {
    event: {
        onClick: () => {
            dialogSecond.value = true;
        }
    }
}

// 컨펌 팝업
const dialogSecond = ref(false);

const buttonCancel = {
    event: {
        onClick: () => {
            dialogSecond.value = false;
        }
    }
}

const buttonDeleteConfirm = {
    event: {
        onClick: () => {
            dialog.value = false;
            dialogSecond.value = false;
            emit('onClickDelete', props.paymentMethod);
        }
    }
}

</script>

<style lang="scss" scoped></style>