-- MBX — schema da Fase 2 (produtos + fotos + segurança)
-- Rodar no SQL Editor do projeto Supabase.

create extension if not exists "pgcrypto";

create table if not exists produtos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  categoria text not null check (categoria in ('coccao', 'exaustao', 'mobiliario', 'refrigeracao')),
  descricao text not null default '',
  specs text not null default '',
  imagens text[] not null default '{}',
  destaque boolean not null default false,
  criado_em timestamptz not null default now()
);

alter table produtos enable row level security;

-- Leitura pública (vitrine e home)
create policy "produtos_select_public" on produtos
  for select using (true);

-- Escrita só para usuários autenticados (dono logado no /admin)
create policy "produtos_insert_auth" on produtos
  for insert to authenticated with check (true);

create policy "produtos_update_auth" on produtos
  for update to authenticated using (true) with check (true);

create policy "produtos_delete_auth" on produtos
  for delete to authenticated using (true);

-- Bucket de fotos (rodar depois de criar o bucket "produtos" pelo painel Storage,
-- ou via API — o SQL abaixo só cria as políticas de acesso ao bucket)
insert into storage.buckets (id, name, public)
values ('produtos', 'produtos', true)
on conflict (id) do nothing;

create policy "produtos_fotos_select_public" on storage.objects
  for select using (bucket_id = 'produtos');

create policy "produtos_fotos_insert_auth" on storage.objects
  for insert to authenticated with check (bucket_id = 'produtos');

create policy "produtos_fotos_delete_auth" on storage.objects
  for delete to authenticated using (bucket_id = 'produtos');
