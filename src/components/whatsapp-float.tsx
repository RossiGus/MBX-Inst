"use client";

import { whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl("Olá, MBX! Gostaria de falar sobre um projeto.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-[20px] right-[20px] z-[70] inline-flex items-center gap-[10px] bg-ink px-[17px] py-[12px] font-mono text-[12.5px] tracking-[0.03em] text-vellum shadow-[0_16px_32px_-14px_rgba(28,30,32,0.55)] transition-transform hover:-translate-y-[3px]"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-brass-2">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m5.8 14.01c-.25.7-1.44 1.33-1.98 1.38-.53.05-.99.24-3.32-.69-2.8-1.11-4.6-3.97-4.74-4.15-.14-.18-1.13-1.5-1.13-2.86s.71-2.03.96-2.31c.25-.27.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.85 2.07.92 2.22.07.14.11.31.02.5-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.93 1.94 1.22 2.22 1.36.28.14.44.12.6-.07.16-.18.69-.8.87-1.08.18-.28.37-.23.62-.14.25.09 1.6.76 1.87.9.28.14.46.21.53.32.07.11.07.64-.18 1.34" />
      </svg>
      <span className="max-[480px]:hidden">WhatsApp</span>
    </a>
  );
}
