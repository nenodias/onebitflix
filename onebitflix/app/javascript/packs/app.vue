<template>
  <v-app>
    <Header />
    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>
 
<script>
import Footer from "./components/shared/footer.vue";
import Header from "./components/shared/header.vue";

export default {
  data() {
    return {};
  },
  components: {
    Footer: Footer,
    Header: Header,
  },
};
</script>
 
<style>
#app {
  background-color: #0c0c0c !important;
}
</style>