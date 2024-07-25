<template>
  <v-container class="pa-0">
    <div>
      클래스
    </div>

    <v-tabs
      v-model="tabMain.tab.value"
      align-tabs="center"
      stacked
      grow
    >
      <v-tab
        v-for="(mainTabItem, i) in tabMain.list"
        :key="i"
        :value="mainTabItem"
      >
        {{ mainTabItem }}
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tabMain.tab.value">
      <!-- 정규학습 -->
      <v-tabs-window-item value="regular">
        <RegularMain />
      </v-tabs-window-item>

      <!-- 강의 리스트 -->
      <v-tabs-window-item value="lecture">
        <LectureMain />
      </v-tabs-window-item>

      <!-- 숏폼 -->
      <v-tabs-window-item value="short_form">
        <ShortFormMain />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script lang="ts" setup>

const tabMain = {
  list: [
    'regular',
    'lecture',
    'short_form',
  ],
  tab: ref('regular'),
}

const tabSub = {
  list: [
    'level',
    'theme',
    'favorite',
  ],
  tab: ref('level'),
}


</script>