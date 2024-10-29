<template>
    <v-app-bar
        app
        class="elevation-0 px-4"
        flat
        height="64"
    >
        <v-img
            src="/logo/logo_ganadara.png"
            width="32"
            height="32"
            class="flex-grow-0 mr-2"
        />

        <v-select
            v-model="selectCountry.value.value"
            :items="languageSelectList"
            variant="flat"
            return-object
            class="flex-grow-0"
            hide-details
        >
            <template v-slot:selection="{ item }">
                <div>
                    {{ item.title }}
                </div>
            </template>

            <template v-slot:item="{ props, item }">
                <v-list-item
                    v-bind="props"
                    :title="item.value"
                >
                    <template v-slot:prepend>
                        <v-icon icon="mdi-cat"></v-icon>
                    </template>
                </v-list-item>
            </template>
        </v-select>

        <v-spacer />

        <v-btn
            icon
            size="small"
        >
            <v-badge dot>
                <v-icon icon="mdi-bell-outline"></v-icon>
            </v-badge>
        </v-btn>

        <v-img
            src="/images/class/dummy_profile_image.png"
            width="32"
            height="32"
            class="flex-grow-0 ml-2"
        />
    </v-app-bar>
</template>

<script lang="ts" setup>

const languageSelectList = [
    'ko',
    'en',
    'cn',
    'jp',
];

const selectCountry = {
    value: ref("ko"),
    items: languageSelectList,
}

</script>
