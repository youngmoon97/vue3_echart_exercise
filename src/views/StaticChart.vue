<template>
  <h1>LineChart</h1>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { chartApi } from "@/api/chartApi.js";
// import axios from "axios";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import { THEME_KEY } from "vue-echarts";
import { ref, provide, onMounted } from "vue";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

provide(THEME_KEY, "light");

const option = ref({
  title: {
    text: "LineChart Static Data",
    left: "right",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c})",
  },
  legend: {
    // 상단에 데이터 나열
    orient: "vertical",
    left: "left",
    data: ["2011", "2012", "2013", "2014", "2015"],
  },
  xAxis: {
    type: "category",
    data: datas.time,
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "2011",
      type: "bar",
      data: [335],
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

let datas;
onMounted(() => {
  datas = chartApi();
  console.log(datas);
});
// console.log(`datas : ${datas}`);
</script>

<style></style>
