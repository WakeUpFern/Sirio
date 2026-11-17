# Sirio: estructura de la app

Qué pantallas tiene Sirio, cómo se navega entre ellas y qué muestra cada una. Sustituye a la disposición de la primera maqueta, que repetía la de Foundable. Resuelve el issue M0-8.

El aspecto (colores, tipografía, botones, movimiento) está en [`sistema-diseno.md`](sistema-diseno.md). Este documento define la disposición y el contenido.

## De dónde sale

La estructura sale de la promesa de [`producto.md`](producto.md): Sirio conoce el negocio, tiene un objetivo y avanza hacia él pidiendo aprobación. Cada parte de esa promesa es un lugar en la app.

| Lo que promete el producto | Dónde vive |
| --- | --- |
| Hay trabajo hecho esperando tu decisión | **Hoy** |
| Sirio tiene un objetivo y pasos semanales | **Objetivo** |
| Propone ideas y guiones que tú apruebas | **Contenido** |
| Todo lo que hace queda a la vista, y trabaja sin que le escriban | **Actividad** |
| Conoce el negocio y recuerda lo que aprende | **Negocio** |
| Conversas con él por tarea | **Hilos** y el panel de Sirio |

## Qué cambia respecto a la maqueta

| Maqueta (disposición de Foundable) | Estructura propia |
| --- | --- |
| Barra superior flotante con pestañas centradas Inicio, Contenido y Operar | Barra lateral izquierda con cinco secciones y la lista de hilos |
| Chat fijo en una columna a la izquierda | Panel de Sirio a la derecha, que se abre y se cierra |
| Inicio como cuadrícula de tarjetas iguales | Hoy: una cola de decisiones como protagonista y lo demás al lado |
| Operar: lienzo con un taller al centro y agentes conectados por líneas | Actividad: bitácora por día y tabla de trabajo programado |
| El objetivo era una tarjeta más | Objetivo es una sección completa |
| La ficha del negocio no existía | Negocio: ficha y memoria |
| Portada con compositor gigante al centro sobre un cielo | Portada alineada a la izquierda con la ventana del producto a la derecha, como febacode.com |

## El marco

```
+-----------+--------------------------------------+----------------+
| Barra     | Encabezado de la vista               | Panel de Sirio |
| lateral   |--------------------------------------|  (se puede     |
| 248 px    |                                      |   cerrar)      |
|           | Contenido de la vista                |  400 px        |
|           |                                      |                |
+-----------+--------------------------------------+----------------+
```

Fondo `--fondo` con una retícula muy tenue. La barra lateral y el panel de Sirio son superficies blancas a toda la altura, separadas por una línea de 1 px. No hay marcos flotantes ni márgenes alrededor de la app.

### Barra lateral

De arriba abajo:

1. **Marca.** La estrella y la palabra "Sirio". Debajo, el selector de espacio: un cuadrado en tinta con la inicial, "FEBAcode" y una flecha.
2. **Botón "Nuevo hilo".** Variante contorno, a todo el ancho.
3. **Secciones.** Hoy, Objetivo, Contenido, Actividad, Negocio. Cada una con icono y nombre. Hoy y Contenido muestran un contador cuando hay algo por decidir. La sección activa tiene fondo `--acento-suave`, texto en tinta y una barra vertical de 3 px en acento a la izquierda.
4. **Hilos.** Etiqueta pequeña "HILOS" y los hilos recientes: título en una línea y un punto en acento si Sirio está trabajando en él. Al final, "Ver todos".
5. **Pie.** Ajustes y la persona (avatar, nombre) al fondo.

Por debajo de 1024 px la barra se reduce a iconos.

### Encabezado de la vista

Una fila dentro del área central, sin fondo propio: el título de la vista a la izquierda (24 px, peso 800), una línea de apoyo debajo en tinta 2, y a la derecha la acción principal de esa vista, si la tiene, y el botón que abre o cierra el panel de Sirio.

### Panel de Sirio

A la derecha, 400 px, se abre y se cierra con un botón del encabezado. Abierto por omisión en pantallas de 1440 px o más.

- **Cabecera:** la estrella (en acento y titilando si trabaja), el título del hilo, y los botones de historial y cerrar.
- **Cuerpo:** la conversación. Mensajes de la persona en burbuja `--superficie-2` alineada a la derecha; los de Sirio como texto sin burbuja, precedidos por la fila plegable "Trabajó 12 pasos · 48 s". Las tarjetas de pregunta y de aprobación aparecen dentro de la conversación.
- **Pie:** el compositor, con adjuntar y enviar. El botón de enviar es la variante principal en formato de icono.

Elegir un hilo en la barra lateral lo abre en este panel sin cambiar de vista.

## Vistas

### Hoy (`/app`)

Responde a una pregunta: qué necesita Sirio de mí y qué hizo mientras no estaba.

- **Encabezado.** Título "Hoy" y, como línea de apoyo, lo que Sirio hace en este momento ("Estoy escribiendo el guion del sketch del lunes"), con la estrella. Acción a la derecha: "Pausar a Sirio" en variante contorno.
- **Franja del objetivo.** Una sola fila a todo el ancho: el objetivo en una frase, los días que faltan y una barra de avance segmentada por semanas. Lleva a Objetivo.
- **Columna principal (dos tercios): "Necesita tu decisión".** Es la cola. Cada elemento es una tarjeta con su tipo en una etiqueta ("Aprobar pieza", "Sirio pregunta", "Solo tú puedes"), un título, una línea de contexto y sus acciones. La primera tarjeta está desplegada y muestra el contenido a decidir; las demás, plegadas. Es la única zona que usa el color de atención. Cuando no queda nada, un estado vacío: "Estás al día. Sirio te avisará cuando necesite algo."
- **Columna lateral (un tercio):**
  - **Hecho desde tu última visita.** Lista con icono, descripción y hora de lo que Sirio produjo.
  - **Esta semana.** Los pasos de la semana con su estado.
  - **Resultados.** Tres cifras pequeñas con su cambio respecto a la semana anterior.

### Objetivo (`/app/objetivo`)

- **Encabezado.** Título "Objetivo". Acción: "Cambiar objetivo" en contorno.
- **Tarjeta del objetivo.** La frase del objetivo en grande, la medida de éxito, la fecha límite y el avance: valor actual, meta y una barra.
- **Línea de semanas.** Trece segmentos, uno por semana; las pasadas rellenas, la actual marcada en acento.
- **Pasos de esta semana.** Lista con estado (hecho, en curso, pendiente), quién lo lleva (Sirio o una persona) y enlace al hilo o la pieza.
- **Propuesta de Sirio para la semana siguiente.** Tarjeta con tres o cuatro pasos propuestos y las acciones "Aceptar", "Cambiar" y "Descartar".
- **Semanas anteriores.** Lista plegada.

### Contenido (`/app/contenido`)

Lo que Sirio propone y lo que ya se aprobó. En la versión interna Sirio no publica: deja la pieza lista y una persona la publica.

- **Encabezado.** Título "Contenido". Acción principal: "Pedir una pieza".
- **Pestañas:** Por aprobar, Aprobado, Guiones, Descartado. Con contador.
- **Lista de piezas** a la izquierda: tarjetas con miniatura vertical, título, formato y fecha.
- **Detalle** a la derecha al elegir una: vista previa en un marco de teléfono, el texto de la publicación, el guion en escenas numeradas y las acciones "Aprobar", "Pedir otra versión", "Copiar texto" y "Descartar". Aprobar cambia el estado y actualiza los contadores.

Las miniaturas son bloques en `--superficie-2` con el título encima y un detalle en acento. Sin bloques pastel.

### Actividad (`/app/actividad`)

Sustituye a Operar. Dos pestañas.

- **Bitácora.** Todo lo que Sirio hizo, agrupado por día. Cada fila: hora en mono, un icono según el tipo (leyó, redactó, propuso, preguntó, programó), la descripción y un enlace al resultado. Filtros por tipo arriba. Si Sirio está trabajando, la primera fila es la acción en curso con la estrella titilando.
- **Trabajo programado.** Tabla con las tareas: nombre, horario en palabras ("Lunes a viernes, 8:00"), última ejecución con su resultado, próxima ejecución y un interruptor para pausar. Incluye "Resumen de la mañana" y "Revisión semanal del objetivo".

### Negocio (`/app/negocio`)

Lo que Sirio sabe. Dos pestañas.

- **Ficha.** Los campos del negocio (qué vende, a quién, tono, canales, diferenciadores), cada uno editable en su lugar. Arriba, la fuente de la que salió y la fecha del último cambio, con quién lo hizo.
- **Memoria.** Las notas que Sirio aprendió, cada una con su texto, el hilo del que salió y las acciones editar y borrar. Arriba, una línea que explica que estas notas entran a cada hilo nuevo.

### Ajustes (`/app/ajustes`)

Sin panel de Sirio. Lista de secciones a la izquierda y contenido a la derecha: Equipo, Modelos y llaves, Autonomía, Notificaciones. "Integraciones" aparece con un estado vacío que dice que llegan después de la versión interna.

## Portada (`/`)

Sigue el lenguaje de febacode.com, no el de Foundable.

1. **Barra de navegación** blanca con línea inferior: la estrella y "Sirio", los enlaces "Cómo trabaja" y "Qué ves cada día", y a la derecha "Abrir la demo" en variante principal.
2. **Hero** en dos columnas sobre fondo blanco con retícula tenue. A la izquierda: una etiqueta en mono ("Un proyecto de FEBAcode"), el titular en peso 800 con dos palabras subrayadas en acento, un párrafo y dos botones (principal "Abrir la demo", contorno "Cómo trabaja"). A la derecha: una ventana con la vista Hoy reducida, hecha con los mismos componentes.
3. **Cómo trabaja.** Cuatro pasos numerados en fila: Conoce tu negocio, Acuerdan un objetivo, Trabaja por su cuenta, Tú apruebas.
4. **Qué ves cada día.** Tres bloques alternados, cada uno con una mini vista: la cola de decisiones, el objetivo y la bitácora.
5. **Cierre** con el botón principal y el pie "Sirio, un proyecto de FEBAcode".

La portada no promete integraciones ni funciones que están fuera de la versión interna.

## Datos de ejemplo

Los datos de ejemplo siguen siendo de FEBAcode y creíbles. El objetivo de ejemplo es de FEBA como consultora: conseguir contactos de clientes nuevos en 90 días. Las piezas son los sketches ya definidos. No se inventan testimonios, clientes ni métricas de terceros.
