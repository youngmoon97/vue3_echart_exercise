<template>
  <div class="vertical">
    <iframe
      type="text/html"
      ref="ifrmWindy"
      id="ifrmWindy"
      src="http://127.0.0.1:5501/src/windy/index.html"
      class="is-fullscreen"
    />
    <div class="checkboxes">
      <p>{{ selected }}</p>
      <v-checkbox
        v-for="item in boats.result"
        :key="item.rank"
        v-model="selected"
        :label="item.sail"
        :value="item.rank"
        @click="onClick"
      ></v-checkbox>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import boats from "@/windy/boats.json";
import { myfn } from "@/windy/script.js";
// import { windyinit } from "https://api.windy.com/assets/map-forecast/libBoot.js";
// import axios from "axios";

myfn();
const selected = ref([]);

onMounted(() => {});

const onClick = () => {
  console.log("click");
};

// const rank = ref([]);
// boats.result.then((boat) => console.log(boat));
console.log(boats.result);
// boats.forea;
</script>

<style>
iframe {
  height: 80vh;
  width: 70%;
  resize: vertical;
}
.vertical {
  display: flex;
}
</style>
