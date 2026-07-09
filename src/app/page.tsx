import Link from "next/link";

export default function Home() {
  return (
    <section className="wrap pb-[var(--sec-y)] pt-[clamp(112px,15vh,168px)]">
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-brass">
        Fábrica de aço inox · Cozinhas industriais
      </span>

      <h1 className="mt-[24px] max-w-[14ch] text-[clamp(36px,7.6vw,94px)] font-bold leading-[0.98] tracking-[-0.03em]">
        Sua cozinha, <span className="text-brass">cotada</span>
        <br />
        <span className="font-normal text-ink-2">ao milímetro.</span>
      </h1>

      <p className="mt-[34px] max-w-[46ch] text-[clamp(15px,1.7vw,18.5px)] text-ink-2">
        A MBX <b className="font-semibold text-ink">projeta, fabrica e instala</b>{" "}
        equipamentos e mobiliário em aço inox 304 para cozinhas que trabalham no
        limite. Cada peça nasce da medida real do seu espaço — nada de catálogo
        genérico.
      </p>

      <div className="mt-[26px] flex flex-wrap gap-[12px]">
        <Link
          href="/contato"
          className="inline-flex items-center gap-[9px] border border-ink bg-ink px-[22px] py-[14px] font-mono text-[13.5px] font-medium tracking-[0.02em] text-vellum transition-transform hover:-translate-y-[2px]"
        >
          Solicitar projeto
        </Link>
        <Link
          href="/produtos"
          className="inline-flex items-center gap-[9px] border border-line px-[22px] py-[14px] font-mono text-[13.5px] font-medium tracking-[0.02em] text-ink transition-[transform,border-color] hover:-translate-y-[2px] hover:border-ink"
        >
          Ver produtos
        </Link>
      </div>

      <p className="mt-[64px] font-mono text-[11px] uppercase tracking-[0.13em] text-muted-ink">
        {/* Fase 1: recriar as seções completas da home (métricas, legenda, processo, realizações, FAQ, contato). */}
        Home completa em construção — Fase 1
      </p>
    </section>
  );
}
