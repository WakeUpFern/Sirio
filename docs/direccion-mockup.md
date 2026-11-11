# Sirio: dirección de la primera maqueta

Este documento es el encargo para quien construye la primera maqueta web de Sirio. Explica qué es el producto, a quién se le va a mostrar, cómo debe verse y qué pantallas lleva. Todo lo que no esté fijado aquí queda a tu criterio; cuando decidas algo, que sea coherente con la sección "Cómo debe sentirse".

El análisis detallado de las capturas de referencia está en [`docs/referencias/analisis-capturas.md`](referencias/analisis-capturas.md). Léelo antes de empezar: ahí están las medidas, colores y componentes de Foundable que esta maqueta toma como base.

## Qué es Sirio y para qué es esta maqueta

Sirio es un producto interno de FEBAcode, una consultora de software. Es una interfaz web donde un agente de IA actúa como director de marketing (CMO) con su propio equipo de agentes: propone ideas y guiones, edita video, publica en redes, promociona, busca colaboraciones y responde a clientes, y el equipo humano ve todo lo que hace y aprueba lo que sale al público. La primera apuesta de contenido son sketches graciosos para TikTok grabados con el equipo y los interns de FEBA.

Esta maqueta es lo primero que Fernando va a desplegar en Vercel para enseñárselo a otras personas. No hay backend, ni cuentas, ni IA real: todo son datos de ejemplo escritos en el código. Lo que tiene que lograr es que alguien que la abre entienda en un minuto qué es Sirio y sienta que el producto ya existe. Por eso importa más que cada pantalla se vea terminada y viva que cubrir muchas funciones. Si algo no cabe con calidad, déjalo fuera antes que a medias.

## Cómo debe sentirse

La referencia principal es Foundable (foundable.com), y la maqueta debe parecérsele mucho en estructura, densidad y tono: un producto claro, tranquilo y amable, con mucho aire, superficies blancas y translúcidas sobre un cielo suave, texto en tinta casi negra, botones en forma de píldora oscura, y casi ningún color fuera de los estados. Lo que Fernando pidió evitar de forma explícita es el aire de Lovable, Higgsfield y ElevenLabs/OpenArt: fondos negros con acentos eléctricos, degradados saturados rosa, azul o naranja, amarillo lima, magenta, brillos y resplandores. Nada de eso debe aparecer en ningún lugar.

Sirio no es una copia de Foundable. Foundable vive en un cielo de día con nubes y una mascota nube llamada Ted. Sirio toma su nombre de la estrella más brillante del cielo nocturno, así que su mundo es **el cielo justo antes del amanecer**: un degradado muy pálido y desaturado que va de un azul grisáceo arriba a un tono papel cálido abajo, sin nubes, con una retícula de puntos apenas visible. La marca es una **estrella de cuatro puntas** dibujada en tinta, pequeña y precisa. Esa estrella es el único gesto con personalidad de la interfaz: cuando Sirio está trabajando, titila despacio; cuando espera, queda quieta. No uses la nube, el logotipo, los textos ni las ilustraciones de Foundable.

El idioma de toda la interfaz es español de México, tuteando, con frases cortas y verbos claros. El agente se llama Sirio y habla en primera persona ("Preparé tres ganchos para el sketch del lunes").

## Sistema visual

Define estos valores como variables CSS en un solo lugar y úsalos en todo. Son el punto de partida; puedes afinar un tono si al verlo en pantalla lo pide, pero no agregues colores nuevos.

| Papel | Valor | Uso |
| --- | --- | --- |
| Tinta | `#0B1220` | Texto principal, botón primario, pestaña activa del lienzo de Operar |
| Tinta secundaria | `#465066` | Texto de apoyo |
| Tinta terciaria | `#8791A3` | Etiquetas, horas, placeholders |
| Línea | `#E4E8EF` | Bordes de 1 px sobre blanco |
| Página | `#F5F5F7` | Fondo de la página de aterrizaje bajo el hero |
| Papel | `#FFFFFF` | Tarjetas opacas |
| Cielo alto | `#C5D3E8` | Parte alta del degradado |
| Cielo medio | `#E3EAF3` | Centro del degradado |
| Cielo bajo | `#F6F2EC` | Parte baja, tono papel cálido |
| Vidrio | `rgba(255,255,255,0.66)` con `backdrop-filter: blur(18px)` y borde `rgba(255,255,255,0.8)` | Paneles de la app sobre el cielo |
| Listo | `#1E8E5A` | Hecho, conectado |
| Atención | `#B4721A` | Espera tu aprobación |
| Error | `#B5403A` | Falló, rechazar |
| Lila | `#D6D0F0` | Fondo de bloque ilustrado en la portada |
| Menta | `#C6E6DD` | Igual |
| Durazno | `#F3D3C1` | Igual |

Los tres pasteles son las versiones apagadas de los bloques lila, menta y durazno que Foundable usa detrás de sus ilustraciones. Solo aparecen en la portada, como fondo de los bloques de funciones, nunca dentro de la app.

**Tipografía.** Una sola familia sans humanista para todo, Hanken Grotesk variable, instalada con `@fontsource-variable/hanken-grotesk` (no uses `next/font/google`, porque el build no debe depender de descargar fuentes). Para horas, duraciones, contadores y atajos usa Geist Mono con `@fontsource-variable/geist-mono` a 11 o 12 px. Titular del hero: 64 a 72 px en escritorio, peso 500, interlineado 1.05, tracking ligeramente negativo. Títulos de sección: 32 a 36 px, peso 500. Dentro de la app el cuerpo es de 13 a 14 px y los títulos de tarjeta de 13 px con peso 600; es una interfaz densa pero con aire, como la de Foundable. Las únicas mayúsculas son las etiquetas pequeñas de grupo ("ACTIVIDAD DE SIRIO"), a 10 u 11 px con tracking amplio.

**Forma.** Botones primarios y pestañas en píldora completa. Tarjetas y paneles con radio de 14 a 16 px; el marco exterior de la app, 20 px; campos e ítems de lista, 10 px. Bordes de 1 px. Sombras casi inexistentes: como mucho `0 1px 2px rgba(11,18,32,0.04), 0 8px 24px rgba(11,18,32,0.06)` en elementos que flotan (compositor, avisos). Ningún resplandor de color.

**Iconos.** `lucide-react`, trazo de 1.5 a 1.75, 16 px dentro de la app. Para logotipos de redes y servicios usa `react-icons/si`, dentro de un cuadrado redondeado blanco con borde de línea, como en la página de integraciones de Foundable.

**Movimiento.** Poco y lento. La estrella titila (escala y opacidad, ciclo de unos 2.4 s) mientras Sirio trabaja. Los pasos nuevos del feed entran con un desvanecido corto. Los cambios de estado al aprobar son inmediatos con una transición de 150 ms. Todo debe respetar `prefers-reduced-motion`.

## Pantallas

Son dos piezas: una portada pública en `/` y la app en `/app` con sus vistas. En la app, la barra superior y la columna de chat se mantienen al cambiar de vista y conservan su estado.

### Portada (`/`)

Sigue de cerca la portada de Foundable.

1. **Barra de navegación** sobre el cielo, sin fondo propio: la estrella y la palabra "Sirio" a la izquierda; enlaces "Producto", "Cómo trabaja", "Integraciones"; a la derecha "Iniciar sesión" como texto y la píldora oscura "Abrir la demo", que lleva a `/app`.
2. **Hero** a pantalla completa con el degradado de cielo. Arriba y centrada, la estrella a unos 56 px. Titular en dos líneas: "Un director de marketing que trabaja por su cuenta." Subtítulo: "Conoce a Sirio, el CMO de IA de FEBAcode. Propone, graba contigo, publica y responde." Debajo, una tarjeta de compositor grande (unos 900 px de ancho, 150 px de alto, radio 28 px, blanca apenas translúcida) con el placeholder "Pídele a Sirio un sketch para TikTok" y un botón redondo de enviar abajo a la derecha. El placeholder rota cada pocos segundos entre tres o cuatro encargos reales. Enviar, con o sin texto, lleva a `/app`.
3. **Vista del producto**: sobre fondo de página con retícula de puntos, una ventana con tres puntos de semáforo que contiene una versión reducida y no interactiva de la vista Inicio de la app. Constrúyela reutilizando los mismos componentes, no con una imagen.
4. **"De la idea a la publicación."** A la izquierda, cinco pasos en lista vertical con título y una línea cada uno (Conoce a Sirio; Propone ideas y guiones; Edita lo que graban; Publica cuando apruebas; Responde y busca colaboraciones). El paso activo tiene una barra fina de progreso debajo y cambia solo cada pocos segundos o al hacer clic. A la derecha, un bloque grande con fondo pastel que cambia con el paso y muestra una mini tarjeta de interfaz relacionada.
5. **Tres bloques de funciones** en filas alternadas (texto a un lado, bloque pastel con una mini tarjeta de interfaz al otro): "Publicaciones listas para tu aprobación", "Tus cuentas, tus reglas", "Trabaja con las apps que ya usan".
6. **Integraciones**: una sección de tarjeta oscura en tinta (`#0B1220`, sin negro puro y sin ningún acento de color más allá de los logotipos) con el título "Todo lo que un equipo de marketing usa, conectado." y una cuadrícula de logotipos agrupados: Redes (TikTok, Instagram, Facebook, X, LinkedIn, YouTube), Mensajes (WhatsApp, Gmail), Trabajo (Google Drive, Notion, Slack), Pagos y anuncios (Stripe, Meta Ads, Google Ads).
7. **Cierre**: titular corto, la píldora "Abrir la demo" y un pie con "Sirio, un proyecto de FEBAcode".

### Estructura de la app (`/app`)

Toda la app vive sobre el degradado de cielo, a pantalla completa, con un margen de 12 px alrededor.

- **Barra superior**: una píldora de vidrio de unos 56 px de alto. A la izquierda, fuera de la píldora, la estrella dentro de un círculo. Dentro: selector de espacio "FEBAcode" con inicial en un cuadrado oscuro y flecha; al centro las pestañas **Inicio**, **Contenido** y **Operar** (la activa es una píldora blanca); a la derecha buscar, bandeja (con punto de no leído), calendario, notificaciones con un contador pequeño que indica cuántas aprobaciones hay pendientes, un enlace a Ajustes y el avatar.
- **Columna de chat** a la izquierda, de unos 380 px, panel de vidrio a toda la altura, plegable con el botón de panel. Cabecera: botón de plegar, historial, título del hilo ("Sketch: el intern y el deploy del viernes"), menú y nuevo hilo. El botón de historial abre una lista de cuatro o cinco hilos de ejemplo. Los mensajes del usuario van en burbuja blanca alineada a la derecha; los de Sirio, como texto sin burbuja. Cada respuesta de Sirio va precedida de una fila plegable "Trabajó 12 pasos · 48 s" (o "Trabajando 1.9 s" con la estrella titilando) que al abrirse lista los pasos con una línea vertical fina. Dentro del chat debe verse al menos una **tarjeta de pregunta** con dos o tres opciones, una marcada como "Recomendada" y la salida "Ahora no", y una **tarjeta de aprobación** con Aprobar y Rechazar. Abajo, el compositor: campo "Escríbele a Sirio…", botón de adjuntar, micrófono y enviar redondo en tinta. Enviar agrega el mensaje, muestra a Sirio trabajando un par de segundos y luego una respuesta de ejemplo.
- **Área de vista** a la derecha: ocupa el resto.

### Inicio

Es el resumen del negocio, calcado de la vista Home de Foundable: una franja de estado arriba y una cuadrícula de tarjetas de vidrio debajo. Cada tarjeta tiene título a la izquierda, una flecha diagonal pequeña a la derecha y una línea bajo la cabecera.

- **Franja de estado**: la estrella y lo que Sirio hace en este momento ("Estoy cortando el sketch del intern. Voy en la toma 3 de 5."), con un botón para pausar.
- **Necesita tu OK**: de dos a tres pendientes con etiquetas distintas ("Necesita tu OK", "Solo tú puedes hacerlo", "Sirio pregunta") y sus acciones. Es la tarjeta más importante de la pantalla y la única que usa el color de atención.
- **Tus próximos pasos**: "3 de 7 pasos completos" con una barra segmentada y la lista agrupada (Preparar, Lanzar), con hechos en verde y el siguiente con "Empezar".
- **Hecho por Sirio**: lo último que produjo (guion, video cortado, borrador de correo de colaboración, calendario de la semana), cada uno con icono, nombre y hora.
- **Alcance**: últimos 7 días, con un número grande y una gráfica de área muy sencilla en tinta al 60 %, sin colores.
- **Resultados**: tres cifras en columnas separadas por líneas (Vistas, Seguidores nuevos, Contactos por WhatsApp).

### Contenido

La biblioteca de lo que Sirio prepara y publica. Arriba, pestañas segmentadas "Por aprobar", "Programado", "Publicado" y "Guiones", y a la derecha un filtro por red. El cuerpo es una cuadrícula de tarjetas de publicación: miniatura vertical 9:16 (usa bloques de color apagado con el título del sketch encima, no fotos de terceros), red, título, fecha y estado. Al elegir una tarjeta se abre a la derecha un panel de detalle con una **vista previa en un marco de teléfono** que imita con sobriedad cómo se verá en TikTok o en Instagram (cambia con un selector), el texto de la publicación, el guion en escenas numeradas, una tira simple de línea de tiempo con los cortes del video, y las acciones "Publicar ahora", "Programar", "Pedir otra versión a Sirio" y "Rechazar". Aprobar o rechazar aquí cambia el estado de la tarjeta y el contador de la campana.

### Operar

Es el taller de Sirio, calcado de la vista Run de Foundable. Arriba a la izquierda las pestañas segmentadas "Operar" y "Biblioteca"; arriba a la derecha "¿Necesitas ayuda?".

- **Panel izquierdo** (unos 280 px, blanco): estado "Listo para operar", el modo "Preguntar primero · Sirio te consulta antes de publicar" con un engrane que deja cambiarlo a "Por su cuenta", y el botón ancho en tinta "Iniciar". Debajo, la etiqueta "ACTIVIDAD DE SIRIO" y un feed con icono, acción, hora y enlace al resultado. Al pulsar "Iniciar", el botón pasa a "Pausar", la estrella titila y entran al feed pasos nuevos cada segundo y medio o dos, hasta detenerse en uno que pide aprobación. Al pie, un campo deshabilitado "Sirio te preguntará aquí cuando te necesite".
- **Lienzo**: al centro, un recuadro grande de vidrio etiquetado "TALLER DE SIRIO" con la estrella encima; dentro muestra lo que está haciendo (por ejemplo una mini vista del video en edición). Alrededor, tarjetas blancas pequeñas que son el equipo de agentes, cada una con su nombre y sus apps como iconos cuadrados con un punto verde si están conectadas y un "+" para agregar: **Redes** (Instagram, TikTok, X, Facebook, LinkedIn), **Alcance** (Correo, WhatsApp), **Anuncios** (Google, Meta), **Investigación**, **Video** (Editor, Guiones), **Comunidad**. Líneas finas y rectas en tinta al 15 % unen cada tarjeta con el taller; mientras opera, la línea del agente activo se marca un poco más. Dibuja las líneas con SVG.
- **Barra inferior** "HERRAMIENTAS QUE USA SIRIO": Imagen, Clips, Textos, Calendario, Ajustes.
- Un aviso flotante abajo a la derecha: "Instagram está conectado. Elige qué cuentas puede usar Sirio."

Los iconos de las apps son cuadrados redondeados con el logotipo en tinta o en su color de marca sobre blanco. No uses los iconos brillantes con degradado de Foundable.

### Ajustes (`/app/ajustes`)

Aquí la columna de chat se oculta. A la izquierda, una lista de secciones en tres grupos: *Negocio* (General, Equipo, Integraciones, Marca), *Sirio* (Modelos y llaves, Autonomía), *Cuenta* (Notificaciones, Apariencia). Construye con detalle tres secciones y deja las demás con un estado vacío bien escrito.

- **Integraciones**: buscador "Buscar apps", una sección "Conectadas" arriba y estantes por categoría debajo con filtro lateral (Todo, Redes sociales, Correo y mensajes, Documentos, Analítica, Pagos y anuncios), como la página de integraciones de Foundable pero en claro. Cada app es una fila con logotipo, nombre y una línea de lo que Sirio podrá hacer con ella. Al pulsar una se abre un diálogo que lista los permisos y el botón "Conectar"; conectar la mueve a "Conectadas".
- **Modelos y llaves**: proveedores (Claude, OpenAI Codex y uno o dos más) con campo de llave enmascarado, estado "Conectado" o "Sin llave", y qué agente usa cada modelo (CMO, Guionista, Editor, Community).
- **Autonomía**: una tabla por canal (TikTok, Instagram, WhatsApp, Correo, Anuncios) donde cada fila elige entre "Preguntar primero" y "Por su cuenta", con una línea que explica qué significa en ese canal, y un tope de gasto mensual.

## Datos de ejemplo

Pon todos los datos en un módulo aparte y hazlos creíbles para FEBAcode: el espacio se llama "FEBAcode"; el hilo activo es el sketch "El intern y el deploy del viernes"; otras piezas pueden ser "Cuando el cliente dice 'es un cambio chiquito'", "Standup de 15 minutos (versión real)" y "Tu primera semana en FEBA". Usa nombres de pila para el equipo (Fernando y cuatro o cinco más inventados), horas y fechas relativas a noviembre de 2026, y cifras modestas y verosímiles para una cuenta que apenas empieza. No inventes testimonios, clientes ni métricas de terceros.

## Restricciones técnicas

- Next.js con App Router, TypeScript y Tailwind CSS v4, en la raíz del repositorio, de modo que Vercel lo despliegue sin configuración. Usa las versiones estables actuales.
- Sin backend, sin variables de entorno, sin llamadas de red en tiempo de ejecución ni de build. Todo el estado vive en el cliente y se reinicia al recargar.
- Dependencias mínimas: además de lo anterior, solo `lucide-react`, `react-icons` y los dos paquetes de fuentes. Nada de librerías de componentes, de gráficas ni de diagramas; la gráfica y el lienzo se dibujan con SVG y CSS.
- El estado del chat y de las aprobaciones se comparte entre vistas con un contexto en el layout de `/app`.
- Diseña para escritorio de 1280 a 1920 px de ancho, que es donde se va a mostrar. Por debajo de 1024 px basta con que nada se rompa: la columna de chat se oculta y las cuadrículas pasan a una columna. La portada sí debe verse bien en móvil.
- Accesibilidad básica: botones y enlaces reales, foco visible, contraste AA en texto, `aria-label` en botones de solo icono.
- `npm run build` y `npm run lint` deben terminar sin errores ni advertencias.
- Actualiza el `README.md` con qué es la maqueta, cómo correrla y cómo desplegarla en Vercel.
