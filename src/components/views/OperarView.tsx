"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  CircleHelp,
  Clock,
  FileText,
  Film,
  ImageIcon,
  Mail,
  MessageCircle,
  Pause,
  Play,
  Plug,
  Search,
  Settings,
  Type,
  X,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { AppTile, PlusTile, Segmented, Star, TONE_BG } from "@/components/ui";
import { useStore, type Mode } from "@/lib/store";
import { AGENTS, DONE_BY_SIRIO, NETWORK_NAME, TOOLS_USED, appById, type AgentDef, type FeedItem } from "@/lib/data";

const FEED_ICON: Record<FeedItem["icon"], typeof Film> = {
  film: Film,
  file: FileText,
  mail: Mail,
  calendar: CalendarDays,
  check: Check,
  message: MessageCircle,
  search: Search,
  plug: Plug,
  clock: Clock,
};

const TOOL_ICON = [ImageIcon, Film, Type, CalendarDays, Settings];

/* Posiciones de las tarjetas en el lienzo, en porcentaje. */
const POS: Record<string, { x: number; y: number }> = {
  alcance: { x: 21, y: 15 },
  redes: { x: 80, y: 17 },
  investigacion: { x: 9, y: 47 },
  anuncios: { x: 89, y: 49 },
  video: { x: 31, y: 75 },
  comunidad: { x: 71, y: 75 },
};
const WS = { x: 27, y: 31, w: 46, h: 30 };

function AgentCard({ agent, active }: { agent: AgentDef; active: boolean }) {
  const { connected, openDialog } = useStore();
  const p = POS[agent.id];
  const internal = (id: string) => !appById(id);
  const cols = agent.apps.length >= 3 ? 3 : Math.max(agent.apps.length, 1);
  return (
    <div
      className={`absolute z-10 rounded-[14px] border bg-white p-2.5 shadow-[0_1px_2px_rgba(11,18,32,0.04),0_6px_18px_rgba(11,18,32,0.05)] transition-colors duration-150 ${active ? "border-ink/45" : "border-line"}`}
      style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
    >
      <div className="flex items-center justify-between gap-3 pb-2">
        <h3 className="text-[12px] font-semibold">{agent.name}</h3>
        <Link
          href="/app/ajustes"
          aria-label={`Agregar una app a ${agent.name}`}
          className="grid h-5 w-5 place-items-center rounded-full text-ink-3 hover:bg-black/5 hover:text-ink"
        >
          <Plus size={13} strokeWidth={1.75} />
        </Link>
      </div>
      <div className="grid gap-x-1 gap-y-2" style={{ gridTemplateColumns: `repeat(${cols}, 46px)` }}>
        {agent.apps.length === 0 ? (
          <Link href="/app/ajustes" aria-label="Agregar una app a Comunidad" className="col-span-2">
            <PlusTile size={36} label="Agregar" />
          </Link>
        ) : (
          agent.apps.map((id) => {
            const app = appById(id);
            const on = internal(id) || connected[id];
            const name = app?.name ?? { editor: "Editor", guiones: "Guiones", tendencias: "Tendencias" }[id] ?? id;
            const short = name.replace("Google ", "G. ").replace("Search Console", "Console");
            const tile = (
              <>
                <span className={on ? "" : "opacity-55"}>
                  <AppTile id={id} size={36} dot={on} />
                </span>
                <span className="mt-1 block w-[46px] truncate text-center text-[10px] text-ink-3">{short}</span>
              </>
            );
            return internal(id) ? (
              <div key={id} className="flex flex-col items-center" title={name}>
                {tile}
              </div>
            ) : (
              <button
                key={id}
                type="button"
                onClick={() => openDialog(id)}
                aria-label={`${name}, ${on ? "conectada" : "sin conectar"}`}
                className="flex flex-col items-center rounded-[10px]"
              >
                {tile}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

function Workshop() {
  const { run } = useStore();
  const running = run.status === "running";
  const latest = run.feed[0];
  const caption =
    run.status === "running"
      ? latest?.text
      : run.status === "waiting"
        ? "Esperando tu OK para seguir."
        : run.status === "paused"
          ? "En pausa. Retomo cuando me avises."
          : "Listo para empezar cuando tú me digas.";
  const clips = [8, 10, 12, 9, 6];
  return (
    <div
      className="glass absolute z-10 rounded-[20px] p-4"
      style={{ left: `${WS.x}%`, top: `${WS.y}%`, width: `${WS.w}%`, height: `${WS.h}%` }}
    >
      <span className="label-caps absolute -top-[9px] left-1/2 -translate-x-1/2 rounded-full border border-line bg-white px-2.5 py-0.5 text-[9.5px]">
        Taller de Sirio
      </span>
      <span className="absolute -top-[44px] left-1/2 grid -translate-x-1/2 place-items-center text-ink">
        <Star size={30} working={running} />
      </span>
      <div className="flex h-full gap-4">
        <div
          className="relative aspect-[9/16] h-full max-h-[160px] shrink-0 self-center overflow-hidden rounded-[10px] border border-white/80 p-2"
          style={{ background: TONE_BG.lilac }}
          aria-hidden="true"
        >
          <Star size={12} className="text-ink/35" />
          <p className="absolute inset-x-2 bottom-2 text-[10px] font-semibold leading-tight text-ink">
            El intern y el deploy del viernes
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <p className="label-caps">En edición</p>
          <p className="mt-1 text-[13px] font-semibold leading-snug">Toma 3 de 5</p>
          <p className="mt-0.5 min-h-[34px] text-[12px] leading-snug text-ink-2" aria-live="polite">
            {caption}
          </p>
          <div className="relative mt-2.5">
            <div className="flex gap-[3px]">
              {clips.map((w, i) => (
                <span
                  key={i}
                  className={`h-[22px] rounded-[5px] ${i < 2 ? "bg-ink/20" : i === 2 ? "bg-ink/45" : "bg-ink/8"}`}
                  style={{ flex: w }}
                />
              ))}
            </div>
            {running ? (
              <span className="playhead-run absolute -top-1 bottom-[-4px] w-px bg-ink" aria-hidden="true" />
            ) : (
              <span className="absolute -top-1 bottom-[-4px] left-[48%] w-px bg-ink/70" aria-hidden="true" />
            )}
            <div className="mono mt-1.5 flex justify-between text-[10px] text-ink-3">
              <span>00:00</span>
              <span>00:45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Canvas() {
  const { run, notice, dismissNotice } = useStore();
  const activeAgent = run.status === "running" || run.status === "waiting" ? run.activeAgent : undefined;
  return (
    <div className="relative min-h-[620px] min-w-0 flex-1">
      <svg className="absolute inset-0 z-0 h-full w-full" aria-hidden="true">
        <defs>
          <mask id="ws-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
            <rect x={`${WS.x}%`} y={`${WS.y}%`} width={`${WS.w}%`} height={`${WS.h}%`} rx="20" fill="#000" />
          </mask>
        </defs>
        <g mask="url(#ws-cut)">
          {AGENTS.map((a) => {
            const p = POS[a.id];
            const on = a.id === activeAgent;
            return (
              <line
                key={a.id}
                x1={`${p.x}%`}
                y1={`${p.y}%`}
                x2={`${WS.x + WS.w / 2}%`}
                y2={`${WS.y + WS.h / 2}%`}
                stroke="#0B1220"
                strokeOpacity={on ? 0.5 : 0.15}
                strokeWidth={on ? 1.75 : 1}
                strokeLinecap="round"
                style={{ transition: "stroke-opacity 150ms, stroke-width 150ms" }}
              />
            );
          })}
        </g>
      </svg>

      <Workshop />
      {AGENTS.map((a) => (
        <AgentCard key={a.id} agent={a} active={a.id === activeAgent} />
      ))}

      <div className="absolute bottom-3 left-[3%] z-10">
        <p className="label-caps mb-1.5 pl-1">Herramientas que usa Sirio</p>
        <div className="glass flex gap-2 rounded-[18px] p-2">
          {TOOLS_USED.map((t, i) => {
            const I = TOOL_ICON[i];
            return (
              <div key={t} className="flex w-[52px] flex-col items-center">
                <span className="grid h-[38px] w-[38px] place-items-center rounded-[11px] border border-line bg-white text-ink">
                  <I size={17} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="mt-1 text-[10px] text-ink-2">{t}</span>
              </div>
            );
          })}
        </div>
      </div>

      {notice ? (
        <div
          role="status"
          className="fade-in absolute bottom-3 right-0 z-20 flex w-[290px] items-start gap-2.5 rounded-[14px] border border-line bg-white p-3.5 text-[12.5px] shadow-[var(--shadow-float)]"
        >
          <span className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ok text-white">
            <Check size={12} strokeWidth={2.75} aria-hidden="true" />
          </span>
          <p className="flex-1 leading-snug">{notice}</p>
          <button
            type="button"
            onClick={dismissNotice}
            aria-label="Cerrar aviso"
            className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-ink-3 hover:bg-black/5 hover:text-ink"
          >
            <X size={13} strokeWidth={1.75} />
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ActivityPanel() {
  const { run, startRun, pauseRun, pubs, decidePub } = useStore();
  const [mode, setMode] = useState<Mode>("ask");
  const [menu, setMenu] = useState(false);
  const status = {
    idle: { label: "Listo para operar", tone: "bg-[#b6bdca]" },
    running: { label: "Sirio está operando", tone: "bg-ok" },
    paused: { label: "En pausa", tone: "bg-warn" },
    waiting: { label: "Esperando tu OK", tone: "bg-warn" },
  }[run.status];
  const waitingPub = run.waitingPub ? pubs.find((p) => p.id === run.waitingPub) : undefined;
  const pending = waitingPub?.status === "por-aprobar";

  return (
    <section
      aria-label="Actividad de Sirio"
      className="relative flex w-full shrink-0 flex-col rounded-[16px] border border-line bg-white p-4 lg:w-[280px]"
    >
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-[13px] font-semibold" role="status">
          <span className={`h-[8px] w-[8px] rounded-full ${status.tone}`} aria-hidden="true" />
          {status.label}
        </p>
        <button
          type="button"
          onClick={() => setMenu((m) => !m)}
          aria-label="Cambiar el modo de Sirio"
          aria-expanded={menu}
          className="grid h-7 w-7 place-items-center rounded-full text-ink-3 hover:bg-black/5 hover:text-ink"
        >
          <Settings size={15} strokeWidth={1.6} />
        </button>
      </div>
      <p className="mt-1 text-[12px] leading-snug text-ink-2">
        {mode === "ask"
          ? "Preguntar primero · Sirio te consulta antes de publicar."
          : "Por su cuenta · Sirio publica y te avisa después."}
      </p>
      {menu ? (
        <>
          <button type="button" aria-label="Cerrar" className="fixed inset-0 z-10 cursor-default" onClick={() => setMenu(false)} />
          <div role="radiogroup" aria-label="Modo de Sirio" className="fade-in absolute right-3 top-[44px] z-20 w-[250px] rounded-[14px] border border-line bg-white p-1.5 shadow-[var(--shadow-float)]">
            {(
              [
                ["ask", "Preguntar primero", "Sirio te consulta antes de publicar."],
                ["auto", "Por su cuenta", "Sirio publica y te avisa después."],
              ] as const
            ).map(([v, t, d]) => (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={mode === v}
                onClick={() => {
                  setMode(v);
                  setMenu(false);
                }}
                className="flex w-full items-start gap-2.5 rounded-[9px] px-2.5 py-2 text-left hover:bg-[#f4f6fa]"
              >
                <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${mode === v ? "border-ink bg-ink text-white" : "border-[#c5ccd9]"}`}>
                  {mode === v ? <Check size={10} strokeWidth={3} aria-hidden="true" /> : null}
                </span>
                <span>
                  <span className="block text-[12.5px] font-semibold">{t}</span>
                  <span className="block text-[11.5px] text-ink-2">{d}</span>
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}

      {run.status === "running" ? (
        <button type="button" onClick={pauseRun} className="btn btn-ink mt-3.5 h-10 w-full text-[13px]">
          <Pause size={14} strokeWidth={2} /> Pausar
        </button>
      ) : run.status === "waiting" ? (
        <button type="button" disabled className="btn btn-ink mt-3.5 h-10 w-full text-[13px]">
          <Clock size={14} strokeWidth={2} /> Esperando tu OK
        </button>
      ) : (
        <button type="button" onClick={startRun} className="btn btn-ink mt-3.5 h-10 w-full text-[13px]">
          <Play size={14} strokeWidth={2} fill="currentColor" /> {run.status === "paused" ? "Reanudar" : "Iniciar"}
        </button>
      )}

      <p className="label-caps mb-2 mt-5">Actividad de Sirio</p>
      <ul className="scroll-thin -mx-1 max-h-[300px] min-h-0 flex-1 space-y-3 overflow-y-auto px-1 lg:max-h-none">
        {run.feed.map((f) => {
          const I = FEED_ICON[f.icon];
          return (
            <li key={f.id} className={`flex gap-2.5 ${f.fresh ? "fade-in" : ""}`}>
              <I size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-ink-2" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12.5px] leading-snug">{f.text}</p>
                  <span className="mono shrink-0 pt-0.5 text-[10.5px] text-ink-3">{f.time}</span>
                </div>
                <Link
                  href={f.icon === "film" || f.icon === "file" || f.icon === "check" ? "/app/contenido" : "/app/operar"}
                  className="mt-0.5 inline-flex items-center gap-0.5 text-[12px] text-ink-2 underline underline-offset-2 hover:text-ink"
                >
                  {f.link} <ArrowUpRight size={11} strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      {run.status === "waiting" && pending && waitingPub ? (
        <div className="fade-in mt-3 rounded-[12px] border border-warn/30 bg-[#fbf7ef] p-3">
          <p className="label-caps" style={{ color: "var(--warn)" }}>Sirio pregunta</p>
          <p className="mt-1 text-[12.5px] font-semibold leading-snug">
            ¿Publico «{waitingPub.title}» en {NETWORK_NAME[waitingPub.network]}?
          </p>
          <div className="mt-2.5 flex gap-2">
            <button type="button" onClick={() => decidePub(waitingPub.id, "approve")} className="btn btn-ink h-8 flex-1 text-[12.5px]">
              Aprobar
            </button>
            <button type="button" onClick={() => decidePub(waitingPub.id, "reject")} className="btn btn-soft h-8 px-3.5 text-[12.5px]">
              Rechazar
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 rounded-[12px] border border-dashed border-[#d3d9e4] bg-[#f8f9fb] px-3 py-2.5 text-[12px] text-ink-3" aria-disabled="true">
          Sirio te preguntará aquí cuando te necesite
        </div>
      )}
    </section>
  );
}

function Library() {
  const items = [
    ...DONE_BY_SIRIO,
    { icon: "file", name: "Guion «Cuando el cliente dice…»", time: "Ayer" },
    { icon: "film", name: "Video cortado: «Bienvenido, intern»", time: "Jue 5 nov" },
  ] as const;
  const I = { file: FileText, film: Film, mail: Mail, calendar: CalendarDays } as const;
  return (
    <div className="glass rounded-[16px] p-5">
      <h2 className="text-[13px] font-semibold">Lo que Sirio ha producido</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((it) => {
          const Icon = I[it.icon];
          return (
            <li key={it.name} className="flex items-center gap-3 rounded-[12px] bg-white/80 p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px] border border-line bg-white text-ink-2">
                <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium">{it.name}</p>
                <p className="mono text-ink-3">{it.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function OperarView() {
  const [tab, setTab] = useState<"operar" | "biblioteca">("operar");
  return (
    <div className="flex h-full min-h-[720px] flex-col gap-3">
      <div className="flex shrink-0 items-center justify-between">
        <Segmented
          label="Vista de Operar"
          value={tab}
          onChange={setTab}
          options={[
            { value: "operar", label: "Operar" },
            { value: "biblioteca", label: "Biblioteca" },
          ]}
        />
        <button type="button" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] text-ink-2 hover:bg-white/50 hover:text-ink">
          ¿Necesitas ayuda? <CircleHelp size={15} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>
      {tab === "operar" ? (
        <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row">
          <ActivityPanel />
          <Canvas />
        </div>
      ) : (
        <Library />
      )}
    </div>
  );
}
