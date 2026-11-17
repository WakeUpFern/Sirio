import { redirect } from "next/navigation";

// La vista Operar se sustituyó por Actividad (docs/estructura-app.md).
export default function Page() {
  redirect("/app/actividad");
}
