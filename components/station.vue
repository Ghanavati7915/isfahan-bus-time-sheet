<script setup lang="ts">

//#region Props - Emit
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
});
const emit = defineEmits(['select', 'back'])
//#endregion

//#region Functions
const onSelect = async (data: any) => {
    emit('select', data);
}
const onBack = async () => {
    emit('back');
}
//#endregion

</script>
<template>
  <div class="p-7 text-center rounded-t-lg text-slate-800 bg-gradient-to-b from-white dark:text-white dark:bg-slate-800 border-t border-t-slate-300 border-x border-x-slate-300 h-auto min-h-full justify-center">
      <p class="mb-8 mt-5 text-center text-sm text-cyan-500 w-full"> ایستگاه مورد نظر را مشخص نمایید </p>

        <div class="grid grid-cols-2 gap-3 w-full">
            <div class="bg-blue-50 px-4 py-3 text-right rounded-xl text-slate-700 text-sm w-full"
                v-for="(item, i) in props.data" :key="`Station_${i}`" @click="onSelect(item)">{{ item.id }} . {{ item.title }}</div>
        </div>

        <div class="bg-slate-200 border border-slate-300 px-2 py-3 text-center rounded-xl text-slate-600 text-sm w-2/3 mt-8 mx-auto"
            @click="onBack">تغییر خط</div>

    </div>
</template>