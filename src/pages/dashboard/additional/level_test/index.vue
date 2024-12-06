<template>
    <PageTemplate
        space="px-4"
        back-button
    >
        <template v-slot:center-header>
            레벨 테스트
        </template>

        <template v-slot:content>
            <div class="font-weight-bold mb-8">
                현재 나의 레벨
            </div>

            <div class="w-100 d-flex justify-center rounded-xl mb-8">
                <ProgressBar
                    :level="level"
                    :size="{ width: 241, height: 228 }"
                    class="mb-5"
                >
                    <div class="text-center">
                        <div class="text-t-sm">
                            나의 레벨
                        </div>

                        <div class="text-d-md font-weight-semibold">
                            Level <span v-text="level" />
                        </div>
                    </div>
                </ProgressBar>
            </div>

            <div class="w-100 text-t-lg text-center mb-10">
                당신은 Lvl.{{ level }} 사용자 중<br />
                <span class="font-weight-bold">상위 {{percentage}}%</span>입니다.
            </div>

            <v-btn
                variant="tonal"
                size="x-large"
                class="primary flex-grow-0"
                block
                @click="onClickRetest"
            >
                테스트 다시 보기
            </v-btn>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
const router = useRouter();
const level = ref(5);
const percentage = ref(50);

const onClickRetest = () => {
    alert("test");
    router.push("/dashboard/additional/level_test/result");
}

</script>