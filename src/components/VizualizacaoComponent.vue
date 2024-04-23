<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  bibliaSelecionada,
  capituloSelecionado,
} from "../events/bibliasVisibleEvents";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";

const capitulo = ref("");
const titulo = ref("");
const conteudo = ref("");
const conteudoArray = ref([""]);

const setaValores = (value: string) => {
  let ultimoEspaco = value.lastIndexOf(" ");

  if (ultimoEspaco !== -1) {
    let parteAntesEspaco = value.substring(0, ultimoEspaco);
    let parteDepoisEspaco = value.substring(ultimoEspaco + 1);
    let novaString = parteAntesEspaco + parteDepoisEspaco;
    novaString = novaString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    lerCapitulo(novaString);
    capitulo.value = novaString;
    titulo.value = value;
  } else {
    lerCapitulo(value);
    capitulo.value = value;
    titulo.value = value;
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
    conteudoArray.value = conteudo.value.split("\n");
    conteudoArray.value.pop();
  }
};
</script>

<template>
  <div class="container">
    <h1>{{ titulo }}</h1>

    <p v-for="(verso, num) in conteudoArray">{{ num + 1 }} - {{ verso }}</p>
  </div>
</template>

<style scoped>
.container {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
