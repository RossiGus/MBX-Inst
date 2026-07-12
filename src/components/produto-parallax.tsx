"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Produto } from "@/lib/supabase";

export function ProdutoParallax({ produto }: { produto: Produto }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);

  const imagem = produto.imagens[0];
  if (!imagem) return null;

  return (
    <section className="sec" ref={ref}>
      <div className="wrap">
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
              src={imagem}
              alt={produto.nome}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
