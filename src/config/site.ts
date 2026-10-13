/* ==========================================================================
   Configuração central da landing page.
   Tudo o que muda com frequência (textos de oferta, preços, links, mídia)
   fica aqui — os componentes apenas leem estes valores.
   ========================================================================== */

import type { LucideIcon } from "lucide-react";
import { BookOpen, Eye, GraduationCap, Users } from "lucide-react";

/**
 * Caminho de um arquivo de public/ visto da landing.
 * A landing fica sempre em <raiz do site>/oferta/, então public/ está um nível acima.
 * Relativo de propósito: funciona com o site na raiz do domínio ou em subpasta.
 */
const asset = (path: string) => `../${path}`;

/* -------------------------------------------------------------------------- */
/* Marca                                                                      */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "Bellash Academy",
  tagline: "Seu primeiro passo no universo Lash.",
  presenter: {
    name: "Larissa Monteiro",
    role: "Apresentadora virtual da Bellash Academy",
  },
  logo: {
    horizontal: asset("img/logo.svg"),
    vertical: asset("img/logo-vertical.svg"),
    icon: asset("img/logo-icone.svg"),
  },
  // Preencha com as URLs reais antes de publicar
  links: {
    privacy: "#",
    terms: "#",
    contact: "#",
  },
};

/* -------------------------------------------------------------------------- */
/* Imagens                                                                    */
/* -------------------------------------------------------------------------- */

export type ResponsiveImage = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
};

export const images = {
  presenter: {
    src: asset("img/larissa-monteiro-800.webp"),
    srcSet: `${asset("img/larissa-monteiro-400.webp")} 400w, ${asset("img/larissa-monteiro-800.webp")} 800w`,
    width: 800,
    height: 1067,
    alt: "Larissa Monteiro, apresentadora virtual da Bellash Academy",
  } satisfies ResponsiveImage,
};

/* -------------------------------------------------------------------------- */
/* Vídeo do entregável (formato Reels 9:16)                                   */
/* Deixe `src` vazio para exibir o placeholder.                               */
/* -------------------------------------------------------------------------- */

export const video = {
  src: "",
  poster: "",
  caption: "Veja como o material foi organizado para facilitar seus primeiros estudos.",
};

/* -------------------------------------------------------------------------- */
/* Depoimentos                                                                */
/* Use apenas depoimentos reais e autorizados. `image: null` = placeholder.   */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
  label: string;
  image: ResponsiveImage | null;
};

export const testimonials = {
  enabled: true,
  items: [
    { label: "Depoimento 01", image: null },
    { label: "Depoimento 02", image: null },
    { label: "Depoimento 03", image: null },
  ] satisfies Testimonial[],
};

/* -------------------------------------------------------------------------- */
/* O que tem dentro                                                           */
/* -------------------------------------------------------------------------- */

export type Feature = { icon: LucideIcon; title: string; description: string };

export const features: Feature[] = [
  {
    icon: BookOpen,
    title: "Manual Lash do Zero",
    description: "Fundamentos, materiais, tipos de fios e conhecimentos essenciais para iniciantes.",
  },
  {
    icon: Eye,
    title: "30 Mapeamentos Ilustrados",
    description: "Conheça diferentes estilos e aprenda a interpretar seus desenhos.",
  },
  {
    icon: GraduationCap,
    title: "Preparação Profissional",
    description: "Entenda os caminhos de formação, segurança e organização antes de atender.",
  },
  {
    icon: Users,
    title: "Primeiras Clientes",
    description: "Aprenda conceitos de precificação e divulgação para sua futura atuação.",
  },
];

/* -------------------------------------------------------------------------- */
/* Bônus                                                                      */
/* Valores de referência só aparecem com `showReferencePrices: true`.         */
/* Ative apenas quando forem valores genuínos e justificáveis.                */
/* -------------------------------------------------------------------------- */

export type Bonus = {
  title: string;
  /**
   * Valor de referência exibido riscado ao lado de "GRÁTIS".
   * Use o preço pelo qual o material é (ou foi) realmente vendido avulso —
   * nunca um valor sorteado ou inventado (CDC, art. 37: publicidade enganosa).
   */
  referencePrice?: number;
  image: ResponsiveImage | null;
};

export const bonuses: { showReferencePrices: boolean; items: Bonus[] } = {
  /** Mostra os valores riscados (só os bônus que tiverem referencePrice). */
  showReferencePrices: true,
  items: [
    { title: "Tabela Inteligente de Precificação", image: null },
    { title: "Ficha de Consulta e Anamnese", image: null },
    { title: "Checklist da Lash Iniciante", image: null },
    { title: "50 Ideias de Posts para Instagram", image: null },
    { title: "Guia de Cuidados Pós-Procedimento", image: null },
  ],
};

/* -------------------------------------------------------------------------- */
/* Promoção com prazo                                                         */
/* Ative SOMENTE com uma promoção real, cuja regra de expiração seja          */
/* cumprida de verdade (ex.: o checkout deixa de aplicar a condição).         */
/*                                                                            */
/* Modos de prazo (use um):                                                   */
/*  - endsAt: data/hora fixa, igual para todas (ex.: "2026-10-31T23:59:59-03:00") */
/*  - durationSeconds: prazo individual a partir da 1ª visita, salvo no       */
/*    localStorage para não reiniciar ao recarregar a página.                 */
/* -------------------------------------------------------------------------- */

export const promo = {
  active: true,
  endsAt: "",
  durationSeconds: 4 * 3600 + 23 * 60 + 42, // 04:23:42
  storageKey: "bellash_promo_ends_at_v2",
  messages: {
    title: "PROMOÇÃO RELÂMPAGO",
    subtitle: "5 Bônus grátis até esse timer acabar",
    /** Exibida quando a promoção está desligada ou o prazo terminou. */
    inactive: "Os 5 bônus estão incluídos no Kit Completo.",
  },
};

/* -------------------------------------------------------------------------- */
/* Planos e preços                                                            */
/* -------------------------------------------------------------------------- */

export type PlanId = "start" | "complete";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  tag: string;
  items: string[];
  cta: string;
  featured: boolean;
};

export const plans: Plan[] = [
  {
    id: "start",
    name: "Guia Lash Start",
    price: 9.9,
    tag: "Para conhecer a área",
    items: [
      "Guia introdutório",
      "Materiais essenciais",
      "Tipos de fios e curvaturas",
      "5 mapeamentos ilustrados",
      "Primeiros passos de estudo",
    ],
    cta: "Quero começar pelo Start",
    featured: false,
  },
  {
    id: "complete",
    name: "Kit Lash do Zero Completo",
    price: 37.9,
    tag: "Mais completo",
    items: [
      "Manual ilustrado completo",
      "30 mapeamentos",
      "Materiais e fundamentos",
      "Precificação e divulgação",
      "5 bônus incluídos",
    ],
    cta: "Quero o kit completo",
    featured: true,
  },
];

/** Oferta exibida no popup ao escolher o Start. O valor substitui o do Start (não soma). */
export const upgrade = {
  price: 29.9,
};

/* -------------------------------------------------------------------------- */
/* Checkout                                                                   */
/* Cole as URLs reais da plataforma de pagamento (Hotmart, Kiwify etc.).      */
/* -------------------------------------------------------------------------- */

export const checkout = {
  start: "",
  complete: "",
  upgrade: "", // Kit Completo pelo preço especial do popup
  /** Repassa os parâmetros da URL (utm_*, fbclid, gclid...) para o checkout. */
  forwardQueryParams: true,
};

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const faq = [
  {
    question: "Preciso ter experiência?",
    answer: "Não. O material foi desenvolvido para iniciantes que desejam conhecer os fundamentos da área de cílios.",
  },
  {
    question: "Como recebo o material?",
    answer: "O acesso é digital, disponibilizado após a confirmação do pagamento.",
  },
  {
    question: "O pagamento é mensal?",
    answer: "Não. É uma compra única.",
  },
  {
    question: "Posso aprender a aplicar cílios somente com o PDF?",
    answer:
      "O material é educativo e ajuda na preparação inicial. Para realizar procedimentos com segurança, é necessário treinamento prático adequado.",
  },
  {
    question: "Qual é a diferença entre os planos?",
    answer:
      "O Start apresenta os fundamentos, enquanto o Completo oferece um manual mais aprofundado, 30 mapeamentos e cinco bônus.",
  },
];
