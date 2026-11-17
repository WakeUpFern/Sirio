# Sistema de diseño FEBAcode

Este documento define cómo se ve y se comporta la interfaz de Sirio y de los proyectos de FEBAcode que vengan después. Sustituye a [`direccion-mockup.md`](direccion-mockup.md), que se conserva solo como registro de la primera maqueta.

Tiene dos partes: la regla común a todos los productos de FEBAcode y su aplicación en Sirio.

## Por qué cambia

La primera maqueta tomó como base la interfaz de Foundable. Sirvió para mostrar la idea dentro de FEBA, pero un producto que se lanza no puede parecer el de otra empresa. A partir de ahora la identidad sale de la marca FEBAcode, no de una referencia externa.

Los valores de marca se tomaron de [febacode.com](https://www.febacode.com) el 16 de noviembre de 2026: color, tipografía, radios y transiciones se leyeron del sitio en un navegador.

## Parte 1. La regla FEBAcode

**Base neutra y suave, tinta FEBA para el texto y un solo color de acento del logo por producto.**

Todo producto de FEBAcode se reconoce por cuatro cosas: la tinta azul marino, un acento del logo usado con medida, la tipografía Manrope y las esquinas de 14 px. Lo demás es blanco, gris suave y aire.

### Color

Los colores del logo son tres: tinta, cian y coral.

| Nombre | Valor | Origen |
| --- | --- | --- |
| Tinta | `#1A1F36` | Cubo y palabra "FEBA" del logo |
| Cian | `#00BFD8` | Palabra "code" del logo |
| Coral | `#F65F4C` | Detalle del logo y botón principal de febacode.com |

Reglas de uso:

1. **Un acento por producto.** Cada producto elige cian o coral como acento y usa el otro solo en el logo de FEBAcode. Nunca los dos como relleno grande en la misma pantalla.
2. **El acento es escaso.** Ocupa como mucho una décima parte de la pantalla: la acción principal, el elemento activo, un subrayado. Si todo está en acento, nada destaca.
3. **El texto es tinta, nunca negro puro.** Los grises del texto son la tinta aclarada, no gris neutro.
4. **El foco y los controles encendidos usan el acento de texto.** El anillo de foco y el interruptor encendido necesitan un contraste de 3 contra el fondo, y el cian puro sobre blanco da 2.2. Se usa la versión oscura del acento.
5. **El texto sobre acento es tinta.** El blanco sobre cian tiene un contraste de 2.2 y sobre coral de 3.2; ninguno alcanza el mínimo de 4.5. La tinta sobre cian da 7.3 y sobre coral 5.2.
6. **Los estados tienen sus propios colores** (hecho, atención, error) y no se usan como decoración.
7. **Sin degradados saturados, sin resplandores, sin fondos negros.** El modo oscuro, cuando exista, usa la tinta como fondo.

### Tipografía

| Uso | Familia | Detalle |
| --- | --- | --- |
| Todo el texto | Manrope variable | Títulos en peso 800 con tracking negativo; cuerpo en 400 a 500; botones en 700 |
| Horas, cifras, atajos, etiquetas técnicas | DM Mono | 11 a 12 px |

Las fuentes se instalan como paquetes (`@fontsource-variable/manrope`, `@fontsource/dm-mono`), no desde un servicio externo.

### Forma

| Elemento | Radio |
| --- | --- |
| Botones y campos | 14 px |
| Tarjetas y paneles | 16 px |
| Ventanas, diálogos y marcos grandes | 20 px |
| Etiquetas, chips pequeños y elementos dentro de un control (una pestaña dentro de su barra) | 8 px |

Los botones no son píldoras. La píldora completa queda reservada para etiquetas de estado y contadores. Los bordes son de 1 px en color de línea. Las sombras son casi invisibles y solo en lo que flota.

Hay tres sombras, todas derivadas de la tinta: reposo (`0 1px 2px` al 8 %), alzada para el botón con el cursor encima, y flota para diálogos y avisos. El velo detrás de un diálogo es tinta al 32 %.

### Botones

Hay cuatro variantes y ninguna más.

| Variante | Fondo | Texto | Cuándo |
| --- | --- | --- | --- |
| Principal | Acento | Tinta | Una por vista: la acción que más importa |
| Sólido | Tinta | Blanco | Acciones importantes que no son la principal |
| Contorno | Transparente con borde de línea | Tinta | Acciones secundarias |
| Texto | Transparente | Tinta, subrayado en acento al pasar el cursor | Acciones de baja jerarquía y enlaces |

Tamaños: 36 px de alto dentro de la app, 44 px en portadas y diálogos. En filas densas se usa la variante texto, que no tiene alto mínimo. Peso 700. Los botones de solo icono son cuadrados con el mismo radio.

### Movimiento de los botones

| Estado | Qué pasa | Duración |
| --- | --- | --- |
| Cursor encima | Sube 1 px y su sombra crece | 150 ms |
| Presionado | Vuelve a su sitio y se encoge a 0.98 | 80 ms |
| Foco con teclado | Anillo de 2 px en acento de texto, separado 2 px | Inmediato |
| Cargando | El texto se sustituye por un indicador; el ancho no cambia | Hasta terminar |
| Deshabilitado | Opacidad al 50 %, sin sombra ni movimiento | No aplica |

Curva para todo: `cubic-bezier(0.2, 0.8, 0.2, 1)`. Solo se animan `transform`, `box-shadow`, `opacity` y color. Con `prefers-reduced-motion` no hay desplazamiento ni escala, solo el cambio de color.

### Movimiento en general

- Lo que aparece entra con un desvanecido y 4 px de desplazamiento en 200 ms.
- Los cambios de estado duran 150 ms.
- Nada dura más de 300 ms salvo un indicador de trabajo en curso.
- No hay animaciones decorativas en bucle. La única excepción es el indicador de que el producto está trabajando.

### Fondo

Fondo claro y plano, con una retícula muy tenue como textura opcional. Es el gesto que ya usa febacode.com. Sin cielos, sin nubes, sin paneles de vidrio translúcido.

### Accesibilidad

Contraste AA en todo el texto, foco siempre visible, botones y enlaces reales, `aria-label` en los botones de solo icono y áreas de toque de al menos 36 px.

## Parte 2. Sirio

**El acento de Sirio es el cian.** El sitio de FEBAcode usa coral para vender; Sirio es una herramienta que se usa horas, y el cian no compite con los colores de error y atención. Además es el color de la estrella que le da nombre.

### Variables

Se definen una sola vez en `src/app/globals.css` y todo el código las usa. Ningún color se escribe directo en un componente.

| Variable | Valor | Uso |
| --- | --- | --- |
| `--tinta` | `#1A1F36` | Texto principal, botón sólido |
| `--tinta-2` | `#4C5062` | Texto de apoyo |
| `--tinta-3` | `#6B7085` | Etiquetas, horas, placeholders |
| `--linea` | `#E3E5EC` | Bordes de 1 px |
| `--fondo` | `#F6F7F9` | Fondo de la app |
| `--superficie` | `#FFFFFF` | Tarjetas y paneles |
| `--superficie-2` | `#EEF0F4` | Zonas hundidas, pestaña inactiva, fila al pasar el cursor |
| `--acento` | `#00BFD8` | Botón principal, elemento activo, la estrella trabajando |
| `--acento-texto` | `#00788A` | Enlaces e iconos en acento sobre fondo claro |
| `--acento-suave` | `#E0F7FA` | Fondo de selección y de avisos informativos |
| `--listo` | `#18794C` | Hecho, conectado |
| `--atencion` | `#A8641A` | Espera tu aprobación |
| `--error` | `#C8372D` | Falló, rechazar |

Contrastes medidos: tinta sobre fondo 15.2, tinta 2 sobre blanco 8.0, tinta 3 sobre fondo 4.6, acento de texto sobre fondo 4.8, tinta sobre acento 7.3, listo 5.4, atención 4.7 y error 5.2 sobre blanco.

### Lo propio de Sirio

- **La estrella de cuatro puntas** sigue siendo la marca. En reposo es tinta; cuando Sirio trabaja pasa a cian y titila despacio. Es la única animación en bucle.
- **Voz.** Español de México, tuteando, frases cortas. Sirio habla en primera persona.
- **Densidad.** Cuerpo de 13 a 14 px dentro de la app; es una herramienta de trabajo, no una portada.

### Qué cambia respecto a la maqueta

| En la maqueta | Ahora |
| --- | --- |
| Degradado de cielo como fondo | Fondo plano `--fondo` con retícula tenue |
| Paneles de vidrio translúcido | Superficies blancas con borde de línea |
| Botones y pestañas en píldora | Radio de 14 px; píldora solo en etiquetas de estado |
| Hanken Grotesk y Geist Mono | Manrope y DM Mono |
| Tinta `#0B1220`, sin acento | Tinta `#1A1F36` y acento cian |
| Bloques pastel lila, menta y durazno en la portada | Superficies neutras con detalles en acento |
| Estructura de pestañas Inicio, Contenido y Operar calcada de Home, Build y Run | Barra lateral con Hoy, Objetivo, Contenido, Actividad y Negocio; ver [`estructura-app.md`](estructura-app.md) |

### La estructura

La disposición de las pantallas también dejó de seguir a Foundable. Está definida en [`estructura-app.md`](estructura-app.md): barra lateral con cinco secciones, panel de Sirio a la derecha y vistas que salen de la promesa del producto.
