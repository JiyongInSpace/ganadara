<template>
    <v-dialog
        v-model="computedModelValue"
        max-width="800"
        class="v-dialog--bottom_sheet"
        transition="dialog-bottom-transition"
    >
        <template v-slot:default>
            <v-card class="pt-5 px-4 pb-4">
                <div class="mb-5 ml-auto">
                    <v-btn
                        class="flex-grow-0"
                        icon
                        variant="text"
                        width="20"
                        height="20"
                        @click="buttonClose.event.onClick"
                    >
                        <v-icon icon="mdi-close"></v-icon>
                    </v-btn>
                </div>

                <div class="mb-10 text-t-xl font-weight-bold">
                    서비스 이용 동의
                </div>

                <v-checkbox
                    v-model="checkboxTerms.allTerms.value"
                    class="border rounded-lg px-3-5 mb-5 font-weight-bold text-t-md background-secondary"
                    label="필수 약관 모두 동의"
                    true-icon="mdi-check-circle"
                    false-icon="mdi-check-circle"
                    hide-details
                    color="primary"
                    @update:modelValue="checkboxTerms.event.onChangeAllTerms"
                />

                <v-divider class="mb-5" />

                <div style="height: 1%; overflow-y: auto;">
                    <v-expansion-panels>
                        <v-expansion-panel
                            v-for="i in serviceTermsItems"
                            :key="i"
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                            title="Item"
                            class="pa-0"
                        >
                            <template v-slot:title>
                                <v-checkbox
                                    v-model="computedTermsValues"
                                    :value="i"
                                    true-icon="mdi-check-circle"
                                    false-icon="mdi-check-circle"
                                    hide-details
                                    class="py-0"
                                    color="primary"
                                    @click.stop
                                    @change="checkboxTerms.event.onChange(i)"
                                />

                                <div
                                    class="text-t-md font-weight-medium"
                                    v-text="i"
                                />
                            </template>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts" setup>

const props = defineProps<{
    modelValue: boolean,
    termsValues: string[]
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'update:termsValues', value: string[]): void;
    (e: 'click:allTerms', value: boolean): void;
}>()

const serviceTermsItems = [
    "terms",
    "service",
    "privacy",
    "age",
    "marketing",
    "cookie",
];

const computedModelValue = computed({
    get: () => {
        return props.modelValue;
    },
    set: () => {
        emit('update:modelValue', !props.modelValue);
    }
});

const computedTermsValues = computed({
    get: () => {
        return props.termsValues;
    },
    set: () => {
        emit('update:termsValues', props.termsValues);
    }
});

const checkboxTerms = {
    allTerms: ref(false),

    event: {
        onChangeAllTerms: (_event: boolean) => {
            emit('click:allTerms', _event)
        },

        onChange: (_event: string) => {
            const index = props.termsValues.indexOf(_event);
            if (index === -1) {
                emit('update:termsValues', [...props.termsValues, _event]); // Add item
            } else {
                emit('update:termsValues', props.termsValues.filter(i => i !== _event)); // Remove item
            }
        },
    }
};


const buttonClose = {
    event: {
        onClick: () => {
            emit('update:modelValue', false);
        },
    }
};

watch(
    () => props.termsValues,
    (_event) => {
        if(_event.length === serviceTermsItems.length) {
            checkboxTerms.allTerms.value = true;
        } else {
            checkboxTerms.allTerms.value = false;
        }
    }
)

</script>

<style lang="scss" scoped>
@import '@/styles/settings.scss';

.px-2-5 {
    padding-left: 10px;
    padding-right: 10px;
}

.px-3-5 {
    padding-left: 14px;
    padding-right: 14px;
}
</style>