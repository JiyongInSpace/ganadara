<template>
  <v-container class="d-flex flex-column fill-height">
    <div class="py-2 w-100">
      <v-btn
        icon="mdi-arrow-left"
        size="small"
        variant="text"
        @click="buttonBack.event.onClick"
      />
    </div>

    <Log_in_by_email
      v-if="currentStep === 0"
      @onClickNext="compButtonNext.event.onClick"
    />

  </v-container>
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
      if(currentStep.value === 0) {
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
