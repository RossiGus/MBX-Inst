import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ponytail: cliente único do browser/servidor via anon key. A segurança real
// é o RLS (supabase/schema.sql), não esconder essa chave — ela é pública por design.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export type Categoria = "coccao" | "exaustao" | "mobiliario" | "refrigeracao";

export type Produto = {
  id: string;
  nome: string;
  categoria: Categoria;
  descricao: string;
  specs: string;
  imagens: string[];
  destaque: boolean;
  criado_em: string;
};
