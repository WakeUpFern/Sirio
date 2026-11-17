"use client";

import { Boton, BotonEnlace } from "@/components/ui/boton";
import { Miniatura } from "@/components/contenido/miniatura";
import { GuionEscenas } from "@/components/contenido/guion-escenas";
import { PREGUNTAS, PROPUESTA_SEMANA, TAREAS_PERSONA } from "@/lib/data";
import { useMaqueta } from "@/lib/store";
import { MarcoDecision } from "./marco-decision";
import { OpcionesPregunta } from "./opciones-pregunta";

interface Props {
  id: string;
  desplegada: boolean;
  onAlternar: () => void;
}

/** La acción que más importa es principal solo en la tarjeta desplegada: una por vista. */
const fuerte = (desplegada: boolean) => (desplegada ? "principal" : "solido");

export function DecisionPieza({ piezaId, ...p }: Props & { piezaId: string }) {
  const { piezas, aprobarPieza, descartarPieza, pedirOtraVersion } = useMaqueta();
  const pieza = piezas.find((x) => x.id === piezaId);
  if (!pieza) return null;
  return (
    <MarcoDecision
      {...p}
      tipo="Aprobar pieza"
      titulo={pieza.titulo}
      contexto={`${pieza.canal} · ${pieza.formato}${pieza.sugerida ? ` · sugiero publicarla el ${pieza.sugerida}` : ""}`}
      contenido={
        <div className="flex gap-4">
          <Miniatura pieza={pieza} />
          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <p className="etiqueta-grupo">Texto de la publicación</p>
              <p className="mt-1 text-[13.5px] leading-relaxed">{pieza.texto}</p>
              <p className="mono mt-1 text-tinta-3">{pieza.etiquetas}</p>
            </div>
            {pieza.escenas.length > 0 ? (
              <div>
                <p className="etiqueta-grupo">Guion · {pieza.escenas.length} escenas</p>
                <div className="mt-1.5">
                  <GuionEscenas escenas={pieza.escenas} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      }
      acciones={
        <>
          <Boton variante={fuerte(p.desplegada)} onClick={() => aprobarPieza(pieza.id)}>
            Aprobar
          </Boton>
          <Boton variante="contorno" onClick={() => pedirOtraVersion(pieza.id)}>
            Pedir otra versión
          </Boton>
          <Boton variante="texto" onClick={() => descartarPieza(pieza.id)}>
            Descartar
          </Boton>
        </>
      }
    />
  );
}

export function DecisionPregunta({ preguntaId, ...p }: Props & { preguntaId: string }) {
  const { responderPregunta, abrirHilo } = useMaqueta();
  const q = PREGUNTAS.find((x) => x.id === preguntaId);
  if (!q) return null;
  return (
    <MarcoDecision
      {...p}
      tipo="Sirio pregunta"
      titulo={q.titulo}
      contexto={q.contexto}
      contenido={<OpcionesPregunta pregunta={q} onElegir={(o) => responderPregunta(q.id, o)} />}
      acciones={
        <>
          {p.desplegada ? null : (
            <Boton variante="solido" onClick={p.onAlternar}>
              Responder
            </Boton>
          )}
          <Boton variante="texto" onClick={() => abrirHilo(q.hiloId)}>
            Abrir el hilo
          </Boton>
        </>
      }
    />
  );
}

export function DecisionPropuesta(p: Props) {
  const { decidirPropuesta, escribirEnHilo } = useMaqueta();
  return (
    <MarcoDecision
      {...p}
      tipo="Sirio pregunta"
      titulo="¿Aceptas los pasos de la semana 4?"
      contexto="Los propuse en la revisión del objetivo. Empezarían el lunes 23 nov."
      contenido={
        <ol className="space-y-2">
          {PROPUESTA_SEMANA.map((paso, i) => (
            <li key={paso.id} className="flex items-baseline gap-3 text-[13.5px]">
              <span className="mono text-tinta-3">{i + 1}</span>
              <span className="min-w-0 flex-1">{paso.texto}</span>
              <span className="shrink-0 text-[12px] text-tinta-3">{paso.responsable}</span>
            </li>
          ))}
        </ol>
      }
      acciones={
        <>
          <Boton variante={fuerte(p.desplegada)} onClick={() => decidirPropuesta("aceptada")}>
            Aceptar
          </Boton>
          <Boton variante="contorno" onClick={() => escribirEnHilo("t8", "Quiero cambiar la propuesta de la semana 4.")}>
            Cambiar
          </Boton>
          <BotonEnlace variante="texto" href="/app/objetivo">
            Ver en Objetivo
          </BotonEnlace>
        </>
      }
    />
  );
}

export function DecisionPersona({ tareaId, ...p }: Props & { tareaId: string }) {
  const { resolverTarea, escribirEnHilo } = useMaqueta();
  const t = TAREAS_PERSONA.find((x) => x.id === tareaId);
  if (!t) return null;
  return (
    <MarcoDecision
      {...p}
      tipo="Solo tú puedes"
      titulo={t.titulo}
      contexto={t.contexto}
      contenido={
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-[13px]">
          <dt className="text-tinta-3">Cuándo</dt>
          <dd>Jueves 19 nov, 11:00 a 12:00</dd>
          <dt className="text-tinta-3">Quiénes</dt>
          <dd>Dani y Valeria</dd>
          <dt className="text-tinta-3">Qué se graba</dt>
          <dd>«El intern y el deploy del viernes», 4 escenas</dd>
        </dl>
      }
      acciones={
        <>
          <Boton variante={fuerte(p.desplegada)} onClick={() => resolverTarea(t.id)}>
            {t.accion}
          </Boton>
          <Boton variante="contorno" onClick={() => escribirEnHilo(t.hiloId, "¿Podemos grabar en otro horario?")}>
            {t.alternativa}
          </Boton>
        </>
      }
    />
  );
}
