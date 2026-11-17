"use client";

import { useState } from "react";
import { Globe, Pencil } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { Tarjeta } from "@/components/ui/tarjeta";
import { EstadoVacio } from "@/components/marco/estado-vacio";
import { useMaqueta } from "@/lib/store";
import type { CampoFicha } from "@/lib/tipos";
import { EdicionEnLinea } from "./edicion-en-linea";

function FilaCampo({ campo }: { campo: CampoFicha }) {
  const { editarCampo } = useMaqueta();
  const [editando, setEditando] = useState(false);
  return (
    <div className="grid gap-x-8 gap-y-2 px-5 py-4 @min-[640px]:grid-cols-[160px_minmax(0,1fr)_auto]">
      <dt className="pt-1.5 text-[13px] font-bold">{campo.nombre}</dt>
      <dd className="min-w-0">
        {editando ? (
          <EdicionEnLinea
            etiqueta={campo.nombre}
            valorInicial={campo.valor}
            onCancelar={() => setEditando(false)}
            onGuardar={(v) => {
              editarCampo(campo.id, v);
              setEditando(false);
            }}
          />
        ) : (
          <p className="pt-1.5 text-[13.5px] leading-relaxed text-tinta">{campo.valor}</p>
        )}
      </dd>
      {editando ? null : (
        <dd>
          <Boton
            variante="texto"
            icono={<Pencil size={14} strokeWidth={1.75} aria-hidden="true" />}
            aria-label={`Editar ${campo.nombre}`}
            onClick={() => setEditando(true)}
          >
            Editar
          </Boton>
        </dd>
      )}
    </div>
  );
}

/** La ficha del negocio: cada campo se edita en su lugar. */
export function Ficha() {
  const { ficha, fuente } = useMaqueta();
  return (
    <div className="space-y-4">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-tinta-2">
        <Globe size={15} strokeWidth={1.75} className="text-tinta-3" aria-hidden="true" />
        <span>
          Salió de <span className="font-bold text-tinta">{fuente.fuente}</span>, leída el {fuente.leida}.
        </span>
        <span className="text-tinta-3">
          Último cambio: {fuente.ultimoCambio.cuando}, por {fuente.ultimoCambio.quien}.
        </span>
      </p>
      {ficha.length === 0 ? (
        <EstadoVacio
          titulo="La ficha está vacía"
          texto="Dale a Sirio la dirección de tu sitio en el panel y redacta la ficha para que la corrijas."
        />
      ) : (
        <Tarjeta relleno="ninguno" className="@container">
          <dl className="divide-y divide-linea">
            {ficha.map((c) => (
              <FilaCampo key={c.id} campo={c} />
            ))}
          </dl>
        </Tarjeta>
      )}
    </div>
  );
}
