<script setup lang="ts">

//#region Emit
const emit = defineEmits(['select'])
//#endregion
//#region Variables
const Cities = ref([
    { code: 1, title: 'خمینی شهر' },
    { code: 2, title: 'بهارستان' },
    { code: 3, title: 'فردیس' },
])
//#endregion
//#region Functions
const onSelect = async (data: any) => {
    emit('select', data);
}
//#endregion
</script>
<template>
    <div class="p-7 text-center rounded-t-lg text-slate-800 bg-gradient-to-b from-white dark:text-white dark:bg-slate-800 border-t border-t-slate-300 border-x border-x-slate-300  h-auto min-h-full justify-center">

        <div class="flex flex-col">
            <span class="Estedad_FD_Bold text-sm  text-slate-900 dark:text-white mb-3"> اطلاع رسانی سفر </span>
            <span class="Estedad_FD_Light text-justify text-xs text-slate-400 dark:text-gray-400 mt-2 leading-6"> شهروند
                گرامی ؛ جهت دریافت وضعیت حرکت اتوبوس ها ابتدا منطقه سپس خط مورد نظر را انتخاب و در ادامه ایستگاهی که در
                آن حضور دارید را مشخص نمایید . </span>
            <span class="Estedad_FD_Light text-justify text-xs text-slate-400 dark:text-gray-400 mt-2 leading-6"> در
                نهایت وضعیت به روز حرکت ناوگان حمل و نقل به سوی ایستگاه مورد نظر را مشاهده خواهید نمود . </span>
        </div>

        <p class="mb-5 mt-5 text-center text-sm text-cyan-500"> منطقه مورد نظر را مشخص نمایید </p>

        <div class="grid grid-cols-2 gap-3">
            <div class="bg-blue-50 px-4 py-3 text-right rounded-lg text-slate-700 text-sm w-full"
                v-for="(item, i) in Cities" :key="`City_${i}`" @click="onSelect(item)">
                {{ item.title }}</div>
        </div>

    </div>
</template>

<style scoped></style>
