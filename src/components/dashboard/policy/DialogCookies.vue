<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card class="pt-0 px-5 pb-5 z-0">
            <v-sheet
                class="d-flex justify-center align-center text-center flex-shrink-0 mb-8"
                height="56"
            >
                <span class="text-t-lg font-weight-bold ">
                    쿠키 수집 정책
                </span>
            </v-sheet>

            <!-- 모두 동의 -->
            <v-checkbox
                v-model="allTerms"
                class="border rounded-lg px-3-5 font-weight-bold text-t-md background-secondary"
                label="쿠키 수집 모두 동의"
                true-icon="mdi-check-circle"
                false-icon="mdi-check-circle"
                hide-details
                color="primary"
                @update:modelValue="toggleAllTerms"
            />

            <v-expansion-panels class="pt-5 border-t mt-5">
                <v-expansion-panel
                    v-for="item in serviceTermsItems"
                    :key="item.title"
                    hide-actions
                >
                    <template v-slot:title>
                        <div class="d-flex justify-space-between w-100">
                            <div>
                                <span>
                                    {{ item.title }} {{ item.isEssential ? "" : "(선택)" }}
                                </span>
                            </div>

                            <v-sheet
                                class="d-flex justify-center align-center"
                                :style="{ height: '20px' }"
                                @click.stop
                            >
                                <v-switch
                                    v-if="item.isEssential"
                                    :model-value="true"
                                    color="primary"
                                    readonly
                                    hide-details
                                    inset
                                />

                                <v-switch
                                    v-else
                                    v-model="selectedCookies"
                                    color="primary"
                                    :value="item.key"
                                    hide-details
                                    inset
                                />
                            </v-sheet>
                        </div>
                    </template>

                    <template v-slot:text>
                        <v-card
                            class="rounded-8 py-2-5 px-3-5 background-secondary border-border-primary"
                            variant="outlined"
                        >
                            <div class="text-t-sm mb-2">
                                {{ item.description }}
                            </div>

                            <div
                                v-for="option, key in Object.keys(item.options)"
                                :key="key"
                                class="d-flex mb-2"
                            >
                                <div
                                    class="flex-shrink-0 text-t-sm font-weight-semibold"
                                    :style="{
                                        width: '100px',
                                    }"
                                >
                                    {{ option }}
                                </div>

                                <div class="text-t-sm">
                                    {{ item.options[option] }}
                                </div>
                            </div>
                        </v-card>
                    </template>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const allTerms = ref(false);

// 선택된 쿠키 저장
const selectedCookies = ref<string[]>([]);

interface ServiceTermItem {
    key: string;
    title: string;
    isEssential: boolean;
    description: string;
    options: { [key: string]: string };
}

const serviceTermsItems: ServiceTermItem[] = [
    {
        key: "essential",
        title: "필수 쿠키",
        isEssential: true,
        description: "이 쿠키는 웹 사이트의 올바른 작동에 필수적입니다.",
        options: {
            name: "collect",
            domain: "*.google.com",
            expiration: "Session",
            descripntion: "Used to send data to Google Analytics about the visitor`s device and behavior. Tracks the visitor across devices and marketing channels."
        }
    },
    {
        key: "performance",
        title: "성능 및 분석 쿠키",
        isEssential: false,
        description: "이 쿠키는 웹 사이트의 성능을 분석하는 데 사용됩니다.",
        options: {
            name: "collect",
            domain: "*.google.com",
            expiration: "Session",
            descripntion: "Used to send data to Google Analytics about the visitor`s device and behavior. Tracks the visitor across devices and marketing channels."
        }
    },
    {
        key: "advertising",
        title: "광고 및 타겟팅 쿠키",
        isEssential: false,
        description: "이 쿠키는 광고 타겟팅에 사용됩니다.",
        options: {
            name: "collect",
            domain: "*.google.com",
            expiration: "Session",
            descripntion: "Used to send data to Google Analytics about the visitor`s device and behavior. Tracks the visitor across devices and marketing channels."
        }
    },
];

// 모두 동의 토글
function toggleAllTerms(value: boolean) {
    allTerms.value = value;

    if (value) {
        // 모두 동의 -> 선택 가능한 모든 항목 추가
        selectedCookies.value = serviceTermsItems
            .filter(item => !item.isEssential)
            .map(item => item.key);
    } else {
        // 모두 해제 -> 필수 쿠키 제외
        selectedCookies.value = [];
    }
}

// 개별 쿠키 토글
function toggleCookie(item: { title: string; isEssential: boolean }) {
    if (item.isEssential) return;

    const index = selectedCookies.value.indexOf(item.title);

    if (index > -1) {
        // 이미 선택된 항목이면 제거
        selectedCookies.value.splice(index, 1);
    } else {
        // 선택되지 않은 항목이면 추가
        selectedCookies.value.push(item.title);
    }

    // 모두 선택되었는지 확인하여 allTerms 상태 업데이트
    const selectableItems = serviceTermsItems.filter(item => !item.isEssential);
    allTerms.value =
        selectableItems.every(item => selectedCookies.value.includes(item.title));
}
</script>

<style lang="scss" scoped>
:deep(.v-expansion-panels) {
    .v-expansion-panel {
        &.v-expansion-panel--after-active {
            margin-top: 0 !important;
        }

        margin-bottom: 20px;
    }

    .v-expansion-panel-text__wrapper {
        padding: 0 !important;
    }

    .v-expansion-panel-title {
        margin-bottom: 0 !important;
        background-color: #FFF !important;
    }

    .v-expansion-panel--active:not(:first-child),
    .v-expansion-panel--active+.v-expansion-panel {
        margin-top: 0px;
    }
}
</style>