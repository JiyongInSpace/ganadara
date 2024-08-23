<template>
    <div
        ref="container"
        className="d-flex flex-column ga-4"
    >
        <div
            v-for="(cue, index) in cues"
            :key="cue.time"
            :ref="setRef(index)"
            className="font-weight-medium"
        >
            <div :class="isHighlight(cue, index) ? 'text-t-xl font-weight-bold mb-4' : 'text-t-md mb-2'">
                {{ cue.text_en }}
            </div>

            <div :class="isHighlight(cue, index) ? 'text-t-md mb-4' : 'text-t-xs mb-2'">
                {{ cue.text_ko }}
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    cues: Array,
    currentTime: Number
});

const container = ref(null);
const cueRefs = ref([]);

const setRef = index => el => {
    cueRefs.value[index] = el;
};

const isHighlight = (cue, index) => {
    const nextCueTime = props.cues[index + 1] ? props.cues[index + 1].time : Number.MAX_SAFE_INTEGER;
    return props.currentTime >= cue.time && props.currentTime < nextCueTime;
};

watchEffect(() => {
    props.cues.forEach((cue, index) => {
        if (isHighlight(cue, index) && cueRefs.value[index]) {
            cueRefs.value[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});
</script>

<style></style>