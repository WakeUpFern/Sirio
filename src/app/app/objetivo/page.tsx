import type { Metadata } from "next";
import { VistaObjetivo } from "@/components/views/vista-objetivo";

export const metadata: Metadata = { title: "Objetivo · Sirio" };

export default function Page() {
  return <VistaObjetivo />;
}
