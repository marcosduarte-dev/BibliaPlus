<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  bibliaSelecionada,
  capituloSelecionado,
} from "../events/bibliasVisibleEvents";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";

const capitulo = ref("");
const conteudo = ref("");

const setaValores = (value: string) => {
  let ultimoEspaco = value.lastIndexOf(" ");

  if (ultimoEspaco !== -1) {
    let parteAntesEspaco = value.substring(0, ultimoEspaco);
    let parteDepoisEspaco = value.substring(ultimoEspaco + 1);
    let novaString = parteAntesEspaco + parteDepoisEspaco;
    novaString = novaString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    lerCapitulo(novaString);
    capitulo.value = novaString;
  } else {
    lerCapitulo(value);
    capitulo.value = value;
  }
};

watch(capituloSelecionado, (value) => {
  setaValores(value);
});

watch(bibliaSelecionada, () => {
  lerCapitulo(capitulo.value);
});

onMounted(() => {
  if (bibliaSelecionada.value != null) setaValores(capituloSelecionado.value);
});

const lerCapitulo = async (value: string) => {
  if (bibliaSelecionada.value != "" && value != "") {
    const contents = await readTextFile(
      "BibliaPlus/Biblias/" + bibliaSelecionada.value + "/" + value + ".bp",
      {
        dir: BaseDirectory.Document,
      }
    );

    conteudo.value = contents;
  }
};
</script>

<template>
  <p>{{ conteudo }}</p>
</template>
