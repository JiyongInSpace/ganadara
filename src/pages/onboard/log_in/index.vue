<template>
  <v-container class="d-flex flex-column fill-height justify-center align-center">
    <v-img
      :width="150"
      aspect-ratio="1/1"
      cover
      class="flex-grow-0 mb-6"
      src="/logo/logo_ganadara.png"
    />

    <div class="text-d-xs font-weight-bold mb-2 text-center">
      마이풀에 오신 것을 환영합니다!
    </div>

    <div className="mb-9 text-center">
      간편하게 로그인하고 시작해보세요.
    </div>

    <v-btn
      variant="tonal"
      size="large"
      class="primary flex-grow-0 mb-9 truncate"
      block
      to="log_in/email"
    >
      <!-- <template v-slot:prepend>
        <v-icon icon="mdi-email"></v-icon>
      </template> -->

      이메일로 계속하기
    </v-btn>

    <text-devider
      text="또는"
      class="mb-6"
    />

    <v-row
      class="flex-grow-0 ga-3 mb-9"
      align="center"
      justify="center"
      no-gutters
    >
      <v-col
        v-for="platform in platforms"
        :key="platform"
        cols="auto"
      >
        <!-- ==================================== -->
        <!-- 소셜 로그인 버튼 (추후 치환) -->
        <v-btn
          width="44"
          height="44"
          class="rounded-lg border border-border-primary"
          variant="outlined"
          icon
          @click="onClickSocialLogin(platform)"
        >
          <img
            :src="`/logo/logo_${platform}.png`"
            width="24"
            height="24"
          />
        </v-btn>
        <!-- ==================================== -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// const router = useRouter();

const platforms = [
  "x",
  "facebook",
  "google",
  "apple",
];


// event
// const onClickEmailLogin = () => {
//   //
// };

const onClickSocialLogin = (_platform: string) => {
  alert(_platform);
  // router.push("/onboard/sign_up/social");
};

</script>

<style scoped>
.pt-26 {
  padding-top: 110px;
}

.no-padding-btn {
  padding: 0;
  height: fit-content !important;
  margin-bottom: 1px;
}
</style>
