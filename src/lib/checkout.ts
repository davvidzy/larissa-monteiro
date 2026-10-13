import { checkout } from "../config/site";
import { track } from "./analytics";

export type CheckoutTarget = "start" | "complete" | "upgrade";

/** Acrescenta à URL de checkout os parâmetros de campanha da página atual. */
function withQueryParams(url: string) {
  if (!checkout.forwardQueryParams || !window.location.search) return url;
  const target = new URL(url, window.location.href);
  new URLSearchParams(window.location.search).forEach((value, key) => {
    if (!target.searchParams.has(key)) target.searchParams.set(key, value);
  });
  return target.toString();
}

export function goToCheckout(target: CheckoutTarget, value: number) {
  const url = checkout[target];

  if (!url) {
    console.warn(`[checkout] URL de "${target}" não configurada em src/config/site.ts`);
    return;
  }

  track("begin_checkout", { plan: target, value, currency: "BRL" });
  window.location.href = withQueryParams(url);
}
