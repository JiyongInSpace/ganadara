<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
        :z-index="0"
    >
        <v-card class="pa-5 z-0">
            <v-sheet height="56">
                <span class="text-t-lg font-weight-bold ">
                    임시 팝업 (시스템 메시지)
                </span>
            </v-sheet>

            <div class="d-flex ">
                <v-btn to="/onboard/find_email">
                    이메일 주소 찾기
                </v-btn>

                <v-btn to="/onboard/reset_password">
                    비밀번호 재설정
                </v-btn>

                <v-btn @click="dialog = false">
                    취소
                </v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const dialog = defineModel("dialog");


const router = useRouter();
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