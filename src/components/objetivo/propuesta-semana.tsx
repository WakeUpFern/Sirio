"use client";

import { Boton } from "@/components/ui/boton";
import { Estrella } from "@/components/ui/estrella";
import { Etiqueta } from "@/components/ui/etiqueta";
import { Tarjeta } from "@/components/ui/tarjeta";
import { PROPUESTA_SEMANA } from "@/lib/data";
import { useMaqueta } from "@/lib/store";
import { Responsable } from "./pasos-semana";

/** Propuesta de Sirio para la semana siguiente: Aceptar, Cambiar o Descartar. */
export function PropuestaSemana() {
  const { propuesta, decidirPropuesta, escribirEnHilo } = useMaqueta();
  return (
    <Tarjeta
      titulo={
        <span className="flex items-center gap-2">
          <Estrella tamano={15} />
          Propuesta para la semana 4
        </span>
      }
      extra={
        propuesta === "aceptada" ? (
          <Etiqueta tono="listo">Aceptada</Etiqueta>
        ) : propuesta === "descartada" ? (
          <Etiqueta>Descartada</Etiqueta>
        ) : (
          <span className="mono text-tinta-3">23 al 29 nov</span>
        )
      }
    >
      <p className="text-[13px] text-tinta-2">
        {propuesta === "abierta"
          ? "La semana 3 va en buen camino. Para la siguiente propongo esto:"
          : propuesta === "aceptada"
            ? "Listo. Estos pasos entran el lunes 23 nov."
            : "Descartaste la propuesta. Te propongo otra antes del viernes."}
      </p>
      {propuesta !== "descartada" ? (
        <ol className="mt-3 space-y-2.5">
          {PROPUESTA_SEMANA.map((p, i) => (
            <li key={p.id} className="flex gap-3">
              <span className="mono pt-px text-tinta-3">{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] leading-snug">{p.texto}</span>
                <span className="mt-1 block">
                  <Responsable nombre={p.responsable} />
                </span>
              </span>
            </li>
          ))}
        </ol>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        {propuesta === "abierta" ? (
          <>
            <Boton variante="principal" onClick={() => decidirPropuesta("aceptada")}>
              Aceptar
            </Boton>
            <Boton variante="contorno" onClick={() => escribirEnHilo("t8", "Quiero cambiar la propuesta de la semana 4.")}>
              Cambiar
            </Boton>
            <Boton variante="texto" onClick={() => decidirPropuesta("descartada")}>
              Descartar
            </Boton>
          </>
        ) : propuesta === "descartada" ? (
          <Boton variante="contorno" onClick={() => escribirEnHilo("t8", "Propón otra vez los pasos de la semana 4.")}>
            Pedir otra propuesta
          </Boton>
        ) : null}
      </div>
    </Tarjeta>
  );
}
