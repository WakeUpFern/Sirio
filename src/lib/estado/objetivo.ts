import { useCallback, useState } from "react";
import { OBJETIVO, PASOS_SEMANA } from "../data";
import type { Objetivo, Paso } from "../tipos";
import type { Registrar } from "./actividad";
import type { Avisar } from "./avisos";

/** El objetivo vigente y los pasos de la semana en curso. */
export function useObjetivo(registrar: Registrar, avisar: Avisar) {
  const [objetivo, setObjetivo] = useState<Objetivo>(OBJETIVO);
  const [pasos, setPasos] = useState<Paso[]>(PASOS_SEMANA);

  const cambiarObjetivo = useCallback(
    (cambio: Pick<Objetivo, "frase" | "medida" | "meta">) => {
      setObjetivo((o) => ({ ...o, ...cambio }));
      registrar("propuso", "Leí el objetivo nuevo; reviso los pasos que siguen", { tipo: "objetivo" });
      avisar("Guardé el objetivo. Ajusto la propuesta de la semana que viene.");
    },
    [registrar, avisar],
  );

  const marcarPaso = useCallback(
    (id: string) => {
      const paso = pasos.find((p) => p.id === id);
      if (!paso) return;
      setPasos((ps) => ps.map((p) => (p.id === id ? { ...p, estado: "hecho" } : p)));
      avisar(`Marcaste como hecho: ${paso.texto}.`, {
        etiqueta: "Deshacer",
        alHacer: () => setPasos((ps) => ps.map((p) => (p.id === id ? { ...p, estado: paso.estado } : p))),
      });
    },
    [pasos, avisar],
  );

  return { objetivo, cambiarObjetivo, pasos, marcarPaso };
}
