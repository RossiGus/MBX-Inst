# MBX — Plano de ação: site institucional + produtos

## Decisões

- **Framework:** Next.js (App Router) + React + TypeScript.
- **Estilo:** Tailwind CSS + shadcn/ui.
- **Animação:** Framer Motion (motor por baixo de Skiper UI e Vengeance UI), usado **com parcimônia** para não quebrar a estética "prancha técnica".
- **Componentes prontos:** Skiper UI + Vengeance UI (copy-paste via CLI, estilo shadcn).
- **Gestão de produtos:** Supabase (banco + storage de fotos + login do dono), painel `/admin`.
- **Produtos:** vitrine + orçamento (fotos, specs, descrição → CTA abre WhatsApp preenchido). Sem preço/carrinho.
- **Deploy:** Vercel.
- **Custo:** ~R$0/mês (planos gratuitos Supabase + Vercel). Único gasto: domínio `mbx.com.br` (~R$40/ano).

## Por que Next.js aqui

- Skiper UI e Vengeance UI são feitas para React/Next — não rodam em HTML puro.
- **Bônus real:** SSR/SSG do Next resolve o SEO das páginas de produto (o Google passa a ver o conteúdo), coisa que a versão vanilla não entregava.

## Arquitetura

```
Next.js (hospedado na Vercel)              Supabase (backend gerenciado)
┌─────────────────────────────────┐       ┌──────────────────────────┐
│ app/page.tsx        (home)        │ SSR → │ Postgres: tabela produtos │
│ app/produtos/       (vitrine)     │ ────→ │ Storage:  bucket de fotos │
│ app/produtos/[id]/  (detalhe)     │       │ Auth:     1 conta do dono │
│ app/contato/                      │ ←──── │ RLS: público lê,          │
│ app/admin/          (login+CRUD)  │ grava │      só logado escreve    │
└─────────────────────────────────┘       └──────────────────────────┘
   components/  (nav, footer, cards, seções)
   design tokens do CSS atual → Tailwind theme
```

Segurança do admin = **RLS** do Supabase (não esconder a rota). A `anon key` é pública por design.

## Design: preservar a identidade atual

O visual de hoje (paleta vellum/kraft/latão, grid milimetrado, Space Grotesk + IBM Plex Mono) é o ativo mais forte. Na migração:

- Portar as cores/fontes/espaçamentos do CSS atual para o `tailwind.config` (design tokens).
- Recriar as seções como componentes React mantendo o mesmo look.
- Skiper/Vengeance entram **pontualmente**, não trocam o visual base. Sugestões que combinam:
  - **Contador animado** (Vengeance "Animated Number") na faixa de métricas.
  - **Marquee/logo slider** para logos de clientes (se houver).
  - **Reveal no scroll** (já existe hoje via IntersectionObserver → trocar por Framer Motion).
  - **Card hover/tilt** sutil nos cards de produto.
  - Evitar: liquid effects, 3D displacement, glow/creepy buttons — brigam com a sobriedade do design.

## Modelo de dados (tabela `produtos`)

| coluna     | tipo          | nota                                              |
|------------|---------------|---------------------------------------------------|
| id         | uuid (pk)     | `gen_random_uuid()`                               |
| nome       | text          | ex. "Bancada com cuba soldada"                    |
| categoria  | text          | `coccao` \| `exaustao` \| `mobiliario` \| `refrigeracao` |
| descricao  | text          | texto livre                                       |
| specs      | text          | linhas livres ("Inox 304\nSolda sanitária")       |
| imagens    | text[]        | URLs das fotos no Storage                          |
| destaque   | bool          | aparece em "Realizações" na home                  |
| criado_em  | timestamptz   | `now()`                                           |

**RLS:** `SELECT` público; `INSERT/UPDATE/DELETE` só autenticado. Bucket de fotos com leitura pública.

## Fases

### Fase 0 — Fundação
- `npx create-next-app` (TypeScript, App Router, Tailwind) em `D:\mbx`; iniciar git.
- Instalar shadcn/ui, Framer Motion, CLIs de Skiper UI e Vengeance UI.
- Portar cores/fontes/espaçamentos do CSS atual para o Tailwind theme (design tokens).
- Componentes base: `Nav`, `Footer`, `WhatsAppFloat`.
- Config de ambiente para as chaves do Supabase (`.env.local`).

### Fase 1 — Home + páginas estáticas + deploy
- Recriar a home atual como componentes React (hero + SVG da planta, métricas, legenda, processo, notas, FAQ, pareceres), preservando o visual.
- Menu apontando para as rotas reais + link **Produtos**.
- `app/contato/`: reaproveitar o formulário (submit → WhatsApp).
- Deploy inicial na Vercel + apontar domínio.

### Fase 2 — Supabase
- Criar projeto; tabela `produtos`, bucket de fotos, políticas RLS.
- Criar a conta de login do dono.
- Popular com os produtos das 4 linhas atuais (seed).

### Fase 3 — Vitrine pública (SSR/SSG)
- `app/produtos/`: grade (componente de card no estilo `.sheet`), filtro por categoria; dados via Supabase no servidor.
- `app/produtos/[id]/`: detalhe com galeria de fotos, specs, descrição e CTA **"Solicitar orçamento"** → WhatsApp com o nome do produto pré-preenchido.

### Fase 4 — Admin
- `app/admin/`: login (Supabase Auth); lista de produtos; formulário criar/editar com upload de fotos; excluir. Escrita só autenticada (RLS).

### Fase 5 — Acabamento
- Metadata/OG por rota (Next Metadata API), `sitemap.ts`, favicon.
- Trocar placeholders do HTML atual por dados reais: WhatsApp, telefone, e-mail, CNPJ, imagem OG 1200×630, depoimentos reais.
- Teste mobile + `prefers-reduced-motion` (Framer Motion respeita via `useReducedMotion`).
- Revisar acessibilidade dos formulários.

## Ordem de execução

0 → 1 → 2 → 3 → 4 → 5. Fases 0–1 já colocam o site institucional no ar; 2–4 ligam os produtos; 5 é polimento.

## Limitações conhecidas (com plano de upgrade)

- **Custo de migração:** o design artesanal atual é reconstruído do zero em React/Tailwind — não há conversão automática. É o maior item de esforço do projeto.
- **Um único dono:** login pensado para 1 conta; multiusuário fica para quando surgir a necessidade.
