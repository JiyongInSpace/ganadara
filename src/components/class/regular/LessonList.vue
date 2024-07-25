<template>
    <div>
        <v-card class="background-secondary">
            <div class="py-7 px-6">
                <div class="text-t-xl font-weight-bold">
                    레슨 1
                </div>

                <div>
                    애정 표현하기 : ‘너를 사랑해'
                </div>
            </div>

            <div class="px-5 d-flex flex-column ga-5">
                <v-btn to="/class/regular/1">
                    <v-icon icon="mdi-play"></v-icon>
                    영상1
                </v-btn>

                <v-btn>
                    <v-icon icon="mdi-quora"></v-icon>
                    문제 1-1
                </v-btn>

                <v-btn>
                    <v-icon icon="mdi-quora"></v-icon>
                    문제 1-2
                </v-btn>
            </div>

            <div class="pa-5">
                <v-btn
                    size="x-large"
                    block
                >
                    레슨 완료 보상 받기
                </v-btn>
            </div>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
</script>
