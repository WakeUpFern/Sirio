// Hilos y conversaciones de ejemplo. Ver la nota de src/lib/data.ts.
import type { Hilo, Mensaje } from "./tipos";

export const HILOS: Hilo[] = [
  { id: "t7", titulo: "Guion: reunión que pudo ser un correo", cuando: "10:05" },
  { id: "t4", titulo: "Sketch: el cliente y el cambio chiquito", cuando: "9:12" },
  { id: "t6", titulo: "Resumen de la mañana · 17 nov", cuando: "8:02" },
  { id: "t3", titulo: "LinkedIn: procesos que siguen en Excel", cuando: "8:31" },
  { id: "t1", titulo: "Sketch: el intern y el deploy del viernes", cuando: "Ayer" },
  { id: "t8", titulo: "Revisión semanal · 16 nov", cuando: "Ayer" },
  { id: "t2", titulo: "Calendario de noviembre", cuando: "Jue 5 nov" },
  { id: "t5", titulo: "Tono de voz de FEBAcode", cuando: "Mar 3 nov" },
];

const PASOS_GUION = [
  "Leí tu idea",
  "Revisé la ficha y la memoria",
  "Revisé los guiones anteriores",
  "Escribí tres ganchos",
  "Elegí el más corto",
  "Armé el guion en 4 escenas",
  "Calculé la duración: 45 s",
  "Busqué un hueco en el calendario",
  "Preparé la lista de tomas",
  "Redacté el texto de la publicación",
  "Revisé que no mencione clientes",
  "Dejé la pieza en Por aprobar",
];

export const MENSAJES: Record<string, Mensaje[]> = {
  t1: [
    { id: "m1", autor: "persona", texto: "Quiero un sketch para esta semana: el intern rompe producción un viernes y todos fingen que no pasó." },
    {
      id: "m2",
      autor: "sirio",
      trabajo: { pasos: PASOS_GUION, segundos: 48 },
      texto:
        "Escribí el guion en cuatro escenas, 45 segundos, con el gancho más corto. Dejé el texto de la publicación listo; cuando lo apruebes, Ximena lo puede publicar el jueves.",
      tarjeta: { tipo: "pieza", piezaId: "p1" },
    },
    { id: "m3", autor: "persona", texto: "Va. ¿Cuándo lo grabamos?" },
    {
      id: "m4",
      autor: "sirio",
      trabajo: { pasos: ["Revisé la memoria: se graba los jueves", "Revisé quién sale en el guion"], segundos: 6 },
      texto: "Propongo el jueves 19 a las 11:00, con Dani y Valeria. No puedo reservar la sala; te lo dejé en Hoy para que lo confirmes.",
    },
  ],
  t4: [
    { id: "c1", autor: "persona", texto: "Tengo una idea: el cliente que pide cambios «chiquitos»." },
    {
      id: "c2",
      autor: "sirio",
      trabajo: { pasos: ["Anoté la idea", "Escribí tres escenas", "Preparé tres ganchos"], segundos: 19 },
      texto: "Me gusta. Tengo el guion de 28 segundos casi listo. Antes de cerrarlo necesito que elijas el gancho.",
      tarjeta: { tipo: "pregunta", preguntaId: "q1" },
    },
  ],
  t7: [
    { id: "r1", autor: "persona", texto: "Escribe el guion de la reunión que pudo ser un correo. Que salga Mateo." },
    { id: "r2", autor: "sirio", trabajando: true },
  ],
  t6: [
    {
      id: "e1",
      autor: "sirio",
      trabajo: { pasos: ["Leí los pendientes", "Revisé los pasos de la semana", "Ordené lo que necesito de ti"], segundos: 21 },
      texto:
        "Buenos días. Hay dos piezas por aprobar, una pregunta sobre un gancho y la grabación del jueves sin confirmar. La semana va en 1 de 4 pasos hechos.",
    },
  ],
  t3: [
    { id: "l1", autor: "persona", texto: "Necesitamos algo para LinkedIn que no sea un sketch." },
    {
      id: "l2",
      autor: "sirio",
      trabajo: { pasos: ["Leí la página de servicios", "Revisé la memoria sobre LinkedIn", "Redacté la publicación"], segundos: 31 },
      texto: "Escribí una publicación corta sobre los procesos que viven en una hoja de cálculo. Termina con una pregunta para que la gente comente.",
      tarjeta: { tipo: "pieza", piezaId: "p3" },
    },
  ],
  t8: [
    {
      id: "w1",
      autor: "sirio",
      trabajo: { pasos: ["Revisé los pasos de la semana 2", "Conté las conversaciones agendadas", "Propuse la semana 3"], segundos: 44 },
      texto: "La semana 2 cerró con 3 de 4 pasos y una conversación nueva. Quedó pendiente la lista de temas para LinkedIn; la pasé a esta semana.",
    },
  ],
  t2: [
    { id: "a1", autor: "persona", texto: "Arma el calendario de contenido de noviembre." },
    {
      id: "a2",
      autor: "sirio",
      trabajo: { pasos: ["Revisé el objetivo", "Elegí días de grabación", "Propuse días de publicación"], segundos: 22 },
      texto: "Propongo grabar los jueves y publicar lunes y jueves. Dos piezas por semana alcanzan para el objetivo sin cansar al equipo.",
    },
  ],
  t5: [
    { id: "d1", autor: "persona", texto: "¿Cómo debería sonar FEBAcode en redes?" },
    {
      id: "d2",
      autor: "sirio",
      trabajo: { pasos: ["Leí el sitio", "Leí las publicaciones anteriores"], segundos: 17 },
      texto: "Cercano, directo y con humor de oficina. Nada de jerga de startup. Lo guardé en la ficha, en Tono.",
    },
  ],
};

/** Respuestas de ejemplo para lo que escribas en el panel de Sirio. */
export const RESPUESTAS: { texto: string; pasos: string[] }[] = [
  {
    texto: "Listo, lo anoté. Te armo un guion corto y lo dejo en Contenido, en Guiones, para que lo revises.",
    pasos: ["Leí tu mensaje", "Lo comparé con las ideas anteriores", "Lo guardé en Guiones"],
  },
  {
    texto: "Revisé los pasos de la semana y eso cabe el jueves. Si te late, lo agrego a la propuesta de la semana que viene.",
    pasos: ["Leí tu mensaje", "Revisé los pasos de la semana", "Revisé el objetivo"],
  },
  {
    texto: "Entendido. Ajusté el tono a algo más seco y reescribí el gancho. El cambio ya está en el guion.",
    pasos: ["Leí tu mensaje", "Reescribí el gancho", "Actualicé el guion", "Recalculé la duración"],
  },
];

export const SUGERENCIAS = [
  "Propón tres ideas para la semana que viene",
  "Resume cómo vamos con el objetivo",
  "Escribe un guion sobre cómo cotizamos",
];
