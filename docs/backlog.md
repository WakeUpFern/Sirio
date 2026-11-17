# Sirio: backlog de M0 y M1

Los issues de los dos primeros hitos, en el orden en que conviene hacerlos. Cada uno es una rebanada que se puede ver funcionando y cabe en un solo PR. Cuando este documento se apruebe, cada entrada se crea como issue en GitHub dentro de su hito, y a partir de ahí GitHub es la fuente de verdad.

Los flujos (F1 a F7) están en [`producto.md`](producto.md) y las tablas en [`arquitectura.md`](arquitectura.md).

## M0. Cimientos

Meta del hito: cualquier persona del equipo entra a la app desplegada, y cualquier PR se prueba solo.

### M0-1. Pruebas automáticas en cada PR

Agregar pruebas unitarias y GitHub Actions.

- Un flujo de GitHub Actions corre `lint`, `build` y las pruebas en cada PR y en `main`.
- Existe al menos una prueba unitaria real sobre código actual.
- El `README` y `AGENTS.md` documentan el comando de pruebas.

Depende de: nada.

### M0-2. Confirmar las piezas técnicas pendientes

Investigación corta, sin código de producto.

- Se confirma en documentación oficial: soporte de MCP y licencia de Vercel AI SDK, límites de duración de funciones y de Vercel Cron.
- Se elige proveedor de Postgres, ORM y librería de cuentas, comparando a lo más dos opciones de cada uno.
- El resultado queda en `decisiones.md` y `arquitectura.md` deja de decir "por confirmar" en esos puntos.

Depende de: nada.

### M0-3. Base de datos y primera migración

- Postgres conectado en local, en vistas previas y en producción.
- Migraciones versionadas en el repo, con un comando para aplicarlas.
- Tablas `espacios` y `miembros` creadas, y un script que crea el espacio FEBAcode.
- Una función única para consultar que exige `espacio_id`, con una prueba que falla si se omite.

Depende de: M0-2.

### M0-4. Inicio de sesión

Cubre F1.

- Inicio de sesión con Google.
- Solo entran correos de una lista permitida configurable; los demás ven un mensaje claro.
- `/app` y sus rutas exigen sesión; la portada sigue pública.
- La barra superior muestra el nombre y avatar reales de la persona.

Depende de: M0-3.

### M0-5. Despliegue con entornos

- Producción y vistas previas por PR funcionando en Vercel con sus variables de entorno.
- Un archivo de ejemplo lista las variables necesarias, sin valores.
- El `README` explica cómo levantar el proyecto completo en local.

Depende de: M0-3 y M0-4.

### M0-6. Primer mensaje real

La rebanada más delgada del agente, para probar el camino completo.

- El compositor del chat envía el mensaje al servidor y recibe la respuesta de un modelo real en streaming.
- El proveedor y el modelo se leen de configuración.
- Sin memoria, sin herramientas y sin guardar nada todavía.
- Si el modelo falla, el chat muestra un error entendible y permite reintentar.

Depende de: M0-5.

## M1. Sirio conoce el negocio

Meta del hito: Sirio conversa con el equipo sabiendo qué es FEBAcode, y esa conversación se conserva.

### M1-1. Hilos y mensajes guardados

Cubre parte de F3.

- Tablas `hilos` y `mensajes`.
- Crear, renombrar, archivar y reabrir un hilo.
- Al recargar, el hilo y su historial siguen ahí.
- El historial de hilos de la columna de chat muestra hilos reales.

Depende de: M0-6.

### M1-2. Ficha del negocio en Ajustes

Cubre parte de F2.

- Tabla `fichas` con historial de cambios.
- Sección Negocio, General de Ajustes: ver y editar qué vende, a quién, tono, canales y diferenciadores.
- Cada cambio guarda quién lo hizo y cuándo.

Depende de: M0-4.

### M1-3. Sirio redacta la ficha desde una URL

Cubre parte de F2.

- Herramienta de lectura que obtiene el texto de una página pública.
- A partir de una URL, Sirio propone una ficha completa con salida tipada.
- El contenido de la página se entrega al modelo marcado como contenido externo.
- La ficha propuesta se muestra para corregir y solo se guarda al confirmar.
- Una prueba cubre una página con instrucciones maliciosas en su texto: la ficha no las obedece.

Depende de: M1-2 y M0-6.

### M1-4. Arranque guiado en el chat

Cierra F2.

- La primera vez que un espacio no tiene ficha, el chat inicia el arranque: pide la fuente, muestra la ficha y hace las tres preguntas como tarjetas.
- Cada tarjeta se puede omitir.
- Las respuestas se guardan: tipo de negocio y autonomía en el espacio, y el objetivo como texto para M2.
- Al terminar, Sirio entrega un primer resultado pequeño, por ejemplo tres ideas de contenido.

Depende de: M1-3 y M1-1.

### M1-5. Contexto del negocio en cada hilo

Cubre parte de F3.

- Cada turno arma el contexto en el orden que define `arquitectura.md`: instrucciones, ficha, objetivo, memoria, hilo.
- Las instrucciones de Sirio viven en un archivo versionado del repo.
- Un hilo nuevo no recibe mensajes de otros hilos; una prueba lo verifica.
- Si la ficha cambia, el siguiente turno ya usa la nueva: los hilos nuevos la reciben completa y los hilos en curso reciben una nota con la diferencia al final.
- El contexto se arma de lo más estable a lo más cambiante, y cada llamada registra tokens de entrada, de caché y de salida.
- Una prueba verifica que dos turnos seguidos de un mismo hilo comparten el mismo inicio byte por byte.

Depende de: M1-1 y M1-2.

### M1-6. Memoria del negocio

Cubre parte de F3.

- Tabla `memoria`.
- Al archivar un hilo, Sirio propone notas para guardar y la persona confirma, edita o descarta.
- Sección de Ajustes para ver, editar y borrar notas, con el hilo del que salió cada una.
- Las notas confirmadas entran al contexto de los hilos nuevos.

Depende de: M1-5.

### M1-7. Pasos visibles y resumen de hilos largos

Cierra F3.

- La fila "Trabajó N pasos" del chat muestra los pasos reales del agente.
- Cuando un hilo supera un tamaño definido, los mensajes antiguos se sustituyen por un resumen y el hilo sigue funcionando.
- Una prueba cubre un hilo largo: la respuesta sigue usando un dato dicho al principio.

Depende de: M1-5.

## Lo que sigue

M2 (objetivo, trabajo programado y actividad real) y M3 (contenido con aprobación) se detallan al cerrar M1, con lo aprendido.
