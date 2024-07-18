<template>
    <v-carousel
        v-model="model"
        :show-arrows="false"
        class="mb-7 bg-layer-1"
        height="467"
        disabled
    >
        <v-carousel-item
            src="/images/onboard/carousel_01.png"
            contain
        />

        <v-carousel-item
            src="/images/onboard/carousel_02.png"
            contain
        />

        <v-carousel-item
            src="/images/onboard/carousel_03.png"
            contain
        />
    </v-carousel>


    <div
        v-if="model === 0"
        class="text-center text-h5 font-weight-bold"
    >
        Begin your Korean <br />
        adventure here
    </div>

    <div
        v-else-if="model === 1"
        class="text-center text-h5 font-weight-bold"
    >
        Learn Korean lightly, <br />
        woven into your daily life
    </div>

    <div
        v-else="model === 2"
        class="text-center text-h5 font-weight-bold"
    >
        Discover the joy of Korean, <br /> 
        enriched with culture
    </div>

    <v-spacer></v-spacer>

    <v-btn
        v-if="model !== 2"
        variant="tonal"
        size="x-large"
        class="flex-grow-0 bg-primary"
        block
        @click="onClick"
    >
        {{ t("button.next") }}
    </v-btn>

    <div
        v-else
        class="d-flex flex-column flex-grow-0 ga-2 w-100"
    >
        <v-btn
            variant="tonal"
            size="x-large"
            class="primary"
            block
            to="/onboard/sign_up"
        >
            {{ t("button.sign_up") }}
        </v-btn>

        <v-btn
            variant="text"
            size="x-large"
            block
            to="/onboard/log_in"
        >
            {{ t("button.log_in") }}
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n({
    messages: {
        en: {
            button: {
                sign_up: "Sign up",
                log_in: "Log in",
            },
        },
        ko: {
            button: {
                sign_up: "회원가입",
                log_in: "로그인",
            },
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

const model = ref(0);
const onClick = () => {
    // model은 2ㄱ가 최대
    model.value = model.value === 2 ? 2 : model.value + 1;
};

</script>

<style lang="scss" scoped>
:deep(.v-carousel__controls) {
    background: transparent;
}
</style>