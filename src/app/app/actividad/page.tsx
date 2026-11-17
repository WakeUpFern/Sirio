import type { Metadata } from "next";
import { Suspense } from "react";
import { VistaCargando } from "@/components/marco/vista";
import { VistaActividad } from "@/components/views/vista-actividad";

export const metadata: Metadata = { title: "Actividad · Sirio" };

export default function Page() {
  return (
    <Suspense fallback={<VistaCargando titulo="Actividad" />}>
      <VistaActividad />
    </Suspense>
  );
}
