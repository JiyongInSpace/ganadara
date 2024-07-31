<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative">
            <!-- v-if="currentStep > 0" -->
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
                @click="router.back()"
            />

            <div class="text-t-lg font-weight-bold">
                문제 풀기
            </div>

            <!-- v-if="currentStep > 0" -->
            <v-btn
                size="small"
                variant="text"
                class="mt-1 font-weight-semibold"
                @click="onClickSkip"
            >
                건너뛰기
            </v-btn>
        </div>

        <div class="mx-4">

            <v-expand-transition>
                <!-- v-if="currentStep > 0" -->
                <!-- v-model="currentStep"
                :max="totalSteps + 1" -->
                <v-progress-linear
                    class="mb-5"
                    height="8"
                    rounded-bar
                    rounded="4"
                />
            </v-expand-transition>
        </div>

        <QuestionWizard 
            :question-type="questionId"
        />

        <DialogSkip
            v-model:dialog="dialogSkip"
        />
    </v-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { throttle } from 'lodash-es';

const route = useRoute();
const router = useRouter();

const questionId = computed(() => {
  const id = route.params.id;
  return Array.isArray(id) ? Number(id[0]) : Number(id);
});

const dialogSkip = ref(false);

const state = reactive({
});

const loading = ref(false);

const fetchData = (id: number) => {
    // id 기반 API 호출
    console.log(id);
    loading.value = true;


    // 결과 반환 - dummy 테스트, 추후 삭제
    setTimeout(() => {
        loading.value = false;
        const result = {
        };
    }, 2000)
};

// route.params.id가 변경될 때마다 fetchData 함수를 호출
watch(() => route.params.id, (newId: any) => {
    fetchData(newId);
}, { immediate: true });

const onClickSkip = () => {
    dialogSkip.value = true;
};


</script>


<style lang="scss" scoped></style>