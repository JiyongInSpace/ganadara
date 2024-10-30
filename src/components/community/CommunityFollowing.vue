<template>
    <div class="overflow-y-auto flex-grow-1 pb-3 pt-0">
        <v-list class="pt-0">
            <v-list-item
                v-for="(ranker, index) in props.followList"
                :key="index"
                :title="ranker.name"
                :subtitle="ranker.description"
                height="66"
            >
                <template v-slot:prepend>
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
                    <span class="text-t-md font-weight-medium text-text-tertiary">
                        {{ subtitle }}
                    </span>
                </template>

                <template v-slot:append>
                    <v-btn
                        class="flex-1-1-100"
                        :class="isFollowing ? 'primary' : 'secondary'"
                        variant="outlined"
                        width="65"
                        height="32"
                    >
                        {{ isFollowing ? '팔로우' : '팔로잉' }}
                    </v-btn>
                </template>
            </v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts" setup>
import { IUser } from '@/interfaces';

const props = defineProps<{
    followList: IUser[];
    isFollowing: boolean;
}>();


</script>
