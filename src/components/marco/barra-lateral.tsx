"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentType } from "react";
import { Activity, Building2, Clapperboard, Settings, SquarePen, Sun, Target } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { Contador } from "@/components/ui/etiqueta";
import { Estrella } from "@/components/ui/estrella";
import { PERSONA } from "@/lib/data";
import { useMaqueta } from "@/lib/store";
import { SelectorEspacio } from "./selector-espacio";

type Icono = ComponentType<{ size?: number; strokeWidth?: number; "aria-hidden"?: boolean }>;

const SECCIONES: { href: string; nombre: string; Icono: Icono; contador?: "hoy" | "contenido" }[] = [
  { href: "/app", nombre: "Hoy", Icono: Sun, contador: "hoy" },
  { href: "/app/objetivo", nombre: "Objetivo", Icono: Target },
  { href: "/app/contenido", nombre: "Contenido", Icono: Clapperboard, contador: "contenido" },
  { href: "/app/actividad", nombre: "Actividad", Icono: Activity },
  { href: "/app/negocio", nombre: "Negocio", Icono: Building2 },
];

const HILOS_VISIBLES = 6;

function ItemSeccion({
  href,
  nombre,
  Icono,
  activo,
  contador,
}: {
  href: string;
  nombre: string;
  Icono: Icono;
  activo: boolean;
  contador?: number;
}) {
  return (
    <Link
      href={href}
      aria-current={activo ? "page" : undefined}
      title={nombre}
      className={`relative flex h-9 items-center gap-3 rounded-boton px-3 text-[13.5px] font-bold transicion max-lg:justify-center max-lg:px-0 ${
        activo ? "bg-acento-suave text-tinta" : "text-tinta-2 hover:bg-superficie-2 hover:text-tinta"
      }`}
    >
      {activo ? <span className="absolute inset-y-2 left-0 w-[3px] bg-acento" aria-hidden="true" /> : null}
      <Icono size={17} strokeWidth={1.75} aria-hidden />
      <span className="flex-1 max-lg:sr-only">{nombre}</span>
      {contador ? (
        <span className="max-lg:absolute max-lg:-right-1 max-lg:-top-1">
          <Contador valor={contador} tono="fuerte" etiqueta={`${contador} por decidir`} />
        </span>
      ) : null}
    </Link>
  );
}

/** En Ajustes no hay panel de Sirio: abrir un hilo lleva a Hoy y lo abre ahí. */
function useConPanel() {
  const ruta = usePathname();
  const router = useRouter();
  const sinPanel = ruta.startsWith("/app/ajustes");
  return {
    sinPanel,
    conPanel: (accion: () => void) => () => {
      accion();
      if (sinPanel) router.push("/app");
    },
  };
}

function ListaHilos() {
  const { hilos, hiloId, panelVisible, hilosTrabajando, abrirHilo, verTodosLosHilos } = useMaqueta();
  const { sinPanel, conPanel } = useConPanel();
  return (
    <div className="mt-6 max-lg:hidden">
      <p className="etiqueta-grupo px-3">Hilos</p>
      <ul className="mt-2 space-y-0.5">
        {hilos.slice(0, HILOS_VISIBLES).map((h) => {
          const abierto = panelVisible && !sinPanel && h.id === hiloId;
          const trabajando = hilosTrabajando.has(h.id);
          return (
            <li key={h.id}>
              <button
                type="button"
                onClick={conPanel(() => abrirHilo(h.id))}
                aria-current={abierto ? "true" : undefined}
                className={`flex h-8 w-full items-center gap-2 rounded-boton px-3 text-left text-[13px] transicion ${
                  abierto ? "bg-superficie-2 font-bold text-tinta" : "text-tinta-2 hover:bg-superficie-2 hover:text-tinta"
                }`}
              >
                <span className="min-w-0 flex-1 truncate">{h.titulo}</span>
                {trabajando ? (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-acento" role="img" aria-label="Sirio trabaja aquí" />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-1 px-1">
        <Boton variante="texto" onClick={conPanel(verTodosLosHilos)}>
          Ver todos
        </Boton>
      </div>
    </div>
  );
}

/** Barra lateral: marca, espacio, nuevo hilo, secciones, hilos y pie. */
export function BarraLateral() {
  const ruta = usePathname();
  const { cola, porAprobar, nuevoHilo: crearHilo } = useMaqueta();
  const nuevoHilo = useConPanel().conPanel(crearHilo);
  const contadores = { hoy: cola.length, contenido: porAprobar };
  const activa = (href: string) => (href === "/app" ? ruta === "/app" : ruta.startsWith(href));

  return (
    <aside className="flex h-full w-(--ancho-barra) shrink-0 flex-col border-r border-linea bg-superficie max-lg:w-(--ancho-barra-iconos)">
      <div className="px-3 pt-4">
        <Link
          href="/"
          className="flex h-9 items-center gap-2 rounded-boton px-3 max-lg:justify-center max-lg:px-0"
          aria-label="Sirio, ir a la portada"
        >
          <Estrella tamano={20} />
          <span className="text-[17px] font-extrabold tracking-[-0.02em] max-lg:sr-only">Sirio</span>
        </Link>
        <SelectorEspacio />
        <div className="mt-3 max-lg:hidden">
          <Boton
            variante="contorno"
            ancho="completo"
            icono={<SquarePen size={15} strokeWidth={1.75} aria-hidden="true" />}
            onClick={nuevoHilo}
          >
            Nuevo hilo
          </Boton>
        </div>
        <div className="mt-3 flex justify-center lg:hidden">
          <Boton
            variante="contorno"
            soloIcono
            etiqueta="Nuevo hilo"
            icono={<SquarePen size={15} strokeWidth={1.75} aria-hidden="true" />}
            onClick={nuevoHilo}
          />
        </div>
      </div>

      <nav aria-label="Secciones" className="barra-fina min-h-0 flex-1 overflow-y-auto px-3 pt-5">
        <ul className="space-y-0.5">
          {SECCIONES.map((s) => (
            <li key={s.href}>
              <ItemSeccion
                href={s.href}
                nombre={s.nombre}
                Icono={s.Icono}
                activo={activa(s.href)}
                contador={s.contador ? contadores[s.contador] : undefined}
              />
            </li>
          ))}
        </ul>
        <ListaHilos />
      </nav>

      <div className="border-t border-linea px-3 py-3">
        <ItemSeccion href="/app/ajustes" nombre="Ajustes" Icono={Settings} activo={activa("/app/ajustes")} />
        <div className="mt-2 flex items-center gap-2.5 px-2 max-lg:justify-center max-lg:px-0">
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-chip bg-superficie-2 text-[11.5px] font-extrabold text-tinta-2"
            aria-hidden="true"
          >
            {PERSONA.iniciales}
          </span>
          <span className="min-w-0 leading-tight max-lg:sr-only">
            <span className="block truncate text-[13px] font-bold">{PERSONA.nombre}</span>
            <span className="block text-[12px] text-tinta-3">{PERSONA.rol}</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
