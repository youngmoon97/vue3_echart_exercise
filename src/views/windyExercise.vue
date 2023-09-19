<template>
  <div class="vertical">
    <iframe
      type="text/html"
      ref="ifrmWindy"
      id="ifrmWindy"
      src="http://127.0.0.1:5501/src/windy/index.html"
      class="is-fullscreen"
    />
    <v-container fluid>
      <p>{{ selected }}</p>
      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
      <v-checkbox v-model="selected" label="Jacob" value="Jacob"></v-checkbox>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selected = ref(["John"]);
</script>

<style>
iframe {
  height: 80vh;
  width: 100%;
  resize: vertical;
}
.vertical {
  display: flex;
}
</style>
