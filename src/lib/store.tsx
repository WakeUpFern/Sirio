"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { TRABAJO_ACTUAL } from "./data-actividad";
import { useActividad } from "./estado/actividad";
import { useAvisos } from "./estado/avisos";
import { useChat } from "./estado/chat";
import { useDecisiones } from "./estado/decisiones";
import { useNegocio } from "./estado/negocio";
import { useObjetivo } from "./estado/objetivo";

// Estado de la maqueta en el cliente. Se reinicia al recargar. Según
// docs/patrones.md este contexto se va vaciando conforme cada parte pasa a
// datos reales; cada dominio vive en su archivo de src/lib/estado.

type ModoPanel = "auto" | "abierto" | "cerrado";

/** El panel de Sirio está abierto por omisión a partir de 1440 px. */
const PANTALLA_ANCHA = "(min-width: 1440px)";
/** Por debajo de 1024 px el panel se cierra. */
const PANTALLA_ANGOSTA = "(max-width: 1023.98px)";

function suscribirAncho(aviso: () => void) {
  const m = window.matchMedia(PANTALLA_ANCHA);
  m.addEventListener("change", aviso);
  return () => m.removeEventListener("change", aviso);
}

function useCrearMaqueta() {
  const { aviso, avisar, cerrarAviso } = useAvisos();
  const actividad = useActividad(avisar);
  const chat = useChat();
  const { setHiloId, nuevoHilo: crearHilo, enviar } = chat;

  /* ------------------------------------------------------ panel de Sirio */
  const anchoGrande = useSyncExternalStore(
    suscribirAncho,
    () => window.matchMedia(PANTALLA_ANCHA).matches,
    () => false,
  );
  const [modoPanel, setModoPanel] = useState<ModoPanel>("auto");
  const [historialAbierto, setHistorialAbierto] = useState(false);
  const panelVisible = modoPanel === "abierto" || (modoPanel === "auto" && anchoGrande);

  useEffect(() => {
    const m = window.matchMedia(PANTALLA_ANGOSTA);
    const cerrar = () => {
      if (m.matches) setModoPanel("cerrado");
    };
    m.addEventListener("change", cerrar);
    return () => m.removeEventListener("change", cerrar);
  }, []);

  const alternarPanel = useCallback(
    () => setModoPanel(panelVisible ? "cerrado" : "abierto"),
    [panelVisible],
  );

  const abrirHilo = useCallback(
    (id: string) => {
      setHiloId(id);
      setHistorialAbierto(false);
      setModoPanel("abierto");
    },
    [setHiloId],
  );

  const nuevoHilo = useCallback(() => {
    crearHilo();
    setHistorialAbierto(false);
    setModoPanel("abierto");
  }, [crearHilo]);

  const verTodosLosHilos = useCallback(() => {
    setHistorialAbierto(true);
    setModoPanel("abierto");
  }, []);

  const escribirEnHilo = useCallback(
    (hiloId: string | undefined, texto: string, titulo?: string) => {
      const id = hiloId ?? crearHilo(titulo);
      abrirHilo(id);
      enviar(texto, id);
    },
    [crearHilo, abrirHilo, enviar],
  );

  /* ---------------------------------------------------------- dominios */
  const decisiones = useDecisiones({ registrar: actividad.registrar, avisar, escribirEnHilo });
  const objetivo = useObjetivo(actividad.registrar, avisar);
  const negocio = useNegocio(actividad.registrar, avisar);

  /* ------------------------------------------------- Sirio trabajando */
  const hilosTrabajando = new Set(chat.ocupados.map((o) => o.hiloId));
  if (!actividad.pausado) hilosTrabajando.add(TRABAJO_ACTUAL.hiloId);

  return {
    aviso,
    avisar,
    cerrarAviso,
    ...actividad,
    ...chat,
    ...decisiones,
    ...objetivo,
    ...negocio,
    hilosTrabajando,
    sirioTrabajando: hilosTrabajando.size > 0,
    panelVisible,
    modoPanel,
    alternarPanel,
    historialAbierto,
    setHistorialAbierto,
    abrirHilo,
    nuevoHilo,
    verTodosLosHilos,
    escribirEnHilo,
  };
}

export type Maqueta = ReturnType<typeof useCrearMaqueta>;

const Contexto = createContext<Maqueta | null>(null);

export function ProveedorMaqueta({ children }: { children: ReactNode }) {
  const valor = useCrearMaqueta();
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useMaqueta() {
  const v = useContext(Contexto);
  if (!v) throw new Error("useMaqueta se usó fuera de ProveedorMaqueta");
  return v;
}
