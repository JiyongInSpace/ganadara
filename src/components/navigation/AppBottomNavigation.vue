<template>
    <v-bottom-navigation
        v-model="navigation"
        grow
    >
        <v-btn value="home" class="px-0" min-width="60">
            <v-icon>mdi-home</v-icon>
            <span>홈</span>
        </v-btn>

        <v-btn value="class" class="px-0" min-width="60">
            <v-icon>mdi-book-open-outline</v-icon>
            <span>클래스</span>
        </v-btn>

        <v-btn value="challenge" class="px-0" min-width="60">
            <v-icon>mdi-flag-outline</v-icon>
            <span>챌린지</span>
        </v-btn>

        <v-btn value="community" class="px-0" min-width="60">
            <v-icon>mdi-web</v-icon>
            <span>커뮤니티</span>
        </v-btn>

        <v-btn value="all" class="px-0" min-width="60">
            <v-icon>mdi-dots-horizontal</v-icon>
            <span>전체보기</span>
        </v-btn>
    </v-bottom-navigation>
</template>

<script lang="ts" setup>
const navigation = ref("home");
</script>

<style lang="scss" scoped>
:deep(.v-btn) {
    .v-btn__overlay {
        display: none !important;
    }

    &:not(.v-btn--active) {
        color: rgb(var(--v-fg-quinary)) !important;
    }
}
</style>