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
/* Vídeo VSL (formato Reels 9:16)                                             */
/* Fontes em ordem de preferência: o navegador usa a primeira que suportar   */
/* (WebM no Chrome/Android, MP4 no Safari/iPhone). Lista vazia = placeholder. */
/* Para gerar a partir de um MP4 novo, veja "Vídeo" no README.                */
/* -------------------------------------------------------------------------- */

export const video = {
  sources: [
    { src: asset("video/vsl.webm"), type: "video/webm" },
    { src: asset("video/vsl.mp4"), type: "video/mp4" },
  ],
  poster: asset("video/vsl-poster.webp"),
  caption: "Veja como o material foi organizado para facilitar seus primeiros estudos.",
};

/* -------------------------------------------------------------------------- */
/* Depoimentos                                                                */
/* Use apenas depoimentos reais e autorizados (nome, foto e conversa).        */
/* Imagens em public/img/depoimentos/: avatar-N.webp e print-N-{720,1080}.webp */
/* `purchased` é texto fixo — atualize manualmente quando quiser.             */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
  name: string;
  purchased: string;
  /** Transcrição da mensagem da cliente (texto alternativo do print). */
  quote: string;
  avatar: string;
  print: ResponsiveImage;
};

/** Monta os caminhos das imagens do depoimento N. */
function testimonial(n: number, name: string, purchased: string, quote: string, height720: number): Testimonial {
  const dir = "img/depoimentos/";
  return {
    name,
    purchased,
    quote,
    avatar: asset(`${dir}avatar-${n}.webp`),
    print: {
      src: asset(`${dir}print-${n}-720.webp`),
      srcSet: `${asset(`${dir}print-${n}-720.webp`)} 720w, ${asset(`${dir}print-${n}-1080.webp`)} 1080w`,
      width: 720,
      height: height720,
      alt: `Print de conversa no WhatsApp. ${name} escreveu: “${quote}”`,
    },
  };
}

export const testimonials = {
  enabled: true,
  items: [
    testimonial(1, "Juliana Ferreira", "Comprou há 7 dias",
      "vou ser sincera, fiquei meio receiosa de comprar pq já peguei uns pdf na internet que não explicava quase nada rsrs. mas achei esse bem completinho pra quem ta começando, gostei da parte dos materiais e das ideias de posts tbm", 631),
    testimonial(2, "Camila Rodrigues", "Comprou há 23 dias",
      "Gostei do kit. O material é fácil de entender e os 30 mapeamentos ajudam bastante a visualizar os diferentes estilos. Achei bem organizado.", 525),
    testimonial(3, "Patrícia Almeida", "Comprou há 12 dias",
      "Boa tarde! Gostaria de deixar meu feedback. Gostei da organização do material e da facilidade para acessar os conteúdos pelo celular. A calculadora de precificação foi um dos recursos que achei mais interessantes. Obrigada.", 525),
    testimonial(4, "Amanda Martins", "Comprou há 38 dias",
      "mds eu tava muito perdida kkkkk não sabia nem quais materiais pesquisar primeiro o kit me ajudou mto a organizar tudo, principalmente os mapeamentos. agr sei oq preciso estudar primeiro", 525),
    testimonial(5, "Gabriela Oliveira", "Comprou há 4 dias",
      "MENINAAAAA eu ameeeeeiii!!! tava achando q ia receber só uma apostilinha kkkkk mas tem as ferramentas tbmm!!! o checklist é perfeitoo pra mim que sou toda desorganizada", 525),
  ],
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
  description?: string;
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
    {
      title: "Calculadora de Precificação",
      description: "Calcule custos e simule preços.",
      referencePrice: 49.9,
      image: null,
    },
    {
      title: "Checklist Lash Iniciante",
      description: "Organize seus estudos e acompanhe seu progresso.",
      referencePrice: 22.9,
      image: null,
    },
    {
      title: "Ficha de Anamnese Digital",
      description: "Preencha e exporte fichas em PDF.",
      referencePrice: 25.9,
      image: null,
    },
    {
      title: "50 Ideias de Posts",
      description: "Sugestões para planejar sua divulgação.",
      referencePrice: 39.9,
      image: null,
    },
    {
      title: "Guia Pós-Procedimento",
      description: "Orientações sobre cuidados com extensões.",
      referencePrice: 30.9,
      image: null,
    },
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
  /**
   * Parcelamento exibido abaixo do preço à vista (no lugar de "Pagamento único").
   * Use exatamente as condições do checkout (Wiapy), que informa o total com juros.
   */
  installments?: { count: number; value: number };
  /** Frase entre aspas abaixo do preço. */
  quote?: string;
  /** Bônus detalhados no card (apenas no Completo). Já incluídos em `price`. */
  bonuses?: { title: string; description: string }[];
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
    installments: { count: 9, value: 5.49 },
    quote: "Com um único atendimento, você paga isso e ainda sobra.",
    tag: "Mais completo",
    items: [
      "Manual ilustrado completo",
      "30 mapeamentos",
      "Materiais e fundamentos",
      "Precificação e divulgação",
    ],
    bonuses: [
      { title: "Calculadora de Precificação Lash", description: "calcule custos, simule preços e margens." },
      { title: "Checklist da Lash Iniciante", description: "organize seus estudos e acompanhe seu progresso." },
      { title: "Ficha de Consulta e Anamnese Digital", description: "preencha formulários e exporte em PDF." },
      { title: "50 Ideias de Posts para Instagram", description: "sugestões prontas para planejar sua divulgação." },
      { title: "Guia de Cuidados Pós-Procedimento", description: "orientações de cuidados e higiene das extensões." },
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
  start: "https://pay.wiapy.com/KytL3lE3h2-",
  complete: "https://pay.wiapy.com/6c9YE1ry9Bqr",
  upgrade: "https://pay.wiapy.com/NETzvueZdZI", // Kit Completo pelo preço especial do popup
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
    question: "Preciso instalar aplicativo?",
    answer: "Não. O portal funciona pelo navegador.",
  },
  {
    question: "Como recebo o material?",
    answer: "O acesso é digital, disponibilizado após a confirmação do pagamento.",
  },
  {
    question: "Recebo PDFs?",
    answer:
      "Sim. Os materiais de leitura são disponibilizados em PDF e as ferramentas funcionam dentro do portal.",
  },
  {
    question: "O pagamento é mensal?",
    answer: "Não. É uma compra única.",
  },
  {
    question: "Recebo certificado profissional?",
    answer: "Não. O kit é educativo e não substitui formação prática supervisionada.",
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
