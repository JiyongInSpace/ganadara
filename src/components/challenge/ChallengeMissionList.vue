<template>
    <div>
        <v-sheet
            v-for="item in list"
            :key="item.id"
            class="d-flex align-center px-4 py-3 ga-4 rounded-8 mb-2 background-secondary cursor-pointer"
            v-ripple
            @click="onClickMissionItem(item)"
        >
            <v-img
                :src="item.imageUrl"
                width="60"
                height="60"
                class="flex-grow-0 rounded-circle"
            ></v-img>

            <div>
                <div class="text-t-sm mb-0-5">
                    {{ item.title }}
                </div>

                <div class="text-t-md font-weight-semibold">
                    {{ item.reward }} {{ item.point }}
                </div>
            </div>
        </v-sheet>
    </div>
</template>

<script lang="ts" setup>
interface Mission {
    id: number;
    title: string;
    reward: string;
    tag: string;
    imageUrl: string;
}

const props = defineProps<{
    list: Mission[];
}>();

const onClickMissionItem = (_mission: Mission) => {

}

</script>
