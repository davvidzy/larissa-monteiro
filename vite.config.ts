import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Duas páginas:
//  /         → quiz de qualificação (index.html; scripts em public/quiz/assets)
//  /oferta/  → landing page de vendas em React (oferta/index.html)
export default defineConfig({
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
