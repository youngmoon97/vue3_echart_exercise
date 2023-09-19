<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, onUnmounted, onMounted } from "vue";
import { chartApi } from "@/api/chartApi";
// import infographic from "@/theme/infographic";
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

provide(THEME_KEY, "dark");
// VChart.registerTheme(THEME_KEY.themename, THEME_KEY.theme);

let polling = null;

const locations = {
  east: ref({ data: [], time: [] }),
  west: ref({ data: [], time: [] }),
  south: ref({ data: [], time: [] }),
  north: ref({ data: [], time: [] }),
  time: ref([]),
};

const option = ref({
  // theme: { infographic },
  title: {
    text: "Dynamic Data Async Multiple Chart v3",
    left: "left",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },
  legend: {
    data: Object.keys(locations),
  },
  xAxis: {
    type: "category",
    // max: locations.time[0].value,
    // min: locations.time[30].value,
    // boundaryGap: false,
    splitLine: {
      show: false,
    },
    data: locations.time.value,
    //
  },
  yAxis: {
    max: 1,
    // min: 0,
    // interval: 0,
    type: "value",
    boundaryGap: [0, "100%"],
    splitLine: {
      show: false,
    },
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1],
    },
  ],
  series: [
    {
      name: "east",
      smooth: true,
      // step: true,
      type: "line",
      data: locations.east.value.data,
      showSymbol: false,
      emphasis: {
        focus: "series",
      },
      // animation: true,
    },
    {
      name: "west",
      smooth: true,
      // step: true,
      type: "line",
      data: locations.west.value.data,
      showSymbol: false,
      emphasis: {
        focus: "series",
      },
      // animation: true,
    },
    {
      name: "south",
      // step: true,
      smooth: true,
      type: "line",
      data: locations.south.value.data,
      showSymbol: false,
      emphasis: {
        focus: "series",
      },
    },
    {
      name: "north",
      smooth: true,
      // step: true,
      type: "line",
      data: locations.north.value.data,
      showSymbol: false,
      emphasis: {
        focus: "series",
      },
    },
  ],
});

onMounted(() => {
  getFirstData("east", locations.east);
  getFirstData("west", locations.west);
  getFirstData("south", locations.south);
  getFirstData("north", locations.north);

  polling = setInterval(() => {
    getNewData(locations);
  }, 1000);
});

onUnmounted(() => {
  clearInterval(polling);
});

// 2023-09-12T14:54:02.375Z
function dateFormat(date) {
  // const year = date.substring(0, 4);
  // const month = date.substring(5, 7);
  // const day = date.substring(8, 10);
  const hhmmss = date.substring(11, 19);
  // return year + "/" + month + "/" + day + " " + hhmmss;
  return hhmmss;
}

function getFirstData(location, obj) {
  let firstData = chartApi("-100s", location);
  firstData.then((res) => {
    // console.log(res);
    if (res.length > 0) {
      res.forEach((element) => {
        const formatDate = dateFormat(element.time);
        obj.value.data.push(element.value);
        obj.value.time.push(formatDate);
        pushOtherData(location, formatDate);
        // console.log(element.value);
        // console.log(formatDate);
        locations.time.value.push(formatDate);
      });
    }
  });
}

function getNewData(locations) {
  let newData = chartApi("-1s");
  newData.then((res) => {
    // console.log(new Date());
    if (res.length > 0) {
      res.forEach((element) => {
        const formatDate = dateFormat(element.time);
        locations[element.location].value.data.push(element.value);
        locations[element.location].value.time.push(formatDate);
        pushOtherData(element.location, formatDate);
        dataShift();
        locations.time.value.push(formatDate);
        locations.time.value.shift();
        return 0;
      });
    }
  });
}

function pushOtherData(exceptLocation, formatDate) {
  const keys = Object.keys(locations);
  keys.forEach((res) => {
    if (res != exceptLocation && res != "time") {
      const data = locations[res].value.data;
      const time = locations[res].value.time;
      data.push(data[data.length - 1]);
      time.push(formatDate);
    }
    // locations[res].value.data.push(locations[res].value.data.at(-1));
  });
}

function dataShift() {
  locations.east.value.time.shift();
  locations.west.value.time.shift();
  locations.south.value.time.shift();
  locations.north.value.time.shift();
  locations.east.value.data.shift();
  locations.west.value.data.shift();
  locations.south.value.data.shift();
  locations.north.value.data.shift();
}
</script>

<style scoped>
.chart {
  height: 90vh;
}
</style>
