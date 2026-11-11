"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  APPS,
  ASKS,
  CHANNELS,
  PAST_FEED,
  PUBS,
  REPLIES,
  RUN_SCRIPT,
  THREADS,
  WORK_STEPS_12,
  appById,
  type Ask,
  type FeedItem,
  type Pub,
  type ThreadMeta,
} from "./data";

export type Card =
  | { type: "approval"; pubId: string }
  | { type: "question"; askId: string };

export interface Msg {
  id: string;
  role: "user" | "sirio";
  text?: string;
  work?: { steps: string[]; secs: number };
  working?: boolean;
  card?: Card;
}

export type AskState = { status: "open" | "done" | "later"; answer?: string };
export type RunStatus = "idle" | "running" | "paused" | "waiting";
export type Mode = "ask" | "auto";

interface RunState {
  status: RunStatus;
  cursor: number;
  feed: FeedItem[];
  waitingPub?: string;
  activeAgent?: string;
}

interface Toast {
  id: number;
  text: string;
}

const INITIAL_MESSAGES: Record<string, Msg[]> = {
  t1: [
    {
      id: "m1",
      role: "user",
      text: "Quiero un sketch para el lunes: el intern rompe producción un viernes y todos fingen que no pasó.",
    },
    {
      id: "m2",
      role: "sirio",
      work: { steps: WORK_STEPS_12, secs: 48 },
      text: "Preparé tres ganchos para el sketch del lunes y un guion de 45 segundos. Ya corté dos tomas con el gancho más corto y dejé el borrador de la publicación listo. Necesito tu OK para programarla.",
      card: { type: "approval", pubId: "p1" },
    },
    { id: "m3", role: "user", text: "Va. ¿Y para el jueves qué sigue?" },
    {
      id: "m4",
      role: "sirio",
      work: {
        steps: [
          "Revisó el calendario del equipo",
          "Leyó los guiones pendientes",
          "Eligió el siguiente sketch",
          "Preparó tres ganchos posibles",
        ],
        secs: 19,
      },
      text: "Para el jueves propongo grabar «Cuando el cliente dice «es un cambio chiquito»». Antes de armar el guion necesito que elijas el gancho.",
      card: { type: "question", askId: "q1" },
    },
  ],
  t2: [
    { id: "a1", role: "user", text: "Arma el calendario de contenido de noviembre." },
    {
      id: "a2",
      role: "sirio",
      work: { steps: ["Leyó el calendario del equipo", "Eligió cuatro días de grabación", "Dejó el calendario en Drive"], secs: 22 },
      text: "Listo. Propongo grabar los jueves y publicar lunes, miércoles y viernes. El calendario está en tu carpeta de Drive.",
    },
  ],
  t3: [
    { id: "b1", role: "user", text: "Busca cuentas de tech en México con las que podamos colaborar." },
    {
      id: "b2",
      role: "sirio",
      work: { steps: ["Buscó cuentas por tema", "Descartó las inactivas", "Ordenó por afinidad"], secs: 35 },
      text: "Encontré seis cuentas con audiencia parecida a la nuestra. Dejé un borrador de correo para la primera; no se envía sin tu OK.",
    },
  ],
  t4: [
    { id: "c1", role: "user", text: "Tengo una idea: el cliente que pide cambios «chiquitos»." },
    {
      id: "c2",
      role: "sirio",
      work: { steps: ["Anotó la idea", "Escribió un guion de 28 s"], secs: 14 },
      text: "Me gusta. Ya hay guion de 28 segundos en Contenido. Falta elegir el gancho.",
    },
  ],
  t5: [
    { id: "d1", role: "user", text: "¿Cómo debería sonar FEBAcode en redes?" },
    {
      id: "d2",
      role: "sirio",
      work: { steps: ["Leyó tus publicaciones", "Comparó con cuentas similares"], secs: 17 },
      text: "Cercano, seco y con humor de oficina. Nada de jerga de startup. Si te late, lo guardo como voz de marca.",
    },
  ],
};

interface Store {
  // chat
  threads: ThreadMeta[];
  threadId: string;
  messages: Msg[];
  chatOpen: boolean;
  busy: boolean;
  setChatOpen: (v: boolean) => void;
  switchThread: (id: string) => void;
  newThread: () => void;
  sendMessage: (text: string) => void;
  stopWork: () => void;
  // approvals
  pubs: Pub[];
  asks: Ask[];
  askState: Record<string, AskState>;
  pendingCount: number;
  decidePub: (id: string, action: "approve" | "reject" | "publish" | "schedule") => void;
  answerAsk: (id: string, answer: string | null) => void;
  // inicio
  cutPaused: boolean;
  toggleCut: () => void;
  // operar
  run: RunState;
  startRun: () => void;
  pauseRun: () => void;
  // apps
  connected: Record<string, boolean>;
  dialogApp: string | null;
  openDialog: (id: string) => void;
  closeDialog: () => void;
  connectApp: (id: string) => void;
  disconnectApp: (id: string) => void;
  notice: string | null;
  dismissNotice: () => void;
  // ajustes
  autonomy: Record<string, Mode>;
  setAutonomy: (id: string, m: Mode) => void;
  cap: number;
  setCap: (n: number) => void;
  // toasts
  toast: Toast | null;
  showToast: (text: string) => void;
}

const Ctx = createContext<Store | null>(null);

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore fuera de StoreProvider");
  return v;
}

let uid = 100;
const nextId = (p: string) => `${p}${++uid}`;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [threads, setThreads] = useState<ThreadMeta[]>(THREADS);
  const [threadId, setThreadId] = useState("t1");
  const [byThread, setByThread] = useState<Record<string, Msg[]>>(INITIAL_MESSAGES);
  const [chatOpen, setChatOpen] = useState(true);
  const [busyIds, setBusyIds] = useState<string[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const replyIdx = useRef(0);

  const [pubs, setPubs] = useState<Pub[]>(PUBS);
  const [askState, setAskState] = useState<Record<string, AskState>>(
    Object.fromEntries(ASKS.map((a) => [a.id, { status: "open" as const }])),
  );
  const [cutPaused, setCutPaused] = useState(false);

  const [run, setRun] = useState<RunState>({ status: "idle", cursor: 0, feed: PAST_FEED });

  const [connected, setConnected] = useState<Record<string, boolean>>(
    Object.fromEntries(APPS.map((a) => [a.id, a.connected])),
  );
  const [dialogApp, setDialogApp] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(
    "Instagram está conectado. Elige qué cuentas puede usar Sirio.",
  );
  const [autonomy, setAutonomyState] = useState<Record<string, Mode>>(
    Object.fromEntries(CHANNELS.map((c) => [c.id, "ask" as Mode])),
  );
  const [cap, setCap] = useState(3000);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((text: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    const id = Date.now();
    setToast({ id, text });
    toastTimer.current = setTimeout(() => setToast(null), 4200);
  }, []);

  /* ------------------------------------------------------------- chat */

  const messages = useMemo(() => byThread[threadId] ?? [], [byThread, threadId]);
  const busy = busyIds.length > 0;

  const finishReply = useCallback((tid: string, mid: string, replyN: number) => {
    const reply = REPLIES[replyN % REPLIES.length];
    setByThread((s) => ({
      ...s,
      [tid]: (s[tid] ?? []).map((m) =>
        m.id === mid
          ? { ...m, working: false, work: { steps: reply.steps, secs: 2 }, text: reply.text }
          : m,
      ),
    }));
    setBusyIds((ids) => ids.filter((i) => i !== mid));
    delete timers.current[mid];
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t) return;
      const tid = threadId;
      const mid = nextId("s");
      const replyN = replyIdx.current++;
      setByThread((s) => ({
        ...s,
        [tid]: [
          ...(s[tid] ?? []),
          { id: nextId("u"), role: "user", text: t },
          { id: mid, role: "sirio", working: true },
        ],
      }));
      setBusyIds((ids) => [...ids, mid]);
      timers.current[mid] = setTimeout(() => finishReply(tid, mid, replyN), 2400);
      // Si es un hilo nuevo, el primer mensaje lo nombra.
      setThreads((ts) =>
        ts.map((x) =>
          x.id === tid && x.title === "Hilo nuevo"
            ? { ...x, title: t.length > 44 ? t.slice(0, 43) + "…" : t }
            : x,
        ),
      );
    },
    [threadId, finishReply],
  );

  const stopWork = useCallback(() => {
    for (const [mid, tm] of Object.entries(timers.current)) {
      clearTimeout(tm);
      // La respuesta se entrega de inmediato.
      const tid = Object.keys(byThread).find((k) => byThread[k].some((m) => m.id === mid));
      if (tid) finishReply(tid, mid, replyIdx.current - 1);
    }
  }, [byThread, finishReply]);

  const switchThread = useCallback((id: string) => setThreadId(id), []);

  const newThread = useCallback(() => {
    const id = nextId("t");
    setThreads((ts) => [{ id, title: "Hilo nuevo", when: "Ahora" }, ...ts]);
    setByThread((s) => ({ ...s, [id]: [] }));
    setThreadId(id);
    setChatOpen(true);
  }, []);

  /* ----------------------------------------------------- aprobaciones */

  const decidePub = useCallback(
    (id: string, action: "approve" | "reject" | "publish" | "schedule") => {
      const pub = pubs.find((p) => p.id === id);
      if (!pub) return;
      const when = pub.date.replace("Propuesta: ", "");
      setPubs((ps) =>
        ps.map((p) => {
          if (p.id !== id) return p;
          if (action === "reject") return { ...p, status: "rechazado", date: "Rechazada hoy" };
          if (action === "publish") return { ...p, status: "publicado", date: "Hoy", views: 0, likes: 0 };
          return { ...p, status: "programado", date: when };
        }),
      );
      showToast(
        action === "reject"
          ? "Rechazaste la publicación. Sirio la deja a un lado."
          : action === "publish"
            ? "Publicada. Sirio te avisa cuando tenga resultados."
            : `Programada para ${when.toLowerCase()}.`,
      );
      setRun((r) =>
        r.status === "waiting" && r.waitingPub === id
          ? {
              ...r,
              status: "idle",
              waitingPub: undefined,
              activeAgent: undefined,
              feed: [
                {
                  id: nextId("f"),
                  text: action === "reject" ? `Rechazaste «${pub.title}»` : `Aprobaste «${pub.title}»`,
                  time: "Ahora",
                  link: "Publicación",
                  icon: "check",
                  fresh: true,
                },
                ...r.feed,
              ],
            }
          : r,
      );
    },
    [pubs, showToast],
  );

  const answerAsk = useCallback(
    (id: string, answer: string | null) => {
      setAskState((s) => ({
        ...s,
        [id]: answer === null ? { status: "later" } : { status: "done", answer },
      }));
      if (answer !== null) showToast("Anotado. Sirio sigue con el guion.");
    },
    [showToast],
  );

  const pendingCount =
    pubs.filter((p) => p.status === "por-aprobar").length +
    ASKS.filter((a) => askState[a.id]?.status === "open").length;

  /* ------------------------------------------------------------- run */

  const startRun = useCallback(() => {
    setRun((r) => (r.status === "waiting" ? r : { ...r, status: "running" }));
  }, []);
  const pauseRun = useCallback(() => {
    setRun((r) => (r.status === "running" ? { ...r, status: "paused", activeAgent: undefined } : r));
  }, []);

  useEffect(() => {
    if (run.status !== "running") return;
    const tm = setTimeout(() => {
      const step = RUN_SCRIPT[run.cursor % RUN_SCRIPT.length];
      if (step.kind === "approval") {
        const pub = pubs.find((p) => p.status === "por-aprobar");
        if (!pub) {
          setRun((r) => ({
            ...r,
            status: "idle",
            cursor: r.cursor + 1,
            activeAgent: undefined,
            feed: [
              { id: nextId("f"), text: "Revisó las aprobaciones: todo está al día", time: "Ahora", link: "Contenido", icon: "check", fresh: true },
              ...r.feed,
            ],
          }));
          return;
        }
        setRun((r) => ({
          ...r,
          status: "waiting",
          cursor: r.cursor + 1,
          waitingPub: pub.id,
          activeAgent: step.agent,
          feed: [
            { id: nextId("f"), text: `Necesita tu OK para publicar «${pub.title}»`, time: "Ahora", link: step.link, icon: step.icon, fresh: true },
            ...r.feed,
          ],
        }));
        return;
      }
      setRun((r) => ({
        ...r,
        cursor: r.cursor + 1,
        activeAgent: step.agent,
        feed: [
          { id: nextId("f"), text: step.text, time: "Ahora", link: step.link, icon: step.icon, fresh: true },
          ...r.feed,
        ],
      }));
    }, 1700);
    return () => clearTimeout(tm);
  }, [run.status, run.cursor, pubs]);

  /* ------------------------------------------------------------ apps */

  const connectApp = useCallback(
    (id: string) => {
      setConnected((c) => ({ ...c, [id]: true }));
      const name = appById(id)?.name ?? "La app";
      setNotice(`${name} está conectado. Elige qué cuentas puede usar Sirio.`);
      showToast(`${name} quedó conectado.`);
      setDialogApp(null);
    },
    [showToast],
  );
  const disconnectApp = useCallback(
    (id: string) => {
      setConnected((c) => ({ ...c, [id]: false }));
      showToast(`${appById(id)?.name ?? "La app"} se desconectó.`);
      setDialogApp(null);
    },
    [showToast],
  );

  const value: Store = useMemo(
    () => ({
      threads,
      threadId,
      messages,
      chatOpen,
      busy,
      setChatOpen,
      switchThread,
      newThread,
      sendMessage,
      stopWork,
      pubs,
      asks: ASKS,
      askState,
      pendingCount,
      decidePub,
      answerAsk,
      cutPaused,
      toggleCut: () => setCutPaused((v) => !v),
      run,
      startRun,
      pauseRun,
      connected,
      dialogApp,
      openDialog: (id: string) => setDialogApp(id),
      closeDialog: () => setDialogApp(null),
      connectApp,
      disconnectApp,
      notice,
      dismissNotice: () => setNotice(null),
      autonomy,
      setAutonomy: (id: string, m: Mode) => setAutonomyState((s) => ({ ...s, [id]: m })),
      cap,
      setCap,
      toast,
      showToast,
    }),
    [
      threads, threadId, messages, chatOpen, busy, switchThread, newThread, sendMessage, stopWork,
      pubs, askState, pendingCount, decidePub, answerAsk, cutPaused, run, startRun, pauseRun,
      connected, dialogApp, connectApp, disconnectApp, notice, autonomy, cap, toast, showToast,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
