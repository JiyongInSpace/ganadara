<template>
    <PageTemplate
        space="pa-0"
        back-button
        background="secondary"
        no-spacer
    >
        <template v-slot:center-header>
            1:1 문의
        </template>

        <template v-slot:content>
            <div
                v-if="ongoingContacts.length > 0"
                class="background-primary pt-5 pb-5 px-4"
            >
                <div class="text-t-lg font-weight-bold mb-2-5">
                    진행 중인 문의
                </div>

                <div>
                    <div
                        v-for="(contact, key) in ongoingContacts"
                        :key="key"
                        class="d-flex align-center cursor-pointer"
                        :class="ongoingContacts.length - 1 !== key ? 'pb-2 mb-2 border-b' : ''"
                        v-ripple
                        @click="onClickContactItem(contact.id)"
                    >
                        <div class="flex-grow-1 py-2">
                            <div class="text-t-lg font-weight-bold mb-1">
                                {{ contact.title }}
                            </div>
                            <div class="text-t-sm font-weight-medium text-text-quaternary">
                                {{ contact.created_at }}
                            </div>
                        </div>

                        <div>
                            <v-chip
                                v-if="contact.status === 'submit'"
                                class="xxs orange"
                                variant="outlined"
                            >
                                접수
                            </v-chip>
                            <v-chip
                                v-if="contact.status === 'in_progress'"
                                class="xxs info"
                                variant="outlined"
                            >
                                진행중
                            </v-chip>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-if="pastContacts.length > 0"
                class="flex-grow-1 pt-5 pb-5 px-4 background-primary"
            >
                <div class="text-t-lg font-weight-bold mb-2-5">
                    지난 문의
                </div>

                <div class="pb-5">
                    <div
                        v-for="(contact, key) in pastContacts"
                        :key="key"
                        class="d-flex align-center cursor-pointer"
                        :class="pastContacts.length - 1 !== key ? 'pb-2 mb-2 border-b' : ''"
                        v-ripple
                        @click="onClickContactItem(contact.id)"
                    >
                        <div class="flex-grow-1 py-2">
                            <div class="text-t-lg font-weight-bold mb-1">
                                {{ contact.title }}
                            </div>
                            <div class="text-t-sm font-weight-medium text-text-quaternary">
                                {{ contact.created_at }}
                            </div>
                        </div>

                        <div>
                            <v-chip
                                v-if="contact.status === 'done'"
                                class="xxs success"
                                variant="outlined"
                            >
                                완료
                            </v-chip>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-if="state.contactList.length == 0"
                class="d-flex justify-center align-center text-center flex-grow-1 ga-2-5 pt-5 pb-5 px-4"
            >
                <span class="text-t-sm font-weight-medium">
                    문의 내역이 없습니다. <br />
                    궁금하신 점을 문의해 주세요.
                </span>
            </div>

            <DialogSupportContact v-model:dialog="state.dialogSupport" />

            <DialogSupportContactInProgress
                v-model:dialog="state.dialogSupportInProgress"
                :currentContactId="state.currentSupportId"
            />
        </template>

        <template v-slot:actions>
            <div class="pt-4 px-2-5 pb-8 background-primary">
                <v-btn
                    variant="tonal"
                    size="x-large"
                    class="primary flex-grow-0"
                    block
                    @click="onClickNewContact"
                >
                    문의하기
                </v-btn>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const router = useRouter();
const { name, subscription } = storeToRefs(userStore);
const selectedReasons = ref<string[]>([]);

const state = reactive({
    contactList: [
        {
            id: 1,
            status: "done",
            title: "업데이트 안내",
            created_at: "2024-11-25T14:30:15.123Z"
        },
        {
            id: 1,
            status: "done",
            title: "업데이트 안내",
            created_at: "2024-11-25T14:30:15.123Z"
        },
        {
            id: 1,
            status: "in_progress",
            title: "업데이트 안내",
            created_at: "2024-11-25T14:30:15.123Z"
        },
        {
            id: 1,
            status: "in_progress",
            title: "업데이트 안내",
            created_at: "2024-11-25T14:30:15.123Z"
        },
        {
            id: 1,
            status: "submit",
            title: "업데이트 안내",
            created_at: "2024-11-25T14:30:15.123Z"
        },
    ],
    dialogSupport: false,
    dialogSupportInProgress: false,
    currentSupportId: undefined as number | undefined,
});

const ongoingContacts = computed(() =>
    state.contactList.filter(contact =>
        contact.status === "in_progress" || contact.status === "submit"
    )
);

const pastContacts = computed(() =>
    state.contactList.filter(contact =>
        contact.status === "done"
    )
);

const onClickNewContact = () => {
    state.currentSupportId = undefined;
    state.dialogSupport = true;
}

const onClickContactItem = (key: number) => {
    state.currentSupportId = key;
    state.dialogSupportInProgress = true;

}


// 번역
const { t } = useI18n({
    messages: {
        en: {
            main_tab: {
                coupons: "나의 쿠폰",
                history: "쿠폰 내역",
            },
        },
        ko: {
            main_tab: {
                coupons: "전체",
                history: "팔로잉",
            },
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

</script>


<style lang="scss" scoped>
:deep(.v-selection-control__wrapper) {
    order: 1;
}
</style>