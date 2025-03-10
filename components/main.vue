<script setup lang="ts">
//#region Import
import RTPIS from '~/composables/api/useRTPIS';
//#endregion

//#region Instance
const api = new RTPIS();
//#endregion

//#region Inteface
interface IItem {
    id: number
    title: string
}
interface IResult {
    id: number
    Color: string | null
    Time: string | null
    title: string | null
    busNr: string | null
    enterStation: boolean | null
    exitStation: boolean | null
}
interface ISelected {
    city: { title: string, code: number } | null
    line: IItem | null
    way: IItem | null
    station: IItem | null
}
//#endregion

//#region Variables
const items = [
    {
        slot: 'city',
        title: 'شهر',
        icon: 'i-solar-globus-bold-duotone'
    }, {
        slot: 'line',
        title: 'خط',
        icon: 'i-solar-routing-line-duotone'
    }, {
        slot: 'station',
        title: 'ایستگاه',
        icon: 'i-solar-point-on-map-perspective-bold-duotone'
    }, {
        slot: 'result',
        title: 'نتیجه',
        icon: 'i-solar-bus-bold-duotone'
    }
]
const loading = ref<Boolean>(false)
const stepper = useTemplateRef('stepper')
const Lines = ref<IItem[]>([])
const Stations = ref<IItem[]>([])
const Result = ref<IResult[]>([])
const Selected = ref<ISelected>({
    city: null,
    line: null,
    way: null,
    station: null,
});
//#endregion

//#region Functions
const onSelectCity = (data: any) => {
    Selected.value.city = data;
    getLines();
}
const onSelectLine = (data: any, way: any) => {
    Selected.value.line = data;
}
const nextStep = () => {
    setTimeout(() => {
        stepper.value?.next()
    }, 150)
}
const prevStep = () => {
    setTimeout(() => {
        stepper.value?.prev()
    }, 150)
}
//#endregion

//#region GetData
const getLines = async () => {
    Lines.value = [];

    if (!Selected.value.city) return;

    loading.value = true;
    let x = await api.getLines(Selected.value.city.code, 1, 999);
    if (x.result) {
        x.data.items.forEach((item: any) => {
            Lines.value.push({ id: item.code, title: item.title });
        });
        nextStep();
    }
    loading.value = false;
}
//#endregion

</script>
<template>
    <div class="flex flex-col py-5 px-2">

        <Loading v-if="loading" />

        <div v-if="!loading" class="flex flex-col gap-4">
            <UStepper :items="items" ref="stepper" class="w-full">
                <template #city>
                    <City @select="onSelectCity" />
                </template>

                <template #line>
                    <Line :data="Lines" @select="onSelectLine" @back="prevStep" />
                </template>

                <template #station>
                    <Placeholder class="aspect-video">
                        station
                    </Placeholder>
                </template>

                <template #result>
                    <Placeholder class="aspect-video">
                        result
                    </Placeholder>
                </template>
            </UStepper>

        </div>


    </div>
</template>
