<template>
    <PageTemplate
        space="px-4"
        no-spacer
    >
        <template v-slot:prepend-header>
            <v-btn
                v-if="currentStep > 0"
                icon="mdi-close"
                size="small"
                variant="text"
                @click="buttonClose.event.onClick"
            />
        </template>

        <template v-slot:append-header>
            <v-btn
                v-if="currentStep > 0"
                size="small"
                variant="text"
                class="mt-1 font-weight-semibold"
                @click="buttonSkip.event.onClick"
            >
                건너뛰기
            </v-btn>
        </template>

        <template v-slot:content>
            <v-expand-transition>
                <v-progress-linear
                    v-if="currentStep > 0"
                    v-model="currentStep"
                    :max="totalSteps + 1"
                    class="flex-shrink-0 mb-5"
                    color="primary"
                />
            </v-expand-transition>

            <Survey_step_0
                v-if="currentStep === 0"
                :userName="userName"
                @onClickNext="compButtonNext.event.onClick"
                @onClickSkip="buttonSkip.event.onClick"
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
        </template>

        <template v-slot:actions>
            <Survey_skip
                v-model="dialogSkip.value.value"
                @onClickCancel="compButtonCancel.event.onClick"
                @onClickSkip="compButtonSkip.event.onClick"
            />
        </template>
    </PageTemplate>

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
            if (currentStep.value > 0) {
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