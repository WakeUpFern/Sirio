"use client";

import { Vista } from "@/components/marco/vista";
import { Equipo, ModelosYLlaves } from "@/components/ajustes/equipo-y-modelos";
import { Autonomia, Integraciones, Notificaciones } from "@/components/ajustes/preferencias";
import { elegir, useParametros } from "@/lib/use-parametros";

const SECCIONES = [
  { valor: "equipo", nombre: "Equipo", apoyo: "Quién puede entrar al espacio de FEBAcode." },
  { valor: "modelos", nombre: "Modelos y llaves", apoyo: "Qué modelo usa Sirio para cada trabajo." },
  { valor: "autonomia", nombre: "Autonomía", apoyo: "Cuánto hace Sirio sin preguntarte." },
  { valor: "notificaciones", nombre: "Notificaciones", apoyo: "Cuándo te avisa Sirio." },
  { valor: "integraciones", nombre: "Integraciones", apoyo: "Las apps que Sirio podrá usar." },
] as const;

const CONTENIDO = {
  equipo: Equipo,
  modelos: ModelosYLlaves,
  autonomia: Autonomia,
  notificaciones: Notificaciones,
  integraciones: Integraciones,
};

/** Ajustes: sin panel de Sirio. Secciones a la izquierda y contenido a la derecha. */
export function VistaAjustes() {
  const { params, fijar } = useParametros();
  const seccion = elegir(params.get("seccion"), SECCIONES.map((s) => s.valor), "equipo");
  const actual = SECCIONES.find((s) => s.valor === seccion)!;
  const Contenido = CONTENIDO[seccion];

  return (
    <Vista titulo="Ajustes" conPanel={false}>
      <div className="grid items-start gap-8 @min-[760px]:grid-cols-[200px_minmax(0,1fr)]">
        <nav aria-label="Secciones de ajustes">
          <ul className="space-y-0.5 max-[759px]:flex max-[759px]:flex-wrap max-[759px]:gap-1">
            {SECCIONES.map((s) => {
              const activa = s.valor === seccion;
              return (
                <li key={s.valor}>
                  <button
                    type="button"
                    aria-current={activa ? "page" : undefined}
                    onClick={() => fijar({ seccion: s.valor === "equipo" ? null : s.valor })}
                    className={`relative flex h-9 w-full items-center rounded-boton px-3 text-left text-[13.5px] font-bold transicion ${
                      activa ? "bg-acento-suave text-tinta" : "text-tinta-2 hover:bg-superficie-2 hover:text-tinta"
                    }`}
                  >
                    {activa ? <span className="absolute inset-y-2 left-0 w-[3px] bg-acento" aria-hidden="true" /> : null}
                    {s.nombre}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <section aria-labelledby="titulo-seccion" className="@container min-w-0">
          <h2 id="titulo-seccion" className="text-[18px] tracking-[-0.02em]">
            {actual.nombre}
          </h2>
          <p className="mb-5 mt-1 text-[13.5px] text-tinta-2">{actual.apoyo}</p>
          <Contenido />
        </section>
      </div>
    </Vista>
  );
}
