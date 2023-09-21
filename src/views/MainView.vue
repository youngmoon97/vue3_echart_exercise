<template>
  <v-text-field
    label="입력하시오"
    :v-model="string"
    ref="string"
  ></v-text-field>
  <p>입력 문장 : {{ string.modelValue }}</p>
</template>
<script setup>
import { ref } from "vue";

const string = ref("");
</script>
