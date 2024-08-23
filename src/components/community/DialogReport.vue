<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-img
                src="/icons/IconMessageAlertSquare.svg"
                width="24"
                height="24"
                alt="contact-us"
                class="flex-grow-0"
                v-bind="activatorProps"
            />
        </template>

        <v-card class="pt-9 px-4 pb-5 rounded-t-16">
            <div class="text-t-xl font-weight-bold text-center mb-0-5">
                신고
            </div>

            <div class="text-t-sm text-text-tertiary text-center mb-7">
                신고하는 이유를 선택해 주세요.
            </div>

            <v-radio-group v-model="state.radios">
                <v-radio
                    v-for="radio in radioList"
                    :key="radio.value"
                    :value="radio.value"
                    class="py-2 align-start ga-3"
                    color="primary"
                >
                    <template v-slot:label>
                        <div>
                            <div class="text-t-md font-weight-medium text-text-secondary">
                                {{ radio.label }}
                            </div>

                            <div class="text-t-md text-text-quaternary">
                                {{ radio.description }}
                            </div>
                        </div>
                    </template>

                </v-radio>
            </v-radio-group>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    @click="buttonReportConfirm.event.onClick"
                    :disabled="!state.radios"
                >
                    신고하기
                </v-btn>
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
                신고하시겠습니까?
            </div>

            <div class="mb-6 font-weight-medium text-text-quaternary text-center">
                {{ selectedRadio?.label }}: {{ selectedRadio?.description }}을(를) 사유로 해당 게시물/사용자/댓글을 신고합니다.
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
                    @click="buttonReport.event.onClick"
                >
                    신고하기
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar'

const snackbar = useSnackbarStore();

const props = defineProps<{
    reportId: string;
}>();

const dialog = defineModel("dialog");
const dialogSecond = ref(false);

const state = reactive({
    radios: null,
});

const radioList = [
    {
        label: "스팸",
        description: "원치 않는 홍보, 반복적인 콘텐츠",
        value: "1"
    },
    {
        label: "부적절한 콘텐츠",
        description: "나체, 성적인 콘텐츠, 폭력적이거나 불쾌한 이미지",
        value: "2"
    },
    {
        label: "사기 또는 허위 정보",
        description: "사기성 행위, 허위 정보, 잘못된 정보",
        value: "3"
    },
    {
        label: "혐오 발언 또는 심각한 폭력",
        description: "인종차별, 성차별, 동성애 혐오, 폭력적 위협.",
        value: "4"
    },
    {
        label: "자살 또는 자해",
        description: "자살, 자해, 자살을 부추기는 콘텐츠",
        value: "5"
    },
    {
        label: "지적 재산권 침해",
        description: "저작권, 상표권 침해",
        value: "6"
    },
    {
        label: "프라이버시 침해",
        description: "사생활 침해, 개인 정보 노출",
        value: "7"
    },
    {
        label: "신분 사칭",
        description: "사칭하는",
        value: "8"
    },
]

const selectedRadio = computed(() => {
    return radioList.find(radio => radio.value === state.radios);
})

const buttonCancel = {
    event: {
        onClick: () => {
            dialogSecond.value = false;
        }
    }
}

const buttonReport = {
    event: {
        onClick: () => {
            snackbar.showSnackbar("신고 접수가 완료되었습니다.");
            // console.log(props.reportId);
            dialog.value = false;
            dialogSecond.value = false;
            state.radios = null;
        }
    }
}

const buttonReportConfirm = {
    event: {
        onClick: () => {
            dialogSecond.value = true;
        }
    }
}
</script>

<style lang="scss" scoped></style>