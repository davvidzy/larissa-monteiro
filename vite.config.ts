import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Duas páginas:
//  /         → quiz de qualificação (index.html + pasta quiz/)
//  /oferta/  → landing page de vendas em React (oferta/index.html + src/)
export default defineConfig({
  // Caminhos relativos no build: o site funciona na raiz do domínio ou em subpasta
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      input: {
        quiz: "index.html",
        oferta: "oferta/index.html",
      },
    },
  },
});
