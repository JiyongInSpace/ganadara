<template>
    <v-container
        class="pt-0 pb-10 px-4 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto"
    >
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                후원
            </span>

            <v-spacer />
        </div>
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


        <v-btn
            variant="tonal"
            size="x-large"
            class="primary"
        >
            확인
        </v-btn>
    </v-container>
</template>

<script lang="ts" setup>

const state = reactive({
    howMuch: 3000,
    currency: 'won' as 'won' | 'point', // 타입을 'won' | 'point'로 지정
});
</script>
