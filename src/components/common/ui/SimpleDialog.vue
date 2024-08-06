<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card class="pt-9 px-5 pb-5 text-center rounded-16">
            <div
                v-if="slots.title"
                class="text-t-xl font-weight-bold text-center"
                :class="slots.content ? 'mb-1' : 'mb-6'"
            >
                <slot name="title">
                    TITLE
                </slot>
            </div>


            <div
                v-if="slots.content"
                class="mb-6 font-weight-medium text-text-quaternary"
            >
                <slot name="content">
                    CONTENT
                </slot>
            </div>

            <div class="d-flex justify-center ga-3">
                <v-btn
                    v-if="slots.buttonSub"
                    @click="buttonSub.event.onClick"
                    variant="outlined"
                    class="flex-1-1-100"
                    size="large"
                >
                    <slot name="buttonSub">
                        SUB
                    </slot>
                </v-btn>

                <v-btn
                    v-if="slots.buttonMain"
                    @click="buttonMain.event.onClick"
                    class="primary flex-1-1-100"
                    variant="tonal"
                    size="large"
                >
                    <slot name="buttonMain">
                        Main
                    </slot>
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const dialog = defineModel("dialog");

const slots = useSlots();
const emit = defineEmits<{
    (e: 'onClickSub'): void,
    (e: 'onClickMain'): void
}>();

const buttonSub = {
    event: {
        onClick: () => {
            emit('onClickSub');
            dialog.value = false;
        }
    }
}

const buttonMain = {
    event: {
        onClick: () => {
            emit('onClickMain');
            dialog.value = false;
        }
    }
}


</script>

<style lang="scss" scoped></style>