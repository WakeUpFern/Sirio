import type { Metadata } from "next";
import { MarcoApp } from "@/components/marco/marco-app";

export const metadata: Metadata = { title: "Sirio · FEBAcode" };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <MarcoApp>{children}</MarcoApp>;
}
