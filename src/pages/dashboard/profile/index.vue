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
                    v-if="profilePreview"
                    :src="profilePreview"
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
                    <svg
                        width="49"
                        height="48"
                        viewBox="0 0 49 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="user-01">
                            <path
                                id="Icon"
                                d="M40.5 42C40.5 39.2089 40.5 37.8133 40.1555 36.6777C39.3799 34.1209 37.3791 32.1201 34.8223 31.3445C33.6867 31 32.2911 31 29.5 31H19.5C16.7089 31 15.3133 31 14.1777 31.3445C11.6209 32.1201 9.62008 34.1209 8.84448 36.6777C8.5 37.8133 8.5 39.2089 8.5 42M33.5 15C33.5 19.9706 29.4706 24 24.5 24C19.5294 24 15.5 19.9706 15.5 15C15.5 10.0294 19.5294 6 24.5 6C29.4706 6 33.5 10.0294 33.5 15Z"
                                stroke="#667085"
                                stroke-width="4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </g>
                    </svg>
                </v-sheet>

                <v-sheet
                    height="26"
                    width="26"
                    class="position-absolute foreground-quaternary bottom-0 right-0 rounded-circle d-flex justify-center align-center cursor-pointer"
                    @click="triggerFileInput"
                >
                    <v-icon
                        icon="mdi-camera-outline"
                        size="x-small"
                        class="text-white"
                    ></v-icon>
                </v-sheet>

                <!-- 숨겨진 파일 선택 인풋 -->
                <input
                    type="file"
                    accept="image/*"
                    ref="fileInput"
                    class="d-none"
                    @change="handleFileChange"
                />
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
import { ref } from 'vue';

const userStore = useUserStore();
const { name, profile_image, email, phone_number } = storeToRefs(userStore);
const router = useRouter();

const onClickProfile = () => {
    // alert("onClickProfile");
}


const triggerFileInput = () => {
    fileInput.value?.click(); // 파일 선택 창 열기
};

const fileInput = ref<HTMLInputElement | null>(null); // 파일 선택 input 참조
const profilePreview = ref<string | null>(null); // 이미지 미리보기 저장

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            profilePreview.value = e.target?.result as string; // 이미지 미리보기 URL 업데이트
        };

        reader.readAsDataURL(file); // 파일 읽기
    }
};


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