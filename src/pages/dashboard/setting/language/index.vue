<template>
    <PageTemplate
        back-button
        no-spacer
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                언어
            </span>
        </template>

        <template v-slot:content>
            <Survey_step_2
                :defaultValue="userSurvey"
                setting
                @onClickNext="compButtonNext.event.onClick"
            />
        </template>
    </PageTemplate>
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
