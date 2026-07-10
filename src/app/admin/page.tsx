import Link from "next/link";
import { getProdutos, labelCategoria } from "@/lib/produtos";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const produtos = await getProdutos();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Produtos</h1>
        <Link href="/admin/produtos/novo" className="btn btn-1">
          <span>+ Novo produto</span>
        </Link>
      </div>

      {produtos.length === 0 && <p className="rnote">Nenhum produto cadastrado ainda.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--line)" }}>
        {produtos.map((produto) => (
          <div
            key={produto.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "var(--panel)",
              padding: "14px 16px",
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{produto.nome}</div>
              <div className="rnote" style={{ textAlign: "left", margin: 0 }}>
                {labelCategoria(produto.categoria)}
                {produto.destaque ? " · destaque" : ""}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link href={`/admin/produtos/${produto.id}`} className="chip">
                Editar
              </Link>
              <DeleteButton id={produto.id} nome={produto.nome} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
