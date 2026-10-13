/* ==========================================================================
   quiz-data.js — conteúdo do quiz (perguntas, opções e resultados)

   Como funciona:
   - Cada opção soma pontos para um ou mais resultados em `points`.
   - No fim, o resultado com mais pontos é exibido.
   - As chaves usadas em `points` precisam existir em `results`.

   O conteúdo abaixo é de EXEMPLO — substitua pelo conteúdo real.
   ========================================================================== */

window.QUIZ_DATA = {
  questions: [
    {
      id: "efeito",
      question: "Que efeito você quer no seu olhar?",
      options: [
        { label: "Natural, como se fossem meus cílios", points: { classico: 2 } },
        { label: "Um pouco mais marcado, mas leve", points: { hibrido: 2 } },
        { label: "Bem cheio e marcante", points: { volume: 2 } },
      ],
    },
    {
      id: "rotina",
      question: "Como é a sua rotina de maquiagem?",
      options: [
        { label: "Quase não uso maquiagem", points: { classico: 1 } },
        { label: "Uso no dia a dia, sem exagero", points: { hibrido: 1 } },
        { label: "Adoro uma make completa", points: { volume: 1 } },
      ],
    },
    {
      id: "experiencia",
      question: "Você já fez extensão de cílios?",
      options: [
        { label: "Nunca fiz", points: { classico: 1 } },
        { label: "Já fiz algumas vezes", points: { hibrido: 1 } },
        { label: "Faço sempre", points: { volume: 1 } },
      ],
    },
    {
      id: "ocasiao",
      question: "Para qual ocasião você quer os cílios?",
      options: [
        { label: "Para o dia a dia", points: { classico: 1, hibrido: 1 } },
        { label: "Para um evento especial", points: { volume: 2 } },
        { label: "Para me sentir mais bonita sempre", points: { hibrido: 1 } },
      ],
    },
  ],

  results: {
    classico: {
      title: "Fio a Fio Clássico",
      text: "Um resultado natural e elegante, perfeito para quem quer realçar o olhar sem exageros.",
    },
    hibrido: {
      title: "Efeito Híbrido",
      text: "O equilíbrio ideal entre natural e marcante, com mais preenchimento e leveza.",
    },
    volume: {
      title: "Volume Russo",
      text: "Cílios cheios, escuros e marcantes para um olhar poderoso.",
    },
  },
};
