<template>
  <div class="vertical" id="windy-com">
    <iframe
      type="text/html"
      ref="ifrmWindy"
      id="ifrmWindy"
      src="http://127.0.0.1:5501/src/windy/windy.html"
      class="is-fullscreen"
    />
    <div class="checkboxes">
      <p>{{ selected }}</p>
      <v-btn @click="sendMessage"> Button </v-btn>
      <v-checkbox
        hide-details
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
import { ref } from "vue";
import boats from "@/windy/boats.json";

const selected = ref([]);
const ifrmWindy = ref(null);

const getChild = () => {
  let frame = ifrmWindy.value;
  // console.log(frame.contentDocument);
  return frame.contentWindow || frame.contentDocument;
};

const sendMessage = () => {
  getChild().postMessage(
    JSON.parse(JSON.stringify(selected)),
    "http://127.0.0.1:5501/src/windy/windy.html"
  );
};
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
.checkboxes {
  width: 30%;
  height: 80vh;
}
</style>
