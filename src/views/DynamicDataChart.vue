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
import { ref, provide, onUnmounted, onBeforeMount, onMounted } from "vue";
import { chartApi } from "@/api/chartApi";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

provide(THEME_KEY, "light");

let timeInData = ref([]);
let valueInData = ref([]);
let firstData = null;
let polling = null;

const option = ref({
  title: {
    text: "Dynamic Data Chart",
    left: "right",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    boundaryGap: false,
    splitLine: {
      show: false,
    },
    data: timeInData,
  },
  yAxis: {
    max: 1,
    min: 0,
    // interval: 0,
    type: "value",
    boundaryGap: [0, "100%"],
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      type: "line",
      data: valueInData,
      showSymbol: false,
    },
  ],
});

// 데이터 하나씩 넘겨받아서 뿌려주기 생각

onBeforeMount(() => {});

// 초기 데이터 for로 전부 다 받아서 뿌리고
// newData 초단위로 받기

onMounted(() => {
  firstData = chartApi("-100s");
  // console.log(firstData);
  firstData.then((res) => {
    // console.log(res);
    if (res.length > 0) {
      res.forEach((element) => {
        //  console.log(element);
        const formatDate = dateFormat(element.time);
        valueInData.value.push(element.value);
        timeInData.value.push(formatDate);
      });
    }
  });

  polling = setInterval(() => {
    let newData = chartApi("-1s");
    newData.then((res) => {
      // console.log(res);
      if (res.length > 0) {
        res.forEach((element) => {
          const formatDate = dateFormat(element.time);
          valueInData.value.push(element.value);
          timeInData.value.push(formatDate);
          valueInData.value.shift();
          timeInData.value.shift();
        });
      }
    });
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
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
