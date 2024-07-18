<template>
  <v-container class="d-flex flex-column fill-height">
    <div class="py-2 w-100">
      <v-btn
        icon="mdi-arrow-left"
        size="small"
        variant="text"
      />
    </div>

    <Select_country
      v-if="currentStep === 0"
      @onClickNext="compButtonNext.event.onClick"
    />

    <Create_password
      v-if="currentStep === 1"
      @onClickNext="compButtonNext.event.onClick"
    />
    <Pick_username
      v-if="currentStep === 2"
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

  }
});

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
