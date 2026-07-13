# Tema claro/escuro, parallax de produto e planta clicável — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar toggle de tema claro/escuro com animação circular (estilo skiper26), uma seção de parallax de imagem do produto em destaque (recriando o efeito do skiper29, que é Pro e não pode ser copiado), e tornar a planta SVG da home clicável, levando às categorias de produto correspondentes.

**Architecture:** Dark mode via `next-themes` (classe `.dark` no `<html>`) + variáveis CSS já existentes em `globals.css`, reaproveitando o sistema de tokens atual em vez de criar um novo. Parallax via `framer-motion` (`useScroll`/`useTransform`), já instalado. Planta clicável via `next/link` envolvendo os grupos SVG existentes.

**Tech Stack:** Next.js (App Router), `next-themes` (novo), `framer-motion` (já instalado), `lucide-react` (já instalado), Supabase.

**Verificação:** este projeto não tem suite de testes automatizados (sem Jest/Vitest/Playwright configurado — `npm run lint`/`npm run build` são os únicos scripts). Seguindo o padrão já estabelecido nas fases anteriores, cada tarefa é verificada com `npm run build` (falha rápido em erro de tipo/JSX) e checagem manual no browser via preview tool. Não introduzir um framework de testes novo não pedido (YAGNI).

---

## Task 0: Corrigir colisão pré-existente na variável `--muted`

**Contexto (achado ao explorar o arquivo, fora do pedido original, mas bloqueia a Task 2):** `src/app/globals.css` declara `--muted` **duas vezes** dentro do mesmo bloco `:root`:
- Linha 73: `--muted: #8a8578;` (alias "muted-ink", cor de texto secundário cinza-acastanhado)
- Linha 92: `--muted: #e5e0d3;` (semântico shadcn, cor de fundo "muted")

A segunda declaração vence em cascata CSS. Isso significa que os 12 usos de `var(--muted)` espalhados pelo arquivo (`.tag.mut`, `.metric .cap`, `.sec-head .idx`, `.legend .spec`, `.sheet .strip .k`, `.quote .who .rl`, `.faq .pm`, `.req .info .k`, `.fld label`, `.rnote`, `.block .k`, `.hero-top .rev`) hoje renderizam com `#e5e0d3` (bege claro, baixo contraste) em vez do `#8a8578` (cinza-acastanhado) pretendido pelo nome/uso — provável bug visual de contraste já em produção.

Precisamos resolver isso antes da Task 2 porque vamos tornar `--muted` responsivo ao tema escuro, e não dá pra fazer isso corretamente enquanto a variável estiver sobrescrita ambiguamente.

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Renomear o alias para `--muted-ink` e atualizar os 12 usos**

Em `src/app/globals.css`, linha 73 (dentro do bloco `:root`, seção "Aliases usados pelo CSS bespoke"):

Trocar:
```css
  --muted: #8a8578;
```
Por:
```css
  --muted-ink: #8a8578;
```

Depois, trocar **todas** as ocorrências de `var(--muted)` por `var(--muted-ink)` nas seguintes linhas (usar find-and-replace, são exatamente estas 12 linhas):

```css
.tag.mut{color:var(--muted-ink)}
.block .k{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted-ink)}
.hero-top .rev{font-family:var(--font-mono);font-size:11px;letter-spacing:.13em;color:var(--muted-ink);text-align:right;line-height:1.6}
.metric .cap{margin-top:14px;font-family:var(--font-mono);font-size:11px;letter-spacing:.05em;color:var(--muted-ink);text-transform:uppercase;line-height:1.45;max-width:22ch}
.sec-head .idx{font-family:var(--font-mono);font-size:12px;letter-spacing:.1em;color:var(--muted-ink);white-space:nowrap}
.legend .spec{font-family:var(--font-mono);font-size:12px;color:var(--muted-ink);letter-spacing:.02em;line-height:1.7}
.sheet .strip .k{font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-ink)}
.quote .who .rl{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted-ink)}
.faq .pm{font-family:var(--font-mono);font-size:18px;color:var(--muted-ink);text-align:right;transition:transform .3s var(--ease)}
.req .info .k{font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-ink);width:82px;flex:none}
.fld label{display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted-ink);margin-bottom:7px}
.rnote{font-family:var(--font-mono);font-size:11px;color:var(--muted-ink);margin-top:12px;text-align:center}
```

O `--muted: #e5e0d3;` do bloco "shadcn semânticos" (linha 92 original) **não muda** — continua sendo o único `--muted`, usado por `--color-muted` do shadcn.

- [ ] **Step 2: Rodar o build**

Run: `npm run build`
Expected: sucesso, sem erros de CSS/TypeScript.

- [ ] **Step 3: Verificar visualmente**

Suba o dev server (`npm run dev`), abra `/` e confira que textos como as legendas de métricas (`.metric .cap`), o índice de seção (`SEÇÃO 01/03`) e o rodapé do formulário de contato (`.rnote`) ficaram num cinza-acastanhado mais escuro/legível — não mais bege claro lavado.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "fix: resolver colisao da variavel --muted duplicada em globals.css"
```

---

## Task 1: Instalar next-themes

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Instalar a dependência**

Run: `npm install next-themes`
Expected: `next-themes` adicionado em `dependencies` no `package.json`.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: adicionar next-themes"
```

---

## Task 2: Paleta dark em globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Fazer os tokens do `@theme inline` referenciarem os aliases de `:root`**

No bloco `@theme inline` (topo do arquivo), trocar os 11 tokens de cor hardcoded:

De:
```css
  --color-vellum: #f1efe9; /* papel de desenho */
  --color-panel: #f7f5ef;
  --color-kraft: #e5e0d3; /* carimbo */
  --color-ink: #1c1e20; /* grafite */
  --color-ink-2: #45484a;
  --color-muted-ink: #8a8578;
  --color-line: #c3bdb0; /* fio de cota */
  --color-line-2: #d6d1c5;
  --color-brass: #a97e2f; /* assinatura: cotas, marcadores */
  --color-brass-2: #c49a45;
  --color-redline: #c0622a; /* anotação/redline */
```

Para:
```css
  --color-vellum: var(--vellum); /* papel de desenho */
  --color-panel: var(--panel);
  --color-kraft: var(--kraft); /* carimbo */
  --color-ink: var(--ink); /* grafite */
  --color-ink-2: var(--ink-2);
  --color-muted-ink: var(--muted-ink);
  --color-line: var(--line); /* fio de cota */
  --color-line-2: var(--line-2);
  --color-brass: var(--brass); /* assinatura: cotas, marcadores */
  --color-brass-2: var(--brass-2);
  --color-redline: var(--red); /* anotação/redline */
```

(`--muted-ink` já existe em `:root` desde a Task 0.)

- [ ] **Step 2: Adicionar o bloco `.dark` logo após o fechamento do `:root { ... }`**

O `:root { ... }` termina em (após a Task 0) uma linha `}` seguida de `@layer base {`. Inserir o bloco novo **entre** essas duas linhas:

```css
.dark {
  /* Aliases (paleta invertida: prancheta à noite) */
  --vellum: #16181a;
  --panel: #1e2023;
  --kraft: #26282b;
  --ink: #ece8df;
  --ink-2: #c7c2b4;
  --muted-ink: #8a8578;
  --line: #3a3d3f;
  --line-2: #2c2e30;
  --brass: #c49a45;
  --brass-2: #a97e2f;
  --red: #d97b46;

  /* shadcn semânticos remapeados */
  --background: #16181a;
  --foreground: #ece8df;
  --card: #1e2023;
  --card-foreground: #ece8df;
  --popover: #1e2023;
  --popover-foreground: #ece8df;
  --primary: #ece8df;
  --primary-foreground: #16181a;
  --secondary: #26282b;
  --secondary-foreground: #ece8df;
  --muted: #26282b;
  --muted-foreground: #8a8578;
  --accent: #1e2023;
  --accent-foreground: #ece8df;
  --destructive: #d97b46;
  --border: #3a3d3f;
  --input: #3a3d3f;
  --ring: #c49a45;
  --chart-1: #c49a45;
  --chart-2: #a97e2f;
  --chart-3: #c7c2b4;
  --chart-4: #8a8578;
  --chart-5: #ece8df;
  --sidebar: #1e2023;
  --sidebar-foreground: #ece8df;
  --sidebar-primary: #ece8df;
  --sidebar-primary-foreground: #16181a;
  --sidebar-accent: #26282b;
  --sidebar-accent-foreground: #ece8df;
  --sidebar-border: #3a3d3f;
  --sidebar-ring: #c49a45;
}
```

- [ ] **Step 3: Suprimir a transição cross-fade padrão da View Transitions API**

Adicionar ao final de `src/app/globals.css` (o toggle de tema, feito na Task 5, vai desenhar sua própria animação de círculo — sem isso, o navegador sobrepõe um cross-fade padrão por cima):

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
```

- [ ] **Step 4: Rodar o build**

Run: `npm run build`
Expected: sucesso.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: paleta dark mode via variaveis CSS existentes"
```

---

## Task 3: ThemeProvider

**Files:**
- Create: `src/components/theme-provider.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Criar o provider**

Criar `src/components/theme-provider.tsx`:

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

- [ ] **Step 2: Envolver o app com o provider**

Em `src/app/layout.tsx`, adicionar o import:

```tsx
import { ThemeProvider } from "@/components/theme-provider";
```

Adicionar `suppressHydrationWarning` na tag `<html>` (necessário porque `next-themes` seta a classe `dark` via script antes da hidratação, o que causaria mismatch):

```tsx
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
```

Envolver o conteúdo do `<body>` com `<ThemeProvider>`:

```tsx
      <body className="overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HomeEffects />
          <Nav />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
```

- [ ] **Step 3: Rodar o build**

Run: `npm run build`
Expected: sucesso.

- [ ] **Step 4: Commit**

```bash
git add src/components/theme-provider.tsx src/app/layout.tsx
git commit -m "feat: adicionar ThemeProvider (next-themes)"
```

---

## Task 4: Botão de toggle de tema (animação circular)

**Files:**
- Create: `src/components/theme-toggle.tsx`
- Modify: `src/components/nav.tsx`

- [ ] **Step 1: Criar o componente**

Criar `src/components/theme-toggle.tsx`:

```tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  function toggle() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const btn = btnRef.current;
    const doc = document as ViewTransitionDocument;

    if (!doc.startViewTransition || !btn) {
      setTheme(next);
      return;
    }

    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setTheme(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  if (!mounted) {
    return <span className="block h-[42px] w-[42px]" aria-hidden />;
  }

  return (
    <button
      ref={btnRef}
      onClick={toggle}
      type="button"
      aria-label={resolvedTheme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      className="grid h-[42px] w-[42px] place-items-center border border-line text-ink transition-colors hover:border-brass hover:text-brass"
    >
      {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

Nota: `startViewTransition` ainda não está nos tipos do DOM do TypeScript — por isso o tipo `ViewTransitionDocument` local em vez de `@ts-expect-error`. Navegadores sem suporte (Firefox, Safari < 18) caem no fallback `setTheme(next)` direto, sem animação — funcional, só sem o efeito circular.

- [ ] **Step 2: Adicionar o toggle no Nav (desktop)**

Em `src/components/nav.tsx`, adicionar o import:

```tsx
import { ThemeToggle } from "@/components/theme-toggle";
```

Dentro de `<div className="flex items-center gap-[26px]">`, adicionar `<ThemeToggle />` logo antes do botão de menu mobile (antes da linha `<button onClick={() => setOpen((v) => !v)} ...>`):

```tsx
          <Link
            href="/contato"
            className="hidden border border-ink bg-ink px-[17px] py-[10px] font-mono text-[12.5px] tracking-[0.03em] text-vellum transition-colors hover:bg-ink/90 md:inline"
          >
            Solicitar projeto →
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
```

- [ ] **Step 3: Adicionar o toggle no menu mobile**

No painel de menu mobile (`<div className="fixed inset-0 z-[55] ...">`), adicionar `<ThemeToggle />` logo após o link "Solicitar projeto →":

```tsx
        <Link
          href="/contato"
          onClick={() => setOpen(false)}
          className="mt-[26px] self-start border border-ink bg-ink px-[22px] py-[14px] font-mono text-[14px] text-vellum"
        >
          Solicitar projeto →
        </Link>
        <div className="mt-[18px] self-start">
          <ThemeToggle />
        </div>
```

- [ ] **Step 4: Rodar o build**

Run: `npm run build`
Expected: sucesso.

- [ ] **Step 5: Verificar manualmente**

`npm run dev`, abrir `/`, clicar no toggle: tema muda com animação de círculo (Chrome/Edge) ou instantâneo (outros navegadores), e persiste depois de recarregar a página (localStorage via `next-themes`).

- [ ] **Step 6: Commit**

```bash
git add src/components/theme-toggle.tsx src/components/nav.tsx
git commit -m "feat: botao de toggle de tema com animacao circular"
```

---

## Task 5: `getProdutoDestaque()` em lib/produtos.ts

**Files:**
- Modify: `src/lib/produtos.ts`

- [ ] **Step 1: Adicionar a função**

Em `src/lib/produtos.ts`, adicionar após `getProduto`:

```ts
export async function getProdutoDestaque(): Promise<Produto | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("destaque", true)
    .order("criado_em", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar produto destaque:", error.message);
    return null;
  }
  return data;
}
```

- [ ] **Step 2: Rodar o build**

Run: `npm run build`
Expected: sucesso.

- [ ] **Step 3: Commit**

```bash
git add src/lib/produtos.ts
git commit -m "feat: adicionar getProdutoDestaque para a secao de parallax"
```

---

## Task 6: Componente de parallax do produto

**Files:**
- Create: `src/components/produto-parallax.tsx`

- [ ] **Step 1: Criar o componente**

Criar `src/components/produto-parallax.tsx`:

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Produto } from "@/lib/supabase";

export function ProdutoParallax({ produto }: { produto: Produto }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);

  const imagem = produto.imagens[0];
  if (!imagem) return null;

  return (
    <section className="sec" ref={ref}>
      <div className="wrap">
        <div className="sec-head">
          <div className="lft">
            <span className="tag">Destaque</span>
            <h2>{produto.nome}</h2>
          </div>
          <Link className="btn btn-2" href={`/produtos/${produto.id}`}>
            Ver produto →
          </Link>
        </div>
        <div className="relative mt-[32px] h-[60vh] min-h-[360px] w-full overflow-hidden border border-line">
          <motion.div style={{ scale }} className="relative h-full w-full">
            <Image
              src={imagem}
              alt={produto.nome}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rodar o build**

Run: `npm run build`
Expected: sucesso.

- [ ] **Step 3: Commit**

```bash
git add src/components/produto-parallax.tsx
git commit -m "feat: componente de parallax do produto em destaque"
```

---

## Task 7: Integrar o parallax na home

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Tornar `Home` async e buscar o produto destaque**

Em `src/app/page.tsx`, trocar os imports do topo:

De:
```tsx
import Link from "next/link";

export default function Home() {
```

Para:
```tsx
import Link from "next/link";
import { getProdutoDestaque } from "@/lib/produtos";
import { ProdutoParallax } from "@/components/produto-parallax";

export const dynamic = "force-dynamic";

export default async function Home() {
  const produtoDestaque = await getProdutoDestaque();
```

(`force-dynamic` segue o mesmo padrão já usado em `src/app/produtos/page.tsx` para páginas que buscam dados do Supabase em cada request.)

- [ ] **Step 2: Renderizar a seção logo após o `</header>` do hero**

Trocar:
```tsx
      </header>

      {/* METRICS */}
```

Por:
```tsx
      </header>

      {produtoDestaque && <ProdutoParallax produto={produtoDestaque} />}

      {/* METRICS */}
```

- [ ] **Step 3: Rodar o build**

Run: `npm run build`
Expected: sucesso.

- [ ] **Step 4: Verificar manualmente**

No Supabase, marcar um produto existente com `destaque = true` (via `/admin` ou SQL Editor: `update produtos set destaque = true where id = '<algum-id>';`). Recarregar `/` e confirmar que a seção aparece com a imagem escalando ao rolar a página. Desmarcar o destaque (`destaque = false` em todos) e confirmar que a seção some sem quebrar o layout.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: exibir secao de parallax do produto destaque na home"
```

---

## Task 8: Planta clicável

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Envolver os grupos SVG em `Link`**

Em `src/app/page.tsx`, dentro do `<svg id="plan">`, trocar os quatro grupos `.fade` de zona (d1, d2, d3, d4) — o `d5` (cotas e legendas) não muda:

De:
```tsx
                <g className="fade d1">
                  <rect className="stroke thin fillk" x="56" y="52" width="176" height="22" />
                  <text className="lbl" x="60" y="66">COIFA</text>
                </g>
                <g className="fade d2">
                  <rect className="stroke thin fillk" x="52" y="256" width="88" height="68" />
                  <text className="lbl" x="60" y="292">FOGÃO</text>
                  <rect className="stroke thin fillk" x="150" y="256" width="70" height="68" />
                  <text className="lbl" x="158" y="292">CHAPA</text>
                </g>
                <g className="fade d3">
                  <rect className="stroke thin fillk" x="150" y="140" width="112" height="58" />
                  <text className="lbl" x="158" y="172">PASS</text>
                </g>
                <g className="fade d4">
                  <rect className="stroke thin fillk" x="300" y="92" width="44" height="140" />
                  <text className="lbl" x="306" y="120">BANC.</text>
                  <rect className="stroke thin fillk" x="300" y="256" width="44" height="68" />
                  <text className="lbl" x="306" y="292">CUBA</text>
                </g>
```

Para:
```tsx
                <Link href="/produtos?categoria=exaustao" aria-label="Ver produtos de exaustão">
                  <g className="fade d1">
                    <rect className="stroke thin fillk" x="56" y="52" width="176" height="22" />
                    <text className="lbl" x="60" y="66">COIFA</text>
                  </g>
                </Link>
                <Link href="/produtos?categoria=coccao" aria-label="Ver produtos de cocção">
                  <g className="fade d2">
                    <rect className="stroke thin fillk" x="52" y="256" width="88" height="68" />
                    <text className="lbl" x="60" y="292">FOGÃO</text>
                    <rect className="stroke thin fillk" x="150" y="256" width="70" height="68" />
                    <text className="lbl" x="158" y="292">CHAPA</text>
                  </g>
                </Link>
                <g className="fade d3">
                  <rect className="stroke thin fillk" x="150" y="140" width="112" height="58" />
                  <text className="lbl" x="158" y="172">PASS</text>
                </g>
                <Link href="/produtos?categoria=mobiliario" aria-label="Ver produtos de mobiliário">
                  <g className="fade d4">
                    <rect className="stroke thin fillk" x="300" y="92" width="44" height="140" />
                    <text className="lbl" x="306" y="120">BANC.</text>
                    <rect className="stroke thin fillk" x="300" y="256" width="44" height="68" />
                    <text className="lbl" x="306" y="292">CUBA</text>
                  </g>
                </Link>
```

`PASS` (d3) fica de fora do `Link` — permanece decorativa, sem categoria correspondente.

- [ ] **Step 2: Adicionar estilo de hover**

Em `src/app/globals.css`, logo após a regra `.plan .fade{opacity:0}` (linha ~212), adicionar:

```css
.plan a{cursor:pointer}
.plan a:hover .fillk{fill:rgba(169,126,47,.18)}
.plan a:hover .lbl{fill:var(--brass)}
```

- [ ] **Step 3: Rodar o build**

Run: `npm run build`
Expected: sucesso — confirmar que o React não reclama de `<a>` (via `Link`) dentro de `<svg>` (é válido: o navegador cria um `SVGAElement` automaticamente pelo namespace do pai).

- [ ] **Step 4: Verificar manualmente**

`npm run dev`, abrir `/`, passar o mouse sobre COIFA/FOGÃO/CHAPA/BANC./CUBA: cursor vira pointer e a zona destaca em brass. Clicar em cada uma navega para `/produtos?categoria=X` com o filtro certo já aplicado (conferir pelos chips ativos na página de produtos). Passar o mouse sobre PASS: nada acontece, não é clicável.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: tornar zonas da planta da home clicaveis por categoria"
```

---

## Task 9: Verificação final

- [ ] **Step 1: Build completo**

Run: `npm run build`
Expected: sucesso, sem warnings novos.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: sucesso.

- [ ] **Step 3: Checklist manual no browser (light + dark)**

Com `npm run dev` rodando, em `/`:
- Alternar tema no Nav (desktop e mobile): cores trocam em toda a página (hero, planta, cards, formulário em `/contato`, painel `/admin`), sem elemento "preso" na cor antiga.
- Recarregar a página com dark ativo: tema dark persiste (sem flash de tema claro).
- Seção de parallax: aparece só quando há produto com `destaque=true`; imagem escala suavemente ao rolar.
- Zonas da planta: COIFA/FOGÃO/CHAPA/BANC./CUBA navegam pra categoria certa; PASS não é clicável.
- Testar em viewport mobile (375×812): toggle de tema acessível no menu mobile, planta e parallax não quebram o layout.

- [ ] **Step 4: Commit final (se houver ajustes da verificação)**

```bash
git add -A
git commit -m "fix: ajustes de verificacao final do tema/parallax/planta clicavel"
```
