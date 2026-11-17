"use client";

import { Etiqueta } from "@/components/ui/etiqueta";
import type { Pregunta } from "@/lib/tipos";

/** Opciones de una pregunta de Sirio. Elegir una la responde. */
export function OpcionesPregunta({
  pregunta,
  onElegir,
}: {
  pregunta: Pregunta;
  onElegir: (opcion: string) => void;
}) {
  return (
    <ul className="space-y-1.5" aria-label="Opciones">
      {pregunta.opciones.map((o, i) => {
        const recomendada = i === pregunta.recomendada;
        return (
          <li key={o}>
            <button
              type="button"
              onClick={() => onElegir(o)}
              className={`flex min-h-10 w-full items-center gap-3 rounded-boton border px-3 py-2 text-left text-[13px] transicion hover:shadow-alzada motion-safe:hover:-translate-y-px ${
                recomendada ? "border-acento bg-superficie" : "border-linea bg-superficie"
              }`}
            >
              <span className="mono grid h-5 w-5 shrink-0 place-items-center rounded-chip bg-superficie-2 text-[11px] text-tinta-2">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 font-semibold">{o}</span>
              {recomendada ? (
                <Etiqueta tono="acento" forma="chip">
                  Recomendada
                </Etiqueta>
              ) : null}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
