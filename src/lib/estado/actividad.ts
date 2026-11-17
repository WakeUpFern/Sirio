import { useCallback, useState } from "react";
import { ACCIONES, TAREAS_PROGRAMADAS } from "../data-actividad";
import type { Accion, Enlace, TipoAccion } from "../tipos";
import type { Avisar } from "./avisos";
import { nuevoId } from "./ids";

export type Registrar = (tipo: TipoAccion, texto: string, enlace?: Enlace) => void;

/** Bitácora, trabajo programado y la pausa general de Sirio. */
export function useActividad(avisar: Avisar) {
  const [acciones, setAcciones] = useState<Accion[]>(ACCIONES);
  const [tareas, setTareas] = useState(TAREAS_PROGRAMADAS);
  const [pausado, setPausado] = useState(false);

  const registrar = useCallback<Registrar>((tipo, texto, enlace) => {
    setAcciones((a) => [{ id: nuevoId("a"), dia: "hoy", hora: "Ahora", tipo, texto, enlace }, ...a]);
  }, []);

  const alternarTarea = useCallback(
    (id: string, activa: boolean) => {
      const tarea = tareas.find((t) => t.id === id);
      if (!tarea) return;
      setTareas((ts) => ts.map((t) => (t.id === id ? { ...t, activa } : t)));
      registrar(
        "programo",
        activa ? `Reanudé «${tarea.nombre}»` : `Pausé «${tarea.nombre}». No corre hasta que la reanudes`,
      );
      avisar(activa ? `Reanudé «${tarea.nombre}».` : `Pausé «${tarea.nombre}».`);
    },
    [tareas, registrar, avisar],
  );

  const alternarPausa = useCallback(() => {
    const ahora = !pausado;
    setPausado(ahora);
    avisar(ahora ? "Me detuve. No empiezo nada hasta que me reanudes." : "Sigo donde me quedé.");
  }, [pausado, avisar]);

  return { acciones, registrar, tareas, alternarTarea, pausado, alternarPausa };
}
