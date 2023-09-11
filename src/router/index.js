import { createWebHistory, createRouter } from "vue-router";
import MainView from "@/views/MainView";
import barchartEX from "@/views/BarchartEX";
import piechartEX from "@/views/PiechartEX";
import staticChart from "@/views/StaticChart.vue";
import guageChart from "@/views/GuageChartEx";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
