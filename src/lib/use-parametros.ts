"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Pestaña, filtro y elemento seleccionado viven en la URL (docs/patrones.md),
 * para que se puedan compartir y sobrevivan a recargar.
 * Quien lo use debe estar dentro de un <Suspense>.
 */
export function useParametros() {
  const params = useSearchParams();
  const router = useRouter();
  const ruta = usePathname();

  const fijar = useCallback(
    (cambios: Record<string, string | null>) => {
      const p = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(cambios)) {
        if (v === null) p.delete(k);
        else p.set(k, v);
      }
      const q = p.toString();
      router.replace(q ? `${ruta}?${q}` : ruta, { scroll: false });
    },
    [params, router, ruta],
  );

  return { params, fijar };
}

/** Lee un parámetro que solo admite ciertos valores. */
export function elegir<T extends string>(valor: string | null, validos: readonly T[], porOmision: T): T {
  return validos.includes(valor as T) ? (valor as T) : porOmision;
}
