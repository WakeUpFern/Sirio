"use client";

import { PanelPestana, Pestanas } from "@/components/ui/pestanas";
import { Vista } from "@/components/marco/vista";
import { Bitacora } from "@/components/actividad/bitacora";
import { TIPOS_ACCION } from "@/components/actividad/tipo-accion";
import { TrabajoProgramado } from "@/components/actividad/trabajo-programado";
import { useMaqueta } from "@/lib/store";
import { elegir, useParametros } from "@/lib/use-parametros";

const PESTANAS = ["bitacora", "programado"] as const;
const TIPOS = ["todo", ...TIPOS_ACCION.map((t) => t.valor)] as const;

/** Actividad: la bitácora de Sirio y su trabajo programado. */
export function VistaActividad() {
  const { tareas } = useMaqueta();
  const { params, fijar } = useParametros();
  const pestana = elegir(params.get("pestana"), PESTANAS, "bitacora");
  const tipo = elegir(params.get("tipo"), TIPOS, "todo");
  const activas = tareas.filter((t) => t.activa).length;

  return (
    <Vista titulo="Actividad" apoyo="Todo lo que Sirio hace queda a la vista, también lo que hace sin que le escribas.">
      <Pestanas
        idBase="actividad"
        etiqueta="Actividad"
        valor={pestana}
        onCambio={(v) => fijar({ pestana: v === "bitacora" ? null : v, tipo: null })}
        opciones={[
          { valor: "bitacora", etiqueta: "Bitácora" },
          { valor: "programado", etiqueta: "Trabajo programado", contador: activas },
        ]}
      />
      <PanelPestana idBase="actividad" valor={pestana}>
        <div className="mt-5">
          {pestana === "bitacora" ? (
            <Bitacora tipo={tipo} onFiltrar={(t) => fijar({ tipo: t === "todo" ? null : t })} />
          ) : (
            <TrabajoProgramado />
          )}
        </div>
      </PanelPestana>
    </Vista>
  );
}
