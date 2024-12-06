<template>
    <PageTemplate
        space="pa-0"
        back-button
        no-gap
    >
        <template v-slot:prepend-header>
            <span class="ml-1">
                {{ state.user.nickName }}
            </span>
        </template>

        <template v-slot:append-header>
            <v-btn
                v-if="isCreator && !isMypage"
                variant="outlined"
                class="secondary px-2"
                @click="onClickDonate"
            >
                <v-icon icon="mdi-heart"></v-icon>
                후원
            </v-btn>

            <v-btn
                v-if="isCreator && isMypage"
                variant="outlined"
                class="secondary px-2"
            >
                <v-icon icon="mdi-currency-usd"></v-icon>
                후원이력
            </v-btn>
        </template>

        <template v-slot:content>
            <div class="py-2-5 overflow-y-auto flex-grow-1">
                <div class="d-flex align-center ga-3 mb-2-5 px-4">
                    <v-img
                        src="/images/class/dummy_profile_image.png"
                        width="64"
                        height="64"
                        class="flex-grow-0"
                    />

                    <div class="d-flex justify-space-between ga-5 flex-grow-1 px-6">
                        <div
                            class="text-center flex-1-1-100 cursor-pointer"
                            @click="onClickFollow"
                        >
                            <div class="text-t-md font-weight-semibold">
                                {{ state.user.following.toLocaleString() }}
                            </div>

                            <div class="text-t-sm text-text-tertiary">
                                팔로잉
                            </div>
                        </div>

                        <div
                            class="text-center flex-1-1-100 cursor-pointer"
                            @click="onClickFollow"
                        >
                            <div class="text-t-md font-weight-semibold">
                                {{ state.user.follower.toLocaleString() }}
                            </div>

                            <div class="text-t-sm text-text-tertiary">
                                팔로워
                            </div>
                        </div>

                        <div class="text-center flex-1-1-100">
                            <div class="text-t-md font-weight-semibold">
                                {{ state.user.rank.toLocaleString() }}위
                            </div>

                            <div class="text-t-sm text-text-tertiary">
                                {{ is_creator ? '콘텐츠 수' : '랭킹' }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-t-md font-weight-semibold mb-0-5 px-4">
                    {{ state.user.nickName }}
                </div>

                <div class="text-t-sm text-text-tertiary mb-6 px-4">
                    {{ state.user.description }}
                </div>

                <div class="mb-6 px-4">
                    <div class="d-flex justify-center ga-1-5">
                        <v-btn
                            v-if="!isMypage"
                            class="primary flex-1-1-100"
                            variant="tonal"
                            @click="onClickFollow"
                        >
                            팔로우
                        </v-btn>

                        <v-btn
                            variant="outlined"
                            class="secondary flex-1-1-100"
                            @click="onClickBadge"
                        >
                            배지
                        </v-btn>

                        <v-btn
                            v-if="isMypage"
                            class="primary flex-1-1-100"
                            variant="tonal"
                        >
                            프로필 수정
                        </v-btn>

                        <!-- v-model="selectStudyTime.startDate.value"
                    :items="selectStudyTime.items" -->
                        <v-select
                            v-if="isCreator"
                            item-title="name"
                            item-text="name"
                            item-value="code"
                            variant="outlined"
                            return-object
                            class="flex-1-1-100"
                            hide-details
                            placeholder="SNS"
                            density="compact"
                            height="36px"
                        >
                        </v-select>

                        <v-btn
                            v-if="!isMypage"
                            icon
                            class="secondary ml-auto"
                            variant="outlined"
                            width="36"
                            height="36"
                        >
                            <v-img
                                src="/icons/IconMessageAlertSquare.svg"
                                width="20"
                                height="20"
                                alt="contact-us"
                                class="flex-grow-0"
                            />
                        </v-btn>

                    </div>
                </div>

                <v-tabs
                    v-model="tabMain.tab.value"
                    stacked
                    class="flex-shrink-0 text-text-quaternary font-weight-bold main-tab border-b"
                    height="48"
                    selected-class="text-text-primary"
                    grow
                >
                    <v-tab
                        v-for="tabMainItem in tabMain.list"
                        :key="tabMainItem"
                        :value="tabMainItem"
                        class="text-lowercase font-weight-bold flex-1-1-100"
                    >
                        {{ t(tabMainItem) }}
                    </v-tab>
                </v-tabs>

                <v-chip-group
                    v-if="tabMain.tab.value == 'content'"
                    class="my-6 px-4 py-0"
                    selected-class="bg-black text-text-primary_on-brand"
                    v-model="tabMain.subtab.value"
                    column
                    mandatory
                >
                    <v-chip
                        v-for="tag in tabMain.subList"
                        :key="tag"
                        :value="tag"
                        variant="outlined"
                        size="large"
                        class="px-4 border-border-primary ma-0 mr-2"
                        @click="() => tabMain.subtab.value = tag"
                    >
                        <span v-text="t(tag)"></span>
                    </v-chip>
                </v-chip-group>

                <!-- 피드 -->
                <v-row
                    v-if="tabMain.tab.value == 'feed'"
                    no-gutters
                    class="ma-n0-5"
                >
                    <v-col
                        cols="4"
                        v-for="count in 10"
                    >
                        <div class="pa-0-5">
                            <v-img
                                src="/images/home/dummy_thumbnail2.png"
                                width="100%"
                                height="100%"
                                alt="contact-us"
                                class="flex-grow-0 cursor-pointer"
                                :aspect-ratio="1 / 1"
                                v-ripple
                                @click="onClickFeed('1')"
                            />
                        </div>
                    </v-col>
                </v-row>

                <!-- 컨텐츠 -->


                <!-- ## 정규학습 -->
                <div
                    v-if="tabMain.tab.value == 'content' && tabMain.subtab.value == 'class'"
                    class="flex-column ga-4 px-4"
                >
                    <div
                        v-for="count in 10"
                        class="d-flex ga-2 mb-4"
                        @click="onClickRegular('1')"
                    >
                        <v-img
                            src="/images/home/dummy_thumbnail2.png"
                            max-width="173px"
                            width="100%"
                            height="100%"
                            alt="contact-us"
                            class="flex-grow-0 rounded-4"
                            cover
                            :aspect-ratio="173 / 110"
                        />

                        <div>
                            <div class="text-t-sm font-weight-medium line-clamp-3 mb-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt iste libero temporibus
                                fuga
                                sit aut, vero porro itaque distinctio sed.
                            </div>

                            <div class="text-text-secondary text-t-sm">
                                카테고리 명
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ## 숏폼 -->
                <v-row
                    v-if="tabMain.tab.value == 'content' && tabMain.subtab.value == 'shortform'"
                    no-gutters
                    class="ma-n0-5"
                >
                    <v-col
                        cols="4"
                        v-for="count in 10"
                    >
                        <div
                            class="position-relative pa-0-5"
                            @click="onClickShortform('1')"
                        >
                            <v-img
                                src="/images/home/dummy_thumbnail2.png"
                                width="100%"
                                height="100%"
                                alt="contact-us"
                                class="flex-grow-0 rounded-4 flex-shrink-0"
                                cover
                                :aspect-ratio="122 / 200"
                            />

                            <div class="position-absolute left-3 right-3 bottom-3 z-1">
                                <span class="text-t-sm text-text-white text-shadow font-weight-semibold">
                                    Short-form Title maximum of three lines
                                </span>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </template>

        <template v-slot:actions>
            <app-bottom-navigation />
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { useI18n } from "vue-i18n";

const router = useRouter();
const userStore = useUserStore();
const { id, is_creator } = storeToRefs(userStore);

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { user_id: string } };

const isMypage = computed(() => {
    return String(id.value) == route.params.user_id;
})

const isCreator = computed(() => {
    return is_creator.value;
})

const state = reactive({
    user: {
        name: 'userName',
        nickName: 'UserNickName',
        description: 'Descriptions',
        following: 9999,
        follower: 9999,
        rank: 9999,
        contents: 9999,
    },
    feeds: [],
    contents: [],
});


const tabMain = {
    list: [
        'feed',
        'content',
    ],
    tab: ref('feed'),
    subList: [
        'class',
        'shortform',
    ],
    subtab: ref('class'),
}

const onClickDonate = () => {
    router.push(`/community/user/${route.params.user_id}/donate`);
}

const onClickBadge = () => {
    router.push(`/community/user/${route.params.user_id}/badge`);
}

const onClickFollow = () => {
    router.push(`/community/user/${route.params.user_id}/follow`);
}

const onClickFeed = (id: string) => {
    router.push(`/community?id=${id}`)
}

const onClickRegular = (id: string) => {
    router.push(`/class/regular/${id}`)
}

const onClickShortform = (id: string) => {
    router.push(`/class/shortform/${id}`)
}

const { t } = useI18n({
    messages: {
        ko: {
            feed: "피드",
            content: "콘텐츠",
            class: "정규학습",
            shortform: "숏폼",
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

</script>


<style lang="scss" scoped>
.v-select.v-select--single {
    :deep(.v-label) {
        font-size: 1.4rem;
        font-weight: 500;
        color: #000;
        opacity: 1 !important;
    }
}
</style>