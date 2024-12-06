<template>
    <PageTemplate
        space="px-4"
        pre-close-button
    >
        <template v-slot:center-header>
            {{ t("profile_title") }}
        </template>

        <template v-slot:content>
            <div
                className="position-relative w-fit mt-5 mx-auto mb-2-5"
                @click="onClickProfile"
            >
                <v-img
                    v-if="profile_image"
                    :src="profile_image"
                    alt="profile image"
                    width="96"
                    height="96"
                    class="flex-grow-0 rounded-circle overflow-hidden"
                />

                <v-sheet
                    v-else
                    width="96"
                    height="96"
                    class="d-flex justify-center align-center background-tertiary border-border-primary flex-grow-0 rounded-circle overflow-hidden"
                >
                    <v-icon
                        icon="mdi-account-outline"
                        size="48"
                        class="text-text-tertiary"
                    />
                </v-sheet>

                <v-sheet
                    height="26"
                    width="26"
                    class="position-absolute foreground-quaternary bottom-0 right-0 rounded-circle d-flex justify-center align-center"
                >
                    <v-icon
                        icon="mdi-camera-outline"
                        size="x-small"
                        class="text-white"
                    ></v-icon>
                </v-sheet>
            </div>

            <div class="text-t-md text-center font-weight-bold mb-5">
                <span class="mr-1">
                    {{ name }}
                </span>

                <v-icon
                    icon="mdi-pencil-outline"
                    size="x-small"
                    @click="onClickNickname"
                ></v-icon>
            </div>

            <div
                class="d-flex justify-space-between align-center border-b"
                :style="{
                    height: '64px'
                }"
            >
                <div class="font-weight-bold">
                    {{ t("profile_email") }}
                </div>

                <div class="text-t-sm font-weight-medium text-text-tertiary opacity-40">
                    {{ email }}
                </div>
            </div>

            <div
                class="d-flex justify-space-between align-center border-b"
                :style="{
                    height: '64px'
                }"
            >
                <div class="font-weight-bold">
                    {{ t("profile_phone") }}
                </div>

                <div
                    class="text-t-sm font-weight-medium text-text-tertiary cursor-pointer"
                    @click="onClickSettingPhone"
                >
                    {{ phone_number }}
                </div>
            </div>

            <div
                class="d-flex justify-space-between align-center border-b"
                :style="{
                    height: '64px'
                }"
            >
                <div class="font-weight-bold">
                    {{ t("profile_password") }}
                </div>

                <div
                    class="text-t-sm font-weight-medium text-text-tertiary cursor-pointer"
                    @click="onClickSettingPassword"
                >
                    {{ t("profile_password_set") }}
                </div>
            </div>
        </template>

        <template v-slot:actions>
            <div class="d-flex justify-center pt-3 px-3 pb-8">
                <v-btn
                    variant="tonal"
                    class="primary"
                    size="large"
                    block
                    @click="onClickSetting"
                >
                    {{ t("button.ok") }}
                </v-btn>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useI18n } from "vue-i18n";

const userStore = useUserStore();
const { name, profile_image, email, phone_number } = storeToRefs(userStore);
const router = useRouter();

const onClickProfile = () => {
    alert("onClickProfile");
}

const onClickNickname = () => {
    router.push("/dashboard/profile/nickname");
}

const onClickSettingPhone = () => {
    router.push("/dashboard/profile/phone");
}

const onClickSetting = () => {
    alert("onClickSetting");
}

const onClickSettingPassword = () => {
    router.push("/dashboard/profile/password");
}

const { t } = useI18n({
    messages: {
        ko: {
            profile_title: "프로필 편집",
            profile_email: "이메일 주소",
            profile_phone: "휴대전화 번호",
            profile_password: "비밀번호",
            profile_password_set: "비밀번호 재설정",
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

</script>


<style lang="scss" scoped></style>