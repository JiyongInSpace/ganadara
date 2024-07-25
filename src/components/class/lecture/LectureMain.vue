<template>
    <v-tabs
        v-model="tabSub.tab.value"
        align-tabs="center"
        stacked
        grow
    >
        <v-tab
            v-for="(subTabItem, i) in tabSub.list"
            :key="i"
            :value="subTabItem"
        >
            {{ subTabItem }}
        </v-tab>
    </v-tabs>
</template>

<script lang="ts" setup>

const tabSub = {
    list: [
        'level',
        'theme',
        'favorite',
    ],
    tab: ref('level'),
}
</script>