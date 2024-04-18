<script setup lang="ts">
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import { appWindow } from "@tauri-apps/api/window";
import { togglePanelEvent } from "../events/TitleBarButtonsEvents";

const togglePanel = () => {
  togglePanelEvent.value = !togglePanelEvent.value;
};
</script>

<template>
  <div class="card">
    <Toolbar data-tauri-drag-region class="toolbar">
      <template #start>
        <Button
          icon="pi pi-bars"
          class="btn_toolbar"
          severity="secondary"
          iconClass="btn_toolbar_text"
          @click="togglePanel()"
        />
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
.toolbar {
  padding: 0.23rem;
  height: var(--toolbar-height);
}

.btn_toolbar {
  width: 1.9rem;
  margin-left: 0.15rem;
  padding: 0.2rem 0;
}
</style>
