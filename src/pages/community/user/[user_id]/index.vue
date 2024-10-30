<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                userName
            </span>

            <v-spacer />

            <v-img
                src="/images/class/dummy_profile_image.png"
                width="32"
                height="32"
                class="flex-grow-0"
            />
        </div>

        <div class="py-2-5 overflow-y-auto flex-grow-1">
            <div class="d-flex align-center ga-3 mb-2-5 px-4">
                <v-img
                    src="/images/class/dummy_profile_image.png"
                    width="64"
                    height="64"
                    class="flex-grow-0"
                />

                <div class="d-flex justify-space-between ga-5 flex-grow-1 px-6">
                    <div class="text-center flex-1-1-100">
                        <div class="text-t-md font-weight-semibold">
                            {{ Number(9999).toLocaleString() }}
                        </div>

                        <div class="text-t-sm text-text-tertiary">
                            팔로잉
                        </div>
                    </div>

                    <div class="text-center flex-1-1-100">
                        <div class="text-t-md font-weight-semibold">
                            {{ Number(9999).toLocaleString() }}
                        </div>

                        <div class="text-t-sm text-text-tertiary">
                            팔로우
                        </div>
                    </div>

                    <div class="text-center flex-1-1-100">
                        <div class="text-t-md font-weight-semibold">
                            {{ Number(9999).toLocaleString() }}위
                        </div>

                        <div class="text-t-sm text-text-tertiary">
                            팔로잉
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-t-md font-weight-semibold mb-0-5 px-4">
                UserNickName
            </div>

            <div class="text-t-sm text-text-tertiary mb-6 px-4">
                Descriptions
            </div>

            <div class="mb-6 px-4">
                <div class="d-flex justify-center ga-1-5">
                    <v-btn
                        class="primary flex-1-1-100"
                        variant="tonal"
                    >
                        팔로우
                    </v-btn>

                    <v-btn
                        variant="outlined"
                        class="flex-1-1-100"
                    >
                        배지
                    </v-btn>

                    <v-btn
                        icon
                        class="ml-auto"
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

            <v-row
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
                            class="flex-grow-0"
                            :aspect-ratio="1 / 1"
                        />
                    </div>
                </v-col>
            </v-row>

            <div class="position-fixed bottom-24 right-4">
                <v-btn
                    size="x-large"
                    class="primary"
                    icon="mdi-plus"
                />
            </div>
        </div>

        <app-bottom-navigation />
    </v-container>
</template>

<script lang="ts" setup>

const state = reactive({
    images: [],
});

</script>
