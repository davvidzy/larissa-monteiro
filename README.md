# Bellash Academy — Larissa Monteiro

Site estático (HTML, CSS e JS puros, sem build) com quiz que recomenda um estilo de cílios e leva ao WhatsApp.

O visual segue o design system em `design-system/bellash_academy_design_system.json`; os tokens estão traduzidos em variáveis CSS no topo de `assets/css/base.css`. Ao alterar o design system, atualize esse arquivo.

## Estrutura

```
.
├── index.html            # Página principal (hero + quiz)
├── 404.html              # Página de erro
├── robots.txt            # Regras para buscadores
├── sitemap.xml           # Mapa do site
├── site.webmanifest      # Manifest (ícone/cores ao salvar na tela inicial)
├── favicon.svg
├── design-system/        # Fonte da verdade da marca (tokens JSON + logos originais)
└── assets/
    ├── css/
    │   ├── base.css      # Tokens (cores, fontes, espaçamentos), reset e utilitários
    │   ├── style.css     # Layout e componentes da página
    │   └── quiz.css      # Estilos do quiz
    ├── js/
    │   ├── config.js     # WhatsApp e configurações gerais  ← editar
    │   ├── quiz-data.js  # Perguntas, opções e resultados  ← editar
    │   ├── quiz.js       # Motor do quiz
    │   └── main.js       # Rastreamento de eventos e comportamentos gerais
    ├── img/              # Logos (logo.svg, logo-vertical.svg, logo-icone.svg) e imagens
    │                     # — inclua og-image.jpg (1200x630)
    └── fonts/            # Fontes locais, se necessário
```

## Antes de publicar

- [ ] Trocar `SEU-DOMINIO.com.br` pelo domínio real em `index.html`, `robots.txt` e `sitemap.xml`
- [ ] Definir o número do WhatsApp em `assets/js/config.js`
- [ ] Mudar `debug` para `false` em `assets/js/config.js`
- [ ] Substituir o conteúdo de exemplo em `assets/js/quiz-data.js`
- [ ] Adicionar `assets/img/og-image.jpg` (1200x630, imagem de compartilhamento)
- [ ] Atualizar `<lastmod>` no `sitemap.xml` a cada publicação

## Como editar o quiz

Em `assets/js/quiz-data.js`, cada opção soma pontos para um ou mais resultados:

```js
{ label: "Natural", points: { classico: 2 } }
```

No final vence o resultado com mais pontos. As chaves de `points` precisam existir em `results`.

## Rastreamento

`main.js` expõe `Site.track(nome, dados)`, que envia eventos ao `dataLayer` (GTM/GA4) e ao Meta Pixel quando estiverem instalados. O quiz já dispara `quiz_start`, `quiz_answer`, `quiz_complete`, `quiz_restart` e `whatsapp_click`. Para rastrear outros cliques, use o atributo `data-track="nome_do_evento"` em qualquer elemento.

## Rodar localmente

Abra o `index.html` no navegador, ou use a extensão Live Server do VS Code.
