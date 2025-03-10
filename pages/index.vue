<script setup lang="ts">

//#region Enums
enum Step {
    Splash,
    Main,
}
//#endregion

//#region Variables
const step = ref<Step>(Step.Splash)
//#endregion





//#region Lifecycle
onMounted(() => {
    setTimeout(() => {
        step.value = Step.Main
    }, 4000)
})
//#endregion
</script>

<template>
    <div>
        <Splash v-if="step === Step.Splash" />
        <Main v-if="step === Step.Main" />
    </div>
</template>
