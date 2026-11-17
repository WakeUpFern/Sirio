"use client";

import { ArrowUp } from "lucide-react";
import { BotonEnlace } from "@/components/ui/boton";
import { Tarjeta } from "@/components/ui/tarjeta";
import { IconoAccion, EtiquetaPaso } from "@/components/actividad/tipo-accion";
import { RESULTADOS } from "@/lib/data";
import { useMaqueta } from "@/lib/store";

/** Lo que Sirio produjo desde la última visita. */
export function HechoReciente() {
  const { acciones } = useMaqueta();
  const hoy = acciones.filter((a) => a.dia === "hoy").slice(0, 5);
  return (
    <Tarjeta
      titulo="Hecho desde tu última visita"
      extra={<BotonEnlace variante="texto" href="/app/actividad">Ver todo</BotonEnlace>}
    >
      {hoy.length === 0 ? (
        <p className="text-[13px] text-tinta-2">Todavía nada hoy. Lo que haga aparece aquí.</p>
      ) : (
        <ul className="space-y-3">
          {hoy.map((a) => (
            <li key={a.id} className="flex items-start gap-3">
              <IconoAccion tipo={a.tipo} />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] leading-snug">{a.texto}</span>
                <span className="mono mt-0.5 block text-tinta-3">{a.hora}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </Tarjeta>
  );
}

/** Los pasos de la semana con su estado. */
export function EstaSemana() {
  const { pasos, objetivo } = useMaqueta();
  return (
    <Tarjeta
      titulo="Esta semana"
      extra={<span className="mono text-tinta-3">S{objetivo.semanaActual} de {objetivo.totalSemanas}</span>}
    >
      <ul className="space-y-3">
        {pasos.map((p) => (
          <li key={p.id} className="space-y-1.5">
            <p className="text-[13px] leading-snug">{p.texto}</p>
            <p className="flex items-center gap-2 text-[12px] text-tinta-3">
              <EtiquetaPaso estado={p.estado} />
              {p.responsable}
            </p>
          </li>
        ))}
      </ul>
    </Tarjeta>
  );
}

/** Tres cifras pequeñas con su cambio respecto a la semana anterior. */
export function Resultados() {
  return (
    <Tarjeta titulo="Resultados" extra={<span className="text-[12px] text-tinta-3">vs. semana pasada</span>}>
      <dl className="space-y-3">
        {RESULTADOS.map((r) => (
          <div key={r.nombre} className="flex items-baseline justify-between gap-3">
            <dt className="text-[13px] text-tinta-2">{r.nombre}</dt>
            <dd className="flex shrink-0 items-baseline gap-2">
              <span className="mono text-[17px] font-medium text-tinta">{r.valor}</span>
              <span className="mono inline-flex items-center gap-0.5 text-tinta-3">
                <ArrowUp size={11} strokeWidth={2} aria-hidden="true" />
                <span className="sr-only">sube</span>
                {r.cambio}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 border-t border-linea pt-3 text-[12px] text-tinta-3">
        Las registra el equipo. Sirio todavía no lee redes ni el sitio.
      </p>
    </Tarjeta>
  );
}
