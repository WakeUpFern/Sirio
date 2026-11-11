"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  Bell,
  Building2,
  Eye,
  EyeOff,
  Minus,
  Palette,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { AppTile, Segmented, StatusDot } from "@/components/ui";
import { useStore, type Mode } from "@/lib/store";
import {
  APPS,
  APP_CATS,
  CHANNELS,
  MODEL_AGENTS,
  PROVIDERS,
  SETTINGS_GROUPS,
  type AppCat,
} from "@/lib/data";

/* ---------------------------------------------------------- Integraciones */

function AppRow({ id }: { id: string }) {
  const { connected, openDialog } = useStore();
  const app = APPS.find((a) => a.id === id)!;
  const on = connected[id];
  return (
    <li>
      <button
        type="button"
        onClick={() => openDialog(id)}
        className="flex w-full items-start gap-3 rounded-[12px] p-2.5 text-left transition-colors duration-150 hover:bg-black/[0.035]"
      >
        <AppTile id={id} size={44} />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="text-[13.5px] font-semibold">{app.name}</span>
            {on ? (
              <span className="flex items-center gap-1 text-[11px] font-medium text-ok">
                <StatusDot tone="ok" /> Conectada
              </span>
            ) : null}
          </span>
          <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-2">{app.blurb}</span>
        </span>
      </button>
    </li>
  );
}

function Integraciones() {
  const { connected } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<AppCat | "Todo">("Todo");
  const match = (id: string) => {
    const a = APPS.find((x) => x.id === id)!;
    return (
      (cat === "Todo" || a.cat === cat) &&
      (q.trim() === "" || (a.name + " " + a.blurb).toLowerCase().includes(q.trim().toLowerCase()))
    );
  };
  const connectedApps = APPS.filter((a) => connected[a.id] && match(a.id));
  const cats = [{ n: "Todo" as const, c: APPS.length }, ...APP_CATS.map((n) => ({ n, c: APPS.filter((a) => a.cat === n).length }))];
  const shelves = APP_CATS.map((c) => ({ c, apps: APPS.filter((a) => a.cat === c && !connected[a.id] && match(a.id)) })).filter(
    (s) => s.apps.length > 0,
  );
  const empty = connectedApps.length === 0 && shelves.length === 0;

  return (
    <div>
      <h2 className="text-[22px] font-medium tracking-[-0.01em]">Integraciones</h2>
      <p className="mt-1 text-[13px] text-ink-2">Conecta las apps que usa tu equipo. Sirio solo hace lo que le permites.</p>
      <div className="mt-5 flex flex-col gap-6 md:flex-row">
        <div className="w-full shrink-0 md:w-[200px]">
          <label className="flex h-10 items-center gap-2 rounded-[10px] border border-line bg-white px-3 text-ink-3 focus-within:border-ink/40">
            <Search size={15} strokeWidth={1.75} aria-hidden="true" />
            <span className="sr-only">Buscar apps</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar apps"
              className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"
            />
          </label>
          <ul className="mt-3 flex gap-1 overflow-x-auto md:flex-col" aria-label="Categorías">
            {cats.map(({ n, c }) => (
              <li key={n} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setCat(n)}
                  aria-pressed={cat === n}
                  className={`flex h-9 w-full items-center justify-between gap-3 rounded-[10px] px-3 text-[13px] transition-colors duration-150 ${cat === n ? "bg-ink font-semibold text-white" : "text-ink-2 hover:bg-black/5 hover:text-ink"}`}
                >
                  {n === "Todo" ? "Todo" : n}
                  <span className={`mono text-[10.5px] ${cat === n ? "text-white/70" : "text-ink-3"}`}>{c}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-1 space-y-8">
          {connectedApps.length > 0 ? (
            <section>
              <h3 className="flex items-center gap-2 text-[15px] font-semibold">
                Conectadas <span className="mono rounded-full bg-black/[0.06] px-2 py-px text-[10.5px] font-normal text-ink-2">{connectedApps.length}</span>
              </h3>
              <ul className="mt-2 grid gap-x-4 xl:grid-cols-2">
                {connectedApps.map((a) => (
                  <AppRow key={a.id} id={a.id} />
                ))}
              </ul>
            </section>
          ) : null}
          {shelves.map(({ c, apps }) => (
            <section key={c}>
              <h3 className="flex items-center gap-2 border-t border-line pt-6 text-[15px] font-semibold">
                {c} <span className="mono rounded-full bg-black/[0.06] px-2 py-px text-[10.5px] font-normal text-ink-2">{apps.length}</span>
              </h3>
              <ul className="mt-2 grid gap-x-4 xl:grid-cols-2">
                {apps.map((a) => (
                  <AppRow key={a.id} id={a.id} />
                ))}
              </ul>
            </section>
          ))}
          {empty ? (
            <p className="py-10 text-center text-[13px] text-ink-2">
              No encontré apps con «{q}». Prueba con otro nombre o cambia de categoría.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------ Modelos y llaves */

function ProviderRow({ p }: { p: (typeof PROVIDERS)[number] }) {
  const [key, setKey] = useState(p.key);
  const [show, setShow] = useState(false);
  const { showToast } = useStore();
  const ok = key.trim() !== "";
  return (
    <li className="flex flex-col gap-3 rounded-[14px] border border-line bg-white p-4 md:flex-row md:items-center">
      <div className="flex w-[210px] shrink-0 items-center gap-3">
        <AppTile id={p.id} size={40} />
        <div className="leading-tight">
          <p className="text-[13.5px] font-semibold">{p.name}</p>
          <p className="text-[12px] text-ink-2">{p.by}</p>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <label className="flex h-10 min-w-0 flex-1 items-center rounded-[10px] border border-line bg-[#fafbfc] px-3 focus-within:border-ink/40">
          <span className="sr-only">Llave de {p.name}</span>
          <input
            type={show ? "text" : "password"}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Pega tu llave aquí"
            autoComplete="off"
            className="mono w-full min-w-0 bg-transparent text-[12px] outline-none placeholder:font-sans placeholder:text-ink-3"
          />
        </label>
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Ocultar la llave" : "Mostrar la llave"}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] text-ink-2 hover:bg-black/5"
        >
          {show ? <EyeOff size={16} strokeWidth={1.6} /> : <Eye size={16} strokeWidth={1.6} />}
        </button>
        <button
          type="button"
          onClick={() => showToast(`Llave de ${p.name} guardada.`)}
          disabled={!ok}
          className="btn btn-soft h-10 px-4 text-[12.5px] disabled:opacity-40"
        >
          Guardar
        </button>
      </div>
      <p className={`flex w-[96px] shrink-0 items-center gap-1.5 text-[12px] font-medium ${ok ? "text-ok" : "text-ink-3"}`}>
        <StatusDot tone={ok ? "ok" : "idle"} />
        {ok ? "Conectado" : "Sin llave"}
      </p>
    </li>
  );
}

function Modelos() {
  const [models, setModels] = useState(Object.fromEntries(MODEL_AGENTS.map((a) => [a.id, a.model])));
  const options = PROVIDERS.flatMap((p) => p.models);
  return (
    <div>
      <h2 className="text-[22px] font-medium tracking-[-0.01em]">Modelos y llaves</h2>
      <p className="mt-1 text-[13px] text-ink-2">Las llaves se guardan cifradas y solo las usa tu equipo de agentes.</p>
      <ul className="mt-5 space-y-2.5">
        {PROVIDERS.map((p) => (
          <ProviderRow key={p.id} p={p} />
        ))}
      </ul>
      <h3 className="mt-9 text-[15px] font-semibold">Qué modelo usa cada agente</h3>
      <div className="mt-3 divide-y divide-line overflow-hidden rounded-[14px] border border-line bg-white">
        {MODEL_AGENTS.map((a) => (
          <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-[13.5px] font-semibold">{a.name}</p>
              <p className="text-[12.5px] text-ink-2">{a.role}</p>
            </div>
            <label className="block">
              <span className="sr-only">Modelo del agente {a.name}</span>
              <select
                value={models[a.id]}
                onChange={(e) => setModels((m) => ({ ...m, [a.id]: e.target.value }))}
                className="h-9 rounded-[10px] border border-line bg-white px-3 text-[13px]"
              >
                {options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- Autonomía */

function Autonomia() {
  const { autonomy, setAutonomy, cap, setCap } = useStore();
  return (
    <div>
      <h2 className="text-[22px] font-medium tracking-[-0.01em]">Autonomía</h2>
      <p className="mt-1 text-[13px] text-ink-2">Decide en qué canales Sirio puede actuar sin preguntarte.</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-line bg-white p-4">
        <div>
          <p className="text-[13.5px] font-semibold">Tope de gasto mensual en anuncios</p>
          <p className="text-[12.5px] text-ink-2">Sirio nunca gasta más que esto, ni en modo «Por su cuenta».</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Bajar el tope $500" onClick={() => setCap(Math.max(0, cap - 500))} className="btn btn-soft h-9 w-9">
            <Minus size={15} strokeWidth={1.75} />
          </button>
          <p className="min-w-[110px] text-center text-[20px] font-medium" aria-live="polite">
            ${cap.toLocaleString("en-US")} <span className="text-[12px] font-normal text-ink-3">MXN</span>
          </p>
          <button type="button" aria-label="Subir el tope $500" onClick={() => setCap(cap + 500)} className="btn btn-soft h-9 w-9">
            <Plus size={15} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-[14px] border border-line bg-white">
        <div className="hidden grid-cols-[150px_250px_1fr] gap-4 border-b border-line bg-[#fafbfc] px-4 py-2.5 md:grid">
          <span className="label-caps">Canal</span>
          <span className="label-caps">Modo</span>
          <span className="label-caps">Qué significa</span>
        </div>
        <ul className="divide-y divide-line">
          {CHANNELS.map((c) => {
            const m = autonomy[c.id];
            return (
              <li key={c.id} className="grid items-center gap-3 px-4 py-3.5 md:grid-cols-[150px_250px_1fr] md:gap-4">
                <span className="flex items-center gap-2.5 text-[13.5px] font-semibold">
                  <AppTile id={c.id === "ads" ? "metaads" : c.id} size={30} />
                  {c.name}
                </span>
                <Segmented
                  size="sm"
                  label={`Modo en ${c.name}`}
                  value={m}
                  onChange={(v: Mode) => setAutonomy(c.id, v)}
                  options={[
                    { value: "ask", label: "Preguntar primero" },
                    { value: "auto", label: "Por su cuenta" },
                  ]}
                />
                <p className="text-[12.5px] leading-snug text-ink-2">{m === "ask" ? c.ask : c.auto}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- Estados vacíos */

const EMPTY: Record<string, { icon: ReactNode; title: string; text: string }> = {
  General: { icon: <Building2 size={22} strokeWidth={1.4} />, title: "Todavía no hay nada que ajustar aquí", text: "El nombre del espacio y la zona horaria ya están listos. Cuando haya más datos del negocio, los cambias desde esta página." },
  Equipo: { icon: <Users size={22} strokeWidth={1.4} />, title: "Tu equipo aparecerá aquí", text: "Fernando y los demás podrán aprobar publicaciones y grabar con Sirio. Por ahora, solo tú ves esta demo." },
  Marca: { icon: <Palette size={22} strokeWidth={1.4} />, title: "Sirio aprende tu marca en el chat", text: "Cuéntale cómo suena FEBAcode y él guarda la voz, los colores y las frases que no se usan." },
  Notificaciones: { icon: <Bell size={22} strokeWidth={1.4} />, title: "Sin avisos por configurar", text: "Sirio te avisa en la campana cuando algo espera tu aprobación. Los avisos por correo llegan más adelante." },
  Apariencia: { icon: <Palette size={22} strokeWidth={1.4} />, title: "Un solo cielo, por ahora", text: "Sirio usa el cielo justo antes del amanecer. Los temas llegan cuando alguien los pida." },
};

function Empty({ name }: { name: string }) {
  const e = EMPTY[name];
  return (
    <div>
      <h2 className="text-[22px] font-medium tracking-[-0.01em]">{name}</h2>
      <div className="mt-6 grid min-h-[360px] place-items-center rounded-[16px] border border-dashed border-[#cdd4e0] p-8 text-center">
        <div className="max-w-[380px]">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-black/[0.05] text-ink-2">{e.icon}</span>
          <p className="mt-4 text-[15px] font-semibold">{e.title}</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">{e.text}</p>
          <Link href="/app" className="btn btn-soft mt-5 h-9 px-4 text-[12.5px]">
            Volver a Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Vista */

export function AjustesView() {
  const [section, setSection] = useState("Integraciones");
  return (
    <div className="flex min-h-full flex-col gap-3 md:flex-row">
      <nav aria-label="Secciones de ajustes" className="glass w-full shrink-0 self-start rounded-[20px] p-3 md:w-[240px]">
        {SETTINGS_GROUPS.map((g, gi) => (
          <div key={g.group} className={gi > 0 ? "mt-4" : ""}>
            <p className="label-caps px-3 pb-1.5 pt-1">{g.group}</p>
            <ul>
              {g.items.map((it) => (
                <li key={it}>
                  <button
                    type="button"
                    onClick={() => setSection(it)}
                    aria-current={section === it ? "page" : undefined}
                    className={`flex h-9 w-full items-center rounded-[10px] px-3 text-left text-[13.5px] transition-colors duration-150 ${section === it ? "bg-white font-semibold text-ink shadow-[0_1px_2px_rgba(11,18,32,0.06)]" : "text-ink-2 hover:bg-white/50 hover:text-ink"}`}
                  >
                    {it}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <section className="glass min-h-[600px] min-w-0 flex-1 rounded-[20px] p-6 md:p-8" aria-live="polite">
        {section === "Integraciones" ? <Integraciones /> : section === "Modelos y llaves" ? <Modelos /> : section === "Autonomía" ? <Autonomia /> : <Empty name={section} />}
      </section>
    </div>
  );
}

