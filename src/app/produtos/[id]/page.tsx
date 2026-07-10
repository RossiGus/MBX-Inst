import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduto, labelCategoria } from "@/lib/produtos";
import { whatsappUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const produto = await getProduto(id);
  if (!produto) return { title: "Produto — MBX Aço Inox" };
  return {
    title: `${produto.nome} — MBX Aço Inox`,
    description: produto.descricao || `${produto.nome}, fabricado em aço inox 304 pela MBX.`,
  };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produto = await getProduto(id);
  if (!produto) notFound();

  const specs = produto.specs
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section className="sec" style={{ paddingTop: "clamp(112px,15vh,168px)" }}>
      <div className="wrap">
        <Link href="/produtos" className="tag" style={{ display: "inline-block", marginBottom: 20 }}>
          ← Voltar para produtos
        </Link>

        <div className="produto-detalhe">
          <div className="galeria">
            {produto.imagens.length > 0 ? (
              produto.imagens.map((url, i) => (
                <div key={url} className="plate">
                  <Image
                    src={url}
                    alt={`${produto.nome} — foto ${i + 1}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                    priority={i === 0}
                  />
                </div>
              ))
            ) : (
              <div className="plate">
                <span className="co">{produto.nome.charAt(0)}</span>
              </div>
            )}
          </div>

          <div className="info-produto">
            <span className="tag">{labelCategoria(produto.categoria)}</span>
            <h1>{produto.nome}</h1>
            {produto.descricao && <p className="hero-lede">{produto.descricao}</p>}

            {specs.length > 0 && (
              <ul className="specs-list">
                {specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            )}

            <a
              className="btn btn-1"
              href={whatsappUrl(`Olá, MBX! Gostaria de um orçamento para: ${produto.nome}`)}
              target="_blank"
              rel="noopener"
            >
              <span>Solicitar orçamento →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
