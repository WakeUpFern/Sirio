"use client";

import { useState, type FormEvent } from "react";
import { ArrowUp, Paperclip, Square } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { useMaqueta } from "@/lib/store";

/** Compositor del panel: adjuntar y enviar. Enviar es la variante principal en icono. */
export function Compositor() {
  const { enviar, detener, ocupados, hiloId, avisar } = useMaqueta();
  const [borrador, setBorrador] = useState("");
  const ocupado = ocupados.some((o) => o.hiloId === hiloId);

  function mandar(e?: FormEvent) {
    e?.preventDefault();
    if (!borrador.trim() || ocupado) return;
    enviar(borrador);
    setBorrador("");
  }

  return (
    <form onSubmit={mandar} className="shrink-0 border-t border-linea p-3">
      <div className="rounded-boton border border-linea bg-superficie p-2 transicion focus-within:border-tinta-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-acento">
        <label htmlFor="mensaje-sirio" className="sr-only">
          Mensaje para Sirio
        </label>
        <textarea
          id="mensaje-sirio"
          value={borrador}
          onChange={(e) => setBorrador(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) mandar(e);
          }}
          rows={2}
          placeholder="Escríbele a Sirio…"
          className="block w-full resize-none bg-transparent px-1.5 py-1 text-[13.5px] leading-snug outline-none focus-visible:outline-none"
        />
        <div className="mt-1 flex items-center justify-between">
          <Boton
            variante="texto"
            soloIcono
            etiqueta="Adjuntar un archivo"
            icono={<Paperclip size={16} strokeWidth={1.75} aria-hidden="true" />}
            onClick={() => avisar("Adjuntar archivos llega con la versión interna.")}
          />
          {ocupado ? (
            <Boton
              variante="solido"
              soloIcono
              etiqueta="Detener a Sirio"
              icono={<Square size={11} fill="currentColor" aria-hidden="true" />}
              onClick={detener}
            />
          ) : (
            <Boton
              type="submit"
              variante="principal"
              soloIcono
              etiqueta="Enviar mensaje"
              disabled={!borrador.trim()}
              icono={<ArrowUp size={17} strokeWidth={2} aria-hidden="true" />}
            />
          )}
        </div>
      </div>
    </form>
  );
}
