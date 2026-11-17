// Bitácora, trabajo programado y lo que conoce Sirio del negocio.
// Datos de ejemplo; ver la nota de src/lib/data.ts.
import type { Accion, CampoFicha, NotaMemoria, TareaProgramada } from "./tipos";

/** Lo que Sirio hace ahora mismo, mientras no esté en pausa. */
export const TRABAJO_ACTUAL = {
  texto: "Estoy escribiendo el guion de «Reunión que pudo ser un correo»",
  hiloId: "t7",
  desde: "10:05",
};

export const DIAS: Record<string, string> = {
  hoy: "Hoy · mar 17 nov",
  ayer: "Ayer · lun 16 nov",
  "vie-13": "Vie 13 nov",
};

export const ACCIONES: Accion[] = [
  { id: "a1", dia: "hoy", hora: "09:40", tipo: "propuso", texto: "Propuse los pasos de la semana 4", enlace: { tipo: "objetivo" } },
  { id: "a2", dia: "hoy", hora: "09:12", tipo: "pregunto", texto: "Pregunté con qué gancho abrimos el sketch del cliente", enlace: { tipo: "hilo", id: "t4" } },
  { id: "a3", dia: "hoy", hora: "08:31", tipo: "redacto", texto: "Redacté la publicación de LinkedIn sobre procesos en Excel", enlace: { tipo: "pieza", id: "p3" } },
  { id: "a4", dia: "hoy", hora: "08:02", tipo: "leyo", texto: "Leí los pendientes y armé el resumen de la mañana", enlace: { tipo: "hilo", id: "t6" } },
  { id: "a5", dia: "ayer", hora: "18:20", tipo: "redacto", texto: "Terminé el guion de «El intern y el deploy del viernes»", enlace: { tipo: "pieza", id: "p1" } },
  { id: "a6", dia: "ayer", hora: "16:45", tipo: "programo", texto: "Propuse grabar el jueves 19 a las 11:00 y pedí confirmación", enlace: { tipo: "hilo", id: "t1" } },
  { id: "a7", dia: "ayer", hora: "12:10", tipo: "leyo", texto: "Leí la página de servicios de febacode.com para el post de LinkedIn", enlace: { tipo: "hilo", id: "t3" } },
  { id: "a8", dia: "ayer", hora: "09:00", tipo: "propuso", texto: "Revisé la semana 2: se cumplieron 3 de 4 pasos", enlace: { tipo: "hilo", id: "t8" } },
  { id: "a9", dia: "vie-13", hora: "16:12", tipo: "propuso", texto: "Propuse tres ideas de sketches para la semana", enlace: { tipo: "pieza", id: "p5" } },
  { id: "a10", dia: "vie-13", hora: "11:30", tipo: "redacto", texto: "Ajusté el remate de «Standup de 15 minutos»", enlace: { tipo: "pieza", id: "p6" } },
];

export const TAREAS_PROGRAMADAS: TareaProgramada[] = [
  {
    id: "tp1",
    nombre: "Resumen de la mañana",
    descripcion: "Reviso pendientes y dejo en Hoy lo que necesito de ti.",
    horario: "Lunes a viernes, 8:00",
    ultima: { cuando: "Hoy, 8:00", resultado: "hecho" },
    proxima: "Mié 18 nov, 8:00",
    activa: true,
    hiloId: "t6",
  },
  {
    id: "tp2",
    nombre: "Revisión semanal del objetivo",
    descripcion: "Cierro la semana y propongo los pasos de la siguiente.",
    horario: "Lunes, 9:00",
    ultima: { cuando: "Lun 16 nov, 9:00", resultado: "hecho" },
    proxima: "Lun 23 nov, 9:00",
    activa: true,
    hiloId: "t8",
  },
  {
    id: "tp3",
    nombre: "Ideas para la semana",
    descripcion: "Propongo ideas de piezas a partir de la ficha y el objetivo.",
    horario: "Viernes, 16:00",
    ultima: { cuando: "Vie 13 nov, 16:00", resultado: "fallo", nota: "Se agotó el tiempo; el reintento terminó a las 16:12" },
    proxima: "Vie 20 nov, 16:00",
    activa: true,
  },
  {
    id: "tp4",
    nombre: "Releer febacode.com",
    descripcion: "Busco cambios en el sitio y te propongo ajustes a la ficha.",
    horario: "Día 1 de cada mes, 10:00",
    ultima: { cuando: "Dom 1 nov, 10:00", resultado: "hecho" },
    proxima: "Mar 1 dic, 10:00",
    activa: true,
  },
];

/* --------------------------------------------------------------- Negocio */

export const FUENTE_FICHA = {
  fuente: "febacode.com",
  leida: "dom 1 nov",
  ultimoCambio: { cuando: "lun 16 nov", quien: "Fernando" },
};

export const FICHA: CampoFicha[] = [
  {
    id: "vende",
    nombre: "Qué vende",
    valor: "Software a la medida: aplicaciones web, sistemas internos y automatización de procesos.",
  },
  {
    id: "quien",
    nombre: "A quién",
    valor:
      "Empresas medianas de México que llevan su operación en hojas de cálculo o en sistemas que ya no les alcanzan. Suele decidir la dirección o el área de operaciones.",
  },
  {
    id: "tono",
    nombre: "Tono",
    valor: "Cercano, directo y con humor de oficina. Sin jerga de startup ni promesas grandes.",
  },
  {
    id: "canales",
    nombre: "Canales",
    valor: "TikTok e Instagram para sketches con el equipo. LinkedIn para hablar de procesos. El sitio para agendar una llamada.",
  },
  {
    id: "diferencia",
    nombre: "Diferenciadores",
    valor: "Equipo chico: hablas con quien escribe el código. Avances que se pueden probar cada dos semanas.",
  },
];

export const MEMORIA: NotaMemoria[] = [
  { id: "n1", texto: "Los sketches duran menos de 45 segundos. Fernando prefiere cortar a alargar.", hiloId: "t1", cuando: "lun 16 nov" },
  { id: "n2", texto: "No se hacen chistes sobre clientes reales ni se muestran sus proyectos.", hiloId: "t5", cuando: "mar 3 nov" },
  { id: "n3", texto: "Se graba los jueves; la sala está libre de 11:00 a 13:00.", hiloId: "t2", cuando: "jue 5 nov" },
  { id: "n4", texto: "En LinkedIn se habla de procesos y resultados, no de lenguajes ni herramientas.", hiloId: "t3", cuando: "lun 9 nov" },
  { id: "n5", texto: "Dani sale en los sketches; Fernando solo aparece en cameos.", hiloId: "t1", cuando: "vie 6 nov" },
];
