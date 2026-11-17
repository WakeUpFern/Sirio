import Link from "next/link";
import type { ReactNode } from "react";
import { BotonEnlace } from "@/components/ui/boton";
import { Estrella } from "@/components/ui/estrella";
import { VentanaProducto } from "./ventana-producto";
import { MiniBitacora, MiniCola, MiniObjetivo } from "./mini-vistas";

const PASOS = [
  { titulo: "Conoce tu negocio", texto: "Lee tu sitio, redacta una ficha para que la corrijas y te hace tres preguntas como máximo." },
  { titulo: "Acuerdan un objetivo", texto: "Un objetivo a 90 días con una medida clara, partido en pasos semanales." },
  { titulo: "Trabaja por su cuenta", texto: "Cada mañana revisa qué sigue y avanza sin que le escribas." },
  { titulo: "Tú apruebas", texto: "Lo que saldría al público te espera en Hoy. Sirio no publica nada solo." },
];

const BLOQUES = [
  {
    id: "cola",
    etiqueta: "Hoy",
    titulo: "Lo que necesita de ti, primero",
    texto:
      "Una cola de decisiones: piezas por aprobar, preguntas de Sirio y lo que solo una persona puede hacer. Lo demás queda a un lado.",
    vista: <MiniCola />,
    descripcion: "Dos tarjetas de la cola: una pregunta sobre un gancho y una grabación por confirmar.",
  },
  {
    id: "objetivo",
    etiqueta: "Objetivo",
    titulo: "Un objetivo, semana por semana",
    texto: "Sabes cuánto falta y qué toca esta semana. Cada lunes Sirio propone los pasos de la siguiente y tú los aceptas o los cambias.",
    vista: <MiniObjetivo />,
    descripcion: "El objetivo con su avance, 2 de 10, y la semana 3 de 13 marcada.",
  },
  {
    id: "bitacora",
    etiqueta: "Actividad",
    titulo: "Todo lo que hizo, con hora",
    texto: "Qué leyó, qué redactó, qué propuso y qué preguntó. Nada pasa sin que quede a la vista.",
    vista: <MiniBitacora />,
    descripcion: "La bitácora de hoy, con la acción en curso arriba.",
  },
];

function Marca() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-boton text-[18px] font-extrabold tracking-[-0.02em]">
      <Estrella tamano={20} />
      Sirio
    </Link>
  );
}

function Ilustracion({ descripcion, children }: { descripcion: string; children: ReactNode }) {
  return (
    <figure className="m-0">
      <figcaption className="sr-only">{descripcion}</figcaption>
      <div inert aria-hidden="true" className="select-none">
        {children}
      </div>
    </figure>
  );
}

export function Portada() {
  return (
    <div className="bg-superficie text-tinta">
      <header className="sticky top-0 z-20 border-b border-linea bg-superficie">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-8 px-4 sm:px-6">
          <Marca />
          <nav aria-label="Portada" className="hidden flex-1 gap-1 md:flex">
            <BotonEnlace variante="texto" href="#como-trabaja" externo>
              Cómo trabaja
            </BotonEnlace>
            <BotonEnlace variante="texto" href="#cada-dia" externo>
              Qué ves cada día
            </BotonEnlace>
          </nav>
          <div className="ml-auto md:ml-0">
            <BotonEnlace variante="principal" href="/app">
              Abrir la demo
            </BotonEnlace>
          </div>
        </div>
      </header>

      <main>
        <section className="reticula-clara border-b border-linea">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:py-24">
            <div>
              <p className="mono text-[12px] text-tinta-2">Un proyecto de FEBAcode</p>
              <h1 className="mt-4 text-[38px] leading-[1.05] tracking-[-0.035em] sm:text-[52px] xl:text-[58px]">
                Sirio conoce tu negocio, <span className="subrayado-acento">avanza</span> cada semana y tú{" "}
                <span className="subrayado-acento">apruebas</span> lo que sale.
              </h1>
              <p className="mt-6 max-w-[520px] text-[16.5px] leading-relaxed text-tinta-2">
                Es el operador de marketing de FEBAcode. Lee el negocio, acuerda contigo un objetivo a 90 días y trabaja
                hacia él: propone ideas, escribe guiones y deja todo listo para que una persona lo publique.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <BotonEnlace variante="principal" tamano="portada" href="/app">
                  Abrir la demo
                </BotonEnlace>
                <BotonEnlace variante="contorno" tamano="portada" href="#como-trabaja" externo>
                  Cómo trabaja
                </BotonEnlace>
              </div>
              <p className="mono mt-4 text-[11.5px] text-tinta-3">Demo con datos de ejemplo. No necesitas cuenta.</p>
            </div>
            <VentanaProducto />
          </div>
        </section>

        <section id="como-trabaja" className="scroll-mt-16 bg-fondo">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-[30px] tracking-[-0.03em] sm:text-[36px]">Cómo trabaja</h2>
            <p className="mt-2 max-w-[560px] text-[15.5px] text-tinta-2">
              Sirio no es un asistente para todo. Lleva el marketing de un negocio, con un objetivo y tu permiso.
            </p>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PASOS.map((p, i) => (
                <li key={p.titulo} className="rounded-tarjeta border border-linea bg-superficie p-5">
                  <span className="mono text-[13px] font-medium text-acento-texto">0{i + 1}</span>
                  <h3 className="mt-3 text-[17px] tracking-[-0.02em]">{p.titulo}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-tinta-2">{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="cada-dia" className="scroll-mt-16 border-y border-linea">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-[30px] tracking-[-0.03em] sm:text-[36px]">Qué ves cada día</h2>
            <div className="mt-12 space-y-16 lg:space-y-24">
              {BLOQUES.map((b, i) => (
                <div key={b.id} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <p className="mono text-[12px] text-acento-texto">{b.etiqueta}</p>
                    <h3 className="mt-2 text-[24px] tracking-[-0.025em] sm:text-[28px]">{b.titulo}</h3>
                    <p className="mt-3 max-w-[460px] text-[15.5px] leading-relaxed text-tinta-2">{b.texto}</p>
                  </div>
                  <div className="rounded-marco bg-fondo p-4 sm:p-8">
                    <Ilustracion descripcion={b.descripcion}>{b.vista}</Ilustracion>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reticula-clara">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="max-w-[640px] text-[30px] leading-tight tracking-[-0.03em] sm:text-[40px]">
              Abre la demo y mira un martes cualquiera de FEBAcode.
            </h2>
            <div className="mt-8">
              <BotonEnlace variante="principal" tamano="portada" href="/app">
                Abrir la demo
              </BotonEnlace>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-linea">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-6 text-[13px] text-tinta-2 sm:px-6">
          <p className="flex items-center gap-2">
            <Estrella tamano={14} />
            Sirio, un proyecto de FEBAcode
          </p>
          <p className="mono text-[11.5px] text-tinta-3">Maqueta con datos de ejemplo · noviembre de 2026</p>
        </div>
      </footer>
    </div>
  );
}
