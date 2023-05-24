<template>
  <Navbar />
  <router-view />
  <Footer></Footer>
</template>

<script>

import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue"
export default {
  components: {
    Navbar,
    Footer
  }
}

</script>

<style>
body {
  background-color: white;
  color: black;
}

.small-text {
  font-size: 12px;
}

.custom-text {
  font-family: "Arial", sans-serif;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: black;
}

.nav-link {
  font-family: "Arial", sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.white-bg {
  background-color: white;
}

.icon {
  font-size: 16px;
  margin-right: 5px;
}
</style>