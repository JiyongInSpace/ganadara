<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                설정
            </span>
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto py-5 px-4">
            <Survey_step_2
                :defaultValue="userSurvey"
                setting
                @onClickNext="compButtonNext.event.onClick"
            />
        </div>
    </v-container>
</template>

<script lang="ts" setup>
const router = useRouter();

const userSurvey = reactive({
    results: {
        selectedLanguage: null,
        selectedLanguageYouWant: [],
    }
});

const compButtonNext = {
    event: {
        onClick: (_event: any) => {
            console.log(_event);
            router.back();
        }
    }
}
</script>

<style lang="scss" scoped>
.h-14 {
    height: 56px;
}
</style>