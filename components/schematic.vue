<script setup lang="ts">
//#region props-emit
const props = defineProps({
  Data: {
    type: Array,
    required: true,
  }
});
//#endregion

</script>

<template>
  <div class="container transition-all px-2" style="direction: ltr;">
    <div class="flex flex-col transition-all md:grid grid-cols-12 text-gray-50">

      <!-- Other Stations -->
      <div class="flex transition-all md:contents relative" v-for="(option,i) in Data.slice(0,Data.length-1)" :key="`Result_${i}`">

        <!-- Left : Bus Sign -->
        <div :class="[{'w-12 h-12 transition-all object-contain absolute top-1/2 right-0 -mt-7 -mr-2 z-50 block animate-bounce': option.enterStation} , {'w-10 h-10 transition-all object-contain absolute top-1/2 right-0 mt-4 -mr-1 z-50 block animate-bounce': option.exitStation} , {'hidden': !option.exitStation && !option.enterStation}]">
          <img src="/img/yellow-bus.png" alt="YellowBus" class="w-full h-full transition-all object-contain z-50" />
          <span class="absolute w-full justify-center items-center flex top-2.5 right-0 text-xs">{{option.busNr}}</span>
        </div>

        <!-- Info -->
        <div class="flex transition-all px-4 py-3 rounded-xl my-2.5 mr-auto shadow-md w-full" :class="option.Color">
          <UPopover class="flex absolute left-5 self-center" overlay v-if="option.Time">
            <UIcon name="solar:info-circle-line-duotone" size="20"/>
            <template #content>
              <div class="py-4 px-8 text-center" style="direction: rtl">
                <p class="Estedad_FD_Bold text-slate-900 text-xs mb-2"> راهنما </p>
                <p class="Estedad_FD text-slate-700 text-xs"> زمان تقریبی رسیدن به موقعیت شما : <span class="Estedad_FD_Bold text-slate-900 text-lg mx-2">{{option.arrivedTime}}</span> دقیقه دیگر </p>
                <p class="Estedad_FD text-slate-700 text-xs mt-3" v-if="option.exitStation"> اتوبوس از این ایستگاه خارج شده است </p>
                <p class="Estedad_FD text-slate-700 text-xs mt-3" v-else> اتوبوس به تازگی وارد این ایستگاه شده است </p>
              </div>
            </template>
          </UPopover>

          <p class="font-semibold text-sm m-auto" style="direction: rtl">
            <span>{{option.title}}</span>
            <span v-if="option.Time" class="Estedad_FD_Light text-xs mr-3"> ( {{option.Time}} ) </span>
          </p>
        </div>

        <!-- Right : Circle Sign -->
        <div class="col-start-2 col-end-4 ml-10 md:mx-auto relative">
          <div class=" w-6 flex items-center justify-center" :class="[{'h-full' : i !== Data.length-1} , {'h-1/2' : i === Data.length-1}]">
            <div class="h-full w-1 pointer-events-none" :class="option.Color , {'startLineCircle' : i === 0}"></div>
          </div>
          <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full shadow text-center" :class="option.Color">
            <i class="fas fa-check-circle text-white"></i>
          </div>
        </div>
      </div>

      <!-- You Are Here -->
      <div class="flex transition-all md:contents relative" v-for="(option,i) in Data.slice(Data.length-1,Data.length)" :key="`Result_${i}`">

        <!-- Left : Circle Sign -->
        <div v-if="false" class="col-start-2 col-end-4 mr-10 md:mx-auto relative">
          <div class=" w-6 flex items-center justify-center" :class="[{'h-full' : i !== Data.length-1} , {'h-1/2' : i === Data.length-1}]">
            <div class="h-full w-1 pointer-events-none" :class="option.Color , {'startLineCircle' : i === 0}"></div>
          </div>
          <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full shadow text-center" :class="option.Color">
            <i class="fas fa-check-circle text-white"></i>
          </div>
        </div>

        <!-- Info -->
        <div class="flex transition-all py-3 rounded-xl my-2.5 mr-auto shadow-md w-full bg-amber-400">
          <p class="font-semibold text-sm m-auto text-slate-700">
            <span class="Estedad_FD_Light text-xs ml-3 "> شما اینجا هستید : </span>
            <span>{{option.title}}</span>
          </p>
        </div>

        <!-- Right : Circle Sign -->
        <div class="col-start-2 col-end-4 ml-10 md:mx-auto relative">
          <div class=" w-6 flex items-center justify-center h-1/2">
            <div class="h-full w-1 pointer-events-none bg-amber-400" ></div>
          </div>
          <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full shadow text-center bg-amber-400" >
            <i class="fas fa-check-circle text-white"></i>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>

.startLineCircle {
  height: 50% !important;
  margin-top: 250% !important;
}

</style>