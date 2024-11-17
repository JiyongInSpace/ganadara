<template>
    <div>
        <div class="d-flex ">
            <v-btn @click="onClick1">push</v-btn>
            <v-btn @click="onClick2">gift</v-btn>
            <v-btn @click="onClick3">point</v-btn>
            <v-btn @click="onClick4">lose</v-btn>
            <v-btn @click="onClick5">enco</v-btn>
        </div>


        <DialogPushAgreement v-model:dialog="state.push" />
        <DialogGetGift
            v-model:dialog="state.gift"
            gift="경품명"
        />
        <DialogGetPoint
            v-model:dialog="state.point"
            :point="200"
            mission="test"
        />
        <DialogLose v-model:dialog="state.lose" />
        <DialogEncourageLogin v-model:dialog="state.encourage" />
    </div>
</template>

<script lang="ts" setup>
const state = reactive({
    push: false,
    gift: false,
    point: false,
    lose: false,
    encourage: false,
});

const onClick1 = () => {
    state.push = true;
}
const onClick2 = () => {
    state.gift = true;
}
const onClick3 = () => {
    state.point = true;
}
const onClick4 = () => {
    state.lose = true;
}
const onClick5 = () => {
    state.encourage = true;
}

</script>
