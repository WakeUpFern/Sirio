"use client";

import type { ComponentType, ReactNode } from "react";
import {
  SiDropbox,
  SiGmail,
  SiGoogleads,
  SiGoogleanalytics,
  SiGooglecalendar,
  SiGoogledrive,
  SiGooglesearchconsole,
  SiHubspot,
  SiInstagram,
  SiFacebook,
  SiMeta,
  SiNotion,
  SiStripe,
  SiTiktok,
  SiWhatsapp,
  SiX,
  SiYoutube,
  SiClaude,
  SiGooglegemini,
  SiMistralai,
} from "react-icons/si";
import { FaLinkedin, FaSlack } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";
import { Clapperboard, FileText, TrendingUp, Plus, ArrowUpRight } from "lucide-react";


/* ------------------------------------------------------------ Estrella */

export function Star({
  size = 20,
  working = false,
  className = "",
}: {
  size?: number;
  working?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`${working ? "star-working" : ""} ${className}`}
      fill="currentColor"
    >
      <path d="M12 1C12.9 7.6 16.4 11.1 23 12C16.4 12.9 12.9 16.4 12 23C11.1 16.4 7.6 12.9 1 12C7.6 11.1 11.1 7.6 12 1Z" />
    </svg>
  );
}

/* ------------------------------------------------------------ Logos */

type Brand = { Icon: ComponentType<{ size?: number; color?: string }>; color: string };

const BRANDS: Record<string, Brand> = {
  tiktok: { Icon: SiTiktok, color: "#0B1220" },
  instagram: { Icon: SiInstagram, color: "#C13584" },
  youtube: { Icon: SiYoutube, color: "#D93025" },
  facebook: { Icon: SiFacebook, color: "#1877F2" },
  x: { Icon: SiX, color: "#0B1220" },
  linkedin: { Icon: FaLinkedin, color: "#0A66C2" },
  gmail: { Icon: SiGmail, color: "#D93025" },
  whatsapp: { Icon: SiWhatsapp, color: "#1FA855" },
  slack: { Icon: FaSlack, color: "#4A154B" },
  drive: { Icon: SiGoogledrive, color: "#1E8E5A" },
  notion: { Icon: SiNotion, color: "#0B1220" },
  calendar: { Icon: SiGooglecalendar, color: "#2A6FDB" },
  analytics: { Icon: SiGoogleanalytics, color: "#E37400" },
  searchconsole: { Icon: SiGooglesearchconsole, color: "#2A6FDB" },
  hubspot: { Icon: SiHubspot, color: "#E8613A" },
  stripe: { Icon: SiStripe, color: "#5B5BD6" },
  metaads: { Icon: SiMeta, color: "#0866FF" },
  googleads: { Icon: SiGoogleads, color: "#2A6FDB" },
  dropbox: { Icon: SiDropbox, color: "#0061FF" },
  claude: { Icon: SiClaude, color: "#C96442" },
  codex: { Icon: RiOpenaiFill, color: "#0B1220" },
  gemini: { Icon: SiGooglegemini, color: "#3B6FD4" },
  mistral: { Icon: SiMistralai, color: "#E8751A" },
  // Herramientas propias de Sirio
  editor: { Icon: Clapperboard as never, color: "#0B1220" },
  guiones: { Icon: FileText as never, color: "#0B1220" },
  tendencias: { Icon: TrendingUp as never, color: "#0B1220" },
};

export function BrandLogo({ id, size = 16 }: { id: string; size?: number }) {
  const b = BRANDS[id];
  if (!b) return null;
  const internal = id === "editor" || id === "guiones" || id === "tendencias";
  if (internal) {
    const I = b.Icon as unknown as ComponentType<{ size?: number; strokeWidth?: number }>;
    return <I size={size} strokeWidth={1.6} />;
  }
  return <b.Icon size={size} color={b.color} />;
}

export function AppTile({
  id,
  size = 40,
  dot,
  label,
}: {
  id: string;
  size?: number;
  dot?: boolean;
  label?: string;
}) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      className="relative inline-flex shrink-0 items-center justify-center border border-line bg-white text-ink"
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.28) }}
    >
      <BrandLogo id={id} size={Math.round(size * 0.46)} />
      {dot ? (
        <span
          className="absolute -right-1 -top-1 block h-[9px] w-[9px] rounded-full border-2 border-white bg-ok"
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}

export function PlusTile({ size = 40, label }: { size?: number; label: string }) {
  return (
    <span
      aria-label={label}
      className="inline-flex shrink-0 items-center justify-center border border-dashed border-[#c5ccd9] bg-white/70 text-ink-2"
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.28) }}
    >
      <Plus size={Math.round(size * 0.42)} strokeWidth={1.6} />
    </span>
  );
}

/* ------------------------------------------------------------ Piezas */

export function GlassCard({
  title,
  children,
  right,
  className = "",
  href,
  bodyClass = "",
}: {
  title: string;
  children: ReactNode;
  right?: ReactNode;
  className?: string;
  href?: boolean;
  bodyClass?: string;
}) {
  return (
    <section className={`glass flex min-h-0 flex-col rounded-[16px] ${className}`}>
      <header className="flex items-center justify-between px-4 pt-3.5">
        <h2 className="text-[13px] font-semibold">{title}</h2>
        <span className="flex items-center gap-2 text-ink-3">
          {right}
          {href === false ? null : <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />}
        </span>
      </header>
      <div className="mx-4 mt-3 border-t border-black/[0.07]" />
      <div className={`min-h-0 flex-1 px-4 pb-4 pt-3 ${bodyClass}`}>{children}</div>
    </section>
  );
}

export function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-[18px] w-[32px] shrink-0 rounded-full transition-colors duration-150 ${on ? "bg-ok" : "bg-[#cbd2de]"}`}
    >
      <span
        className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm transition-all duration-150 ${on ? "left-[16px]" : "left-[2px]"}`}
      />
    </button>
  );
}

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
  size = "md",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; count?: number }[];
  label: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={`inline-flex items-center rounded-full bg-black/[0.055] p-[3px] ${size === "sm" ? "text-[12px]" : "text-[13px]"}`}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={`flex items-center gap-1.5 rounded-full font-medium transition-colors duration-150 ${size === "sm" ? "px-3 py-1" : "px-3.5 py-1.5"} ${active ? "bg-white text-ink shadow-[0_1px_2px_rgba(11,18,32,0.08)]" : "text-ink-2 hover:text-ink"}`}
          >
            {o.label}
            {o.count !== undefined ? (
              <span className="mono text-[10.5px] text-ink-3">{o.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function StatusDot({ tone }: { tone: "ok" | "warn" | "bad" | "idle" }) {
  const c = { ok: "bg-ok", warn: "bg-warn", bad: "bg-bad", idle: "bg-[#b6bdca]" }[tone];
  return <span className={`inline-block h-[7px] w-[7px] rounded-full ${c}`} aria-hidden="true" />;
}

export const TONE_BG: Record<string, string> = {
  lilac: "var(--lilac)",
  mint: "var(--mint)",
  peach: "var(--peach)",
  sky: "var(--cielo-alto)",
};
