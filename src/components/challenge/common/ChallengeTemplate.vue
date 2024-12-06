<template>
    <PageTemplate back-button>
        <template v-slot:center-header>
            <slot name="title">
                title
            </slot>
        </template>

        <template v-slot:content>
            <div class="mb-2">
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
                        icon
                        @click="onClickLink"
                    >
                        <v-icon icon="mdi-link"></v-icon>
                    </v-btn>
                </div>

                <div>
                    <slot name="content">
                        content
                    </slot>
                </div>
            </div>

            <div>
                <div class="font-weight-bold mb-3">
                    확인해 주세요!
                </div>

                <slot name="notice">
                    notice
                </slot>
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
</script>
