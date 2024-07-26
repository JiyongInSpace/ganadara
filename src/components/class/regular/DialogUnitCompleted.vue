<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        fullscreen
    >
        <v-card class="background-quaternary">
            <!-- TITLE -->
            <v-toolbar
                class="bg-transparent"
                height="56"
            >
                <v-btn
                    icon="mdi-chevron-left"
                    size="small"
                    @click="dialog = false"
                />
            </v-toolbar>

            <v-container class="overflow-y-auto mb-22 ">
                <div class="font-weight-bold text-d-xs text-center mb-4">
                    {{ resultState.result || "-" }}
                </div>

                <v-img
                    v-if="resultState.image"
                    :src="resultState.image"
                    width="106"
                    height="98"
                    cover
                    class="mb-10 mx-auto"
                />
                <v-img
                    v-else
                    src="/images/class/default_video.png"
                    width="106"
                    height="98"
                    cover
                    class="mb-10 mx-auto"
                />

                <v-card class="d-flex ga-5 text-center py-5 mb-5">
                    <div class="flex-1-1-100">
                        <div class="mb-1 text-t-sm font-weight-medium text-text-secondary">
                            경험치
                        </div>

                        <div class="font-weight-bold text-d-xs animate__animated animate__bounceIn">
                            {{ resultState.experience }}
                        </div>
                    </div>

                    <div class="flex-1-1-100">
                        <div class="mb-1 text-t-sm font-weight-medium text-text-secondary">
                            학습시간
                        </div>

                        <div class="font-weight-bold text-d-xs animate__animated animate__bounceIn">
                            {{ resultState.studyTime }}
                        </div>
                    </div>
                </v-card>

                <div class="text-t-lg font-weight-bold mb-2-5">
                    핵심 표현
                </div>

                <div class="mb-2">
                    <ExpressionWordList :words="expressions.words" />
                </div>

                <div>
                    <ExpressionSentenceList :sentences="expressions.sentences" />
                </div>

                <div class="pb-5 px-4 flex-grow-0 position-fixed bottom-0 right-0 left-0 shadow">
                    <v-btn
                        block
                        variant="tonal"
                        size="x-large"
                        class="primary"
                        @click="onClickNext"
                    >
                        계속하기
                    </v-btn>
                </div>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const router = useRouter();

const props = defineProps<{
    state: any;
    expressions: any;
}>();

const dialog = defineModel("dialog");

const resultState = reactive({
    result: "",
    image: "",
    experience: 0,
    studyTime: 0,
    nextUnit: null as number | null,
})

watch(
    () => dialog.value,
    () => {
        if (dialog.value) {
            // TODO: API 호출 ==============
            resultState.result = "영상 학습 완료!";
            resultState.image = "/images/class/default_video.png";
            resultState.experience = 300;
            resultState.studyTime = 30;
            resultState.nextUnit = Number(props.state.classId) + 1;
            // ============================
        }
    });

// ================================

const onClickNext = () => {
    if(resultState.nextUnit) {
        router.push(`/class/regular/${resultState.nextUnit}`);
        dialog.value = false;
    }
}

</script>

<style lang="scss" scoped>
.mb-22 {
    margin-bottom: 88px;
}
</style>
