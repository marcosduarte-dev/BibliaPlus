<script setup lang="ts">
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import {
  togglePanelEvent,
  toastMessage,
} from "../events/TitleBarButtonsEvents";
import { ref, watch } from "vue";
import Indice from "./Indice.vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const sendSuccessToast = (message: string) => {
  toast.add({
    severity: "success",
    summary: "Sucesso",
    detail: message,
    group: "tl",
    life: 3000,
  });
  toastMessage.value = "";
};

const renderizarPanel1 = ref(true);

watch(togglePanelEvent, (value) => {
  renderizarPanel1.value = value;
});

watch(toastMessage, (value) => {
  if (value === "") return;
  sendSuccessToast(value);
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
      <Indice />
    </SplitterPanel>
    <SplitterPanel
      class="flex align-items-center justify-content-center"
      :size="75"
    >
      <Toast group="tl" />
    </SplitterPanel>
  </Splitter>
</template>
