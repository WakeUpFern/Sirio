"use client";

import { useState } from "react";
import {
  Bookmark,
  Camera,
  Check,
  Clock,
  Heart,
  MessageCircle,
  Music2,
  Share2,
  X,
} from "lucide-react";
import { AppTile, Segmented, Star, TONE_BG } from "@/components/ui";
import { useStore } from "@/lib/store";
import { NETWORK_NAME, SCRIPTS, type Network, type Pub, type PubStatus } from "@/lib/data";

type Tab = "por-aprobar" | "programado" | "publicado" | "guiones";
type Filter = "todas" | Network;

const STATUS_LABEL: Record<PubStatus, string> = {
  "por-aprobar": "Por aprobar",
  programado: "Programado",
  publicado: "Publicado",
  rechazado: "Rechazado",
};

function StatusChip({ status }: { status: PubStatus }) {
  const dot = { "por-aprobar": "bg-warn", programado: "bg-ink-3", publicado: "bg-ok", rechazado: "bg-bad" }[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.05] px-2 py-0.5 text-[11px] font-medium text-ink-2">
      <span className={`h-[6px] w-[6px] rounded-full ${dot}`} aria-hidden="true" />
      {STATUS_LABEL[status]}
    </span>
  );
}

const totalSecs = (p: Pub) => p.scenes.reduce((a, s) => a + s.secs, 0);
const fmt = (n: number) => `0:${String(n).padStart(2, "0")}`;

function Thumb({ pub }: { pub: Pub }) {
  return (
    <div
      className="relative aspect-[9/16] w-[88px] shrink-0 overflow-hidden rounded-[10px] p-2"
      style={{ background: TONE_BG[pub.tone] }}
      aria-hidden="true"
    >
      <Star size={11} className="text-ink/35" />
      <p className="absolute inset-x-2 bottom-6 text-[10.5px] font-semibold leading-tight">{pub.title}</p>
      <span className="mono absolute bottom-2 right-2 text-[9.5px] text-ink/60">{fmt(totalSecs(pub))}</span>
    </div>
  );
}

function PubCard({ pub, selected, onSelect }: { pub: Pub; selected: boolean; onSelect: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={`flex w-full gap-3.5 rounded-[16px] border p-3 text-left transition-colors duration-150 hover:bg-white ${selected ? "border-ink/60 bg-white" : "glass border-white/80"}`}
      >
        <Thumb pub={pub} />
        <div className="flex min-w-0 flex-1 flex-col py-0.5">
          <span className="flex items-center gap-1.5 text-[12px] text-ink-2">
            <AppTile id={pub.network === "youtube" ? "youtube" : pub.network} size={20} />
            {NETWORK_NAME[pub.network]}
          </span>
          <h3 className="mt-2 text-[13.5px] font-semibold leading-snug">{pub.title}</h3>
          <p className="mono mt-1 text-ink-3">{pub.date}</p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
            <StatusChip status={pub.status} />
            {pub.status === "publicado" && pub.views !== undefined ? (
              <span className="mono text-ink-3">{pub.views.toLocaleString("en-US")} vistas</span>
            ) : null}
          </div>
        </div>
      </button>
    </li>
  );
}

function Phone({ pub, platform }: { pub: Pub; platform: "tiktok" | "instagram" }) {
  const tt = platform === "tiktok";
  const side = [
    [Heart, pub.likes !== undefined ? String(pub.likes) : "1.2 k"],
    [MessageCircle, "48"],
    [Bookmark, "21"],
    [Share2, "9"],
  ] as const;
  return (
    <div
      className="relative mx-auto h-[392px] w-[196px] overflow-hidden rounded-[32px] border-[6px] border-ink"
      style={{ background: TONE_BG[pub.tone] }}
      role="img"
      aria-label={`Vista previa en ${tt ? "TikTok" : "Instagram"}`}
    >
      <span className="absolute left-1/2 top-1.5 h-[14px] w-[58px] -translate-x-1/2 rounded-full bg-ink" />
      <div className="absolute inset-x-0 top-6 flex justify-center gap-3 text-[10.5px] font-semibold text-ink/70">
        {tt ? (
          <>
            <span>Siguiendo</span>
            <span className="text-ink underline decoration-1 underline-offset-4">Para ti</span>
          </>
        ) : (
          <>
            <span className="text-[13px]">Reels</span>
            <Camera size={14} className="absolute right-3 top-[-1px]" aria-hidden="true" />
          </>
        )}
      </div>
      <Star size={26} className="absolute left-4 top-[84px] text-ink/25" />
      <p className="absolute inset-x-4 top-[128px] text-[19px] font-semibold leading-[1.15] tracking-[-0.01em]">{pub.title}</p>
      <div className="absolute bottom-3 right-2 flex flex-col items-center gap-2.5">
        {side.map(([I, n]) => (
          <span key={n + String(I)} className="flex flex-col items-center gap-0.5 text-[9px] font-medium">
            <I size={17} strokeWidth={1.75} aria-hidden="true" />
            {n}
          </span>
        ))}
      </div>
      <div className="absolute bottom-3 left-3 right-11 text-[9.5px] leading-snug">
        <p className="flex items-center gap-1.5 font-semibold">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-ink text-white">
            <Star size={8} />
          </span>
          febacode
          {!tt ? <span className="rounded border border-ink/40 px-1 py-px text-[8.5px]">Seguir</span> : null}
        </p>
        <p className="mt-1 line-clamp-2">{pub.caption}</p>
        {tt ? (
          <p className="mt-1 flex items-center gap-1 text-ink/70">
            <Music2 size={9} aria-hidden="true" /> sonido original · FEBAcode
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Detail({ pub, onClose }: { pub: Pub; onClose: () => void }) {
  const { decidePub, sendMessage, showToast } = useStore();
  const [platform, setPlatform] = useState<"tiktok" | "instagram">(pub.network === "instagram" ? "instagram" : "tiktok");
  const total = totalSecs(pub);
  const pending = pub.status === "por-aprobar";

  function again() {
    sendMessage(`Hazme otra versión de «${pub.title}», con otro gancho.`);
    showToast("Sirio está preparando otra versión. La ves en el chat.");
  }

  return (
    <aside aria-label={`Detalle de ${pub.title}`} className="glass scroll-thin flex min-h-0 w-full shrink-0 flex-col overflow-y-auto rounded-[20px] lg:w-[400px]">
      <div className="flex items-start justify-between gap-3 border-b border-black/[0.07] px-5 py-4">
        <div className="min-w-0">
          <StatusChip status={pub.status} />
          <h2 className="mt-2 text-[15px] font-semibold leading-snug">{pub.title}</h2>
          <p className="mono mt-0.5 text-ink-3">{pub.date}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Cerrar el detalle" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-2 hover:bg-black/5 hover:text-ink">
          <X size={16} strokeWidth={1.75} />
        </button>
      </div>

      <div className="space-y-6 px-5 py-5">
        <div>
          <div className="mb-3 flex justify-center">
            <Segmented
              size="sm"
              label="Red de la vista previa"
              value={platform}
              onChange={setPlatform}
              options={[
                { value: "tiktok", label: "TikTok" },
                { value: "instagram", label: "Instagram" },
              ]}
            />
          </div>
          <Phone key={platform} pub={pub} platform={platform} />
        </div>

        <section>
          <h3 className="label-caps">Texto de la publicación</h3>
          <p className="mt-2 rounded-[10px] bg-white/80 p-3 text-[13px] leading-relaxed">
            {pub.caption}
            <span className="mono mt-1.5 block text-ink-3">{pub.hashtags}</span>
          </p>
        </section>

        <section>
          <h3 className="label-caps">Guion · {pub.scenes.length} escenas</h3>
          <ol className="mt-2 space-y-2">
            {pub.scenes.map((s, i) => (
              <li key={s.title + i} className="flex gap-3 rounded-[10px] bg-white/80 p-3">
                <span className="mono grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line bg-white text-[10px] text-ink-2">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center justify-between text-[12px] font-semibold">
                    {s.title}
                    <span className="mono font-normal text-ink-3">{fmt(s.secs)}</span>
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-snug text-ink-2">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h3 className="label-caps">Línea de tiempo</h3>
          <div className="mt-2 flex gap-[3px]" role="img" aria-label={`${pub.scenes.length} cortes, ${total} segundos`}>
            {pub.scenes.map((s, i) => (
              <span key={i} className="h-[26px] rounded-[6px] bg-ink/15 first:bg-ink/25" style={{ flex: s.secs }} />
            ))}
          </div>
          <div className="mono mt-1.5 flex justify-between text-[10px] text-ink-3">
            <span>0:00</span>
            <span>{pub.scenes.length} cortes</span>
            <span>{fmt(total)}</span>
          </div>
        </section>

        {pub.status === "publicado" ? (
          <section className="flex gap-6 rounded-[10px] bg-white/80 p-3">
            <div>
              <p className="text-[11.5px] text-ink-2">Vistas</p>
              <p className="text-[20px] font-medium">{(pub.views ?? 0).toLocaleString("en-US")}</p>
            </div>
            <div>
              <p className="text-[11.5px] text-ink-2">Me gusta</p>
              <p className="text-[20px] font-medium">{pub.likes ?? 0}</p>
            </div>
          </section>
        ) : (
          <section className="flex flex-wrap gap-2">
            {pending ? (
              <>
                <button type="button" onClick={() => decidePub(pub.id, "publish")} className="btn btn-ink h-10 flex-1 px-4 text-[13px]">
                  Publicar ahora
                </button>
                <button type="button" onClick={() => decidePub(pub.id, "schedule")} className="btn btn-soft h-10 px-4 text-[13px]">
                  <Clock size={14} strokeWidth={1.75} /> Programar
                </button>
              </>
            ) : (
              <button type="button" onClick={() => decidePub(pub.id, "publish")} className="btn btn-ink h-10 flex-1 px-4 text-[13px]">
                Publicar ahora
              </button>
            )}
            <button type="button" onClick={again} className="btn btn-line h-10 w-full text-[13px]">
              <Star size={13} /> Pedir otra versión a Sirio
            </button>
            {pending ? (
              <button type="button" onClick={() => decidePub(pub.id, "reject")} className="btn btn-soft h-10 w-full text-[13px] text-bad">
                Rechazar
              </button>
            ) : null}
          </section>
        )}
      </div>
    </aside>
  );
}

export function ContenidoView() {
  const { pubs } = useStore();
  const [tab, setTab] = useState<Tab>("por-aprobar");
  const [filter, setFilter] = useState<Filter>("todas");
  const [selId, setSelId] = useState<string | null>("p1");

  const byNet = (p: Pub) => filter === "todas" || p.network === filter;
  const count = (s: PubStatus) => pubs.filter((p) => p.status === s).length;
  const list = tab === "guiones" ? [] : pubs.filter((p) => p.status === tab && byNet(p));
  const sel = pubs.find((p) => p.id === selId && p.status !== "rechazado") ?? null;
  const showDetail = tab !== "guiones" && sel;

  return (
    <div className="flex h-full min-h-[640px] flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label="Estado de las publicaciones"
          value={tab}
          onChange={setTab}
          options={[
            { value: "por-aprobar", label: "Por aprobar", count: count("por-aprobar") },
            { value: "programado", label: "Programado", count: count("programado") },
            { value: "publicado", label: "Publicado", count: count("publicado") },
            { value: "guiones", label: "Guiones", count: SCRIPTS.length },
          ]}
        />
        {tab !== "guiones" ? (
          <Segmented
            size="sm"
            label="Filtrar por red"
            value={filter}
            onChange={setFilter}
            options={[
              { value: "todas", label: "Todas" },
              { value: "tiktok", label: "TikTok" },
              { value: "instagram", label: "Instagram" },
              { value: "youtube", label: "YouTube" },
            ]}
          />
        ) : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row">
        <div className="scroll-thin min-h-0 min-w-0 flex-1 overflow-y-auto">
          {tab === "guiones" ? (
            <ul className="grid gap-3 md:grid-cols-2">
              {SCRIPTS.map((s) => (
                <li key={s.id} className="glass rounded-[16px] p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[11px] font-medium text-ink-2">{s.status}</span>
                    <span className="mono text-ink-3">{s.when}</span>
                  </div>
                  <h3 className="mt-3 text-[14px] font-semibold leading-snug">{s.title}</h3>
                  <p className="mono mt-2 text-ink-3">
                    {s.scenes} escenas · {fmt(s.secs)}
                  </p>
                </li>
              ))}
            </ul>
          ) : list.length === 0 ? (
            <div className="glass grid min-h-[300px] place-items-center rounded-[20px] p-8 text-center">
              <div>
                <Check size={22} strokeWidth={1.5} className="mx-auto text-ink-3" aria-hidden="true" />
                <p className="mt-3 text-[14px] font-semibold">
                  {tab === "por-aprobar" ? "No hay nada por aprobar" : "Aquí no hay nada todavía"}
                </p>
                <p className="mx-auto mt-1 max-w-[320px] text-[12.5px] text-ink-2">
                  {tab === "por-aprobar"
                    ? "Cuando Sirio termine un video, lo verás aquí para que lo revises."
                    : "Prueba con otra red o cambia de pestaña."}
                </p>
              </div>
            </div>
          ) : (
            <ul className={`grid gap-3 ${showDetail ? "xl:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"}`}>
              {list.map((p) => (
                <PubCard key={p.id} pub={p} selected={p.id === sel?.id} onSelect={() => setSelId(p.id === selId ? null : p.id)} />
              ))}
              {tab === "por-aprobar" ? (
                <li className="flex min-h-[170px] items-center justify-center gap-2 rounded-[16px] border border-dashed border-[#b9c3d4] p-4 text-[12.5px] text-ink-2">
                  <Star size={14} working className="text-ink" /> Sirio corta la toma 3 de 5 de otra pieza
                </li>
              ) : null}
            </ul>
          )}
        </div>
        {showDetail && sel ? <Detail key={sel.id} pub={sel} onClose={() => setSelId(null)} /> : null}
      </div>
    </div>
  );
}
