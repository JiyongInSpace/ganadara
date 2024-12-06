<template>
    <v-list class="flex-shrink-0 pb-0">
        <v-list-item
            v-for="(ranker, index) in topThree"
            :key="index"
            :title="ranker.name"
            :subtitle="ranker.score"
            height="66"
            @click="onClickUser(ranker.id)"
        >
            <template v-slot:prepend>
                <v-img
                    :src="`/images/community/Rank${index}.png`"
                    width="28"
                    class="mr-2"
                />

                <v-img
                    :src="ranker.profileImage"
                    width="40"
                    class="rounded-circle"
                />
            </template>

            <template v-slot:title="{ title }">
                <div class="text-t-sm font-weight-semibold">
                    {{ title }}
                </div>
            </template>

            <template v-slot:subtitle="{ subtitle }">
                <div class="d-flex">
                    <v-img
                        src="/images/community/lightning.png"
                        width="12"
                        max-width="12"
                        class="mr-0-5"
                    />

                    <span class="text-t-md font-weight-medium text-text-brand-secondary">
                        {{ subtitle.toLocaleString() }}
                    </span>
                </div>
            </template>

            <template v-slot:append>
                <v-btn
                    class="flex-1-1-100"
                    :class="ranker.isFollowing ? 'primary' : 'secondary'"
                    variant="outlined"
                    width="65"
                    height="32"
                    @click="onClickFollow"
                >
                    {{ ranker.isFollowing ? '팔로우' : '팔로잉' }}
                </v-btn>
            </template>
        </v-list-item>
    </v-list>

    <div class="overflow-y-auto flex-grow-1 pb-3 pt-0">
        <v-list class="pt-0">
            <v-list-item
                v-for="(ranker, index) in otherRanks"
                :key="index"
                :title="ranker.name"
                :subtitle="ranker.score"
                height="66"
                @click="onClickUser(ranker.id)"
            >
                <template v-slot:prepend>
                    <v-sheet
                        width="28"
                        class="text-center align-self-start mr-2"
                    >
                        <span class="text-t-md font-weight-semibold">{{ ranker.rank }}</span>
                    </v-sheet>

                    <v-img
                        :src="ranker.profileImage"
                        width="40"
                        class="rounded-circle"
                    />
                </template>

                <template v-slot:title="{ title }">
                    <div class="text-t-sm font-weight-semibold">
                        {{ title }}
                    </div>
                </template>

                <template v-slot:subtitle="{ subtitle }">
                    <div class="d-flex">
                        <v-img
                            src="/images/community/lightning.png"
                            width="12"
                            max-width="12"
                            class="mr-0-5"
                        />
                        <span class="text-t-md font-weight-medium text-text-brand-secondary">
                            {{ subtitle.toLocaleString() }}
                        </span>
                    </div>
                </template>

                <template v-slot:append>
                    <v-btn
                        class="flex-1-1-100"
                        :class="ranker.isFollowing ? 'primary' : 'secondary'"
                        variant="outlined"
                        width="65"
                        height="32"
                    >
                        {{ ranker.isFollowing ? '팔로우' : '팔로잉' }}
                    </v-btn>
                </template>
            </v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts" setup>
import { IRanker } from '@/interfaces';

const router = useRouter();

const props = defineProps<{
    rankerList: IRanker[];
}>();


// 상위 3명과 나머지 랭킹을 computed 속성으로 분리
const topThree = computed(() => {
    if (!props.rankerList) return [];

    return props.rankerList.slice(0, 3); // 상위 3명
});

const otherRanks = computed(() => {
    if (!props.rankerList) return [];

    return props.rankerList.slice(3); // 4등 이후
});

const onClickUser = (_id: string) => {
    router.push(`/community/user/${_id}`);
}

const onClickFollow = (_event: any) => {
    _event.stopPropagation();
    alert("팔로우");
}
</script>
