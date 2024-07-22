<template>
    <v-container class="fill-height d-flex flex-column pt-0">
        <div class="w-100 h-14 d-flex align-center justify-space-between">
            <v-btn
                v-if="currentStep > 0"
                icon="mdi-close"
                size="small"
                variant="text"
                @click="buttonClose.event.onClick"
            />

            <v-btn
                v-if="currentStep > 0"
                size="small"
                variant="text"
                class="mt-1 font-weight-semibold"
                @click="buttonSkip.event.onClick"
            >
                건너뛰기
            </v-btn>
        </div>

        <v-expand-transition>
            <v-progress-linear
                v-if="currentStep > 0"
                v-model="currentStep"
                :max="totalSteps + 1"
                class="mb-5"
            />
        </v-expand-transition>

        <!-- <div
            v-if="currentStep > 0"
            class="d-flex w-100 ga-1 mb-11"
        >
            <LinearStepper
                v-model="currentStep"
                :steps="totalSteps"
            />
        </div> -->

        <Survey_step_0
            v-if="currentStep === 0"
            :userName="userName"
            @onClickNext="compButtonNext.event.onClick"
            @onClickPrev="compButtonPrev.event.onClick"
        />
        <Survey_step_1
            v-if="currentStep === 1"
            :userName="userName"
            :defaultValue="userSurvey"
            @onClickNext="compButtonNext.event.onClick"
            @onClickPrev="compButtonPrev.event.onClick"
        />
        <Survey_step_2
            v-if="currentStep === 2"
            :defaultValue="userSurvey"
            @onClickNext="compButtonNext.event.onClick"
            @onClickPrev="compButtonPrev.event.onClick"
        />
        <Survey_step_3
            v-if="currentStep === 3"
            @onClickNext="compButtonNext.event.onClick"
            @onClickPrev="compButtonPrev.event.onClick"
        />

        <!--
            관심사 삭제 ?
            <Survey_step_4
                v-if="currentStep === 4"
                @onClickNext="compButtonNext.event.onClick"
                @onClickPrev="compButtonPrev.event.onClick"
            /> 
        -->

        <Survey_skip
            v-model="dialogSkip.value.value"
            @onClickCancel="compButtonCancel.event.onClick"
            @onClickSkip="compButtonSkip.event.onClick"
        />
    </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();

const totalSteps = ref(3);
const currentStep = ref(0);

const userName = ref('000');

const userSurvey = reactive({
    results: {
        // step1
        age: null,
        studyTime: null,

        // step2
        selectedLanguage: null,
        selectedLanguageYouWant: [],

        // step3
        selectedGoals: [],

        // step4
        interests: [],
    }
});

const dialogSkip = {
    value: ref(false),
}

// 상단 X
const buttonClose = {
    event: {
        onClick: () => {
            currentStep.value = 0;
        }
    }
}

const buttonSkip = {
    event: {
        onClick: () => {
            dialogSkip.value.value = true;
        }
    }
}

const compButtonCancel = {
    event: {
        onClick: () => {
            dialogSkip.value.value = false;
        }
    }
}

const compButtonSkip = {
    event: {
        onClick: () => {
            router.push("/onboard/sign_up/test")
        }
    }
}

const compButtonPrev = {
    event: {
        onClick: (_event: any) => {
            if(currentStep.value > 0) {
                currentStep.value--;
            }
        }
    }
}

const compButtonNext = {
    event: {
        onClick: (_event: any) => {
            if (_event) {
                userSurvey.results = {
                    ...userSurvey.results,
                    ..._event,
                }
            }

            if (currentStep.value < totalSteps.value) {
                // 중간 저장 ========================
                // console.log('submit', userSurvey.results);
                //========================

                currentStep.value++;
            } else {
                // 결과 전달 ========================
                alert(JSON.stringify(userSurvey.results));
                router.push("/onboard/sign_up/test")
                //========================
            }
        }
    }
}



</script>

<style lang="scss" scoped>
.h-14 {
    height: 56px;
}
</style>