import { Check, ChevronRight, Film, MessageCircle, Search, Send } from "lucide-react";
import { AppTile, StatusDot, Star, TONE_BG } from "@/components/ui";

const card =
  "w-full max-w-[400px] rounded-[16px] border border-white/70 bg-white p-4 text-left shadow-[0_1px_2px_rgba(11,18,32,0.04),0_10px_30px_rgba(11,18,32,0.07)]";

export function MiniMeet() {
  return (
    <div className={card}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white">
          <Star size={18} />
        </span>
        <div>
          <p className="text-[14px] font-semibold leading-tight">Hola, soy Sirio.</p>
          <p className="text-[12px] text-ink-2">Director de marketing de FEBAcode</p>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-2">
        Propongo ideas, edito lo que graban, publico lo que apruebas y respondo a tu audiencia. Si dudo, te pregunto.
      </p>
      <p className="label-caps mb-2 mt-4">Actividad de Sirio</p>
      <ul className="space-y-2 text-[12.5px]">
        {[
          ["Leyó la voz de FEBAcode", "Ayer"],
          ["Conectó TikTok", "Ayer"],
          ["Armó el calendario de la semana", "Hace 2 h"],
        ].map(([t, h]) => (
          <li key={t} className="flex items-center justify-between rounded-[9px] bg-[#f4f6fa] px-2.5 py-2">
            <span className="flex items-center gap-2">
              <Check size={13} strokeWidth={2.25} className="text-ok" aria-hidden="true" />
              {t}
            </span>
            <span className="mono text-ink-3">{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MiniIdeas() {
  const ideas = [
    ["«Era viernes. Eran las 4:55.»", true],
    ["«Nadie toque nada.»", false],
    ["«El deploy es cosa de un minuto.»", false],
  ] as const;
  return (
    <div className={card}>
      <p className="label-caps">Sirio propone</p>
      <p className="mt-1.5 text-[14px] font-semibold leading-snug">Tres ganchos para el sketch del lunes</p>
      <ul className="mt-3 space-y-2">
        {ideas.map(([t, rec], i) => (
          <li
            key={t}
            className={`flex items-center gap-2.5 rounded-[10px] border px-3 py-2.5 text-[12.5px] ${rec ? "border-ink/70 bg-[#f8f9fc]" : "border-line"}`}
          >
            <span className="mono grid h-[18px] w-[18px] place-items-center rounded-full border border-line bg-white text-[10px] text-ink-2">
              {i + 1}
            </span>
            <span className="flex-1">{t}</span>
            {rec ? (
              <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-white">Recomendada</span>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] text-ink-2">Guion de 45 s en 4 escenas, listo para grabar el jueves.</p>
    </div>
  );
}

export function MiniEdit() {
  const clips = [
    ["Toma 1", "0:06", true],
    ["Toma 2", "0:12", true],
    ["Toma 3", "0:14", false],
    ["Toma 4", "0:08", false],
    ["Toma 5", "0:05", false],
  ] as const;
  return (
    <div className={card}>
      <div className="flex gap-3.5">
        <div
          className="relative h-[132px] w-[74px] shrink-0 overflow-hidden rounded-[10px] p-2"
          style={{ background: TONE_BG.lilac }}
          aria-hidden="true"
        >
          <Star size={11} className="text-ink/35" />
          <p className="absolute inset-x-2 bottom-2 text-[9.5px] font-semibold leading-tight">El intern y el deploy del viernes</p>
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[12px] text-ink-2">
            <Star size={12} working className="text-ink" /> Cortando la toma 3 de 5
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {clips.map(([n, d, done]) => (
              <li key={n} className="flex items-center gap-2 text-[12px]">
                <span className={`grid h-4 w-4 place-items-center rounded-full ${done ? "bg-ok text-white" : "border border-[#c5ccd9]"}`}>
                  {done ? <Check size={10} strokeWidth={3} aria-hidden="true" /> : null}
                </span>
                <span className={done ? "text-ink-2" : "font-medium"}>{n}</span>
                <span className="mono ml-auto text-ink-3">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 flex gap-[3px]">
        {[6, 12, 14, 8, 5].map((w, i) => (
          <span key={i} className={`h-[18px] rounded-[5px] ${i < 2 ? "bg-ink/20" : i === 2 ? "bg-ink/45" : "bg-ink/8"}`} style={{ flex: w }} />
        ))}
      </div>
    </div>
  );
}

export function MiniApproval() {
  return (
    <div className={card}>
      <div className="flex items-center gap-2">
        <AppTile id="tiktok" size={26} />
        <div className="leading-tight">
          <p className="text-[12.5px] font-semibold">@febacode</p>
          <p className="text-[11px] text-ink-2">Borrador de Sirio · Sin publicar</p>
        </div>
      </div>
      <div className="mt-3 flex gap-3.5">
        <div
          className="relative h-[120px] w-[68px] shrink-0 overflow-hidden rounded-[10px] p-2"
          style={{ background: TONE_BG.lilac }}
          aria-hidden="true"
        >
          <Film size={12} className="text-ink/40" />
          <p className="absolute inset-x-2 bottom-2 text-[9px] font-semibold leading-tight">El intern y el deploy del viernes</p>
        </div>
        <div className="min-w-0 text-[12.5px] leading-snug">
          <p className="font-semibold">El intern y el deploy del viernes</p>
          <p className="mt-1 text-ink-2">Viernes, 4:55 p. m. Un intern, un botón de deploy y cero fe en el equipo.</p>
          <p className="mono mt-1.5 text-ink-3">#devlife #sketch #FEBAcode</p>
        </div>
      </div>
      <div className="mt-3.5 flex gap-1.5">
        <span className="btn btn-ink h-8 flex-1 text-[12px]">Aprobar</span>
        <span className="btn btn-soft h-8 px-3.5 text-[12px]">Editar</span>
        <span className="btn btn-soft h-8 px-3.5 text-[12px]">Rechazar</span>
      </div>
      <p className="mt-2.5 text-[11px] leading-snug text-ink-3">
        Aprobar la programa para el lunes a las 12:00. Rechazar la deja a un lado 14 días.
      </p>
    </div>
  );
}

export function MiniReply() {
  return (
    <div className={card}>
      <p className="label-caps">Comentario nuevo</p>
      <div className="mt-2 rounded-[10px] bg-[#f4f6fa] p-3 text-[12.5px]">
        <p className="flex items-center gap-1.5 font-semibold">
          <MessageCircle size={13} strokeWidth={1.75} aria-hidden="true" /> @marisol.dev
        </p>
        <p className="mt-1 text-ink-2">¿Quién hace estos sketches? Necesito que me inviten a la próxima.</p>
      </div>
      <p className="label-caps mt-3.5 flex items-center gap-1.5">
        <Star size={10} /> Borrador de Sirio
      </p>
      <p className="mt-1.5 text-[12.5px] leading-snug">
        Los hace el equipo de FEBAcode. Dani es el intern del deploy. Te escribimos por mensaje.
      </p>
      <div className="mt-2.5 flex gap-1.5">
        <span className="btn btn-ink h-8 gap-1.5 px-4 text-[12px]">
          <Send size={12} strokeWidth={2} /> Enviar
        </span>
        <span className="btn btn-soft h-8 px-3.5 text-[12px]">Editar</span>
      </div>
      <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-[12px]">
        <span className="flex items-center gap-2">
          <AppTile id="gmail" size={24} /> Correo a @devconmx
        </span>
        <span className="flex items-center gap-1 text-ink-2">
          No enviado <ChevronRight size={13} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export function MiniRules() {
  const rows = [
    ["Publicar y programar Reels", "Comparte lo que apruebas", true],
    ["Responder a tu audiencia", "Comentarios y mensajes", true],
    ["Gastar en anuncios", "Hasta $3,000 al mes", false],
  ] as const;
  return (
    <div className={card}>
      <div className="flex items-center gap-2.5">
        <AppTile id="instagram" size={30} />
        <div className="leading-tight">
          <p className="text-[13px] font-semibold">Instagram</p>
          <p className="text-[11.5px] text-ink-2">@febacode</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-[11.5px] font-medium text-ok">
          <StatusDot tone="ok" /> Conectada
        </span>
      </div>
      <p className="label-caps mb-1 mt-4">Sirio puede</p>
      <ul className="divide-y divide-line">
        {rows.map(([t, d, on]) => (
          <li key={t} className="flex items-center justify-between gap-3 py-2.5">
            <div>
              <p className="text-[12.5px] font-semibold">{t}</p>
              <p className="text-[11.5px] text-ink-2">{d}</p>
            </div>
            <span className={`relative h-[18px] w-[32px] shrink-0 rounded-full ${on ? "bg-ok" : "bg-[#cbd2de]"}`} aria-hidden="true">
              <span className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm ${on ? "left-[16px]" : "left-[2px]"}`} />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex items-center justify-between rounded-[10px] bg-[#f4f6fa] px-3 py-2 text-[12px]">
        <span className="text-ink-2">Modo</span>
        <span className="font-semibold">Preguntar primero</span>
      </div>
    </div>
  );
}

export function MiniApps() {
  const rows = [
    ["tiktok", "TikTok", "@febacode"],
    ["gmail", "Gmail", "hola@febacode.com"],
    ["whatsapp", "WhatsApp", "Número de FEBAcode"],
    ["drive", "Google Drive", "Carpeta «Sirio»"],
  ] as const;
  return (
    <div className={card}>
      <p className="text-[14px] font-semibold">Integraciones</p>
      <p className="mt-0.5 text-[12px] text-ink-2">Conecta las apps que usa tu equipo.</p>
      <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-line px-3 py-2 text-[12.5px] text-ink-3">
        <Search size={14} strokeWidth={1.75} aria-hidden="true" />
        Buscar apps
      </div>
      <p className="label-caps mb-1 mt-4">Conectadas</p>
      <ul className="divide-y divide-line">
        {rows.map(([id, n, d]) => (
          <li key={id} className="flex items-center gap-3 py-2">
            <AppTile id={id} size={30} />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-[12.5px] font-semibold">{n}</p>
              <p className="truncate text-[11.5px] text-ink-2">{d}</p>
            </div>
            <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-ok">
              <StatusDot tone="ok" /> Conectada
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
