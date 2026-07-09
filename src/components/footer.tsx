import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-[var(--sec-y)] border-t border-line bg-kraft">
      <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="border-line px-[var(--pad-x)] py-[22px]">
          <Link href="/" className="text-[26px] font-bold tracking-[-0.03em]">
            MBX
          </Link>
          <div className="mt-[12px] font-mono text-[12.5px] leading-[1.7] text-ink">
            Aço inox sob medida
            <br />
            para cozinhas industriais.
          </div>
        </div>

        <div className="border-l border-line px-[var(--pad-x)] py-[22px]">
          <div className="mb-[9px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-ink">
            Índice
          </div>
          <div className="flex flex-col font-mono text-[12.5px] leading-[1.7]">
            <Link href="/#fazemos" className="hover:text-brass">
              01 · O que fazemos
            </Link>
            <Link href="/#processo" className="hover:text-brass">
              02 · Processo
            </Link>
            <Link href="/produtos" className="hover:text-brass">
              03 · Produtos
            </Link>
            <Link href="/contato" className="hover:text-brass">
              Contato
            </Link>
          </div>
        </div>

        <div className="border-t border-line px-[var(--pad-x)] py-[22px] md:border-l md:border-t-0">
          <div className="mb-[9px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-ink">
            Material
          </div>
          <div className="font-mono text-[12.5px] leading-[1.7] text-ink">
            Aço inox 304
            <br />
            Solda sanitária
            <br />
            Acab. escovado
          </div>
        </div>

        <div className="border-l border-t border-line px-[var(--pad-x)] py-[22px] md:border-t-0">
          <div className="mb-[9px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-ink">
            Contato
          </div>
          <div className="font-mono text-[12.5px] leading-[1.7]">
            <Link href="/contato" className="hover:text-brass">
              {site.phone}
            </Link>
            <br />
            <Link href="/contato" className="hover:text-brass">
              {site.email}
            </Link>
            <br />
            {site.city}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-[16px] border-t border-line px-[var(--pad-x)] py-[14px] font-mono text-[11px] tracking-[0.04em] text-muted-ink">
        <span>© {new Date().getFullYear()} MBX AÇO INOX</span>
        <span>DESENHADO SOB MEDIDA · REV. 2026</span>
      </div>
    </footer>
  );
}
