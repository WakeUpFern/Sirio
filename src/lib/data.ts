// Datos de ejemplo de la maqueta. Todo es ficticio y está pensado para
// noviembre de 2026 (hoy es miércoles 11 de noviembre).

export const WORKSPACE = { name: "FEBAcode", initial: "F" };

export const TEAM = [
  { name: "Fernando", role: "Líder técnico" },
  { name: "Valeria", role: "Diseño" },
  { name: "Mateo", role: "Backend" },
  { name: "Ximena", role: "Producto" },
  { name: "Dani", role: "Intern" },
  { name: "Rodrigo", role: "Frontend" },
];

/* ---------------------------------------------------------------- Apps */

export type AppCat =
  | "Redes sociales"
  | "Correo y mensajes"
  | "Documentos"
  | "Analítica"
  | "Pagos y anuncios";

export const APP_CATS: AppCat[] = [
  "Redes sociales",
  "Correo y mensajes",
  "Documentos",
  "Analítica",
  "Pagos y anuncios",
];

export interface AppDef {
  id: string;
  name: string;
  cat: AppCat;
  blurb: string;
  perms: string[];
  connected: boolean;
}

export const APPS: AppDef[] = [
  {
    id: "tiktok",
    name: "TikTok",
    cat: "Redes sociales",
    blurb: "Publica y programa los sketches que apruebas.",
    perms: [
      "Subir y programar videos en la cuenta @febacode",
      "Leer comentarios y responder los que tú apruebes",
      "Ver estadísticas de cada publicación",
    ],
    connected: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    cat: "Redes sociales",
    blurb: "Reels y publicaciones, con respuestas a comentarios.",
    perms: [
      "Publicar y programar Reels",
      "Responder comentarios y mensajes directos",
      "Seguir la actividad de tu audiencia",
    ],
    connected: true,
  },
  {
    id: "youtube",
    name: "YouTube",
    cat: "Redes sociales",
    blurb: "Sube Shorts y revisa cuánto se ven.",
    perms: ["Subir Shorts", "Leer estadísticas del canal", "Responder comentarios"],
    connected: false,
  },
  {
    id: "facebook",
    name: "Facebook",
    cat: "Redes sociales",
    blurb: "Comparte los videos en la página de FEBAcode.",
    perms: ["Publicar en la página", "Leer comentarios", "Ver estadísticas de la página"],
    connected: false,
  },
  {
    id: "x",
    name: "X",
    cat: "Redes sociales",
    blurb: "Adelantos y respuestas cortas para tu audiencia.",
    perms: ["Publicar posts", "Responder menciones", "Ver estadísticas básicas"],
    connected: false,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    cat: "Redes sociales",
    blurb: "Versiones más serias de tus piezas para el equipo y clientes.",
    perms: ["Publicar en la página de empresa", "Leer comentarios", "Ver estadísticas"],
    connected: false,
  },
  {
    id: "gmail",
    name: "Gmail",
    cat: "Correo y mensajes",
    blurb: "Redacta correos de colaboración. Tú decides cuáles salen.",
    perms: [
      "Crear borradores en hola@febacode.com",
      "Enviar solo los correos que apruebes",
      "Leer respuestas a esos hilos",
    ],
    connected: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    cat: "Correo y mensajes",
    blurb: "Responde a quienes escriben desde tus videos.",
    perms: [
      "Leer mensajes del número de FEBAcode",
      "Responder con plantillas aprobadas",
      "Avisarte cuando alguien pida una cotización",
    ],
    connected: true,
  },
  {
    id: "slack",
    name: "Slack",
    cat: "Correo y mensajes",
    blurb: "Avisa al equipo cuando hay algo por grabar o aprobar.",
    perms: ["Publicar en el canal #marketing", "Leer menciones a Sirio"],
    connected: false,
  },
  {
    id: "drive",
    name: "Google Drive",
    cat: "Documentos",
    blurb: "Guarda guiones y videos en una carpeta del equipo.",
    perms: ["Crear archivos en la carpeta «Sirio»", "Leer los archivos de esa carpeta"],
    connected: true,
  },
  {
    id: "notion",
    name: "Notion",
    cat: "Documentos",
    blurb: "Lee tus notas de marca y deja el calendario editorial.",
    perms: ["Leer las páginas que compartas", "Crear páginas en tu espacio"],
    connected: false,
  },
  {
    id: "calendar",
    name: "Google Calendar",
    cat: "Documentos",
    blurb: "Reserva las grabaciones cuando el equipo está libre.",
    perms: ["Ver la disponibilidad del equipo", "Crear eventos de grabación"],
    connected: true,
  },
  {
    id: "analytics",
    name: "Google Analytics",
    cat: "Analítica",
    blurb: "Mide cuánta gente llega a tu sitio desde cada video.",
    perms: ["Leer el tráfico del sitio", "Leer conversiones por origen"],
    connected: false,
  },
  {
    id: "searchconsole",
    name: "Search Console",
    cat: "Analítica",
    blurb: "Entiende qué busca la gente antes de llegar a ti.",
    perms: ["Leer consultas de búsqueda", "Leer páginas indexadas"],
    connected: false,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    cat: "Analítica",
    blurb: "Registra contactos que llegan por WhatsApp o correo.",
    perms: ["Crear contactos", "Leer negocios abiertos"],
    connected: false,
  },
  {
    id: "stripe",
    name: "Stripe",
    cat: "Pagos y anuncios",
    blurb: "Relaciona ventas con las publicaciones que las trajeron.",
    perms: ["Leer pagos y clientes (solo lectura)"],
    connected: false,
  },
  {
    id: "metaads",
    name: "Meta Ads",
    cat: "Pagos y anuncios",
    blurb: "Promociona una publicación con el tope que definas.",
    perms: [
      "Crear campañas dentro del tope mensual",
      "Pausar campañas",
      "Leer resultados de anuncios",
    ],
    connected: true,
  },
  {
    id: "googleads",
    name: "Google Ads",
    cat: "Pagos y anuncios",
    blurb: "Anuncios de búsqueda para tus servicios.",
    perms: ["Crear campañas dentro del tope mensual", "Leer resultados de anuncios"],
    connected: false,
  },
];

export const appById = (id: string) => APPS.find((a) => a.id === id);

/* ----------------------------------------------------- Equipo de agentes */

export interface AgentDef {
  id: string;
  name: string;
  apps: string[]; // ids de APPS o herramientas internas
  blurb: string;
}

export const AGENTS: AgentDef[] = [
  { id: "redes", name: "Redes", apps: ["instagram", "tiktok", "x", "facebook", "linkedin"], blurb: "Publica y programa" },
  { id: "alcance", name: "Alcance", apps: ["gmail", "whatsapp"], blurb: "Correos y mensajes" },
  { id: "anuncios", name: "Anuncios", apps: ["googleads", "metaads"], blurb: "Promoción" },
  { id: "investigacion", name: "Investigación", apps: ["tendencias"], blurb: "Tendencias y cuentas" },
  { id: "video", name: "Video", apps: ["editor", "guiones"], blurb: "Guiones y cortes" },
  { id: "comunidad", name: "Comunidad", apps: [], blurb: "Comentarios y DMs" },
];

export const TOOLS_USED = ["Imagen", "Clips", "Textos", "Calendario", "Ajustes"];

/* ------------------------------------------------------- Publicaciones */

export type Network = "tiktok" | "instagram" | "youtube";
export type PubStatus = "por-aprobar" | "programado" | "publicado" | "rechazado";
export type Tone = "lilac" | "mint" | "peach" | "sky";

export interface Scene {
  title: string;
  text: string;
  secs: number;
}

export interface Pub {
  id: string;
  title: string;
  network: Network;
  status: PubStatus;
  date: string;
  tone: Tone;
  caption: string;
  hashtags: string;
  scenes: Scene[];
  views?: number;
  likes?: number;
}

export const NETWORK_NAME: Record<Network, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube Shorts",
};

export const PUBS: Pub[] = [
  {
    id: "p1",
    title: "El intern y el deploy del viernes",
    network: "tiktok",
    status: "por-aprobar",
    date: "Propuesta: lun 16 nov, 12:00",
    tone: "lilac",
    caption:
      "Viernes, 4:55 p. m. Un intern, un botón de deploy y cero fe en el equipo.",
    hashtags: "#devlife #sketch #FEBAcode #mexico",
    scenes: [
      { title: "Gancho", text: "Viernes, 4:55 p. m. Dani mira el botón de deploy como si fuera una bomba.", secs: 6 },
      { title: "Aviso", text: "Fernando pasa y dice «nadie toque nada». Dani asiente. Toca todo.", secs: 12 },
      { title: "Caos", text: "La pantalla se pone roja. Todo el equipo finge que no pasó.", secs: 14 },
      { title: "Remate", text: "Lunes, 9:00 a. m. Dani: «Fue un cambio chiquito».", secs: 13 },
    ],
  },
  {
    id: "p2",
    title: "Cuando el cliente dice «es un cambio chiquito»",
    network: "instagram",
    status: "por-aprobar",
    date: "Propuesta: jue 19 nov, 13:00",
    tone: "peach",
    caption:
      "Spoiler: no era chiquito. Tres sprints después, seguimos aquí.",
    hashtags: "#clientes #desarrollo #FEBAcode #humor",
    scenes: [
      { title: "Gancho", text: "Cliente por videollamada: «Solo mueve el logo tantito».", secs: 5 },
      { title: "Cuenta", text: "Valeria abre Figma. El archivo tiene 214 capas.", secs: 11 },
      { title: "Remate", text: "Ximena, sin mirar a nadie: «Lo agendo para el próximo sprint».", secs: 12 },
    ],
  },
  {
    id: "p3",
    title: "Standup de 15 minutos (versión real)",
    network: "tiktok",
    status: "programado",
    date: "Vie 13 nov, 12:00",
    tone: "mint",
    caption: "El standup de 15 minutos dura 15 minutos. Si no hablamos de comida.",
    hashtags: "#standup #devlife #FEBAcode",
    scenes: [
      { title: "Gancho", text: "Reloj en pantalla: 00:15:00. Todos de pie.", secs: 4 },
      { title: "Desvío", text: "Mateo: «Una duda rápida». Pasan 11 minutos.", secs: 14 },
      { title: "Remate", text: "Rodrigo mira el reloj: 00:41:12.", secs: 9 },
    ],
  },
  {
    id: "p4",
    title: "Tu primera semana en FEBA",
    network: "tiktok",
    status: "programado",
    date: "Lun 16 nov, 18:00",
    tone: "sky",
    caption: "Lo que nadie te dice de tu primera semana (spoiler: la contraseña del wifi).",
    hashtags: "#intern #primeraSemana #FEBAcode",
    scenes: [
      { title: "Lunes", text: "Dani llega con laptop nueva y mucha esperanza.", secs: 6 },
      { title: "Miércoles", text: "Le piden «revisar un PR chiquito». Son 4,000 líneas.", secs: 10 },
      { title: "Viernes", text: "Dani ya sabe dónde está el café bueno.", secs: 8 },
    ],
  },
  {
    id: "p5",
    title: "Code review en cámara lenta",
    network: "youtube",
    status: "programado",
    date: "Mar 17 nov, 11:00",
    tone: "lilac",
    caption: "Cuando alguien comenta «nit:» y en realidad es todo el archivo.",
    hashtags: "#codereview #devlife #FEBAcode",
    scenes: [
      { title: "Gancho", text: "Notificación: «Tienes 37 comentarios nuevos».", secs: 4 },
      { title: "Remate", text: "Rodrigo en cámara lenta: «Todos dicen nit».", secs: 12 },
    ],
  },
  {
    id: "p6",
    title: "Bienvenido, intern",
    network: "tiktok",
    status: "publicado",
    date: "Jue 5 nov",
    tone: "peach",
    caption: "Primer día de Dani. Le dimos la contraseña del wifi y un consejo: nunca hagas deploy en viernes.",
    hashtags: "#intern #FEBAcode",
    scenes: [
      { title: "Gancho", text: "Dani cruza la puerta. Música épica.", secs: 5 },
      { title: "Remate", text: "Fernando le entrega el cargador de otra persona.", secs: 10 },
    ],
    views: 1240,
    likes: 96,
  },
  {
    id: "p7",
    title: "Así suena un deploy sin pruebas",
    network: "instagram",
    status: "publicado",
    date: "Lun 2 nov",
    tone: "mint",
    caption: "Lo escuchamos todos. Lo ignoramos todos.",
    hashtags: "#deploy #devlife #FEBAcode",
    scenes: [
      { title: "Gancho", text: "Dani aprieta el botón. Silencio.", secs: 4 },
      { title: "Remate", text: "Alarma. Mateo cierra la laptop despacio.", secs: 9 },
    ],
    views: 870,
    likes: 61,
  },
  {
    id: "p8",
    title: "Qué hace FEBAcode (en 20 segundos)",
    network: "tiktok",
    status: "publicado",
    date: "Jue 29 oct",
    tone: "sky",
    caption: "Hacemos software a la medida. Y sketches, aparentemente.",
    hashtags: "#FEBAcode #software #mexico",
    scenes: [
      { title: "Gancho", text: "Fernando, serio: «Hacemos software».", secs: 5 },
      { title: "Remate", text: "Corte a Dani con peluca. «Y esto también».", secs: 14 },
    ],
    views: 2150,
    likes: 143,
  },
];

export const SCRIPTS = [
  { id: "g1", title: "El intern y el deploy del viernes", scenes: 4, secs: 45, status: "Escrito", when: "Hace 3 h" },
  { id: "g2", title: "Cuando el cliente dice «es un cambio chiquito»", scenes: 3, secs: 28, status: "Escrito", when: "Ayer" },
  { id: "g3", title: "Reunión que pudo ser un correo", scenes: 3, secs: 32, status: "Borrador", when: "Lun 9 nov" },
  { id: "g4", title: "Mateo explica la base de datos con tacos", scenes: 5, secs: 52, status: "Idea", when: "Lun 9 nov" },
  { id: "g5", title: "El día que se cayó el wifi de la oficina", scenes: 4, secs: 38, status: "Idea", when: "Vie 6 nov" },
];

/* ------------------------------------------------------ Pendientes (OK) */

export interface Ask {
  id: string;
  kind: "question" | "human";
  tag: string;
  title: string;
  detail: string;
  options?: string[];
  recommended?: number;
  action?: string;
}

export const ASKS: Ask[] = [
  {
    id: "h1",
    kind: "human",
    tag: "Solo tú puedes hacerlo",
    title: "Confirma la grabación del jueves a las 11:00",
    detail: "Necesito a Dani, Fernando y una sala libre durante una hora.",
    action: "Confirmar",
  },
  {
    id: "q1",
    kind: "question",
    tag: "Sirio pregunta",
    title: "¿Con qué gancho abrimos el sketch del cliente?",
    detail: "Para «Cuando el cliente dice «es un cambio chiquito»».",
    options: [
      "«Solo mueve el logo tantito.»",
      "«Es literalmente un botón.»",
      "«Esto lo hacemos en cinco minutos.»",
    ],
    recommended: 0,
  },
];

/* ------------------------------------------------------------- Chat */

export interface ThreadMeta {
  id: string;
  title: string;
  when: string;
}

export const THREADS: ThreadMeta[] = [
  { id: "t1", title: "Sketch: el intern y el deploy del viernes", when: "Ahora" },
  { id: "t2", title: "Calendario de noviembre", when: "Ayer" },
  { id: "t3", title: "Colaboración con cuentas de tech", when: "Lun 9 nov" },
  { id: "t4", title: "Cuando el cliente dice «es un cambio chiquito»", when: "Vie 6 nov" },
  { id: "t5", title: "Tono de voz de FEBAcode", when: "Mar 3 nov" },
];

export const WORK_STEPS_12 = [
  "Leyó el brief del sketch",
  "Revisó los guiones anteriores",
  "Escribió tres ganchos",
  "Eligió el más corto",
  "Armó el guion en 4 escenas",
  "Calculó la duración (45 s)",
  "Reservó el jueves con el equipo",
  "Preparó la lista de tomas",
  "Cortó la toma 1",
  "Cortó la toma 2",
  "Redactó el texto de la publicación",
  "Dejó el borrador en Por aprobar",
];

export const REPLIES: { text: string; steps: string[] }[] = [
  {
    text: "Listo, lo agregué a la lista de ideas. Te armo un guion corto y lo dejo en Contenido, en Guiones, para que lo veas.",
    steps: ["Leyó tu mensaje", "Lo comparó con las ideas anteriores", "Lo guardó en Guiones"],
  },
  {
    text: "Buena idea. Revisé el calendario del equipo y el jueves a las 11:00 todos están libres. Si te late, lo reservo.",
    steps: ["Leyó tu mensaje", "Abrió el calendario del equipo", "Buscó horarios sin choques", "Armó una propuesta"],
  },
  {
    text: "Entendido. Ajusté el tono a algo más seco, tipo oficina, y reescribí el gancho. El cambio ya está en el guion.",
    steps: ["Leyó tu mensaje", "Reescribió el gancho", "Actualizó el guion", "Recalculó la duración"],
  },
];

export const SUGGESTIONS = [
  "Propón tres ideas para el viernes",
  "Resume cómo nos fue esta semana",
  "Busca cuentas de tech para colaborar",
];

/* ------------------------------------------------------------ Operar */

export interface FeedItem {
  id: string;
  text: string;
  time: string;
  link: string;
  icon: "film" | "file" | "mail" | "calendar" | "check" | "message" | "search" | "plug" | "clock";
  agent?: string;
  fresh?: boolean;
}

export const PAST_FEED: FeedItem[] = [
  { id: "f1", text: "Armó el calendario de la semana", time: "Hace 2 h", link: "Calendario", icon: "calendar" },
  { id: "f2", text: "Redactó un correo para @devconmx", time: "Hace 2 h", link: "Borrador", icon: "mail" },
  { id: "f3", text: "Cortó la toma 2 de 5", time: "Hace 1 h", link: "Video", icon: "film" },
  { id: "f4", text: "Escribió el guion de «El intern y el deploy del viernes»", time: "Hace 3 h", link: "Guion", icon: "file" },
  { id: "f5", text: "Conectó Instagram", time: "Ayer", link: "Cuenta", icon: "plug" },
];

export interface RunStep {
  text: string;
  link: string;
  icon: FeedItem["icon"];
  agent: string;
  kind?: "approval";
}

export const RUN_SCRIPT: RunStep[] = [
  { text: "Revisó los comentarios nuevos de TikTok", link: "Comentarios", icon: "message", agent: "comunidad" },
  { text: "Respondió 3 comentarios del sketch del lunes", link: "Respuestas", icon: "message", agent: "comunidad" },
  { text: "Buscó 6 cuentas de tech en México para colaborar", link: "Lista", icon: "search", agent: "investigacion" },
  { text: "Redactó un correo de colaboración", link: "Borrador", icon: "mail", agent: "alcance" },
  { text: "Cortó la toma 4 de 5", link: "Video", icon: "film", agent: "video" },
  { text: "Programó «Standup de 15 minutos» para el viernes", link: "Publicación", icon: "clock", agent: "redes" },
  { text: "Necesita tu OK para publicar", link: "Revisar", icon: "check", agent: "redes", kind: "approval" },
];

/* ------------------------------------------------------------- Inicio */

export const REACH = [310, 420, 380, 510, 460, 640, 820];
export const REACH_DAYS = ["mié", "jue", "vie", "sáb", "dom", "lun", "mar"];

export const RESULTS = [
  { label: "Vistas", value: "4,310", delta: "+18 %" },
  { label: "Seguidores nuevos", value: "87", delta: "+12" },
  { label: "Contactos por WhatsApp", value: "6", delta: "+2" },
];

export const DONE_BY_SIRIO = [
  { icon: "file", name: "Guion «El intern y el deploy del viernes»", time: "Hace 3 h" },
  { icon: "film", name: "Video cortado: toma 2 de 5", time: "Hace 1 h" },
  { icon: "mail", name: "Borrador de correo para @devconmx", time: "Hace 2 h" },
  { icon: "calendar", name: "Calendario de la semana", time: "Ayer, 18:40" },
] as const;

export const STEPS_PREP = [
  { name: "Conectar TikTok", done: true },
  { name: "Conectar Instagram", done: true },
  { name: "Definir la voz de FEBAcode", done: true },
  { name: "Grabar la primera escena con el equipo", done: false },
];
export const STEPS_LAUNCH = [
  { name: "Aprobar la primera publicación", done: false, id: "p1" },
  { name: "Programar la semana", done: false },
  { name: "Pedirle a Sirio un reporte", done: false },
];

/* ---------------------------------------------------------- Ajustes */

export const SETTINGS_GROUPS = [
  { group: "Negocio", items: ["General", "Equipo", "Integraciones", "Marca"] },
  { group: "Sirio", items: ["Modelos y llaves", "Autonomía"] },
  { group: "Cuenta", items: ["Notificaciones", "Apariencia"] },
];

export const PROVIDERS = [
  { id: "claude", name: "Claude", by: "Anthropic", key: "sk-ant-api03-••••••••••••k4Qz", models: ["Claude Opus", "Claude Sonnet"] },
  { id: "codex", name: "OpenAI Codex", by: "OpenAI", key: "sk-proj-••••••••••••9fLm", models: ["OpenAI Codex"] },
  { id: "gemini", name: "Gemini", by: "Google", key: "", models: ["Gemini Pro"] },
  { id: "mistral", name: "Mistral", by: "Mistral AI", key: "", models: ["Mistral Large"] },
];

export const MODEL_AGENTS = [
  { id: "cmo", name: "CMO", role: "Decide qué se hace y cuándo", model: "Claude Opus" },
  { id: "guionista", name: "Guionista", role: "Escribe ganchos y guiones", model: "Claude Sonnet" },
  { id: "editor", name: "Editor", role: "Corta y ordena las tomas", model: "OpenAI Codex" },
  { id: "community", name: "Community", role: "Responde comentarios y mensajes", model: "Claude Sonnet" },
];

export const CHANNELS = [
  {
    id: "tiktok",
    name: "TikTok",
    ask: "Sirio prepara cada video y espera tu OK antes de publicarlo.",
    auto: "Sirio publica en los horarios que acordaron y te avisa después.",
  },
  {
    id: "instagram",
    name: "Instagram",
    ask: "Los Reels y las respuestas a comentarios pasan por tu aprobación.",
    auto: "Sirio publica Reels y responde comentarios sin pedir permiso.",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    ask: "Sirio redacta cada respuesta y tú la envías con un clic.",
    auto: "Sirio responde con plantillas aprobadas y te avisa de cotizaciones.",
  },
  {
    id: "gmail",
    name: "Correo",
    ask: "Los correos quedan como borrador hasta que los apruebes.",
    auto: "Sirio envía correos de colaboración desde hola@febacode.com.",
  },
  {
    id: "ads",
    name: "Anuncios",
    ask: "Sirio propone la campaña y el gasto; no gasta nada sin tu OK.",
    auto: "Sirio lanza y pausa campañas, siempre dentro del tope mensual.",
  },
];
