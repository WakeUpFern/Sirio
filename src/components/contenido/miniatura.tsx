import type { Pieza } from "@/lib/tipos";

/** Miniatura vertical de una pieza: bloque hundido con el título y un detalle en acento. */
export function Miniatura({ pieza, tamano = "lista" }: { pieza: Pick<Pieza, "titulo" | "canal">; tamano?: "chica" | "lista" }) {
  if (tamano === "chica") {
    return (
      <span
        className="relative block h-[64px] w-[38px] shrink-0 self-start overflow-hidden rounded-chip border border-linea bg-superficie-2"
        aria-hidden="true"
      >
        <span className="absolute left-1.5 top-1.5 h-[3px] w-3 bg-acento" />
        <span className="absolute inset-x-1.5 bottom-1.5 space-y-1">
          <span className="block h-[3px] w-full bg-linea" />
          <span className="block h-[3px] w-2/3 bg-linea" />
        </span>
      </span>
    );
  }
  return (
    <span
      className="relative flex aspect-[9/16] w-[72px] shrink-0 self-start flex-col justify-between overflow-hidden rounded-chip border border-linea bg-superficie-2 p-2"
      aria-hidden="true"
    >
      <span className="block h-[3px] w-4 bg-acento" />
      <span className="line-clamp-4 text-[9.5px] font-extrabold leading-[1.2] tracking-[-0.01em] text-tinta">
        {pieza.titulo}
      </span>
      <span className="mono text-[9px] text-tinta-3">{pieza.canal}</span>
    </span>
  );
}
