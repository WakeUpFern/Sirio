import type { ReactNode } from "react";
import { Estrella } from "@/components/ui/estrella";

/** Estado vacío: dice qué pasa y qué hacer después, no solo que no hay nada. */
export function EstadoVacio({
  titulo,
  texto,
  accion,
  icono,
}: {
  titulo: string;
  texto: string;
  accion?: ReactNode;
  icono?: ReactNode;
}) {
  return (
    <div className="aparece flex flex-col items-center rounded-tarjeta border border-dashed border-linea bg-superficie px-6 py-10 text-center">
      <span className="grid h-10 w-10 place-items-center rounded-boton bg-superficie-2 text-tinta-2">
        {icono ?? <Estrella tamano={18} />}
      </span>
      <p className="mt-3 text-[15px] font-extrabold tracking-[-0.01em]">{titulo}</p>
      <p className="mt-1 max-w-[360px] text-[13px] text-tinta-2">{texto}</p>
      {accion ? <div className="mt-4">{accion}</div> : null}
    </div>
  );
}
