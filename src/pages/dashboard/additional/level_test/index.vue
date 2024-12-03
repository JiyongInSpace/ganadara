<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                레벨 테스트
            </span>
        </div>

        <div class="py-5 px-4">
            <div class="font-weight-bold mb-10">
                현재 나의 레벨
            </div>

            <div class="w-100 d-flex justify-center rounded-xl mb-10">
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

            <div class="w-100 text-t-lg font-weight-bold text-center mb-10">
                당신은 Lvl.5 사용자 중<br />
                상위 10%입니다.
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
        </div>
    </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();
const level = ref(7);
const percentage = ref(50);

const onClickRetest = () => {
    alert("test");
    router.push("/dashboard/additional/level_test/result");
}

</script>