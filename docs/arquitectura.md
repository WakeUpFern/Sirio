# Sirio: arquitectura

Este documento describe cómo está armado Sirio y por qué. Las decisiones con su razonamiento están en [`decisiones.md`](decisiones.md); aquí va el resultado. Lo que todavía no se confirma en fuente oficial está marcado como **por confirmar** y tiene un issue en [`backlog.md`](backlog.md).

## Vista general

Sirio es una sola aplicación Next.js desplegada en Vercel, con Postgres como única fuente de verdad.

```
Navegador
   |  chat en streaming, panel, aprobaciones
   v
Next.js (App Router) en Vercel
   |-- Interfaz: Inicio, Contenido, Operar, Ajustes, chat
   |-- Rutas de servidor: chat, hilos, ficha, objetivos, aprobaciones
   |-- Agente: bucle de Vercel AI SDK + herramientas de Sirio
   |-- Programador: Vercel Cron despierta un endpoint que toma trabajos pendientes
   v
Postgres  <- espacios, ficha, memoria, objetivos, hilos, acciones, aprobaciones, trabajos
   ^
Proveedores de modelos (Claude por defecto; otros con la misma interfaz)
```

No hay un servidor aparte ni procesos de larga duración en la versión interna. Si más adelante un trabajo no cabe en una función (edición de video, por ejemplo), se agrega un trabajador dedicado sin cambiar el modelo de datos.

## Piezas

| Pieza | Elección | Estado |
| --- | --- | --- |
| Aplicación | Next.js con App Router y TypeScript, la misma base de la maqueta | Decidido |
| Agente | Vercel AI SDK: bucle con herramientas, salida tipada y streaming al chat | Decidido. Soporte de MCP **por confirmar** |
| Modelos | Claude por defecto, intercambiable por configuración; nunca un identificador de modelo escrito en el código | Decidido |
| Base de datos | Postgres administrado, con migraciones versionadas en el repo | Proveedor y ORM **por confirmar** en M0 (propuesta: Neon y Drizzle) |
| Cuentas | Inicio de sesión con Google y lista de correos permitidos | Librería **por confirmar** en M0 |
| Trabajo programado | Tabla de trabajos en Postgres y Vercel Cron como reloj | Decidido para la versión interna |
| Pruebas | Pruebas unitarias, una prueba de punta a punta por flujo y GitHub Actions como filtro de cada PR | Herramientas **por confirmar** en M0 (propuesta: Vitest y Playwright) |

## Modelo de datos

Todas las tablas llevan `espacio_id`, y toda consulta filtra por él. Es la regla que permite pasar de un negocio a varios sin reescribir.

| Tabla | Qué guarda |
| --- | --- |
| `espacios` | Un negocio. En la versión interna solo existe FEBAcode |
| `miembros` | Personas con acceso a un espacio y su rol |
| `fichas` | La ficha del negocio: qué vende, a quién, tono, canales, diferenciadores. Una por espacio, con historial de cambios |
| `memoria` | Notas que Sirio aprendió: preferencias, decisiones, resultados. Cada nota dice de qué hilo salió y se puede editar o borrar |
| `objetivos` | El objetivo a 90 días con fecha y medida de éxito. Uno vigente por espacio |
| `pasos` | Pasos semanales de un objetivo y su estado |
| `hilos` | Conversaciones por tarea, con título, estado (activo, archivado) y resumen |
| `mensajes` | Mensajes de un hilo, incluidos los pasos y las llamadas a herramientas |
| `piezas` | Contenido que Sirio propone: idea, guion, texto de publicación, con estado |
| `aprobaciones` | Qué se pidió aprobar, quién respondió, qué decidió y cuándo |
| `acciones` | Registro de todo lo que Sirio hace. Alimenta Operar e Inicio. Solo se agrega, nunca se edita |
| `tareas_programadas` | Qué corre, con qué horario, y si está pausada |
| `trabajos` | Ejecuciones pendientes y terminadas de las tareas programadas |
| `conexiones` | Cuentas externas conectadas y sus permisos. Vacía en la versión interna |

## Cómo piensa Sirio en cada turno

El chat no es la memoria. Antes de cada respuesta, el servidor arma el contexto en este orden:

1. Identidad e instrucciones de Sirio, fijas y versionadas en el repo.
2. La ficha del negocio.
3. El objetivo vigente y los pasos de la semana.
4. Las notas de memoria relevantes para el tema del hilo.
5. El resumen del hilo, si ya fue compactado, y sus mensajes recientes.

Un hilo nuevo recibe los puntos 1 a 4 y nada de otros hilos. Cuando un hilo supera un tamaño definido, sus mensajes antiguos se sustituyen por un resumen. Al archivar un hilo, Sirio propone notas para `memoria` y una persona las confirma.

## Economía del contexto

El modelo no recuerda nada entre una llamada y otra: cada turno recibe completo todo lo que necesita saber. No es posible enviarle solo lo nuevo. Lo que sí se puede es pagar casi nada por lo que se repite y no cargar lo que no hace falta. Por eso Sirio no construye un control de versiones propio para el contexto; aplica estas seis reglas.

1. **El contexto solo crece por el final.** Los proveedores guardan en caché el inicio de la solicitud si es idéntico byte por byte al de la llamada anterior, y lo cobran a una fracción del precio normal. Cualquier cambio en medio invalida el caché de todo lo que sigue. El orden de armado va de lo más estable a lo más cambiante: instrucciones, herramientas, ficha, objetivo, memoria, hilo.
2. **Nada variable al principio.** Ni la hora, ni identificadores de solicitud, ni listas en orden distinto. Lo que cambia en cada turno va al final.
3. **Los cambios se anuncian, no se reescriben.** Si la ficha cambia a mitad de un hilo, no se sustituye el texto anterior: se agrega al final una nota con la diferencia. Aquí sí sirve la idea de mostrar solo lo que cambió.
4. **Sirio edita con parches.** Para cambiar un guion o un documento, el agente usa una herramienta que sustituye un fragmento, en lugar de volver a escribir el texto completo. La salida es lo más caro y lo más lento, y aquí está el mayor ahorro.
5. **Leer bajo demanda.** Los documentos largos, las piezas anteriores y los hilos viejos no entran al contexto. El agente tiene herramientas para buscarlos y leer la parte que necesita.
6. **Resumir y delegar.** Un hilo largo se compacta en un resumen. Una lectura pesada, como analizar un sitio web, la hace una llamada aparte que devuelve solo su conclusión.

Las versiones sí se guardan, pero en Postgres y para las personas: la ficha y las piezas conservan su historial para ver qué cambió, quién lo cambió y poder volver atrás.

Cada llamada registra cuántos tokens entraron, cuántos se leyeron de caché y cuántos salieron. Si la lectura de caché es cero en turnos seguidos de un mismo hilo, algo está rompiendo la regla 1 y hay que encontrarlo.

Referencia de precios de Claude al 17 de noviembre de 2026: la lectura de caché cuesta entre 5 % y 10 % del precio normal de entrada según el modelo, la escritura cuesta 25 % más, y el caché dura cinco minutos renovables con cada uso, o una hora si se paga el doble al escribir. Otros proveedores tienen mecanismos parecidos con otras cifras.

## Herramientas y niveles de efecto

Cada herramienta que el agente puede usar declara uno de tres niveles:

| Nivel | Ejemplos | Regla |
| --- | --- | --- |
| Lectura | Leer la ficha, leer una página web, consultar piezas | Se ejecuta sin preguntar |
| Borrador | Redactar un guion, proponer pasos, guardar una pieza como "Por aprobar" | Se ejecuta y queda visible para revisión |
| Efecto | Publicar, enviar un mensaje, gastar | Crea una aprobación y espera. No existe ninguna en la versión interna |

El nivel es parte de la definición de la herramienta, no del texto de las instrucciones. Así una instrucción maliciosa en una página web no puede saltarse la aprobación.

## Seguridad

- Todo contenido que llega de fuera (páginas web, y más adelante mensajes y correos) es dato, nunca instrucción. Se le entrega al modelo marcado como contenido externo.
- Las llaves de proveedores viven en variables de entorno del servidor. Nunca llegan al navegador ni al repo.
- Los tokens de cuentas conectadas, cuando existan, se guardan cifrados.
- Cada acción de Sirio queda en `acciones` con el hilo y la herramienta que la originó.

## De la maqueta al producto

La maqueta actual tiene la interfaz completa con datos de ejemplo en `src/lib/data.ts` y estado en el cliente en `src/lib/store.tsx`. La migración es por rebanadas: cada issue sustituye una parte de esos datos por datos reales y deja el resto como está. Las vistas que todavía no tienen datos reales conservan sus datos de ejemplo, marcados como tales, hasta que les toque.

## Por confirmar antes de depender de ello

- Soporte de MCP en la versión actual de Vercel AI SDK y su licencia.
- Límites de duración de las funciones y de Vercel Cron en el plan que se use.
- Política de WhatsApp para bots de IA y requisitos de Google para Gmail y Calendar. No afectan a la versión interna, pero sí a lo que sigue.
