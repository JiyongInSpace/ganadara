<template>
    <div class="pt-4 w-100 flex-grow-1 d-flex flex-column ">
        <div class="mb-4 text-d-xs font-weight-bold">
            국가를 선택해 주세요.
        </div>

        <v-select
            v-model="selectCountry.value.value"
            :items="selectCountry.items"
            item-title="name"
            item-text="name"
            item-value="code"
            variant="outlined"
            return-object
            placeholder="국가 선택"
            class="flex-grow-0"
            density="compact"
        >
            <template v-slot:item="{ props, item }">
                <v-list-item
                    v-bind="props"
                    :title="item.title"
                >
                    <template v-slot:append>
                        <v-icon
                            v-if="selectCountry.value.value?.code === item.value"
                            icon="mdi-check"
                            color="primary"
                        />
                    </template>
                </v-list-item>
            </template>
        </v-select>

        <v-spacer />

        <v-btn
            variant="tonal"
            size="x-large"
            class="primary flex-grow-0"
            block
            :disabled="!selectCountry.value.value"
            @click="buttonNext.event.onClick"
        >
            다음
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { countries } from 'country-data';

const emit = defineEmits<{
    (e: 'onClickNext', id: any): void // 국가코드 반환
}>();

const props = defineProps<{
    defaultValue?: any
}>();

onMounted(() => {
    if (!props.defaultValue.results.country) return;
    selectCountry.value.value = countries.all.find(country => country.alpha2 === props.defaultValue.results.country);
})

const selectCountry = {
    value: ref(),
    items: countries.all.map(country => ({
        name: country.name,
        code: country.alpha2,
        dialCode: country.countryCallingCodes[0]
    })),
}

const buttonNext = {
    event: {
        onClick: () => {
            if (!selectCountry.value.value) return;
            emit('onClickNext', { country: selectCountry.value.value.code });
        }
    }
}

</script>