<template>
    <div class="w-100 h-20 background-primary d-flex align-center justify-space-between position-relative flex-shrink-0 px-1-5">
        <v-btn
            value="home"
            class="px-0 flex-1-1-100"
            min-width="60"
            height="100%"
            variant="text"
            @click="onClickPage('/home/main')"
        >
            <div class="d-flex flex-column align-center">
                <v-icon
                    size="x-large"
                    class="mb-1"
                    :class="isActive('/home')"
                >
                    mdi-home
                </v-icon>
                <span
                    class="text-t-xs font-weight-semibold"
                    :class="isActive('/home')"
                >
                    {{ t('home') }}
                </span>
            </div>
        </v-btn>

        <v-btn
            value="class"
            class="px-0 flex-1-1-100"
            min-width="60"
            height="100%"
            variant="text"
            @click="onClickPage('/class')"
        >
            <div class="d-flex flex-column align-center">
                <v-icon
                    size="x-large"
                    class="mb-1"
                    :class="isActive('/class')"
                >
                    mdi-book-open-outline
                </v-icon>
                <span
                    class="text-t-xs font-weight-semibold"
                    :class="isActive('/class')"
                >
                    {{ t('class') }}
                </span>
            </div>
        </v-btn>

        <v-btn
            value="challenge"
            class="px-0 flex-1-1-100"
            min-width="60"
            height="100%"
            variant="text"
            @click="onClickPage('/challenge')"
        >
            <div class="d-flex flex-column align-center">
                <v-icon
                    size="x-large"
                    class="mb-1"
                    :class="isActive('/challenge')"
                >
                    mdi-flag-outline
                </v-icon>
                <span
                    class="text-t-xs font-weight-semibold"
                    :class="isActive('/challenge')"
                >
                    {{ t('challenge') }}
                </span>
            </div>
        </v-btn>

        <v-btn
            value="community"
            class="px-0 flex-1-1-100"
            min-width="60"
            height="100%"
            variant="text"
            @click="onClickPage('/community')"
        >
            <div class="d-flex flex-column align-center">
                <v-icon
                    size="x-large"
                    class="mb-1"
                    :class="isActive('/community')"
                >
                    mdi-web
                </v-icon>
                <span
                    class="text-t-xs font-weight-semibold"
                    :class="isActive('/community')"
                >
                    {{ t('community') }}
                </span>
            </div>
        </v-btn>

        <v-btn
            value="all"
            class="px-0 flex-1-1-100"
            min-width="60"
            height="100%"
            variant="text"
            @click="onClickPage('/dashboard')"
        >
            <div class="d-flex flex-column align-center">
                <v-icon
                    size="x-large"
                    class="mb-1"
                    :class="isActive('/dashboard')"
                >
                    mdi-dots-horizontal
                </v-icon>
                <span
                    :class="isActive('/dashboard')"
                    class="text-t-xs font-weight-semibold"
                >
                    {{ t('dashboard') }}
                </span>
            </div>
        </v-btn>
    </div>

</template>

<script lang="ts" setup>
import i18n from '@/i18n';
import { useI18n } from "vue-i18n";
import { useLangStore } from '@/stores/lang'
const langStore = useLangStore();

const route = useRoute();
const router = useRouter();
const navigation = ref("home");

const onClickPage = (path: string) => {
    router.push(path);
}

const isActive = (_category: string) => {
    if (route.fullPath.startsWith(_category)) {
        return "text-text-primary"
    }

    return "";
}



// 다국어
const { t, locale } = useI18n({
    messages: {
        ko: {
            home: "홈",
            class: "클래스",
            challenge: "챌린지",
            community: "커뮤니티",
            dashboard: "전체 보기",
        },
        en: {
            home: "Home",
            class: "Classes",
            challenge: "Challenges",
            community: "Community",
            dashboard: "View All",
        },
        cn: {
            home: "首页",
            class: "课程",
            challenge: "挑战",
            community: "社区",
            dashboard: "查看全部",
        },
        sp: {
            home: "Inicio",
            class: "Clases",
            challenge: "Desafíos",
            community: "Comunidad",
            dashboard: "Ver todo",
        },
        vi: {
            home: "Trang Chủ",
            class: "Lớp Học",
            challenge: "Thách Thức",
            community: "Cộng Đồng",
            dashboard: "Xem Tất cả",
        },
        jp: {
            home: "ホーム",
            class: "クラス",
            challenge: "チャレンジ",
            community: "コミュニティ",
            dashboard: "すべてを表示",
        },
        fr: {
            home: "Accueil",
            class: "Cours",
            challenge: "Défis",
            community: "Communauté",
            dashboard: "Voir Tout",
        },
        id: {
            home: "Beranda",
            class: "Kelas",
            challenge: "Tantangan",
            community: "Komunitas",
            dashboard: "Lihat Semua",
        },
        ru: {
            home: "Домой",
            class: "Уроки",
            challenge: "Испытания",
            community: "Сообщество",
            dashboard: "Просмотреть все",
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

<style lang="scss" scoped>
:deep(.v-btn) {
    .v-btn__overlay {
        display: none !important;
    }

    &:not(.v-btn--active) {
        color: rgb(var(--v-fg-quinary)) !important;
    }
}
</style>