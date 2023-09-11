<template>
  <Header />
  <hr />
  <router-view />
  <hr />
  <Footer />
</template>

<script>
import Header from "@/views/layout/HaederView.vue";
import Footer from "@/views/layout/FooterView.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>
