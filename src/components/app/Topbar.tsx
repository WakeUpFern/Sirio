"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Clapperboard,
  House,
  Inbox,
  Play,
  Search,
  Settings,
} from "lucide-react";
import { Star } from "@/components/ui";
import { useStore } from "@/lib/store";
import { WORKSPACE } from "@/lib/data";

const TABS = [
  { href: "/app", label: "Inicio", Icon: House },
  { href: "/app/contenido", label: "Contenido", Icon: Clapperboard },
  { href: "/app/operar", label: "Operar", Icon: Play },
] as const;

export function Topbar({ forcePath }: { forcePath?: string }) {
  const realPath = usePathname();
  const pathname = forcePath ?? realPath;
  const { busy, run, pendingCount } = useStore();
  const working = busy || run.status === "running";

  const iconBtn =
    "relative grid h-9 w-9 place-items-center rounded-full text-ink-2 transition-colors duration-150 hover:bg-black/5 hover:text-ink";

  return (
    <header className="flex shrink-0 items-center gap-3">
      <Link
        href="/app"
        aria-label="Sirio, ir a Inicio"
        className="glass grid h-14 w-14 shrink-0 place-items-center rounded-full text-ink"
      >
        <Star size={22} working={working} />
      </Link>
      <div className="glass relative flex h-14 min-w-0 flex-1 items-center justify-between rounded-full pl-3 pr-3">
        <button
          type="button"
          aria-label="Cambiar de espacio, FEBAcode"
          className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-2.5 transition-colors duration-150 hover:bg-black/5"
        >
          <span className="grid h-[22px] w-[22px] place-items-center rounded-[6px] bg-ink text-[12px] font-semibold text-white">
            {WORKSPACE.initial}
          </span>
          <span className="text-[13.5px] font-semibold">{WORKSPACE.name}</span>
          <ChevronDown size={14} strokeWidth={1.75} className="text-ink-3" aria-hidden="true" />
        </button>

        <nav
          aria-label="Vistas"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1"
        >
          {TABS.map(({ href, label, Icon }) => {
            const active = href === "/app" ? pathname === "/app" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex h-10 items-center gap-2 rounded-full px-4 text-[13.5px] font-semibold transition-colors duration-150 ${active ? "bg-white text-ink shadow-[0_1px_2px_rgba(11,18,32,0.08)]" : "text-ink-2 hover:bg-white/50 hover:text-ink"}`}
              >
                <Icon size={16} strokeWidth={1.75} fill={active ? "currentColor" : "none"} aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-0.5">
          <button type="button" aria-label="Buscar" className={`${iconBtn} hidden md:grid`}>
            <Search size={16} strokeWidth={1.75} />
          </button>
          <button type="button" aria-label="Bandeja, hay mensajes sin leer" className={`${iconBtn} hidden md:grid`}>
            <Inbox size={16} strokeWidth={1.75} />
            <span className="absolute right-[9px] top-[8px] h-[7px] w-[7px] rounded-full bg-ink ring-2 ring-[#eef2f8]" />
          </button>
          <button type="button" aria-label="Calendario" className={`${iconBtn} hidden md:grid`}>
            <CalendarDays size={16} strokeWidth={1.75} />
          </button>
          <Link
            href="/app"
            aria-label={`Notificaciones, ${pendingCount} aprobaciones pendientes`}
            className={iconBtn}
          >
            <Bell size={16} strokeWidth={1.75} />
            {pendingCount > 0 ? (
              <span className="mono absolute right-[3px] top-[3px] grid h-[16px] min-w-[16px] place-items-center rounded-full bg-ink px-1 text-[10px] font-medium leading-none text-white ring-2 ring-[#eef2f8]">
                {pendingCount}
              </span>
            ) : null}
          </Link>
          <Link
            href="/app/ajustes"
            aria-label="Ajustes"
            aria-current={pathname.startsWith("/app/ajustes") ? "page" : undefined}
            className={`${iconBtn} ${pathname.startsWith("/app/ajustes") ? "bg-white text-ink" : ""}`}
          >
            <Settings size={16} strokeWidth={1.75} />
          </Link>
          <span
            role="img"
            aria-label="Tu perfil, Fernando"
            className="ml-1.5 grid h-9 w-9 place-items-center rounded-full bg-ink text-[13px] font-semibold text-white"
          >
            F
          </span>
        </div>
      </div>
    </header>
  );
}
