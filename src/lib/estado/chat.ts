import { useCallback, useEffect, useRef, useState } from "react";
import { HILOS, MENSAJES, RESPUESTAS } from "../data-hilos";
import type { Hilo, Mensaje } from "../tipos";
import { nuevoId } from "./ids";

/** Cuánto "trabaja" Sirio antes de responder en la demo. */
const DEMORA_RESPUESTA = 2400;
const TITULO_NUEVO = "Hilo nuevo";

/** Hilos y conversación del panel de Sirio. */
export function useChat() {
  const [hilos, setHilos] = useState<Hilo[]>(HILOS);
  const [hiloId, setHiloId] = useState("t1");
  const [mensajes, setMensajes] = useState<Record<string, Mensaje[]>>(MENSAJES);
  /** Mensajes de Sirio que están en curso por algo que escribió una persona. */
  const [ocupados, setOcupados] = useState<{ mensajeId: string; hiloId: string }[]>([]);
  const relojes = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const turno = useRef(0);

  useEffect(() => {
    const r = relojes.current;
    return () => Object.values(r).forEach(clearTimeout);
  }, []);

  const terminar = useCallback((hilo: string, mensajeId: string, n: number) => {
    const respuesta = RESPUESTAS[n % RESPUESTAS.length];
    setMensajes((s) => ({
      ...s,
      [hilo]: (s[hilo] ?? []).map((m) =>
        m.id === mensajeId
          ? { ...m, trabajando: false, trabajo: { pasos: respuesta.pasos, segundos: 2 }, texto: respuesta.texto }
          : m,
      ),
    }));
    setOcupados((o) => o.filter((x) => x.mensajeId !== mensajeId));
    delete relojes.current[mensajeId];
  }, []);

  const enviar = useCallback(
    (texto: string, destino?: string) => {
      const limpio = texto.trim();
      if (!limpio) return;
      const hilo = destino ?? hiloId;
      const mensajeId = nuevoId("s");
      const n = turno.current++;
      setMensajes((s) => ({
        ...s,
        [hilo]: [
          ...(s[hilo] ?? []),
          { id: nuevoId("u"), autor: "persona", texto: limpio },
          { id: mensajeId, autor: "sirio", trabajando: true },
        ],
      }));
      setOcupados((o) => [...o, { mensajeId, hiloId: hilo }]);
      relojes.current[mensajeId] = setTimeout(() => terminar(hilo, mensajeId, n), DEMORA_RESPUESTA);
      // El primer mensaje de un hilo nuevo le pone nombre.
      setHilos((hs) =>
        hs.map((h) =>
          h.id === hilo && h.titulo === TITULO_NUEVO
            ? { ...h, titulo: limpio.length > 42 ? `${limpio.slice(0, 41)}…` : limpio }
            : h,
        ),
      );
    },
    [hiloId, terminar],
  );

  const detener = useCallback(() => {
    for (const { mensajeId, hiloId: hilo } of ocupados) {
      clearTimeout(relojes.current[mensajeId]);
      terminar(hilo, mensajeId, turno.current - 1);
    }
  }, [ocupados, terminar]);

  const nuevoHilo = useCallback((titulo = TITULO_NUEVO) => {
    const id = nuevoId("t");
    setHilos((hs) => [{ id, titulo, cuando: "Ahora" }, ...hs]);
    setMensajes((s) => ({ ...s, [id]: [] }));
    setHiloId(id);
    return id;
  }, []);

  return {
    hilos,
    hiloId,
    setHiloId,
    mensajes,
    ocupados,
    enviar,
    detener,
    nuevoHilo,
  };
}
