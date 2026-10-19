import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// No build a página já vem pré-renderizada (scripts/prerender.mjs): só "ativa" o HTML.
// Em `npm run dev` o HTML vem vazio e o React renderiza do zero.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
