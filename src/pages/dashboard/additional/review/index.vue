<template>
    <PageTemplate back-button>
        <template v-slot:prepend-header>
            <span class="ml-1">
                복습하기
            </span>
        </template>

        <template v-slot:content>
            <v-card
                class="font-weight-bold text-white rounded-10 pa-5 mb-0-5"
                image="/images/dashboard/review/review_banner.png"
                flat
            >
                복습을 통해 <br />
                더 빠르게 성장하세요 !
            </v-card>

            <v-card
                v-for="option in review_options"
                variant="outlined"
                class="border-none background-secondary rounded-12 px-4 py-5 mb-0-5"
                @click="() => onClickReview(option.key)"
            >

                <div class="d-flex justify-space-between align-center">
                    <div class="text-t-md font-weight-bold">
                        {{ option.title }}
                    </div>

                    <v-icon icon="mdi-chevron-right" />
                </div>
            </v-card>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
const router = useRouter();

const review_options = [
    {
        key: 'word',
        title: '단어 모아보기',
    },
    {
        key: 'sentence',
        title: '문장 모아보기',
    },
    {
        key: 'video',
        title: '학습한 영상',
    },
    {
        key: 'wrong',
        title: '오답 관리',
    },
]

const onClickReview = (key: string) => {
    router.push('/dashboard/additional/review/' + key);
}
</script>
