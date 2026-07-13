import Link from "next/link";
import { getProdutosDestaque } from "@/lib/produtos";
import { ProdutoParallax } from "@/components/produto-parallax";

export const dynamic = "force-dynamic";

export default async function Home() {
  const produtosDestaque = await getProdutosDestaque();
  return (
    <>
      {/* HERO */}
      <header className="hero" id="top">
        <span className="crop tl" />
        <span className="crop tr" />
        <div className="wrap">
          <div className="hero-top">
            <span className="tag rv">Fábrica de aço inox · Cozinhas industriais</span>
            <div className="rev rv" data-d="1">
              PROJETO MBX · FOLHA 01/01
              <br />
              <b>ESC 1:20 · REV. 2026</b> · MAT. AÇO 304
            </div>
          </div>

          <h1 className="rv" data-d="1">
            Sua cozinha, <span className="b">cotada</span>
            <br />
            <span className="thin">ao milímetro.</span>
          </h1>

          <div className="hero-dim draw rv" data-d="2">
            <div className="dim">
              <span className="ln l">
                <span className="ah" />
              </span>
              <span className="fig">100% SOB MEDIDA — DO DESENHO À INSTALAÇÃO</span>
              <span className="ln r">
                <span className="ah" />
              </span>
            </div>
          </div>

          <div className="hero-body">
            <div className="rv" data-d="3">
              <p className="hero-lede">
                A MBX <b>projeta, fabrica e instala</b> equipamentos e mobiliário
                em aço inox 304 para cozinhas que trabalham no limite. Cada peça
                nasce da medida real do seu espaço — nada de catálogo genérico.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-1" href="/contato">
                  <span>Solicitar projeto</span>
                </Link>
                <Link className="btn btn-2" href="/produtos">
                  Ver produtos
                </Link>
              </div>
            </div>

            <div className="plan-wrap rv" data-d="2">
              <svg
                className="plan"
                id="plan"
                viewBox="0 0 400 400"
                role="img"
                aria-label="Vista em planta de uma cozinha industrial, cotada"
              >
                <rect className="stroke drawline" x="40" y="40" width="304" height="300" pathLength={1} />
                <Link href="/produtos?categoria=exaustao" aria-label="Ver produtos de exaustão">
                  <g className="fade d1">
                    <rect className="stroke thin fillk" x="56" y="52" width="176" height="22" />
                    <text className="lbl" x="60" y="66">COIFA</text>
                  </g>
                </Link>
                <Link href="/produtos?categoria=coccao" aria-label="Ver produtos de cocção">
                  <g className="fade d2">
                    <rect className="stroke thin fillk" x="52" y="256" width="88" height="68" />
                    <text className="lbl" x="60" y="292">FOGÃO</text>
                    <rect className="stroke thin fillk" x="150" y="256" width="70" height="68" />
                    <text className="lbl" x="158" y="292">CHAPA</text>
                  </g>
                </Link>
                <g className="fade d3">
                  <rect className="stroke thin fillk" x="150" y="140" width="112" height="58" />
                  <text className="lbl" x="158" y="172">PASS</text>
                </g>
                <Link href="/produtos?categoria=mobiliario" aria-label="Ver produtos de mobiliário">
                  <g className="fade d4">
                    <rect className="stroke thin fillk" x="300" y="92" width="44" height="140" />
                    <text className="lbl" x="306" y="120">BANC.</text>
                    <rect className="stroke thin fillk" x="300" y="256" width="44" height="68" />
                    <text className="lbl" x="306" y="292">CUBA</text>
                  </g>
                </Link>
                <g className="fade d5">
                  <line className="dimc" x1="40" y1="360" x2="344" y2="360" />
                  <line className="dimc" x1="40" y1="352" x2="40" y2="368" />
                  <line className="dimc" x1="344" y1="352" x2="344" y2="368" />
                  <rect x="168" y="352" width="48" height="16" fill="#f7f5ef" />
                  <text className="dlbl" x="172" y="364">4200mm</text>
                  <circle className="redc" cx="322" cy="290" r="11" fill="#f7f5ef" />
                  <text className="redf" x="318" y="294">A</text>
                  <line className="redc" x1="333" y1="290" x2="366" y2="262" />
                  <text className="redf" x="352" y="256">DET. A</text>
                </g>
              </svg>
              <div className="block plan-carimbo">
                <div className="cell two">
                  <div><span className="k">Acabamento</span><span className="v">Escovado</span></div>
                  <div><span className="k">Solda</span><span className="v"><span className="b">Sanitária</span></span></div>
                </div>
                <div className="cell two">
                  <div><span className="k">Liga</span><span className="v">Inox 304</span></div>
                  <div><span className="k">Norma</span><span className="v">Vigilância</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {produtosDestaque.length > 0 && <ProdutoParallax produtos={produtosDestaque} />}

      {/* METRICS */}
      <section className="wrap">
        <div className="metrics rv">
          <div className="metric-line">
            <div className="metric"><span className="tick" /><div className="n" data-count="18">0</div><div className="cap">anos fabricando<br />inox sob medida</div></div>
            <div className="metric"><span className="tick" /><div className="n" data-count="640">0</div><div className="cap">cozinhas equipadas<br />de ponta a ponta</div></div>
            <div className="metric"><span className="tick" /><div className="n" data-count="12">0<span className="suf">mil m²</span></div><div className="cap">bancada e mobiliário<br />instalados</div></div>
            <div className="metric"><span className="tick" /><div className="n" data-count="9">0<span className="suf">UF</span></div><div className="cap">estados atendidos<br />em todo o país</div></div>
          </div>
        </div>
      </section>

      {/* LEGENDA */}
      <section className="sec" id="fazemos">
        <div className="wrap">
          <div className="sec-head">
            <div className="lft">
              <span className="tag rv">Lista de componentes</span>
              <h2 className="rv" data-d="1">Uma cozinha inteira,<br />resolvida em quatro linhas.</h2>
              <p className="rv" data-d="2">Da linha de fogo à última cuba. A MBX cobre o ciclo completo — sem terceirizar a parte que importa.</p>
            </div>
            <div className="idx rv" data-d="2">SEÇÃO <b>01</b> / 03</div>
          </div>
          <div className="legend rv" data-d="1">
            <div className="lrow"><div className="item">01 · CCÇ</div><div className="desc"><h3>Cocção</h3><p>Fogões, chapas, char-broilers e fritadeiras dimensionados para o cardápio e o ritmo do salão.</p></div><div className="spec">Fogões <b>4–12 bocas</b><br />Chapas · banho-maria<br />Fornos combinados</div></div>
            <div className="lrow"><div className="item">02 · EXA</div><div className="desc"><h3>Exaustão</h3><p>Captação que aguenta o pico do serviço e passa na vigilância sanitária sem improviso.</p></div><div className="spec">Coifas · dutos<br /><b>Lavadores de gases</b><br />Reposição de ar</div></div>
            <div className="lrow"><div className="item">03 · MOB</div><div className="desc"><h3>Mobiliário</h3><p>Bancadas, cubas e prateleiras em inox 304 com solda contínua — higiene real, sem frestas.</p></div><div className="spec">Bancadas<br /><b>Cubas soldadas</b><br />Estantes · pass-through</div></div>
            <div className="lrow"><div className="item">04 · REF</div><div className="desc"><h3>Refrigeração</h3><p>Câmaras, balcões e mesas frias integradas ao layout — não empurradas por cima dele.</p></div><div className="spec">Câmaras frigoríficas<br /><b>Mesas refrigeradas</b><br />Balcões · pass frio</div></div>
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="sec" id="processo">
        <div className="wrap">
          <div className="sec-head">
            <div className="lft">
              <span className="tag rv">Sequência de execução</span>
              <h2 className="rv" data-d="1">Um processo,<br />não uma venda.</h2>
              <p className="rv" data-d="2">Sob medida começa antes do aço: medindo o seu espaço, o seu fluxo e o seu cardápio.</p>
            </div>
            <div className="idx rv" data-d="2">SEÇÃO <b>02</b> / 03</div>
          </div>
          <div className="proc rv" data-d="1">
            <div className="phase"><div className="no">01</div><div className="pln"><i /></div><h3>Projeto</h3><p>Visita técnica, medição e desenho do layout. Você aprova antes de qualquer corte de chapa.</p></div>
            <div className="phase"><div className="no">02</div><div className="pln"><i /></div><h3>Fabricação</h3><p>Produção na nossa fábrica, com controle de solda e acabamento sanitário peça a peça.</p></div>
            <div className="phase"><div className="no">03</div><div className="pln"><i /></div><h3>Instalação</h3><p>Equipe própria monta e nivela no local. A cozinha sai pronta para operar, não em caixas.</p></div>
            <div className="phase"><div className="no">04</div><div className="pln"><i /></div><h3>Assistência</h3><p>Suporte, manutenção e ajustes depois da entrega. Relação que não termina na nota fiscal.</p></div>
          </div>
        </div>
      </section>

      {/* REALIZAÇÕES */}
      <section className="sec" id="realizacoes">
        <div className="wrap">
          <div className="sec-head">
            <div className="lft">
              <span className="tag rv">Pranchas entregues</span>
              <h2 className="rv" data-d="1">Cozinhas que já rodam<br />com aço MBX.</h2>
              <p className="rv" data-d="2">Restaurantes, redes, hotéis e operações de alto volume. Cada projeto é a prova de que sob medida não é slogan.</p>
            </div>
            <div className="idx rv" data-d="2">SEÇÃO <b>03</b> / 03</div>
          </div>
          <div className="sheets">
            <article className="sheet rv"><div className="plate"><span className="co">A</span><span className="ptype">Restaurante contemporâneo</span></div><div className="pname">Cozinha completa — 220 lugares</div><div className="strip"><div><div className="k">Local</div><div className="val">Jardins·SP</div></div><div><div className="k">Esc</div><div className="val">1:20</div></div><div><div className="k">Ano</div><div className="val">2024</div></div></div></article>
            <article className="sheet rv" data-d="1"><div className="plate"><span className="co">B</span><span className="ptype">Rede · fast-casual</span></div><div className="pname">Linha padrão · 6 unidades</div><div className="strip"><div><div className="k">Local</div><div className="val">Grande SP</div></div><div><div className="k">Esc</div><div className="val">1:25</div></div><div><div className="k">Ano</div><div className="val">2023</div></div></div></article>
            <article className="sheet rv" data-d="2"><div className="plate"><span className="co">C</span><span className="ptype">Hotel · cozinha central</span></div><div className="pname">Produção + banquetes</div><div className="strip"><div><div className="k">Local</div><div className="val">Litoral·SP</div></div><div><div className="k">Esc</div><div className="val">1:20</div></div><div><div className="k">Ano</div><div className="val">2023</div></div></div></article>
            <article className="sheet rv"><div className="plate"><span className="co">D</span><span className="ptype">Dark kitchen</span></div><div className="pname">8 estações independentes</div><div className="strip"><div><div className="k">Local</div><div className="val">Pinheiros</div></div><div><div className="k">Esc</div><div className="val">1:15</div></div><div><div className="k">Ano</div><div className="val">2024</div></div></div></article>
            <article className="sheet rv" data-d="1"><div className="plate"><span className="co">E</span><span className="ptype">Padaria industrial</span></div><div className="pname">Bancadas + câmara de fermentação</div><div className="strip"><div><div className="k">Local</div><div className="val">Campinas</div></div><div><div className="k">Esc</div><div className="val">1:20</div></div><div><div className="k">Ano</div><div className="val">2022</div></div></div></article>
            <article className="sheet rv" data-d="2"><div className="plate"><span className="co">F</span><span className="ptype">Cozinha hospitalar</span></div><div className="pname">Fluxo sanitário completo</div><div className="strip"><div><div className="k">Local</div><div className="val">ABC·SP</div></div><div><div className="k">Esc</div><div className="val">1:20</div></div><div><div className="k">Ano</div><div className="val">2023</div></div></div></article>
          </div>
        </div>
      </section>

      {/* PARECERES */}
      <section className="sec" id="pareceres">
        <div className="wrap">
          <div className="sec-head">
            <div className="lft">
              <span className="tag rv">Pareceres de obra</span>
              <h2 className="rv" data-d="1">Quem opera todo dia<br />em cima do nosso aço.</h2>
              <p className="rv" data-d="2">Depoimentos de quem contratou o ciclo completo — projeto, fabricação e instalação.</p>
            </div>
            <div className="idx rv" data-d="2">ANEXO <b>A</b></div>
          </div>
          <div className="quotes">
            {/* Fase 5: substituir pelos depoimentos reais dos clientes da MBX */}
            <div className="quote rv"><p>A cozinha abriu <b>na data combinada</b> e a vigilância aprovou de primeira. O desenho aproveitou cada centímetro de um espaço difícil.</p><div className="who"><span className="nm">Nome do cliente</span><span className="rl">Sócio · <b>Restaurante, SP</b></span></div></div>
            <div className="quote rv" data-d="1"><p>Padronizaram <b>seis unidades</b> com a mesma linha. Hoje qualquer cozinheiro roda em qualquer loja sem readaptação.</p><div className="who"><span className="nm">Nome do cliente</span><span className="rl">Diretor de operações · <b>Rede fast-casual</b></span></div></div>
            <div className="quote rv" data-d="2"><p>Três anos de uso pesado, banquete atrás de banquete, e <b>zero fresta, zero ferrugem</b>. Quando precisamos de ajuste, a equipe deles veio.</p><div className="who"><span className="nm">Nome do cliente</span><span className="rl">Chef executivo · <b>Hotel, litoral SP</b></span></div></div>
          </div>
        </div>
      </section>

      {/* MID CTA */}
      <section className="wrap">
        <div className="band rv">
          <div className="bt"><span className="tag">Requisição de projeto</span><h3>Tem um espaço e uma planta na cabeça? Manda a medida.</h3></div>
          <Link className="btn btn-1" href="/contato"><span>Começar um projeto →</span></Link>
        </div>
      </section>

      {/* NOTAS */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><div className="lft"><span className="tag rv">Notas do projeto</span><h2 className="rv" data-d="1">O que está por baixo<br />do acabamento.</h2></div></div>
          <div className="notes rv" data-d="1">
            <div className="note"><div className="nn">N1</div><div><h3>Inox 304 de verdade</h3><p>Chapa certificada, espessura correta para o uso. Sem substituição por liga inferior no meio do caminho.</p></div></div>
            <div className="note"><div className="nn">N2</div><div><h3>Solda sanitária contínua</h3><p>Junções lisas, sem frestas que acumulam gordura e bactéria. Passa na fiscalização e limpa fácil.</p></div></div>
            <div className="note"><div className="nn">N3</div><div><h3>Dentro das normas</h3><p>Projetos alinhados às exigências da vigilância sanitária e de segurança para operação comercial.</p></div></div>
            <div className="note"><div className="nn">N4</div><div><h3>Fabricação própria</h3><p>Fábrica MBX do início ao fim — controle de prazo e de qualidade sem depender de terceiros.</p></div></div>
            <div className="note"><div className="nn">N5</div><div><h3>Instalação por equipe própria</h3><p>Quem projeta acompanha quem instala. Menos ruído, menos retrabalho, cozinha pronta pra operar.</p></div></div>
            <div className="note"><div className="nn">N6</div><div><h3>Garantia e assistência</h3><p>Suporte contínuo após a entrega, com manutenção ao longo da vida do equipamento.</p></div></div>
          </div>
        </div>
      </section>

      {/* MEMORIAL / FAQ */}
      <section className="sec" id="memorial">
        <div className="wrap">
          <div className="sec-head">
            <div className="lft">
              <span className="tag rv">Memorial descritivo</span>
              <h2 className="rv" data-d="1">Perguntas de quem<br />está começando um projeto.</h2>
            </div>
            <div className="idx rv" data-d="2">ANEXO <b>B</b></div>
          </div>
          <div className="faq rv" data-d="1">
            <details><summary><span className="qn">Q·01</span><h3>Quanto tempo leva do primeiro contato à cozinha instalada?</h3><span className="pm">+</span></summary><div className="ans"><p>Depende do porte, mas o fluxo típico é: visita técnica e projeto em 1–2 semanas, fabricação em 3–6 semanas e instalação em poucos dias. Você recebe o cronograma junto com o orçamento, antes de fechar.</p></div></details>
            <details><summary><span className="qn">Q·02</span><h3>O orçamento e a visita técnica têm custo?</h3><span className="pm">+</span></summary><div className="ans"><p>Não. A gente visita, mede, entende a operação e retorna com proposta e estimativa sem compromisso. Você só decide depois de ver o desenho e o valor.</p></div></details>
            <details><summary><span className="qn">Q·03</span><h3>Vocês atendem fora de São Paulo?</h3><span className="pm">+</span></summary><div className="ans"><p>Sim. A fábrica fica em São Paulo, mas projetamos e instalamos em todo o país — já entregamos em 9 estados. A logística de transporte e instalação entra no planejamento do projeto.</p></div></details>
            <details><summary><span className="qn">Q·04</span><h3>Posso contratar só uma parte — uma bancada, uma coifa?</h3><span className="pm">+</span></summary><div className="ans"><p>Pode. Fazemos desde a cozinha completa até uma peça única sob medida. O processo é o mesmo: medimos, desenhamos, você aprova e a gente fabrica.</p></div></details>
            <details><summary><span className="qn">Q·05</span><h3>Que garantia acompanha o equipamento?</h3><span className="pm">+</span></summary><div className="ans"><p>Todo projeto sai com garantia de fabricação e assistência da nossa própria equipe — quem soldou é quem atende. Os prazos exatos constam na proposta, por tipo de equipamento.</p></div></details>
          </div>
        </div>
      </section>
    </>
  );
}
