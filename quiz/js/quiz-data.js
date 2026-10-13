/* ==========================================================================
   quiz-data.js — conteúdo do quiz (tela inicial, perguntas, resultados)

   Regras:
   - NÃO exibir preços, planos, descontos ou ofertas em nenhuma tela do quiz.
     Os preços aparecem só na landing (/oferta/).
   - O resultado é escolhido pela pergunta marcada com `defineResult: true`:
     cada opção dela aponta, em `result`, para uma chave de `results`.
   ========================================================================== */

window.QUIZ_DATA = {
  intro: {
    badge: "SEU PRIMEIRO PASSO NO UNIVERSO LASH 💖",
    title: "Sonha em trabalhar com cílios, mas ainda não sabe por onde começar?",
    text: "Responda 5 perguntas rápidas e descubra quais primeiros passos fazem sentido para você entrar no mercado de extensão de cílios.",
    button: "Quero descobrir meus primeiros passos →", //  : a seta não quebra sozinha
    note: "Gratuito • Cerca de 1 minuto",
  },

  questions: [
    {
      id: "desejo",
      question: "O que mais te anima na ideia de trabalhar com cílios? 💖",
      options: [
        { label: "Ter uma renda extra" },
        { label: "Trabalhar por conta própria" },
        { label: "Entrar no mercado da beleza" },
        { label: "Construir uma nova profissão" },
      ],
    },
    {
      id: "momento",
      question: "Em que momento você está nessa jornada?",
      options: [
        { label: "Só tenho vontade, ainda não comecei" },
        { label: "Já pesquisei bastante sobre cílios" },
        { label: "Já conheço alguns materiais e técnicas" },
        { label: "Estou procurando uma formação" },
      ],
    },
    {
      id: "dificuldade",
      question: "O que mais te impede de dar o primeiro passo?",
      defineResult: true,
      options: [
        { label: "Não sei por onde começar", result: "a" },
        { label: "Tenho medo de investir dinheiro errado", result: "b" },
        { label: "Não entendo os materiais e as técnicas", result: "c" },
        { label: "Não tenho um plano claro para começar", result: "d" },
      ],
    },
    {
      id: "interesse",
      question: "O que você gostaria de entender primeiro?",
      options: [
        { label: "Quais materiais são necessários" },
        { label: "Como funcionam as técnicas e os mapeamentos" },
        { label: "Quanto custa começar na área" },
        { label: "Como se preparar para conquistar clientes" },
      ],
    },
    {
      id: "proximo_passo",
      question: "Você gostaria de ter um guia para organizar seus primeiros estudos sobre cílios?",
      options: [
        { label: "Sim! Quero começar agora" },
        { label: "Sim, quero conhecer o conteúdo" },
        { label: "Ainda estou pesquisando minhas opções" },
      ],
    },
  ],

  /** Tela exibida por ~1 segundo antes do resultado. */
  transition: {
    text: "Organizando seus próximos passos... 💖",
    durationMs: 1100,
  },

  results: {
    a: {
      title: "Você já tem vontade de começar. Agora precisa de um caminho mais claro!",
      text: "Seu primeiro passo é conhecer os materiais, entender os fundamentos da extensão de cílios e organizar seus estudos.",
    },
    b: {
      title: "Antes de investir em materiais, vale a pena entender o que você realmente precisa.",
      text: "Conhecer os equipamentos, conceitos básicos e caminhos de formação pode ajudar você a planejar seus primeiros investimentos.",
    },
    c: {
      title: "Os materiais e mapeamentos parecem complicados? Comece pelos fundamentos.",
      text: "Com explicações visuais e uma sequência de estudos organizada, fica mais fácil entender os conceitos utilizados na área.",
    },
    d: {
      title: "Você tem interesse na profissão. Agora é hora de organizar seus próximos passos.",
      text: "Uma jornada de aprendizagem estruturada pode ajudar você a compreender o que estudar e como se preparar para atuar futuramente.",
    },
  },

  /** Bloco do material, abaixo do resultado. Sem preços, planos ou ofertas. */
  product: {
    title: "Seu próximo passo pode ser mais simples do que imagina 💖",
    text: "Conheça o Lash do Zero, um material educativo e ilustrado que reúne fundamentos, materiais, mapeamentos e orientações para ajudar você a começar seus estudos na área de cílios.",
    benefits: [
      "Entenda os primeiros passos da profissão",
      "Conheça os materiais e mapeamentos",
      "Organize seus estudos com mais clareza",
    ],
    button: "Quero conhecer o material →",
  },
};
