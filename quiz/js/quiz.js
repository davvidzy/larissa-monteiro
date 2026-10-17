/* ==========================================================================
   quiz.js — motor do quiz (não precisa editar para trocar o conteúdo;
   o conteúdo fica em quiz-data.js)

   Fluxo: perguntas (uma por tela, já na abertura) → transição → resultado
   ========================================================================== */

(function () {
  "use strict";

  /** Pausa após o toque para a opção marcada ficar visível antes de avançar. */
  const ADVANCE_DELAY_MS = 220;

  function createQuiz(root, data, config) {
    // started: já houve interação (antes disso não movemos o foco ao renderizar)
    const state = { index: 0, answers: [], started: false, busy: false };
    const total = data.questions.length;

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

    function mount(screen, { focus } = {}) {
      root.replaceChildren(screen);
      if (focus && state.started) focus.focus({ preventScroll: true });
      // Cada etapa começa no topo (o quiz é o primeiro conteúdo da página)
      if (state.started && window.scrollY > 0) window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /* ---------------------------------------------------------------- */
    /* Telas                                                            */
    /* ---------------------------------------------------------------- */

    function renderQuestion() {
      const q = data.questions[state.index];
      const selected = state.answers[state.index];

      const heading = el("h2", { class: "quiz__question", tabindex: "-1", text: q.question });

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
              on: { click: (event) => choose(i, event.currentTarget) },
            }),
          ])
        )
      );

      mount(
        el("div", { class: "quiz__screen" }, [
          el("div", {
            class: "quiz__progress",
            role: "progressbar",
            "aria-label": "Progresso do quiz",
            "aria-valuemin": "0",
            "aria-valuemax": String(total),
            "aria-valuenow": String(state.index + 1),
          }, [
            el("div", { class: "quiz__progress-bar", style: `width:${((state.index + 1) / total) * 100}%` }),
          ]),
          el("p", { class: "quiz__step", text: `Pergunta ${state.index + 1} de ${total}` }),
          heading,
          options,
          // Na 1ª pergunta não há tela anterior
          state.index > 0
            ? el("div", { class: "quiz__nav" }, [
                el("button", {
                  class: "quiz__back",
                  type: "button",
                  text: "← Voltar",
                  on: { click: () => goTo(state.index - 1) },
                }),
              ])
            : null,
        ]),
        { focus: heading }
      );
    }

    function renderTransition() {
      const status = el("p", { class: "quiz__transition-text", role: "status", tabindex: "-1", text: data.transition.text });
      mount(
        el("div", { class: "quiz__screen quiz__transition" }, [
          el("div", { class: "quiz__dots", "aria-hidden": "true" }, [el("span"), el("span"), el("span")]),
          status,
        ]),
        { focus: status }
      );
      window.setTimeout(renderResult, data.transition.durationMs || 1000);
    }

    function renderResult() {
      const key = resultKey();
      const result = data.results[key];
      const product = data.product;
      track("quiz_result_viewed", { result: key });

      const heading = el("h2", { class: "quiz__result-title", tabindex: "-1", text: result.title });

      mount(
        el("div", { class: "quiz__screen quiz__result" }, [
          el("p", { class: "quiz__eyebrow", text: "Seu resultado" }),
          heading,
          el("p", { class: "quiz__result-text", text: result.text }),

          el("div", { class: "quiz__product" }, [
            el("h3", { class: "quiz__product-title", text: product.title }),
            el("p", { class: "quiz__product-text", text: product.text }),
            el(
              "ul",
              { class: "quiz__benefits" },
              product.benefits.map((b) => el("li", { text: b }))
            ),
            el("a", {
              class: "btn btn--block",
              href: resultLink(key),
              text: product.button,
              on: { click: () => track("quiz_cta_clicked", { result: key }) },
            }),
          ]),
        ]),
        { focus: heading }
      );
    }

    /* ---------------------------------------------------------------- */
    /* Navegação e lógica                                               */
    /* ---------------------------------------------------------------- */

    function choose(optionIndex, button) {
      if (state.busy) return;
      state.busy = true;

      const q = data.questions[state.index];
      state.answers[state.index] = optionIndex;

      // Sem tela inicial: o quiz "começa" na primeira resposta
      if (!state.started) {
        state.started = true;
        track("quiz_start");
      }

      // Marca a opção escolhida antes de avançar
      root.querySelectorAll(".quiz__option").forEach((b) => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");

      track("quiz_question_answered", {
        question: q.id,
        question_number: state.index + 1,
        answer: q.options[optionIndex].label,
      });

      window.setTimeout(() => {
        state.busy = false;
        const next = state.index + 1;
        if (next < total) {
          goTo(next);
        } else {
          state.index = next;
          track("quiz_completed", { result: resultKey() });
          renderTransition();
        }
      }, ADVANCE_DELAY_MS);
    }

    /** Resultado definido pela resposta da pergunta marcada com `defineResult`. */
    function resultKey() {
      const qIndex = data.questions.findIndex((q) => q.defineResult);
      const option = data.questions[qIndex].options[state.answers[qIndex]];
      return option && option.result in data.results ? option.result : Object.keys(data.results)[0];
    }

    /** Leva à landing mantendo os parâmetros de campanha (utm_*, fbclid...). */
    function resultLink(key) {
      const url = new URL(config.resultUrl || "oferta/", window.location.href);
      new URLSearchParams(window.location.search).forEach((value, name) => {
        if (!url.searchParams.has(name)) url.searchParams.set(name, value);
      });
      url.searchParams.set("quiz_result", key);
      return url.pathname + url.search + url.hash;
    }

    function goTo(index) {
      state.index = index;
      renderQuestion();
    }

    // Abre direto na primeira pergunta
    goTo(0);
  }

  document.querySelectorAll("[data-quiz]").forEach((root) => {
    createQuiz(root, window.QUIZ_DATA, window.SITE_CONFIG || {});
  });
})();
