<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                효과음/진동
            </span>
        </div>

        <div class="px-4 py-5 background-primary mb-2">
            <div class="text-t-sm text-text-quaternary mb-2-5">
                효과음/진동 설정
            </div>

            <div class="pb-2 mb-2-5 border-b">
                <v-sheet
                    class="d-flex justify-space-between align-center"
                    height="40"
                >
                    <div class="text-t-sm font-weight-medium ">
                        켜키
                    </div>


                    <v-icon
                        :icon="state.sound ? 'mdi-record-circle' : 'mdi-checkbox-blank-circle-outline'"
                        class="cursor-pointer"
                        :class="state.sound ? 'text-text-brand-tertiary' : 'text-text-placeholder_subtle'"
                        @click="state.sound = true"
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
                        :icon="!state.sound ? 'mdi-record-circle' : 'mdi-checkbox-blank-circle-outline'"
                        class="cursor-pointer"
                        :class="!state.sound ? 'text-text-brand-tertiary' : 'text-text-placeholder_subtle'"
                        @click="state.sound = false"
                    />
                </v-sheet>
            </div>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();

const state = reactive({
    sound: false,
});


</script>

<style lang="scss" scoped>
.h-14 {
    height: 56px;
}
</style>