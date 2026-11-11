# Sirio

Sirio es un producto interno de FEBAcode: una interfaz web donde un agente de IA actúa como director de marketing (CMO) con su propio equipo de agentes. Propone ideas y guiones, edita video, publica en redes, promociona, busca colaboraciones y responde a clientes. El equipo humano ve todo lo que hace y aprueba lo que sale al público.

Este repositorio contiene la **primera maqueta web**: una portada pública (`/`) y la app (`/app`) con las vistas Inicio, Contenido, Operar y Ajustes. No hay backend, cuentas ni IA real. Todo son datos de ejemplo escritos en el código (`src/lib/data.ts`) y el estado vive en el cliente, así que se reinicia al recargar.

La dirección de diseño está en [`docs/direccion-mockup.md`](docs/direccion-mockup.md).

## Correr la maqueta

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build    # compilación de producción
npm run start    # sirve la compilación
npm run lint     # ESLint
```

## Rutas

| Ruta | Qué es |
| --- | --- |
| `/` | Portada pública |
| `/app` | Inicio: estado de Sirio, pendientes, pasos, alcance y resultados |
| `/app/contenido` | Biblioteca de publicaciones con vista previa en teléfono |
| `/app/operar` | Taller de Sirio: actividad en vivo y equipo de agentes |
| `/app/ajustes` | Integraciones, modelos y llaves, autonomía |

## Desplegar en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel elige **Add New… > Project** e importa el repositorio.
3. Vercel detecta Next.js. No hay variables de entorno ni configuración extra: pulsa **Deploy**.

## Notas técnicas

- Next.js (App Router), TypeScript y Tailwind CSS v4. Las fuentes (Hanken Grotesk y Geist Mono) vienen de `@fontsource-variable`, así que el build no descarga nada.
- Iconos con `lucide-react`; logotipos de apps con `react-icons`.
- El estado del chat, las aprobaciones y la ejecución de Operar se comparte entre vistas con un contexto en `src/lib/store.tsx`.
- La gráfica y el lienzo de Operar están dibujados con SVG y CSS, sin librerías.
