"use client";

import { useState } from "react";
import { CheckCheck } from "lucide-react";
import { Etiqueta } from "@/components/ui/etiqueta";
import { EstadoVacio } from "@/components/marco/estado-vacio";
import { useMaqueta } from "@/lib/store";
import { DecisionPersona, DecisionPieza, DecisionPregunta, DecisionPropuesta } from "./decisiones";

/** Valor de `elegida` cuando la persona plegó todas las tarjetas. */
const NINGUNA = "-";

/**
 * "Necesita tu decisión": la cola de Hoy. La primera tarjeta va desplegada;
 * las demás, plegadas. Es la única zona de la vista que usa el color de atención.
 */
export function ColaDecisiones() {
  const { cola } = useMaqueta();
  const [elegida, setElegida] = useState<string | null>(null);
  const desplegadaId =
    elegida === NINGUNA ? undefined : elegida && cola.some((c) => c.id === elegida) ? elegida : cola[0]?.id;

  return (
    <section aria-labelledby="titulo-cola">
      <header className="mb-3 flex items-center gap-3">
        <h2 id="titulo-cola" className="text-[16px] tracking-[-0.015em]">
          Necesita tu decisión
        </h2>
        {cola.length > 0 ? <Etiqueta tono="atencion">{cola.length} por decidir</Etiqueta> : null}
      </header>
      {cola.length === 0 ? (
        <EstadoVacio
          icono={<CheckCheck size={18} strokeWidth={1.75} aria-hidden="true" />}
          titulo="Estás al día"
          texto="Sirio te avisará cuando necesite algo. Mientras, puedes pedirle una pieza en el panel."
        />
      ) : (
        <ul className="space-y-3">
          {cola.map((c) => {
            const props = {
              id: c.id,
              desplegada: c.id === desplegadaId,
              onAlternar: () => setElegida(c.id === desplegadaId ? NINGUNA : c.id),
            };
            if (c.tipo === "pieza") return <DecisionPieza key={c.id} piezaId={c.piezaId} {...props} />;
            if (c.tipo === "pregunta") return <DecisionPregunta key={c.id} preguntaId={c.preguntaId} {...props} />;
            if (c.tipo === "persona") return <DecisionPersona key={c.id} tareaId={c.tareaId} {...props} />;
            return <DecisionPropuesta key={c.id} {...props} />;
          })}
        </ul>
      )}
    </section>
  );
}
