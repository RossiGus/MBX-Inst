import type { MetadataRoute } from "next";
import { getProdutos } from "@/lib/produtos";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const produtos = await getProdutos();

  const estaticas: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/produtos`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/contato`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const dinamicas: MetadataRoute.Sitemap = produtos.map((produto) => ({
    url: `${site.url}/produtos/${produto.id}`,
    lastModified: produto.criado_em,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...estaticas, ...dinamicas];
}
