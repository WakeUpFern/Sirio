import { useCallback, useState } from "react";
import { FICHA, FUENTE_FICHA, MEMORIA } from "../data-actividad";
import type { CampoFicha, NotaMemoria } from "../tipos";
import type { Registrar } from "./actividad";
import type { Avisar } from "./avisos";

/** La ficha del negocio y la memoria que Sirio usa en cada hilo nuevo. */
export function useNegocio(registrar: Registrar, avisar: Avisar) {
  const [ficha, setFicha] = useState<CampoFicha[]>(FICHA);
  const [fuente, setFuente] = useState(FUENTE_FICHA);
  const [notas, setNotas] = useState<NotaMemoria[]>(MEMORIA);

  const editarCampo = useCallback(
    (id: string, valor: string) => {
      const campo = ficha.find((c) => c.id === id);
      const limpio = valor.trim();
      if (!campo || !limpio || limpio === campo.valor) return;
      setFicha((f) => f.map((c) => (c.id === id ? { ...c, valor: limpio } : c)));
      setFuente((f) => ({ ...f, ultimoCambio: { cuando: "hoy", quien: "Fernando" } }));
      registrar("leyo", `Leí tu cambio en «${campo.nombre}»; lo uso desde el próximo hilo`);
      avisar(`Guardé «${campo.nombre}». Lo uso desde el próximo hilo.`);
    },
    [ficha, registrar, avisar],
  );

  const editarNota = useCallback(
    (id: string, texto: string) => {
      const limpio = texto.trim();
      if (!limpio) return;
      setNotas((ns) => ns.map((n) => (n.id === id ? { ...n, texto: limpio } : n)));
      avisar("Guardé la nota.");
    },
    [avisar],
  );

  const borrarNota = useCallback(
    (id: string) => {
      const i = notas.findIndex((n) => n.id === id);
      if (i < 0) return;
      const nota = notas[i];
      setNotas((ns) => ns.filter((n) => n.id !== id));
      avisar("Borré la nota. Ya no entra a los hilos nuevos.", {
        etiqueta: "Deshacer",
        alHacer: () =>
          setNotas((ns) => (ns.some((n) => n.id === id) ? ns : [...ns.slice(0, i), nota, ...ns.slice(i)])),
      });
    },
    [notas, avisar],
  );

  return { ficha, fuente, editarCampo, notas, editarNota, borrarNota };
}
