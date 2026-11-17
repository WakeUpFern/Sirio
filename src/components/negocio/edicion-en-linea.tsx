"use client";

import { useState, type FormEvent } from "react";
import { Boton } from "@/components/ui/boton";
import { AreaTexto } from "@/components/ui/campo";

/** Formulario para editar un texto en su lugar. Escape cancela. */
export function EdicionEnLinea({
  etiqueta,
  valorInicial,
  onGuardar,
  onCancelar,
}: {
  etiqueta: string;
  valorInicial: string;
  onGuardar: (valor: string) => void;
  onCancelar: () => void;
}) {
  const [valor, setValor] = useState(valorInicial);

  function guardar(e: FormEvent) {
    e.preventDefault();
    if (!valor.trim()) return;
    onGuardar(valor);
  }

  return (
    <form
      onSubmit={guardar}
      onKeyDown={(e) => {
        if (e.key === "Escape") onCancelar();
      }}
      className="aparece space-y-2"
    >
      <AreaTexto etiqueta={etiqueta} ocultarEtiqueta rows={3} value={valor} onChange={(e) => setValor(e.target.value)} autoFocus />
      <div className="flex gap-2">
        <Boton type="submit" variante="solido" disabled={!valor.trim()}>
          Guardar
        </Boton>
        <Boton variante="texto" onClick={onCancelar}>
          Cancelar
        </Boton>
      </div>
    </form>
  );
}
