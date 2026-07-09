"use client";

import { useEffect } from "react";

// Porta o script de animação do design original: reveal no scroll,
// contadores das métricas, "plot" da planta SVG e parallax do herói.
// ponytail: JS vanilla comprovado do original; Framer Motion fica para os
// componentes de Skiper/Vengeance, não para re-fazer o que já funciona.
export function HomeEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const doc = document;

    const plan = doc.getElementById("plan");
    if (plan) {
      if (!reduce) requestAnimationFrame(() => plan.classList.add("go"));
      else plan.classList.add("go");
    }

    function numNode(el: Element): Text {
      const f = el.firstChild;
      if (f && f.nodeType === 3) return f as Text;
      const t = doc.createTextNode("0");
      el.insertBefore(t, el.firstChild);
      return t;
    }
    function runCount(el: Element) {
      const target = parseFloat(el.getAttribute("data-count") || "0") || 0;
      const node = numNode(el);
      const start = performance.now();
      const dur = 1400;
      if (reduce) {
        node.nodeValue = String(target);
        return;
      }
      (function tick(now: number) {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        node.nodeValue = String(Math.round(target * e));
        if (p < 1) requestAnimationFrame(tick);
        else node.nodeValue = String(target);
      })(start);
    }

    const rv = Array.from(doc.querySelectorAll(".rv"));
    const draws = Array.from(doc.querySelectorAll(".draw"));
    const phases = Array.from(doc.querySelectorAll(".phase"));
    let counted = false;
    const observers: IntersectionObserver[] = [];

    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
      );
      [...rv, ...draws, ...phases].forEach((el) => io.observe(el));
      observers.push(io);

      const cio = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting && !counted) {
              counted = true;
              doc.querySelectorAll(".n[data-count]").forEach(runCount);
              cio.disconnect();
            }
          }),
        { threshold: 0.4 }
      );
      const m = doc.querySelector(".metric-line");
      if (m) cio.observe(m);
      observers.push(cio);
    } else {
      [...rv, ...draws, ...phases].forEach((el) => el.classList.add("in"));
      doc
        .querySelectorAll(".n[data-count]")
        .forEach((el) => (numNode(el).nodeValue = el.getAttribute("data-count")));
    }

    let onMove: ((ev: PointerEvent) => void) | undefined;
    let onLeave: (() => void) | undefined;
    const hero = doc.querySelector<HTMLElement>(".hero");
    if (plan && hero && !reduce && window.matchMedia("(pointer:fine)").matches) {
      onMove = (ev: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        const cx = (ev.clientX - r.left) / r.width - 0.5;
        const cy = (ev.clientY - r.top) / r.height - 0.5;
        plan.style.transform = `perspective(1000px) rotateY(${(cx * 3).toFixed(
          2
        )}deg) rotateX(${(-cy * 3).toFixed(2)}deg)`;
      };
      onLeave = () => {
        plan.style.transform = "";
      };
      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      if (hero && onMove) hero.removeEventListener("pointermove", onMove);
      if (hero && onLeave) hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
