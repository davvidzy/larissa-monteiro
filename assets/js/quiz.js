/* ==========================================================================
   quiz.js — motor do quiz (não precisa editar para trocar o conteúdo;
   o conteúdo fica em quiz-data.js)
   ========================================================================== */

(function () {
  "use strict";

  function createQuiz(root, data, config) {
    const state = { index: -1, answers: [] };

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
      if (focusTarget) focusTarget.focus({ preventScroll: true });
    }

    function renderIntro() {
      mount(
        el("div", { class: "quiz__screen quiz__intro" }, [
          el("p", { text: data.intro.text }),
          el("button", {
            class: "btn",
            type: "button",
            text: data.intro.button,
            on: { click: () => { track("quiz_start"); goTo(0); } },
          }),
        ])
      );
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

      const back = el("button", {
        class: "btn btn--outline",
        type: "button",
        text: "Voltar",
        on: { click: () => goTo(state.index - 1) },
      });
      if (state.index === 0) back.disabled = true;

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
          el("div", { class: "quiz__nav" }, [back]),
        ]),
        heading
      );
    }

    function choose(optionIndex) {
      state.answers[state.index] = optionIndex;
      const q = data.questions[state.index];
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

    function whatsappLink(result) {
      const summary = data.questions
        .map((q, i) => `• ${q.question} ${q.options[state.answers[i]].label}`)
        .join("\n");
      const message = `${config.whatsappIntro} *${result.title}*\n\n${summary}`;
      return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;
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
              href: whatsappLink(result),
              target: "_blank",
              rel: "noopener",
              text: "Agendar pelo WhatsApp",
              on: { click: () => track("whatsapp_click", { result: key }) },
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

    renderIntro();
  }

  document.querySelectorAll("[data-quiz]").forEach((root) => {
    createQuiz(root, window.QUIZ_DATA, window.SITE_CONFIG || {});
  });
})();
