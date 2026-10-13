/* ==========================================================================
   main.js — comportamentos gerais da página
   ========================================================================== */

(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};

  /**
   * Rastreamento de eventos (mesma lógica da landing, src/lib/analytics.ts).
   * GA4 via gtag, ou Google Tag Manager via dataLayer, e Meta Pixel como evento
   * personalizado. Nenhum evento do quiz é enviado como conversão de compra.
   */
  function track(name, params) {
    params = params || {};
    if (typeof window.gtag === "function") window.gtag("event", name, params);
    else if (Array.isArray(window.dataLayer)) window.dataLayer.push(Object.assign({ event: name }, params));
    if (typeof window.fbq === "function") window.fbq("trackCustom", name, params);
    if (config.debug) console.info("[track]", name, params);
  }

  window.Site = { track: track };

  // Ano atual no rodapé
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  // Cliques em elementos com data-track="nome_do_evento"
  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-track]");
    if (target) track(target.dataset.track);
  });
})();
