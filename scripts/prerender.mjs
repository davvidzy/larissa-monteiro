/**
 * Pré-renderiza a landing: injeta o HTML do React em dist/oferta/index.html.
 * Roda depois de `vite build` (cliente) e `vite build --ssr` (gera dist-ssr/).
 */
import { readFile, writeFile, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const ssrEntry = path.resolve("dist-ssr/entry-server.js");
const htmlPath = path.resolve("dist/oferta/index.html");

const { render } = await import(pathToFileURL(ssrEntry).href);
const appHtml = render();

const html = await readFile(htmlPath, "utf8");
const placeholder = '<div id="root"></div>';
if (!html.includes(placeholder)) throw new Error(`"${placeholder}" não encontrado em ${htmlPath}`);

await writeFile(htmlPath, html.replace(placeholder, `<div id="root">${appHtml}</div>`));
await rm("dist-ssr", { recursive: true, force: true });

console.log(`pré-renderizado: dist/oferta/index.html (+${(appHtml.length / 1024).toFixed(0)} KB de HTML)`);
