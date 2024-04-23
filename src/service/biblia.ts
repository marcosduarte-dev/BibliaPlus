import {
  bibliaSelecionada,
  visiblebibliaARC,
  visiblebibliaARCA,
  visiblebibliaKJA,
  visiblebibliaNVI,
  visiblebibliaviva,
} from "../events/bibliasVisibleEvents";
import { Store } from "tauri-plugin-store-api";

const store = new Store(".settings.dat");

export const BibliaService = {
  getBibliasInstaladasData() {
    return {
      items: [
        {
          label: "Almeida Revista e Corrigida",
          sigla: "ARC",
          visible: visiblebibliaARC.value,
          command: async () => {
            await store.set("biblia-selecionada", "ARC");
            await store.save();
            bibliaSelecionada.value = "ARC";
          },
        },
        {
          label: "Almeida Revista Corrigida e Anotada",
          sigla: "ARCA",
          visible: visiblebibliaARCA.value,
          command: async () => {
            await store.set("biblia-selecionada", "ARCA");
            await store.save();
            bibliaSelecionada.value = "ARCA";
          },
        },
        {
          label: "King James Atualizada",
          sigla: "KJA",
          visible: visiblebibliaKJA,
          command: async () => {
            await store.set("biblia-selecionada", "KJA");
            await store.save();
            bibliaSelecionada.value = "KJA";
          },
        },
        {
          label: "Nova Versão Internacional",
          sigla: "NVI",
          visible: visiblebibliaNVI,
          command: async () => {
            await store.set("biblia-selecionada", "NVI");
            await store.save();
            bibliaSelecionada.value = "NVI";
          },
        },
        {
          label: "Bíblia Viva",
          sigla: "viva(br)",
          visible: visiblebibliaviva,
          command: async () => {
            await store.set("biblia-selecionada", "viva(br)");
            await store.save();
            bibliaSelecionada.value = "viva(br)";
          },
        },
      ],
    };
  },

  getBibliasInstaladas() {
    return Promise.resolve(this.getBibliasInstaladasData());
  },
};
