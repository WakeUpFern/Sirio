// Tipos de la maqueta. Cuando cada parte pase a datos reales, sus tipos
// saldrán de los esquemas de Zod y este archivo se irá vaciando.

/* -------------------------------------------------------------- Piezas */

export type EstadoPieza = "por-aprobar" | "aprobado" | "guion" | "descartado";
export type Canal = "TikTok" | "Instagram" | "LinkedIn";

export interface Escena {
  titulo: string;
  texto: string;
  segundos: number;
}

export interface Pieza {
  id: string;
  titulo: string;
  formato: string;
  canal: Canal;
  estado: EstadoPieza;
  /** Cuándo la propuso Sirio, en palabras ("lun 16 nov"). */
  creada: string;
  /** Cuándo sugiere Sirio publicarla. */
  sugerida?: string;
  texto: string;
  etiquetas: string;
  escenas: Escena[];
  hiloId?: string;
  /** Quién decidió y cuándo ("Aprobada por Fernando · hoy, 10:42"). */
  decision?: string;
}

/* ------------------------------------------------------------ Decisiones */

export interface Pregunta {
  id: string;
  titulo: string;
  contexto: string;
  opciones: string[];
  recomendada?: number;
  hiloId: string;
  piezaId?: string;
}

export interface TareaPersona {
  id: string;
  titulo: string;
  contexto: string;
  accion: string;
  alternativa: string;
  hiloId: string;
}

export type ElementoCola =
  | { id: string; tipo: "pieza"; piezaId: string }
  | { id: string; tipo: "pregunta"; preguntaId: string }
  | { id: string; tipo: "persona"; tareaId: string }
  | { id: string; tipo: "propuesta" };

/* -------------------------------------------------------------- Objetivo */

export type EstadoPaso = "hecho" | "en-curso" | "pendiente";

export type Enlace = { tipo: "hilo"; id: string } | { tipo: "pieza"; id: string } | { tipo: "objetivo" };

export interface Paso {
  id: string;
  texto: string;
  estado: EstadoPaso;
  /** "Sirio" o el nombre de una persona del equipo. */
  responsable: string;
  enlace?: Enlace;
}

export interface Semana {
  numero: number;
  rango: string;
  pasos: Paso[];
  resumen?: string;
}

export interface Objetivo {
  frase: string;
  medida: string;
  actual: number;
  meta: number;
  inicio: string;
  fechaLimite: string;
  diasRestantes: number;
  semanaActual: number;
  totalSemanas: number;
}

export type EstadoPropuesta = "abierta" | "aceptada" | "descartada";

/* ------------------------------------------------------------- Actividad */

export type TipoAccion = "leyo" | "redacto" | "propuso" | "pregunto" | "programo";

export interface Accion {
  id: string;
  /** Clave del día: "hoy", "ayer" o una fecha corta. */
  dia: string;
  hora: string;
  tipo: TipoAccion;
  texto: string;
  enlace?: Enlace;
}

export interface TareaProgramada {
  id: string;
  nombre: string;
  descripcion: string;
  horario: string;
  ultima: { cuando: string; resultado: "hecho" | "fallo"; nota?: string };
  proxima: string;
  activa: boolean;
  hiloId?: string;
}

/* --------------------------------------------------------------- Negocio */

export interface CampoFicha {
  id: string;
  nombre: string;
  valor: string;
}

export interface NotaMemoria {
  id: string;
  texto: string;
  hiloId: string;
  cuando: string;
}

/* ------------------------------------------------------------------ Hilos */

export interface Hilo {
  id: string;
  titulo: string;
  cuando: string;
}

export type TarjetaMensaje = { tipo: "pieza"; piezaId: string } | { tipo: "pregunta"; preguntaId: string };

export interface Mensaje {
  id: string;
  autor: "persona" | "sirio";
  texto?: string;
  trabajo?: { pasos: string[]; segundos: number };
  trabajando?: boolean;
  tarjeta?: TarjetaMensaje;
}
