import type { ReactNode } from "react";

/**
 * Etiqueta de estado (píldora con punto) y chip (radio de 8 px).
 * Los colores de estado solo se usan para estados, no como decoración.
 */
export type TonoEtiqueta = "neutro" | "acento" | "listo" | "atencion" | "error";

const TEXTO: Record<TonoEtiqueta, string> = {
  neutro: "text-tinta-2",
  acento: "text-acento-texto",
  listo: "text-listo",
  atencion: "text-atencion",
  error: "text-error",
};

const PUNTO: Record<TonoEtiqueta, string> = {
  neutro: "bg-tinta-3",
  acento: "bg-acento",
  listo: "bg-listo",
  atencion: "bg-atencion",
  error: "bg-error",
};

export function Etiqueta({
  tono = "neutro",
  forma = "estado",
  icono,
  children,
}: {
  tono?: TonoEtiqueta;
  /** `estado`: píldora con punto. `chip`: radio de 8 px, sin punto. */
  forma?: "estado" | "chip";
  icono?: ReactNode;
  children: ReactNode;
}) {
  const radio = forma === "estado" ? "rounded-full" : "rounded-chip";
  return (
    <span
      className={`inline-flex h-6 shrink-0 items-center gap-1.5 whitespace-nowrap border border-linea bg-superficie px-2 text-[11.5px] font-bold transicion ${radio} ${TEXTO[tono]}`}
    >
      {forma === "estado" && !icono ? (
        <span className={`h-1.5 w-1.5 rounded-full ${PUNTO[tono]}`} aria-hidden="true" />
      ) : null}
      {icono}
      {children}
    </span>
  );
}

/** Contador en píldora, con cifras en mono. */
export function Contador({
  valor,
  tono = "neutro",
  etiqueta,
}: {
  valor: number;
  /** `fuerte`: fondo tinta para llamar la atención sin usar color de estado. */
  tono?: "neutro" | "fuerte";
  etiqueta?: string;
}) {
  const color = tono === "fuerte" ? "bg-tinta text-superficie" : "bg-superficie-2 text-tinta-2";
  return (
    <span
      className={`mono inline-grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] ${color}`}
      aria-label={etiqueta}
    >
      {valor}
    </span>
  );
}
