<template>
    <PageTemplate
        back-button
        no-spacer
    >
        <template v-slot:center-header>
            레벨 테스트
        </template>

        <template v-slot:content>
            <div class="flex-grow-1 d-flex justify-center align-center flex-column">
                <div class="w-100 d-flex justify-center rounded-xl mb-5">
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

                <div class="text-t-sm font-weight-regular text-center mb-2">
                    레벨 테스트가 완료되었습니다!
                </div>

                <div class="w-100 text-t-lg text-center mb-10">
                    당신은 Lvl.{{ level }} 사용자 중<br />
                    <span class="font-weight-bold">상위 {{ percentage }}%</span>입니다.
                </div>
            </div>
        </template>

        <template v-slot:actions>
            <div class="d-flex justify-center pt-3 px-3 pb-8">
                <v-btn
                    variant="tonal"
                    size="x-large"
                    class="primary flex-grow-0"
                    block
                    @click="onClickOk"
                >
                    확인
                </v-btn>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>

const router = useRouter();
const level = ref(5);
const percentage = ref(50);

const onClickOk = () => {
    alert("OK");
    router.push("/dashboard/additional/level_test");
}

</script>