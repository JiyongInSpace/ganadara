<template>
  <PageTemplate
    back-button
    no-spacer
  >
    <template v-slot:append-header>
      <v-btn
        v-if="currentStep == 0"
        size="small"
        variant="text"
        class="mt-1 font-weight-semibold px-0"
      >
        건너뛰기
      </v-btn>
    </template>

    <template v-slot:content>
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
    </template>

    <template v-slot:bottom>
    </template>

    <template v-slot:actions>
    </template>
  </PageTemplate>
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
