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
//#region Variables
const selectedLine = ref(null)
const openDrawer = ref(false)
//#endregion

//#region Functions
const makeOpenDrawer = async (data: any) => {
    selectedLine.value = data;
    openDrawer.value = true;
}
const onSelect = async (way: any) => {
    openDrawer.value = false;
    emit('select', selectedLine.value, way);
}
const onBack = async () => {
    emit('back');
}
//#endregion

defineShortcuts({
    o: () => (openDrawer.value = !openDrawer.value)
})
</script>
<template>
  <div class="p-7 text-center rounded-t-lg text-slate-800 bg-gradient-to-b from-white dark:text-white dark:bg-slate-800 border-t border-t-slate-300 border-x border-x-slate-300  h-auto min-h-full justify-center">
        <p class="mb-8 mt-5 text-center text-sm text-cyan-500 w-full"> خط مورد نظر را مشخص نمایید </p>

        <div class="grid grid-cols-2 gap-3 w-full">
            <div class="bg-blue-50 px-4 py-3 text-right rounded-xl text-slate-700 text-sm w-full"
                v-for="(item, i) in props.data" :key="`Line_${i}`" @click="makeOpenDrawer(item)">{{ item.id }} . {{
                    item.title
                }}</div>
        </div>

        <div class="bg-slate-200 border border-slate-300 px-2 py-3 text-center rounded-xl text-slate-600 text-sm w-2/3 mt-8 mx-auto"
            @click="onBack">تغییر منطقه</div>


        <UDrawer v-model:open="openDrawer" should-scale-background title="انتخاب نوع مسیر">
            <template #content>
                <div class="p-5 flex flex-col justify-center items-center ">
                    <h2 class="text-lg Estedad_FD_Bold"> انتخاب نوع مسیر </h2>
                    <h5 class="text-sm Estedad_FD_Light mt-2 text-gray-400"> با توجه به مقصد ، نوع مسیر را مشخص کنید
                    </h5>

                    <div class="grid grid-cols-2 gap-3 mt-6 w-full">
                        <div class="transition-all duration-700 bg-slate-700 px-2 py-3 text-center justify-center rounded-xl text-white text-sm w-full flex flex-row"
                            @click="onSelect(1)">
                            <UIcon class="self-center text-white ml-3" name="lucide:arrow-up-to-line" size="25" />
                            <span class="text-lg"> رفـت </span>
                        </div>

                        <div class="transition-all duration-700 bg-slate-700 px-2 py-3 text-center justify-center rounded-xl text-white text-sm w-full flex flex-row"
                            @click="onSelect(2)">
                            <UIcon class="self-center text-white rotate-180 ml-3" name="lucide:arrow-up-to-line"
                                size="25" />
                            <span class="text-lg"> برگشت </span>
                        </div>
                    </div>
                </div>
            </template>
        </UDrawer>

    </div>
</template>