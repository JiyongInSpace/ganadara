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

    <Select_country
      v-if="currentStep === 0"
      :defaultValue="signUpInfo"
      @onClickNext="compButtonNext.event.onClick"
    />

    <Create_password
      v-if="currentStep === 1"
      :defaultValue="signUpInfo"
      @onClickNext="compButtonNext.event.onClick"
    />
    <Pick_username
      v-if="currentStep === 2"
      :defaultValue="signUpInfo"
      @onClickNext="compButtonNext.event.onClick"
    />
    <Verify_email
      v-if="currentStep === 3"
      @onClickNext="compButtonNext.event.onClick"
    />

  </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();

const totalSteps = ref(4);
const currentStep = ref(0);

const signUpInfo = reactive({
  results: {
    // step1
    country: null,

    // step2
    password: "",

    // step3
    user_name: "",
    referral_code: null,
    service_terms: [],

    // step4
    email: "",
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

      console.log(_event);
      console.log(signUpInfo.results);

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
