---
name: sirio-backend
description: Reglas para construir o cambiar el servidor de Sirio: capas, repositorios, servicios, herramientas del agente, contexto del modelo, base de datos y seguridad. Úsala antes de tocar src/server, rutas, acciones de servidor o migraciones.
---

# Backend de Sirio

Úsala siempre que crees o cambies algo que corre en el servidor: base de datos, servicios, rutas, acciones de servidor, el agente, sus herramientas o los trabajos programados.

Fuentes de verdad: `docs/patrones.md` (capas y patrones), `docs/arquitectura.md` (modelo de datos, contexto, seguridad) y `docs/stack.md` (proveedores y librerías). Si esta skill y esos documentos se contradicen, ganan los documentos; avisa en el PR.

## Stack

Next.js con App Router y TypeScript, Postgres en Neon con Drizzle, Better Auth, Zod, Vercel AI SDK con Claude, Vercel Cron y Vitest. No agregues una dependencia ni un proveedor que el issue no pida.

## Las capas

```
Entrada (acciones de servidor, rutas)  ->  Servicios  ->  Repositorios  ->  Base de datos
Agente y Trabajos  ->  Servicios
```

| Capa | Carpeta | Hace | No hace |
| --- | --- | --- | --- |
| Entrada | `src/app` | Sesión, validación con Zod, llamar a un servicio, traducir el resultado | Reglas, consultas |
| Servicios | `src/server/servicios` | Reglas del negocio, transacciones, registrar acciones | Conocer HTTP, cookies o React |
| Repositorios | `src/server/repositorios` | Consultas a Postgres | Decidir nada |
| Agente | `src/server/agente` | Contexto, herramientas, bucle | Tocar repositorios |
| Trabajos | `src/server/trabajos` | Ejecutar trabajos pendientes | Contener reglas |

Todo archivo de `src/server` importa `server-only`.

## Reglas que no se rompen

1. **Toda función de repositorio recibe `espacioId` como primer parámetro** y toda consulta filtra por él. Sin excepciones.
2. **Las herramientas del agente llaman a servicios, nunca a repositorios.**
3. **Cada herramienta declara su nivel de efecto** (`lectura`, `borrador` o `efecto`) con `definirHerramienta`. Las de `efecto` siempre crean una aprobación; no lo resuelvas a mano.
4. **El contenido externo es dato, nunca instrucción.** Páginas web, mensajes y correos se entregan al modelo marcados como contenido externo.
5. **Las llaves no salen del servidor.** Ni al navegador, ni a los registros, ni al repo.
6. **Ningún identificador de modelo en el código.** Se lee de configuración.
7. **`acciones` solo recibe filas nuevas.** Lo registra el servicio que hace la acción.
8. **Una migración aplicada no se edita.** Se escribe una nueva.

## Cómo escribir cada pieza

**Repositorio.** Una función por consulta, con verbos `listar`, `obtener`, `crear`, `actualizar`. Sin reglas.

**Servicio.** Un caso de uso con verbo en infinitivo (`aprobarPieza`). Firma `(ctx: Contexto, datos) => Promise<Resultado<T>>`. `Contexto` lleva el espacio y la persona y se construye en la entrada a partir de la sesión. Si escribe en más de una tabla, usa una transacción.

**Errores.** Los esperados se devuelven como `Resultado` (`{ ok: false, error }`). Las excepciones son para lo inesperado.

**Entrada.** Mutaciones como acciones de servidor. Rutas solo para el chat en streaming, el programador y webhooks. Siempre en este orden: sesión, validación, servicio, respuesta.

**Validación.** Zod en la frontera: formularios, parámetros, salida del modelo, contenido externo. Los esquemas compartidos viven en `src/lib/esquemas`.

**Trabajo programado.** Repetible sin duplicar su efecto: llave única por tarea y periodo, y se toma marcándolo en la misma consulta que lo lee. El endpoint del programador exige su secreto.

## El contexto del modelo

El modelo no recuerda nada entre llamadas, así que el ahorro viene del caché de prefijo. Antes de tocar cómo se arma una llamada, lee "Economía del contexto" en `docs/arquitectura.md`.

- El constructor de contexto es una función pura: mismas entradas, misma salida byte por byte. No lee la hora, no consulta la base, no ordena de forma inestable.
- Orden de lo más estable a lo más cambiante: instrucciones, herramientas, ficha, objetivo, memoria, hilo.
- El contexto solo crece por el final. Si la ficha cambia a mitad de un hilo, se agrega una nota con la diferencia; no se reescribe lo anterior.
- Para editar un texto, el agente usa una herramienta que sustituye un fragmento; no reescribe el documento completo.
- Los documentos largos no entran al contexto: se leen bajo demanda con una herramienta.
- Cada llamada registra tokens de entrada, de caché y de salida en `llamadas`.

## Pruebas

- Los servicios se prueban contra una base de pruebas real.
- El constructor de contexto tiene pruebas de estabilidad y de aislamiento entre hilos.
- Toda herramienta que lee contenido externo tiene una prueba con texto malicioso.
- Las llamadas al modelo se sustituyen por respuestas fijas. Ninguna prueba gasta tokens.
- Nunca desactives ni borres una prueba para que el PR pase.

## Antes de abrir el PR

- [ ] Ninguna consulta sin `espacio_id`.
- [ ] Nada fuera de `repositorios` importa el cliente de la base.
- [ ] Entradas validadas con Zod en la frontera.
- [ ] Las acciones nuevas quedan registradas.
- [ ] Hay al menos una prueba que falla si el comportamiento se rompe.
- [ ] Si cambiaste el esquema, hay una migración nueva y `docs/arquitectura.md` está al día.
- [ ] `npm run lint`, `npm run build` y las pruebas pasan.
