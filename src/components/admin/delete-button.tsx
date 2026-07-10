"use client";

import { useTransition } from "react";
import { deleteProduto } from "@/app/admin/actions";

export function DeleteButton({ id, nome }: { id: string; nome: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="chip"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Apagar "${nome}"? Não dá para desfazer.`)) return;
        startTransition(() => deleteProduto(id));
      }}
    >
      {pending ? "Apagando…" : "Apagar"}
    </button>
  );
}
