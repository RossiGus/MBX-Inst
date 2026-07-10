// Dados do site centralizados.
// ATENÇÃO: os valores abaixo ainda são os do arquivo original (fictícios).
// Substituir pelos reais da MBX na Fase 5.
export const site = {
  name: "MBX",
  tagline: "Aço inox 304 sob medida",
  whatsapp: "5511900000000", // Fase 5: número real (formato internacional, só dígitos)
  phone: "(11) 90000-0000",
  email: "contato@mbx.com.br",
  city: "São Paulo · SP",
  serves: "Todo o país",
  // Fase 5: trocar pela URL final (domínio próprio ou *.vercel.app) assim que o deploy existir.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mbx.com.br",
} as const;

/** Monta um link do WhatsApp com mensagem pré-preenchida. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
