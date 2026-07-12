import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProdutos, categorias, labelCategoria } from "@/lib/produtos";
import type { Categoria } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Vitrine de cozinhas, bancadas, coifas e câmaras em aço inox 304 fabricadas pela MBX. Solicite orçamento pelo WhatsApp.",
};

export const dynamic = "force-dynamic";

function isCategoria(value?: string): value is Categoria {
  return categorias.some((c) => c.valor === value);
}

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const filtro = isCategoria(categoria) ? categoria : undefined;
  const produtos = await getProdutos(filtro);

  return (
    <section className="sec" style={{ paddingTop: "clamp(112px,15vh,168px)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="lft">
            <span className="tag">Vitrine</span>
            <h1>Produtos</h1>
            <p>
              Peças e linhas já fabricadas pela MBX. Cada uma pode ser adaptada à medida do
              seu espaço — o orçamento sai pelo WhatsApp.
            </p>
          </div>
        </div>

        <div className="filtros">
          <Link href="/produtos" className={`chip${!filtro ? " active" : ""}`}>
            Todas
          </Link>
          {categorias.map((c) => (
            <Link
              key={c.valor}
              href={`/produtos?categoria=${c.valor}`}
              className={`chip${filtro === c.valor ? " active" : ""}`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {!supabase && (
          <p className="rnote" style={{ marginTop: 24 }}>
            Vitrine em preparação — conecte o Supabase (Fase 2) para exibir os produtos aqui.
          </p>
        )}

        {supabase && produtos.length === 0 && (
          <p className="rnote" style={{ marginTop: 24 }}>
            Nenhum produto cadastrado{filtro ? ` em ${labelCategoria(filtro)}` : ""} ainda.
          </p>
        )}

        {produtos.length > 0 && (
          <div className="sheets" style={{ marginTop: 32 }}>
            {produtos.map((produto) => (
              <Link key={produto.id} href={`/produtos/${produto.id}`} className="sheet">
                <div className="plate">
                  {produto.imagens[0] ? (
                    <Image
                      src={produto.imagens[0]}
                      alt={produto.nome}
                      fill
                      sizes="(max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <span className="co">{produto.nome.charAt(0)}</span>
                  )}
                  <span className="ptype">{labelCategoria(produto.categoria)}</span>
                </div>
                <div className="pname">{produto.nome}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
