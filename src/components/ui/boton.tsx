import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Estrella } from "./estrella";

/**
 * Botón del sistema FEBAcode: cuatro variantes, dos tamaños, formato de solo icono
 * y los cinco estados (cursor encima, presionado, foco, cargando, deshabilitado).
 * El movimiento vive en globals.css (.boton).
 */
export type VarianteBoton = "principal" | "solido" | "contorno" | "texto";
export type TamanoBoton = "app" | "portada";

interface Visual {
  variante?: VarianteBoton;
  tamano?: TamanoBoton;
  /** Icono a la izquierda del texto, o el único contenido si `soloIcono`. */
  icono?: ReactNode;
  /** Cuadrado con solo el icono. Requiere `etiqueta`. */
  soloIcono?: boolean;
  /** Texto accesible; obligatorio en botones de solo icono. */
  etiqueta?: string;
  ancho?: "auto" | "completo";
  children?: ReactNode;
}

function clases({ variante = "contorno", tamano = "app", soloIcono, ancho }: Visual) {
  return [
    "boton",
    `boton-${variante}`,
    `boton-${tamano}`,
    soloIcono ? "boton-icono" : "",
    ancho === "completo" ? "boton-ancho" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function Contenido({ icono, soloIcono, children }: Visual) {
  return (
    <span className="boton-contenido">
      {icono}
      {soloIcono ? null : children}
    </span>
  );
}

type BotonProps = Visual &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style" | "children"> & {
    cargando?: boolean;
  };

export function Boton({
  variante,
  tamano,
  icono,
  soloIcono,
  etiqueta,
  ancho,
  cargando = false,
  children,
  type = "button",
  disabled,
  onClick,
  ...resto
}: BotonProps) {
  const visual = { variante, tamano, icono, soloIcono, ancho, children };
  return (
    <button
      {...resto}
      type={type}
      disabled={disabled}
      aria-label={etiqueta ?? resto["aria-label"]}
      aria-busy={cargando || undefined}
      data-cargando={cargando || undefined}
      onClick={cargando ? undefined : onClick}
      className={clases(visual)}
    >
      <Contenido {...visual} />
      {cargando ? (
        <span className="boton-indicador" aria-hidden="true">
          <Estrella tamano={tamano === "portada" ? 18 : 15} tono="actual" trabajando />
        </span>
      ) : null}
    </button>
  );
}

type BotonEnlaceProps = Visual & {
  href: string;
  /** Enlace a otro sitio: se abre con <a> normal. */
  externo?: boolean;
  "aria-current"?: "page";
};

export function BotonEnlace({ href, externo, etiqueta, ...visual }: BotonEnlaceProps) {
  const props = {
    className: clases(visual),
    "aria-label": etiqueta,
    "aria-current": visual["aria-current"],
  };
  if (externo) {
    return (
      <a href={href} {...props}>
        <Contenido {...visual} />
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      <Contenido {...visual} />
    </Link>
  );
}
