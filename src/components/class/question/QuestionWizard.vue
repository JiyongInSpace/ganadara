<template>
    <v-container class="d-flex flex-column overflow-y-auto flex-grow-1 position-relative">
        <QuestionMultipleSentence 
            v-if="questionType == 1"
        />
        <QuestionMultipleImage 
            v-if="questionType == 2"
        />
    </v-container>
</template>

<script lang="ts" setup>

const props = defineProps<{
    questionType: number;
}>();

</script>
