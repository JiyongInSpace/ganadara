<template>
  <PageTemplate
    space="pa-0"
    no-gap
    no-spacer
    background="secondary"
  >
    <template v-slot:prepend-header>
      클래스
    </template>

    <template v-slot:content>
      <div class="background-primary">
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
            <div class="d-flex align-center ga-1">
              <v-img
                v-if="mainTabItem === 'regular'"
                src="/images/class/regular.png"
                width="24"
                height="24"
              />
              <v-img
                v-if="mainTabItem === 'short_form'"
                src="/images/class/short_form.svg"
                width="24"
                height="24"
              />
              <span class="font-weight-semibold">
                {{ t(mainTabItem) }}
              </span>
            </div>
          </v-tab>
        </v-tabs>
      </div>

      <div class="flex-grow-1 overflow-y-auto position-relative">
        <RegularMain v-if="tabMain.tab.value == 'regular'" />
        <LectureList v-if="tabMain.tab.value == 'lecture'" />
      </div>
    </template>

    <template v-slot:bottom>
    </template>

    <template v-slot:actions>
      <app-bottom-navigation />
    </template>
  </PageTemplate>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const router = useRouter();

const tabMain = {
  list: [
    'regular',
    'short_form',
    'lecture',
  ],
  tab: ref('regular'),
}

watch(
  () => tabMain.tab.value,
  () => {
    switch (tabMain.tab.value) {
      case 'regular':
        console.log(1);
        break;
      case 'short_form':
        router.push("/class/shortform/1");
        break;
      case 'lecture':
        // router.push("/class/shortform/1");
        break;
    }
  }
)


const { t } = useI18n({
  messages: {
    ko: {
      regular: "정규학습",
      short_form: "숏폼",
      lecture: "강의리스트",
    },
  },
  inheritLocale: true, // 전역 locale 상속
  useScope: "local", // 로컬 스코프 설정
});

</script>