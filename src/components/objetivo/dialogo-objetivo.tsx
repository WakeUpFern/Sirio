"use client";

import { useState, type FormEvent } from "react";
import { Boton } from "@/components/ui/boton";
import { AreaTexto, Campo } from "@/components/ui/campo";
import { Dialogo } from "@/components/ui/dialogo";
import { useMaqueta } from "@/lib/store";

function Formulario({ onCerrar }: { onCerrar: () => void }) {
  const { objetivo, cambiarObjetivo } = useMaqueta();
  const [frase, setFrase] = useState(objetivo.frase);
  const [medida, setMedida] = useState(objetivo.medida);
  const [meta, setMeta] = useState(String(objetivo.meta));
  const valido = frase.trim() !== "" && medida.trim() !== "" && Number(meta) > 0;

  function guardar(e: FormEvent) {
    e.preventDefault();
    if (!valido) return;
    cambiarObjetivo({ frase: frase.trim(), medida: medida.trim(), meta: Number(meta) });
    onCerrar();
  }

  return (
    <form onSubmit={guardar} className="space-y-4">
      <AreaTexto etiqueta="Objetivo" rows={2} value={frase} onChange={(e) => setFrase(e.target.value)} required />
      <Campo etiqueta="Medida de éxito" value={medida} onChange={(e) => setMedida(e.target.value)} required />
      <Campo
        etiqueta="Meta"
        type="number"
        min={1}
        inputMode="numeric"
        value={meta}
        onChange={(e) => setMeta(e.target.value)}
        ayuda="Cuántas veces debe pasar la medida antes de la fecha límite."
        required
      />
      <div className="flex justify-end gap-2 pt-2">
        <Boton variante="texto" onClick={onCerrar}>
          Cancelar
        </Boton>
        <Boton type="submit" variante="solido" disabled={!valido}>
          Guardar objetivo
        </Boton>
      </div>
    </form>
  );
}

/** Diálogo para cambiar el objetivo vigente. Hay uno solo por espacio. */
export function DialogoObjetivo({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  return (
    <Dialogo
      abierto={abierto}
      onCerrar={onCerrar}
      titulo="Cambiar objetivo"
      descripcion="Sirio ajusta los pasos que siguen. La fecha límite se mantiene: 31 de enero de 2027."
    >
      {abierto ? <Formulario onCerrar={onCerrar} /> : null}
    </Dialogo>
  );
}
