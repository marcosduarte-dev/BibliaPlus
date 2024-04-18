<script setup lang="ts">
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import { togglePanelEvent } from "../events/TitleBarButtonsEvents";
import { ref, watch } from "vue";

const renderizarPanel1 = ref(true);

watch(togglePanelEvent, (value) => {
  renderizarPanel1.value = value;
});

const resizeStart = () => {
  if (!renderizarPanel1.value) {
    renderizarPanel1.value = true;
    togglePanelEvent.value = true;
  }
};
</script>

<template>
  <Splitter class="h-full" @resizestart="resizeStart()">
    <SplitterPanel
      v-show="renderizarPanel1"
      class="flex align-items-center justify-content-center"
      :size="25"
    >
      Panel 1
    </SplitterPanel>
    <SplitterPanel
      class="flex align-items-center justify-content-center"
      :size="75"
    >
      Panel 2
    </SplitterPanel>
  </Splitter>
</template>
