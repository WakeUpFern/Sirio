import type { Escena } from "@/lib/tipos";

/** El guion en escenas numeradas, con su duración. */
export function GuionEscenas({ escenas }: { escenas: Escena[] }) {
  return (
    <ol className="space-y-2">
      {escenas.map((e, i) => (
        <li key={`${e.titulo}-${i}`} className="flex gap-3 rounded-boton bg-superficie-2 p-3">
          <span className="mono grid h-5 w-5 shrink-0 place-items-center rounded-chip bg-superficie text-[11px] text-tinta-2">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-baseline justify-between gap-2 text-[12.5px] font-bold">
              {e.titulo}
              {e.segundos > 0 ? <span className="mono font-normal text-tinta-3">{e.segundos} s</span> : null}
            </p>
            <p className="mt-0.5 text-[13px] leading-snug text-tinta-2">{e.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export const duracion = (escenas: Escena[]) => escenas.reduce((total, e) => total + e.segundos, 0);
