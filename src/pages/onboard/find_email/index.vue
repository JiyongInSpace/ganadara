<template>
  <PageTemplate
    back-button
    no-spacer
  >
    <template v-slot:content>
      <Find_account
        v-if="!isFound"
        @onClickNext="compButtonNext.event.onClick"
      />

      <Find_account_result
        v-if="isFound"
        :foundedEmail="foundedEmail"
        @onClickNext="compButtonNext.event.onClick"
      />
    </template>
  </PageTemplate>
</template>

<script lang="ts" setup>

const isFound = ref(false); // 계정 찾음 여부
const foundedEmail = ref(''); // 찾은 이메일 (없을시 실패)

const compButtonNext = {
  event: {
    onClick: (_email: any) => {
      isFound.value = true;
      foundedEmail.value = _email;
    }
  }
}

</script>