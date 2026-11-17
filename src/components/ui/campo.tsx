import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

/** Campo de texto con su etiqueta. Radio de 14 px y borde de línea. */
const BASE =
  "block w-full rounded-boton border border-linea bg-superficie px-3 text-[13.5px] text-tinta transicion hover:border-tinta-3 disabled:opacity-50";

interface Comunes {
  etiqueta: string;
  /** Oculta la etiqueta a la vista; los lectores de pantalla la siguen leyendo. */
  ocultarEtiqueta?: boolean;
  ayuda?: string;
}

function Etiqueta({ id, etiqueta, ocultarEtiqueta }: Comunes & { id: string }) {
  return (
    <label
      htmlFor={id}
      className={ocultarEtiqueta ? "sr-only" : "mb-1.5 block text-[12.5px] font-semibold text-tinta-2"}
    >
      {etiqueta}
    </label>
  );
}

function Ayuda({ id, ayuda }: { id: string; ayuda?: string }) {
  if (!ayuda) return null;
  return (
    <p id={id} className="mt-1.5 text-[12px] text-tinta-3">
      {ayuda}
    </p>
  );
}

export function Campo({
  etiqueta,
  ocultarEtiqueta,
  ayuda,
  id,
  ...resto
}: Comunes & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style">) {
  const generado = useId();
  const campoId = id ?? generado;
  return (
    <div>
      <Etiqueta id={campoId} etiqueta={etiqueta} ocultarEtiqueta={ocultarEtiqueta} />
      <input
        {...resto}
        id={campoId}
        aria-describedby={ayuda ? `${campoId}-ayuda` : undefined}
        className={`${BASE} h-9`}
      />
      <Ayuda id={`${campoId}-ayuda`} ayuda={ayuda} />
    </div>
  );
}

export function AreaTexto({
  etiqueta,
  ocultarEtiqueta,
  ayuda,
  id,
  rows = 3,
  ...resto
}: Comunes & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "style">) {
  const generado = useId();
  const campoId = id ?? generado;
  return (
    <div>
      <Etiqueta id={campoId} etiqueta={etiqueta} ocultarEtiqueta={ocultarEtiqueta} />
      <textarea
        {...resto}
        id={campoId}
        rows={rows}
        aria-describedby={ayuda ? `${campoId}-ayuda` : undefined}
        className={`${BASE} resize-y py-2 leading-relaxed`}
      />
      <Ayuda id={`${campoId}-ayuda`} ayuda={ayuda} />
    </div>
  );
}
