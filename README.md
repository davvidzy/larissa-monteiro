# Bellash Academy — Landing Page Kit Lash do Zero

Landing page de vendas (React + TypeScript + Tailwind CSS + Lucide) do **Kit Lash do Zero Completo** e do **Guia Lash Start**, apresentados por Larissa Monteiro (apresentadora virtual). É o destino final do quiz de qualificação.

## Comandos

```bash
npm install        # instala as dependências
npm run dev        # servidor local com recarga automática
npm run build      # checa tipos e gera o site final em dist/
npm run preview    # serve o dist/ localmente
npm run images     # converte images-src/*.png|jpg em WebP (public/img/)
```

> O `index.html` da raiz é só a entrada do Vite (carrega `/src/main.tsx`) e fica **em branco** se aberto direto no navegador ou publicado sem build. Para visualizar, use `npm run dev`.

## Deploy (Hostinger)

A cada `git push` na `main`, o GitHub Action (`.github/workflows/deploy.yml`) roda o build e publica o conteúdo de `dist/` na branch **`deploy`**.

No hPanel → **Git**, configure o repositório com a branch **`deploy`** e o diretório de instalação **vazio** (raiz do `public_html`). Ative o deploy automático (webhook) para atualizar a cada push.

O `public/.htaccess` (copiado para o site) cuida da página 404, HTTPS, compressão e cache.

## Estrutura

```
index.html                 # HTML base da landing (SEO, Open Graph, fontes)
src/
  config/site.ts           # ← TUDO o que é editável: marca, imagens, vídeo,
                           #   depoimentos, bônus, preços, timer, checkout, FAQ
  components/sections/     # Uma seção da página por arquivo, na ordem do App.tsx
  components/ui/           # Componentes reutilizáveis (Button, Logo, Picture...)
  hooks/useCountdown.ts    # Timer promocional com prazo salvo no localStorage
  lib/analytics.ts         # Eventos para GA4 / GTM / Meta Pixel
  lib/checkout.ts          # Redirecionamento ao checkout (repassa UTMs)
  index.css                # Tokens da marca (cores, fontes, raios, sombras)
public/                    # Copiado como está para o site final
  img/                     # Logos e imagens otimizadas (WebP)
  quiz/                    # Quiz de qualificação (HTML/CSS/JS estático) → /quiz/
  robots.txt, sitemap.xml, site.webmanifest, favicon.svg, 404.html
images-src/                # Imagens originais (PNG/JPG) — fonte do `npm run images`
design-system/             # Fonte da verdade da marca (tokens JSON + logos originais)
```

## Antes de publicar

- [ ] **URLs de checkout** em `src/config/site.ts` → `checkout.start`, `checkout.complete`, `checkout.upgrade` (sem elas os botões de compra não redirecionam)
- [ ] Links de **Política de Privacidade, Termos de Uso e Contato** em `brand.links`
- [ ] Trocar `SEU-DOMINIO.com.br` em `index.html`, `public/robots.txt`, `public/sitemap.xml` e `public/quiz/index.html`
- [ ] Adicionar `public/img/og-image.jpg` (1200×630) para compartilhamento
- [ ] Instalar GA4/GTM e/ou Meta Pixel no `index.html` (os eventos já estão prontos)
- [ ] Decidir se a seção de depoimentos fica visível enquanto não houver depoimentos reais (`testimonials.enabled`)
- [ ] Mudar `debug` para `false` em `public/quiz/assets/js/config.js`

## Como adicionar mídia

- **Fotos/mockups:** coloque o PNG/JPG em `images-src/`, rode `npm run images` e referencie os arquivos gerados (`/img/<nome>-400.webp` e `-800.webp`) em `src/config/site.ts`, seguindo o exemplo de `images.presenter`.
- **Vídeo:** preencha `video.src` (e opcionalmente `video.poster`). Vazio = placeholder.
- **Depoimentos e bônus:** troque `image: null` pelo objeto da imagem.

## Regras comerciais (honestidade da oferta)

- **Timer:** só aparece com `promo.active: true`. Use apenas com uma promoção real. Com `endsAt` o prazo é igual para todas; com `durationSeconds` é individual e salvo no navegador. Ao expirar, a mensagem promocional some e volta o texto padrão — garanta que o checkout também deixe de aplicar a condição.
- **Valores de referência dos bônus:** ocultos por padrão (`bonuses.showReferencePrices: false`). Ative só se forem valores genuínos.
- **Upgrade:** o preço do popup (R$ 29,90) substitui o do Start; não soma.

## Eventos rastreados

`page_view`, `video_play`, `view_plans`, `select_start`, `select_complete`, `upgrade_popup_open`, `upgrade_accept`, `upgrade_decline`, `begin_checkout` (enviado ao Meta como `InitiateCheckout`). Nada é enviado se nenhuma ferramenta estiver instalada. Em `npm run dev`, os eventos aparecem no console.
