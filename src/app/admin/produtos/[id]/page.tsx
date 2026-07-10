import { notFound } from "next/navigation";
import { getProduto } from "@/lib/produtos";
import { ProdutoForm } from "@/components/admin/produto-form";

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produto = await getProduto(id);
  if (!produto) notFound();

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Editar produto</h1>
      <ProdutoForm produto={produto} />
    </div>
  );
}
