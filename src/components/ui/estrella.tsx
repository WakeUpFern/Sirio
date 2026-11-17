/**
 * La estrella de cuatro puntas, marca de Sirio.
 * En reposo es tinta; cuando Sirio trabaja pasa a acento y titila despacio.
 * Es la única animación en bucle de la interfaz.
 */
type Tono = "tinta" | "superficie" | "actual";

const COLOR: Record<Tono, string> = {
  tinta: "text-tinta",
  superficie: "text-superficie",
  actual: "",
};

export function Estrella({
  tamano = 18,
  trabajando = false,
  tono = "tinta",
  etiqueta,
}: {
  tamano?: number;
  trabajando?: boolean;
  tono?: Tono;
  /** Si se da, la estrella se anuncia como imagen con este texto. */
  etiqueta?: string;
}) {
  const color = trabajando && tono !== "actual" ? "text-acento" : COLOR[tono];
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="currentColor"
      role={etiqueta ? "img" : undefined}
      aria-label={etiqueta}
      aria-hidden={etiqueta ? undefined : true}
      className={`shrink-0 ${color} ${trabajando ? "titila" : ""}`}
    >
      <path d="M12 1C12.9 7.6 16.4 11.1 23 12C16.4 12.9 12.9 16.4 12 23C11.1 16.4 7.6 12.9 1 12C7.6 11.1 11.1 7.6 12 1Z" />
    </svg>
  );
}
