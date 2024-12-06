<template>
    <PageTemplate back-button>
        <template v-slot:center-header>
            등록
        </template>

        <template v-slot:content>
            <v-spacer />

            <div class="d-flex flex-column align-center pt-4 mb-11">
                <v-img
                    src="/images/community/donation.png"
                    width="100%"
                    height="269"
                    class="mx-auto mb-4"
                />

                <div class="text-t-md text-text-primary text-center">
                    {{ state.howMuch }} {{
                        state.currency === 'won' ? '원을' : '포인트를'
                    }} 후원하였습니다. <br />
                    따뜻한 마음을 나눠주셔서 감사합니다.
                </div>
            </div>

            <v-spacer />
        </template>


        <template v-slot:actions>
            <div class="px-4 pb-8">
                <v-btn
                    block
                    variant="tonal"
                    size="x-large"
                    class="primary"
                >
                    확인
                </v-btn>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>

const state = reactive({
    howMuch: 3000,
    currency: 'won' as 'won' | 'point', // 타입을 'won' | 'point'로 지정
});
</script>
