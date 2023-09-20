<template>
  <div class="vertical">
    <iframe
      type="text/html"
      ref="ifrmWindy"
      id="ifrmWindy"
      src="http://127.0.0.1:5501/src/windy/windy.html"
      @load="windyLoad"
      class="is-fullscreen"
    />
    <div class="checkboxes">
      <p>{{ selected }}</p>
      <v-btn @click="sendMessage"> Button </v-btn>
      <v-checkbox
        v-for="item in boats.result"
        :key="item.sail"
        v-model="selected"
        :label="item.sail"
        :value="item.sail"
      ></v-checkbox>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import boats from "@/windy/boats.json";

const selected = ref([]);
const ifrmWindy = ref(null);
onMounted(() => {
  // console.log(ifrmWindy);
  // console.log(selected);
});
//
const sendMessage = () => {
  // console.log(selected);
  // console.log(JSON.stringify(selected));
  // console.log(JSON.parse(JSON.stringify(selected)));
  ifrmWindy.value.contentWindow.postMessage(
    JSON.parse(JSON.stringify(selected)),
    "http://127.0.0.1:5501/src/windy/windy.html"
  );
};
// const getChild = () => {
//   let frame = ifrmWindy.value;
//   console.log(frame.contentWindow);
//   // return frame.contentWindow || frame.contentDocument;
// };
// watch(() => {
//   getChild();
//   // if (getChild()) {
//   //   getChild().changeMap();
//   // }
// });
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
