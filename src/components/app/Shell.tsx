"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Check, ShieldCheck } from "lucide-react";
import { AppTile } from "@/components/ui";
import { StoreProvider, useStore } from "@/lib/store";
import { appById } from "@/lib/data";
import { Topbar } from "./Topbar";
import { ChatPanel, ChatRail } from "./ChatPanel";

function ConnectDialog() {
  const { dialogApp, closeDialog, connectApp, disconnectApp, connected } = useStore();
  const primary = useRef<HTMLButtonElement>(null);
  const app = dialogApp ? appById(dialogApp) : null;

  useEffect(() => {
    if (!app) return;
    primary.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDialog();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [app, closeDialog]);

  if (!app) return null;
  const isOn = connected[app.id];
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <button
        type="button"
        aria-label="Cerrar diálogo"
        onClick={closeDialog}
        className="absolute inset-0 cursor-default bg-ink/30"
        tabIndex={-1}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-title"
        className="fade-in relative w-full max-w-[460px] rounded-[20px] border border-line bg-white p-6 shadow-[var(--shadow-float)]"
      >
        <div className="flex items-center gap-3.5">
          <AppTile id={app.id} size={48} />
          <div>
            <h2 id="connect-title" className="text-[17px] font-semibold leading-tight">
              {isOn ? `${app.name} está conectado` : `Conectar ${app.name}`}
            </h2>
            <p className="text-[12.5px] text-ink-2">{app.cat}</p>
          </div>
        </div>
        <p className="mt-4 text-[13px] text-ink-2">{app.blurb}</p>
        <p className="label-caps mt-5">Sirio podrá</p>
        <ul className="mt-2 space-y-2">
          {app.perms.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-[13px]">
              <Check size={15} strokeWidth={2} className="mt-px shrink-0 text-ok" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-4 flex items-start gap-2 rounded-[10px] bg-[#f4f6fa] px-3 py-2.5 text-[12px] text-ink-2">
          <ShieldCheck size={15} strokeWidth={1.6} className="mt-px shrink-0" aria-hidden="true" />
          Lo que Sirio publique o envíe sigue tus reglas de Autonomía. Puedes desconectar la app cuando quieras.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          {isOn ? (
            <>
              <button type="button" onClick={() => disconnectApp(app.id)} className="btn btn-soft h-10 px-5 text-[13px] text-bad">
                Desconectar
              </button>
              <button ref={primary} type="button" onClick={closeDialog} className="btn btn-ink h-10 px-5 text-[13px]">
                Listo
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={closeDialog} className="btn btn-soft h-10 px-5 text-[13px]">
                Cancelar
              </button>
              <button ref={primary} type="button" onClick={() => connectApp(app.id)} className="btn btn-ink h-10 px-5 text-[13px]">
                Conectar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Toasts() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div
      key={toast.id}
      role="status"
      className="fade-in fixed bottom-5 left-1/2 z-40 flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-2.5 rounded-[14px] border border-line bg-white px-4 py-3 text-[13px] shadow-[var(--shadow-float)]"
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-ok text-white">
        <Check size={12} strokeWidth={2.75} aria-hidden="true" />
      </span>
      {toast.text}
    </div>
  );
}

function Frame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { chatOpen } = useStore();
  const hideChat = pathname.startsWith("/app/ajustes");
  return (
    <div className="sky flex h-dvh flex-col gap-3 overflow-hidden p-3">
      <Topbar />
      <div className="flex min-h-0 flex-1 gap-3">
        {hideChat ? null : chatOpen ? <ChatPanel /> : <ChatRail />}
        <main className="scroll-thin relative min-h-0 min-w-0 flex-1 overflow-y-auto rounded-[20px]">
          {children}
        </main>
      </div>
      <Toasts />
      <ConnectDialog />
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <Frame>{children}</Frame>
    </StoreProvider>
  );
}
