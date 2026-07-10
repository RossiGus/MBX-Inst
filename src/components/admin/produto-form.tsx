"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { saveProduto } from "@/app/admin/actions";
import { categorias } from "@/lib/produtos";
import type { Produto } from "@/lib/supabase";

export function ProdutoForm({ produto }: { produto?: Produto }) {
  const [imagens, setImagens] = useState<string[]>(produto?.imagens ?? []);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setEnviando(true);
    setErro("");
    const supabase = createClient();

    try {
      const urls: string[] = [];
      for (const file of files) {
        const path = `${crypto.randomUUID()}-${file.name}`;
        const { error } = await supabase.storage.from("produtos").upload(path, file);
        if (error) throw error;
        urls.push(supabase.storage.from("produtos").getPublicUrl(path).data.publicUrl);
      }
      setImagens((prev) => [...prev, ...urls]);
    } catch {
      setErro("Falha ao enviar foto. Tente de novo.");
    } finally {
      setEnviando(false);
      e.target.value = "";
    }
  }

  function removerImagem(url: string) {
    setImagens((prev) => prev.filter((u) => u !== url));
  }

  return (
    <form action={saveProduto} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 560 }}>
      {produto && <input type="hidden" name="id" value={produto.id} />}
      {imagens.map((url) => (
        <input key={url} type="hidden" name="imagens" value={url} />
      ))}

      <div className="fld">
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" required defaultValue={produto?.nome} />
      </div>

      <div className="fld">
        <label htmlFor="categoria">Categoria</label>
        <select id="categoria" name="categoria" required defaultValue={produto?.categoria ?? categorias[0].valor}>
          {categorias.map((c) => (
            <option key={c.valor} value={c.valor}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="fld">
        <label htmlFor="descricao">Descrição</label>
        <textarea id="descricao" name="descricao" defaultValue={produto?.descricao} />
      </div>

      <div className="fld">
        <label htmlFor="specs">Specs (uma por linha)</label>
        <textarea id="specs" name="specs" defaultValue={produto?.specs} placeholder={"Inox 304\nSolda sanitária"} />
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 13 }}>
        <input type="checkbox" name="destaque" defaultChecked={produto?.destaque} />
        Destacar na home ("Realizações")
      </label>

      <div className="fld">
        <label htmlFor="fotos">Fotos</label>
        <input id="fotos" type="file" accept="image/*" multiple onChange={onFiles} disabled={enviando} />
        {enviando && <span className="rnote">Enviando…</span>}
        {erro && <span className="rnote" style={{ color: "var(--red)" }}>{erro}</span>}
        {imagens.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            {imagens.map((url) => (
              // eslint-disable-next-line @next/next/no-img-element
              <div key={url} style={{ position: "relative" }}>
                <img src={url} alt="" width={72} height={72} style={{ objectFit: "cover", border: "1px solid var(--line)" }} />
                <button
                  type="button"
                  onClick={() => removerImagem(url)}
                  style={{ position: "absolute", top: -6, right: -6, background: "var(--ink)", color: "var(--vellum)", borderRadius: "50%", width: 18, height: 18, fontSize: 11, lineHeight: 1 }}
                  aria-label="Remover foto"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-1" disabled={enviando}>
        <span>Salvar</span>
      </button>
    </form>
  );
}
