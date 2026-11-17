"use client";

/**
 * Interruptor de encendido y apagado. El área de toque mide 36 px de alto.
 * Encendido usa el acento de texto, que contrasta con el blanco del círculo.
 */
export function Interruptor({
  activo,
  onCambio,
  etiqueta,
  deshabilitado = false,
}: {
  activo: boolean;
  onCambio: (activo: boolean) => void;
  etiqueta: string;
  deshabilitado?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={activo}
      aria-label={etiqueta}
      disabled={deshabilitado}
      onClick={() => onCambio(!activo)}
      className="group inline-flex h-9 shrink-0 items-center rounded-boton px-1 disabled:opacity-50"
    >
      <span
        className={`relative block h-5 w-9 rounded-full transicion ${activo ? "bg-acento-texto" : "bg-tinta-3"}`}
      >
        <span
          className={`absolute left-0.5 top-0.5 block h-4 w-4 rounded-full bg-superficie shadow-reposo transicion ${
            activo ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
