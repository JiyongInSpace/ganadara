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
                    <span v-if="item.reward == 'point'">
                        최대 {{ item.point }}P 받아가기
                    </span>

                    <span v-if="item.reward == 'creator'">
                        크리에이터 후원하기
                    </span>

                    <span v-if="item.reward == 'social'">
                        따뜻한 마음 기부하기
                    </span>

                    <span v-if="item.reward == 'gift'">
                        선물 받아가기
                    </span>
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
    point: number;
    to: string;
}

const router = useRouter();

const props = defineProps<{
    list: Mission[];
}>();

const onClickMissionItem = (_mission: Mission) => {
    router.push("/challenge/mission/" + _mission.to);
}


</script>
