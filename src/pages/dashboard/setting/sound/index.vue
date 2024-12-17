<template>
    <PageTemplate
        back-button
        no-spacer
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                효과음/진동
            </span>
        </template>

        <template v-slot:content>
            <div>
                <div class="text-t-sm text-text-quaternary mb-2-5">
                    효과음/진동 설정
                </div>

                <div class="pb-2 mb-2-5 border-b">
                    <v-sheet
                        class="d-flex justify-space-between align-center"
                        height="40"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            켜기
                        </div>


                        <v-icon
                            :icon="sound ? 'mdi-record-circle' : 'mdi-checkbox-blank-circle-outline'"
                            class="cursor-pointer"
                            :class="sound ? 'text-text-brand-tertiary' : 'text-text-placeholder_subtle'"
                            @click="sound = true"
                        />
                    </v-sheet>
                </div>

                <div class="pb-2 mb-2-5">
                    <v-sheet
                        class="d-flex justify-space-between align-center"
                        height="40"
                    >
                        <div class="text-t-sm font-weight-medium ">
                            끄기
                        </div>

                        <v-icon
                            :icon="!sound ? 'mdi-record-circle' : 'mdi-checkbox-blank-circle-outline'"
                            class="cursor-pointer"
                            :class="!sound ? 'text-text-brand-tertiary' : 'text-text-placeholder_subtle'"
                            @click="sound = false"
                        />
                    </v-sheet>
                </div>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting';

const router = useRouter();
const settingStore = useSettingStore();
const { sound } = storeToRefs(settingStore);


</script>
