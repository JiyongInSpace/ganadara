<template>
    <div>
        <div class="d-flex ">
            <v-btn @click="onClick1">푸시알람 팝업</v-btn>
            <v-btn @click="onClick3">획득 팝업</v-btn>
            <v-btn @click="onClick4">획득 실패 팝업</v-btn>
            <v-btn @click="onClick2">경품 획득 팝업</v-btn>
            <v-btn @click="onClick5">회원가입 팝업</v-btn>
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