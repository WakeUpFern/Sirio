"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Etiqueta } from "@/components/ui/etiqueta";

export type TipoDecision = "Aprobar pieza" | "Sirio pregunta" | "Solo tú puedes";

/**
 * Tarjeta de la cola de Hoy: tipo, título, contexto y acciones.
 * Desplegada muestra además el contenido a decidir.
 */
export function MarcoDecision({
  id,
  tipo,
  titulo,
  contexto,
  desplegada,
  onAlternar,
  contenido,
  acciones,
}: {
  id: string;
  tipo: TipoDecision;
  titulo: string;
  contexto: string;
  desplegada: boolean;
  onAlternar: () => void;
  contenido?: ReactNode;
  acciones: ReactNode;
}) {
  return (
    <li
      className={`aparece rounded-tarjeta border bg-superficie transicion ${desplegada ? "border-linea shadow-alzada" : "border-linea"}`}
    >
      <button
        type="button"
        aria-expanded={desplegada}
        aria-controls={`${id}-detalle`}
        onClick={onAlternar}
        className="flex w-full items-start gap-3 rounded-tarjeta px-5 pt-4 text-left"
      >
        <span className="min-w-0 flex-1">
          <Etiqueta tono="atencion" forma="chip">
            {tipo}
          </Etiqueta>
          <span className="mt-2 block text-[15px] font-extrabold leading-snug tracking-[-0.015em]">{titulo}</span>
          <span className="mt-0.5 block text-[13px] text-tinta-2">{contexto}</span>
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.75}
          aria-hidden="true"
          className={`mt-1 shrink-0 text-tinta-3 transicion ${desplegada ? "rotate-180" : ""}`}
        />
      </button>
      {desplegada && contenido ? (
        <div id={`${id}-detalle`} className="aparece px-5 pt-4">
          {contenido}
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-2 px-5 pb-4 pt-3">{acciones}</div>
    </li>
  );
}
