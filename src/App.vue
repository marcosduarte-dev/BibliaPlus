<script setup lang="ts">
import BodyComponent from "./components/BodyComponent.vue";
import Titlebar from "./components/Titlebar.vue";
import { onMounted, ref } from "vue";
import { BaseDirectory, readDir } from "@tauri-apps/api/fs";
import {
  visiblebibliaNVI,
  visiblebibliaARC,
  visiblebibliaARCA,
  visiblebibliaKJA,
  visiblebibliaviva,
} from "./events/bibliasVisibleEvents";
import { BibliaService } from "./service/biblia";

const listaPastas = ref([""]);

const verificarPasta = async () => {
  try {
    var pastas = await readDir("BibliaPlus/Biblias/", {
      dir: BaseDirectory.Document,
    });

    pastas.forEach((item) => {
      listaPastas.value.push(item.name!);
    });

    BibliaService.getBibliasInstaladasData().items.forEach((item) => {
      if (!listaPastas.value.includes(item.sigla!)) {
        switch (item.sigla!) {
          case "NVI":
            visiblebibliaNVI.value = false;
            break;
          case "ARC":
            visiblebibliaARC.value = false;
            break;
          case "ARCA":
            visiblebibliaARCA.value = false;
            break;
          case "KJA":
            visiblebibliaKJA.value = false;
            break;
          case "viva(br)":
            visiblebibliaviva.value = false;
            break;
        }
      }
    });

    console.log("Finalizou");
  } catch (error) {
    console.error("Erro ao verificar as pastas:", error);
  }
};
onMounted(() => {
  verificarPasta();
});
</script>

<template>
  <Titlebar></Titlebar>
  <BodyComponent></BodyComponent>
</template>

<style scoped></style>
