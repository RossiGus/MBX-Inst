"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Categoria } from "@/lib/supabase";

export async function saveProduto(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string | null;
  const imagens = formData.getAll("imagens") as string[];

  const produto = {
    nome: String(formData.get("nome") ?? ""),
    categoria: formData.get("categoria") as Categoria,
    descricao: String(formData.get("descricao") ?? ""),
    specs: String(formData.get("specs") ?? ""),
    destaque: formData.get("destaque") === "on",
    imagens: imagens.filter(Boolean),
  };

  const { error } = id
    ? await supabase.from("produtos").update(produto).eq("id", id)
    : await supabase.from("produtos").insert(produto);

  if (error) throw new Error(error.message);

  revalidatePath("/produtos");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduto(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("produtos").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/produtos");
  revalidatePath("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
