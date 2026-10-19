import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Pré-carrega as fontes usadas acima da dobra de cada página, para o texto
 * aparecer já com a fonte da marca. Os arquivos têm hash no nome, então o
 * <link rel="preload"> é injetado no build, a partir do bundle gerado.
 */
const PRELOAD_FONTS: Record<string, RegExp[]> = {
  "/index.html": [/dm-sans-latin-400-normal-[^/]+\.woff2$/, /dm-sans-latin-700-normal-[^/]+\.woff2$/],
  "/oferta/index.html": [/cormorant-garamond-latin-700-normal-[^/]+\.woff2$/, /dm-sans-latin-400-normal-[^/]+\.woff2$/],
};

function preloadFonts(): Plugin {
  return {
    name: "bellash:preload-fonts",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(_html, ctx) {
        const patterns = PRELOAD_FONTS[ctx.path];
        if (!ctx.bundle || !patterns) return;
        // Caminho relativo da página até a raiz do site (base "./")
        const depth = ctx.path.split("/").length - 2;
        const prefix = depth > 0 ? "../".repeat(depth) : "./";
        return Object.keys(ctx.bundle)
          .filter((file) => patterns.some((re) => re.test(file)))
          .map((file) => ({
            tag: "link",
            attrs: { rel: "preload", as: "font", type: "font/woff2", href: prefix + file, crossorigin: "" },
            injectTo: "head-prepend" as const,
          }));
      },
    },
  };
}

// Duas páginas:
//  /         → quiz de qualificação (index.html + pasta quiz/)
//  /oferta/  → landing page de vendas em React (oferta/index.html + src/), pré-renderizada
export default defineConfig(({ isSsrBuild }) => ({
  // Caminhos relativos no build: o site funciona na raiz do domínio ou em subpasta
  base: "./",
  plugins: [react(), tailwindcss(), preloadFonts()],
  // O build SSR (só para pré-renderizar) usa src/entry-server.tsx como entrada
  build: isSsrBuild
    ? {}
    : {
        rolldownOptions: {
          input: {
            quiz: "index.html",
            oferta: "oferta/index.html",
          },
        },
      },
}));
