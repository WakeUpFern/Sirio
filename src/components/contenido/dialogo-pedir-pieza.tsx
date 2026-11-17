"use client";

import { useState, type FormEvent } from "react";
import { Boton } from "@/components/ui/boton";
import { AreaTexto } from "@/components/ui/campo";
import { Dialogo } from "@/components/ui/dialogo";
import { useMaqueta } from "@/lib/store";

const FORMATOS = ["Sketch vertical", "Publicación de LinkedIn", "Idea para sketch"];

function Formulario({ onCerrar, onPedida }: { onCerrar: () => void; onPedida: (id: string) => void }) {
  const { pedirPieza } = useMaqueta();
  const [descripcion, setDescripcion] = useState("");
  const [formato, setFormato] = useState(FORMATOS[0]);

  function pedir(e: FormEvent) {
    e.preventDefault();
    if (!descripcion.trim()) return;
    onPedida(pedirPieza(descripcion.trim(), formato));
    onCerrar();
  }

  return (
    <form onSubmit={pedir} className="space-y-5">
      <AreaTexto
        etiqueta="¿Qué pieza necesitas?"
        placeholder="Un sketch sobre cómo cotizamos un proyecto, con Mateo"
        rows={3}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <fieldset>
        <legend className="mb-1.5 text-[12.5px] font-semibold text-tinta-2">Formato</legend>
        <div className="flex flex-wrap gap-2">
          {FORMATOS.map((f) => (
            <label
              key={f}
              className={`flex h-9 cursor-pointer items-center gap-2 rounded-boton border px-3 text-[13px] font-semibold transicion has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-acento ${
                formato === f ? "border-acento bg-acento-suave text-tinta" : "border-linea text-tinta-2 hover:text-tinta"
              }`}
            >
              <input
                type="radio"
                name="formato"
                value={f}
                checked={formato === f}
                onChange={() => setFormato(f)}
                className="sr-only"
              />
              {f}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex justify-end gap-2 pt-1">
        <Boton variante="texto" onClick={onCerrar}>
          Cancelar
        </Boton>
        <Boton type="submit" variante="solido" disabled={!descripcion.trim()}>
          Pedir a Sirio
        </Boton>
      </div>
    </form>
  );
}

/** Pedirle una pieza a Sirio. Entra a Guiones mientras la escribe. */
export function DialogoPedirPieza({
  abierto,
  onCerrar,
  onPedida,
}: {
  abierto: boolean;
  onCerrar: () => void;
  onPedida: (id: string) => void;
}) {
  return (
    <Dialogo
      abierto={abierto}
      onCerrar={onCerrar}
      titulo="Pedir una pieza"
      descripcion="Sirio la escribe con la ficha, el objetivo y la memoria del negocio. Te la deja en Por aprobar."
    >
      {abierto ? <Formulario onCerrar={onCerrar} onPedida={onPedida} /> : null}
    </Dialogo>
  );
}
