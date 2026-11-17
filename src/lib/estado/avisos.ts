import { useCallback, useRef, useState } from "react";

export interface Aviso {
  id: number;
  texto: string;
  accion?: { etiqueta: string; alHacer: () => void };
}

export type Avisar = (texto: string, accion?: Aviso["accion"]) => void;

/** Avisos breves al pie de la pantalla, con una acción opcional como "Deshacer". */
export function useAvisos() {
  const [aviso, setAviso] = useState<Aviso | null>(null);
  const reloj = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cerrarAviso = useCallback(() => {
    if (reloj.current) clearTimeout(reloj.current);
    setAviso(null);
  }, []);

  const avisar = useCallback<Avisar>((texto, accion) => {
    if (reloj.current) clearTimeout(reloj.current);
    setAviso({ id: Date.now(), texto, accion });
    reloj.current = setTimeout(() => setAviso(null), 5200);
  }, []);

  return { aviso, avisar, cerrarAviso };
}
