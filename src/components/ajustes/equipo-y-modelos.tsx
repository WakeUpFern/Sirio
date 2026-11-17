"use client";

import { useState, type FormEvent } from "react";
import { KeyRound, Plus } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { Campo } from "@/components/ui/campo";
import { Etiqueta } from "@/components/ui/etiqueta";
import { Tarjeta } from "@/components/ui/tarjeta";
import { EQUIPO } from "@/lib/data";
import { useMaqueta } from "@/lib/store";

/** Quién entra al espacio. Solo correos de una lista permitida. */
export function Equipo() {
  const { avisar } = useMaqueta();
  const [permitidos, setPermitidos] = useState<string[]>([]);
  const [correo, setCorreo] = useState("");
  const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());

  function agregar(e: FormEvent) {
    e.preventDefault();
    if (!valido) return;
    setPermitidos((p) => [...p, correo.trim().toLowerCase()]);
    avisar(`Agregué ${correo.trim()} a la lista. Podrá entrar con su cuenta de Google.`);
    setCorreo("");
  }

  return (
    <div className="space-y-5">
      <Tarjeta titulo="Personas en FEBAcode" extra={<span className="mono text-tinta-3">{EQUIPO.length}</span>} relleno="ninguno">
        <ul className="divide-y divide-linea border-t border-linea">
          {EQUIPO.map((p) => (
            <li key={p.correo} className="flex items-center gap-3 px-5 py-3">
              <span className="grid h-8 w-8 place-items-center rounded-chip bg-superficie-2 text-[12px] font-extrabold text-tinta-2" aria-hidden="true">
                {p.nombre[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-bold">{p.nombre}</span>
                <span className="mono block text-tinta-3">{p.correo}</span>
              </span>
              <span className="text-[13px] text-tinta-2">{p.rol}</span>
            </li>
          ))}
          {permitidos.map((c) => (
            <li key={c} className="flex items-center gap-3 px-5 py-3">
              <span className="mono min-w-0 flex-1 text-tinta-2">{c}</span>
              <Etiqueta>Invitación pendiente</Etiqueta>
            </li>
          ))}
        </ul>
      </Tarjeta>
      <Tarjeta titulo="Agregar a la lista permitida">
        <form onSubmit={agregar} className="flex flex-wrap items-end gap-2">
          <div className="min-w-[240px] flex-1">
            <Campo
              etiqueta="Correo"
              type="email"
              placeholder="nombre@febacode.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <Boton type="submit" variante="solido" disabled={!valido} icono={<Plus size={15} strokeWidth={2} aria-hidden="true" />}>
            Agregar
          </Boton>
        </form>
      </Tarjeta>
    </div>
  );
}

const TRABAJOS = [
  { trabajo: "Conversar, redactar ideas y guiones", modelo: "Claude Sonnet" },
  { trabajo: "Proponer el plan del objetivo y los pasos semanales", modelo: "Claude Opus" },
  { trabajo: "Resumir hilos, extraer la ficha, proponer notas de memoria", modelo: "Claude Haiku" },
];

/** Qué modelo usa Sirio para cada trabajo. La llave nunca llega al navegador. */
export function ModelosYLlaves() {
  return (
    <div className="space-y-5">
      <Tarjeta titulo="Proveedor">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-boton bg-superficie-2 text-tinta-2">
            <KeyRound size={17} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13.5px] font-bold">Anthropic</span>
            <span className="block text-[12.5px] text-tinta-2">
              La llave vive en la configuración del servidor. Aquí solo ves si está puesta.
            </span>
          </span>
          <Etiqueta tono="listo">Configurada</Etiqueta>
        </div>
      </Tarjeta>
      <Tarjeta titulo="Modelo por trabajo" relleno="ninguno">
        <ul className="divide-y divide-linea border-t border-linea">
          {TRABAJOS.map((t) => (
            <li key={t.trabajo} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
              <span className="text-[13.5px]">{t.trabajo}</span>
              <span className="mono rounded-chip bg-superficie-2 px-2 py-1 text-tinta-2">{t.modelo}</span>
            </li>
          ))}
        </ul>
        <p className="border-t border-linea px-5 py-3 text-[12.5px] text-tinta-3">
          Los identificadores se leen de configuración y se ajustan con el uso real.
        </p>
      </Tarjeta>
    </div>
  );
}
