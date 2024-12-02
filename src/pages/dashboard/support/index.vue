<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                고객센터
            </span>
        </div>

        <div class="d-flex flex-column flex-grow-1 overflow-y-auto background-secondary">
            <div class="background-primary pt-9 pb-5 px-4 mb-2">
                <div class="d-flex justify-space-between align-center mb-4">
                    <span class="text-t-lg font-weight-bold">
                        자주 묻는 질문
                    </span>

                    <span
                        class="text-t-sm font-weight-medium text-text-tertiary text-decoration-underline opacity-40 cursor-pointer"
                        @click="onClickFaq"
                    >
                        더보기
                    </span>
                </div>

                <div
                    v-for="faqItem, key in state.faq"
                    class="text-t-sm font-weight-medium mb-2-5"
                    @click="onClickFaqItem(key)"
                >
                    {{ faqItem.title }}
                </div>
            </div>

            <div class="background-primary py-5 px-4 mb-2">
                <div
                    class="d-flex align-center mb-5"
                    v-ripple
                    @click="onClickNotice"
                >
                    <v-img
                        src="/images/dashboard/support/notice.png"
                        width="40"
                        height="40"
                        class="flex-grow-0 mr-2-5"
                    />

                    <span class="font-weight-medium">
                        공지사항
                    </span>
                </div>

                <div
                    class="d-flex align-center"
                    v-ripple
                    @click="onClickContact"
                >
                    <v-img
                        src="/images/dashboard/support/contact.png"
                        width="40"
                        height="40"
                        class="flex-grow-0 mr-2-5"
                    />

                    <span class="font-weight-medium">
                        1:1 문의
                    </span>
                </div>
            </div>

            <div class="background-primary py-5 px-4">
                <div class="d-flex justify-space-between align-center mb-5">
                    <span class="text-t-lg font-weight-bold">
                        약관 및 정책
                    </span>
                </div>

                <v-row dense>
                    <v-col
                        v-for="terms in terms_options"
                        cols="6"
                    >
                        <span
                            class="text-t-sm cursor-pointer"
                            @click="onClickTerms(terms.key)"
                        >
                            {{ terms.value }}
                        </span>
                    </v-col>
                </v-row>
            </div>

            <DialogPolicy 
                v-model:dialog="state.dialogPolicy"
                :currentPolicyKey="state.currentPolicyKey"
            />

            <DialogCookies 
                v-model:dialog="state.dialogCookies"
            />
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { name, profile_image, email, phone_number } = storeToRefs(userStore);
const router = useRouter();

const state = reactive({
    faq: [
        {
            id: 1,
            title: "[결제 방법] 아이폰에서 어떻게 결제하나요?",
            category: "결제 방법"
        },
        {
            id: 2,
            title: "[환불] 아이폰에서 어떻게 결제하나요?",
            category: "환불"
        },
        {
            id: 3,
            title: "[오류] 아이폰에서 어떻게 결제하나요?",
            category: "오류"
        },
        {
            id: 4,
            title: "[결제 방법] 아이폰에서 어떻게 결제하나요?",
            category: "결제 방법"
        },
        {
            id: 5,
            title: "[결제 방법] 아이폰에서 어떻게 결제하나요?",
            category: "결제 방법"
        },
    ],
    dialogPolicy: false,
    dialogCookies: false,
    currentPolicyKey: undefined as string | undefined,
});

const onClickFaq = () => {
    router.push("/dashboard/support/faq")
}

const onClickFaqItem = (key: number) => {
    alert("onClickFaqItem: " + key);
}

const onClickNotice = () => {
    router.push("/dashboard/support/notice")
}

const onClickContact = () => {
    router.push("/dashboard/support/contact")
}

const onClickTerms = (key: string) => {
    if(key == "cookie") {
        state.dialogCookies = true;
        return;
    }

    state.currentPolicyKey = key;
    state.dialogPolicy = true;
}

const terms_options = [
    {
        "key": "terms",
        "value": "이용약관"
    },
    {
        "key": "recurring",
        "value": "정기 결제 이용약관"
    },
    {
        "key": "location",
        "value": "위치기반 서비스 이용약관"
    },
    {
        "key": "policy",
        "value": "운영 정책"
    },
    {
        "key": "privacy",
        "value": "개인정보 처리 방침"
    },
    {
        "key": "copyright",
        "value": "저작권보호 정책"
    },
    {
        "key": "ai",
        "value": "AI 서비스 이용약관"
    },
    {
        "key": "youth",
        "value": "청소년보호 정책"
    },
    {
        "key": "cookie",
        "value": "쿠키 수집 정책"
    }
]

</script>


<style lang="scss" scoped></style>