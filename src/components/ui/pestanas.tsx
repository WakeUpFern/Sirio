"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";

/**
 * Pestañas: radio de 14 px en el grupo, nunca píldora. La pestaña inactiva
 * deja ver el fondo `--superficie-2`; la activa es una superficie blanca.
 * Se mueven con flechas, Inicio y Fin, como pide el patrón de ARIA.
 */
export interface OpcionPestana<T extends string> {
  valor: T;
  etiqueta: string;
  contador?: number;
}

export const idPestana = (base: string, valor: string) => `${base}-pestana-${valor}`;
export const idPanel = (base: string) => `${base}-panel`;

export function Pestanas<T extends string>({
  idBase,
  etiqueta,
  valor,
  opciones,
  onCambio,
}: {
  idBase: string;
  etiqueta: string;
  valor: T;
  opciones: OpcionPestana<T>[];
  onCambio: (valor: T) => void;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function teclas(e: KeyboardEvent<HTMLDivElement>) {
    const i = opciones.findIndex((o) => o.valor === valor);
    const mapa: Record<string, number> = {
      ArrowRight: (i + 1) % opciones.length,
      ArrowLeft: (i - 1 + opciones.length) % opciones.length,
      Home: 0,
      End: opciones.length - 1,
    };
    if (!(e.key in mapa)) return;
    e.preventDefault();
    const siguiente = opciones[mapa[e.key]].valor;
    onCambio(siguiente);
    refs.current[siguiente]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label={etiqueta}
      onKeyDown={teclas}
      className="inline-flex max-w-full gap-1 overflow-x-auto rounded-boton bg-superficie-2 p-1"
    >
      {opciones.map((o) => {
        const activa = o.valor === valor;
        return (
          <button
            key={o.valor}
            ref={(el) => {
              refs.current[o.valor] = el;
            }}
            id={idPestana(idBase, o.valor)}
            type="button"
            role="tab"
            aria-selected={activa}
            aria-controls={idPanel(idBase)}
            tabIndex={activa ? 0 : -1}
            onClick={() => onCambio(o.valor)}
            className={`flex h-8 shrink-0 items-center gap-2 rounded-chip px-3 text-[13px] font-bold transicion ${
              activa ? "bg-superficie text-tinta shadow-reposo" : "text-tinta-2 hover:text-tinta"
            }`}
          >
            {o.etiqueta}
            {o.contador !== undefined ? (
              <span className="mono text-[11px] text-tinta-3">{o.contador}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function PanelPestana<T extends string>({
  idBase,
  valor,
  children,
}: {
  idBase: string;
  valor: T;
  children: ReactNode;
}) {
  return (
    <div role="tabpanel" id={idPanel(idBase)} aria-labelledby={idPestana(idBase, valor)}>
      {children}
    </div>
  );
}
