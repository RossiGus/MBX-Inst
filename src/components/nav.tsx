"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/#fazemos", label: "O que fazemos" },
  { href: "/#processo", label: "Processo" },
  { href: "/produtos", label: "Produtos" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-[var(--pad-x)] py-[13px] transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-vellum/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
            : ""
        }`}
      >
        <Link href="/" className="flex items-center gap-[11px]">
          <span className="text-[23px] font-bold tracking-[-0.03em]">MBX</span>
          <span className="border-l border-line pl-[10px] font-mono text-[9px] uppercase leading-[1.3] tracking-[0.16em] text-muted-ink">
            Aço inox 304
            <br />
            sob medida
          </span>
        </Link>

        <div className="flex items-center gap-[26px]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden font-mono text-[12.5px] tracking-[0.03em] text-ink-2 transition-colors hover:text-brass md:inline"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contato"
            className="hidden border border-ink bg-ink px-[17px] py-[10px] font-mono text-[12.5px] tracking-[0.03em] text-vellum transition-colors hover:bg-ink/90 md:inline"
          >
            Solicitar projeto →
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid h-[42px] w-[42px] place-items-center border border-line text-ink md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        className={`fixed inset-0 z-[55] flex-col justify-center gap-[6px] bg-vellum px-[var(--pad-x)] md:hidden ${
          open ? "flex" : "hidden"
        }`}
      >
        {links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="flex items-baseline gap-[14px] border-b border-line py-[14px] text-[clamp(26px,8vw,38px)] font-semibold tracking-[-0.02em]"
          >
            <span className="font-mono text-[12px] tracking-[0.1em] text-brass">
              0{i + 1}
            </span>
            {l.label}
          </Link>
        ))}
        <Link
          href="/contato"
          onClick={() => setOpen(false)}
          className="mt-[26px] self-start border border-ink bg-ink px-[22px] py-[14px] font-mono text-[14px] text-vellum"
        >
          Solicitar projeto →
        </Link>
        <div className="mt-[18px] self-start">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
