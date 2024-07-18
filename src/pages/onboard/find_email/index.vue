<template>
  <v-container class="d-flex flex-column fill-height">
    <div class="py-2 w-100 h-14">
      <v-btn
        v-if="!isFound"
        icon="mdi-arrow-left"
        size="small"
        variant="text"
      />
    </div>
    
    <Find_account
      v-if="!isFound"
      @onClickNext="compButtonNext.event.onClick"
    />

    <Find_account_result
      v-if="isFound"
      :foundedEmail="foundedEmail"
      @onClickNext="compButtonNext.event.onClick"
    />
  </v-container>
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


<style lang="scss" scoped>
.h-14 {
  height: 56px;
}
</style>