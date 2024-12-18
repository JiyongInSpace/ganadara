<template>
    <PageTemplate
        back-button
        space="pa-0"
    >
        <template v-slot:center-header>
            <slot name="title">
                title
            </slot>
        </template>

        <template v-slot:content>
            <div class="px-4 mb-2">
                <div class="d-flex ga-1 mb-3">
                    <v-chip
                        v-if="props.info.daily"
                        variant="outlined"
                        class="xxs info"
                    >
                        데일리
                    </v-chip>

                    <v-chip
                        v-if="props.info.point"
                        variant="outlined"
                        class="xxs-circle warning"
                    >
                        <v-img
                            src="/images/challenge/mission/point.png"
                            class="shrink-0"
                            alt="point"
                            width="12"
                            height="12"
                        />
                    </v-chip>


                    <v-chip
                        v-if="props.info.gift"
                        variant="outlined"
                        class="xxs-circle purple"
                    >
                        <v-img
                            src="/images/challenge/mission/gift.png"
                            class="shrink-0"
                            alt="point"
                            width="12"
                            height="12"
                        />
                    </v-chip>

                    <v-chip
                        v-if="props.info.hot"
                        variant="outlined"
                        class="xxs brand"
                    >
                        HOT
                    </v-chip>
                </div>

                <div class="d-flex align-center ga-4 mb-8">
                    <div class="flex-grow-1">
                        <div class="text-t-xl font-weight-bold mb-1">
                            {{ props.info.title }}
                        </div>

                        <div class="text-t-sm text-text-secondary">
                            {{ props.info.description }}
                        </div>
                    </div>

                    <v-btn
                        variant="outlined"
                        size="small"
                        class="secondary"
                        icon
                        @click="onClickLink"
                    >
                        <v-img src="/icons/IconLink.svg"
                            width="20"
                            height="20"
                        />
                    </v-btn>
                </div>

                <div>
                    <slot name="content">
                        content
                    </slot>
                </div>
            </div>

            <div class="px-4 pb-8">
                <div class="font-weight-bold mb-3">
                    확인해 주세요!
                </div>

                <slot name="notice">
                    notice
                </slot>
            </div>
        </template>

        <template v-slot:bottom>
            <div class="background-secondary py-10 px-4">
                <div class="text-t-xs font-weight-semibold mb-5">
                    All purchases on this website, which are paid in cash, are protected by the debt guarantee service
                    provided by PG사명.
                </div>
                <div class="d-flex justify-space-between mb-5">
                    <div>
                        <v-img
                            src="/logo/ganadara_logo.png"
                            alt="logo"
                            width="103"
                            height="22"
                            class="flex-shrink-0"
                        ></v-img>
                    </div>

                    <div class="d-flex justify-center ga-2">
                        <v-btn
                            v-for="(sns, key) in footer_sns"
                            :key="key"
                            icon
                            size="24"
                            variant="text"
                            @click="onClickSns(sns.href)"
                        >
                            <v-img
                                :src="sns.imageUrl"
                                width="24"
                                height="24"
                            ></v-img>
                        </v-btn>
                    </div>

                </div>

                <div class="d-flex ga-2-5 text-t-sm mb-5">
                    <div>
                        Terms of Service
                    </div>

                    <div class="font-weight-bold">
                        Privacy Policy
                    </div>
                </div>

                <div class="text-t-xs text-text-quaternary mb-5">
                    이카이스(주)│대표이사 이준엽 | 주소 : (06100) 서울시 강남구 선릉로 119길 15 더비트 빌딩 4층 | 개인정보보호책임자 : 이준엽(privacy@ekyss.co.kr)
                    | 통신판매업 신고 번호 : 2014-서울강남-00416 | 사업자 등록번호 141-81-29267 사업자정보확인<br />고객센터 : 1670-8056<br />(09:00 ~
                    18:00 / 점심시간 13:00 ~ 14:00 / 주말 및 공휴일 휴무)
                </div>

                <div class="text-t-xs text-text-quaternary">
                    Copyright 2016. CRATES CO.,LTD. All rights reserved.
                </div>
            </div>

        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
const props = defineProps<{
    info: {
        daily: boolean;
        point: boolean;
        gift: boolean;
        hot: boolean;
        title: string;
        description: string;
        linkUrl: string;
    }
}>();

const onClickLink = () => {
    alert(props.info.linkUrl);
}

const onClickSns = (href: string) => {
    window.open(href, '_blank');
}

const footer_sns = [
    {
        imageUrl: '/images/dashboard/main/sns_youtube.png',
        href: 'https://www.youtube.com/channel/UC3yv7JU3aZvJj5Y1rZK4JhA',
    },
    {
        imageUrl: '/images/dashboard/main/sns_facebook.png',
        href: 'https://www.youtube.com/channel/UC3yv7JU3aZvJj5Y1rZK4JhA',
    },
    {
        imageUrl: '/images/dashboard/main/sns_insta.png',
        href: 'https://www.youtube.com/channel/UC3yv7JU3aZvJj5Y1rZK4JhA',
    },
    {
        imageUrl: '/images/dashboard/main/sns_tiktok.png',
        href: 'https://www.youtube.com/channel/UC3yv7JU3aZvJj5Y1rZK4JhA',
    },
    {
        imageUrl: '/images/dashboard/main/sns_x.png',
        href: 'https://www.youtube.com/channel/UC3yv7JU3aZvJj5Y1rZK4JhA',
    },
]
</script>
