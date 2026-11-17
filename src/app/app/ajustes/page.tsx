import type { Metadata } from "next";
import { Suspense } from "react";
import { VistaCargando } from "@/components/marco/vista";
import { VistaAjustes } from "@/components/views/vista-ajustes";

export const metadata: Metadata = { title: "Ajustes · Sirio" };

export default function Page() {
  return (
    <Suspense fallback={<VistaCargando titulo="Ajustes" />}>
      <VistaAjustes />
    </Suspense>
  );
}
