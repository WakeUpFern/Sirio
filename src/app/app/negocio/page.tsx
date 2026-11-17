import type { Metadata } from "next";
import { Suspense } from "react";
import { VistaCargando } from "@/components/marco/vista";
import { VistaNegocio } from "@/components/views/vista-negocio";

export const metadata: Metadata = { title: "Negocio · Sirio" };

export default function Page() {
  return (
    <Suspense fallback={<VistaCargando titulo="Negocio" />}>
      <VistaNegocio />
    </Suspense>
  );
}
