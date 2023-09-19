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
  ToolboxComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, onUnmounted, onMounted } from "vue";
import { chartApi } from "@/api/chartApi";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
]);

provide(THEME_KEY, "light");

let polling = null;
let eastData = ref({ location: "east", data: [], time: [] });
let westData = ref({ location: "west", data: [], time: [] });
let southData = ref({ location: "south", data: [], time: [] });
let northData = ref({ location: "north", data: [], time: [] });

const option = ref({
  title: {
    text: "Dynamic Data Async Multiple Chart v2",
    left: "left",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },
  toolbox: {
    show: true,
    feature: {
      magicType: {
        show: true,
        type: ["stack", "tiled"],
      },
      saveAsImage: { show: true },
    },
  },
  legend: {
    data: ["east", "west", "south", "north"],
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    splitLine: {
      show: false,
    },
    data: eastData.value.time,
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
  series: [
    {
      name: "east",
      // smooth: true,
      type: "line",
      data: eastData.value.data,
      showSymbol: false,
    },
    {
      name: "west",
      // smooth: true,
      type: "line",
      data: westData.value.data,
      showSymbol: false,
    },
    {
      name: "south",
      // smooth: true,
      type: "line",
      data: southData.value.data,
      showSymbol: false,
    },
    {
      name: "north",
      // smooth: true,
      type: "line",
      data: northData.value.data,
      showSymbol: false,
    },
  ],
});

// 데이터 하나씩 넘겨받아서 뿌려주기 생각

// 초기 데이터 for로 전부 다 받아서 뿌리고
// newData 초단위로 받기

onMounted(() => {
  getFirstData("-100s", "east", eastData);
  getFirstData("-100s", "west", westData);
  getFirstData("-100s", "south", southData);
  getFirstData("-100s", "north", northData);

  polling = setInterval(() => {
    dataLocationChk();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(polling);
});

// 2023-09-12T14:54:02.375Z
function dateFormat(date) {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  const hhmmss = date.substring(11, 19);
  return year + "/" + month + "/" + day + " " + hhmmss;
}

function getFirstData(range, location, obj) {
  let firstData = chartApi(range, location);
  // console.log(firstData);
  firstData.then((res) => {
    // console.log(res);
    if (res.length > 0) {
      res.forEach((element) => {
        //  console.log(element);
        const formatDate = dateFormat(element.time);
        obj.value.data.push(element.value);
        obj.value.time.push(formatDate);
      });
    }
  });
}
function dataLocationChk() {
  let newData = chartApi("-1s");
  console.log(newData);
  newData.then((res) => {
    if (res.length > 0) {
      res.forEach((element) => {
        if (element.location == eastData.value.location) {
          // console.log("eastData");
          getNewData(element, eastData);
        } else if (element.location == westData.value.location) {
          // console.log("westData");
          getNewData(element, westData);
        } else if (element.location == southData.value.location) {
          // console.log("southData");
          getNewData(element, southData);
        } else if (element.location == northData.value.location) {
          // console.log("northData");
          getNewData(element, northData);
        }
      });
    }
  });
}
function getNewData(element, obj) {
  const formatDate = dateFormat(element.time);
  obj.value.data.push(element.value);
  obj.value.time.push(formatDate);
  dataShift();
}

function dataShift() {
  eastData.value.time.shift();
  westData.value.time.shift();
  southData.value.time.shift();
  northData.value.time.shift();
}
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
