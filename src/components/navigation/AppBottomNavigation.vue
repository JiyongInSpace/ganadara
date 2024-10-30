<template>
    <div class="w-100 h-20 d-flex align-center justify-space-between position-relative flex-shrink-0 px-1-5">
        <v-btn
            value="home"
            class="px-0 flex-1-1-100"
            min-width="60"
            height="100%"
            variant="text"
        >
            <div class="d-flex flex-column">
                <v-icon size="x-large">mdi-home</v-icon>
                <span class="text-t-xs font-weight-semibold">홈</span>
            </div>
        </v-btn>

        <v-btn
            value="class"
            class="px-0 flex-1-1-100"
            min-width="60"
            height="100%"
            variant="text"
        >
            <div class="d-flex flex-column align-center">
                <v-icon size="x-large">mdi-book-open-outline</v-icon>
                <span class="text-t-xs font-weight-semibold">클래스</span>
            </div>
        </v-btn>

        <v-btn
            value="challenge"
            class="px-0 flex-1-1-100"
            min-width="60"
            height="100%"
            variant="text"
        >
            <div class="d-flex flex-column align-center">
                <v-icon size="x-large">mdi-flag-outline</v-icon>
                <span class="text-t-xs font-weight-semibold">챌린지</span>
            </div>
        </v-btn>

        <v-btn
            value="community"
            class="px-0 flex-1-1-100"
            min-width="60"
            height="100%"
            variant="text"
        >
            <div class="d-flex flex-column align-center">
                <v-icon size="x-large">mdi-web</v-icon>
                <span class="text-t-xs font-weight-semibold">커뮤니티</span>
            </div>
        </v-btn>

        <v-btn
            value="all"
            class="px-0 flex-1-1-100"
            min-width="60"
            height="100%"
            variant="text"
        >
            <div class="d-flex flex-column align-center">
                <v-icon size="x-large">mdi-dots-horizontal</v-icon>
                <span class="text-t-xs font-weight-semibold">전체보기</span>
            </div>
        </v-btn>
    </div>

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