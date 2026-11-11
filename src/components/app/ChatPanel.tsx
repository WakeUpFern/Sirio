"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUp,
  Check,
  ChevronDown,
  History,
  LayoutGrid,
  Mic,
  MoreHorizontal,
  Paperclip,
  PanelLeftClose,
  PanelLeftOpen,
  Square,
  SquarePen,
} from "lucide-react";
import { Star, TONE_BG } from "@/components/ui";
import { useStore, type Msg } from "@/lib/store";
import { ASKS, NETWORK_NAME, SUGGESTIONS } from "@/lib/data";

function Elapsed() {
  const [ms, setMs] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => setMs(performance.now() - start), 100);
    return () => clearInterval(id);
  }, []);
  return <span className="mono text-ink-3">{(ms / 1000).toFixed(1)} s</span>;
}

function WorkRow({ m }: { m: Msg }) {
  const [open, setOpen] = useState(false);
  if (m.working) {
    return (
      <div className="flex items-center gap-2 text-[12px] text-ink-2" role="status">
        <Star size={14} working className="text-ink" />
        <span>Trabajando</span>
        <Elapsed />
      </div>
    );
  }
  if (!m.work) return null;
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-md py-0.5 text-[12px] text-ink-2 transition-colors duration-150 hover:text-ink"
      >
        <LayoutGrid size={14} strokeWidth={1.6} aria-hidden="true" />
        <span>Trabajó {m.work.steps.length} pasos</span>
        <span className="mono text-ink-3">· {m.work.secs} s</span>
        <ChevronDown
          size={13}
          strokeWidth={1.75}
          className={`text-ink-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <ul className="fade-in ml-[6px] mt-1.5 space-y-1.5 border-l border-black/10 pl-3.5">
          {m.work.steps.map((s) => (
            <li key={s} className="flex items-center gap-2 text-[12px] text-ink-2">
              <Check size={12} strokeWidth={2} className="shrink-0 text-ok" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ApprovalCard({ pubId }: { pubId: string }) {
  const { pubs, decidePub } = useStore();
  const p = pubs.find((x) => x.id === pubId);
  if (!p) return null;
  const pending = p.status === "por-aprobar";
  return (
    <div className="rounded-[14px] border border-line bg-white p-3 shadow-[var(--shadow-float)]">
      <p className="label-caps" style={{ color: pending ? "var(--warn)" : "var(--ink-3)" }}>
        {pending ? "Necesita tu OK" : p.status === "rechazado" ? "Rechazada" : "Aprobada"}
      </p>
      <div className="mt-2 flex gap-3">
        <div
          className="relative h-[68px] w-[40px] shrink-0 overflow-hidden rounded-[8px]"
          style={{ background: TONE_BG[p.tone] }}
          aria-hidden="true"
        >
          <Star size={12} className="absolute left-1.5 top-1.5 text-ink/30" />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold leading-snug">{p.title}</p>
          <p className="mt-0.5 text-[12px] text-ink-2">
            {NETWORK_NAME[p.network]} · {p.date.replace("Propuesta: ", "")}
          </p>
          <p className="mono mt-1 text-ink-3">45 s · 4 escenas</p>
        </div>
      </div>
      {pending ? (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => decidePub(p.id, "approve")}
            className="btn btn-ink h-8 flex-1 text-[12.5px]"
          >
            Aprobar
          </button>
          <button
            type="button"
            onClick={() => decidePub(p.id, "reject")}
            className="btn btn-soft h-8 px-4 text-[12.5px]"
          >
            Rechazar
          </button>
        </div>
      ) : (
        <p
          className={`mt-3 flex items-center gap-1.5 text-[12px] font-medium ${p.status === "rechazado" ? "text-bad" : "text-ok"}`}
        >
          <Check size={13} strokeWidth={2.25} aria-hidden="true" />
          {p.status === "rechazado" ? "La rechazaste" : `Aprobada. Programada: ${p.date.toLowerCase()}`}
        </p>
      )}
    </div>
  );
}

function QuestionCard({ askId }: { askId: string }) {
  const { askState, answerAsk } = useStore();
  const ask = ASKS.find((a) => a.id === askId);
  const st = askState[askId];
  if (!ask || !ask.options) return null;
  if (st?.status === "done") {
    return (
      <div className="rounded-[14px] border border-line bg-white/80 p-3 text-[12.5px]">
        <p className="label-caps">Sirio preguntó</p>
        <p className="mt-1.5 flex items-start gap-1.5 text-ink-2">
          <Check size={13} strokeWidth={2.25} className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
          <span>
            Elegiste <span className="font-semibold text-ink">{st.answer}</span>
          </span>
        </p>
      </div>
    );
  }
  if (st?.status === "later") {
    return (
      <div className="rounded-[14px] border border-line bg-white/80 p-3 text-[12.5px] text-ink-2">
        <p className="label-caps">Sirio preguntó</p>
        <p className="mt-1.5">Lo dejaste para después. Sirio no avanza con ese guion hasta que decidas.</p>
      </div>
    );
  }
  return (
    <div className="rounded-[14px] border border-line bg-white p-3 shadow-[var(--shadow-float)]">
      <p className="label-caps">Sirio pregunta</p>
      <p className="mt-1.5 text-[13px] font-semibold leading-snug">{ask.title}</p>
      <ul className="mt-2.5 space-y-1.5">
        {ask.options.map((o, i) => (
          <li key={o}>
            <button
              type="button"
              onClick={() => answerAsk(ask.id, o)}
              className={`flex w-full items-center gap-2.5 rounded-[10px] border px-2.5 py-2 text-left text-[12.5px] transition-colors duration-150 hover:bg-[#f4f6fa] ${i === ask.recommended ? "border-ink/70 bg-[#f8f9fc]" : "border-line"}`}
            >
              <span className="mono grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border border-line bg-white text-[10px] text-ink-2">
                {i + 1}
              </span>
              <span className="flex-1">{o}</span>
              {i === ask.recommended ? (
                <span className="shrink-0 rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-white">
                  Recomendada
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => answerAsk(ask.id, null)}
        className="mt-2 rounded-md px-1 py-0.5 text-[12px] font-medium text-ink-2 underline-offset-2 hover:text-ink hover:underline"
      >
        Ahora no
      </button>
    </div>
  );
}

function Message({ m }: { m: Msg }) {
  if (m.role === "user") {
    return (
      <div className="fade-in flex justify-end">
        <p className="max-w-[86%] rounded-[12px] bg-white px-3 py-2 text-[13px] leading-snug shadow-[0_1px_2px_rgba(11,18,32,0.05)]">
          {m.text}
        </p>
      </div>
    );
  }
  return (
    <div className="fade-in space-y-2.5">
      <WorkRow m={m} />
      {m.text ? <p className="text-[13px] leading-[1.5] text-ink-2">{m.text}</p> : null}
      {m.card?.type === "approval" ? <ApprovalCard pubId={m.card.pubId} /> : null}
      {m.card?.type === "question" ? <QuestionCard askId={m.card.askId} /> : null}
    </div>
  );
}

export function ChatPanel({ forceShow = false }: { forceShow?: boolean }) {
  const {
    threads, threadId, messages, busy, sendMessage, stopWork, switchThread, newThread, setChatOpen,
  } = useStore();
  const [draft, setDraft] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const title = threads.find((t) => t.id === threadId)?.title ?? "Hilo";

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight });
  }, [messages, threadId]);

  function submit(e?: FormEvent) {
    e?.preventDefault();
    if (!draft.trim() || busy) return;
    sendMessage(draft);
    setDraft("");
  }

  const headBtn =
    "grid h-8 w-8 shrink-0 place-items-center rounded-[9px] text-ink-2 transition-colors duration-150 hover:bg-black/5 hover:text-ink";

  return (
    <aside
      aria-label="Chat con Sirio"
      className={`glass relative h-full w-[380px] shrink-0 flex-col rounded-[20px] ${forceShow ? "flex" : "hidden lg:flex"}`}
    >
      <div className="relative flex h-[52px] shrink-0 items-center gap-0.5 border-b border-black/[0.07] px-2.5">
        <button type="button" className={headBtn} aria-label="Plegar el chat" onClick={() => setChatOpen(false)}>
          <PanelLeftClose size={16} strokeWidth={1.6} />
        </button>
        <button
          type="button"
          className={headBtn}
          aria-label="Historial de hilos"
          aria-expanded={historyOpen}
          onClick={() => setHistoryOpen((o) => !o)}
        >
          <History size={16} strokeWidth={1.6} />
        </button>
        <h1 className="min-w-0 flex-1 truncate px-1.5 text-[13px] font-semibold">{title}</h1>
        <button type="button" className={headBtn} aria-label="Más opciones del hilo">
          <MoreHorizontal size={16} strokeWidth={1.6} />
        </button>
        <button type="button" className={headBtn} aria-label="Nuevo hilo" onClick={newThread}>
          <SquarePen size={16} strokeWidth={1.6} />
        </button>

        {historyOpen ? (
          <>
            <button
              type="button"
              aria-label="Cerrar historial"
              className="fixed inset-0 z-10 cursor-default"
              onClick={() => setHistoryOpen(false)}
            />
            <div className="fade-in absolute left-2.5 right-2.5 top-[46px] z-20 rounded-[14px] border border-line bg-white p-1.5 shadow-[var(--shadow-float)]">
              <p className="label-caps px-2.5 pb-1 pt-1.5">Hilos recientes</p>
              <ul>
                {threads.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => {
                        switchThread(t.id);
                        setHistoryOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-3 rounded-[9px] px-2.5 py-2 text-left text-[12.5px] transition-colors duration-150 hover:bg-[#f4f6fa] ${t.id === threadId ? "bg-[#f4f6fa] font-semibold" : ""}`}
                    >
                      <span className="truncate">{t.title}</span>
                      <span className="mono shrink-0 text-ink-3">{t.when}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
      </div>

      <div ref={scroller} className="scroll-thin min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <Star size={28} className="text-ink" />
            <p className="mt-3 text-[15px] font-semibold">¿Qué armamos hoy?</p>
            <p className="mt-1 text-[12.5px] text-ink-2">
              Cuéntale a Sirio una idea. Él propone, tú decides.
            </p>
            <div className="mt-4 flex flex-col gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-[12.5px] text-ink-2 transition-colors duration-150 hover:bg-white hover:text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => <Message key={m.id} m={m} />)
        )}
      </div>

      <form onSubmit={submit} className="shrink-0 p-3 pt-1">
        <div className="rounded-[16px] border border-line bg-white p-2.5 shadow-[var(--shadow-float)] focus-within:border-ink/40">
          <label htmlFor="chat-input" className="sr-only">
            Mensaje para Sirio
          </label>
          <textarea
            id="chat-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) submit(e);
            }}
            rows={2}
            placeholder="Escríbele a Sirio…"
            className="block w-full resize-none bg-transparent px-1 text-[13px] leading-snug outline-none placeholder:text-ink-3"
          />
          <div className="mt-1 flex items-center justify-between">
            <button
              type="button"
              aria-label="Adjuntar un archivo"
              className="grid h-8 w-8 place-items-center rounded-full text-ink-2 hover:bg-black/5 hover:text-ink"
            >
              <Paperclip size={16} strokeWidth={1.6} />
            </button>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Dictar un mensaje"
                className="grid h-8 w-8 place-items-center rounded-full text-ink-2 hover:bg-black/5 hover:text-ink"
              >
                <Mic size={16} strokeWidth={1.6} />
              </button>
              {busy ? (
                <button
                  type="button"
                  onClick={stopWork}
                  aria-label="Detener a Sirio"
                  className="btn btn-ink h-8 w-8"
                >
                  <Square size={11} fill="currentColor" />
                </button>
              ) : (
                <button
                  type="submit"
                  aria-label="Enviar mensaje"
                  disabled={!draft.trim()}
                  className="btn btn-ink h-8 w-8"
                >
                  <ArrowUp size={16} strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </aside>
  );
}

export function ChatRail() {
  const { setChatOpen, newThread } = useStore();
  return (
    <aside
      aria-label="Chat plegado"
      className="glass hidden h-full w-[52px] shrink-0 flex-col items-center gap-1 rounded-[20px] py-2.5 lg:flex"
    >
      <button
        type="button"
        aria-label="Abrir el chat con Sirio"
        onClick={() => setChatOpen(true)}
        className="grid h-9 w-9 place-items-center rounded-[10px] text-ink-2 hover:bg-black/5 hover:text-ink"
      >
        <PanelLeftOpen size={16} strokeWidth={1.6} />
      </button>
      <button
        type="button"
        aria-label="Nuevo hilo"
        onClick={newThread}
        className="grid h-9 w-9 place-items-center rounded-[10px] text-ink-2 hover:bg-black/5 hover:text-ink"
      >
        <SquarePen size={16} strokeWidth={1.6} />
      </button>
    </aside>
  );
}
