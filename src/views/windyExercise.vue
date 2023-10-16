<template>
  <div class="vertical" id="windy_com">
    <iframe
      type="text/html"
      ref="ifrmWindy"
      id="ifrmWindy"
      src="@/../static/windy/windy.html"
      @load="windyLoad"
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
/* eslint-disable */
import { onMounted, ref } from "vue";
import boats from "@/../static/windy/boats.json";

const selected = ref([]);
const ifrmWindy = ref(null);

const windyLoad = () => {
  if (getChild()) {
    // getChild().init();
  }
};
const test = () => {
  console.log("parent test");
};
const getChild = () => {
  let frame = ifrmWindy.value;
  console.log(frame.contentDocument);
  return frame.contentWindow || frame.contentDocument;
};

const sendMessage = () => {
  // console.log(selected.value);
  getChild().postMessage(
    JSON.parse(JSON.stringify(selected)),
    "http://127.0.0.1:5501/src/windy/windy.html"
  );
};

onMounted(() => {
  getChild().test;

  console.log(getChild());
  window.addEventListener("message", function (e) {
    if (e.origin !== "http://127.0.0.1:5501/src/windy/windy.html") return;
    // console.log('child message');
    console.log(e.data); // { parentData : 'test parent data' }
    // console.log("e.origin : " + e.origin); //http://abc.com(부모창 도메인)
  });
});
const listen = (event) => {
  // 메시지의 오리진을 체크하여 신뢰할 수 있는 메시지인지를 확인
  // if (!event.data) return;
  // if (!event.data.id || event.data.id !== this.id) return;
  console.log("listen", event.data);

  // if (this.getChild()) {
  //   this.getChild().setData(this.prsMapData);
  // }
  this.$emit("message", event);
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
