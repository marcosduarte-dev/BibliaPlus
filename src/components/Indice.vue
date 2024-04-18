<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IndiceService } from "../service/indice";
import Tree from "primevue/tree";

const nodes = ref();
const selectedKey = ref();

onMounted(() => {
  IndiceService.getIndiceBiblia().then((data) => (nodes.value = data));
});

const onNodeSelect = (node: any) => {
  console.log(node.label + " selected");
};

const onNodeUnselect = (node: any) => {
  console.log(node.label + " unselected");
};
</script>

<template>
  <Tree
    v-model:selectionKeys="selectedKey"
    :value="nodes"
    selectionMode="single"
    class="w-full md:w-30rem"
  ></Tree>
</template>
