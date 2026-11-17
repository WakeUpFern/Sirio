import type { ReactNode } from "react";

/**
 * Tarjeta: superficie blanca con borde de línea y radio de 16 px.
 * `marco` usa el radio de 20 px de ventanas y marcos grandes.
 */
export type VarianteTarjeta = "normal" | "hundida" | "seleccionada" | "flotante" | "marco";

const VARIANTE: Record<VarianteTarjeta, string> = {
  normal: "rounded-tarjeta border border-linea bg-superficie",
  hundida: "rounded-tarjeta border border-superficie-2 bg-superficie-2",
  seleccionada: "rounded-tarjeta border border-acento bg-superficie shadow-reposo",
  flotante: "rounded-tarjeta border border-linea bg-superficie shadow-flota",
  marco: "rounded-marco border border-linea bg-superficie shadow-flota",
};

const RELLENO = {
  normal: "p-5",
  compacto: "p-4",
  ninguno: "",
} as const;

export function Tarjeta({
  as: Elemento = "section",
  variante = "normal",
  relleno = "normal",
  titulo,
  extra,
  etiquetaAria,
  className = "",
  children,
}: {
  as?: "section" | "article" | "div" | "li" | "aside";
  variante?: VarianteTarjeta;
  relleno?: keyof typeof RELLENO;
  /** Título de la tarjeta (h2). */
  titulo?: ReactNode;
  /** Lo que va a la derecha del título: un contador, un enlace. */
  extra?: ReactNode;
  etiquetaAria?: string;
  /** Solo clases de disposición (márgenes, rejilla, alto). Nunca color ni radio. */
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Elemento
      aria-label={etiquetaAria}
      className={`transicion ${VARIANTE[variante]} ${RELLENO[relleno]} ${className}`}
    >
      {titulo ? (
        <header className="mb-3 flex min-h-6 items-center justify-between gap-3">
          <h2 className="text-[14px] font-extrabold tracking-[-0.01em]">{titulo}</h2>
          {extra}
        </header>
      ) : null}
      {children}
    </Elemento>
  );
}
