import {
  visiblebibliaARC,
  visiblebibliaARCA,
  visiblebibliaKJA,
  visiblebibliaNVI,
  visiblebibliaviva,
} from "../events/bibliasVisibleEvents";

export const BibliaService = {
  getBibliasInstaladasData() {
    return {
      items: [
        {
          label: "Almeida Revista e Corrigida",
          sigla: "ARC",
          visible: visiblebibliaARC.value,
        },
        {
          label: "Almeida Revista Corrigida e Anotada",
          sigla: "ARCA",
          visible: visiblebibliaARCA.value,
        },
        {
          label: "King James Atualizada",
          sigla: "KJA",
          visible: visiblebibliaKJA,
        },
        {
          label: "Nova Versão Internacional",
          sigla: "NVI",
          visible: visiblebibliaNVI,
        },
        { label: "Bíblia Viva", sigla: "viva(br)", visible: visiblebibliaviva },
      ],
    };
  },

  getBibliasInstaladas() {
    return Promise.resolve(this.getBibliasInstaladasData());
  },
};
