<template>
    <div class="mb-10">
        <v-img
            src="/images/class/default_video.png"
            height="155"
            cover
            class="mb-4 mx-auto rounded-16"
        />

        <div class="font-weight-medium text-text-quaternary text-center">
            위 그림의 알맞은 의미를 골라주세요
        </div>
    </div>

    <div>
        <!-- select-strategy="classic" -->
        <v-list
            lines="one"
            v-model:selected="selectedAnswer"
            class="mb-15"
        >
            <v-list-item
                v-for="(answerItem, index) in answerList"
                :key="answerItem.key"
                :value="answerItem.key"
                variant="outlined"
                class="border rounded-lg px-3-5 text-t-md"
                active-class="bg-primary"
                :class="index == answerList.length - 1 ? 'mb-0' : 'mb-2-5'"
            >
                <div class="d-flex align-center">
                    <span class="font-weight-bold mr-2-5">
                        {{ answerItem.key }}
                    </span>

                    <span class="font-weight-medium truncate">
                        {{ answerItem.text }}
                    </span>
                </div>
            </v-list-item>
        </v-list>
    </div>

    <v-spacer></v-spacer>

    <div class="flex-grow-0 position-fixed bottom-0  left-0 pa-4 w-100">
        <v-btn
            variant="tonal"
            size="x-large"
            class="primary"
            block
            to="/onboard/sign_up"
            :disabled="selectedAnswer.length === 0"
        >
            확인
        </v-btn>
    </div>
</template>

<script lang="ts" setup>

const selectedAnswer = ref<string[]>([]);
const answerList = [
    {
        "text": "긴 텍스트 긴 텍스트 긴 텍스트 긴 텍스트 긴 텍스트 긴 텍스트 긴 텍스트 긴 텍스트 긴 텍스트 긴 텍스트",
        "key": "A"
    },
    {
        "text": "짧",
        "key": "B"
    },
    {
        "text": "aasdfaaewfoaw3yfnpaw8n37fai8wn37flia8w7elfi8an7wleif8a7lsd8fn7lasid8fn7lasdi8fn7alwe",
        "key": "C"
    },
    {
        "text": "asd",
        "key": "D"
    },
];
</script>
