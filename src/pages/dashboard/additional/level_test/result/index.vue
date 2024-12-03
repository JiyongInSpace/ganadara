<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                레벨 테스트
            </span>
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto px-4 py-5">
            <div class="flex-grow-1 d-flex justify-center align-center flex-column">
                <div class="w-100 d-flex justify-center rounded-xl mb-5">
                    <Progress-bar
                        :strokeWidth="24"
                        :percentage="percentage"
                        :size="{ width: 241, height: 228 }"
                        hasBackground
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
                    </Progress-bar>
                </div>

                <div class="text-t-sm font-weight-regular text-center mb-2">
                    레벨 테스트가 완료되었습니다!
                </div>

                <div class="w-100 text-t-lg font-weight-bold text-center mb-10">
                    당신은 Lvl.5 사용자 중<br />
                    상위 10%입니다.
                </div>
            </div>

            <div>
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
        </div>
    </v-container>
</template>

<script lang="ts" setup>

const router = useRouter();
const level = ref(7);
const percentage = ref(50);

const onClickOk = () => {
    alert("OK");
    router.push("/dashboard/additional/level_test");
}

</script>