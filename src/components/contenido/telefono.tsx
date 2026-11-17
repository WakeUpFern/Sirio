import { Estrella } from "@/components/ui/estrella";
import type { Pieza } from "@/lib/tipos";

/** Vista previa de la pieza en un marco de teléfono. No imita la interfaz de ninguna red. */
export function Telefono({ pieza }: { pieza: Pieza }) {
  const esTexto = pieza.escenas.length === 0;
  return (
    <div
      role="img"
      aria-label={`Vista previa de «${pieza.titulo}» en un teléfono`}
      className="relative mx-auto aspect-[9/18] w-[188px] shrink-0 overflow-hidden rounded-marco border-[6px] border-tinta bg-superficie-2"
    >
      <span className="absolute left-1/2 top-1.5 h-3 w-14 -translate-x-1/2 rounded-chip bg-tinta" />
      {esTexto ? (
        <div className="absolute inset-x-0 top-7 bottom-0 bg-superficie px-3 py-3">
          <p className="flex items-center gap-1.5 text-[10px] font-extrabold">
            <span className="grid h-5 w-5 place-items-center rounded-chip bg-tinta">
              <Estrella tamano={9} tono="superficie" />
            </span>
            FEBAcode
          </p>
          <p className="mt-2 line-clamp-[12] text-[9.5px] leading-[1.45] text-tinta-2">{pieza.texto}</p>
          <p className="mono mt-1.5 text-[8.5px] text-acento-texto">{pieza.etiquetas}</p>
        </div>
      ) : (
        <>
          <span className="absolute left-3 top-10 h-[3px] w-6 bg-acento" />
          <p className="absolute inset-x-3 top-14 text-[17px] font-extrabold leading-[1.12] tracking-[-0.02em] text-tinta">
            {pieza.titulo}
          </p>
          <div className="absolute inset-x-3 bottom-3">
            <p className="flex items-center gap-1.5 text-[9.5px] font-extrabold">
              <span className="grid h-4 w-4 place-items-center rounded-chip bg-tinta">
                <Estrella tamano={8} tono="superficie" />
              </span>
              febacode
            </p>
            <p className="mt-1 line-clamp-3 text-[9px] leading-snug text-tinta-2">{pieza.texto}</p>
          </div>
        </>
      )}
    </div>
  );
}
