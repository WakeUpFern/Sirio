"use client";

import { PanelPestana, Pestanas } from "@/components/ui/pestanas";
import { Vista } from "@/components/marco/vista";
import { Ficha } from "@/components/negocio/ficha";
import { Memoria } from "@/components/negocio/memoria";
import { useMaqueta } from "@/lib/store";
import { elegir, useParametros } from "@/lib/use-parametros";

const PESTANAS = ["ficha", "memoria"] as const;

/** Negocio: lo que Sirio sabe de FEBAcode. */
export function VistaNegocio() {
  const { notas } = useMaqueta();
  const { params, fijar } = useParametros();
  const pestana = elegir(params.get("pestana"), PESTANAS, "ficha");

  return (
    <Vista titulo="Negocio" apoyo="Lo que Sirio sabe de FEBAcode. Cualquier persona del equipo puede corregirlo.">
      <Pestanas
        idBase="negocio"
        etiqueta="Lo que sabe Sirio"
        valor={pestana}
        onCambio={(v) => fijar({ pestana: v === "ficha" ? null : v })}
        opciones={[
          { valor: "ficha", etiqueta: "Ficha" },
          { valor: "memoria", etiqueta: "Memoria", contador: notas.length },
        ]}
      />
      <PanelPestana idBase="negocio" valor={pestana}>
        <div className="mt-5">{pestana === "ficha" ? <Ficha /> : <Memoria />}</div>
      </PanelPestana>
    </Vista>
  );
}
