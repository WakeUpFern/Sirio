# Sirio: especificación de la versión interna

Este documento dice qué construimos primero, para quién y cómo sabemos que quedó. Sustituye a un SRS clásico: es corto a propósito y se actualiza cada vez que cambia una decisión. La dirección general y la investigación que la respalda están en el documento [Sirio: dirección inicial](https://claude.ai/artifact/TCfqp4UVd4zPDycTSsChR6).

## Qué es Sirio

Sirio es el operador de marketing de un negocio. Conoce el negocio, acuerda un objetivo con su dueño y trabaja hacia él por su cuenta, pidiendo aprobación en todo lo que sale al público. No es un asistente personal para todo.

La versión interna es para un solo negocio, FEBAcode, y la usa su propio equipo. Todo se construye pensando en que después habrá más negocios, pero no se construye nada que solo sirva para ese después.

## Qué debe demostrar

Una sola cosa: **Sirio conoce a FEBAcode, tiene un objetivo y avanza hacia él sin que se lo pidan.** Si al abrir la app un lunes hay trabajo hecho esperando aprobación, la versión interna cumplió.

## Quién la usa

| Persona | Qué hace en Sirio |
| --- | --- |
| Dirección (Fernando) | Fija el objetivo, corrige la ficha del negocio, aprueba o rechaza |
| Quien lleva el marketing de FEBA | Conversa con Sirio a diario, pide piezas, aprueba contenido |
| Resto del equipo | Consulta lo que Sirio preparó y responde cuando Sirio pregunta |

## Flujos de la versión interna

Cada flujo está terminado cuando una persona del equipo puede recorrerlo completo en el entorno desplegado, con datos reales y sin ayuda.

### F1. Entrar al espacio

Una persona del equipo inicia sesión y llega al espacio FEBAcode.

- Solo entran los correos de una lista permitida.
- Todo lo que ve pertenece a su espacio; ningún dato se lee sin filtrar por espacio.

### F2. Arranque: Sirio conoce el negocio

La primera vez, Sirio pide una fuente (el sitio o una red social), redacta la ficha del negocio y hace como máximo tres preguntas.

- Con la URL de FEBAcode, Sirio produce una ficha con: qué vende, a quién, tono, canales y diferenciadores.
- La ficha se muestra para corregir antes de guardarse.
- Las tres preguntas son: negocio o marca personal, objetivo de los próximos 90 días y nivel de autonomía.
- Las preguntas aparecen como tarjetas dentro del chat y se pueden omitir.
- La ficha queda en la sección Negocio, y cualquier miembro puede editarla.

### F3. Conversar en hilos

El chat de la maqueta funciona con un modelo real.

- Cada hilo es una tarea o tema. Se pueden crear, renombrar y archivar.
- Un hilo nuevo arranca con la ficha, el objetivo vigente y la memoria del negocio, no con mensajes de otros hilos.
- La respuesta llega en streaming y muestra los pasos que Sirio dio.
- Al archivar un hilo, Sirio propone qué guardar en la memoria del negocio y el usuario lo confirma.
- Un hilo que crece demasiado se resume solo y sigue funcionando.

### F4. Objetivo y próximos pasos

El objetivo a 90 días se convierte en pasos semanales.

- Hay un solo objetivo vigente por espacio, con fecha y una medida de éxito.
- Sirio propone los pasos de la semana; el usuario los acepta, cambia o descarta.
- La sección Objetivo y la tarjeta "Esta semana" de Hoy muestran esos pasos con su estado real.

### F5. Trabajo programado

Sirio trabaja sin que le escriban.

- Hay al menos dos tareas programadas: resumen de la mañana y revisión semanal del objetivo.
- El usuario ve cada tarea, su horario y su última ejecución, y puede pausarla.
- Cada ejecución abre su propio hilo y deja su resultado en Hoy.

### F6. Contenido con aprobación

Sirio propone ideas y guiones, y nada se da por bueno sin una persona.

- Sirio genera ideas y guiones de sketches a partir de la ficha y el objetivo.
- Cada pieza entra a Contenido como "Por aprobar".
- Aprobar o rechazar cambia su estado y queda registrado con quién y cuándo.
- En esta versión Sirio no publica: deja el texto y el guion listos para que una persona los publique.

### F7. Actividad

Todo lo que Sirio hace queda a la vista.

- Cada acción (leyó, redactó, propuso, preguntó, programó) se registra con hora, hilo y resultado.
- La vista Actividad y la línea de estado de Hoy muestran ese registro, no datos de ejemplo.

## Fuera de alcance

Queda fuera de la versión interna y no se construye aunque parezca fácil:

- Publicar automáticamente en redes sociales.
- WhatsApp, correo saliente y cualquier mensaje a personas externas.
- Edición de video, anuncios y pagos.
- Alta de nuevos negocios desde la interfaz, planes y cobro.
- Aplicación móvil. La app se diseña para escritorio.

## Cómo sabemos que funciona

- El equipo de FEBA usa Sirio al menos tres días por semana durante cuatro semanas seguidas.
- Cada lunes hay al menos una propuesta de Sirio esperando aprobación sin que nadie la haya pedido.
- Al menos la mitad de las piezas que Sirio propone se aprueban con cambios menores o sin cambios.

Estas tres medidas son una propuesta inicial; se ajustan en la primera revisión semanal.

## Hitos

| Hito | Qué entrega | Fechas propuestas |
| --- | --- | --- |
| M0. Cimientos | Cuentas, base de datos, despliegue, pruebas automáticas | 17 al 23 de noviembre de 2026 |
| M1. Sirio conoce el negocio | F1, F2 y F3 | 24 de noviembre al 7 de diciembre |
| M2. Objetivo y trabajo programado | F4, F5 y F7 | 8 al 21 de diciembre |
| M3. Contenido con aprobación | F6 y cierre de la versión interna | Enero de 2027 |

Las fechas suponen cuatro personas con dedicación parcial y agentes construyendo la mayor parte del código. Se confirman al terminar M0, cuando haya una primera medida de velocidad. El detalle de M0 y M1 está en [`backlog.md`](backlog.md).
