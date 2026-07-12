# Tema claro/escuro, parallax de produto e planta clicável

## Contexto

O site MBX (Next.js App Router) tem hoje uma home com hero + planta SVG cotada
de uma cozinha (decorativa), e uma vitrine de produtos em `/produtos` que já
suporta filtro por categoria via `?categoria=`. Não existe dark mode. O pedido
é inspirado em dois componentes do Skiper UI:

- [skiper26](https://skiper-ui.com/v1/skiper26) — botão de toggle de tema com
  animação via View Transitions API. Grátis, usa `next-themes` +
  `framer-motion` + `lucide-react`.
- [skiper29](https://skiper-ui.com/v1/skiper29) — efeito parallax de imagem
  (scale no scroll). É um componente **Pro** (licença paga), então não pode
  ser instalado via CLI nem ter seu código-fonte copiado. Vamos recriar só o
  efeito visual (scale de imagem no scroll) com `framer-motion`, que já está
  no projeto.

`framer-motion` e `lucide-react` já estão instalados. `next-themes` é novo.

## 1. Tema claro/escuro

### Paleta dark

O CSS hoje tem duas camadas de tokens que precisam ficar em sincronia:

- Aliases em `:root` (`--vellum`, `--ink`, `--brass`, etc.) usados pelo CSS
  bespoke portado do design original (89 usos em `globals.css`).
- Tokens Tailwind v4 em `@theme inline` (`--color-vellum`, `--color-ink`,
  etc.), hoje **hardcoded com os mesmos valores hex** em vez de referenciar os
  aliases de `:root`. Usados por classes utilitárias (`bg-vellum`,
  `text-ink`...) em 21 lugares nos componentes.

Mudança: os tokens em `@theme inline` passam a referenciar os aliases de
`:root` via `var(...)` em vez de hex fixo. Isso permite que um único bloco
`.dark { --vellum: ...; ... }` sobrescreva ambas as camadas de uma vez —
sem duplicar o sistema de cores.

Paleta dark (inversão do "papel de desenho" para "prancheta à noite",
mantendo o brass como assinatura):

| token | light (atual) | dark (novo) |
|---|---|---|
| `--vellum` (bg) | `#f1efe9` | `#16181a` |
| `--panel` | `#f7f5ef` | `#1e2023` |
| `--kraft` (carimbo) | `#e5e0d3` | `#26282b` |
| `--ink` (texto) | `#1c1e20` | `#ece8df` |
| `--ink-2` | `#45484a` | `#c7c2b4` |
| `--muted` | `#8a8578` | `#8a8578` (mantém, já funciona em fundo claro e escuro) |
| `--line` | `#c3bdb0` | `#3a3d3f` |
| `--line-2` | `#d6d1c5` | `#2c2e30` |
| `--brass` | `#a97e2f` | `#c49a45` (mais claro p/ contraste) |
| `--brass-2` | `#c49a45` | `#a97e2f` |
| `--red` (redline) | `#c0622a` | `#d97b46` |

Os equivalentes semânticos do shadcn (`--background`, `--foreground`,
`--card`, `--border`, `--ring`, etc.) recebem os mesmos valores invertidos
dentro do bloco `.dark`.

### Mecanismo

- `next-themes` (`ThemeProvider attribute="class" defaultTheme="system"
  enableSystem`) envolvendo o `<body>` em `src/app/layout.tsx`.
- Componente novo `src/components/theme-toggle.tsx`:
  - Ícone `Sun`/`Moon` (lucide-react) trocando conforme o tema atual.
  - Ao clicar, usa `document.startViewTransition()` (com fallback direto
    `setTheme()` se a API não existir) para animar um círculo se expandindo a
    partir do botão clicado cobrindo a tela com o novo tema — replica o
    variant "circle" do skiper26 sem copiar o pacote (é um padrão conhecido
    de ~15 linhas, não há propriedade intelectual relevante a reproduzir).
- Botão entra no `Nav` (`src/components/nav.tsx`), ao lado dos links
  desktop e também no menu mobile.

## 2. Seção de parallax com produto em destaque

- Nova função `getProdutoDestaque()` em `src/lib/produtos.ts`, mesmo padrão de
  `getProduto`/`getProdutos`: `supabase.from("produtos").select("*").eq("destaque", true).limit(1).maybeSingle()`.
- Novo componente `src/components/produto-parallax.tsx` (client component):
  recebe o produto já carregado via prop (buscado server-side em
  `src/app/page.tsx`), usa `useScroll` + `useTransform` do framer-motion
  para escalar a imagem (`scale` de ~1 a ~1.15) conforme a seção entra/sai da
  viewport. Cantos retos (sem `border-radius`, consistente com
  `--radius: 0px` do design atual), sem máscara SVG orgânica do componente
  original.
- Renderizada como nova `<section>` logo abaixo do `<header className="hero">`
  em `src/app/page.tsx`, com o nome do produto e link "Ver produto →" para
  `/produtos/[id]`.
- **Comportamento sem produto em destaque:** se `getProdutoDestaque()`
  retornar `null` (nenhum produto com `destaque=true` cadastrado, ou Supabase
  não configurado), a seção inteira não é renderizada — sem imagem quebrada
  nem estado vazio. `src/app/page.tsx` já é async-friendly (outras páginas do
  projeto usam `async function ... Page()` com Supabase), então a busca entra
  como `await` direto no componente da home.

## 3. Planta clicável

- Cada grupo de zona no SVG (`src/app/page.tsx`, dentro de `<svg id="plan">`)
  vira um `Link` do Next envolvendo o `<g>` correspondente:
  - `COIFA` → `/produtos?categoria=exaustao`
  - `FOGÃO` + `CHAPA` → `/produtos?categoria=coccao`
  - `BANC.` + `CUBA` → `/produtos?categoria=mobiliario`
  - `PASS` → **sem link**, permanece decorativa (não corresponde a nenhuma
    categoria; forçar um destino genérico quebraria a lógica "clique = ver
    produtos dessa categoria" das outras zonas)
- Cada `Link` recebe `aria-label` descritivo (ex. "Ver produtos de
  exaustão") e um estilo de hover (leve preenchimento em brass/10% no
  `<rect>` da zona) para indicar que é clicável.
- Categoria `refrigeracao` não tem zona correspondente na planta (o desenho
  original não tem uma) — continua acessível normalmente via `/produtos` ou
  pelo filtro de categorias na página de vitrine. Não será criada uma zona
  artificial só para cobrir essa categoria.

## Fora de escopo

- Não instala `lenis` (smooth scroll) — não é necessário para o efeito de
  scale no scroll.
- Não copia código-fonte do skiper29 (Pro/licenciado) — apenas recria o
  efeito visual (scale de imagem em scroll) com ferramentas já disponíveis.
- Não cria uma zona de planta para "refrigeração".
- Não adiciona preferência de tema por usuário no banco (Supabase) — fica
  só no `localStorage` via `next-themes`, como em qualquer site com dark
  mode client-side.

## Testes

- Build de produção (`npm run build`) sem erros.
- Verificação manual no browser: toggle de tema alterna e persiste após
  reload; seção de parallax aparece com produto destaque e desaparece
  quando não há nenhum; cada zona clicável da planta navega para a URL de
  categoria correta; zona PASS não é clicável.
