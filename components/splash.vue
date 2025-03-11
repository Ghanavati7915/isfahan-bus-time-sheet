<template>
  <div class="p-5 h-screen w-screen">
    <div class="flex justify-center items-center p-7 w-full h-full text-center rounded-lg text-slate-800 bg-gradient-to-bl from-slate-100 to-white dark:text-white dark:bg-slate-800 border border-slate-300">
      <div :class="[{'opacity-100': showMessage}]" class="flex flex-col transition-all delay-150 duration-500 ease-in-out opacity-0 items-center text-center leading-10 justify-center Estedad_FD_Light p-5">
        <span>        به مینی اپلیکیشن      </span>
        <div class="Estedad_FD_Bold">        اطلاع رسانی خدمات حمل و نقل اصفهان      </div>
        <div>        خوش آمدید      </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const showMessage = ref<boolean>(false)

//#region Lifecycle
onMounted(() => {
  setTimeout(() => {
    showMessage.value = true
  }, 1500)
})
//#endregion

</script>