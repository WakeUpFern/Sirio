"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { Vista } from "@/components/marco/vista";
import { TarjetaObjetivo } from "@/components/objetivo/tarjeta-objetivo";
import { PasosSemana } from "@/components/objetivo/pasos-semana";
import { PropuestaSemana } from "@/components/objetivo/propuesta-semana";
import { SemanasAnteriores } from "@/components/objetivo/semanas-anteriores";
import { DialogoObjetivo } from "@/components/objetivo/dialogo-objetivo";

/** Objetivo: el objetivo a 90 días, sus semanas y los pasos. */
export function VistaObjetivo() {
  const [editando, setEditando] = useState(false);
  return (
    <Vista
      titulo="Objetivo"
      apoyo="Un objetivo a la vez, partido en pasos semanales que Sirio propone y tú aceptas."
      acciones={
        <Boton
          variante="contorno"
          icono={<Pencil size={15} strokeWidth={1.75} aria-hidden="true" />}
          onClick={() => setEditando(true)}
        >
          Cambiar objetivo
        </Boton>
      }
    >
      <TarjetaObjetivo />
      <div className="mt-6 grid items-start gap-6 @min-[900px]:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-6">
          <PasosSemana />
          <SemanasAnteriores />
        </div>
        <PropuestaSemana />
      </div>
      <DialogoObjetivo abierto={editando} onCerrar={() => setEditando(false)} />
    </Vista>
  );
}
