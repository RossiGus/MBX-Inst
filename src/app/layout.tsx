import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { HomeEffects } from "@/components/home-effects";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const description =
  "A MBX projeta, fabrica e instala equipamentos e mobiliário em aço inox 304 para cozinhas industriais. 100% sob medida.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MBX — Aço inox sob medida para cozinhas industriais",
    template: "%s — MBX Aço Inox",
  },
  description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "MBX",
    title: "MBX — Aço inox sob medida para cozinhas industriais",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "MBX — Aço inox sob medida para cozinhas industriais",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HomeEffects />
          <Nav />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}
