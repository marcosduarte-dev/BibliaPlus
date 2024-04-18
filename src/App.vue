<script setup lang="ts">
import BodyComponent from "./components/BodyComponent.vue";
import Titlebar from "./components/Titlebar.vue";
</script>

<template>
  <Titlebar></Titlebar>
  <BodyComponent></BodyComponent>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
