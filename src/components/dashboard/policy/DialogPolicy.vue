<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
        :z-index="0"
    >
        <v-card class="pt-0 px-5 pb-5 z-0">
            <v-sheet
                class="d-flex justify-center align-center text-center flex-shrink-0"
                height="56"
            >
                <span class="text-t-lg font-weight-bold ">
                    약관 및 정책
                </span>
            </v-sheet>

            <v-btn
                icon="mdi-close"
                class="position-absolute top-3 right-3"
                size="small"
                variant="text"
                @click="dialog = false"
            />

            <div class="pt-8 pb-2-5 mb-8">
                <div class="text-t-lg font-weight-bold mb-5">
                    {{ t(`policy.${currentPolicyKey}`) }}
                </div>

                <v-select
                    v-model="state.selectedHistory"
                    :items="state.history"
                    item-title="value"
                    item-value="key"
                    variant="outlined"
                    placeholder="날짜 선택"
                    class="flex-grow-0 z-1"
                    attach="body"
                    hide-details
                    density="compact"
                >
                </v-select>
            </div>

            <div v-html="state.content">
            </div>
            <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat magnam delectus quisquam doloremque
                doloribus? Quam vitae repudiandae minus suscipit possimus, dignissimos ducimus debitis eos incidunt
                commodi porro quis sequi explicabo neque excepturi qui reprehenderit ipsam beatae temporibus illo eaque
                necessitatibus minima placeat. Est doloribus magni id fuga, omnis dolorum modi. Deserunt laudantium
                voluptates eveniet neque quam beatae. Quis hic ab enim distinctio commodi officiis eos praesentium. A
                debitis omnis perspiciatis odio nam totam, consequatur in fuga alias earum, minima quam at reprehenderit
                doloribus ipsa dignissimos delectus? Eveniet commodi dolore voluptates nulla nihil quas necessitatibus,
                asperiores pariatur quaerat iusto, deleniti vitae.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat magnam delectus quisquam doloremque
                doloribus? Quam vitae repudiandae minus suscipit possimus, dignissimos ducimus debitis eos incidunt
                commodi porro quis sequi explicabo neque excepturi qui reprehenderit ipsam beatae temporibus illo eaque
                necessitatibus minima placeat. Est doloribus magni id fuga, omnis dolorum modi. Deserunt laudantium
                voluptates eveniet neque quam beatae. Quis hic ab enim distinctio commodi officiis eos praesentium. A
                debitis omnis perspiciatis odio nam totam, consequatur in fuga alias earum, minima quam at reprehenderit
                doloribus ipsa dignissimos delectus? Eveniet commodi dolore voluptates nulla nihil quas necessitatibus,
                asperiores pariatur quaerat iusto, deleniti vitae.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat magnam delectus quisquam doloremque
                doloribus? Quam vitae repudiandae minus suscipit possimus, dignissimos ducimus debitis eos incidunt
                commodi porro quis sequi explicabo neque excepturi qui reprehenderit ipsam beatae temporibus illo eaque
                necessitatibus minima placeat. Est doloribus magni id fuga, omnis dolorum modi. Deserunt laudantium
                voluptates eveniet neque quam beatae. Quis hic ab enim distinctio commodi officiis eos praesentium. A
                debitis omnis perspiciatis odio nam totam, consequatur in fuga alias earum, minima quam at reprehenderit
                doloribus ipsa dignissimos delectus? Eveniet commodi dolore voluptates nulla nihil quas necessitatibus,
                asperiores pariatur quaerat iusto, deleniti vitae.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat magnam delectus quisquam doloremque
                doloribus? Quam vitae repudiandae minus suscipit possimus, dignissimos ducimus debitis eos incidunt
                commodi porro quis sequi explicabo neque excepturi qui reprehenderit ipsam beatae temporibus illo eaque
                necessitatibus minima placeat. Est doloribus magni id fuga, omnis dolorum modi. Deserunt laudantium
                voluptates eveniet neque quam beatae. Quis hic ab enim distinctio commodi officiis eos praesentium. A
                debitis omnis perspiciatis odio nam totam, consequatur in fuga alias earum, minima quam at reprehenderit
                doloribus ipsa dignissimos delectus? Eveniet commodi dolore voluptates nulla nihil quas necessitatibus,
                asperiores pariatur quaerat iusto, deleniti vitae.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat magnam delectus quisquam doloremque
                doloribus? Quam vitae repudiandae minus suscipit possimus, dignissimos ducimus debitis eos incidunt
                commodi porro quis sequi explicabo neque excepturi qui reprehenderit ipsam beatae temporibus illo eaque
                necessitatibus minima placeat. Est doloribus magni id fuga, omnis dolorum modi. Deserunt laudantium
                voluptates eveniet neque quam beatae. Quis hic ab enim distinctio commodi officiis eos praesentium. A
                debitis omnis perspiciatis odio nam totam, consequatur in fuga alias earum, minima quam at reprehenderit
                doloribus ipsa dignissimos delectus? Eveniet commodi dolore voluptates nulla nihil quas necessitatibus,
                asperiores pariatur quaerat iusto, deleniti vitae.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat magnam delectus quisquam doloremque
                doloribus? Quam vitae repudiandae minus suscipit possimus, dignissimos ducimus debitis eos incidunt
                commodi porro quis sequi explicabo neque excepturi qui reprehenderit ipsam beatae temporibus illo eaque
                necessitatibus minima placeat. Est doloribus magni id fuga, omnis dolorum modi. Deserunt laudantium
                voluptates eveniet neque quam beatae. Quis hic ab enim distinctio commodi officiis eos praesentium. A
                debitis omnis perspiciatis odio nam totam, consequatur in fuga alias earum, minima quam at reprehenderit
                doloribus ipsa dignissimos delectus? Eveniet commodi dolore voluptates nulla nihil quas necessitatibus,
                asperiores pariatur quaerat iusto, deleniti vitae.
            </div>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const dialog = defineModel("dialog");

const props = defineProps<{
    currentPolicyKey?: string;
}>();

const state = reactive({
    history: [
        {
            key: "0",
            value: "2024.03.13부터 v.2.1",
        },
        {
            key: "1",
            value: "2023.03.13부터 v.2.1",
        },
        {
            key: "2",
            value: "2022.03.13부터 v.2.1",
        },
    ],
    selectedHistory: "0",
    content: "",
})

// props로 전달된 currentPolicyKey에 따라 초기 선택 값 설정
watch(
    () => props.currentPolicyKey,
    (currentPolicyKey) => {
        state.selectedHistory = state.history[0].key; // 기본 첫 번째 아이템 선택
        state.content = `현재 약관 키: ${currentPolicyKey}`; // 내용 업데이트
    },
    { immediate: true }
);

// 선택된 히스토리에 따라 콘텐츠 업데이트
watch(
    () => state.selectedHistory,
    (newSelected) => {
        state.content = `${state.history.find(item => item.key === newSelected)?.value} 내용이 표시됩니다. `;
    }
);

const { t } = useI18n({
    messages: {
        ko: {
            //
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});
</script>

<style lang="scss" scoped>
.v-overlay-container {
    z-index: 2000 !important;
    /* v-dialog */
}

.v-menu {
    z-index: 2100 !important;
    /* v-select 드롭다운 */
}
</style>