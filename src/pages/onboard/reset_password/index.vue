<template>
  <PageTemplate
    back-button
    no-spacer
  >
    <template v-slot:content>
      <Reset_password
        :defaultValue="signUpInfo"
        @onClickNext="compButtonNext.event.onClick"
      />
    </template>
  </PageTemplate>
</template>

<script lang="ts" setup>

const router = useRouter();

const totalSteps = ref(1);
const currentStep = ref(0);

const signUpInfo = reactive({
  results: {
    password: "",
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

      // 결과 전달 ========================
      if (currentStep.value >= totalSteps.value) {
        alert(JSON.stringify(signUpInfo.results));
        router.push("/")
      }
      //========================
    }
  }
}
</script>
