import { createWebHistory, createRouter } from "vue-router";
import MainView from "@/views/MainView";
import barchartEX from "@/views/BarchartEX";
import piechartEX from "@/views/PiechartEX";
import staticChart from "@/views/StaticChart";
import guageChart from "@/views/GuageChartEx";
import dynamicDataChart from "@/views/DynamicDataChart";
import dynamicDataMultipleChart from "@/views/DynamicDataMultipleChart";
import dynamicDataAsyncMultipleChart from "@/views/DynamicDataAsyncMultipleChart";
import dynamicDataAsyncMultipleChartv2 from "@/views/DynamicDataAsyncMultipleChartv2";
import dynamicDataAsyncMultipleChartv3 from "@/views/DynamicDataAsyncMultipleChartv3";
import heatMap from "@/views/HeatMap";
import windy from "@/views/windyExercise";

const routes = [
  {
    path: "/",
    name: "MainView",
    component: MainView,
  },
  {
    path: "/barchartEX",
    name: "barchartEX",
    component: barchartEX,
  },
  {
    path: "/piechartEX",
    name: "piechartEX",
    component: piechartEX,
  },
  {
    path: "/guageChart",
    name: "guageChart",
    component: guageChart,
  },
  {
    path: "/staticChart",
    name: "staticChart",
    component: staticChart,
  },
  {
    path: "/dynamicDataChart",
    name: "dynamicDataChart",
    component: dynamicDataChart,
  },
  {
    path: "/dynamicDataMultipleChart",
    name: "dynamicDataMultipleChart",
    component: dynamicDataMultipleChart,
  },
  {
    path: "/dynamicDataAsyncMultipleChart",
    name: "dynamicDataAsyncMultipleChart",
    component: dynamicDataAsyncMultipleChart,
  },
  {
    path: "/dynamicDataAsyncMultipleChartv2",
    name: "dynamicDataAsyncMultipleChartv2",
    component: dynamicDataAsyncMultipleChartv2,
  },
  {
    path: "/dynamicDataAsyncMultipleChartv3",
    name: "dynamicDataAsyncMultipleChartv3",
    component: dynamicDataAsyncMultipleChartv3,
  },
  {
    path: "/heatMap",
    name: "heatMap",
    component: heatMap,
  },
  {
    path: "/windy",
    name: "windy",
    component: windy,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
