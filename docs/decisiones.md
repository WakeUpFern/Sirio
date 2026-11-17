# Sirio: registro de decisiones

Cada decisión que ya se tomó, con su porqué, para no volver a discutirla sin información nueva. Para cambiar una, se agrega una entrada que la sustituye; no se borra la anterior.

| N.º | Fecha | Decisión | Por qué | Estado |
| --- | --- | --- | --- | --- |
| D1 | 2026-11-12 | Sirio es el operador de marketing de un negocio, no un asistente personal | Los asistentes generalistas ya los ofrecen Meta, Google y OpenAI. Ninguno lleva el marketing de un negocio de punta a punta, y Meta Muse no está disponible en México | Decidido por Fernando |
| D2 | 2026-11-12 | El núcleo del agente es Vercel AI SDK | Es TypeScript, nativo de Next.js y funciona con varios proveedores de modelos. Claude Agent SDK solo usa Claude y está pensado para procesos de larga duración | Decidido por Fernando |
| D3 | 2026-11-12 | No se hace fork de Hermes Agent ni de OpenClaw | Son para un solo usuario en su propia máquina, no separan clientes y son bases enormes de mantener. OpenClaw tiene además un historial de seguridad serio. Hermes se usa como referencia de diseño | Recomendado, sin objeción |
| D4 | 2026-11-12 | El arranque es una fuente, una ficha que Sirio redacta y máximo tres preguntas | Leer antes de preguntar da valor más rápido que un cuestionario. Es una hipótesis: se mide con los primeros usuarios | Recomendado, sin objeción |
| D5 | 2026-11-12 | El negocio es un espacio permanente con memoria; las conversaciones son hilos cortos por tarea | Un chat único crece hasta degradarse. Si lo que Sirio sabe vive fuera del chat, ningún hilo necesita cargar todo el historial | Recomendado, sin objeción |
| D6 | 2026-11-12 | Todo lo que sale al público pasa por aprobación humana | La inyección de instrucciones en contenido externo no tiene solución confiable. El nivel de efecto de cada herramienta se define en el código | Recomendado, sin objeción |
| D7 | 2026-11-16 | Fernando es el responsable técnico y el equipo inicial es de cuatro personas | Hace falta una persona que revise y fusione cada cambio | Decidido por Fernando |
| D8 | 2026-11-16 | La especificación vive en el repo como documentos cortos y un backlog, no como un SRS | Un SRS largo se desactualiza. Los documentos cortos los leen igual personas y agentes | Propuesto en este PR |
| D9 | 2026-11-16 | Los agentes que construyen Sirio usan Opus con el nivel de esfuerzo según la complejidad; no se usa Fable | Fable solo está disponible por API. Un solo modelo con esfuerzo variable es más simple de operar que varios modelos | Decidido por Fernando |
| D10 | 2026-11-17 | No se construye un control de versiones propio para el contexto del modelo | El modelo no guarda estado entre llamadas, así que no se le puede enviar solo lo nuevo. El ahorro viene del caché de prefijo, de editar con parches y de leer bajo demanda. Las versiones se guardan en Postgres para las personas | Propuesto en este PR |
| D11 | 2026-11-16 | La interfaz deja de basarse en Foundable y sigue el sistema de diseño FEBAcode: base neutra, tinta FEBA y un acento del logo por producto | Un clon de otra interfaz puede traer problemas al lanzar. La identidad debe salir de la marca propia y servir a futuros proyectos | Decidido por Fernando; el detalle es propuesta de este PR |
| D12 | 2026-11-16 | El acento de Sirio es el cian del logo (`#00BFD8`) | No compite con los colores de error y atención, y es el color de la estrella. El coral queda para el sitio de FEBAcode | Propuesto en este PR |
| D13 | 2026-11-16 | Base de datos en Neon con Drizzle, cuentas con Better Auth, pruebas con Vitest y Playwright | Pocas piezas, sin servidor propio, y una copia de la base por PR | Propuesto en este PR |
| D14 | 2026-11-16 | El código se organiza en capas: entrada, servicios, repositorios; el agente usa servicios | Contiene los errores en una capa y hace que el trabajo de muchos agentes sea uniforme | Propuesto en este PR |

"Recomendado, sin objeción" significa que se propuso en el documento de dirección y nadie lo ha cuestionado. Si alguien no está de acuerdo, este es el lugar para decirlo.
