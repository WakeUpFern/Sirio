"use client";

import type { ReactNode } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { useMaqueta } from "@/lib/store";

/** Botón del encabezado que abre o cierra el panel de Sirio. */
function BotonPanel() {
  const { panelVisible, alternarPanel } = useMaqueta();
  const Icono = panelVisible ? PanelRightClose : PanelRightOpen;
  return (
    <Boton
      variante="contorno"
      soloIcono
      etiqueta={panelVisible ? "Cerrar el panel de Sirio" : "Abrir el panel de Sirio"}
      aria-expanded={panelVisible}
      aria-controls="panel-sirio"
      icono={<Icono size={17} strokeWidth={1.75} aria-hidden="true" />}
      onClick={alternarPanel}
    />
  );
}

/**
 * Encabezado de la vista y su contenido. El encabezado no tiene fondo propio:
 * título a la izquierda, línea de apoyo debajo y a la derecha la acción de la vista.
 */
export function Vista({
  titulo,
  apoyo,
  acciones,
  conPanel = true,
  children,
}: {
  titulo: string;
  apoyo?: ReactNode;
  acciones?: ReactNode;
  conPanel?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-8 pb-16 pt-7 max-lg:px-5">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <h1 className="text-[24px] tracking-[-0.025em]">{titulo}</h1>
          {apoyo ? <div className="mt-1 text-[13.5px] text-tinta-2">{apoyo}</div> : null}
        </div>
        <div className="flex items-center gap-2">
          {acciones}
          {conPanel ? <BotonPanel /> : null}
        </div>
      </header>
      {children}
    </div>
  );
}

/** Lo que se ve mientras la vista lee su estado de la URL. */
export function VistaCargando({ titulo }: { titulo: string }) {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-8 pb-16 pt-7 max-lg:px-5" role="status">
      <h1 className="text-[24px] tracking-[-0.025em]">{titulo}</h1>
      <p className="sr-only">Cargando…</p>
      <div className="mt-8 space-y-3" aria-hidden="true">
        <div className="h-10 w-72 rounded-boton bg-superficie-2" />
        <div className="h-32 rounded-tarjeta bg-superficie-2" />
        <div className="h-32 rounded-tarjeta bg-superficie-2" />
      </div>
    </div>
  );
}
