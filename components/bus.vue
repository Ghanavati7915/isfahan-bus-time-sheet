<script setup lang="ts">

//#region Props - Emit
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
  waitingTime: {
        required: true,
    },
  GetResultTiming: {
        required: true,
    },
});
const emit = defineEmits(['back'])
//#endregion

//#region Functions
const onBack = async () => {
    emit('back');
}
//#endregion

</script>
<template>
  <div class="p-7 text-center rounded-t-lg text-slate-800 bg-gradient-to-b from-white dark:text-white dark:bg-slate-800 border-t border-t-slate-300 border-x border-x-slate-300  h-auto min-h-full justify-center">

    <!--#region title - Timer -->
    <div class="flex flex-row items-center justify-between w-full mb-4 px-3">
      <p class="text-center text-sm text-cyan-500"> وضعیت حضور ناوگان در ایستگاه </p>
      <div class="flex flex-col justify-center items-center" v-if="GetResultTiming">
        <p class="text-left  text-xl  text-slate-800">{{GetResultTiming}}</p>
        <p class="text-left  text-xs  text-slate-400"> زمان به روز رسانی </p>
      </div>
    </div>
    <!--#endregion-->

    <!--#region Waiting Time Alarm -->
    <div v-if="waitingTime" class="flex items-center justify-center mb-4 text-xs text-slate-700 Estedad_FD_Light">
      <span> مدت زمان تقریبی رسیدن اتوبوس به موقعیت شما </span>
      <span class="text-sm text-slate-900 Estedad_FD_Bold mx-2"> {{waitingTime}} </span>
      <span> دقیقه می باشد. </span>
    </div>
    <div v-else class="flex items-center justify-center mb-4 text-xs text-slate-700 Estedad_FD_Light">
<!--      <span> ناوگانی در محدوده انتخاب شده یافت نشد </span>-->
      <UAlert
          color="warning"
          variant="soft"
          title="بدون خودرو"
          description="خودرویی در محدوده انتخاب شده حضور ندارد"
          icon="i-solar-bus-bold-duotone"
          :ui="{
      icon: 'size-11'
    }"
      />
    </div>
    <!--#endregion-->

    <!--#region Schematic -->
    <Schematic :Data="data" />
    <!--#endregion-->

    <!--#region Back -->
    <div class="bg-slate-200 border border-slate-300 px-2 py-3 text-center rounded-xl text-slate-600 text-sm w-2/3 mt-8 mx-auto mb-8" @click="onBack">تغییر ایستگاه</div>
    <!--#endregion-->
  </div>
</template>