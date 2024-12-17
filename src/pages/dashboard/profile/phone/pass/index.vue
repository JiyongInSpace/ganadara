<template>
    <PageTemplate back-button>

        <template v-slot:content>
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
                :disabled="state.isValid"
                @click="onClickButtonPass"
            >
                PASS로 인증하기
            </v-btn>
        </template>

        <template v-slot:bottom>
        </template>

        <template v-slot:actions>
            <div class="pt-4 px-2-5 pb-8">
                <v-btn
                    variant="tonal"
                    size="large"
                    class="primary flex-grow-0"
                    block
                    :disabled="!state.isValid"
                    @click="onClickButtonNext"
                >
                    확인
                </v-btn>
            </div>
        </template>
    </PageTemplate>

    <v-dialog
        v-model="state.dialog"
        transition="dialog-bottom-transition"
    >
        <v-card
            class="pt-9 px-5 pb-5 text-center rounded-16 mx-auto"
            width="100%"
            max-width="400"
        >
            <div class="text-t-xl font-weight-bold text-center mb-6">
                인증이 완료되었습니다.
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    @click="state.dialog = false"
                >
                    확인
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const { phone_number } = storeToRefs(userStore);

const state = reactive({
    phone_number: '',
    isValid: false,
    dialog: false,
})


onMounted(() => {
    state.phone_number = route.query.phone as string;
})

const onClickButtonPass = () => {
    alert("PASS");
    state.dialog = true;

    const isValid = true;
    state.isValid = isValid;
}

const onClickButtonNext = () => {
    phone_number.value = state.phone_number;
    router.push("/dashboard/profile");
}
</script>
