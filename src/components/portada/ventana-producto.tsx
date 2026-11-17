import { Activity, Building2, Clapperboard, Sun, Target } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { Contador, Etiqueta } from "@/components/ui/etiqueta";
import { Estrella } from "@/components/ui/estrella";
import { Tarjeta } from "@/components/ui/tarjeta";
import { BarraSemanas } from "@/components/objetivo/barra-semanas";
import { Miniatura } from "@/components/contenido/miniatura";
import { IconoAccion } from "@/components/actividad/tipo-accion";

const SECCIONES = [
  { nombre: "Hoy", Icono: Sun, contador: 5 },
  { nombre: "Objetivo", Icono: Target },
  { nombre: "Contenido", Icono: Clapperboard, contador: 2 },
  { nombre: "Actividad", Icono: Activity },
  { nombre: "Negocio", Icono: Building2 },
];

function BarraMini() {
  return (
    <div className="hidden w-[148px] shrink-0 border-r border-linea bg-superficie p-3 sm:block">
      <p className="flex items-center gap-1.5 px-1 text-[13px] font-extrabold">
        <Estrella tamano={14} /> Sirio
      </p>
      <p className="mt-2.5 flex items-center gap-2 px-1 text-[11.5px] font-bold">
        <span className="grid h-5 w-5 place-items-center rounded-chip bg-tinta text-[10px] text-superficie">F</span>
        FEBAcode
      </p>
      <ul className="mt-4 space-y-0.5">
        {SECCIONES.map(({ nombre, Icono, contador }, i) => (
          <li
            key={nombre}
            className={`relative flex h-7 items-center gap-2 rounded-chip px-2 text-[11.5px] font-bold ${
              i === 0 ? "bg-acento-suave text-tinta" : "text-tinta-2"
            }`}
          >
            {i === 0 ? <span className="absolute inset-y-1.5 left-0 w-[3px] bg-acento" /> : null}
            <Icono size={13} strokeWidth={1.75} aria-hidden />
            <span className="flex-1">{nombre}</span>
            {contador ? <Contador valor={contador} tono="fuerte" /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** La vista Hoy reducida, hecha con los mismos componentes de la app. Es una ilustración. */
export function VentanaProducto() {
  return (
    <figure className="m-0">
      <figcaption className="sr-only">
        Vista Hoy de Sirio: una pieza espera aprobación, el objetivo va en la semana 3 de 13 y Sirio escribe un guion.
      </figcaption>
      <Tarjeta as="div" variante="marco" relleno="ninguno" className="overflow-hidden">
        <div inert aria-hidden="true" className="flex select-none text-left">
          <BarraMini />
          <div className="min-w-0 flex-1 bg-fondo p-4">
            <p className="text-[17px] font-extrabold tracking-[-0.02em]">Hoy</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-tinta-2">
              <Estrella tamano={11} trabajando />
              Estoy escribiendo el guion de «Reunión que pudo ser un correo»
            </p>

            <div className="mt-3 flex items-center gap-3 rounded-boton border border-linea bg-superficie px-3 py-2">
              <Target size={14} strokeWidth={1.75} className="shrink-0 text-acento-texto" />
              <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold">10 conversaciones con posibles clientes</span>
              <span className="mono shrink-0 text-[10.5px] text-tinta-3">2 de 10</span>
              <span className="hidden w-20 shrink-0 md:block">
                <BarraSemanas actual={3} total={13} />
              </span>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <div className="rounded-tarjeta border border-linea bg-superficie p-3">
                <Etiqueta tono="atencion" forma="chip">
                  Aprobar pieza
                </Etiqueta>
                <p className="mt-1.5 text-[12.5px] font-extrabold leading-snug">El intern y el deploy del viernes</p>
                <p className="text-[11px] text-tinta-2">TikTok · Sketch vertical · 45 s</p>
                <div className="mt-2.5 flex gap-2.5">
                  <Miniatura pieza={{ titulo: "El intern y el deploy del viernes", canal: "TikTok" }} />
                  <p className="text-[11px] leading-snug text-tinta-2">
                    Viernes, 4:55 p. m. Un intern, un botón de deploy y cero fe en el equipo.
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Boton variante="solido">Aprobar</Boton>
                  <Boton variante="texto">Descartar</Boton>
                </div>
              </div>
              <div className="hidden space-y-2 rounded-tarjeta border border-linea bg-superficie p-3 md:block">
                <p className="text-[11.5px] font-extrabold">Hecho desde tu visita</p>
                {[
                  { tipo: "propuso" as const, texto: "Pasos de la semana 4", hora: "09:40" },
                  { tipo: "pregunto" as const, texto: "Gancho del sketch del cliente", hora: "09:12" },
                  { tipo: "redacto" as const, texto: "Post de LinkedIn", hora: "08:31" },
                ].map((a) => (
                  <p key={a.hora} className="flex items-center gap-2 text-[11px] leading-tight">
                    <IconoAccion tipo={a.tipo} />
                    <span className="min-w-0 flex-1">{a.texto}</span>
                    <span className="mono text-[10px] text-tinta-3">{a.hora}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Tarjeta>
    </figure>
  );
}
