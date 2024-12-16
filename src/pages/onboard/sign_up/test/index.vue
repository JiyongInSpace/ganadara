<template>
    <v-container class="fill-height d-flex flex-column transition">
        <!-- :class="{ 'background-tertiary': currentStep === 1 }" -->
        <Level_test_step_0
            v-if="currentStep === 0"
            @onClickNext="compButtonNext.event.onClick"
            @onClickSkip="compButtonSkip.event.onClick"
        />

        <Level_test_step_results
            v-if="currentStep === 1"
            @onClickGoToHome="compButtonGoToHome.event.onClick"
        />

        <Survey_skip
            v-model="dialogSkip.value.value"
            @onClickCancel="buttonCancel.event.onClick"
            @onClickSkip="buttonSkip.event.onClick"
        />
    </v-container>
</template>

<script lang="ts" setup>

const router = useRouter();
const currentStep = ref(0);

// const userResults = reactive({
//     results: {
//         //
//     }
// });

const dialogSkip = {
    value: ref(false),
}

const compButtonSkip = {
    event: {
        onClick: () => {
            dialogSkip.value.value = true;
        }
    }
}

const compButtonNext = {
    event: {
        onClick: (_event: any) => {
            alert("TEST");
            currentStep.value++;
        }
    }
}
const compButtonGoToHome = {
    event: {
        onClick: (_event: any) => {
            alert("HOME");
            router.push("/");
        }
    }
}

const buttonCancel = {
    event: {
        onClick: () => {
            dialogSkip.value.value = false;
        }
    }
}

const buttonSkip = {
    event: {
        onClick: () => {
            alert("HOME");
            dialogSkip.value.value = false;
            router.push("/");
        }
    }
}

</script>