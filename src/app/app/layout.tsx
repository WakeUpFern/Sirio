import type { Metadata } from "next";
import { Shell } from "@/components/app/Shell";

export const metadata: Metadata = { title: "Sirio · FEBAcode" };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
