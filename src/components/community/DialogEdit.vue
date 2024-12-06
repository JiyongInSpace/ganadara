<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-icon
                icon="mdi-dots-horizontal"
                v-bind="activatorProps"
            ></v-icon>
        </template>

        <v-card class="pt-9 px-4 pb-5 rounded-t-16">
            <div class="d-flex flex-column justify-center ga-3">
                <v-btn
                    class="primary flex-1-1-100 text-start"
                    variant="text"
                    size="large"
                >
                    <template v-slot:prepend>
                        <v-icon
                            icon="mdi-pencil-outline"
                            width="20"
                            height="20"
                        />
                    </template>
                    수정
                </v-btn>
                <v-btn
                    class="flex-1-1-100"
                    variant="text"
                    size="large"
                    @click="onClickReport"
                >
                    <template v-slot:prepend>
                        <v-icon
                            icon="mdi-trash-can-outline"
                            width="20"
                            height="20"
                        />
                    </template>
                    삭제
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
                게시물을 삭제하시겠습니까?
            </div>

            <div class="mb-6 font-weight-medium text-text-quaternary text-center">
                게시물을 삭제하면 되돌릴 수 없으며, <br />
                게시물에 달린 댓글도 함께 삭제됩니다.
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    variant="outlined"
                    class="flex-1-1-100"
                    size="large"
                    @click="onClickCancel"
                >
                    취소
                </v-btn>

                <v-btn
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    @click="onClickDelete"
                >
                    삭제
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar'

const snackbar = useSnackbarStore();

const props = defineProps<{
    editId: string;
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

const onClickCancel = () => {
    dialogSecond.value = false;
}

const onClickDelete = () => {
    // console.log(props.editId);

    snackbar.showSnackbar("댓글이 삭제되었습니다.");
    dialog.value = false;
    dialogSecond.value = false;
    state.radios = null;
}

const onClickReport = () => {
    dialogSecond.value = true;
}
</script>

<style lang="scss" scoped></style>