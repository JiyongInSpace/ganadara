<template>
  <!-- PUBLISHING -->
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-card>
          <v-card-title>홈</v-card-title>

          <v-card-actions class="flex-wrap ga-2">
            <v-btn
              variant="outlined"
              to="/home/main"
            >
              메인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="auto">
        <v-card>
          <v-card-title>온보딩</v-card-title>

          <v-card-actions class="flex-wrap ga-2">
            <v-btn
              variant="outlined"
              to="/onboard/landing"
            >
              랜딩
            </v-btn>

            <v-btn
              variant="outlined"
              to="/onboard/sign_up"
            >
              회원가입
            </v-btn>

            <v-btn
              variant="outlined"
              to="/onboard/sign_up/survey"
            >
              성향 설문조사
            </v-btn>

            <v-btn
              variant="outlined"
              to="/onboard/sign_up/test"
            >
              레벨 테스트
            </v-btn>

            <v-btn
              variant="outlined"
              to="/onboard/log_in"
            >
              로그인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>


    <v-row justify="center">
      <v-col cols="auto">
        <v-card class="flex-column">
          <v-card-title>클래스</v-card-title>

          <v-card-actions class="flex-wrap ga-2 mb-5">
            <v-btn
              variant="outlined"
              to="/class"
            >
              메인
            </v-btn>

            <v-btn
              variant="outlined"
              to="/class/regular/1"
            >
              정규영상
            </v-btn>

            <v-btn
              variant="outlined"
              to="/class/shortform/1"
            >
              숏폼
            </v-btn>

            <v-btn
              variant="outlined"
              to="/class/quiz/1"
            >
              문제풀기 / 객관식 + 텍스트
            </v-btn>
            <v-btn
              variant="outlined"
              to="/class/quiz/2"
            >
              문제풀기 / 객관식 + 이미지
            </v-btn>
            <v-btn
              variant="outlined"
              to="/class/quiz/3"
            >
              문제풀기 / 객관식 + 오디오
            </v-btn>
            <v-btn
              variant="outlined"
              to="/class/quiz/4"
            >
              문제풀기 / 객관식 + 동영상
            </v-btn>
            <v-btn
              variant="outlined"
              to="/class/quiz/5"
            >
              문제풀기 / 주관식
            </v-btn>

            <v-btn
              variant="outlined"
              to="/class/quiz/6"
            >
              문제풀기 / 빈칸 + 텍스트선택
            </v-btn>

            <v-btn
              variant="outlined"
              to="/class/quiz/7"
            >
              문제풀기 / 문장 + 문장 완성하기
            </v-btn>

            <v-btn
              variant="outlined"
              to="/class/quiz/8"
            >
              문제풀기 / 스피킹
            </v-btn>

            <v-btn
              variant="outlined"
              to="/class/quiz/9"
            >
              문제풀기 / 멀티플
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="auto">
        <v-card class="flex-column">
          <v-card-title>커뮤니티</v-card-title>

          <v-card-actions class="flex-wrap ga-2 mb-5">
            <v-btn
              variant="outlined"
              to="/community"
            >
              커뮤니티
            </v-btn>

            <v-btn
              variant="outlined"
              to="/community/user/5"
            >
              유저 프로필
            </v-btn>

            <v-btn
              variant="outlined"
              to="/community/ranking"
            >
              랭킹
            </v-btn>

            <v-btn
              variant="outlined"
              to="/community/user/5/follow"
            >
              팔로우/팔로잉
            </v-btn>

            <v-btn
              variant="outlined"
              to="/community/user/5/badge"
            >
              뱃지/굿즈
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="auto">
        <v-card class="flex-column">
          <v-card-title>챌린지</v-card-title>

          <v-card-actions class="flex-wrap ga-2 mb-5">
            <v-btn
              variant="outlined"
              to="/challenge/mission"
            >
              미션 리스트
            </v-btn>

            <v-btn
              variant="outlined"
              to="/challenge/mission/quiz"
            >
              미션(퀴즈)
            </v-btn>

            <v-btn
              variant="outlined"
              to="/challenge/mission/chat_ai"
            >
              미션(AI 채팅)
            </v-btn>

            <v-btn
              variant="outlined"
              to="/challenge/mission/roulette"
            >
              미션(룰렛)
            </v-btn>

            <v-btn
              variant="outlined"
              to="/challenge/mission/invite"
            >
              미션(친구 초대)
            </v-btn>

            <v-btn
              variant="outlined"
              to="/challenge/mission/check"
            >
              미션(출석체크)
            </v-btn>

            <v-btn
              variant="outlined"
              to="/challenge/mission/study"
            >
              미션(학습 미션)
            </v-btn>

            <v-btn
              variant="outlined"
              to="/challenge/mission/community"
            >
              미션(커뮤니티)
            </v-btn>

            <v-btn
              variant="outlined"
              to="/challenge/mission/donate"
            >
              미션(후원)
            </v-btn>

            <v-btn
              variant="outlined"
              to="/challenge/mission/donate/1"
            >
              후원 상세
            </v-btn>

            <!-- <v-btn
              variant="outlined"
              to="/challenge/mission/donate/1"
            >
              후원 후기
            </v-btn> -->
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
//
</script>
