<template>
  <PageTemplate
    back-button
    no-spacer
  >
    <template v-slot:append-header>
      <v-btn
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
      <Pick_username
        v-if="currentStep === 1"
        :defaultValue="signUpInfo"
        @onClickNext="compButtonNext.event.onClick"
      />
    </template>

    <template v-slot:bottom>
    </template>

    <template v-slot:actions>
    </template>
  </PageTemplate>
  <!-- 
  <v-container>
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
    <Pick_username
      v-if="currentStep === 1"
      :defaultValue="signUpInfo"
      @onClickNext="compButtonNext.event.onClick"
    />
  </v-container> -->
</template>

<script lang="ts" setup>

const router = useRouter();

const totalSteps = ref(2);
const currentStep = ref(0);

const signUpInfo = reactive({
  results: {
    // step1
    country: null,

    // step2
    user_name: null,
    referral_code: null,
    service_terms: null,
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
