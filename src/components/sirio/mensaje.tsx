"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Estrella } from "@/components/ui/estrella";
import type { Mensaje } from "@/lib/tipos";
import { TarjetaPiezaChat } from "./tarjeta-pieza-chat";
import { TarjetaPreguntaChat } from "./tarjeta-pregunta-chat";

function Cronometro() {
  const [ms, setMs] = useState(0);
  useEffect(() => {
    const inicio = performance.now();
    const id = setInterval(() => setMs(performance.now() - inicio), 100);
    return () => clearInterval(id);
  }, []);
  return <span className="mono text-tinta-3">{(ms / 1000).toFixed(1)} s</span>;
}

/** Fila plegable "Trabajó 12 pasos · 48 s", o el indicador mientras trabaja. */
function FilaTrabajo({ mensaje, enCurso }: { mensaje: Mensaje; enCurso: boolean }) {
  const [abierta, setAbierta] = useState(false);
  if (mensaje.trabajando) {
    return enCurso ? (
      <p className="flex items-center gap-2 text-[12.5px] font-semibold text-tinta-2" role="status">
        <Estrella tamano={14} trabajando />
        Trabajando
        <Cronometro />
      </p>
    ) : (
      <p className="flex items-center gap-2 text-[12.5px] font-semibold text-tinta-3">
        <Estrella tamano={14} />
        En pausa. Retomo cuando me reanudes.
      </p>
    );
  }
  if (!mensaje.trabajo) return null;
  return (
    <div>
      <button
        type="button"
        aria-expanded={abierta}
        onClick={() => setAbierta((a) => !a)}
        className="flex h-7 items-center gap-2 rounded-chip pr-1 text-[12.5px] font-semibold text-tinta-2 transicion hover:text-tinta"
      >
        <Estrella tamano={13} />
        Trabajó {mensaje.trabajo.pasos.length} pasos
        <span className="mono text-tinta-3">· {mensaje.trabajo.segundos} s</span>
        <ChevronDown
          size={14}
          strokeWidth={1.75}
          aria-hidden="true"
          className={`text-tinta-3 transicion ${abierta ? "rotate-180" : ""}`}
        />
      </button>
      {abierta ? (
        <ol className="aparece ml-[6px] mt-1 space-y-1.5 border-l border-linea py-1 pl-4">
          {mensaje.trabajo.pasos.map((p) => (
            <li key={p} className="flex items-center gap-2 text-[12.5px] text-tinta-2">
              <Check size={13} strokeWidth={2} className="shrink-0 text-listo" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

export function BurbujaMensaje({ mensaje, enCurso }: { mensaje: Mensaje; enCurso: boolean }) {
  if (mensaje.autor === "persona") {
    return (
      <div className="aparece flex justify-end">
        <p className="max-w-[86%] rounded-tarjeta bg-superficie-2 px-3.5 py-2.5 text-[13.5px] leading-snug">
          {mensaje.texto}
        </p>
      </div>
    );
  }
  return (
    <div className="aparece space-y-2.5">
      <FilaTrabajo mensaje={mensaje} enCurso={enCurso} />
      {mensaje.texto ? <p className="text-[13.5px] leading-relaxed text-tinta">{mensaje.texto}</p> : null}
      {mensaje.tarjeta?.tipo === "pieza" ? <TarjetaPiezaChat piezaId={mensaje.tarjeta.piezaId} /> : null}
      {mensaje.tarjeta?.tipo === "pregunta" ? <TarjetaPreguntaChat preguntaId={mensaje.tarjeta.preguntaId} /> : null}
    </div>
  );
}
