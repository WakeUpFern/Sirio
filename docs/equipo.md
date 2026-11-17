# Sirio: equipo, roles y ritmo

Cómo trabajamos para que Sirio avance cada semana. El equipo inicial es de cuatro personas, con agentes de IA (Opus) haciendo la mayor parte del código.

## Roles

Un rol es una responsabilidad, no un puesto. Una persona puede tener más de uno, pero cada rol tiene un solo responsable.

| Rol | Responsable | Qué decide y qué entrega |
| --- | --- | --- |
| Dirección de producto | Fernando | Qué entra a cada hito y en qué orden. Aprueba cambios a `producto.md` |
| Responsable técnico | Fernando | Revisa y fusiona cada PR. Cuida la arquitectura y las decisiones. Es el único que fusiona a `main` |
| Diseño | Por asignar | Cuida que lo nuevo respete `direccion-mockup.md`. Revisa cada PR que toca la interfaz |
| Uso real | Por asignar (quien lleva el marketing de FEBA) | Usa Sirio cada semana con trabajo verdadero y reporta qué sirvió y qué no |
| Construcción | Por asignar, con agentes | Toma issues, lanza agentes, revisa su resultado antes de pedir revisión |

Fernando lleva dos roles al inicio. El primero que conviene delegar es la dirección de producto del día a día, porque revisar cada PR ya es una carga constante.

### Qué hacen los agentes

Todo el trabajo de agentes se hace con Opus, ajustando el nivel de esfuerzo a la complejidad de la tarea. Así hay un solo modelo que conocer y el costo se controla con el esfuerzo, no cambiando de modelo.

| Trabajo | Nivel de esfuerzo |
| --- | --- |
| Investigar, leer documentación, analizar referencias, cambios de texto o estilo | Bajo |
| Construir un issue normal y abrir su PR; revisar un PR antes de la revisión humana | Medio |
| Issues que tocan el agente, la memoria, la seguridad o varias partes a la vez | Alto |
| Escribir y mantener la especificación, partir el trabajo en issues, decisiones de arquitectura | Alto o muy alto, con aprobación de Fernando |

Quien lanza al agente elige el nivel al tomar el issue. Si un agente falla dos veces en el mismo issue, se sube un nivel antes de intentarlo de nuevo. El agente que revisa un PR es siempre una sesión distinta de la que lo construyó.

Ningún agente fusiona a `main`, cambia variables de entorno de producción ni decide el alcance.

## Ritmo semanal

| Día | Qué pasa | Cuánto dura |
| --- | --- | --- |
| Lunes | Planeación: se eligen los issues de la semana y quién los lleva | 30 minutos |
| Lunes a jueves | Los agentes construyen y abren PRs. Cada PR pasa las pruebas automáticas, una revisión de agente y la revisión de Fernando | Continuo |
| Viernes | Demo en el entorno desplegado. Quien tiene el rol de uso real cuenta su semana con Sirio | 30 minutos |
| Viernes | Se actualiza el backlog con lo aprendido | 15 minutos |

## Reglas de trabajo

1. **Todo trabajo es un issue.** Si no está en el backlog, primero se escribe el issue.
2. **Un issue es una rebanada que se ve funcionando.** Si no se puede demostrar en el entorno desplegado, está mal cortado.
3. **Un issue, un PR.** Los PRs pequeños se revisan en minutos; los grandes se quedan sin revisar.
4. **Las pruebas automáticas son el filtro.** Un PR con pruebas en rojo no se revisa.
5. **Los documentos se actualizan en el mismo PR.** Si un cambio contradice `producto.md` o `arquitectura.md`, el PR los corrige.
6. **Las decisiones nuevas van a `decisiones.md`.** Con su porqué, en una línea.

## Cuándo está terminado un issue

- Cumple sus criterios de aceptación.
- `npm run lint`, `npm run build` y las pruebas pasan.
- Tiene al menos una prueba que falla si el comportamiento se rompe.
- Se puede ver funcionando en la vista previa del PR.
- Respeta la dirección de diseño si toca la interfaz.
- Fernando lo revisó y lo fusionó.

## Lo que falta definir

- Nombres para los roles de diseño, uso real y construcción.
- Horas por semana de cada persona. Las fechas de `producto.md` son una propuesta hasta tener este dato.
