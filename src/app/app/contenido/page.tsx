import type { Metadata } from "next";
import { Suspense } from "react";
import { VistaCargando } from "@/components/marco/vista";
import { VistaContenido } from "@/components/views/vista-contenido";

export const metadata: Metadata = { title: "Contenido · Sirio" };

export default function Page() {
  return (
    <Suspense fallback={<VistaCargando titulo="Contenido" />}>
      <VistaContenido />
    </Suspense>
  );
}
