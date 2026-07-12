import { supabase, type Categoria, type Produto } from "@/lib/supabase";

export const categorias: { valor: Categoria; label: string }[] = [
  { valor: "coccao", label: "Cocção" },
  { valor: "exaustao", label: "Exaustão" },
  { valor: "mobiliario", label: "Mobiliário" },
  { valor: "refrigeracao", label: "Refrigeração" },
];

export function labelCategoria(categoria: Categoria): string {
  return categorias.find((c) => c.valor === categoria)?.label ?? categoria;
}

export async function getProdutos(categoria?: Categoria): Promise<Produto[]> {
  if (!supabase) return [];

  let query = supabase.from("produtos").select("*").order("criado_em", { ascending: false });
  if (categoria) query = query.eq("categoria", categoria);

  const { data, error } = await query;
  if (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getProduto(id: string): Promise<Produto | null> {
  if (!supabase) return null;

  const { data, error } = await supabase.from("produtos").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("Erro ao buscar produto:", error.message);
    return null;
  }
  return data;
}

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
