<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <div
                class="d-flex ga-1 align-center mb-3 cursor-pointer w-fit"
                v-bind="activatorProps"
            >
                <v-sheet
                    class="d-flex position-relative"
                    height="24"
                    :width="24 + (creators.slice(0, 4).length - 1) * 12"
                >
                    <v-img
                        v-for="(creator, index) in creators.slice(0, 4)"
                        :key="creator.id"
                        :src="creator.image"
                        width="24"
                        height="24"
                        cover
                        class="position-absolute rounded-circle flex-grow-0"
                        :class="index == 1 ? 'opacity-80' : index == 2 ? ' opacity-60' : index == 3 ? 'opacity-40' : ''"
                        :style="{
                            left: (index * 12) + 'px',
                            zIndex: 4 - index
                        }"
                    />
                </v-sheet>

                <div class="text-t-xs font-weight-medium d-flex align-center ga-1">
                    {{ creators[0]?.name }}
                    <span class="text-t-xxs text-text-secondary">
                        +{{ creators.length - 1 && creators.length - 1 }}
                    </span>
                </div>
            </div>
        </template>

        <v-card class="pt-9 px-7 pb-7 rounded-t-16">
            <div class="d-flex align-center ga-1-5 mb-5">
                <span class="text-t-md font-weight-medium">
                    공동 제작자
                </span>

                <span class="text-t-xs text-text-placeholder">
                    {{ props.creators.length }}명
                </span>
            </div>

            <div
                class="d-flex ga-3 overflow-x-scroll px-7 mx-n7"
                @click="() => { }"
            >
                <div
                    v-for="(creator, index) in creators"
                    :key="index"
                    class="d-flex flex-column align-center align-center ga-1-5"
                >
                    <v-img
                        :src="creator.image"
                        width="55"
                        height="55"
                        class="rounded-circle"
                    />

                    <div class="text-t-xs font-weight-medium text-text-tertiary">
                        {{ creator.name }}
                    </div>

                    <v-btn
                        variant="tonal"
                        class="rounded-xl"
                        :class="creator.isFollowed ? 'border' : 'primary'"
                        width="84"
                    >
                        {{ creator.isFollowed ? '팔로잉' : '팔로우' }}
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
const props = defineProps<{
    creators: {
        id: string;
        name: string;
        image: string;
        isFollowed: boolean;
    }[]
}>();

const dialog = defineModel("dialog");

const emit = defineEmits<{
    (e: 'onClickCancel'): void,
    (e: 'onClickSubscribe'): void
}>();

const buttonCancel = {
    event: {
        onClick: () => {
            dialog.value = false;
            // emit('onClickCancel');
        }
    }
}

const buttonDownload = {
    event: {
        onClick: () => {
            emit('onClickSubscribe');
            dialog.value = false;
        }
    }
}


</script>

<style lang="scss" scoped></style>