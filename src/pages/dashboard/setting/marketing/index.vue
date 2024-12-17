<template>
    <PageTemplate
        back-button
        no-spacer
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                마케팅 안내
            </span>
        </template>

        <template v-slot:content>
            <div>

                <div class="text-t-sm text-text-quaternary mb-5">
                    가나다라/마이풀의 혜택과 소식을 알려드릴게요.
                </div>

                <div class="pb-2 mb-2-5 border-b">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                        @click="onClickPrivate"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            개인정보 수집 및 이용 동의
                        </div>

                        <div>
                            <span class="text-t-xs font-weight-medium">
                                {{ marketing ? "동의함" : "철회함" }}
                            </span>

                            <v-icon
                                icon="mdi-chevron-right"
                                class="text-text-disabled"
                            />
                        </div>
                    </v-sheet>
                </div>

                <div class="pb-2 mb-2-5">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                        @change="onChange"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            문자 알림
                        </div>

                        <v-switch
                            color="primary"
                            v-model="state.text"
                            hide-details
                        />
                    </v-sheet>
                </div>

                <div class="pb-2 mb-2-5">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                        @change="onChange"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            이메일 알림
                        </div>

                        <v-switch
                            color="primary"
                            v-model="state.email"
                            hide-details
                        />
                    </v-sheet>
                </div>

                <div class="pb-2 mb-2-5">
                    <v-sheet
                        class="d-flex justify-space-between align-center cursor-pointer"
                        v-ripple
                        height="40"
                        @change="onChange"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            앱 알림
                        </div>

                        <v-switch
                            color="primary"
                            v-model="state.app"
                            hide-details
                        />
                    </v-sheet>
                </div>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';

const router = useRouter();
const settingStore = useSettingStore();
const { marketing } = storeToRefs(settingStore);

const state = reactive({
    private: false,
    text: false,
    email: false,
    app: false,
});

const onClickPrivate = (_settingKey: string) => {
    router.push(`/dashboard/setting/marketing/private`);
}

const onChange = () => {
    console.log(state);
}

// 번역
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
:deep(.v-selection-control__wrapper) {
    order: 1;
}
</style>