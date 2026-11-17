import { BookOpen, CalendarClock, Lightbulb, MessageCircleQuestion, PenLine } from "lucide-react";
import type { EstadoPaso, TipoAccion } from "@/lib/tipos";
import { Etiqueta, type TonoEtiqueta } from "@/components/ui/etiqueta";

export const TIPOS_ACCION: { valor: TipoAccion; nombre: string }[] = [
  { valor: "leyo", nombre: "Leyó" },
  { valor: "redacto", nombre: "Redactó" },
  { valor: "propuso", nombre: "Propuso" },
  { valor: "pregunto", nombre: "Preguntó" },
  { valor: "programo", nombre: "Programó" },
];

const ICONOS = {
  leyo: BookOpen,
  redacto: PenLine,
  propuso: Lightbulb,
  pregunto: MessageCircleQuestion,
  programo: CalendarClock,
} as const;

/** Icono del tipo de acción, en un cuadro hundido. */
export function IconoAccion({ tipo }: { tipo: TipoAccion }) {
  const Icono = ICONOS[tipo];
  const nombre = TIPOS_ACCION.find((t) => t.valor === tipo)?.nombre;
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-chip bg-superficie-2 text-tinta-2" title={nombre}>
      <Icono size={15} strokeWidth={1.75} aria-hidden="true" />
      <span className="sr-only">{nombre}</span>
    </span>
  );
}

const ESTADO_PASO: Record<EstadoPaso, { tono: TonoEtiqueta; texto: string }> = {
  hecho: { tono: "listo", texto: "Hecho" },
  "en-curso": { tono: "acento", texto: "En curso" },
  pendiente: { tono: "neutro", texto: "Pendiente" },
};

export function EtiquetaPaso({ estado }: { estado: EstadoPaso }) {
  const e = ESTADO_PASO[estado];
  return <Etiqueta tono={e.tono}>{e.texto}</Etiqueta>;
}
