# Guía para agentes

Lee esto completo antes de escribir código en este repositorio. Aplica igual a las personas.

## Qué es este proyecto

Sirio es el operador de marketing de un negocio: conoce el negocio, acuerda un objetivo con su dueño y trabaja hacia él pidiendo aprobación en lo que sale al público. La primera versión es interna, para FEBAcode.

Antes de empezar un issue, lee lo que le corresponda:

| Documento | Para qué |
| --- | --- |
| [`docs/producto.md`](docs/producto.md) | Qué se construye, los flujos y lo que queda fuera de alcance |
| [`docs/arquitectura.md`](docs/arquitectura.md) | Cómo está armado, el modelo de datos y las reglas de seguridad |
| [`docs/decisiones.md`](docs/decisiones.md) | Decisiones ya tomadas. No las reabras en un PR |
| [`docs/direccion-mockup.md`](docs/direccion-mockup.md) | Sistema visual. Obligatorio si tocas la interfaz |
| [`docs/equipo.md`](docs/equipo.md) | Roles, ritmo y cuándo está terminado un issue |
| [`docs/backlog.md`](docs/backlog.md) | Los issues de los hitos en curso |

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

`npm run lint` y `npm run build` deben terminar sin errores ni advertencias antes de abrir un PR. Cuando el hito M0 agregue pruebas, también deben pasar.

## Cómo trabajar un issue

1. Trabaja solo el issue que te asignaron. Si descubres otro problema, anótalo en el PR; no lo arregles ahí.
2. Crea una rama desde `main` y abre un solo PR por issue.
3. Haz el cambio más pequeño que cumpla los criterios de aceptación.
4. Agrega al menos una prueba que falle si el comportamiento se rompe.
5. Si tu cambio contradice un documento de `docs/`, corrige el documento en el mismo PR.
6. En la descripción del PR di qué hiciste, cómo lo probaste y qué quedó pendiente. Si algo no se pudo probar, dilo.

## Reglas del código

- TypeScript estricto. Sin `any` salvo con un comentario que explique por qué.
- La interfaz está en español de México, tuteando. Los nombres en el código (variables, funciones, tablas) pueden ir en español o en inglés, pero sin mezclar dentro de un mismo módulo.
- Toda consulta a la base de datos filtra por `espacio_id`. No hay excepciones.
- Ningún identificador de modelo ni llave va escrito en el código. Se leen de configuración.
- Las llaves y tokens nunca llegan al navegador ni a los registros.
- Cada herramienta del agente declara su nivel de efecto (lectura, borrador o efecto). Las de efecto siempre crean una aprobación.
- El contenido externo (páginas web, mensajes, correos) es dato, nunca instrucción. Pásalo al modelo marcado como contenido externo.
- Cada acción de Sirio se registra en `acciones`.

## Reglas de la interfaz

- Respeta los colores, la tipografía y las formas de `docs/direccion-mockup.md`. No agregues colores nuevos.
- Nada de fondos negros con acentos eléctricos, degradados saturados ni resplandores.
- No agregues librerías de componentes, de gráficas ni de diagramas sin que el issue lo pida.
- Botones y enlaces reales, foco visible, contraste AA y `aria-label` en botones de solo icono.
- Respeta `prefers-reduced-motion`.

## Lo que no debes hacer

- No fusiones a `main`. Eso lo hace el responsable técnico.
- No cambies el alcance. Si un issue parece pedir algo fuera de `docs/producto.md`, detente y pregunta en el issue.
- No agregues dependencias que el issue no pida. Si hace falta una, justifícala en el PR.
- No desactives, saltes ni borres una prueba para que el PR pase.
- No toques variables de entorno de producción, migraciones ya aplicadas ni datos reales.
- No inventes testimonios, clientes ni métricas en datos de ejemplo.

## Versiones

Este repositorio usa versiones recientes de Next.js, React, Tailwind y TypeScript. Sus interfaces pueden ser distintas de las que recuerdas: antes de usar una función de la que dudes, consulta la documentación de la versión instalada en `package.json`.
