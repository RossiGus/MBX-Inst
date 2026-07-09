"use client";

import { useState } from "react";
import { whatsappUrl } from "@/lib/site";

const tipos = [
  "Cozinha completa",
  "Cocção / linha de fogo",
  "Exaustão / coifas",
  "Bancadas / mobiliário",
  "Refrigeração",
  "Ainda não sei",
];

export function ContactForm() {
  const [nome, setNome] = useState("");
  const [estab, setEstab] = useState("");
  const [fone, setFone] = useState("");
  const [tipo, setTipo] = useState(tipos[0]);
  const [msg, setMsg] = useState("");
  const [errNome, setErrNome] = useState(false);
  const [errFone, setErrFone] = useState(false);
  const [sent, setSent] = useState(false);

  function buildMsg() {
    let t = "Olá, MBX! Gostaria de um projeto.";
    if (nome) t += `\n\nNome: ${nome}`;
    if (estab) t += `\nEstabelecimento: ${estab}`;
    if (fone) t += `\nWhatsApp: ${fone}`;
    t += `\nTipo: ${tipo}`;
    if (msg) t += `\n\nSobre o projeto:\n${msg}`;
    return t;
  }

  function submit() {
    const badNome = !nome.trim();
    const badFone = fone.replace(/\D/g, "").length < 10;
    setErrNome(badNome);
    setErrFone(badFone);
    if (badNome || badFone) return;
    setSent(true);
    window.open(whatsappUrl(buildMsg()), "_blank", "noopener");
  }

  return (
    <div className="req rv">
      <div className="left">
        <span className="tag">Contato</span>
        <h2>Vamos desenhar a sua cozinha.</h2>
        <p>
          Conta o tipo de operação e o espaço. A gente retorna com um caminho de
          projeto e uma estimativa — sem compromisso.
        </p>
        <div className="info">
          <div className="cell"><span className="k">WhatsApp</span><b>(11) 90000-0000</b></div>
          <div className="cell"><span className="k">E-mail</span><b>contato@mbx.com.br</b></div>
          <div className="cell"><span className="k">Fábrica</span><b>São Paulo · SP</b></div>
          <div className="cell"><span className="k">Atende</span><b>Todo o país</b></div>
        </div>
      </div>

      <div className="right">
        <div className="rlab">Preencha a requisição ↓</div>
        <div className="row2">
          <div className={`fld${errNome ? " err" : ""}`}>
            <label htmlFor="nome">Seu nome</label>
            <input id="nome" type="text" placeholder="como te chamamos" autoComplete="name"
              value={nome} onChange={(e) => { setNome(e.target.value); setErrNome(false); }} />
            <span className="fmsg">Informe seu nome</span>
          </div>
          <div className="fld">
            <label htmlFor="estab">Estabelecimento</label>
            <input id="estab" type="text" placeholder="restaurante, hotel, rede…"
              value={estab} onChange={(e) => setEstab(e.target.value)} />
          </div>
        </div>
        <div className="row2">
          <div className={`fld${errFone ? " err" : ""}`}>
            <label htmlFor="fone">WhatsApp</label>
            <input id="fone" type="tel" placeholder="(11) 9…" autoComplete="tel"
              value={fone} onChange={(e) => { setFone(e.target.value); setErrFone(false); }} />
            <span className="fmsg">Informe um WhatsApp para retorno</span>
          </div>
          <div className="fld">
            <label htmlFor="tipo">Tipo de projeto</label>
            <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              {tipos.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="fld">
          <label htmlFor="msg">Sobre o projeto</label>
          <textarea id="msg" placeholder="espaço, medidas aproximadas, prazo, o que precisa resolver…"
            value={msg} onChange={(e) => setMsg(e.target.value)} />
        </div>
        <button className="btn btn-1" type="button" onClick={submit}>
          <span>Enviar pelo WhatsApp →</span>
        </button>
        <p className="rnote">Abre a conversa já preenchida — você revisa antes de mandar.</p>
        {sent && (
          <p className="rnote" style={{ color: "var(--brass)", fontWeight: 500 }}>
            Abrindo o WhatsApp com sua requisição…
          </p>
        )}
      </div>
    </div>
  );
}
