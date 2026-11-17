"use client";

import { Boton, BotonEnlace } from "@/components/ui/boton";
import { Etiqueta } from "@/components/ui/etiqueta";
import { Tarjeta } from "@/components/ui/tarjeta";
import { Miniatura } from "@/components/contenido/miniatura";
import { useMaqueta } from "@/lib/store";

/** Tarjeta de aprobación dentro de la conversación. */
export function TarjetaPiezaChat({ piezaId }: { piezaId: string }) {
  const { piezas, aprobarPieza, descartarPieza } = useMaqueta();
  const p = piezas.find((x) => x.id === piezaId);
  if (!p) return null;
  const pendiente = p.estado === "por-aprobar";
  return (
    <Tarjeta as="div" relleno="compacto">
      <div className="flex gap-3">
        <Miniatura pieza={p} tamano="chica" />
        <div className="min-w-0 flex-1">
          {pendiente ? (
            <Etiqueta tono="atencion" forma="chip">
              Aprobar pieza
            </Etiqueta>
          ) : p.estado === "aprobado" ? (
            <Etiqueta tono="listo">Aprobada</Etiqueta>
          ) : (
            <Etiqueta>Descartada</Etiqueta>
          )}
          <p className="mt-1.5 text-[13.5px] font-bold leading-snug">{p.titulo}</p>
          <p className="mt-0.5 text-[12.5px] text-tinta-2">
            {p.canal} · {p.formato}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {pendiente ? (
          <>
            <Boton variante="solido" onClick={() => aprobarPieza(p.id)}>
              Aprobar
            </Boton>
            <Boton variante="texto" onClick={() => descartarPieza(p.id)}>
              Descartar
            </Boton>
          </>
        ) : (
          <p className="text-[12.5px] text-tinta-2">{p.decision}</p>
        )}
        <span className="ml-auto">
          <BotonEnlace variante="texto" href={`/app/contenido?pieza=${p.id}`}>
            Ver en Contenido
          </BotonEnlace>
        </span>
      </div>
    </Tarjeta>
  );
}
