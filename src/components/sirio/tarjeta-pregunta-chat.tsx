"use client";

import { Check } from "lucide-react";
import { Etiqueta } from "@/components/ui/etiqueta";
import { Tarjeta } from "@/components/ui/tarjeta";
import { OpcionesPregunta } from "@/components/decisiones/opciones-pregunta";
import { PREGUNTAS } from "@/lib/data";
import { useMaqueta } from "@/lib/store";

/** Pregunta de Sirio dentro de la conversación. */
export function TarjetaPreguntaChat({ preguntaId }: { preguntaId: string }) {
  const { respuestas, responderPregunta } = useMaqueta();
  const q = PREGUNTAS.find((x) => x.id === preguntaId);
  if (!q) return null;
  const respuesta = respuestas[q.id];
  return (
    <Tarjeta as="div" relleno="compacto">
      <Etiqueta tono={respuesta ? "neutro" : "atencion"} forma="chip">
        {respuesta ? "Sirio preguntó" : "Sirio pregunta"}
      </Etiqueta>
      <p className="mt-1.5 text-[13.5px] font-bold leading-snug">{q.titulo}</p>
      {respuesta ? (
        <p className="mt-2 flex items-start gap-2 text-[13px] text-tinta-2">
          <Check size={14} strokeWidth={2.25} className="mt-0.5 shrink-0 text-listo" aria-hidden="true" />
          <span>
            Elegiste <span className="font-bold text-tinta">{respuesta}</span>
          </span>
        </p>
      ) : (
        <div className="mt-3">
          <OpcionesPregunta pregunta={q} onElegir={(o) => responderPregunta(q.id, o)} />
        </div>
      )}
    </Tarjeta>
  );
}
