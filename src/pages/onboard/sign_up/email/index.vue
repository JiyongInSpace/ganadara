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
        @click="dialogSkip.value.value = true"
      >
        건너뛰기
      </v-btn>
    </template>
    <!-- "<순서 변경>
    1. 이메일 가입 >> 국가선택 >> 약관동의+닉네임/추천코드 입력 >> 이메일인증 >> 비밀번호입력 으로 수정 필요" -->
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
      <Verify_email
        v-if="currentStep === 2"
        @onClickNext="compButtonNext.event.onClick"
      />
      <Find_account
        v-if="currentStep === 3 && signUpInfo.results.country === 'KR'"
        @onClickNext="compButtonNext.event.onClick"
      />
      <Create_password
        v-if="currentStep === 4"
        :defaultValue="signUpInfo"
        @onClickNext="compButtonNext.event.onClick"
      />
    </template>

    <template v-slot:bottom>
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
import Verify_phone from '@/components/onboard/sign_up/sign_up_steps/verify_phone.vue';

const router = useRouter();

const totalSteps = ref(5);
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

      if(currentStep.value == 2 && signUpInfo.results.country != 'KR') {
        currentStep.value++;
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

const dialogSkip = {
  value: ref(false),
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
      currentStep.value++;
      dialogSkip.value.value = false;
    }
  }
}

</script>
