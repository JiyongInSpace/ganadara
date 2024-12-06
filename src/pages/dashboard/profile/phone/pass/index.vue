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
</template>

<script lang="ts" setup>
const router = useRouter();

const state = reactive({
    foundedEmail: '',
    isValid: false,
})

const onClickButtonPass = () => {
    alert("PASS");

    const isValid = true;
    state.isValid = isValid;
    state.foundedEmail = "robin582@careerzen.org"
}

const onClickButtonNext = () => {
    alert(state.foundedEmail);
    router.push("/dashboard/profile");
}
</script>
