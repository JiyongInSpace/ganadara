<template>
    <PageTemplate pre-close-button>
        <template v-slot:center-header>
            {{ t("nickname_title") }}
        </template>

        <template v-slot:content>
            <v-text-field
                v-model="state.value"
                variant="outlined"
                name="code"
                :placeholder="t('nickname_placeholder')"
                validate-on="blur"
                class="mb-1 flex-grow-0 pr-0"
                :class="{ 'v-input--success': state.isValid }"
                :messages="state.isValid ? t('nickname_inValid') : ''"
                :error-messages="state.errorMessages"
                :readonly="state.isValid"
                @input="onInputNickname"
            >
                <template v-slot:append-inner>
                    <v-icon
                        v-if="state.errorMessages"
                        icon="mdi-alert-circle-outline"
                        size="small"
                        class="mr-2"
                    />

                    <v-btn
                        size="large"
                        variant="outlined"
                        class="rounded-s-0 rounded-e-lg"
                        :disabled="!state.value || state.isValid || state.value == name"
                        @click="onClickNickname"
                    >
                        {{ t("check_nickname") }}
                    </v-btn>
                </template>
            </v-text-field>
        </template>

        <template v-slot:actions>
            <div class="pt-4 px-2-5 pb-8">
                <v-btn
                    variant="tonal"
                    size="x-large"
                    class="bg-primary flex-grow-0"
                    block
                    :disabled="!state.isValid"
                    @click="onClickNext"
                >
                    {{ t("button.ok") }}
                </v-btn>
            </div>
        </template>
    </PageTemplate>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const router = useRouter();
const { name } = storeToRefs(userStore);

console.log(name.value);
const state = reactive({
    value: "",
    isValid: false,
    errorMessages: "",
})

onMounted(() => {
    state.value = name.value;
})

const onInputNickname = () => {
    state.errorMessages = '';
}

const onClickNickname = (_event: any) => {
    // 이메일 인증번호 확인 =================
    _event.preventDefault();

    // 에러발생
    const emailVerifyResult = true;

    if (!emailVerifyResult) {
        // 오류 발생시 에러메시지 표시
        state.errorMessages = '닉네임 사용이 불가능합니다.';
        return;
    } else {
        // 이메일 확인 성공시
        state.errorMessages = '';
        state.isValid = true;
    }
    // =================================
}

const onClickNext = () => {
    router.push("/dashboard/profile");
}

const { t } = useI18n({
    messages: {
        ko: {
            nickname_title: "닉네임 변경",
            nickname_placeholder: "닉네임 입력",
            nickname_inValid: "닉네임 사용이 가능합니다.",
            check_nickname: "중복 확인",
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});
</script>

<style lang="scss" scoped>
:deep(.v-field--appended) {
    padding-right: 0px;
}
</style>