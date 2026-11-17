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

"Recomendado, sin objeción" significa que se propuso en el documento de dirección y nadie lo ha cuestionado. Si alguien no está de acuerdo, este es el lugar para decirlo.
