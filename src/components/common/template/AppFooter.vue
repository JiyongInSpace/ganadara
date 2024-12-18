<template>
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

<script lang="ts" setup>

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
