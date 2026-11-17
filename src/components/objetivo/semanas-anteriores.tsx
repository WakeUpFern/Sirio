"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Tarjeta } from "@/components/ui/tarjeta";
import { EtiquetaPaso } from "@/components/actividad/tipo-accion";
import { SEMANAS_ANTERIORES } from "@/lib/data";
import { Responsable } from "./pasos-semana";

/** Semanas anteriores, plegadas. */
export function SemanasAnteriores() {
  const [abierta, setAbierta] = useState<number | null>(null);
  return (
    <Tarjeta titulo="Semanas anteriores">
      <ul className="divide-y divide-linea">
        {SEMANAS_ANTERIORES.map((s) => {
          const hechos = s.pasos.filter((p) => p.estado === "hecho").length;
          const desplegada = abierta === s.numero;
          return (
            <li key={s.numero} className="py-1 first:pt-0 last:pb-0">
              <button
                type="button"
                aria-expanded={desplegada}
                onClick={() => setAbierta(desplegada ? null : s.numero)}
                className="flex w-full items-center gap-4 rounded-boton py-2.5 text-left"
              >
                <span className="mono w-8 shrink-0 text-[12px] text-tinta-3">S{s.numero}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] font-bold">{s.rango}</span>
                  <span className="block text-[12.5px] text-tinta-2">{s.resumen}</span>
                </span>
                <span className="mono shrink-0 text-tinta-3">
                  {hechos} de {s.pasos.length}
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className={`shrink-0 text-tinta-3 transicion ${desplegada ? "rotate-180" : ""}`}
                />
              </button>
              {desplegada ? (
                <ul className="aparece mb-2 ml-12 space-y-2">
                  {s.pasos.map((p) => (
                    <li key={p.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
                      <EtiquetaPaso estado={p.estado} />
                      <span className="min-w-0 flex-1">{p.texto}</span>
                      <Responsable nombre={p.responsable} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Tarjeta>
  );
}
