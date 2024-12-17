<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card
            class="pt-9 px-5 pb-5 text-center rounded-16 mx-auto"
            width="100%"
            max-width="400"
        >
            <div class="text-t-xl font-weight-bold text-center mb-1">
                개인정보 수집 및 이용 동의 {{ marketing ? "철회" : "" }}
            </div>

            <div class="text-t-md font-weight-medium mb-8 text-center text-text-quaternary">
                {{ marketing ? "개인정보 수집 및 이용 동의를 철회할까요?" : "개인정보 수집 및 이용 동의할까요?" }}
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    @click="buttonCancel.event.onClick"
                    variant="outlined"
                    size="large"
                    class="flex-1-1-100"
                >
                    취소
                </v-btn>

                <v-btn
                    @click="buttonMarketing.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    {{ marketing ? "철회하기" : "동의하기" }}
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';

const settingStore = useSettingStore();
const { marketing } = storeToRefs(settingStore);
const dialog = defineModel("dialog");
const router = useRouter();

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickDisagree'): void
}>();

const buttonCancel = {
    event: {
        onClick: () => {
            dialog.value = false;
        }
    }
}

const buttonMarketing = {
    event: {
        onClick: () => {
            marketing.value = !marketing.value;
            dialog.value = false;
            router.push("/dashboard/setting/marketing")
        }
    }
}


</script>

<style lang="scss" scoped></style>