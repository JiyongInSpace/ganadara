<!-- src="https://vjs.zencdn.net/v/oceans.mp4" -->
<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <span class="text-t-xl font-weight-semibold">
                프로필 편집
            </span>

        </div>

        <div class="px-4">
            <div
                className="position-relative w-fit mx-auto mb-2-5 "
                @click="onClickProfile"
            >
                <v-img
                    :src="profile_image"
                    alt="profile image"
                    width="96"
                    height="96"
                    class="flex-grow-0 rounded-circle overflow-hidden mr-2"
                />

                <v-sheet
                    height="26"
                    width="26"
                    class="position-absolute bottom-0 right-0 rounded-circle d-flex justify-center align-center"
                >
                    <v-icon
                        icon="mdi-camera-outline"
                        size="x-small"
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
                    이메일 주소
                </div>

                <div class="text-t-sm font-weight-medium text-text-tertiary">
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
                    휴대전화 번호
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
                    비밀번호
                </div>

                <div
                    class="text-t-sm font-weight-medium text-text-tertiary cursor-pointer"
                    @click="onClickSettingPassword"
                >
                    비밀번호 재설정
                </div>
            </div>
        </div>

        <v-spacer />

        <div class="d-flex justify-center pa-3 mb-2">
            <v-btn
                variant="tonal"
                class="primary"
                size="large"
                block
                @click="onClickSetting"
            >
                확인
            </v-btn>
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

});

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

</script>


<style lang="scss" scoped></style>