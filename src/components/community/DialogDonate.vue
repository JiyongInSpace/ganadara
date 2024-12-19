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
                후원 방식 선택
            </div>

            <div class="text-t-sm text-text-tertiary text-center mb-7">
                후원하고자 하는 방식을 선택해주세요.
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
                        <div class="w-100">
                            <div class="text-t-md font-weight-medium text-text-secondary">
                                {{ radio.label }}
                            </div>

                            <div class="text-t-md text-text-quaternary">
                                {{ radio.description }}
                            </div>

                            <div
                                v-if="radio.value === 'point'"
                                class="text-end w-100 text-t-sm"
                            >
                                <span>포인트 잔액: </span>
                                <span class="font-weight-bold">{{ wallet.point.toLocaleString() }} 포인트</span>
                            </div>

                            <div
                                v-if="radio.value === 'won'"
                                class="text-end w-100 text-t-sm"
                            >
                                <span>원화 잔액: </span>
                                <span class="font-weight-bold">{{ wallet.won.toLocaleString() }} 달러</span>
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
                    :disabled="!state.radios"
                    @click="onClickSelectDonate"
                >
                    선택
                </v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';

const userStore = useUserStore();
const { wallet } = storeToRefs(userStore);

const emit = defineEmits<{
    (e: 'onSelectDonate', methods: string): void
}>();


const dialog = defineModel("dialog");

const state = reactive({
    radios: "point",
});

const radioList = [
    {
        label: "포인트",
        description: "보유하신 포인트로 후원합니다.",
        value: "point"
    },
    {
        label: "원화 달러",
        description: "보유하신 원화 달러로 후원합니다.",
        value: "won"
    },
]

const onClickSelectDonate = () => {
    dialog.value = false;
    emit('onSelectDonate', state.radios);
}


</script>

<style lang="scss" scoped></style>