<template>
  <div class="vertical">
    <iframe
      type="text/html"
      ref="ifrmWindy"
      id="ifrmWindy"
      src="http://127.0.0.1:5501/src/windy/windy.html"
      @load="windyLoad"
      :selected="selected"
      class="is-fullscreen"
    />
    <div class="checkboxes">
      <p>{{ selected }}</p>
      <v-checkbox
        v-for="item in boats.result"
        :key="item.sail"
        v-model="selected"
        :label="item.sail"
        :value="item.sail"
        @click="sendMessage"
      ></v-checkbox>
    </div>
  </div>
</template>

<script setup>
// import RenderToIFrame from "@/components/RenderToIFrame";
import { onMounted, ref } from "vue";
import boats from "@/windy/boats.json";

const selected = ref(["FRA18"]);
const ifrmWindy = ref(null);

onMounted(() => {});
//
const sendMessage = () => {
  console.log(selected);
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

// const onClick = () => {
//   console.log(`selected.value : ${selected.value}`);
//   sendMessage();
// };
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
