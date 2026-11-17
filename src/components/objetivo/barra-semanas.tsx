/**
 * Avance por semanas: las pasadas rellenas en tinta, la actual en acento
 * y las que faltan en línea.
 */
export function BarraSemanas({
  actual,
  total,
  variante = "compacta",
}: {
  actual: number;
  total: number;
  variante?: "compacta" | "completa";
}) {
  const semanas = Array.from({ length: total }, (_, i) => i + 1);
  const color = (n: number) => (n < actual ? "bg-tinta" : n === actual ? "bg-acento" : "bg-linea");

  if (variante === "compacta") {
    return (
      <span className="flex h-2 w-full gap-[3px]" role="img" aria-label={`Semana ${actual} de ${total}`}>
        {semanas.map((n) => (
          <span key={n} className={`h-full flex-1 ${color(n)}`} />
        ))}
      </span>
    );
  }

  return (
    <ol className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }} aria-label="Semanas del objetivo">
      {semanas.map((n) => (
        <li key={n} aria-current={n === actual ? "step" : undefined}>
          <span className={`block h-3 ${color(n)}`} aria-hidden="true" />
          <span className={`mono mt-1.5 block text-center text-[11px] ${n === actual ? "font-medium text-acento-texto" : "text-tinta-3"}`}>
            <span className="sr-only">
              Semana {n}
              {n < actual ? ", terminada" : n === actual ? ", en curso" : ""}
            </span>
            <span aria-hidden="true">S{n}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
