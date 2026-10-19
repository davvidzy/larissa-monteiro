/* ==========================================================================
   quiz-data.js — conteúdo do quiz (perguntas, transição, resultados)
   O quiz abre direto na primeira pergunta (sem tela de apresentação).

   Regras:
   - NÃO exibir preços, planos, descontos ou ofertas em nenhuma tela do quiz.
     Os preços aparecem só na landing (/oferta/).
   - O resultado é escolhido pela pergunta marcada com `defineResult: true`:
     cada opção dela aponta, em `result`, para uma chave de `results`.
   ========================================================================== */

window.QUIZ_DATA = {
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

  /**
   * Resultado: título direto + uma frase curta. A tela inteira (com o botão)
   * precisa caber na altura do celular, sem rolagem — mantenha os textos curtos.
   */
  results: {
    a: {
      title: "Você só precisa de um caminho claro.",
      text: "Comece pelos materiais e fundamentos certos, com seus estudos organizados.",
    },
    b: {
      title: "Entenda antes de investir.",
      text: "Saiba o que você realmente precisa antes de gastar com materiais.",
    },
    c: {
      title: "Comece pelos fundamentos.",
      text: "Com explicações visuais, materiais e mapeamentos ficam fáceis de entender.",
    },
    d: {
      title: "Hora de organizar seus próximos passos.",
      text: "Um roteiro de estudos mostra o que aprender primeiro.",
    },
  },

  /** Botão do resultado (leva à landing). Sem preços, planos ou ofertas no quiz. */
  cta: "Quero conhecer o material →",
};
