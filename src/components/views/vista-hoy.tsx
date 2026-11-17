"use client";

import { Pause, Play } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { Estrella } from "@/components/ui/estrella";
import { Vista } from "@/components/marco/vista";
import { FranjaObjetivo } from "@/components/hoy/franja-objetivo";
import { ColaDecisiones } from "@/components/decisiones/cola-decisiones";
import { EstaSemana, HechoReciente, Resultados } from "@/components/hoy/columna-lateral";
import { TRABAJO_ACTUAL } from "@/lib/data-actividad";
import { useMaqueta } from "@/lib/store";

/** Hoy: qué necesita Sirio de mí y qué hizo mientras no estaba. */
export function VistaHoy() {
  const { pausado, alternarPausa } = useMaqueta();
  return (
    <Vista
      titulo="Hoy"
      apoyo={
        <span className="flex items-center gap-2">
          <Estrella tamano={14} trabajando={!pausado} />
          {pausado ? "Estoy en pausa. No empiezo nada hasta que me reanudes." : TRABAJO_ACTUAL.texto}
        </span>
      }
      acciones={
        <Boton
          variante="contorno"
          icono={pausado ? <Play size={15} strokeWidth={1.75} aria-hidden="true" /> : <Pause size={15} strokeWidth={1.75} aria-hidden="true" />}
          onClick={alternarPausa}
        >
          {pausado ? "Reanudar a Sirio" : "Pausar a Sirio"}
        </Boton>
      }
    >
      <FranjaObjetivo />
      <div className="mt-6 grid items-start gap-6 @min-[760px]:grid-cols-[minmax(0,2fr)_minmax(264px,1fr)]">
        <ColaDecisiones />
        <div className="space-y-4">
          <HechoReciente />
          <EstaSemana />
          <Resultados />
        </div>
      </div>
    </Vista>
  );
}
