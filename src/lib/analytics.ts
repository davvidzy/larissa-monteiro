/* ==========================================================================
   Rastreamento de eventos (GA4 / Google Tag Manager / Meta Pixel).

   Não envia nada se nenhuma ferramenta estiver instalada no index.html.
   Instale o snippet oficial do GA4 (gtag) ou do GTM e/ou do Meta Pixel e
   os eventos abaixo passam a ser enviados automaticamente.
   ========================================================================== */

export type AnalyticsEvent =
  | "page_view"
  | "landing_page_viewed"
  | "video_play"
  | "view_plans"
  | "select_start"
  | "select_complete"
  | "upgrade_popup_open"
  | "upgrade_accept"
  | "upgrade_decline"
  | "begin_checkout";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Equivalentes nos eventos padrão do Meta. Os demais vão como trackCustom. */
const META_STANDARD: Partial<Record<AnalyticsEvent, string>> = {
  begin_checkout: "InitiateCheckout",
};

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (import.meta.env.DEV) console.info("[track]", event, params);

  // GA4: o gtag já registra page_view sozinho ao carregar; não duplicar.
  if (typeof window.gtag === "function") {
    if (event !== "page_view") window.gtag("event", event, params);
  } else if (Array.isArray(window.dataLayer)) {
    // Google Tag Manager: o container decide o que fazer com cada evento.
    window.dataLayer.push({ event, ...params });
  }

  // Meta Pixel: o snippet base já envia PageView.
  if (typeof window.fbq === "function" && event !== "page_view") {
    const standard = META_STANDARD[event];
    if (standard) window.fbq("track", standard, params);
    else window.fbq("trackCustom", event, params);
  }
}
