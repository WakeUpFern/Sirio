"use client";

import { useState } from "react";
import { Lock, Plug } from "lucide-react";
import { Etiqueta } from "@/components/ui/etiqueta";
import { Interruptor } from "@/components/ui/interruptor";
import { Tarjeta } from "@/components/ui/tarjeta";
import { EstadoVacio } from "@/components/marco/estado-vacio";
import { useMaqueta } from "@/lib/store";

const MODOS = [
  {
    valor: "por-su-cuenta",
    titulo: "Trabaja por tu cuenta",
    texto: "Sirio avanza en los pasos de la semana y te pide aprobación al final.",
  },
  {
    valor: "preguntar",
    titulo: "Pregúntame antes de empezar",
    texto: "Sirio te avisa antes de empezar cada pieza o tarea nueva.",
  },
];

/** Cuánto hace Sirio sin preguntar. Lo que sale al público siempre pasa por una persona. */
export function Autonomia() {
  const { avisar } = useMaqueta();
  const [modo, setModo] = useState(MODOS[0].valor);
  return (
    <div className="space-y-5">
      <Tarjeta titulo="Cuánto hace Sirio sin preguntar">
        <fieldset className="grid gap-3 @min-[640px]:grid-cols-2">
          <legend className="sr-only">Nivel de autonomía</legend>
          {MODOS.map((m) => (
            <label
              key={m.valor}
              className={`flex cursor-pointer gap-3 rounded-tarjeta border p-4 transicion has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-acento ${
                modo === m.valor ? "border-acento bg-acento-suave" : "border-linea hover:shadow-alzada"
              }`}
            >
              <input
                type="radio"
                name="autonomia"
                value={m.valor}
                checked={modo === m.valor}
                onChange={() => {
                  setModo(m.valor);
                  avisar(`Listo: ${m.titulo.toLowerCase()}.`);
                }}
                className="mt-1 h-4 w-4 shrink-0 accent-acento-texto"
              />
              <span>
                <span className="block text-[13.5px] font-bold">{m.titulo}</span>
                <span className="mt-0.5 block text-[13px] text-tinta-2">{m.texto}</span>
              </span>
            </label>
          ))}
        </fieldset>
      </Tarjeta>
      <Tarjeta>
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-boton bg-superficie-2 text-tinta-2">
            <Lock size={16} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-bold">Lo que sale al público siempre pasa por una persona</p>
            <p className="mt-0.5 text-[13px] text-tinta-2">
              Sirio no publica ni envía nada por su cuenta. Esta regla no se puede cambiar.
            </p>
          </div>
          <Etiqueta>Fija</Etiqueta>
        </div>
      </Tarjeta>
    </div>
  );
}

const AVISOS = [
  { id: "aprobar", texto: "Cuando haya una pieza por aprobar", inicial: true },
  { id: "pregunta", texto: "Cuando Sirio pregunte algo", inicial: true },
  { id: "resumen", texto: "Resumen de la mañana en Hoy", inicial: true },
  { id: "fallo", texto: "Cuando falle una tarea programada", inicial: false },
];

export function Notificaciones() {
  const [activos, setActivos] = useState<Record<string, boolean>>(
    Object.fromEntries(AVISOS.map((a) => [a.id, a.inicial])),
  );
  return (
    <Tarjeta titulo="Avísame dentro de Sirio" relleno="ninguno">
      <ul className="divide-y divide-linea border-t border-linea">
        {AVISOS.map((a) => (
          <li key={a.id} className="flex items-center justify-between gap-4 px-5 py-2">
            <span className="text-[13.5px]">{a.texto}</span>
            <Interruptor
              activo={activos[a.id]}
              etiqueta={a.texto}
              onCambio={(v) => setActivos((s) => ({ ...s, [a.id]: v }))}
            />
          </li>
        ))}
      </ul>
    </Tarjeta>
  );
}

export function Integraciones() {
  return (
    <EstadoVacio
      icono={<Plug size={18} strokeWidth={1.75} aria-hidden="true" />}
      titulo="Las integraciones llegan después de la versión interna"
      texto="Por ahora Sirio deja cada pieza lista y una persona del equipo la publica. Cuando haya integraciones, las conectas aquí."
    />
  );
}
