<template>
  <div class="menu-container">
    <router-link class="menu" to="/">main</router-link> |
    <router-link class="menu" to="/seperateChart">seperateChart</router-link> |
    <router-link class="menu" to="/barchartEX">BarChart</router-link> |
    <router-link class="menu" to="/piechartEX">PieChart</router-link> |
    <router-link class="menu" to="/guageChart">GaugeChart</router-link> |
    <router-link class="menu" to="/staticChart">StaticChart</router-link> |
    <router-link class="menu" to="/dynamicDataChart"
      >DynamicDataChart</router-link
    >|
    <!-- <router-link class="menu" to="/dynamicDataMultipleChart"
      >DynamicDataMulti</router-link
    >|
    <router-link class="menu" to="/dynamicDataAsyncMultipleChart"
      >DynamicDataMulti.v1</router-link
    >|
    <router-link class="menu" to="/dynamicDataAsyncMultipleChartv2"
      >DynamicDataMulti.v2</router-link
    >| -->
    <router-link class="menu" to="/dynamicDataAsyncMultipleChartv3"
      >DynamicDataMultipleChart</router-link
    >
    |
    <router-link class="menu" to="/heatMap">HeatMap</router-link> |
    <router-link class="menu" to="/windy">Windy</router-link> |
    <!-- <router-link class="menu" to="/smartWidget">SmartWidget</router-link> -->
  </div>
</template>

<style scoped>
.menu-container {
  display: flex;
  justify-content: center; /* Horizontally center content */
  align-items: center; /* Vertically center content */
  height: 100px; /* Adjust the height as needed */
}

.menu {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  margin: 0 10px; /* Adjust spacing between menu items as needed */
}
</style>
