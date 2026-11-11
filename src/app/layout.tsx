import type { Metadata, Viewport } from "next";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/geist-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sirio, el CMO de IA de FEBAcode",
  description:
    "Sirio es un director de marketing de IA con su propio equipo de agentes. Propone, graba contigo, publica y responde. Tú apruebas lo que sale.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
