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
    arrivedTime: any | null
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
        description: '',
        icon: 'i-solar-globus-bold-duotone'
    },
  {
        slot: 'line',
        title: 'خط',
    description: '',
        icon: 'i-solar-routing-line-duotone'
    },
  {
        slot: 'station',
        title: 'ایستگاه',
    description: '',
        icon: 'i-solar-point-on-map-perspective-bold-duotone'
    },
  {
        slot: 'bus',
        title: 'نتیجه',
    description: '',
        icon: 'i-solar-bus-bold-duotone'
    }
]
const loading = ref<Boolean>(false)
const stepper = useTemplateRef('stepper')
const step = ref<any>(0);
const Lines = ref<IItem[]>([])
const Stations = ref<IItem[]>([])
const Result = ref<IResult[]>([])
const waitingTime = ref<any|null>(null);
const GetResultTiming = ref(null);
const GetResultInterval = ref(null);
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
    items[0].description = data.title
    getLines();
}
const onSelectLine = (data: any, way: any) => {
    Selected.value.line = data;
    Selected.value.way = way;
    items[1].description = data.title
    getStations();
}
const onSelectStation = (data: any) => {
  Selected.value.station = data;
  items[2].description = data.title
  getBus();
}
const nextStep = () => {
        stepper.value?.next()
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
const getStations = async () => {
  Stations.value = [];

  if (!Selected.value.city ||!Selected.value.line || !Selected.value.way) return;

  loading.value = true;
  let x = await api.getStation(Selected.value.city.code, 1, 999,Selected.value.line.id);
  if (x.result) {
    x.data.items.forEach((item: any) => {
      if (item.code !== '0' && item.direction == Selected.value.way) Stations.value.push({id: item.code, title: item.title});
    });
    nextStep();
  }
  loading.value = false;
}
const getBus = async (resetData:boolean=true) => {
  if(resetData){
    Result.value = [];
    loading.value = true;
  }

  if (!Selected.value.city ||!Selected.value.station ||!Selected.value.line) return;

  let y = await api.getBus(Selected.value.city.code, Selected.value.station.id);
  if (y.result) {
  waitingTime.value = null;
  let founded = false;

  for (let item of Stations.value) {
    if (!founded) {
      let Color = 'bg-slate-800';
      let Time = null;
      let arrivedTime = null;
      let busNr = null;
      let enterStation = false;
      let exitStation = false;

      if (y.result){
        let x = y.data.items.find((car: any) => {
          if (car.lineNr == Selected.value.line.id && car.direction == Selected.value.way && car.stationNr == item.id)
            return car;
        })

        if (x) {
          Color = 'bg-green-500'
          Time = convertToJalaliTime(new Date(x.dateTime));
          busNr = x.busNr;
          //وضعیت داخل ایستگاه یا خارج شده از ایستگاه را مشخص میکند
          if (x.type == 0) enterStation = true;
          else if (x.type == 1) exitStation = true;

          waitingTime.value = x.time;
          arrivedTime = x.time;
        }
      }

      let findItem = Result.value.find((rs:any) => rs.id == item.id)
      //در صورتی که قبلا اضافه شده بود فقط به روز شود
      if (findItem) {
        findItem.Color = Color;
        findItem.Time = Time;
        findItem.arrivedTime = arrivedTime;
        findItem.busNr = busNr;
        findItem.enterStation = enterStation;
        findItem.exitStation = exitStation;
      }
      //در صورتی که اضافه نشده بود ، اضافه شود
      else {
        Result.value.push({id: item.id, Color: Color, Time: Time,arrivedTime: arrivedTime, title: `${item.id} - ${item.title}` , busNr : busNr , enterStation,exitStation})
      }

      //اگر به ایستگاه انتخاب شده رسید دیگر ادامه ندهد
      if (item.id == Selected.value.station.id) {
        founded = true;
        break;
      }
    }
  }

  GetResultTiming.value = convertToJalaliTime(new Date())
    nextStep();
  }
  loading.value = false;
}
//#endregion

//#region Watch
watch(() => step.value, async (data) => {
  if (step.value != 3){
    //@ts-ignore
    clearInterval(GetResultInterval.value);
  }
  else{
    if (Selected.value.station){
      //@ts-ignore
      GetResultInterval.value = setInterval(()=>{getBus(false)},5000);
    }
  }
});
//#endregion

</script>
<template>
    <div class="flex flex-col py-5 px-2 h-screen overflow-y-auto text-slate-800 bg-slate-50 dark:text-white dark:bg-slate-800">

        <Loading v-show="loading" />

        <div v-show="!loading" class="flex flex-col w-full h-full gap-4">
            <UStepper disabled  :items="items" v-model="step" ref="stepper" class="w-full h-full">
                <template #city>
                    <City @select="onSelectCity" />
                </template>
                <template #line>
                    <Line :data="Lines" @select="onSelectLine" @back="prevStep" />
                </template>
                <template #station>
                  <Station :data="Stations" @select="onSelectStation" @back="prevStep" />
                </template>
                <template #bus>
                  <Bus :data="Result" :waitingTime="waitingTime" :GetResultTiming="GetResultTiming" @back="prevStep" />
                </template>
            </UStepper>

        </div>


    </div>
</template>
