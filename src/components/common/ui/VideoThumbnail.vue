<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <div
        class="overflow-x-auto flex-shrink-0 cursor-pointer"
        :style="{
            width: videoType == 'square' ? defaultWidth ? defaultWidth : '150px' : '312px',
        }"
        @click="onClickVideoThumbnail"
    >
        <v-card
            :height="videoType == 'square' ? defaultWidth ? defaultWidth : 150 : 163"
            color="secondary"
            :image="videoInfo.thumbnail"
            class="pa-2 rounded-4 d-flex flex-column justify-space-between"
            :style="{
                aspectRatio: videoType == 'square' ? '1/1' : '312/163',
            }"
        >
            <div v-if="videoInfo.singlePurchase">
                <v-chip class="bg-black rounded-4 sm ">
                    {{ t('purchase') }}
                </v-chip>
            </div>

            <v-spacer />

            <v-progress-linear
                :model-value="videoInfo.progressPercentage"
                :max="100"
                color="primary"
                bg-color="white"
                bg-opacity="0.5"
                :height="6"
                :rounded="3"
            />
        </v-card>

        <div
            v-if="!onlyThumbnail"
            class="d-flex align-center pointer-events-auto mb-1"
        >
            <v-img
                :src="videoInfo.creator.profileImage"
                height="20"
                width="20"
                cover
                class="rounded-circle mr-1-5 flex-grow-0"
            />

            <span class="mr-3 text-t-xs font-weight-medium">
                {{ t(videoInfo.creator.name) }}
            </span>
        </div>

        <div
            v-if="!onlyThumbnail"
            class="line-clamp-2 text-t-sm"
        >
            {{ t(`category1.${videoInfo.title}`) }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { IShortForm } from '@/pages/home/main/index.vue';
import { useI18n } from 'vue-i18n';
import { useLangStore } from '@/stores/lang'
const langStore = useLangStore();


const props = defineProps<{
    // videoInfo: IShortForm | undefined;
    videoType: "shortForm" | "square" | "rectangle";
    videoInfo: IShortForm;
    onlyThumbnail?: boolean;
    defaultWidth?: number;
}>();

// UI ========================================

const onClickVideoThumbnail = () => {
    console.log("onClickVideoThumbnail");
};



// 다국어
const { t, locale } = useI18n({
    messages: {
        ko: {
            purchase: "개별구매",
            creator: "크리에이터",
            category1: {
                value1: "직장 동료와 아침 인사 후 스몰 토크 이어가기",
                value2: "직장생활 시리즈 50",
                value3: "실생활에서 쓸 수 있는 기초 문장 100선",
                value4: "Olivia와 배우는 필수 영어 회화",
            },
        },
        en: {
            purchase: "Individual Purchase",
            creator: "Creator",
            category1: {
                value1: "Continue small talk with coworkers after saying good morning",
                value2: "Work Life Series 50",
                value3: "100 basic sentences that can be used in real life",
                value4: "Essential English Conversation Learned with Olivia",
            },
        },
        cn: {
            purchase: "个人购买",
            creator: "创作者",
            category1: {
                value1: "早上好后继续与同事闲聊",
                value2: "《工作生活系列50》",
                value3: "100个可以在现实生活中使用的基本句子",
                value4: "与 Olivia 一起学习的基本英语会话",
            },
        },
        sp: {
            purchase: "Compra Individual",
            creator: "Creador",
            category1: {
                value1: "Continuar la pequeña charla con los compañeros de trabajo después de decir buenos días",
                valor2: "Vida laboral Serie 50",
                valor3: "100 oraciones básicas que se pueden usar en la vida real",
                valor4: "Conversación en inglés esencial aprendida con Olivia",
            },
        },
        vi: {
            purchase: "Mua Lẻ Cá Nhân",
            creator: "Người Tạo Nội dung",
            category1: {
                value1: "Tiếp tục trò chuyện nhỏ với đồng nghiệp sau khi chào buổi sáng",
                value2: "Chuỗi cuộc sống công việc 50",
                value3: "100 câu cơ bản có thể sử dụng trong đời thực",
                value4: "Hội thoại tiếng Anh thiết yếu học cùng Olivia",
            },
        },
        jp: {
            purchase: "個人購入",
            creator: "クリエイター",
            category1: {
                value1: "職場の同僚と朝の挨拶後にスモールトークを続ける",
                value2: "職場生活シリーズ 50",
                value3: "実生活で使える基礎文章100選",
                value4: "Oliviaと学ぶ必須英語会話",
            },
        },
        fr: {
            purchase: "Achat Individuel",
            creator: "Créateur",
            category1: {
                value1: "Continuez la conversation avec vos collègues après leur avoir dit bonjour",
                value2: "Série Vie professionnelle 50",
                value3: "100 phrases de base utilisables dans la vraie vie",
                value4: "Conversation essentielle en anglais apprise avec Olivia",
            },
        },
        id: {
            purchase: "Pembelian Individual",
            creator: "Pembuat",
            category1: {
                value1: "Lanjutkan obrolan ringan dengan rekan kerja setelah mengucapkan selamat pagi",
                value2: "Kehidupan Kerja Seri 50",
                value3: "100 kalimat dasar yang dapat digunakan dalam kehidupan nyata",
                value4: "Percakapan Penting Bahasa Inggris yang Dipelajari dengan Olivia",
            },
        },
        ru: {
            purchase: "Индивидуальная покупка",
            creator: "Создатель",
            category1: {
                value1: "«Продолжить светскую беседу с коллегами после доброго утра»",
                value2: "Work Life Series 50",
                value3: "100 основных предложений, которые можно использовать в реальной жизни",
                value4: "Основы разговорного английского языка, изученные с Оливией",
            },
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

watch(
    () => langStore.currentLang,
    () => {
        locale.value = langStore.currentLang as any;
    }
)

</script>


<style lang="scss" scoped></style>