"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import type { Produto } from "@/lib/supabase";

const INTERVALO_MS = 6000;

export function ProdutoParallax({ produtos }: { produtos: Produto[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);

  const comImagem = produtos.filter((p) => p.imagens[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (comImagem.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % comImagem.length);
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, [comImagem.length]);

  if (comImagem.length === 0) return null;
  const produto = comImagem[index % comImagem.length];

  return (
    <section className="sec" ref={ref}>
      <div className="wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={produto.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sec-head">
              <div className="lft">
                <span className="tag">Destaque</span>
                <h2>{produto.nome}</h2>
              </div>
              <Link className="btn btn-2" href={`/produtos/${produto.id}`}>
                Ver produto →
              </Link>
            </div>
            <div className="relative mt-[32px] h-[60vh] min-h-[360px] w-full overflow-hidden border border-line">
              <motion.div style={{ scale }} className="relative h-full w-full">
                <Image
                  src={produto.imagens[0]}
                  alt={produto.nome}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  priority={false}
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
