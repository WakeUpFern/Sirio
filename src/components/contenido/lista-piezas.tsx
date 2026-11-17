"use client";

import type { Pieza } from "@/lib/tipos";
import { Miniatura } from "./miniatura";

/** Lista de piezas: miniatura vertical, título, formato y fecha. */
export function ListaPiezas({
  piezas,
  seleccionada,
  onElegir,
}: {
  piezas: Pieza[];
  seleccionada?: string;
  onElegir: (id: string) => void;
}) {
  return (
    <ul className="space-y-2" aria-label="Piezas">
      {piezas.map((p) => {
        const activa = p.id === seleccionada;
        return (
          <li key={p.id}>
            <button
              type="button"
              aria-pressed={activa}
              onClick={() => onElegir(p.id)}
              className={`flex w-full gap-3.5 rounded-tarjeta border p-3 text-left transicion ${
                activa ? "border-acento bg-superficie shadow-reposo" : "border-linea bg-superficie hover:shadow-alzada"
              }`}
            >
              <Miniatura pieza={p} />
              <span className="flex min-w-0 flex-1 flex-col py-0.5">
                <span className="text-[14px] font-extrabold leading-snug tracking-[-0.01em]">{p.titulo}</span>
                <span className="mt-1 text-[12.5px] text-tinta-2">
                  {p.canal} · {p.formato}
                </span>
                <span className="mono mt-auto pt-2 text-tinta-3">
                  {p.sugerida ? `Para el ${p.sugerida}` : `Propuesta ${p.creada}`}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
