"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  FileText,
  Film,
  Mail,
  Pause,
  Play,
  Send,
} from "lucide-react";
import { GlassCard, Star } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  DONE_BY_SIRIO,
  NETWORK_NAME,
  REACH,
  REACH_DAYS,
  RESULTS,
  STEPS_LAUNCH,
  STEPS_PREP,
} from "@/lib/data";

const DONE_ICON = { file: FileText, film: Film, mail: Mail, calendar: CalendarDays } as const;

function StatusStrip() {
  const { cutPaused, toggleCut } = useStore();
  return (
    <section className="glass flex h-[56px] items-center gap-3.5 rounded-[16px] px-4">
      <Star size={20} working={!cutPaused} className="shrink-0 text-ink" />
      <p className="min-w-0 flex-1 truncate text-[14px] font-medium">
        {cutPaused
          ? "En pausa. Retomo el corte del sketch del intern en la toma 3 de 5."
          : "Estoy cortando el sketch del intern. Voy en la toma 3 de 5."}
      </p>
      <div className="hidden items-center gap-1 sm:flex" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`h-[3px] w-5 rounded-full ${i < 3 ? "bg-ink" : "bg-black/12"}`} />
        ))}
      </div>
      <button type="button" onClick={toggleCut} className="btn btn-soft h-8 gap-1.5 px-3.5 text-[12.5px]">
        {cutPaused ? <Play size={13} strokeWidth={2} /> : <Pause size={13} strokeWidth={2} />}
        {cutPaused ? "Reanudar" : "Pausar"}
      </button>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-warn/10 px-2 py-0.5 text-[10.5px] font-semibold text-warn">
      {children}
    </span>
  );
}

function NeedsCard() {
  const { pubs, asks, askState, decidePub, answerAsk, pendingCount } = useStore();
  const pending = pubs.filter((p) => p.status === "por-aprobar");
  const openAsks = asks.filter((a) => askState[a.id]?.status === "open");
  return (
    <GlassCard
      title="Necesita tu OK"
      className="@3xl:col-span-7"
      right={
        pendingCount > 0 ? (
          <span className="mono rounded-full bg-warn/10 px-1.5 py-px text-[10.5px] font-medium text-warn">
            {pendingCount}
          </span>
        ) : null
      }
    >
      {pendingCount === 0 ? (
        <div className="grid h-full min-h-[150px] place-items-center text-center">
          <div>
            <Check size={20} strokeWidth={1.5} className="mx-auto text-ok" aria-hidden="true" />
            <p className="mt-2 text-[13px] font-semibold">Todo en orden</p>
            <p className="text-[12.5px] text-ink-2">Sirio te avisa aquí cuando necesite algo de ti.</p>
          </div>
        </div>
      ) : (
        <ul className="space-y-2">
          {pending.map((p) => (
            <li key={p.id} className="flex items-center gap-3 rounded-[10px] bg-white/75 px-3 py-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold">{p.title}</p>
                <p className="mt-1 flex items-center gap-2 text-[12px] text-ink-2">
                  <Tag>Necesita tu OK</Tag>
                  <span className="truncate">
                    {NETWORK_NAME[p.network]} · {p.date.replace("Propuesta: ", "")}
                  </span>
                </p>
              </div>
              <Link href="/app/contenido" className="btn btn-soft h-8 px-3.5 text-[12.5px]">
                Revisar
              </Link>
              <button type="button" onClick={() => decidePub(p.id, "approve")} className="btn btn-ink h-8 px-3.5 text-[12.5px]">
                Aprobar
              </button>
            </li>
          ))}
          {openAsks.map((a) => (
            <li key={a.id} className="flex items-center gap-3 rounded-[10px] bg-white/75 px-3 py-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold">{a.title}</p>
                <p className="mt-1 flex items-center gap-2 text-[12px] text-ink-2">
                  <Tag>{a.tag}</Tag>
                  <span className="truncate">
                    {a.kind === "question" && a.options && a.recommended !== undefined
                      ? `Recomiendo ${a.options[a.recommended]}`
                      : a.detail}
                  </span>
                </p>
              </div>
              {a.kind === "question" && a.options && a.recommended !== undefined ? (
                <>
                  <button type="button" onClick={() => answerAsk(a.id, null)} className="btn btn-soft h-8 px-3.5 text-[12.5px]">
                    Ahora no
                  </button>
                  <button
                    type="button"
                    onClick={() => answerAsk(a.id, a.options![a.recommended!])}
                    className="btn btn-ink h-8 px-3.5 text-[12.5px]"
                  >
                    Usar la recomendada
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => answerAsk(a.id, "Confirmado")} className="btn btn-ink h-8 px-3.5 text-[12.5px]">
                  {a.action}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </GlassCard>
  );
}

function StepRow({ name, done, next }: { name: string; done: boolean; next?: boolean }) {
  return (
    <li className="flex h-[28px] items-center gap-2.5 rounded-[9px] bg-white/75 px-2.5 text-[12.5px]">
      {done ? (
        <span className="grid h-[17px] w-[17px] shrink-0 place-items-center rounded-full bg-ok text-white">
          <Check size={11} strokeWidth={3} aria-hidden="true" />
        </span>
      ) : next ? (
        <Send size={15} strokeWidth={1.5} className="shrink-0 text-ink-2" aria-hidden="true" />
      ) : (
        <span className="h-[17px] w-[17px] shrink-0 rounded-full border border-[#c5ccd9]" aria-hidden="true" />
      )}
      <span className={`min-w-0 flex-1 truncate ${done ? "text-ink-2" : ""}`}>{name}</span>
      {next ? (
        <span className="flex items-center gap-0.5 text-[12px] font-semibold">
          Empezar <ArrowRight size={12} strokeWidth={2} aria-hidden="true" />
        </span>
      ) : null}
    </li>
  );
}

function NextStepsCard() {
  const { pubs } = useStore();
  const p1 = pubs.find((p) => p.id === "p1");
  const launchDone = p1 && p1.status !== "por-aprobar" && p1.status !== "rechazado";
  const launch = STEPS_LAUNCH.map((s) => (s.id === "p1" ? { ...s, done: !!launchDone } : s));
  const prepDone = STEPS_PREP.filter((s) => s.done).length;
  const launchCount = launch.filter((s) => s.done).length;
  const total = STEPS_PREP.length + launch.length;
  const done = prepDone + launchCount;
  const firstOpenPrep = STEPS_PREP.findIndex((s) => !s.done);
  const firstOpenLaunch = launch.findIndex((s) => !s.done);
  return (
    <GlassCard title="Tus próximos pasos" className="@3xl:col-span-5">
      <div className="flex items-center gap-3">
        <span className="text-[12.5px] font-medium">
          {done} de {total} pasos completos
        </span>
        <div className="flex flex-1 gap-1" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={`h-[3px] flex-1 rounded-full ${i < done ? "bg-ink" : "bg-black/12"}`} />
          ))}
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[12px] font-semibold">
        <span>Preparar</span>
        <span className="mono font-normal text-ink-3">{prepDone} de {STEPS_PREP.length}</span>
      </div>
      <ul className="mt-1.5 space-y-1">
        {STEPS_PREP.map((s, i) => (
          <StepRow key={s.name} name={s.name} done={s.done} next={i === firstOpenPrep} />
        ))}
      </ul>
      <div className="mt-2.5 flex items-center justify-between text-[12px] font-semibold">
        <span>Lanzar</span>
        <span className="mono font-normal text-ink-3">{launchCount} de {launch.length}</span>
      </div>
      <ul className="mt-1.5 space-y-1">
        {launch.map((s, i) => (
          <StepRow key={s.name} name={s.name} done={s.done} next={firstOpenPrep === -1 && i === firstOpenLaunch} />
        ))}
      </ul>
    </GlassCard>
  );
}

function DoneCard() {
  return (
    <GlassCard title="Hecho por Sirio" className="@3xl:col-span-5">
      <ul className="space-y-1.5">
        {DONE_BY_SIRIO.map((d) => {
          const Icon = DONE_ICON[d.icon];
          return (
            <li key={d.name} className="flex items-center gap-3 rounded-[10px] bg-white/75 px-2.5 py-1">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] border border-line bg-white text-ink-2">
                <Icon size={15} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium">{d.name}</span>
              <span className="mono shrink-0 text-ink-3">{d.time}</span>
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
}

function ReachCard() {
  const W = 340;
  const H = 70;
  const max = 900;
  const pts = REACH.map((v, i) => [(i / (REACH.length - 1)) * W, H - 6 - (v / max) * (H - 14)] as const);
  // Curva suave con puntos de control en horizontal.
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  const total = REACH.reduce((a, b) => a + b, 0);
  return (
    <GlassCard title="Alcance" className="@3xl:col-span-4">
      <div className="flex h-full flex-col justify-between gap-3">
        <div>
          <p className="text-[12px] text-ink-2">Últimos 7 días</p>
          <p className="text-[34px] font-medium leading-none tracking-tight">{total.toLocaleString("en-US")}</p>
          <p className="mt-1.5 text-[12px] text-ink-2">
            cuentas alcanzadas · <span className="font-semibold text-ink">+18 %</span> vs. la semana pasada
          </p>
        </div>
        <div className="min-w-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-[70px] w-full" role="img" aria-label="Alcance diario de los últimos 7 días, en aumento">
            <defs>
              <linearGradient id="reach-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0B1220" stopOpacity="0.14" />
                <stop offset="1" stopColor="#0B1220" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${d} L${W},${H} L0,${H} Z`} fill="url(#reach-fill)" />
            <path d={d} fill="none" stroke="#0B1220" strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill="#0B1220" fillOpacity="0.8" />
          </svg>
          <div className="mono mt-1 flex justify-between text-[10px] text-ink-3">
            {REACH_DAYS.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function ResultsCard() {
  return (
    <GlassCard title="Resultados" className="@3xl:col-span-3">
      <div className="flex h-full flex-col justify-between divide-y divide-black/[0.07]">
        {RESULTS.map((r, i) => (
          <div key={r.label} className={`py-2 ${i === 0 ? "pt-0" : ""} ${i === RESULTS.length - 1 ? "pb-0" : ""}`}>
            <p className="text-[12px] text-ink-2">{r.label}</p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="text-[24px] font-medium leading-none tracking-tight">{r.value}</span>
              <span className="mono text-ok">{r.delta}</span>
            </p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export function HomeView() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-3 pb-3 @3xl:grid-cols-12">
        <div className="@3xl:col-span-12">
          <StatusStrip />
        </div>
        <NeedsCard />
        <NextStepsCard />
        <DoneCard />
        <ReachCard />
        <ResultsCard />
      </div>
    </div>
  );
}
