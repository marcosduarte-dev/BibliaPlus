<script setup lang="ts">
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import { appWindow } from "@tauri-apps/api/window";
</script>

<template>
  <div class="card">
    <Toolbar data-tauri-drag-region class="toolbar">
      <template #start>
        <Button
          icon="pi pi-plus"
          class="btn_toolbar"
          severity="secondary"
          iconClass="btn_toolbar_text"
        />
        <Button
          icon="pi pi-upload"
          class="btn_toolbar"
          severity="secondary"
          iconClass="btn_toolbar_text"
        />
      </template>

      <template #center>
        <label>BibliaPlus</label>
      </template>

      <template #end>
        <Button
          icon="pi pi-minus"
          class="btn_toolbar"
          severity="secondary"
          @click="appWindow.minimize()"
          iconClass="btn_toolbar_text"
        />
        <Button
          icon="pi pi-stop"
          severity="secondary"
          class="btn_toolbar"
          @click="appWindow.toggleMaximize()"
          iconClass="btn_toolbar_text"
        />
        <Button
          icon="pi pi-times"
          severity="secondary"
          class="btn_toolbar"
          @click="appWindow.close()"
          iconClass="btn_toolbar_text"
        />
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
