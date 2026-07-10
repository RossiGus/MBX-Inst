import { ProdutoForm } from "@/components/admin/produto-form";

export default function NovoProdutoPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Novo produto</h1>
      <ProdutoForm />
    </div>
  );
}
