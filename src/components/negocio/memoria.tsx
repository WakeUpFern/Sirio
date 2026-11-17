"use client";

import { useState } from "react";
import { Info, Pencil, Trash2 } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { Tarjeta } from "@/components/ui/tarjeta";
import { EstadoVacio } from "@/components/marco/estado-vacio";
import { useMaqueta } from "@/lib/store";
import type { NotaMemoria } from "@/lib/tipos";
import { EdicionEnLinea } from "./edicion-en-linea";

const ICONO = { size: 15, strokeWidth: 1.75, "aria-hidden": true } as const;

function Nota({ nota }: { nota: NotaMemoria }) {
  const { hilos, abrirHilo, editarNota, borrarNota } = useMaqueta();
  const [editando, setEditando] = useState(false);
  const hilo = hilos.find((h) => h.id === nota.hiloId);
  return (
    <li className="flex gap-4 px-5 py-4">
      <div className="min-w-0 flex-1">
        {editando ? (
          <EdicionEnLinea
            etiqueta="Texto de la nota"
            valorInicial={nota.texto}
            onCancelar={() => setEditando(false)}
            onGuardar={(v) => {
              editarNota(nota.id, v);
              setEditando(false);
            }}
          />
        ) : (
          <p className="text-[13.5px] leading-relaxed">{nota.texto}</p>
        )}
        <p className="mt-1 flex flex-wrap items-center gap-x-1 text-[12.5px] text-tinta-3">
          <span>Salió de</span>
          {hilo ? (
            <button
              type="button"
              onClick={() => abrirHilo(hilo.id)}
              className="rounded-chip font-semibold text-acento-texto underline decoration-transparent underline-offset-4 transicion hover:decoration-acento"
            >
              {hilo.titulo}
            </button>
          ) : (
            <span>un hilo archivado</span>
          )}
          <span className="mono">· {nota.cuando}</span>
        </p>
      </div>
      {editando ? null : (
        <div className="flex shrink-0 items-start gap-1">
          <Boton variante="texto" soloIcono etiqueta="Editar nota" icono={<Pencil {...ICONO} />} onClick={() => setEditando(true)} />
          <Boton variante="texto" soloIcono etiqueta="Borrar nota" icono={<Trash2 {...ICONO} />} onClick={() => borrarNota(nota.id)} />
        </div>
      )}
    </li>
  );
}

/** Lo que Sirio aprendió del negocio. Entra a cada hilo nuevo. */
export function Memoria() {
  const { notas } = useMaqueta();
  return (
    <div className="space-y-4">
      <p className="flex items-start gap-2 rounded-boton bg-acento-suave px-3.5 py-2.5 text-[13px] text-tinta">
        <Info size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-acento-texto" aria-hidden="true" />
        Estas notas entran a cada hilo nuevo. Si algo ya no es cierto, edítalo o bórralo y Sirio deja de usarlo.
      </p>
      {notas.length === 0 ? (
        <EstadoVacio
          titulo="Sin notas todavía"
          texto="Cuando archives un hilo, Sirio te propone qué guardar aquí. Tú confirmas cada nota."
        />
      ) : (
        <Tarjeta relleno="ninguno">
          <ul className="divide-y divide-linea">
            {notas.map((n) => (
              <Nota key={n.id} nota={n} />
            ))}
          </ul>
        </Tarjeta>
      )}
    </div>
  );
}
