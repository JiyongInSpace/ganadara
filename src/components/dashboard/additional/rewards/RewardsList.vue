<template>
    <div>
        <v-row no-gutters>
            <v-col
                v-for="rewardItem, key in list"
                cols="6"
            >
                <div :style="{
                    padding: '5px'
                }">
                    <div
                        class="position-relative"
                        v-ripple
                        @click="onClickReward(rewardItem.id)"
                    >
                        <div
                            class="position-absolute top-0 left-0 z-1 rounded-ts-lg rounded-be-lg"
                            :class="{
                                'foreground-brand-primary text-text-primary_on-brand': rewardItem.status == 'ongoing',
                                'background-secondary text-text-disabled border-border-disabled': rewardItem.status == 'completed',
                            }"
                        >
                            <span class="text-t-sm font-weight-medium px-2-5 py-1">
                                {{ rewardItem.status }}
                            </span>
                        </div>

                        <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            aspect-ratio="1"
                            cover
                            class="rounded-8 mb-2-5"
                        />

                        <div class="text-t-sm font-weight-medium mb-1">
                            {{ rewardItem.name }}
                        </div>

                        <div class="text-t-lg font-weight-bold">
                            {{ rewardItem.price.toLocaleString() }}원
                        </div>

                        <div
                            v-if="rewardItem.limit"
                            class="text-t-xs font-weight-medium text-text-quaternary mt-1"
                        >
                            {{ rewardItem.limit }}개 남음
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { IRewardItem } from '@/interfaces';

const props = defineProps<{
    list: IRewardItem[];
    type: 'goods' | 'gift';
}>();

const router = useRouter();

const onClickReward = (id: number) => {
    if (props.type == 'goods') {
        router.push(`/dashboard/additional/rewards/goods/${id}`)
    } else {
        router.push(`/dashboard/additional/rewards/gift/${id}`);
    }
}

</script>
