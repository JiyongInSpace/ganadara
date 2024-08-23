<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        fullscreen
    >
        <!-- TRIGGER (SELECTED ITEM) -->
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                block
                v-bind="activatorProps"
                class="justify-start truncate"
                height="75"
            >
                <div
                    v-if="selectedChapter"
                    class="d-flex align-center justify-start ga-2 truncate"
                >
                    <v-chip
                        variant="elevated"
                        size="small"
                        class="flex-shrink-0"
                    >
                        {{ t(`level_chip.${selectedChapter.levels}`) }}
                    </v-chip>

                    <div class="text-t-xl font-weight-medium truncate">
                        {{ selectedChapter.name }}
                    </div>

                    <v-icon
                        icon="mdi-chevron-down"
                        size="large"
                    />
                </div>
            </v-btn>
        </template>

        <v-card>
            <!-- TITLE -->
            <v-toolbar
                class="bg-transparent"
            >
                <v-toolbar-title>
                    단원 선택
                </v-toolbar-title>

                <v-spacer />

                <v-btn
                    icon="mdi-close"
                    @click="dialog = false"
                />
            </v-toolbar>

            <!-- LIST -->
            <v-list
                item-title="name"
                item-value="id"
                @update:selected="listChapter.event.listItem.onClick"
                mandatory
            >
                <v-skeleton-loader
                    v-if="listChapter.loading.value"
                    v-for="i in 10"
                    :key="i"
                    type="list-item-two-line"
                    height="100"
                />

                <v-list-item
                    v-for="chapterItem in listChapter.list.value"
                    :key="chapterItem.id"
                    :value="chapterItem.id"
                    link
                    height="100"
                    :disabled="!chapterItem.isLocked"
                    :active="selectedChapter?.id === chapterItem.id"
                >
                    <template v-slot:prepend>
                        <v-card
                            v-if="!chapterItem.isLocked"
                            class="d-flex justify-center align-center mr-4"
                            width="76"
                            height="76"
                        >
                            <v-icon
                                icon="mdi-lock"
                                size="48"
                            />
                        </v-card>
                    </template>

                    <div class="mb-1 truncate">
                        <v-chip
                            variant="elevated"
                            size="small"
                            class="mr-2"
                        >
                            {{ t(`level_chip.${chapterItem.levels}`) }}
                        </v-chip>

                        <span class="text-t-sm">
                            {{ chapterItem.groupSize.toLocaleString() }}명이 함께 공부 중
                        </span>
                    </div>

                    <div class="text-t-xl font-weight-medium truncate">
                        {{ chapterItem.name }}
                    </div>

                    <template v-slot:append>
                        <div
                            v-if="chapterItem.isLocked"
                            class="text-center ml-5"
                        >
                            <div class="mb-1">

                                <v-icon
                                    v-if="chapterItem.state != CHAPTER_STATES.TESTED"
                                    icon="mdi-minus"
                                />

                                <div
                                    v-else
                                    class="font-weight-semibold text-t-xl"
                                >
                                    {{ chapterItem.solvedProblems }} <span class="text-grey">/ {{
                                        chapterItem.totalProblems
                                        }}</span>
                                </div>
                            </div>

                            <div>
                                <v-chip
                                    variant="outlined"
                                    :disabled="chapterItem.state != CHAPTER_STATES.COMPLETED"
                                    @click.stop="listChapter.event.chip.onClick(chapterItem.id)"
                                >
                                    {{ chapterItem.state != CHAPTER_STATES.TESTED ? '테스트 보기' : '테스트 완료' }}
                                </v-chip>
                            </div>
                        </div>
                    </template>
                </v-list-item>
            </v-list>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { CHAPTER_STATES, IChapter, LEVELS } from "@/interfaces";
import { useI18n } from "vue-i18n";

const dialog = defineModel("dialog");
const selectedChapter = defineModel<IChapter>("selectedChapter");

// 번역
const { t } = useI18n({
    messages: {
        en: {
            level_chip: {
                beginner: "초급",
                lower_intermediate: "초중급",
                intermediate: "중급",
                advanced: "상급",

            },
        },
        ko: {
            level_chip: {
                beginner: "초급",
                lower_intermediate: "초중급",
                intermediate: "중급",
                advanced: "상급",
            },
        },
    },
    inheritLocale: true, // 전역 locale 상속
    useScope: "local", // 로컬 스코프 설정
});

const listChapter = {
    loading: ref(false),
    list: ref<IChapter[]>([]),
    event: {
        listItem: {
            onClick: (_chapterItem: any) => {
                listChapter.list.value.forEach((item) => {
                    if (item.id === _chapterItem[0]) {
                        selectedChapter.value = item;
                        dialog.value = false;
                    }
                });
            }
        },
        chip: {
            onClick: (id: number) => {
                alert(id);
            }
        }
    }
}



// dummy data ======================= (삭제 예정)
watch(dialog, () => {
    if (listChapter.list.value.length === 0) {
        listChapter.loading.value = true;
        setTimeout(() => {
            listChapter.list.value = dummy__chapterList;
            listChapter.loading.value = false;
        }, 1000);
    }
});


const dummy__chapterList = [
    {
        levels: LEVELS.BEG,
        name: '긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목',
        id: 1,
        groupSize: 1234,
        isLocked: true,
        state: CHAPTER_STATES.NOT_STARTED,
        totalProblems: 0,
        solvedProblems: 0
    },
    {
        levels: LEVELS.BEG,
        name: '짧',
        id: 2,
        groupSize: 0,
        isLocked: true,
        state: CHAPTER_STATES.COMPLETED,
        totalProblems: 0,
        solvedProblems: 0
    },
    {
        levels: LEVELS.LOWINT,
        name: '테마 제목 최대 한 줄',
        id: 3,
        groupSize: 12341234231,
        isLocked: true,
        state: CHAPTER_STATES.TESTED,
        totalProblems: 20,
        solvedProblems: 17
    },
    {
        levels: LEVELS.INT,
        name: '테마 제목 최대 한 줄',
        id: 4,
        groupSize: 1,
        isLocked: true,
        state: CHAPTER_STATES.NOT_STARTED,
        totalProblems: 0,
        solvedProblems: 0
    },
    {
        levels: LEVELS.INT,
        name: '긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목',
        id: 5,
        groupSize: 1234,
        isLocked: false,
        state: CHAPTER_STATES.NOT_STARTED,
        totalProblems: 0,
        solvedProblems: 0
    },
    {
        levels: LEVELS.ADV,
        name: '짧',
        id: 6,
        groupSize: 1234,
        isLocked: false,
        state: CHAPTER_STATES.NOT_STARTED,
        totalProblems: 0,
        solvedProblems: 0
    },
    {
        levels: LEVELS.ADV,
        name: '테마 제목 최대 한 줄',
        id: 7,
        groupSize: 1234,
        isLocked: false,
        state: CHAPTER_STATES.NOT_STARTED,
        totalProblems: 0,
        solvedProblems: 0
    },
    {
        levels: LEVELS.ADV,
        name: '테마 제목 최대 한 줄',
        id: 8,
        groupSize: 1234,
        isLocked: false,
        state: CHAPTER_STATES.NOT_STARTED,
        totalProblems: 0,
        solvedProblems: 0
    },
    {
        levels: LEVELS.ADV,
        name: '테마 제목 최대 한 줄',
        id: 9,
        groupSize: 1234,
        isLocked: false,
        state: CHAPTER_STATES.NOT_STARTED,
        totalProblems: 0,
        solvedProblems: 0
    },
];
// ================================
</script>

<style lang="scss" scoped>
:deep(.v-btn__content) {
    overflow: hidden;
}
</style>