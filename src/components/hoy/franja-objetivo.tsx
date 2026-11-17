"use client";

import Link from "next/link";
import { ChevronRight, Target } from "lucide-react";
import { BarraSemanas } from "@/components/objetivo/barra-semanas";
import { useMaqueta } from "@/lib/store";

/** Una fila a todo el ancho con el objetivo, los días que faltan y el avance. Lleva a Objetivo. */
export function FranjaObjetivo() {
  const { objetivo } = useMaqueta();
  return (
    <Link
      href="/app/objetivo"
      className="group flex flex-wrap items-center gap-x-6 gap-y-3 rounded-tarjeta border border-linea bg-superficie px-5 py-4 transicion hover:shadow-alzada"
    >
      <span className="flex min-w-0 flex-1 basis-[320px] items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-boton bg-acento-suave text-acento-texto">
          <Target size={18} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="etiqueta-grupo block">Objetivo a 90 días</span>
          <span className="block text-[14px] leading-snug font-extrabold tracking-[-0.01em]">{objetivo.frase}</span>
        </span>
      </span>
      <span className="flex basis-[300px] items-center gap-5 max-sm:flex-1">
        <span className="shrink-0 text-[13px]">
          <span className="mono text-[13px] font-medium text-tinta">
            {objetivo.actual} de {objetivo.meta}
          </span>
          <span className="block text-[12px] text-tinta-3">Faltan {objetivo.diasRestantes} días</span>
        </span>
        <span className="min-w-[120px] flex-1">
          <BarraSemanas actual={objetivo.semanaActual} total={objetivo.totalSemanas} />
          <span className="mono mt-1.5 block text-[11px] text-tinta-3">
            Semana {objetivo.semanaActual} de {objetivo.totalSemanas}
          </span>
        </span>
        <ChevronRight size={18} strokeWidth={1.75} className="shrink-0 text-tinta-3 transicion group-hover:text-tinta" aria-hidden="true" />
      </span>
    </Link>
  );
}
