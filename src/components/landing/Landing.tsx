"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
import { AppTile, Star } from "@/components/ui";
import { StoreProvider } from "@/lib/store";
import { Topbar } from "@/components/app/Topbar";
import { ChatPanel } from "@/components/app/ChatPanel";
import { HomeView } from "@/components/views/HomeView";
import { MiniApproval, MiniApps, MiniEdit, MiniIdeas, MiniMeet, MiniReply, MiniRules } from "./MiniCards";

const maxW = "mx-auto w-full max-w-[1180px] px-4 sm:px-6";

/* ------------------------------------------------------------ Navegación */

function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Sirio, inicio">
            <Star size={22} className="text-ink" />
            <span className="text-[19px] font-semibold tracking-tight">Sirio</span>
          </Link>
          <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
            {[
              ["Producto", "#producto"],
              ["Cómo trabaja", "#como-trabaja"],
              ["Integraciones", "#integraciones"],
            ].map(([t, h]) => (
              <a
                key={h}
                href={h}
                className="rounded-full px-3.5 py-2 text-[15px] font-medium text-ink transition-colors duration-150 hover:bg-black/[0.06]"
              >
                {t}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/app"
            className="hidden rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors duration-150 hover:bg-black/[0.06] sm:block"
          >
            Iniciar sesión
          </Link>
          <Link href="/app" className="btn btn-ink h-10 px-5 text-[15px]">
            Abrir la demo
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ Hero */

const PROMPTS = [
  "Pídele a Sirio un sketch para TikTok",
  "Pídele a Sirio tres ganchos para el lunes",
  "Pídele a Sirio que busque cuentas para colaborar",
  "Pídele a Sirio que responda los comentarios de hoy",
];

function Hero() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % PROMPTS.length), 3600);
    return () => clearInterval(id);
  }, []);

  function go(e?: FormEvent) {
    e?.preventDefault();
    router.push("/app");
  }

  return (
    <section className="sky relative flex min-h-[max(100svh,780px)] flex-col items-center justify-center px-4 pb-16 pt-[100px] text-center">
      <Star size={56} className="text-ink" />
      <h1 className="mt-7 max-w-[900px] text-[40px] font-medium leading-[1.05] tracking-[-0.025em] sm:text-[56px] md:text-[68px]">
        Un director de marketing
        <br className="hidden sm:block" /> que trabaja por su cuenta.
      </h1>
      <p className="mt-5 max-w-[760px] text-[17px] text-ink-2 sm:text-[21px]">
        Conoce a Sirio, el CMO de IA de FEBAcode. Propone, graba contigo, publica y responde.
      </p>
      <form
        onSubmit={go}
        className="relative mt-10 h-[150px] w-full max-w-[900px] rounded-[28px] border border-white/80 bg-white/80 text-left shadow-[0_1px_2px_rgba(11,18,32,0.04),0_18px_50px_rgba(11,18,32,0.08)] backdrop-blur-sm"
      >
        <label htmlFor="hero-input" className="sr-only">
          Qué le pides a Sirio
        </label>
        <textarea
          id="hero-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) go(e);
          }}
          className="absolute inset-x-0 top-0 h-[96px] w-full resize-none rounded-t-[28px] bg-transparent px-6 pt-6 text-[17px] outline-none sm:text-[20px]"
        />
        {text ? null : (
          <span
            key={i}
            aria-hidden="true"
            className="swap-in pointer-events-none absolute left-6 top-6 text-[17px] text-ink-3 sm:text-[20px]"
          >
            {PROMPTS[i]}
          </span>
        )}
        <button
          type="submit"
          aria-label="Enviar a Sirio"
          className="btn btn-ink absolute bottom-4 right-4 h-10 w-10"
        >
          <ArrowUp size={18} strokeWidth={2} />
        </button>
      </form>
    </section>
  );
}

/* --------------------------------------------------------- Vista producto */

function PreviewApp() {
  return (
    <div className="sky flex h-[860px] w-[1280px] flex-col gap-3 overflow-hidden p-3 text-left">
      <Topbar forcePath="/app" />
      <div className="flex min-h-0 flex-1 gap-3">
        <ChatPanel forceShow />
        <main className="relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-[20px]">
          <HomeView />
        </main>
      </div>
    </div>
  );
}

function ScaledPreview() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.8);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / 1280)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className="relative w-full overflow-hidden" style={{ height: 860 * scale }}>
      <div
        className="pointer-events-none absolute left-0 top-0 origin-top-left select-none"
        style={{ transform: `scale(${scale})` }}
        aria-hidden="true"
        inert
      >
        <StoreProvider>
          <PreviewApp />
        </StoreProvider>
      </div>
    </div>
  );
}

function ProductView() {
  return (
    <section id="producto" className="dots relative bg-page px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <h2 className="text-[30px] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[38px]">
            Todo lo que Sirio hace, en un solo lugar.
          </h2>
          <p className="mt-4 text-[16px] text-ink-2 sm:text-[18px]">
            Ves en qué trabaja, qué espera tu aprobación y cómo le va a tu cuenta. Sin abrir diez pestañas.
          </p>
        </div>
        <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_1px_2px_rgba(11,18,32,0.04),0_24px_70px_rgba(11,18,32,0.10)]">
          <div className="flex h-[38px] items-center gap-2 border-b border-line bg-white px-4" aria-hidden="true">
            <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
            <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
            <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
          </div>
          <ScaledPreview />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Pasos */

const STEPS: { title: string; line: string; tone: string; card: ReactNode }[] = [
  { title: "Conoce a Sirio", line: "Un director de marketing que ya sabe cómo suena FEBAcode.", tone: "var(--lilac)", card: <MiniMeet /> },
  { title: "Propone ideas y guiones", line: "Ganchos, escenas y una fecha de grabación que le queda al equipo.", tone: "var(--mint)", card: <MiniIdeas /> },
  { title: "Edita lo que graban", line: "Corta las tomas, arma el video y deja el texto de la publicación.", tone: "var(--peach)", card: <MiniEdit /> },
  { title: "Publica cuando apruebas", line: "Nada sale sin tu OK. Tú decides cuándo y dónde.", tone: "var(--lilac)", card: <MiniApproval /> },
  { title: "Responde y busca colaboraciones", line: "Contesta comentarios y escribe a cuentas afines. Tú ves cada borrador.", tone: "var(--mint)", card: <MiniReply /> },
];

function Steps() {
  const [active, setActive] = useState(0);
  return (
    <section id="como-trabaja" className="dots bg-page px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1180px]">
        <h2 className="max-w-[560px] text-[34px] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
          De la idea a la publicación.
        </h2>
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-14">
          <ol className="order-2 lg:order-1">
            {STEPS.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={on ? "step" : undefined}
                    className="group block w-full rounded-lg py-4 text-left"
                  >
                    <span className={`block text-[22px] font-medium tracking-[-0.01em] transition-colors duration-200 sm:text-[26px] ${on ? "text-ink" : "text-ink-3 group-hover:text-ink-2"}`}>
                      {s.title}
                    </span>
                    {on ? <span className="swap-in mt-1 block text-[15px] text-ink-2">{s.line}</span> : null}
                    <span className="relative mt-3 block h-[2px] w-full rounded-full bg-black/10">
                      {on ? (
                        <span
                          key={active}
                          className="step-fill absolute inset-y-0 left-0 rounded-full bg-ink"
                          onAnimationEnd={() => setActive((a) => (a + 1) % STEPS.length)}
                        />
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div
            className="order-1 flex min-h-[420px] items-center justify-center rounded-[24px] p-6 transition-colors duration-500 sm:min-h-[520px] sm:p-10 lg:order-2"
            style={{ background: STEPS[active].tone }}
          >
            <div key={active} className="swap-in flex w-full justify-center">
              {STEPS[active].card}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Funciones */

function Feature({
  title,
  text,
  tone,
  flip,
  children,
}: {
  title: string;
  text: string;
  tone: string;
  flip?: boolean;
  children: ReactNode;
}) {
  return (
    <article className="grid gap-2 rounded-[28px] bg-white p-2.5 md:grid-cols-2">
      <div
        className={`flex min-h-[380px] items-center justify-center rounded-[20px] p-6 sm:p-10 ${flip ? "md:order-2" : ""}`}
        style={{ background: tone }}
      >
        {children}
      </div>
      <div className="flex flex-col justify-center px-6 py-8 sm:px-12">
        <h3 className="text-[26px] font-medium leading-[1.12] tracking-[-0.015em] sm:text-[30px]">{title}</h3>
        <p className="mt-4 max-w-[420px] text-[16px] leading-relaxed text-ink-2">{text}</p>
      </div>
    </article>
  );
}

function Features() {
  return (
    <section className="bg-page px-4 pb-24 sm:px-6">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3.5">
        <Feature
          title="Publicaciones listas para tu aprobación"
          text="Sirio prepara el video, el texto y la hora. Tú ves cómo se verá en TikTok o en Instagram y decides: aprobar, editar o rechazar."
          tone="var(--mint)"
        >
          <MiniApproval />
        </Feature>
        <Feature
          title="Tus cuentas, tus reglas"
          text="Elige qué puede hacer Sirio en cada canal. Que pregunte primero o que actúe por su cuenta, con un tope de gasto mensual que tú defines."
          tone="var(--peach)"
          flip
        >
          <MiniRules />
        </Feature>
        <Feature
          title="Trabaja con las apps que ya usan"
          text="TikTok, Instagram, Gmail, WhatsApp, Drive y más. Conectas una app en un clic y ves exactamente qué permisos le das."
          tone="var(--lilac)"
        >
          <MiniApps />
        </Feature>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Integraciones */

const LOGO_GROUPS: { label: string; apps: [string, string][] }[] = [
  { label: "Redes", apps: [["tiktok", "TikTok"], ["instagram", "Instagram"], ["facebook", "Facebook"], ["x", "X"], ["linkedin", "LinkedIn"], ["youtube", "YouTube"]] },
  { label: "Mensajes", apps: [["whatsapp", "WhatsApp"], ["gmail", "Gmail"]] },
  { label: "Trabajo", apps: [["drive", "Google Drive"], ["notion", "Notion"], ["slack", "Slack"]] },
  { label: "Pagos y anuncios", apps: [["stripe", "Stripe"], ["metaads", "Meta Ads"], ["googleads", "Google Ads"]] },
];

function Integrations() {
  return (
    <section id="integraciones" className="bg-page px-4 pb-24 sm:px-6">
      <div className="mx-auto max-w-[1180px] rounded-[28px] bg-ink px-6 py-14 text-white sm:rounded-[32px] sm:px-14 sm:py-20">
        <h2 className="max-w-[640px] text-[32px] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[44px]">
          Todo lo que un equipo de marketing usa, conectado.
        </h2>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.55fr_0.8fr_1fr_1fr]">
          {LOGO_GROUPS.map((g) => (
            <div key={g.label}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a3adc0]">{g.label}</p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-4">
                {g.apps.map(([id, name]) => (
                  <li key={id} className="flex w-[64px] flex-col items-center gap-2">
                    <AppTile id={id} size={56} label={name} />
                    <span className="text-center text-[12px] leading-tight text-[#c7cedb]">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Cierre */

function Closing() {
  return (
    <section className="dots bg-page px-4 pb-14 pt-10 text-center sm:px-6">
      <Star size={36} className="mx-auto text-ink" />
      <h2 className="mx-auto mt-6 max-w-[720px] text-[34px] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[48px]">
        Tú pones la cámara. Sirio hace el resto.
      </h2>
      <Link href="/app" className="btn btn-ink mt-8 h-12 gap-2 px-7 text-[16px]">
        Abrir la demo <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
      </Link>
      <footer className={`${maxW} mt-24 flex items-center justify-between border-t border-line pt-6 text-[13px] text-ink-2`}>
        <span className="flex items-center gap-2">
          <Star size={14} className="text-ink" /> Sirio, un proyecto de FEBAcode
        </span>
        <span className="mono hidden text-ink-3 sm:block">Maqueta · noviembre de 2026</span>
      </footer>
    </section>
  );
}

export function Landing() {
  return (
    <div>
      <Nav />
      <main>
        <Hero />
        <ProductView />
        <Steps />
        <Features />
        <Integrations />
        <Closing />
      </main>
    </div>
  );
}
