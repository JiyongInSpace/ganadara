<template>
  <PageTemplate
    back-button
    no-spacer
  >
    <template v-slot:content>
      <Log_in_by_email
        v-if="currentStep === 0"
        @onClickNext="compButtonNext.event.onClick"
      />
    </template>

    <template v-slot:bottom>
    </template>

    <template v-slot:actions>
    </template>
  </PageTemplate>
</template>

<script lang="ts" setup>
import Log_in_by_email from '@/components/onboard/log_in/email/log_in_by_email.vue';

const router = useRouter();

const totalSteps = ref(1);
const currentStep = ref(0);

const signUpInfo = reactive({
  results: {
    // step1
    country: null,

    // step2

  }
});

const buttonBack = {
  event: {
    onClick: (_event: any) => {
      if (currentStep.value === 0) {
        router.push("/onboard/sign_up")
      }

      currentStep.value--;
    }
  }
};


const compButtonNext = {
  event: {
    onClick: (_event: any) => {
      if (_event) {
        signUpInfo.results = {
          ...signUpInfo.results,
          ..._event,
        }
      }

      currentStep.value++;

      // 결과 전달 ========================
      if (currentStep.value >= totalSteps.value) {
        alert(JSON.stringify(signUpInfo.results));
        router.push("/onboard/sign_up/survey")
      }
      //========================
    }
  }
}
</script>
