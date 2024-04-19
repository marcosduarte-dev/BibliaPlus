<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IndiceService } from "../service/indice";
import Tree from "primevue/tree";
import ScrollPanel from "primevue/scrollpanel";

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
  <ScrollPanel class="scrollPanel_indice">
    <Tree
      v-model:selectionKeys="selectedKey"
      :value="nodes"
      selectionMode="single"
      :filter="true"
      filterMode="strict"
    ></Tree>
  </ScrollPanel>
</template>

<style scoped>
.p-tree {
  padding: 0.5rem;
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
