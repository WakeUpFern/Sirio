"use client";

import { Check, X } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { useMaqueta } from "@/lib/store";

/** Aviso breve tras una acción, con "Deshacer" cuando aplica. */
export function AvisoFlotante() {
  const { aviso, cerrarAviso } = useMaqueta();
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      {aviso ? (
        <div
          key={aviso.id}
          className="aparece pointer-events-auto flex max-w-[560px] items-center gap-3 rounded-tarjeta border border-linea bg-superficie py-1.5 pl-4 pr-1.5 text-[13.5px] shadow-flota"
        >
          <Check size={16} strokeWidth={2.25} className="shrink-0 text-listo" aria-hidden="true" />
          <span className="min-w-0 flex-1 py-1.5">{aviso.texto}</span>
          {aviso.accion ? (
            <Boton
              variante="texto"
              onClick={() => {
                aviso.accion?.alHacer();
                cerrarAviso();
              }}
            >
              {aviso.accion.etiqueta}
            </Boton>
          ) : null}
          <Boton
            variante="texto"
            soloIcono
            etiqueta="Cerrar aviso"
            icono={<X size={15} strokeWidth={1.75} aria-hidden="true" />}
            onClick={cerrarAviso}
          />
        </div>
      ) : null}
    </div>
  );
}
