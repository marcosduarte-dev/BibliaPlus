<script setup lang="ts">
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
</script>

<template>
  <div class="card">
    <Toolbar>
      <template #start>
        <Button icon="pi pi-plus" class="mr-2" severity="secondary" />
        <Button icon="pi pi-upload" severity="secondary" />
      </template>

      <template #center>
        <label>BibliaPlus</label>
      </template>

      <template #end>
        <Button icon="pi pi-minus" class="mr-2" severity="secondary" />
        <Button icon="pi pi-stop" severity="secondary" />
        <Button icon="pi pi-times" severity="secondary" />
      </template>
    </Toolbar>
  </div>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
