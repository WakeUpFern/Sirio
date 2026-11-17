# Sirio

Sirio es el operador de marketing de un negocio: conoce el negocio, acuerda un objetivo a 90 días con su dueño y trabaja hacia él, pidiendo aprobación en todo lo que sale al público. La primera versión es interna, para FEBAcode.

Este repositorio contiene la **maqueta web**: una portada pública (`/`) y la app (`/app`) con las vistas Hoy, Objetivo, Contenido, Actividad, Negocio y Ajustes, más el panel de Sirio a la derecha. No hay backend, cuentas ni IA real. Todo son datos de ejemplo escritos en el código (`src/lib/data.ts`, `src/lib/data-actividad.ts` y `src/lib/data-hilos.ts`) y el estado vive en el cliente (`src/lib/store.tsx` y `src/lib/estado`), así que se reinicia al recargar.

La interfaz sigue el sistema de diseño FEBAcode ([`docs/sistema-diseno.md`](docs/sistema-diseno.md)) y la estructura de [`docs/estructura-app.md`](docs/estructura-app.md).

## Hacia la versión interna

El siguiente paso es convertir la maqueta en una versión interna que el equipo de FEBAcode use de verdad. Estos documentos lo definen:

| Documento | Qué contiene |
| --- | --- |
| [`docs/producto.md`](docs/producto.md) | Qué se construye, los flujos, lo que queda fuera y los hitos |
| [`docs/arquitectura.md`](docs/arquitectura.md) | Piezas, modelo de datos y reglas de seguridad |
| [`docs/stack.md`](docs/stack.md) | Proveedores y librerías de cada capa |
| [`docs/patrones.md`](docs/patrones.md) | Capas y patrones de backend y frontend |
| [`docs/sistema-diseno.md`](docs/sistema-diseno.md) | Sistema de diseño FEBAcode y su aplicación en Sirio |
| [`docs/estructura-app.md`](docs/estructura-app.md) | Pantallas, navegación y contenido de cada vista |
| [`docs/decisiones.md`](docs/decisiones.md) | Decisiones tomadas y su porqué |
| [`docs/equipo.md`](docs/equipo.md) | Roles, ritmo semanal y cuándo está terminado un issue |
| [`docs/backlog.md`](docs/backlog.md) | Issues de los dos primeros hitos |
| [`AGENTS.md`](AGENTS.md) | Reglas para agentes y personas que escriben código aquí |

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
| `/app` | Hoy: lo que Sirio necesita de ti, lo que hizo desde tu última visita, los pasos de la semana y los resultados |
| `/app/objetivo` | El objetivo a 90 días, sus semanas, los pasos de esta semana y la propuesta para la siguiente |
| `/app/contenido` | Piezas por aprobar, aprobadas, en guion y descartadas, con vista previa y guion |
| `/app/actividad` | Bitácora de Sirio por día y tabla de trabajo programado |
| `/app/negocio` | Ficha del negocio editable y memoria de Sirio |
| `/app/ajustes` | Equipo, modelos y llaves, autonomía, notificaciones e integraciones |
| `/app/operar` | Redirige a `/app/actividad` (la vista Operar ya no existe) |

## Desplegar en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel elige **Add New… > Project** e importa el repositorio.
3. Vercel detecta Next.js. No hay variables de entorno ni configuración extra: pulsa **Deploy**.

## Notas técnicas

- Next.js (App Router), React, TypeScript y Tailwind CSS v4. Las variables del sistema de diseño están en `src/app/globals.css` y se exponen a Tailwind con `@theme`; la paleta y los radios por omisión de Tailwind están desactivados.
- Fuentes Manrope y DM Mono instaladas como paquetes de `@fontsource`, así que el build no descarga nada.
- Primitivos en `src/components/ui`, componentes de dominio en `src/components/<dominio>` y vistas en `src/components/views`.
- Pestaña, filtro y elemento seleccionado viven en la URL.
- Iconos con `lucide-react`. Lo demás (barras de avance, marco de teléfono, ventana de la portada) está dibujado con CSS, sin librerías.
