/* ==========================================================================
   main.js — comportamentos gerais da página
   ========================================================================== */

(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};

  /**
   * Rastreamento de eventos.
   * Envia para o dataLayer (Google Tag Manager / GA4) e para o Meta Pixel,
   * se estiverem instalados. Sem eles, apenas registra no console em modo debug.
   */
  function track(name, params) {
    params = params || {};
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, params));
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
