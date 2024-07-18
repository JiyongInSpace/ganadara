<template>
    <div class="w-100 scroll-contents">
        <div class="mb-10 text-d-xs font-weight-semibold">
            언어를 선택해 주세요.
        </div>

        <div class="text-t-sm mb-3">
            모국어를 선택해 주세요.
        </div>

        <v-chip-group
            class="mb-10"
            selected-class="foreground-brand-primary text-text-primary_on-brand"
            v-model="selectedLanguage"
            column
        >
            <v-chip
                v-for="tag in languagesTags"
                :key="tag.code"
                :value="tag.code"
                variant="outlined"
                size="x-large"
                class="px-4 border-border-primary"
            >
                <v-img
                    :src="tag.image"
                    width="20"
                    height="20"
                    class="mr-2"
                ></v-img>
                <span v-text="tag.language"></span>
            </v-chip>
        </v-chip-group>

        <v-divider class="mb-10" />

        <div class="text-t-sm mb-3">
            학습하고 싶은 언어를 선택해 주세요.
        </div>

        <v-chip-group
            class="mb-10"
            selected-class="foreground-brand-primary text-text-primary_on-brand"
            v-model="selectedLanguageYouWant"
            multiple
            column
        >
            <v-chip
                v-for="tag in languagesTags"
                :key="tag.code"
                :value="tag.code"
                variant="outlined"
                size="x-large"
                class="px-4 border-border-primary"
            >
                <v-img
                    :src="tag.image"
                    width="20"
                    height="20"
                    class="mr-2"
                ></v-img>
                <span v-text="tag.language"></span>
            </v-chip>
        </v-chip-group>
    </div>

    <v-spacer />

    <div class="actions">
        <v-btn
            variant="outlined"
            size="x-large"
            @click="buttonPrev.event.onClick"
        >
            이전
        </v-btn>

        <v-btn
            class="primary"
            variant="tonal"
            size="x-large"
            :disabled="!selectedLanguage || selectedLanguageYouWant.length === 0"
            @click="buttonNext.event.onClick"
        >
            다음
        </v-btn>
    </div>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
    (e: 'onClickNext', id: any): void,
    (e: 'onClickPrev', id: any): void
}>()

const selectedLanguage = ref<string>();
const selectedLanguageYouWant = ref<string[]>([]);

const languagesTags = [
    {
        language: 'Korean',
        image: '/images/lang/kr.png',
        code: 'ko'
    },
    {
        language: 'English',
        image: '/images/lang/us.png',
        code: 'en'
    },
    {
        language: 'Chinese',
        image: '/images/lang/cn.png',
        code: 'zh'
    },
    {
        language: 'Spanish',
        image: '/images/lang/es.png',
        code: 'es'
    },
    {
        language: 'Vietnamese',
        image: '/images/lang/vn.png',
        code: 'vn'
    },
    {
        language: 'Japanese',
        image: '/images/lang/jp.png',
        code: 'ja'
    },
    {
        language: 'French',
        image: '/images/lang/fr.png',
        code: 'fr'
    },
]

const buttonNext = {
    event: {
        onClick: () => {
            emit('onClickNext', {
                selectedLanguage: selectedLanguage.value,
                selectedLanguageYouWant: selectedLanguageYouWant.value
            });
        }
    }
}

const buttonPrev = {
    event: {
        onClick: () => {
            emit('onClickPrev', null);
        }
    }
}
</script>

<style lang="scss" scoped>
.scroll-contents {
    max-height: calc(100vh - 158px);
    overflow-y: auto;
}
</style>