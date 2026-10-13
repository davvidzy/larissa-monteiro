/* ==========================================================================
   quiz.js — motor do quiz (não precisa editar para trocar o conteúdo;
   o conteúdo fica em quiz-data.js)
   ========================================================================== */

(function () {
  "use strict";

  function createQuiz(root, data, config) {
    // started: já houve interação (antes disso não movemos o foco ao renderizar)
    const state = { index: -1, answers: [], started: false };

    const track = (name, params) =>
      window.Site && window.Site.track ? window.Site.track(name, params) : null;

    function el(tag, attrs, children) {
      const node = document.createElement(tag);
      Object.entries(attrs || {}).forEach(([key, value]) => {
        if (key === "text") node.textContent = value;
        else if (key === "on") Object.entries(value).forEach(([ev, fn]) => node.addEventListener(ev, fn));
        else node.setAttribute(key, value);
      });
      (children || []).forEach((child) => child && node.appendChild(child));
      return node;
    }

    function mount(screen, focusTarget) {
      root.replaceChildren(screen);
      if (focusTarget && state.started) focusTarget.focus({ preventScroll: true });
    }

    function renderQuestion() {
      const q = data.questions[state.index];
      const total = data.questions.length;
      const selected = state.answers[state.index];

      const heading = el("h3", { class: "quiz__question", tabindex: "-1", text: q.question });

      const options = el(
        "ul",
        { class: "quiz__options" },
        q.options.map((opt, i) =>
          el("li", {}, [
            el("button", {
              class: "quiz__option",
              type: "button",
              "aria-pressed": String(selected === i),
              text: opt.label,
              on: { click: () => choose(i) },
            }),
          ])
        )
      );

      // Na primeira pergunta não há para onde voltar
      const back =
        state.index > 0
          ? el("div", { class: "quiz__nav" }, [
              el("button", {
                class: "btn btn--outline",
                type: "button",
                text: "Voltar",
                on: { click: () => goTo(state.index - 1) },
              }),
            ])
          : null;

      mount(
        el("div", { class: "quiz__screen" }, [
          el("div", {
            class: "quiz__progress",
            role: "progressbar",
            "aria-valuemin": "0",
            "aria-valuemax": String(total),
            "aria-valuenow": String(state.index + 1),
          }, [
            el("div", { class: "quiz__progress-bar", style: `width:${((state.index + 1) / total) * 100}%` }),
          ]),
          el("p", { class: "quiz__step", text: `Pergunta ${state.index + 1} de ${total}` }),
          heading,
          options,
          back,
        ]),
        heading
      );
    }

    function choose(optionIndex) {
      state.answers[state.index] = optionIndex;
      const q = data.questions[state.index];
      if (!state.started) {
        state.started = true;
        track("quiz_start");
      }
      track("quiz_answer", { question: q.id, answer: q.options[optionIndex].label });
      goTo(state.index + 1);
    }

    function computeResult() {
      const scores = {};
      Object.keys(data.results).forEach((key) => (scores[key] = 0));

      state.answers.forEach((optionIndex, qIndex) => {
        const points = data.questions[qIndex].options[optionIndex].points || {};
        Object.entries(points).forEach(([key, value]) => {
          scores[key] = (scores[key] || 0) + value;
        });
      });

      // Empate: vence o resultado que aparece primeiro em `results`
      return Object.keys(scores).reduce((best, key) => (scores[key] > scores[best] ? key : best));
    }

    /** Leva à landing mantendo os parâmetros de campanha (utm_*, fbclid...). */
    function resultLink(key) {
      const url = new URL(config.resultUrl || "/", window.location.href);
      new URLSearchParams(window.location.search).forEach((value, name) => {
        if (!url.searchParams.has(name)) url.searchParams.set(name, value);
      });
      url.searchParams.set("quiz_result", key);
      return url.pathname + url.search + url.hash;
    }

    function renderResult() {
      const key = computeResult();
      const result = data.results[key];
      track("quiz_complete", { result: key });

      const heading = el("h3", { class: "quiz__result-title", tabindex: "-1", text: result.title });

      mount(
        el("div", { class: "quiz__screen quiz__result", "aria-live": "polite" }, [
          el("p", { class: "eyebrow", text: "Seu resultado" }),
          heading,
          el("p", { text: result.text }),
          el("div", { class: "quiz__actions" }, [
            el("a", {
              class: "btn",
              href: resultLink(key),
              text: config.resultCta || "Continuar",
              on: { click: () => track("quiz_result_click", { result: key }) },
            }),
            el("button", {
              class: "btn btn--outline",
              type: "button",
              text: "Refazer o quiz",
              on: { click: restart },
            }),
          ]),
        ]),
        heading
      );
    }

    function goTo(index) {
      if (index < 0) return;
      state.index = index;
      if (index >= data.questions.length) renderResult();
      else renderQuestion();
    }

    function restart() {
      state.index = -1;
      state.answers = [];
      track("quiz_restart");
      goTo(0);
    }

    // Começa direto na primeira pergunta
    goTo(0);
  }

  document.querySelectorAll("[data-quiz]").forEach((root) => {
    createQuiz(root, window.QUIZ_DATA, window.SITE_CONFIG || {});
  });
})();
