<template>
  <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
    <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
      <span class="text-t-xl font-weight-semibold">
        클래스
      </span>
    </div>

    <div>
      <v-tabs
        v-model="tabMain.tab.value"
        align-tabs="center"
        stacked
        grow
        height="48"
      >
        <v-tab
          v-for="(mainTabItem, i) in tabMain.list"
          :key="i"
          :value="mainTabItem"
        >
          {{ mainTabItem }}
        </v-tab>
      </v-tabs>
    </div>

    <RegularMain />

    <!-- <v-tabs-window v-model="tabMain.tab.value">
      <v-tabs-window-item value="regular">
        <RegularMain />
      </v-tabs-window-item>

      <v-tabs-window-item value="lecture">
        <LectureMain />
      </v-tabs-window-item>

      <v-tabs-window-item value="short_form">
        <ShortFormMain />
      </v-tabs-window-item>
    </v-tabs-window> -->
  </v-container>
</template>

<script lang="ts" setup>

const tabMain = {
  list: [
    'regular',
    'short_form',
    'lecture',
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