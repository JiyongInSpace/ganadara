<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto position-relative">
        <div
            class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 text-t-lg font-weight-semibold px-5"
            :class="`background-${props.headerBackground}`"
        >
            <div class="d-flex align-center flex-1-1-100 overflow-visible">
                <v-btn
                    v-if="props.backButton"
                    icon
                    variant="text"
                    size="20"
                    @click="onClickBack"
                >
                    <v-img
                        src="@/assets/icons/basic/chevron-left.svg"
                        width="20"
                        height="20"
                    />
                </v-btn>

                <v-btn
                    v-if="props.preCloseButton"
                    icon="mdi-close"
                    size="small"
                    variant="text"
                    @click="onClickQuit"
                />

                <slot name="prepend-header" />
            </div>

            <div class="position-center">
                <slot name="center-header" />
            </div>

            <div class="d-flex align-center justify-end">
                <slot name="append-header" />

                <v-btn
                    v-if="props.apCloseButton"
                    icon="mdi-close"
                    size="small"
                    variant="text"
                    @click="onClickQuit"
                />
            </div>
        </div>

        <div
            class="d-flex flex-column flex-grow-1"
            :class="`${noScroll ? '' : 'overflow-y-auto'} ${space} background-${props.background} ${noGap ? '' : 'ga-2'}`"
        >
            <slot name="content" />

            <v-spacer v-if="!noSpacer" />

            <slot name="bottom" />
        </div>


        <slot name="actions" />
    </v-container>
</template>

<script lang="ts" setup>

const router = useRouter();

const props = withDefaults(defineProps<{
    // header
    backButton?: boolean;
    preCloseButton?: boolean;
    apCloseButton?: boolean;
    headerBackground?: string;

    // body
    background?: string;
    space?: string;
    noSpacer?: boolean;
    noScroll?: boolean;
    noGap?: boolean;
}>(), {
    // header
    backButton: false,
    preCloseButton: false,
    apCloseButton: false,
    headerBackground: 'primary',

    // body
    background: 'primary',
    space: 'px-4 py-5',
    noSpacer: false,
    noScroll: false,
    noGap: false,
});

const onClickBack = () => {
    router.back();
}

const onClickQuit = () => {
    router.back();
}

</script>


<style lang="scss" scoped></style>