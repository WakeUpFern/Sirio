"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { PanelPestana, Pestanas } from "@/components/ui/pestanas";
import { Vista } from "@/components/marco/vista";
import { EstadoVacio } from "@/components/marco/estado-vacio";
import { ListaPiezas } from "@/components/contenido/lista-piezas";
import { DetallePieza } from "@/components/contenido/detalle-pieza";
import { DialogoPedirPieza } from "@/components/contenido/dialogo-pedir-pieza";
import { useMaqueta } from "@/lib/store";
import { elegir, useParametros } from "@/lib/use-parametros";
import type { EstadoPieza } from "@/lib/tipos";

const PESTANAS: { valor: EstadoPieza; etiqueta: string }[] = [
  { valor: "por-aprobar", etiqueta: "Por aprobar" },
  { valor: "aprobado", etiqueta: "Aprobado" },
  { valor: "guion", etiqueta: "Guiones" },
  { valor: "descartado", etiqueta: "Descartado" },
];

const VACIO: Record<EstadoPieza, { titulo: string; texto: string }> = {
  "por-aprobar": {
    titulo: "Nada por aprobar",
    texto: "Cuando Sirio termine una pieza, aparece aquí. Si necesitas algo ya, usa «Pedir una pieza».",
  },
  aprobado: { titulo: "Aún no apruebas piezas", texto: "Lo que apruebes queda aquí, listo para que alguien del equipo lo publique." },
  guion: { titulo: "Sin guiones en curso", texto: "Pídele una pieza a Sirio y verás aquí el guion mientras lo escribe." },
  descartado: { titulo: "Nada descartado", texto: "Lo que descartes queda aquí por si quieres recuperarlo." },
};

/** Contenido: lo que Sirio propone y lo que ya se aprobó. */
export function VistaContenido() {
  const { piezas } = useMaqueta();
  const { params, fijar } = useParametros();
  const [pidiendo, setPidiendo] = useState(false);

  const piezaUrl = piezas.find((p) => p.id === params.get("pieza"));
  const pestanaUrl = params.get("pestana");
  const pestana = !pestanaUrl && piezaUrl ? piezaUrl.estado : elegir(pestanaUrl, PESTANAS.map((p) => p.valor), "por-aprobar");
  const lista = piezas.filter((p) => p.estado === pestana);
  const elegida = lista.find((p) => p.id === piezaUrl?.id) ?? lista[0];

  return (
    <Vista
      titulo="Contenido"
      apoyo="Sirio deja las piezas listas; una persona del equipo las publica."
      acciones={
        <Boton variante="principal" icono={<Plus size={16} strokeWidth={2} aria-hidden="true" />} onClick={() => setPidiendo(true)}>
          Pedir una pieza
        </Boton>
      }
    >
      <Pestanas
        idBase="contenido"
        etiqueta="Estado de las piezas"
        valor={pestana}
        onCambio={(v) => fijar({ pestana: v, pieza: null })}
        opciones={PESTANAS.map((p) => ({ ...p, contador: piezas.filter((x) => x.estado === p.valor).length }))}
      />
      <PanelPestana idBase="contenido" valor={pestana}>
        <div className="mt-5">
          {lista.length === 0 ? (
            <EstadoVacio
              titulo={VACIO[pestana].titulo}
              texto={VACIO[pestana].texto}
              accion={
                pestana === "descartado" ? null : (
                  <Boton variante="contorno" onClick={() => setPidiendo(true)}>
                    Pedir una pieza
                  </Boton>
                )
              }
            />
          ) : (
            <div className="grid items-start gap-5 @min-[720px]:grid-cols-[minmax(240px,300px)_minmax(0,1fr)]">
              <ListaPiezas
                piezas={lista}
                seleccionada={elegida?.id}
                onElegir={(id) => fijar({ pestana, pieza: id })}
              />
              {elegida ? <DetallePieza key={elegida.id} pieza={elegida} /> : null}
            </div>
          )}
        </div>
      </PanelPestana>
      <DialogoPedirPieza
        abierto={pidiendo}
        onCerrar={() => setPidiendo(false)}
        onPedida={(id) => fijar({ pestana: "guion", pieza: id })}
      />
    </Vista>
  );
}
