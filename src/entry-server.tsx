/**
 * Entrada de pré-renderização (usada só no build, por scripts/prerender.mjs).
 * Gera o HTML da landing para que ela apareça antes de o JavaScript carregar.
 */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
