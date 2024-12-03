<template>
    <div class="d-flex flex-column ga-5">
        <div
            v-for="videoItem in videos"
            :key="videoItem.id"
            class="d-flex align-stretch ga-2 elevation-0 w-100"
            :style="{
                height: '120px'
            }"
            v-ripple
            @click="onClickVideoItem(videoItem.id)"
        >
            <v-img
                :src="videoItem.thumbnail"
                alt="listen"
                width="120"
                height="120"
                cover
                class="flex-grow-0 rounded-8"
            />

            <div class="d-flex flex-column h-100">
                <div class="text-t-lg font-weight-bold mb-1">
                    {{ videoItem.title }}
                </div>

                <div class="text-t-sm font-weight-semibold flex-grow-1">
                    {{ videoItem.description }}
                </div>

                <div class="text-t-sm font-weight-semibold">
                    <v-chip
                        size="small"
                        class="font-weifht-semibold"
                        :class="chipColorByStatus(videoItem.status)"
                    >
                        {{ videoItem.status }}
                    </v-chip>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
export interface IVideoItem {
    id: number;
    thumbnail: string;
    title: string;
    description: string;
    status: "ongoing" | "completed" | "not-started";
}

const props = defineProps<{
    videos: IVideoItem[];
}>();

const state = reactive({
    expanded: null as number | null,
    action: false,
})

const onClickVideoItem = (id: number) => {
    alert(id);
}

const chipColorByStatus = (status: string) => {
    switch (status) {
        case "completed":
            return "success";
        case "ongoing":
            return "primary";
        case "not-started":
            return "disabled_color";
        default:
            return "disabled_color";
    }
}

</script>


<style lang="scss" scoped>
:deep(.v-expansion-panels) {
    .v-expansion-panel {
        padding: 0 16px;
        margin-bottom: 10px;

        &:not(:first-child)::after {
            border: none;
        }
    }

    .v-expansion-panel__shadow {
        display: none;
    }

    .v-expansion-panel-title {
        padding: 0px !important;

        &.v-expansion-panel-title--active {
            border-bottom: 1px solid;
        }
    }

    .v-expansion-panel--active:not(:first-child),
    .v-expansion-panel--active+.v-expansion-panel {
        margin-top: 0px !important;
    }

    .v-expansion-panel-text__wrapper {
        padding: 20px 0 !important;
    }
}
</style>