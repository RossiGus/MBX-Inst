import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contato — MBX Aço Inox",
  description:
    "Fale com a MBX sobre seu projeto de cozinha industrial em aço inox 304. Visita, medição e orçamento sem compromisso.",
};

export default function ContatoPage() {
  return (
    <section className="sec" id="contato" style={{ paddingTop: "clamp(112px,15vh,168px)" }}>
      <div className="wrap">
        <ContactForm />
      </div>
    </section>
  );
}
