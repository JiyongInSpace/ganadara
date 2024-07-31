<template>
  <!-- PUBLISHING -->
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-card>
          <v-card-title>온보딩</v-card-title>
    
          <v-card-actions class="flex-wrap ga-2">
            <v-btn variant="outlined" to="/onboard/landing">
              랜딩
            </v-btn>

            <v-btn variant="outlined" to="/onboard/sign_up">
              회원가입
            </v-btn>

            <v-btn variant="outlined" to="/onboard/sign_up/survey">
              성향 설문조사
            </v-btn>

            <v-btn variant="outlined" to="/onboard/sign_up/test">
              레벨 테스트
            </v-btn>

            <v-btn variant="outlined" to="/onboard/log_in">
              로그인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row justify="center">
      <v-col cols="auto">
        <v-card>
          <v-card-title>클래스</v-card-title>
    
          <v-card-actions class="flex-wrap ga-2">
            <v-btn variant="outlined" to="/class">
              메인
            </v-btn>

            <v-btn variant="outlined" to="/class/regular/1">
              정규영상
            </v-btn>

            <v-btn variant="outlined" to="/class/question/1">
              문제풀기1
            </v-btn>

            <v-btn variant="outlined" to="/class/question/2">
              문제풀기2
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- <HelloWorld /> -->
</template>

<script lang="ts" setup>
  //
</script>