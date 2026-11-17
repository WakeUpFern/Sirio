"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { Boton } from "./boton";

/**
 * Diálogo modal con el <dialog> nativo: atrapa el foco, cierra con Escape
 * y devuelve el foco a quien lo abrió. Radio de 20 px.
 */
export function Dialogo({
  abierto,
  onCerrar,
  titulo,
  descripcion,
  acciones,
  children,
}: {
  abierto: boolean;
  onCerrar: () => void;
  titulo: string;
  descripcion?: string;
  /** Botones del pie, de menor a mayor jerarquía. */
  acciones?: ReactNode;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (abierto && !el.open) el.showModal();
    if (!abierto && el.open) el.close();
  }, [abierto]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-titulo`}
      aria-describedby={descripcion ? `${id}-desc` : undefined}
      onClose={onCerrar}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCerrar();
      }}
      className="m-auto w-[min(520px,calc(100vw-32px))] rounded-marco border border-linea bg-superficie p-0 text-tinta shadow-flota open:aparece"
    >
      {abierto ? (
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={`${id}-titulo`} className="text-[19px]">
                {titulo}
              </h2>
              {descripcion ? (
                <p id={`${id}-desc`} className="mt-1 text-[13.5px] text-tinta-2">
                  {descripcion}
                </p>
              ) : null}
            </div>
            <Boton
              variante="texto"
              soloIcono
              etiqueta="Cerrar"
              icono={<X size={16} strokeWidth={1.75} aria-hidden="true" />}
              onClick={onCerrar}
            />
          </div>
          {children ? <div className="mt-5">{children}</div> : null}
          {acciones ? <div className="mt-6 flex justify-end gap-2">{acciones}</div> : null}
        </div>
      ) : null}
    </dialog>
  );
}
