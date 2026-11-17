---
name: sirio-frontend
description: Reglas para construir o cambiar interfaz en Sirio y otros productos de FEBAcode: sistema de diseño, botones, movimiento y patrones de componentes. Úsala antes de tocar cualquier archivo de src/app o src/components.
---

# Frontend de Sirio

Úsala siempre que crees o cambies algo que se ve: páginas, componentes, estilos, textos de la interfaz.

Fuentes de verdad, en este orden: `docs/sistema-diseno.md` (cómo se ve), `docs/patrones.md` sección "Patrones del frontend" (cómo se organiza) y `docs/producto.md` (qué hace). Si esta skill y esos documentos se contradicen, ganan los documentos; avisa en el PR.

## Antes de escribir

1. Lee el issue y localiza la vista y los componentes que toca.
2. Busca si ya existe un primitivo en `src/components/ui` que sirva. Casi siempre existe.
3. Si necesitas un primitivo o un color que no está en el sistema de diseño, detente: primero se agrega a `docs/sistema-diseno.md` en el mismo PR y se explica por qué.

## Identidad FEBAcode

La regla es: base neutra y suave, tinta FEBA para el texto y un solo color de acento del logo por producto. En Sirio el acento es el cian.

| Variable | Valor | Uso |
| --- | --- | --- |
| `--tinta` | `#1A1F36` | Texto principal, botón sólido |
| `--tinta-2` | `#4C5062` | Texto de apoyo |
| `--tinta-3` | `#6B7085` | Etiquetas, horas, placeholders |
| `--linea` | `#E3E5EC` | Bordes de 1 px |
| `--fondo` | `#F6F7F9` | Fondo de la app |
| `--superficie` | `#FFFFFF` | Tarjetas y paneles |
| `--superficie-2` | `#EEF0F4` | Zonas hundidas, fila al pasar el cursor |
| `--acento` | `#00BFD8` | Botón principal, elemento activo |
| `--acento-texto` | `#00788A` | Enlaces e iconos en acento sobre claro |
| `--acento-suave` | `#E0F7FA` | Selección, avisos informativos |
| `--listo` | `#18794C` | Hecho, conectado |
| `--atencion` | `#A8641A` | Espera aprobación |
| `--error` | `#C8372D` | Falló, rechazar |

- Nunca escribas un color directo en un componente. Usa las variables.
- El acento ocupa como mucho una décima parte de la pantalla.
- El texto sobre acento es tinta, nunca blanco (el blanco no alcanza el contraste mínimo).
- El coral del logo (`#F65F4C`) no se usa en Sirio fuera del logo de FEBAcode.
- Sin degradados saturados, resplandores, fondos negros, cielos ni paneles de vidrio.

Tipografía: Manrope variable para todo (títulos 800 con tracking negativo, cuerpo 400 a 500, botones 700) y DM Mono para horas, cifras y atajos. Dentro de la app el cuerpo es de 13 a 14 px.

Radios: 14 px en botones y campos, 16 px en tarjetas y paneles, 20 px en diálogos y marcos grandes, 8 px en chips. La píldora completa solo en etiquetas de estado y contadores.

## Botones

Cuatro variantes: principal (fondo acento, texto tinta, una por vista), sólido (fondo tinta, texto blanco), contorno (borde de línea, texto tinta) y texto (sin fondo, subrayado en acento al pasar el cursor). Alto de 36 px en la app y 44 px en portadas y diálogos.

| Estado | Comportamiento |
| --- | --- |
| Cursor encima | Sube 1 px y la sombra crece, 150 ms |
| Presionado | Vuelve a su sitio y escala a 0.98, 80 ms |
| Foco con teclado | Anillo de 2 px en acento, separado 2 px |
| Cargando | Indicador en lugar del texto, sin cambiar el ancho |
| Deshabilitado | Opacidad 50 %, sin sombra ni movimiento |

Curva: `cubic-bezier(0.2, 0.8, 0.2, 1)`. Anima solo `transform`, `box-shadow`, `opacity` y color.

## Movimiento

- Lo que aparece: desvanecido con 4 px de desplazamiento, 200 ms.
- Cambios de estado: 150 ms. Nada pasa de 300 ms.
- La única animación en bucle es la estrella cuando Sirio trabaja.
- Respeta `prefers-reduced-motion`: sin desplazamiento ni escala.

## Cómo organizar el código

- Componente de servidor por defecto. `"use client"` lo más abajo posible.
- Primitivos en `src/components/ui`, componentes de dominio en `src/components/<dominio>`, vistas en `src/components/views`.
- Los primitivos exponen variantes con nombre. Quien los usa no pasa clases de color ni de radio.
- Un componente no consulta la base, no llama al modelo y no contiene reglas del negocio. Nunca importes de `src/server` desde `src/components`.
- Las mutaciones son acciones de servidor. Aprobar, rechazar y archivar se reflejan al instante y se revierten si el servidor falla.
- Estado: datos del negocio en el servidor; filtro, pestaña y selección en la URL; lo efímero en el componente. Sin almacén global nuevo.
- Toda vista con datos define sus cuatro estados: cargando, vacía, con error y con datos. El estado vacío dice qué hacer después.

## Textos

Español de México, tuteando, frases cortas y verbos claros. Sirio habla en primera persona. Los botones dicen lo que hacen ("Aprobar", "Archivar hilo"), no "Aceptar" ni "OK". Los errores dicen qué pasó y qué hacer.

## Accesibilidad

Botones y enlaces reales, foco visible, contraste AA, `aria-label` en botones de solo icono y áreas de toque de al menos 36 px.

## Antes de abrir el PR

- [ ] Ningún color, radio ni duración escrito directo; todo sale de variables o de un primitivo.
- [ ] Los cuatro estados de la vista existen.
- [ ] Se puede usar solo con teclado y el foco se ve.
- [ ] Funciona de 1280 a 1920 px y no se rompe por debajo de 1024 px.
- [ ] `npm run lint`, `npm run build` y las pruebas pasan.
- [ ] El PR incluye una captura de la vista cambiada.
