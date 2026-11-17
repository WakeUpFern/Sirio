"use client";

import { Copy, MessageSquare, RotateCcw } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { Etiqueta, type TonoEtiqueta } from "@/components/ui/etiqueta";
import { Tarjeta } from "@/components/ui/tarjeta";
import { useMaqueta } from "@/lib/store";
import type { EstadoPieza, Pieza } from "@/lib/tipos";
import { GuionEscenas, duracion } from "./guion-escenas";
import { Telefono } from "./telefono";

const ICONO = { size: 15, strokeWidth: 1.75, "aria-hidden": true } as const;

const ESTADO: Record<EstadoPieza, { tono: TonoEtiqueta; texto: string }> = {
  "por-aprobar": { tono: "atencion", texto: "Por aprobar" },
  aprobado: { tono: "listo", texto: "Aprobada" },
  guion: { tono: "acento", texto: "En guion" },
  descartado: { tono: "neutro", texto: "Descartada" },
};

function Acciones({ pieza }: { pieza: Pieza }) {
  const { aprobarPieza, descartarPieza, recuperarPieza, pedirOtraVersion, abrirHilo, avisar } = useMaqueta();

  async function copiar() {
    try {
      await navigator.clipboard.writeText(`${pieza.texto}\n\n${pieza.etiquetas}`.trim());
      avisar("Copié el texto de la publicación.");
    } catch {
      avisar("No pude copiar. Selecciona el texto y cópialo a mano.");
    }
  }

  const copiarTexto = (
    <Boton variante={pieza.estado === "aprobado" ? "contorno" : "texto"} icono={<Copy {...ICONO} />} onClick={copiar}>
      Copiar texto
    </Boton>
  );

  if (pieza.estado === "por-aprobar") {
    return (
      <>
        <Boton variante="solido" onClick={() => aprobarPieza(pieza.id)}>
          Aprobar
        </Boton>
        <Boton variante="contorno" onClick={() => pedirOtraVersion(pieza.id)}>
          Pedir otra versión
        </Boton>
        {copiarTexto}
        <Boton variante="texto" onClick={() => descartarPieza(pieza.id)}>
          Descartar
        </Boton>
      </>
    );
  }
  if (pieza.estado === "aprobado") return copiarTexto;
  if (pieza.estado === "descartado") {
    return (
      <Boton variante="contorno" icono={<RotateCcw {...ICONO} />} onClick={() => recuperarPieza(pieza.id)}>
        Recuperar
      </Boton>
    );
  }
  return (
    <>
      {pieza.hiloId ? (
        <Boton variante="contorno" icono={<MessageSquare {...ICONO} />} onClick={() => abrirHilo(pieza.hiloId!)}>
          Abrir el hilo
        </Boton>
      ) : (
        <Boton variante="contorno" onClick={() => pedirOtraVersion(pieza.id)}>
          Pedir el guion
        </Boton>
      )}
      <Boton variante="texto" onClick={() => descartarPieza(pieza.id)}>
        Descartar
      </Boton>
    </>
  );
}

const NOTA: Partial<Record<EstadoPieza, string>> = {
  aprobado: "Lista para publicar. En esta versión Sirio no publica: la publica una persona del equipo.",
  guion: "Sirio todavía la está escribiendo. Pasa a Por aprobar cuando esté lista.",
};

/** Detalle: vista previa, texto de la publicación, guion y acciones. */
export function DetallePieza({ pieza }: { pieza: Pieza }) {
  const e = ESTADO[pieza.estado];
  const segundos = duracion(pieza.escenas);
  return (
    <Tarjeta as="article" etiquetaAria={`Detalle de ${pieza.titulo}`} relleno="ninguno" className="@container">
      <header className="border-b border-linea px-6 py-5">
        <Etiqueta tono={e.tono}>{e.texto}</Etiqueta>
        <h2 className="mt-2 text-[19px] tracking-[-0.02em]">{pieza.titulo}</h2>
        <p className="mt-1 text-[13px] text-tinta-2">
          {pieza.canal} · {pieza.formato}
          {pieza.sugerida ? ` · sugerida para el ${pieza.sugerida}` : ""}
        </p>
        <p className="mono mt-1 text-tinta-3">{pieza.decision ?? `Propuesta por Sirio · ${pieza.creada}`}</p>
      </header>

      <div className="grid gap-6 px-6 py-5 @min-[560px]:grid-cols-[188px_minmax(0,1fr)]">
        <Telefono pieza={pieza} />
        <div className="min-w-0 space-y-5">
          <section>
            <h3 className="etiqueta-grupo">Texto de la publicación</h3>
            <div className="mt-2 rounded-boton bg-superficie-2 p-3.5">
              <p className="text-[13.5px] leading-relaxed">{pieza.texto}</p>
              {pieza.etiquetas ? <p className="mono mt-2 text-tinta-3">{pieza.etiquetas}</p> : null}
            </div>
          </section>
          {pieza.escenas.length > 0 ? (
            <section>
              <h3 className="etiqueta-grupo">
                Guion · {pieza.escenas.length} escenas{segundos > 0 ? ` · ${segundos} s` : ""}
              </h3>
              <div className="mt-2">
                <GuionEscenas escenas={pieza.escenas} />
              </div>
            </section>
          ) : null}
          {NOTA[pieza.estado] ? <p className="text-[12.5px] text-tinta-3">{NOTA[pieza.estado]}</p> : null}
        </div>
      </div>

      <footer className="flex flex-wrap items-center gap-2 border-t border-linea px-6 py-4">
        <Acciones pieza={pieza} />
      </footer>
    </Tarjeta>
  );
}
