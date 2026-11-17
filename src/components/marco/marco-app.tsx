"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ProveedorMaqueta } from "@/lib/store";
import { PanelSirio } from "@/components/sirio/panel-sirio";
import { BarraLateral } from "./barra-lateral";
import { AvisoFlotante } from "./aviso-flotante";

/**
 * El marco: barra lateral, área de la vista y panel de Sirio a la derecha.
 * Sin marcos flotantes ni márgenes alrededor (docs/estructura-app.md).
 */
export function MarcoApp({ children }: { children: ReactNode }) {
  const ruta = usePathname();
  const sinPanel = ruta.startsWith("/app/ajustes");
  return (
    <ProveedorMaqueta>
      <a
        href="#vista"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-boton focus:bg-superficie focus:px-3 focus:py-2 focus:font-bold"
      >
        Saltar al contenido
      </a>
      <div className="reticula flex h-dvh overflow-hidden">
        <BarraLateral />
        <main id="vista" className="barra-fina @container min-w-0 flex-1 overflow-y-auto">
          {children}
        </main>
        {sinPanel ? null : <PanelSirio />}
      </div>
      <AvisoFlotante />
    </ProveedorMaqueta>
  );
}
