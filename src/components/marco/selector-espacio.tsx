"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { ESPACIO } from "@/lib/data";

/** Selector de espacio. En la versión interna solo existe FEBAcode. */
export function SelectorEspacio() {
  const [abierto, setAbierto] = useState(false);
  return (
    <div
      className="relative mt-2"
      onKeyDown={(e) => {
        if (e.key === "Escape") setAbierto(false);
      }}
    >
      <button
        type="button"
        aria-expanded={abierto}
        aria-haspopup="true"
        aria-label={`Espacio: ${ESPACIO.nombre}`}
        onClick={() => setAbierto((a) => !a)}
        className="flex h-10 w-full items-center gap-2.5 rounded-boton px-2 text-left transicion hover:bg-superficie-2 max-lg:justify-center max-lg:px-0"
      >
        <span
          className="grid h-7 w-7 shrink-0 place-items-center rounded-chip bg-tinta text-[13px] font-extrabold text-superficie"
          aria-hidden="true"
        >
          {ESPACIO.inicial}
        </span>
        <span className="min-w-0 flex-1 truncate text-[13.5px] font-bold max-lg:sr-only">{ESPACIO.nombre}</span>
        <ChevronsUpDown size={15} strokeWidth={1.75} className="text-tinta-3 max-lg:hidden" aria-hidden="true" />
      </button>
      {abierto ? (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setAbierto(false)}
          />
          <div className="aparece absolute left-0 top-11 z-20 w-[224px] rounded-tarjeta border border-linea bg-superficie p-2 shadow-flota">
            <p className="flex h-9 items-center gap-2.5 rounded-boton bg-superficie-2 px-2 text-[13px] font-bold">
              <span className="grid h-6 w-6 place-items-center rounded-chip bg-tinta text-[12px] text-superficie" aria-hidden="true">
                {ESPACIO.inicial}
              </span>
              <span className="flex-1">{ESPACIO.nombre}</span>
              <Check size={15} strokeWidth={2} className="text-acento-texto" aria-label="Espacio actual" />
            </p>
            <p className="px-2 pb-1 pt-2 text-[12px] text-tinta-3">
              Por ahora Sirio trabaja para un solo negocio.
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
