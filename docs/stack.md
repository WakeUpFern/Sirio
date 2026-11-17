# Sirio: stack de la versión interna

Qué proveedor y qué librería se usa para cada cosa, y por qué. El criterio fue el mismo en todo: pocas piezas, que un equipo de cuatro pueda operar sin un servidor propio y que no haya que cambiarlas al pasar de un negocio a varios.

## Resumen

| Capa | Elección | Por qué |
| --- | --- | --- |
| Aplicación | Next.js con App Router, React y TypeScript | Ya es la base de la maqueta |
| Estilos | Tailwind CSS v4 con las variables de [`sistema-diseno.md`](sistema-diseno.md) | Ya está en la maqueta |
| Alojamiento | Vercel | Despliegue por PR sin configuración; ya está conectado al repo |
| Agente | Vercel AI SDK | Decisión D2 |
| Modelos | Claude, con el proveedor oficial del AI SDK | Un solo proveedor al inicio; el SDK permite agregar otros sin reescribir |
| Base de datos | Postgres en Neon | Postgres administrado que se apaga cuando no se usa y crea una copia de la base por cada PR |
| Acceso a datos | Drizzle ORM y sus migraciones | Esquema en TypeScript, SQL visible y migraciones versionadas en el repo |
| Cuentas | Better Auth con inicio de sesión de Google | Las sesiones y usuarios viven en nuestra propia base; Neon lo ofrece administrado |
| Validación | Zod | Un mismo esquema valida formularios, rutas y la salida del modelo |
| Trabajo programado | Vercel Cron y una tabla de trabajos en Postgres | Sin infraestructura extra |
| Archivos | Vercel Blob, cuando haga falta | No se necesita hasta que haya video o imágenes |
| Pruebas | Vitest para unidades y Playwright para flujos completos | Rápidas y estándar en proyectos Next.js |
| Integración continua | GitHub Actions | Ya incluido con el repo |
| Registro y errores | Registros de Vercel y una tabla `llamadas` con el consumo de tokens | Suficiente para cuatro usuarios |

## Modelos dentro del producto

Qué modelo usa Sirio para cada tipo de trabajo. Los identificadores viven en configuración, nunca en el código, y se ajustan con el uso real.

| Trabajo de Sirio | Modelo propuesto |
| --- | --- |
| Conversar, redactar ideas y guiones | Claude Sonnet |
| Proponer el plan del objetivo y los pasos semanales | Claude Opus |
| Resumir hilos, extraer la ficha de una página, proponer notas de memoria | Claude Haiku |

Esto es distinto de los agentes que construyen Sirio, que usan Opus con esfuerzo variable (decisión D9).

## Lo que no se usa todavía

| Pieza | Cuándo entra |
| --- | --- |
| Servidor o trabajador propio | Cuando un trabajo no quepa en una función, por ejemplo edición de video |
| Cola de mensajes dedicada | Cuando la tabla de trabajos no alcance |
| Búsqueda por significado en la memoria | Cuando las notas sean tantas que no quepan en el contexto. Postgres lo soporta sin cambiar de proveedor |
| Correo transaccional, WhatsApp, redes sociales | Después de la versión interna |
| Herramienta de monitoreo de errores | Cuando haya usuarios fuera del equipo |

## Costo esperado

Para cuatro personas, el gasto fijo es el plan de Vercel y poco más. Neon tiene un nivel gratuito que alcanza para la versión interna. El gasto variable son los modelos, y depende del uso: por eso cada llamada registra sus tokens desde el primer día.

No se dan cifras aquí porque los planes cambian; se confirman en el issue M0-2.

## Variables de entorno

Se documentan en un archivo de ejemplo sin valores. Las de la versión interna son: la conexión a la base de datos, la llave del proveedor de modelos, las credenciales de Google para el inicio de sesión, el secreto de sesiones, la lista de correos permitidos y el secreto que protege el endpoint del programador.

## Por confirmar en M0-2

- Que el plan de Vercel elegido permite uso comercial y la frecuencia de Cron que necesitan las tareas programadas.
- Duración máxima de una función en ese plan, que limita cuánto puede trabajar Sirio en un solo turno.
- Versión actual de Vercel AI SDK, su licencia y su soporte de MCP.
- Si conviene Better Auth administrado por Neon o instalado en la app.
