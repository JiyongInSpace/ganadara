<template>
    <PageTemplate back-button>
        <template v-slot:prepend-header>
        </template>

        <template v-slot:center-header>
            퀴즈
        </template>

        <template v-slot:append-header>
        </template>

        <template v-slot:content>
            <v-btn @click="state.dialogSkip = true">
                건너뛰기 (퍼블리싱 확인용)
            </v-btn>
        </template>

        <template v-slot:actions>
            <div class="d-flex justify-center ga-3 pt-4 px-4 pb-8">
                <v-btn
                    variant="outlined"
                    size="large"
                    class="secondary"
                    @click="state.dialogHint = true"
                >
                    힌트
                </v-btn>

                <v-btn
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                    @click="onClickNext"
                >
                    확인
                </v-btn>
            </div>
        </template>
    </PageTemplate>

    <DialogQuizSkip
        v-model:dialog="state.dialogSkip"
        @onClickSkip="onClickSkip"
    />
    <DialogHint v-model:dialog="state.dialogHint" />
</template>

<script lang="ts" setup>
// const props = defineProps<{
//     loading: boolean;
// }>();

const router = useRouter();

const state = reactive({
    dialogSkip: false,
    dialogHint: false,
})

const onClickSkip = () => {
    router.push('/challenge/mission/quiz?completed=true');
}

const onClickNext = () => {
    router.push('/challenge/mission/quiz?completed=true');
}
</script>
