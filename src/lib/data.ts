// Datos de ejemplo de la maqueta. Todo es de FEBAcode y está pensado para el
// martes 17 de noviembre de 2026. No hay clientes, testimonios ni métricas de terceros.
import type { ElementoCola, Objetivo, Paso, Pieza, Pregunta, Semana, TareaPersona } from "./tipos";

export const ESPACIO = { nombre: "FEBAcode", inicial: "F" };
export const PERSONA = { nombre: "Fernando", rol: "Dirección", iniciales: "FB" };

export const EQUIPO = [
  { nombre: "Fernando", rol: "Dirección", correo: "fernando@febacode.com" },
  { nombre: "Ximena", rol: "Marketing", correo: "ximena@febacode.com" },
  { nombre: "Valeria", rol: "Diseño", correo: "valeria@febacode.com" },
  { nombre: "Mateo", rol: "Desarrollo", correo: "mateo@febacode.com" },
];

/* -------------------------------------------------------------- Objetivo */

export const OBJETIVO: Objetivo = {
  frase: "Conseguir 10 conversaciones con empresas que podrían contratar a FEBAcode",
  medida: "Llamadas agendadas con alguien que decide en una empresa mediana",
  actual: 2,
  meta: 10,
  inicio: "2 de noviembre",
  fechaLimite: "31 de enero de 2027",
  diasRestantes: 75,
  semanaActual: 3,
  totalSemanas: 13,
};

export const PASOS_SEMANA: Paso[] = [
  {
    id: "s3a",
    texto: "Aprobar el sketch «El intern y el deploy del viernes»",
    estado: "en-curso",
    responsable: "Fernando",
    enlace: { tipo: "pieza", id: "p1" },
  },
  {
    id: "s3b",
    texto: "Publicar en LinkedIn sobre los procesos que siguen en Excel",
    estado: "en-curso",
    responsable: "Sirio",
    enlace: { tipo: "pieza", id: "p3" },
  },
  {
    id: "s3c",
    texto: "Grabar el sketch del cliente y el cambio chiquito",
    estado: "pendiente",
    responsable: "Valeria",
    enlace: { tipo: "hilo", id: "t4" },
  },
  {
    id: "s3d",
    texto: "Poner en la página de contacto una forma de agendar llamada",
    estado: "hecho",
    responsable: "Mateo",
  },
];

export const PROPUESTA_SEMANA: Paso[] = [
  { id: "s4a", texto: "Escribir el guion «Cómo cotizamos un proyecto» en 45 segundos", estado: "pendiente", responsable: "Sirio" },
  { id: "s4b", texto: "Publicar dos piezas, el lunes y el jueves", estado: "pendiente", responsable: "Ximena" },
  { id: "s4c", texto: "Preguntar a las dos empresas que agendaron qué las hizo escribir", estado: "pendiente", responsable: "Fernando" },
  { id: "s4d", texto: "Preparar tres publicaciones de LinkedIn con esas respuestas", estado: "pendiente", responsable: "Sirio" },
];

export const SEMANAS_ANTERIORES: Semana[] = [
  {
    numero: 2,
    rango: "9 al 15 nov",
    resumen: "Se agendó la segunda conversación, desde el sitio.",
    pasos: [
      { id: "s2a", texto: "Corregir la ficha del negocio que redactó Sirio", estado: "hecho", responsable: "Fernando" },
      { id: "s2b", texto: "Definir la voz de FEBAcode", estado: "hecho", responsable: "Sirio" },
      { id: "s2c", texto: "Publicar «Standup de 15 minutos»", estado: "hecho", responsable: "Ximena" },
      { id: "s2d", texto: "Preparar una lista de temas para LinkedIn", estado: "pendiente", responsable: "Sirio" },
    ],
  },
  {
    numero: 1,
    rango: "2 al 8 nov",
    resumen: "Objetivo acordado. Una conversación agendada.",
    pasos: [
      { id: "s1a", texto: "Acordar el objetivo y su medida", estado: "hecho", responsable: "Fernando" },
      { id: "s1b", texto: "Leer febacode.com y redactar la ficha", estado: "hecho", responsable: "Sirio" },
      { id: "s1c", texto: "Publicar «Bienvenido, intern»", estado: "hecho", responsable: "Ximena" },
    ],
  },
];

export const RESULTADOS = [
  { nombre: "Conversaciones agendadas", valor: 2, cambio: 1 },
  { nombre: "Mensajes desde el sitio", valor: 5, cambio: 2 },
  { nombre: "Piezas aprobadas", valor: 3, cambio: 1 },
];

/* ---------------------------------------------------------------- Piezas */

export const PIEZAS: Pieza[] = [
  {
    id: "p1",
    titulo: "El intern y el deploy del viernes",
    formato: "Sketch vertical · 45 s",
    canal: "TikTok",
    estado: "por-aprobar",
    creada: "lun 16 nov",
    sugerida: "jue 19 nov, 13:00",
    hiloId: "t1",
    texto: "Viernes, 4:55 p. m. Un intern, un botón de deploy y cero fe en el equipo.",
    etiquetas: "#devlife #sketch #FEBAcode",
    escenas: [
      { titulo: "Gancho", texto: "Viernes, 4:55 p. m. Dani mira el botón de deploy como si fuera una bomba.", segundos: 6 },
      { titulo: "Aviso", texto: "Fernando pasa y dice «nadie toque nada». Dani asiente. Toca todo.", segundos: 12 },
      { titulo: "Caos", texto: "La pantalla se pone roja. Todo el equipo finge que no pasó.", segundos: 14 },
      { titulo: "Remate", texto: "Lunes, 9:00 a. m. Dani: «Fue un cambio chiquito».", segundos: 13 },
    ],
  },
  {
    id: "p3",
    titulo: "¿Qué proceso de tu empresa sigue en Excel?",
    formato: "Publicación de texto",
    canal: "LinkedIn",
    estado: "por-aprobar",
    creada: "hoy, 8:31",
    sugerida: "mié 18 nov, 9:00",
    hiloId: "t3",
    texto:
      "Casi todas las empresas tienen un proceso que vive en una hoja de cálculo que solo una persona entiende. Funciona, hasta que esa persona se va de vacaciones. Si en tu empresa hay uno así, cuéntanos cuál es. En FEBAcode convertimos esos procesos en sistemas que todo el equipo puede usar.",
    etiquetas: "#procesos #software #FEBAcode",
    escenas: [],
  },
  {
    id: "p2",
    titulo: "Cuando el cliente dice «es un cambio chiquito»",
    formato: "Sketch vertical · 28 s",
    canal: "Instagram",
    estado: "guion",
    creada: "vie 13 nov",
    hiloId: "t4",
    texto: "Spoiler: no era chiquito.",
    etiquetas: "#desarrollo #FEBAcode",
    escenas: [
      { titulo: "Gancho", texto: "Por definir: espero tu respuesta sobre el gancho.", segundos: 5 },
      { titulo: "Cuenta", texto: "Valeria abre el archivo de diseño. Tiene 214 capas.", segundos: 11 },
      { titulo: "Remate", texto: "Ximena, sin mirar a nadie: «Lo agendo para el próximo sprint».", segundos: 12 },
    ],
  },
  {
    id: "p4",
    titulo: "Reunión que pudo ser un correo",
    formato: "Sketch vertical · 32 s",
    canal: "TikTok",
    estado: "guion",
    creada: "hoy, 10:05",
    hiloId: "t7",
    texto: "Lo estoy escribiendo.",
    etiquetas: "#oficina #FEBAcode",
    escenas: [
      { titulo: "Gancho", texto: "Calendario: «Sincronización rápida», 60 minutos, 9 invitados.", segundos: 6 },
      { titulo: "Desarrollo", texto: "Lo estoy escribiendo.", segundos: 0 },
    ],
  },
  {
    id: "p5",
    titulo: "Mateo explica la base de datos con tacos",
    formato: "Idea para sketch",
    canal: "TikTok",
    estado: "guion",
    creada: "vie 13 nov",
    texto: "Una tabla es la orden. Cada taco, una fila.",
    etiquetas: "#basesdedatos #FEBAcode",
    escenas: [],
  },
  {
    id: "p6",
    titulo: "Standup de 15 minutos (versión real)",
    formato: "Sketch vertical · 27 s",
    canal: "TikTok",
    estado: "aprobado",
    creada: "mar 10 nov",
    sugerida: "vie 13 nov, 12:00",
    decision: "Aprobada por Ximena · mié 11 nov",
    texto: "El standup de 15 minutos dura 15 minutos. Si no hablamos de comida.",
    etiquetas: "#standup #devlife #FEBAcode",
    escenas: [
      { titulo: "Gancho", texto: "Reloj en pantalla: 00:15:00. Todos de pie.", segundos: 4 },
      { titulo: "Desvío", texto: "Mateo: «Una duda rápida». Pasan 11 minutos.", segundos: 14 },
      { titulo: "Remate", texto: "El reloj marca 00:41:12.", segundos: 9 },
    ],
  },
  {
    id: "p7",
    titulo: "Bienvenido, intern",
    formato: "Sketch vertical · 15 s",
    canal: "TikTok",
    estado: "aprobado",
    creada: "lun 2 nov",
    sugerida: "jue 5 nov, 13:00",
    decision: "Aprobada por Fernando · mar 3 nov",
    texto: "Primer día de Dani. Le dimos la contraseña del wifi y un consejo: nunca hagas deploy en viernes.",
    etiquetas: "#intern #FEBAcode",
    escenas: [
      { titulo: "Gancho", texto: "Dani cruza la puerta. Música épica.", segundos: 5 },
      { titulo: "Remate", texto: "Fernando le entrega el cargador de otra persona.", segundos: 10 },
    ],
  },
  {
    id: "p9",
    titulo: "El día que se cayó el wifi de la oficina",
    formato: "Idea para sketch",
    canal: "TikTok",
    estado: "descartado",
    creada: "vie 6 nov",
    decision: "Descartada por Fernando · lun 9 nov",
    texto: "Se parecía demasiado al sketch del deploy.",
    etiquetas: "",
    escenas: [],
  },
];

/* ------------------------------------------------------------ Decisiones */

export const PREGUNTAS: Pregunta[] = [
  {
    id: "q1",
    titulo: "¿Con qué gancho abrimos el sketch del cliente?",
    contexto: "Para «Cuando el cliente dice «es un cambio chiquito»». Sin el gancho no puedo cerrar el guion.",
    opciones: ["«Solo mueve el logo tantito.»", "«Es literalmente un botón.»", "«Esto lo hacen en cinco minutos.»"],
    recomendada: 0,
    hiloId: "t4",
    piezaId: "p2",
  },
];

export const TAREAS_PERSONA: TareaPersona[] = [
  {
    id: "h1",
    titulo: "Confirma la grabación del jueves 19 a las 11:00",
    contexto: "Necesito a Dani y a Valeria una hora, y la sala libre. Yo no puedo reservarla.",
    accion: "Confirmar",
    alternativa: "Proponer otro horario",
    hiloId: "t1",
  },
];

export const COLA: ElementoCola[] = [
  { id: "c1", tipo: "pieza", piezaId: "p1" },
  { id: "c2", tipo: "pregunta", preguntaId: "q1" },
  { id: "c3", tipo: "propuesta" },
  { id: "c4", tipo: "pieza", piezaId: "p3" },
  { id: "c5", tipo: "persona", tareaId: "h1" },
];
