import { useCallback, useMemo, useState } from "react";
import { COLA, PIEZAS, PREGUNTAS, TAREAS_PERSONA } from "../data";
import type { EstadoPropuesta, Pieza } from "../tipos";
import type { Registrar } from "./actividad";
import type { Avisar } from "./avisos";
import { nuevoId } from "./ids";

interface Dependencias {
  registrar: Registrar;
  avisar: Avisar;
  /** Abre un hilo en el panel y le escribe a Sirio. */
  escribirEnHilo: (hiloId: string | undefined, texto: string, titulo?: string) => void;
}

/** Piezas, preguntas, tareas para una persona y la propuesta semanal: la cola de Hoy. */
export function useDecisiones({ registrar, avisar, escribirEnHilo }: Dependencias) {
  const [piezas, setPiezas] = useState<Pieza[]>(PIEZAS);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [tareasHechas, setTareasHechas] = useState<Record<string, boolean>>({});
  const [propuesta, setPropuesta] = useState<EstadoPropuesta>("abierta");

  const cambiarPieza = useCallback((id: string, cambio: Partial<Pieza>) => {
    setPiezas((ps) => ps.map((p) => (p.id === id ? { ...p, ...cambio } : p)));
  }, []);

  const aprobarPieza = useCallback(
    (id: string) => {
      const p = piezas.find((x) => x.id === id);
      if (!p || p.estado !== "por-aprobar") return;
      cambiarPieza(id, { estado: "aprobado", decision: "Aprobada por Fernando · hoy" });
      registrar("programo", `Dejé «${p.titulo}» lista para publicar el ${p.sugerida ?? "día que elijas"}`, {
        tipo: "pieza",
        id,
      });
      avisar(`Aprobaste «${p.titulo}». Queda lista para publicarla.`, {
        etiqueta: "Deshacer",
        alHacer: () => cambiarPieza(id, { estado: "por-aprobar", decision: undefined }),
      });
    },
    [piezas, cambiarPieza, registrar, avisar],
  );

  const descartarPieza = useCallback(
    (id: string) => {
      const p = piezas.find((x) => x.id === id);
      if (!p) return;
      const antes = { estado: p.estado, decision: p.decision };
      cambiarPieza(id, { estado: "descartado", decision: "Descartada por Fernando · hoy" });
      avisar(`Descartaste «${p.titulo}».`, { etiqueta: "Deshacer", alHacer: () => cambiarPieza(id, antes) });
    },
    [piezas, cambiarPieza, avisar],
  );

  const recuperarPieza = useCallback(
    (id: string) => {
      cambiarPieza(id, { estado: "por-aprobar", decision: undefined });
      avisar("La pieza volvió a Por aprobar.");
    },
    [cambiarPieza, avisar],
  );

  const pedirOtraVersion = useCallback(
    (id: string) => {
      const p = piezas.find((x) => x.id === id);
      if (!p) return;
      escribirEnHilo(p.hiloId, `Hazme otra versión de «${p.titulo}», con otro gancho.`, p.titulo);
    },
    [piezas, escribirEnHilo],
  );

  const pedirPieza = useCallback(
    (descripcion: string, formato: string) => {
      const titulo = descripcion.length > 60 ? `${descripcion.slice(0, 59)}…` : descripcion;
      const id = nuevoId("p");
      setPiezas((ps) => [
        {
          id,
          titulo,
          formato,
          canal: formato.includes("LinkedIn") ? "LinkedIn" : "TikTok",
          estado: "guion",
          creada: "hoy",
          texto: "La estoy escribiendo.",
          etiquetas: "",
          escenas: [],
        },
        ...ps,
      ]);
      const pedido = descripcion.charAt(0).toLowerCase() + descripcion.slice(1);
      escribirEnHilo(undefined, `Necesito una pieza: ${pedido}. Formato: ${formato}.`, titulo);
      registrar("redacto", `Empecé la pieza «${titulo}»`, { tipo: "pieza", id });
      return id;
    },
    [escribirEnHilo, registrar],
  );

  const responderPregunta = useCallback(
    (id: string, opcion: string) => {
      const q = PREGUNTAS.find((x) => x.id === id);
      if (!q) return;
      setRespuestas((r) => ({ ...r, [id]: opcion }));
      if (q.piezaId) {
        const pieza = piezas.find((p) => p.id === q.piezaId);
        if (pieza && pieza.escenas.length > 0) {
          const escenas = pieza.escenas.map((e, i) => (i === 0 ? { ...e, texto: `Cliente por videollamada: ${opcion}` } : e));
          cambiarPieza(pieza.id, { escenas });
        }
      }
      registrar("redacto", `Seguí con el guion usando el gancho ${opcion}`, { tipo: "hilo", id: q.hiloId });
      avisar("Anotado. Sigo con el guion.");
    },
    [piezas, cambiarPieza, registrar, avisar],
  );

  const resolverTarea = useCallback(
    (id: string) => {
      const t = TAREAS_PERSONA.find((x) => x.id === id);
      if (!t) return;
      setTareasHechas((h) => ({ ...h, [id]: true }));
      registrar("programo", "Anoté la grabación del jueves 19 a las 11:00 en los pasos de la semana", {
        tipo: "hilo",
        id: t.hiloId,
      });
      avisar("Confirmado. Les aviso a Dani y a Valeria en el hilo.", {
        etiqueta: "Deshacer",
        alHacer: () => setTareasHechas((h) => ({ ...h, [id]: false })),
      });
    },
    [registrar, avisar],
  );

  const decidirPropuesta = useCallback(
    (decision: "aceptada" | "descartada") => {
      setPropuesta(decision);
      if (decision === "aceptada") {
        registrar("programo", "Agendé los 4 pasos de la semana 4", { tipo: "objetivo" });
        avisar("Aceptaste la propuesta. Los pasos entran el lunes 23 nov.");
      } else {
        avisar("Descartaste la propuesta. Te propongo otra antes del viernes.", {
          etiqueta: "Deshacer",
          alHacer: () => setPropuesta("abierta"),
        });
      }
    },
    [registrar, avisar],
  );

  const cola = useMemo(
    () =>
      COLA.filter((c) => {
        if (c.tipo === "pieza") return piezas.find((p) => p.id === c.piezaId)?.estado === "por-aprobar";
        if (c.tipo === "pregunta") return !respuestas[c.preguntaId];
        if (c.tipo === "persona") return !tareasHechas[c.tareaId];
        return propuesta === "abierta";
      }),
    [piezas, respuestas, tareasHechas, propuesta],
  );

  const porAprobar = piezas.filter((p) => p.estado === "por-aprobar").length;

  return {
    piezas,
    respuestas,
    tareasHechas,
    propuesta,
    cola,
    porAprobar,
    aprobarPieza,
    descartarPieza,
    recuperarPieza,
    pedirOtraVersion,
    pedirPieza,
    responderPregunta,
    resolverTarea,
    decidirPropuesta,
  };
}
