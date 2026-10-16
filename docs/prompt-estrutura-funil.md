# PROMPT — Pré-estrutura de funil Quiz → Landing → Checkout

> Cole este prompt no início de um novo projeto e preencha as variáveis `{{…}}`.
> Ele define **método, arquitetura da informação, estrutura técnica, tracking e critérios de qualidade**.
> Identidade visual (cores, fontes, logo, tom) vem de um **design system separado**, informado em `{{DESIGN_SYSTEM}}`; este prompt não decide nada visual.

---

## 0. Contexto do projeto (preencher)

| Variável | Descrição |
|---|---|
| `{{MARCA}}` | Nome da marca e, se houver, da pessoa/persona que apresenta |
| `{{PRODUTO_PRINCIPAL}}` | Produto que a página deve vender (nome, preço, parcelamento real) |
| `{{PRODUTO_ENTRADA}}` | Oferta de menor valor, se existir (nome, preço) |
| `{{UPGRADE}}` | Condição especial oferecida a quem escolhe a entrada (preço que **substitui**, não soma) |
| `{{PUBLICO}}` | Quem é a visitante e em que momento ela está |
| `{{CHECKOUT}}` | Plataforma de pagamento e URLs de cada oferta |
| `{{PIXEL_ID}}` | ID do Meta Pixel (e GA4/GTM, se houver) |
| `{{HOSPEDAGEM}}` | Onde o site será publicado |
| `{{DESIGN_SYSTEM}}` | Arquivo/tokens de design a seguir |
| `{{GARANTIA}}` | Política de garantia/reembolso **efetivamente aplicada** |

Se algum dado não for informado, **use placeholder visível e liste como pendência**. Nunca invente preço, prazo, depoimento, número de vendas, certificado ou resultado.

---

## 1. Método de construção (fases, nesta ordem)

1. **Briefing** — confirmar objetivo de conversão, ofertas, preços reais, regras comerciais (o que expira, o que é garantido) e o que já existe de mídia/prova social.
2. **Arquitetura da informação** — definir o funil (seção 2), as telas do quiz (seção 3) e a ordem das seções da landing (seção 4) **antes** de qualquer código.
3. **Fundação técnica** — estrutura de pastas (seção 5), configuração centralizada (seção 6), build e deploy funcionando com página mínima.
4. **Construção mobile-first** — desenvolver primeiro em 375 px; depois 320/360/390/430; por fim 768/1024/1440. Uma seção por componente.
5. **Conteúdo** — todos os textos, preços, links e mídias vêm da configuração, nunca soltos nos componentes.
6. **Tracking** — eventos por etapa (seção 7), testados com envio externo bloqueado antes de ir ao ar.
7. **Mídia** — otimizar imagens e vídeo (seção 8) antes de publicar.
8. **QA e aceitação** — checklist da seção 11, com testes automatizados de navegador.
9. **Deploy** — pipeline da seção 9.
10. **Pós-lançamento** — validar eventos reais no gerenciador do Meta, acompanhar diagnósticos e iterar a copy com base em dados.

Regra de trabalho: **uma mudança por vez, testada e versionada** (commit descritivo por ajuste).

---

## 2. Arquitetura do funil

```
Anúncio (UTMs)
   │
   ▼
/            QUIZ DE QUALIFICAÇÃO   — gera identificação; SEM preços
   │  (UTMs + resultado repassados na URL)
   ▼
/oferta/     LANDING DE VENDAS      — apresenta oferta, preços e prova
   │  ├─ escolhe PRODUTO_PRINCIPAL ─────────────► checkout principal
   │  └─ escolhe PRODUTO_ENTRADA ─► POPUP UPGRADE ┬► aceita  → checkout upgrade
   │                                              └► recusa  → checkout entrada
   ▼
CHECKOUT EXTERNO                    — confirma pagamento e dispara a compra
```

Princípios:
- **Quiz não vende**: nenhum preço, plano, desconto, checkout ou popup no quiz.
- **Landing vende**: toda informação comercial fica aqui.
- **Parâmetros de campanha** (`utm_*`, `fbclid`, `gclid`) são preservados do anúncio até o checkout.
- O **popup de upgrade** só abre por ação da visitante no plano de entrada; nunca automaticamente.

---

## 3. Arquitetura do quiz

| Tela | Conteúdo | Objetivo |
|---|---|---|
| Inicial | Selo curto, headline-pergunta sobre a dor/desejo, subtítulo com nº de perguntas, CTA, microcopy ("Gratuito • ~1 minuto") | Compromisso pequeno |
| Pergunta 1 — Desejo | O que motiva a pessoa | Identificação |
| Pergunta 2 — Momento | Em que estágio está | Segmentação |
| Pergunta 3 — Obstáculo | O que impede o primeiro passo | **Define o resultado** |
| Pergunta 4 — Interesse | O que quer entender primeiro | Aquecimento |
| Pergunta 5 — Próximo passo | Abertura para um guia/solução | Micro-sim |
| Transição | "Organizando…" (~1 s), animação discreta, sem % fictícia | Expectativa |
| Resultado | Título e descrição personalizados pela pergunta-chave | Relevância |
| Bloco do produto | Nome, descrição curta, 3 benefícios, CTA para a landing | Ponte para a oferta |

Regras de UX:
- Uma pergunta por tela, **no máximo 4 opções**, cards grandes (≥ 56 px de altura).
- **Avanço automático** após o toque (pausa ~200 ms para mostrar a seleção).
- **Voltar** funcional preservando as respostas; na 1ª pergunta volta para a tela inicial.
- Barra de progresso discreta + "Pergunta X de N".
- Foco movido para o título de cada etapa (acessibilidade) e scroll ao topo.
- Resultado definido por regra explícita na configuração (ex.: `defineResult: true` na pergunta-chave).
- Sem diagnósticos de aptidão, pontuações inventadas ou promessas de ganho.

---

## 4. Arquitetura da landing (ordem das seções)

| # | Seção | Função | Regras |
|---|---|---|---|
| 1 | Header | Marca + CTA "comprar" que rola até os planos | Compacto (~64 px), sem menu |
| 2 | Hero | Selo, headline (3–4 linhas no mobile), subtítulo com a oferta, CTA, 3 indicadores curtos | Headline com destaque visual em um trecho |
| 3 | Vídeo (VSL) | Apresentação do produto | Ver seção 8 |
| 4 | Quem apresenta | Foto + nome + papel + descrição curta | Nunca atribuir credenciais não comprovadas |
| 5 | Prova social | Depoimentos reais em carrossel com indicadores | Só com autorização; ocultável por configuração |
| 6 | O que tem dentro | 4 cards (ícone, título, descrição ≤ 3 linhas) | Grid 1 col mobile / 2 col desktop |
| 7 | Bônus | Cards com imagem, título, descrição, selo "incluso" | Valor de referência riscado **só se for real** |
| 7b | Urgência | Barra de prazo + resumo "de/por" | **Só com promoção real** e regra de expiração cumprida |
| 8 | Planos | Entrada (discreto) → Principal (destaque); preço, parcelamento, itens, bônus detalhados, CTA, garantia | Sem tabela comparativa extensa |
| 8b | Popup de upgrade | Oferta especial ao escolher a entrada | Ver seção 2 |
| 9 | FAQ | Até 10 perguntas, uma aberta por vez | Sem duplicidade; respostas curtas |
| 10 | Footer | Marca, links legais (privacidade, termos, contato), direitos | Sem dados jurídicos inventados |

Alternância de fundo entre seções (claro / tom suave) para ritmo de leitura. Espaçamento vertical consistente entre seções.

---

## 5. Stack e estrutura de pastas

Stack: **Vite (multi-page) + React + TypeScript + Tailwind CSS + ícones lineares (Lucide)**. Quiz pode ser HTML/CSS/JS leve; landing em React. Sem bibliotecas pesadas.

```
.
├── index.html                  # Quiz (página inicial)
├── quiz/
│   ├── css/                    # Estilos do quiz
│   └── js/
│       ├── index.js            # Entrada (importa os demais na ordem)
│       ├── config.js           # Destino do CTA final, debug
│       ├── quiz-data.js        # Telas, perguntas, resultados, bloco do produto
│       ├── quiz.js             # Motor do quiz (não contém conteúdo)
│       └── main.js             # Tracking do quiz
├── oferta/index.html           # Entrada HTML da landing (SEO, OG, pixel)
├── src/                        # Código da landing
│   ├── config/site.ts          # ← TODO conteúdo editável
│   ├── components/sections/    # Uma seção por arquivo, na ordem do App
│   ├── components/ui/          # Button, Container, Section, Picture, Player...
│   ├── hooks/                  # useCountdown etc.
│   ├── lib/analytics.ts        # track() → GA4/GTM/Meta
│   ├── lib/checkout.ts         # Redireciona ao checkout repassando UTMs
│   ├── lib/format.ts           # Preço em BRL, cálculos sem erro de float
│   └── index.css               # Tokens do design system
├── public/                     # Copiado sem processamento
│   ├── img/                    # Imagens otimizadas (WebP, várias larguras)
│   ├── video/                  # VSL (webm + mp4 + poster)
│   ├── .htaccess, robots.txt, sitemap.xml, site.webmanifest, favicon, 404.html
├── images-src/                 # Originais (PNG/JPG) para o script de imagens
├── scripts/optimize-images.mjs # Converte images-src → public/img (WebP)
├── design-system/              # Fonte da verdade da marca (externa a este prompt)
├── docs/                       # Prompts e documentação do projeto
└── .github/workflows/deploy.yml
```

Configuração do build: `base: "./"` (caminhos relativos; funciona na raiz ou em subpasta) e duas entradas (`index.html`, `oferta/index.html`).

---

## 6. Configuração centralizada (`src/config/site.ts`)

Os componentes **só leem** daqui. Blocos obrigatórios:

- `brand` — nome, persona, logos, links legais.
- `images` — imagens responsivas `{ src, srcSet, width, height, alt }`.
- `video` — `sources[]` (ordem de preferência), `poster`, legenda.
- `testimonials` — `enabled`, itens `{ name, subtitle, quote, avatar, print }`.
- `features` — cards "o que tem dentro".
- `bonuses` — `showReferencePrices`, itens `{ title, description, referencePrice?, image }`.
- `promo` — `active`, `endsAt` **ou** `durationSeconds` (persistido), mensagens ativa/inativa.
- `plans` — `{ id, name, price, installments?, tag, items, bonuses?, cta, featured }`.
- `upgrade` — preço especial (substitui o da entrada).
- `guarantee` — texto da garantia real.
- `checkout` — URL por oferta + `forwardQueryParams`.
- `faq` — perguntas/respostas; valores monetários **lidos de `plans`**, nunca digitados de novo.

Valores derivados (somas, economia, total parcelado) são **calculados**, nunca escritos à mão.

---

## 7. Tracking por etapa (Meta Pixel + GA4/GTM)

Instalar o snippet do pixel `{{PIXEL_ID}}` no `<head>` de **todas** as páginas do funil (`<noscript>` logo após `<body>`). Uma função `track(evento, params)` envia para GA4 (`gtag`) **ou** GTM (`dataLayer`) e para o Meta (`fbq`). Sem ferramenta instalada, não envia nada.

| Etapa | Evento interno | Meta | Parâmetros |
|---|---|---|---|
| Qualquer página | `page_view` | `PageView` (pelo snippet base — não duplicar) | — |
| Quiz: iniciou | `quiz_start` | custom | — |
| Quiz: respondeu | `quiz_question_answered` | custom | `question`, `question_number`, `answer` |
| Quiz: terminou | `quiz_completed` | custom | `result` |
| Quiz: viu resultado | `quiz_result_viewed` | custom | `result` |
| Quiz: clicou no CTA | `quiz_cta_clicked` | custom | `result` |
| Landing: chegou | `landing_page_viewed` | custom (ou `ViewContent`) | `from_quiz`, `quiz_result` |
| Landing: deu play | `video_play` | custom | (1× por visita) |
| Landing: viu planos | `view_plans` | custom | (1× via IntersectionObserver) |
| Landing: escolheu entrada | `select_start` | custom | `value`, `currency` |
| Landing: escolheu principal | `select_complete` | custom | `value`, `currency` |
| Popup: abriu | `upgrade_popup_open` | custom | — |
| Popup: aceitou / recusou | `upgrade_accept` / `upgrade_decline` | custom | `value`, `currency` |
| Indo ao checkout | `begin_checkout` | **`InitiateCheckout`** | `value`, `currency`, `plan` |
| Pagamento aprovado | — (fora do site) | **`Purchase`** | **`value`, `currency`** (obrigatórios) |

Regras:
- **Nunca** disparar `Purchase`/conversão no site ou no fim do quiz. A compra vem do **checkout** (pixel/API de Conversões da plataforma), com `value` e `currency`.
- Se usar API de Conversões no servidor, deduplicar com `event_id` igual ao do navegador.
- Repassar UTMs e `fbclid` até o checkout para atribuição.
- Testar com requisições ao Facebook **bloqueadas** (lendo a fila `fbq.queue`) para não sujar os dados; validar em produção com "Testar eventos" do Gerenciador.
- Token de acesso da API de Conversões **nunca** em código, chat ou repositório.
- LGPD: política de privacidade citando o pixel; idealmente aviso de cookies com consentimento antes de carregar o pixel.

---

## 8. Mídia

**Imagens**
- Originais em `images-src/`; script gera WebP em 2 larguras (ex.: 400/800) para `srcset`.
- Sempre `width`/`height` (evita layout shift) e `loading="lazy"` abaixo da dobra.
- Avatares: recorte quadrado centrado no rosto, ~144 px.
- Prints (depoimentos): **conteúdo intacto**; só converter/redimensionar. Cantos com pixels brancos de print → esconder com borda arredondada via CSS, não editar a imagem.

**Vídeo (VSL vertical 9:16)**
- Converter para 720×1280: **WebM (VP9)** + **MP4 (H.264, faststart)**, ~1 Mbps em duas passagens; `poster` WebP de um frame representativo (evitar frame preto inicial).
- Player próprio: inicia pausado com capa; toque na tela toca/pausa; exibe tempo assistido e restante; barra **somente leitura**; bloqueia avanço (estado "maior ponto assistido"), menu de contexto, PiP e download; permite voltar; botão de replay no fim.
- Se o arquivo final passar de ~20 MB, considerar hospedagem externa de vídeo.

---

## 9. Deploy

- Repositório Git com `main` como fonte.
- GitHub Action: a cada push na `main` → `npm ci` → `npm run build` → publica `dist/` numa branch **`deploy`** (só o site pronto).
- Hospedagem puxa a branch `deploy` (diretório de instalação na raiz do `public_html`), com auto-deploy por webhook.
- `.htaccess`: `ErrorDocument 404`, HTTPS forçado, compressão, tipos `webp/webm/mp4/webmanifest`, cache longo para arquivos com hash e `no-cache` para HTML.
- Abrir o HTML de entrada direto do disco **não funciona** (entradas do Vite) — usar `npm run dev`.

---

## 10. Regras comerciais, legais e de anúncio

- **Preço riscado / "de–por"**: só com valor de referência real (CDC art. 37).
- **Parcelamento**: condições idênticas às do checkout; o total com juros deve estar acessível à consumidora (na página ou no checkout — CDC art. 52).
- **Urgência/cronômetro**: só com promoção real; ao expirar, a condição precisa de fato mudar. Prazo persistido (não reinicia ao recarregar).
- **Depoimentos**: apenas reais, com autorização de nome, foto e conversa. Nunca fotos de bancos/redes de terceiros.
- **Sem promessa de renda/ganho** nem de habilitação profissional/certificação (políticas do Meta e CDC).
- **Garantia/reembolso**: informar exatamente a política aplicada.
- **Funcionalidades**: não anunciar recurso que ainda não está disponível para quem compra.
- Popup de upgrade: preço **substitui** o da entrada; deixar a economia explícita e verdadeira.

---

## 11. QA e critérios de aceitação

Testar com navegador automatizado (ex.: Playwright) servindo o `dist/` como servidor estático com suporte a Range:

- [ ] Sem scroll horizontal em 320, 360, 375, 390, 430, 768, 1024 e 1440 px.
- [ ] Quiz: N perguntas exatas, nenhum preço em nenhuma tela, resultado muda pela pergunta-chave, Voltar preserva respostas, CTA leva à landing com UTMs.
- [ ] Landing: preços corretos, popup só ao escolher a entrada, cada botão leva à URL de checkout correta.
- [ ] Funciona com o site na raiz **e** em subpasta.
- [ ] Todos os eventos da seção 7 disparam na ordem esperada; nenhum evento de compra no site.
- [ ] Imagens e vídeo carregam; vídeo não permite avançar.
- [ ] Acessibilidade: foco visível, áreas de toque ≥ 44 px, `alt` descritivo, `prefers-reduced-motion` respeitado, modal com foco preso e Esc.
- [ ] Nenhum erro de JavaScript no console.
- [ ] Build e checagem de tipos sem erros.

---

## 12. Checklist de pré-lançamento

- [ ] Domínio real em canonical, Open Graph, `robots.txt` e `sitemap.xml`.
- [ ] Imagem de compartilhamento (1200×630).
- [ ] URLs de checkout reais em todas as ofertas.
- [ ] Links de Privacidade, Termos e Contato funcionando.
- [ ] Pixel validado com "Testar eventos"; `Purchase` chegando do checkout **com valor**.
- [ ] Flags de debug desligadas.
- [ ] Depoimentos, vídeo e bônus com arquivos reais (ou seções ocultas).
- [ ] Promoções/urgências desligadas se não houver regra real.

---

## 13. Formato de entrega esperado

1. Antes de codar: apresentar a **arquitetura** (funil, telas do quiz, ordem da landing) e a lista de **pendências** de conteúdo.
2. Implementar fase a fase, informando ao fim de cada uma o que foi feito, o que foi testado e o que ficou pendente.
3. Sinalizar qualquer pedido que conflite com a seção 10 e propor alternativa equivalente que seja verdadeira.
4. Manter README atualizado com comandos, estrutura, deploy e como editar conteúdo/mídia.
