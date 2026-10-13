# Bellash Academy — Landing Page Kit Lash do Zero

Funil da Bellash Academy, apresentado por Larissa Monteiro (apresentadora virtual):

| URL        | Página                                                        | Arquivo de entrada   |
| ---------- | ------------------------------------------------------------- | -------------------- |
| `/`        | Quiz de qualificação (HTML/CSS/JS estático)                   | `index.html`         |
| `/oferta/` | Landing de vendas do Kit Lash do Zero (React + TS + Tailwind) | `oferta/index.html`  |

O resultado do quiz leva para `/oferta/#planos`, mantendo as UTMs e acrescentando `quiz_result`.

## Comandos

```bash
npm install        # instala as dependências
npm run dev        # servidor local com recarga automática
npm run build      # checa tipos e gera o site final em dist/
npm run preview    # serve o dist/ localmente
npm run images     # converte images-src/*.png|jpg em WebP (public/img/)
```

> Os arquivos `index.html` e `oferta/index.html` são entradas do Vite: abertos direto do disco, por Live Server ou publicados sem build, ficam sem estilo ou em branco. Para visualizar, use `npm run dev` e acesse `/` (quiz) ou `/oferta/`. O que vai para o ar é sempre o conteúdo de `dist/`.
>
> O build usa caminhos relativos (`base: "./"`), então o site funciona tanto na raiz do domínio quanto numa subpasta.

## Deploy (Hostinger)

A cada `git push` na `main`, o GitHub Action (`.github/workflows/deploy.yml`) roda o build e publica o conteúdo de `dist/` na branch **`deploy`**.

No hPanel → **Git**, configure o repositório com a branch **`deploy`** e o diretório de instalação **vazio** (raiz do `public_html`). Ative o deploy automático (webhook) para atualizar a cada push.

O `public/.htaccess` (copiado para o site) cuida da página 404, HTTPS, compressão e cache.

## Estrutura

```
index.html                 # Quiz (página inicial)
quiz/
  css/                     # Estilos do quiz
  js/quiz-data.js          # ← Perguntas, opções e resultados
  js/config.js             # ← Destino e texto do botão do resultado
oferta/index.html          # HTML base da landing (SEO, Open Graph, fontes)
src/                       # Código da landing
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
  robots.txt, sitemap.xml, site.webmanifest, favicon.svg, 404.html
images-src/                # Imagens originais (PNG/JPG) — fonte do `npm run images`
design-system/             # Fonte da verdade da marca (tokens JSON + logos originais)
```

## Antes de publicar

- [ ] **URLs de checkout** em `src/config/site.ts` → `checkout.start`, `checkout.complete`, `checkout.upgrade` (sem elas os botões de compra não redirecionam)
- [ ] Links de **Política de Privacidade, Termos de Uso e Contato** em `brand.links`
- [ ] Trocar `SEU-DOMINIO.com.br` em `index.html`, `oferta/index.html`, `public/robots.txt` e `public/sitemap.xml`
- [ ] Adicionar `public/img/og-image.jpg` (1200×630) para compartilhamento
- [ ] Instalar GA4/GTM e/ou Meta Pixel no `index.html` (os eventos já estão prontos)
- [ ] Decidir se a seção de depoimentos fica visível enquanto não houver depoimentos reais (`testimonials.enabled`)
- [ ] Mudar `debug` para `false` em `quiz/js/config.js`

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
