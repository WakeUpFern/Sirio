"use client";

import { Boton } from "@/components/ui/boton";
import { Estrella } from "@/components/ui/estrella";
import { Tarjeta } from "@/components/ui/tarjeta";
import { EtiquetaPaso } from "@/components/actividad/tipo-accion";
import { EnlaceResultado } from "@/components/marco/enlace-resultado";
import { EstadoVacio } from "@/components/marco/estado-vacio";
import { useMaqueta } from "@/lib/store";
import type { Paso } from "@/lib/tipos";

/** Quién lleva un paso: Sirio o una persona del equipo. */
export function Responsable({ nombre }: { nombre: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px] text-tinta-2">
      {nombre === "Sirio" ? (
        <span className="grid h-5 w-5 place-items-center rounded-chip bg-superficie-2" aria-hidden="true">
          <Estrella tamano={11} />
        </span>
      ) : (
        <span
          className="grid h-5 w-5 place-items-center rounded-chip bg-superficie-2 text-[10px] font-extrabold text-tinta-2"
          aria-hidden="true"
        >
          {nombre[0]}
        </span>
      )}
      {nombre}
    </span>
  );
}

function FilaPaso({ paso }: { paso: Paso }) {
  const { marcarPaso } = useMaqueta();
  const puedeMarcar = paso.responsable !== "Sirio" && paso.estado !== "hecho";
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 first:pt-0 last:pb-0">
      <span className="w-[92px] shrink-0">
        <EtiquetaPaso estado={paso.estado} />
      </span>
      <span className="min-w-0 flex-1 basis-[220px] text-[13.5px] leading-snug">{paso.texto}</span>
      <span className="flex shrink-0 items-center gap-2">
        <Responsable nombre={paso.responsable} />
        {paso.enlace ? <EnlaceResultado enlace={paso.enlace} /> : null}
        {puedeMarcar ? (
          <Boton variante="texto" onClick={() => marcarPaso(paso.id)}>
            Marcar hecho
          </Boton>
        ) : null}
      </span>
    </li>
  );
}

/** Pasos de la semana en curso, con estado, responsable y enlace. */
export function PasosSemana() {
  const { pasos, objetivo } = useMaqueta();
  const hechos = pasos.filter((p) => p.estado === "hecho").length;
  return (
    <Tarjeta
      titulo={`Pasos de esta semana · S${objetivo.semanaActual}`}
      extra={
        <span className="mono text-tinta-3">
          {hechos} de {pasos.length} hechos
        </span>
      }
    >
      {pasos.length === 0 ? (
        <EstadoVacio titulo="Sin pasos esta semana" texto="Acepta la propuesta de Sirio o pídele una en el panel." />
      ) : (
        <ul className="divide-y divide-linea">
          {pasos.map((p) => (
            <FilaPaso key={p.id} paso={p} />
          ))}
        </ul>
      )}
    </Tarjeta>
  );
}
