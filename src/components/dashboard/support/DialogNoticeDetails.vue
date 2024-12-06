<template>
    <v-bottom-sheet
        v-model="dialog"
        transition="dialog-bottom-transition"
    >
        <v-card class="pt-0 px-5 pb-5 rounded-t-16">
            <v-sheet
                class="d-flex justify-center align-center text-center flex-shrink-0"
                height="56"
            >
                <span class="text-t-lg font-weight-bold ">
                    공지사항
                </span>
            </v-sheet>

            <v-btn
                icon="mdi-close"
                class="position-absolute top-3 right-3"
                size="small"
                variant="text"
                @click="dialog = false"
            />

            <div class="pt-8 pb-2-5 border-b mb-8">
                <div class="text-t-lg font-weight-bold mb-1">
                    {{ state.title }}
                </div>

                <div class="text-t-sm font-weight-medium text-text-quaternary">
                    {{ format(state.created_at, "yyyy.MM.dd") }}
                </div>
            </div>

            <div v-html="state.content" />
        </v-card>
    </v-bottom-sheet>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';

const dialog = defineModel("dialog");

const state = reactive({
    title: "업데이트 안내",
    created_at: "2024-11-25T14:30:15.123Z",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio eos modi sapiente repellat libero ratione, architecto quia consequuntur dolore quasi dolorum laboriosam minus id, adipisci nam itaque sequi ipsam voluptas dolorem asperiores illum explicabo nesciunt neque! Provident odit neque, molestias necessitatibus aliquid aliquam mollitia obcaecati, atque reprehenderit soluta sed. Accusantium provident natus odio impedit rem explicabo, cupiditate asperiores cumque sint reiciendis, sequi nemo, nisi voluptatum dignissimos inventore ab? Voluptatum voluptate, quae minima soluta est illum dolore dolor magni beatae iure accusantium ipsam eos excepturi doloribus, quaerat natus. Soluta dolore, temporibus nisi excepturi, distinctio porro vel doloribus blanditiis in adipisci placeat est aspernatur quia deleniti reprehenderit nemo nostrum! Magnam sit error aliquid reiciendis tempore vel. Sed explicabo quod ad qui modi quaerat laboriosam, quis vero nihil cupiditate dolore fuga sit quisquam minima, quas odit atque eaque neque deserunt delectus! Temporibus incidunt cum quasi illum distinctio! Autem, nobis accusamus doloremque, quae similique dolores itaque cumque laborum in quisquam cum fugiat nihil asperiores saepe atque adipisci modi architecto ut quibusdam ipsa dolorem dicta voluptatibus? Non atque aliquid dolorem quod quos natus vitae enim, molestiae suscipit? Maxime libero cupiditate accusamus! Accusamus, aliquid in quidem blanditiis voluptatum doloremque debitis voluptas cum impedit error dignissimos, quibusdam accusantium fugit molestiae neque laudantium rem cupiditate aliquam! Nemo est et facere impedit enim, illo minima. Sequi quam provident dolores veniam praesentium ex dicta amet cum sit laboriosam consequuntur quas laborum dolor voluptatem animi tenetur magnam repudiandae explicabo nobis a illum, minima molestias fugiat doloremque. Doloribus consequuntur ipsam laborum consequatur perferendis, eveniet adipisci esse dolore necessitatibus soluta. Commodi reprehenderit ipsam sit laboriosam sed numquam ut quod deserunt harum? Adipisci consectetur similique maxime repudiandae in voluptates, magnam quibusdam inventore blanditiis ipsum esse, at ut iure tenetur et. Amet nobis similique et at cum? Rerum, nesciunt alias. Repellat dolore fugit nisi asperiores esse reiciendis totam voluptatum ad nemo tempore saepe blanditiis facere modi ex consequuntur est sapiente veritatis, reprehenderit consequatur magni! Quisquam, vitae, nisi ipsa perferendis earum totam accusantium vero illo pariatur alias natus maxime rerum amet iure veritatis laboriosam distinctio deleniti, et velit! Inventore cupiditate placeat, ipsa distinctio doloribus sit illo ad laboriosam tenetur molestiae mollitia rem exercitationem assumenda minus recusandae vitae voluptate? Amet et quaerat velit eum sequi, in ipsam consequuntur delectus nemo ducimus aut perspiciatis iste sint rem ad minima qui, porro rerum? Necessitatibus voluptatibus labore ipsam, nulla aliquid blanditiis dolore, architecto alias fugiat ipsum non eius eum perspiciatis aliquam minus quam repellendus saepe dolores adipisci similique sit eos natus voluptatum. Quaerat iure laboriosam aut quod numquam. Porro assumenda, dolores in, perspiciatis expedita aliquam vel numquam repellat eum ex obcaecati libero fuga, tempore tenetur architecto repellendus. Amet quam velit accusantium architecto repellendus, illo, consequuntur dicta inventore nulla adipisci accusamus ratione dolor officiis explicabo tempore iusto reiciendis unde asperiores optio ad quo! Vitae labore suscipit perspiciatis eligendi accusantium, necessitatibus delectus. Nemo illum laudantium minima officiis provident repellat, corrupti eligendi debitis cupiditate mollitia beatae iusto nulla. Deserunt, quam libero veritatis, ullam non facilis officiis, sit quaerat recusandae labore id corporis architecto!"
})
</script>

<style lang="scss" scoped></style>