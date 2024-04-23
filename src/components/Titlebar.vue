<script setup lang="ts">
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import { appWindow } from "@tauri-apps/api/window";
import {
  togglePanelEvent,
  toastMessage,
} from "../events/TitleBarButtonsEvents";
import { open } from "@tauri-apps/api/dialog";
import { createDir, BaseDirectory, exists } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/tauri";
import Menu from "primevue/menu";
import { ref, onMounted, watch } from "vue";
import { BibliaService } from "../service/biblia";
import { Store } from "tauri-plugin-store-api";
import { bibliaSelecionada } from "../events/bibliasVisibleEvents";

const store = new Store(".settings.dat");

const menu = ref();
const items = ref([BibliaService.getBibliasInstaladasData()]);

const toggle = (event: any) => {
  menu.value.toggle(event);
};

const instalarBiblia = async () => {
  const documentDirPath = await documentDir();

  var existePastaBiblias = await exists("BibliaPlus/Biblias", {
    dir: BaseDirectory.Document,
  });

  if (!existePastaBiblias) {
    await createDir("BibliaPlus/Biblias", {
      dir: BaseDirectory.Document,
      recursive: true,
    });
  }

  try {
    const selectedPath = (await open({
      multiple: false,
    })) as string;
    if (!selectedPath) return;

    const pathNormalizado = selectedPath.replace(/\\/g, "/");
    const nomeArquivo = pathNormalizado.split("/").pop();
    const nomeSemExtensao = nomeArquivo!.replace(".zip", "");

    var existePastaInstalar = await exists(
      "BibliaPlus/Biblias/" + nomeSemExtensao,
      {
        dir: BaseDirectory.Document,
      }
    );

    if (existePastaInstalar) {
      sendToast("Biblia ja esta instalada!");
    } else {
      const output = documentDirPath + "BibliaPlus/Biblias/" + nomeSemExtensao;
      const response = await invoke("extraindo_zip", {
        zip: pathNormalizado,
        output: output,
      });
      if (response) {
        sendToast("Biblia instalada com sucesso!");
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const togglePanel = () => {
  togglePanelEvent.value = !togglePanelEvent.value;
};

const sendToast = (message: string) => {
  toastMessage.value = message;
};

onMounted(async () => {
  const biblia = await store.get("biblia-selecionada");
  if (biblia != null) {
    bibliaSelecionada.value = biblia.toString();
  }
});

watch(bibliaSelecionada, (value) => {});
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
          @click="(e) => toggle(e)"
        />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        <label class="nome_biblia">{{ bibliaSelecionada }}</label>
        <Button
          icon="pi pi-upload"
          class="btn_toolbar"
          severity="secondary"
          iconClass="btn_toolbar_text"
          @click="instalarBiblia()"
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
.nome_biblia {
  font-size: 0.8rem;
  margin-left: 0.8rem;
  margin-right: 0.8rem;
}
</style>
