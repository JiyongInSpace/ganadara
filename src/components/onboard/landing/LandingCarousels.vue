<template>
    <v-carousel
        v-model="model"
        :show-arrows="false"
        hide-delimiters
        class="mt-16 mb-7"
        height="300"
        disabled
    >
        <v-carousel-item
            v-for="(item, index) in carouselData"
            :key="index"
            :src="item.imageUrl"
            contain
        />
    </v-carousel>

    <div
        v-for="(item, index) in carouselData"
        v-show="model === index"
        class="text-center"
        :key="index"
    >
        <div class="text-d-sm font-weight-bold mb-2">
            {{ carouselData[model].title }}
        </div>

        <div
            class="text-t-md text-text-secondary"
            v-html="carouselData[model].description"
        >
        </div>

        <div class="text-t-md text-text-secondary">

        </div>
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex justify-space-between align-center flex-grow-0 ga-2 w-100">
        <div class="flex-1-1-100">
            <v-btn
                v-if="model !== 0"
                variant="text"
                @click="onClickPrev"
            >
                {{ t("button.prev") }}
            </v-btn>
        </div>

        <div class="d-flex ga-2">
            <v-sheet
                v-for="(item, index) in carouselData"
                width="8"
                height="8"
                class="rounded-circle"
                :class="model === index ? 'bg-primary' : 'background-quaternary'"
            />
        </div>


        <div class="flex-1-1-100 d-flex justify-end">
            <v-btn
                variant="text"
                class="text-primary"
                @click="onClickNext"
            >
                {{ t("button.next") }}
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const router = useRouter();

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
const onClickNext = () => {
    // model은 2ㄱ가 최대
    if (model.value === 2) {
        console.log
        router.push("/onboard/sign_up");
        return;
    };

    model.value = model.value + 1;
};

const onClickPrev = () => {
    model.value = model.value === 0 ? 0 : model.value - 1;
};

const carouselData = [
    {
        imageUrl: "/images/onboard/carousel_01.svg",
        title: "언어 학습을 게임처럼!",
        description: "AI가 추천하는 맞춤형 언어 학습을<br/> 매일 단계별로 도전해 보세요.<br/> 언어 학습도 하고 보상도 놓치지 마세요.",
    },
    {
        imageUrl: "/images/onboard/carousel_02.svg",
        title: "너의 일상을 말해줘",
        description: "나의 기분과 하루를 공유하고<br/> 나만의 학습 노하우를 친구들과 나누어 보세요.<br/> 다양한 크리에이터들의 소식도 확인할 수 있어요.",
    },
    {
        imageUrl: "/images/onboard/carousel_03.svg",
        title: "매일 쏟아지는 포인트!",
        description: "하루하루 미션을 수행하고 포인트를 모아 보세요.<br/> 포인트로 수강권 할인도 받고<br/> 따뜻한 후원을 할 수 있어요.",
    }

]

</script>

<style lang="scss" scoped>
:deep(.v-carousel__controls) {
    background: transparent;
}
</style>