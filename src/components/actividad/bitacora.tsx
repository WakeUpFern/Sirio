"use client";

import { Estrella } from "@/components/ui/estrella";
import { Tarjeta } from "@/components/ui/tarjeta";
import { EnlaceResultado } from "@/components/marco/enlace-resultado";
import { EstadoVacio } from "@/components/marco/estado-vacio";
import { Boton } from "@/components/ui/boton";
import { DIAS, TRABAJO_ACTUAL } from "@/lib/data-actividad";
import { useMaqueta } from "@/lib/store";
import type { TipoAccion } from "@/lib/tipos";
import { IconoAccion, TIPOS_ACCION } from "./tipo-accion";

function Filtros({ tipo, onCambio }: { tipo: TipoAccion | "todo"; onCambio: (t: TipoAccion | "todo") => void }) {
  const opciones = [{ valor: "todo" as const, nombre: "Todo" }, ...TIPOS_ACCION];
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
      {opciones.map((o) => {
        const activo = o.valor === tipo;
        return (
          <button
            key={o.valor}
            type="button"
            aria-pressed={activo}
            onClick={() => onCambio(o.valor)}
            className={`flex h-9 items-center rounded-boton border px-3 text-[13px] font-bold transicion ${
              activo ? "border-acento bg-acento-suave text-tinta" : "border-linea bg-superficie text-tinta-2 hover:text-tinta"
            }`}
          >
            {o.nombre}
          </button>
        );
      })}
    </div>
  );
}

/** Todo lo que Sirio hizo, agrupado por día. Si trabaja, la primera fila es la acción en curso. */
export function Bitacora({ tipo, onFiltrar }: { tipo: TipoAccion | "todo"; onFiltrar: (t: TipoAccion | "todo") => void }) {
  const { acciones, pausado, abrirHilo } = useMaqueta();
  const visibles = acciones.filter((a) => tipo === "todo" || a.tipo === tipo);
  const enCurso = !pausado && (tipo === "todo" || tipo === "redacto");
  const dias = Object.keys(DIAS).filter((d) => visibles.some((a) => a.dia === d) || (d === "hoy" && enCurso));

  return (
    <div className="space-y-5">
      <Filtros tipo={tipo} onCambio={onFiltrar} />
      {dias.length === 0 ? (
        <EstadoVacio
          titulo="Nada de este tipo todavía"
          texto="Cambia el filtro o pídele algo a Sirio en el panel; lo que haga quedará registrado aquí."
          accion={
            <Boton variante="contorno" onClick={() => onFiltrar("todo")}>
              Ver todo
            </Boton>
          }
        />
      ) : (
        dias.map((d) => (
          <Tarjeta key={d} relleno="ninguno" etiquetaAria={DIAS[d]}>
            <h2 className="etiqueta-grupo border-b border-linea px-5 py-3">{DIAS[d]}</h2>
            <ul className="divide-y divide-linea">
              {d === "hoy" && enCurso ? (
                <li className="flex items-center gap-4 bg-acento-suave px-5 py-2.5">
                  <span className="mono w-12 shrink-0 text-acento-texto">ahora</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-chip bg-superficie">
                    <Estrella tamano={15} trabajando etiqueta="Trabajando" />
                  </span>
                  <span className="min-w-0 flex-1 text-[13.5px] font-semibold">{TRABAJO_ACTUAL.texto}</span>
                  <Boton variante="texto" onClick={() => abrirHilo(TRABAJO_ACTUAL.hiloId)}>
                    Abrir hilo
                  </Boton>
                </li>
              ) : null}
              {visibles
                .filter((a) => a.dia === d)
                .map((a) => (
                  <li key={a.id} className="aparece flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-2.5">
                    <span className="mono w-12 shrink-0 text-tinta-3">{a.hora}</span>
                    <IconoAccion tipo={a.tipo} />
                    <span className="min-w-0 flex-1 basis-[220px] text-[13.5px]">{a.texto}</span>
                    {a.enlace ? <EnlaceResultado enlace={a.enlace} /> : null}
                  </li>
                ))}
            </ul>
          </Tarjeta>
        ))
      )}
    </div>
  );
}
