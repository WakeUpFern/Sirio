import { Boton } from "@/components/ui/boton";
import { Etiqueta } from "@/components/ui/etiqueta";
import { Estrella } from "@/components/ui/estrella";
import { BarraSemanas } from "@/components/objetivo/barra-semanas";
import { IconoAccion } from "@/components/actividad/tipo-accion";
import type { TipoAccion } from "@/lib/tipos";

// Mini vistas de la portada, hechas con los mismos componentes que la app.
// Son ilustraciones: no son interactivas.

export function MiniCola() {
  return (
    <div className="space-y-2.5">
      <div className="rounded-tarjeta border border-linea bg-superficie p-4 shadow-reposo">
        <Etiqueta tono="atencion" forma="chip">
          Sirio pregunta
        </Etiqueta>
        <p className="mt-2 text-[14px] font-extrabold leading-snug tracking-[-0.01em]">
          ¿Con qué gancho abrimos el sketch del cliente?
        </p>
        <ul className="mt-3 space-y-1.5">
          {["«Solo mueve el logo tantito.»", "«Es literalmente un botón.»"].map((o, i) => (
            <li
              key={o}
              className={`flex items-center gap-2.5 rounded-boton border px-3 py-2 text-[12.5px] font-semibold ${
                i === 0 ? "border-acento" : "border-linea"
              }`}
            >
              <span className="mono grid h-5 w-5 place-items-center rounded-chip bg-superficie-2 text-[10.5px] text-tinta-2">{i + 1}</span>
              {o}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-tarjeta border border-linea bg-superficie p-4">
        <Etiqueta tono="atencion" forma="chip">
          Solo tú puedes
        </Etiqueta>
        <p className="mt-2 text-[14px] font-extrabold tracking-[-0.01em]">Confirma la grabación del jueves a las 11:00</p>
        <div className="mt-3 flex gap-2">
          <Boton variante="solido">Confirmar</Boton>
          <Boton variante="contorno">Proponer otro horario</Boton>
        </div>
      </div>
    </div>
  );
}

export function MiniObjetivo() {
  return (
    <div className="rounded-tarjeta border border-linea bg-superficie p-5 shadow-reposo">
      <p className="etiqueta-grupo">Objetivo a 90 días</p>
      <p className="mt-1.5 text-[18px] font-extrabold leading-tight tracking-[-0.025em]">
        Conseguir 10 conversaciones con empresas que podrían contratar a FEBAcode
      </p>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="mono text-[26px] font-medium leading-none">2</span>
        <span className="mono text-[12px] text-tinta-3">de 10 · faltan 75 días</span>
      </div>
      <div className="mt-4">
        <BarraSemanas actual={3} total={13} variante="completa" />
      </div>
    </div>
  );
}

const FILAS: { hora: string; tipo: TipoAccion; texto: string }[] = [
  { hora: "09:40", tipo: "propuso", texto: "Propuse los pasos de la semana 4" },
  { hora: "09:12", tipo: "pregunto", texto: "Pregunté con qué gancho abrimos el sketch" },
  { hora: "08:31", tipo: "redacto", texto: "Redacté la publicación de LinkedIn" },
  { hora: "08:02", tipo: "leyo", texto: "Leí los pendientes y armé el resumen" },
];

export function MiniBitacora() {
  return (
    <div className="overflow-hidden rounded-tarjeta border border-linea bg-superficie shadow-reposo">
      <p className="etiqueta-grupo border-b border-linea px-4 py-2.5">Hoy · mar 17 nov</p>
      <ul className="divide-y divide-linea text-[12.5px]">
        <li className="flex items-center gap-3 bg-acento-suave px-4 py-2.5">
          <span className="mono w-10 text-acento-texto">ahora</span>
          <span className="grid h-7 w-7 place-items-center rounded-chip bg-superficie">
            <Estrella tamano={14} trabajando />
          </span>
          <span className="min-w-0 flex-1 font-semibold">Escribo el guion de «Reunión que pudo ser un correo»</span>
        </li>
        {FILAS.map((f) => (
          <li key={f.hora} className="flex items-center gap-3 px-4 py-2.5">
            <span className="mono w-10 text-tinta-3">{f.hora}</span>
            <IconoAccion tipo={f.tipo} />
            <span className="min-w-0 flex-1">{f.texto}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
