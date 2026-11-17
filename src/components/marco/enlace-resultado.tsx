"use client";

import { ArrowUpRight, MessageSquare } from "lucide-react";
import { Boton, BotonEnlace } from "@/components/ui/boton";
import { useMaqueta } from "@/lib/store";
import type { Enlace } from "@/lib/tipos";

const ICONO = { size: 14, strokeWidth: 1.75, "aria-hidden": true } as const;

/** Lleva al resultado de una acción: abre el hilo en el panel o va a la pieza u objetivo. */
export function EnlaceResultado({ enlace }: { enlace: Enlace }) {
  const { abrirHilo } = useMaqueta();
  if (enlace.tipo === "hilo") {
    return (
      <Boton variante="texto" icono={<MessageSquare {...ICONO} />} onClick={() => abrirHilo(enlace.id)}>
        Abrir hilo
      </Boton>
    );
  }
  if (enlace.tipo === "pieza") {
    return (
      <BotonEnlace variante="texto" href={`/app/contenido?pieza=${enlace.id}`} icono={<ArrowUpRight {...ICONO} />}>
        Ver pieza
      </BotonEnlace>
    );
  }
  return (
    <BotonEnlace variante="texto" href="/app/objetivo" icono={<ArrowUpRight {...ICONO} />}>
      Ver objetivo
    </BotonEnlace>
  );
}
