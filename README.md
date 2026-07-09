# MBX — site institucional

Next.js (App Router) + TypeScript + Tailwind + shadcn/ui. Ver [PLANO.md](PLANO.md) para o plano de fases completo.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Deploy (Fase 1 — pendente, requer sua conta)

Não posso executar esta parte por você — exige login nas suas contas. Passo a passo:

1. **Subir o código no GitHub**
   - Crie um repositório vazio em [github.com/new](https://github.com/new) (ex.: `mbx-site`).
   - No terminal, dentro de `D:\mbx`:
     ```bash
     git remote add origin https://github.com/SEU-USUARIO/mbx-site.git
     git push -u origin main
     ```

2. **Conectar na Vercel**
   - Acesse [vercel.com/new](https://vercel.com/new), faça login com o GitHub e importe o repositório `mbx-site`.
   - Framework é detectado automaticamente (Next.js). Não precisa mudar nada no build.
   - Em **Environment Variables**, quando a Fase 2 (Supabase) estiver pronta, adicione `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` (os mesmos valores do seu `.env.local`).
   - Clique em **Deploy**. Em ~1 minuto o site está no ar num domínio `*.vercel.app`.

3. **Apontar o domínio `mbx.com.br`**
   - Compre o domínio (Registro.br ou similar), se ainda não tiver.
   - Na Vercel: Project → Settings → Domains → adicione `mbx.com.br` e `www.mbx.com.br`.
   - A Vercel mostra os registros DNS (A/CNAME) para configurar no painel do seu provedor de domínio.

## Supabase (Fase 2 — pendente, requer sua conta)

1. Crie um projeto em [supabase.com](https://supabase.com) (plano free).
2. Em Project Settings → API, copie a **Project URL** e a **anon public key** para o `.env.local` (veja `.env.local` na raiz — já tem os nomes das variáveis).
3. Rode o SQL de `supabase/schema.sql` no SQL Editor do Supabase (cria a tabela `produtos`, o bucket de fotos e as políticas de RLS).
4. Em Authentication → Users, crie manualmente o usuário/senha do dono (login do `/admin`).

Depois disso as páginas de produto e o painel admin (Fases 3 e 4) já têm onde ler/gravar dados.
