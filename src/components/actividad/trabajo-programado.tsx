"use client";

import { Etiqueta } from "@/components/ui/etiqueta";
import { Interruptor } from "@/components/ui/interruptor";
import { Tarjeta } from "@/components/ui/tarjeta";
import { EstadoVacio } from "@/components/marco/estado-vacio";
import { useMaqueta } from "@/lib/store";

/** Tabla de tareas programadas, con un interruptor para pausar cada una. */
export function TrabajoProgramado() {
  const { tareas, alternarTarea } = useMaqueta();
  if (tareas.length === 0) {
    return (
      <EstadoVacio
        titulo="Sin trabajo programado"
        texto="Pídele a Sirio en el panel que haga algo cada semana y aparecerá aquí."
      />
    );
  }
  return (
    <Tarjeta relleno="ninguno" className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-[13px]">
        <caption className="sr-only">Tareas que Sirio hace sin que le escriban</caption>
        <thead>
          <tr className="border-b border-linea">
            {["Tarea", "Horario", "Última ejecución", "Próxima", "Activa"].map((c) => (
              <th key={c} scope="col" className="etiqueta-grupo px-5 py-3 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-linea">
          {tareas.map((t) => (
            <tr key={t.id} className={t.activa ? "" : "text-tinta-3"}>
              <th scope="row" className="max-w-[280px] px-5 py-3.5 font-normal">
                <span className={`block text-[13.5px] font-bold ${t.activa ? "text-tinta" : "text-tinta-2"}`}>{t.nombre}</span>
                <span className="block text-[12.5px] text-tinta-2">{t.descripcion}</span>
              </th>
              <td className="px-5 py-3.5">{t.horario}</td>
              <td className="px-5 py-3.5">
                <span className="mono block text-tinta-2">{t.ultima.cuando}</span>
                <span className="mt-1 block">
                  {t.ultima.resultado === "hecho" ? (
                    <Etiqueta tono="listo">Hecho</Etiqueta>
                  ) : (
                    <Etiqueta tono="error">Falló</Etiqueta>
                  )}
                </span>
                {t.ultima.nota ? <span className="mt-1 block text-[12px] text-tinta-3">{t.ultima.nota}</span> : null}
              </td>
              <td className="px-5 py-3.5">
                {t.activa ? <span className="mono text-tinta-2">{t.proxima}</span> : <Etiqueta>En pausa</Etiqueta>}
              </td>
              <td className="px-4 py-3.5">
                <Interruptor
                  activo={t.activa}
                  etiqueta={`${t.activa ? "Pausar" : "Reanudar"} «${t.nombre}»`}
                  onCambio={(v) => alternarTarea(t.id, v)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Tarjeta>
  );
}
