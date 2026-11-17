"use client";

import { Tarjeta } from "@/components/ui/tarjeta";
import { useMaqueta } from "@/lib/store";
import { BarraSemanas } from "./barra-semanas";

/** La frase del objetivo en grande, su medida, la fecha límite y el avance. */
export function TarjetaObjetivo() {
  const { objetivo } = useMaqueta();
  const avance = Math.min(100, Math.round((objetivo.actual / objetivo.meta) * 100));
  return (
    <Tarjeta etiquetaAria="Objetivo vigente" relleno="ninguno">
      <div className="grid gap-6 p-6 @min-[820px]:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <p className="etiqueta-grupo">Objetivo a 90 días · desde el {objetivo.inicio}</p>
          <p className="mt-2 text-[26px] font-extrabold leading-[1.15] tracking-[-0.03em] text-balance">{objetivo.frase}</p>
          <dl className="mt-4 grid gap-x-8 gap-y-2 text-[13px] sm:grid-cols-[auto_1fr]">
            <dt className="text-tinta-3">Medida de éxito</dt>
            <dd>{objetivo.medida}</dd>
            <dt className="text-tinta-3">Fecha límite</dt>
            <dd>
              {objetivo.fechaLimite} <span className="text-tinta-3">· faltan {objetivo.diasRestantes} días</span>
            </dd>
          </dl>
        </div>
        <div className="self-end rounded-tarjeta bg-superficie-2 p-4">
          <p className="text-[12.5px] font-semibold text-tinta-2">Avance</p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="mono text-[32px] font-medium leading-none text-tinta">{objetivo.actual}</span>
            <span className="mono text-[13px] text-tinta-3">de {objetivo.meta}</span>
          </p>
          <div
            className="mt-3 h-2 bg-linea"
            role="progressbar"
            aria-label="Avance del objetivo"
            aria-valuemin={0}
            aria-valuemax={objetivo.meta}
            aria-valuenow={objetivo.actual}
          >
            <div className="h-full bg-acento" style={{ width: `${avance}%` }} />
          </div>
          <p className="mono mt-2 text-tinta-3">{avance} % de la meta</p>
        </div>
      </div>
      <div className="border-t border-linea px-6 py-5">
        <p className="mb-3 text-[13px] font-bold">Semanas</p>
        <BarraSemanas actual={objetivo.semanaActual} total={objetivo.totalSemanas} variante="completa" />
      </div>
    </Tarjeta>
  );
}
