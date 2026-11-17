"use client";

import { useEffect, useRef } from "react";
import { History, SquarePen, X } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { Estrella } from "@/components/ui/estrella";
import { SUGERENCIAS } from "@/lib/data-hilos";
import { useMaqueta } from "@/lib/store";
import { BurbujaMensaje } from "./mensaje";
import { Compositor } from "./compositor";

const ICONO = { size: 16, strokeWidth: 1.75, "aria-hidden": true } as const;

function Historial() {
  const { hilos, hiloId, hilosTrabajando, abrirHilo, nuevoHilo } = useMaqueta();
  return (
    <div className="aparece absolute inset-x-0 bottom-0 top-14 z-10 flex flex-col bg-superficie">
      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <p className="etiqueta-grupo">Todos los hilos</p>
        <Boton variante="contorno" icono={<SquarePen {...ICONO} size={15} />} onClick={nuevoHilo}>
          Nuevo hilo
        </Boton>
      </div>
      <ul className="barra-fina min-h-0 flex-1 overflow-y-auto px-2 pb-3">
        {hilos.map((h) => (
          <li key={h.id}>
            <button
              type="button"
              onClick={() => abrirHilo(h.id)}
              className={`flex h-10 w-full items-center gap-3 rounded-boton px-3 text-left text-[13px] transicion hover:bg-superficie-2 ${
                h.id === hiloId ? "bg-superficie-2 font-bold" : ""
              }`}
            >
              {hilosTrabajando.has(h.id) ? (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-acento" role="img" aria-label="Sirio trabaja aquí" />
              ) : null}
              <span className="min-w-0 flex-1 truncate">{h.titulo}</span>
              <span className="mono shrink-0 text-tinta-3">{h.cuando}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Vacio() {
  const { enviar } = useMaqueta();
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <Estrella tamano={26} />
      <p className="mt-3 text-[16px] font-extrabold tracking-[-0.01em]">¿En qué trabajo ahora?</p>
      <p className="mt-1 text-[13px] text-tinta-2">Cuéntame una idea o pídeme algo. Yo propongo y tú decides.</p>
      <ul className="mt-4 flex flex-col items-center gap-1">
        {SUGERENCIAS.map((s) => (
          <li key={s}>
            <Boton variante="texto" onClick={() => enviar(s)}>
              {s}
            </Boton>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Panel de Sirio: cabecera con el hilo, conversación y compositor. */
export function PanelSirio() {
  const {
    modoPanel,
    hilos,
    hiloId,
    mensajes,
    ocupados,
    pausado,
    hilosTrabajando,
    historialAbierto,
    setHistorialAbierto,
    alternarPanel,
  } = useMaqueta();
  const desplazable = useRef<HTMLDivElement>(null);
  const lista = mensajes[hiloId] ?? [];
  const titulo = hilos.find((h) => h.id === hiloId)?.titulo ?? "Hilo";
  const trabajando = hilosTrabajando.has(hiloId);
  const ocupadosIds = new Set(ocupados.map((o) => o.mensajeId));

  useEffect(() => {
    const el = desplazable.current;
    if (el) el.scrollTo({ top: el.scrollHeight });
  }, [lista.length, hiloId]);

  const visibilidad =
    modoPanel === "auto" ? "hidden min-[1440px]:flex" : modoPanel === "abierto" ? "flex" : "hidden";

  return (
    <aside
      id="panel-sirio"
      aria-label="Panel de Sirio"
      className={`${visibilidad} relative h-full w-(--ancho-panel) shrink-0 flex-col border-l border-linea bg-superficie max-lg:fixed max-lg:inset-y-0 max-lg:right-0 max-lg:z-30 max-lg:max-w-[calc(100vw-var(--ancho-barra-iconos))] max-lg:shadow-flota`}
    >
      <header className="flex h-14 shrink-0 items-center gap-2.5 border-b border-linea pl-4 pr-2">
        <Estrella tamano={18} trabajando={trabajando} etiqueta={trabajando ? "Sirio está trabajando" : "Sirio"} />
        <h2 className="min-w-0 flex-1 truncate text-[14px] tracking-[-0.01em]">{titulo}</h2>
        <Boton
          variante="texto"
          soloIcono
          etiqueta="Historial de hilos"
          aria-expanded={historialAbierto}
          icono={<History {...ICONO} />}
          onClick={() => setHistorialAbierto(!historialAbierto)}
        />
        <Boton variante="texto" soloIcono etiqueta="Cerrar el panel de Sirio" icono={<X {...ICONO} />} onClick={alternarPanel} />
      </header>

      {historialAbierto ? <Historial /> : null}

      <div ref={desplazable} className="barra-fina min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-5">
        {lista.length === 0 ? (
          <Vacio />
        ) : (
          lista.map((m) => (
            <BurbujaMensaje key={m.id} mensaje={m} enCurso={ocupadosIds.has(m.id) || !pausado} />
          ))
        )}
      </div>

      <Compositor />
    </aside>
  );
}
