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
import { ref, provide, onMounted } from "vue";
import { chartApi } from "@/api/chartApi";

let timeInData = ref([]);
let valueInData = ref([]);
let locationInData = ref([]);
let datas = null;

onMounted(() => {
  datas = chartApi();
  datas.then((res) => {
    res.forEach((element) => {
      timeInData.value.push(element.time);
      valueInData.value.push(element.value);
      locationInData.value.push(element.location);
    });
    // console.log(valueInData.value);
  });
  // console.log(`datas : ${datas}`);
});
use([
  CanvasRenderer,
  // GaugeChart,
  LineChart,
  // PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

provide(THEME_KEY, "dark");

const option = ref({
  title: {
    text: "Static Data",
    left: "right",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} )",
  },
  // legend: {
  //   // 상단에 데이터 나열
  //   orient: "vertical",
  //   left: "left",
  //   data: timeInData,
  // },
  xAxis: {
    type: "category",
    data: timeInData,
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "line",
      data: valueInData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
