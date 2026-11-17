# Sirio: patrones y separación de responsabilidades

Dónde va cada cosa y qué puede hablar con qué. Estas reglas existen para que cuatro personas y muchos agentes escriban código que parezca de una sola mano, y para que un error de un agente quede contenido en una capa.

## Las capas

Cada capa solo conoce a la que tiene debajo.

```
Interfaz        src/app (páginas)  y  src/components
   |
Entrada         src/app (acciones de servidor y rutas)
   |
Servicios       src/server/servicios        <- reglas del negocio
   |
Repositorios    src/server/repositorios     <- único lugar con consultas
   |
Base de datos   src/server/db               <- esquema, cliente, migraciones

Agente          src/server/agente           <- usa Servicios, nunca Repositorios
Trabajos        src/server/trabajos         <- usa Servicios y Agente
Compartido      src/lib                     <- esquemas, tipos y funciones puras
```

| Capa | Responsabilidad | No puede |
| --- | --- | --- |
| Componentes | Mostrar datos que recibe y emitir eventos | Consultar la base, llamar al modelo, contener reglas del negocio |
| Páginas | Obtener datos llamando a servicios y componer componentes | Contener consultas ni reglas |
| Entrada | Verificar la sesión, validar con Zod, llamar a un servicio y traducir el resultado | Contener reglas ni consultas |
| Servicios | Las reglas: qué se puede hacer, en qué orden, qué se registra | Conocer HTTP, cookies o React |
| Repositorios | Leer y escribir en Postgres | Decidir nada; solo consultan |
| Agente | Armar el contexto, definir herramientas, ejecutar el bucle | Consultar la base directo; va por servicios |
| Trabajos | Tomar un trabajo pendiente y ejecutarlo | Contener reglas; llaman a servicios |
| Compartido | Esquemas Zod, tipos y utilidades puras | Importar nada de `src/server` |

Todo lo que está en `src/server` importa `server-only`, de modo que el build falla si un componente de cliente lo importa por error. Una regla de ESLint impide que `src/components` importe de `src/server` y que algo fuera de `repositorios` importe el cliente de la base.

## Patrones del backend

### Repositorio

Una función por consulta, y el espacio siempre es el primer parámetro.

```ts
// src/server/repositorios/hilos.ts
export async function listarHilos(espacioId: string, estado: EstadoHilo) { … }
```

No existe una función de repositorio sin `espacioId`. Es lo que impide que los datos de un negocio se filtren a otro.

### Servicio

Un servicio es un caso de uso con nombre de verbo: `archivarHilo`, `confirmarFicha`, `aprobarPieza`. Recibe datos ya validados y el contexto de quién actúa, aplica las reglas, llama a los repositorios dentro de una transacción si escribe en más de una tabla y registra la acción.

```ts
export async function aprobarPieza(ctx: Contexto, piezaId: string): Promise<Resultado<Pieza>> { … }
```

`Contexto` lleva el espacio y la persona. Se construye una sola vez en la capa de entrada, a partir de la sesión.

### Resultado en lugar de excepciones

Los errores esperados (no existe, no tienes permiso, ya estaba aprobado) se devuelven como valor, no se lanzan.

```ts
type Resultado<T> = { ok: true; valor: T } | { ok: false; error: ErrorDeNegocio };
```

Las excepciones quedan para lo inesperado: la base no responde, el proveedor falló. Así la interfaz siempre sabe qué mensaje mostrar.

### Validar en la frontera

Todo lo que entra se valida con Zod en el punto de entrada: formularios, parámetros de ruta, salida del modelo y contenido externo. De ahí hacia dentro, los tipos se dan por buenos y no se vuelve a validar.

### Entrada delgada

Las mutaciones desde la interfaz son acciones de servidor. Las rutas se usan solo para el chat en streaming, el programador y los webhooks. Ambas hacen cuatro cosas y nada más: sesión, validación, servicio, respuesta.

### Herramientas del agente

Cada herramienta es un archivo en `src/server/agente/herramientas` con la misma forma: nombre, descripción, esquema de entrada, nivel de efecto y una función que llama a un servicio.

```ts
export const guardarPieza = definirHerramienta({
  nombre: "guardar_pieza",
  efecto: "borrador",            // "lectura" | "borrador" | "efecto"
  entrada: esquemaPieza,
  ejecutar: (ctx, datos) => servicios.piezas.crearBorrador(ctx, datos),
});
```

`definirHerramienta` es el único camino para registrar una herramienta. Si el nivel es `efecto`, envuelve la ejecución en una aprobación sin que la herramienta tenga que acordarse. Las herramientas nunca tocan repositorios.

### Constructor de contexto

Una función pura recibe la ficha, el objetivo, la memoria y el hilo, y devuelve la solicitud al modelo. Para las mismas entradas produce exactamente la misma salida, byte por byte. No lee la hora, no consulta la base y no ordena nada de forma inestable. Es lo que hace funcionar el caché; el detalle está en "Economía del contexto" de [`arquitectura.md`](arquitectura.md).

### Registro de acciones

`acciones` solo recibe filas nuevas. Nunca se edita ni se borra. El servicio que hace algo es quien registra, no la herramienta ni la ruta.

### Trabajos repetibles

Ejecutar dos veces el mismo trabajo no debe duplicar su efecto. Cada trabajo tiene una llave única por tarea y periodo, y el programador toma un trabajo marcándolo en la misma consulta que lo lee.

## Patrones del frontend

### Servidor por defecto

Un componente es de servidor salvo que necesite estado, eventos o APIs del navegador. `"use client"` va lo más abajo posible en el árbol: en el botón, no en la página.

### Tres tipos de componente

| Tipo | Dónde | Qué es |
| --- | --- | --- |
| Primitivos | `src/components/ui` | Botón, campo, tarjeta, etiqueta, diálogo. Sin conocimiento del producto. Implementan el sistema de diseño |
| De dominio | `src/components/<dominio>` | Tarjeta de pieza, fila de hilo, tarjeta de aprobación. Reciben datos por propiedades |
| Vistas | `src/components/views` | Componen los anteriores para una pantalla |

Un primitivo nuevo solo se crea si el sistema de diseño lo define. Si falta uno, primero se agrega a [`sistema-diseno.md`](sistema-diseno.md).

### Variantes, no estilos sueltos

Los primitivos exponen variantes con nombre (`variante="principal"`, `tamano="app"`). Quien usa un botón no le pasa clases de color ni de radio. Ningún componente escribe un color directo: todo sale de las variables CSS.

### Cuatro estados por vista

Toda vista que muestra datos define cómo se ve cargando, vacía, con error y con datos. El estado vacío dice qué hacer a continuación, no solo que no hay nada.

### Dónde vive el estado

| Estado | Dónde |
| --- | --- |
| Datos del negocio | En el servidor. Se leen en componentes de servidor y se refrescan tras cada acción |
| Filtro, pestaña, elemento seleccionado | En la URL, para que se pueda compartir y sobreviva a recargar |
| Lo efímero de la interfaz (un menú abierto, un borrador sin enviar) | En el componente |
| El chat en curso | El gancho de chat del AI SDK, dentro de la columna de chat |

No hay un almacén global. El contexto de la maqueta en `src/lib/store.tsx` se va vaciando conforme cada parte pasa a datos reales.

### Respuesta inmediata

Aprobar, rechazar y archivar se reflejan en la interfaz al instante y se revierten con un aviso si el servidor falla.

## Nombres

- Carpetas y archivos en minúsculas con guiones; componentes en PascalCase.
- Tablas y columnas en español y `snake_case`. Código de dominio en español (`aprobarPieza`, `Hilo`); lo técnico y genérico puede ir en inglés (`Button`, `useDebounce`).
- Servicios con verbo en infinitivo. Repositorios con `listar`, `obtener`, `crear`, `actualizar`.
- Un archivo, una responsabilidad. Si un archivo pasa de unas 300 líneas, probablemente son dos.

## Pruebas

| Qué | Cómo |
| --- | --- |
| Servicios | Pruebas unitarias contra una base de pruebas real. Es donde están las reglas, así que es donde hay más pruebas |
| Constructor de contexto | Pruebas de que la salida es estable y de que un hilo nuevo no recibe mensajes de otro |
| Herramientas | Pruebas de que respetan su nivel de efecto y de que el contenido externo no se obedece |
| Flujos | Una prueba de punta a punta por flujo de `producto.md` |
| Componentes | Solo los primitivos y lo que tenga lógica propia |

Las llamadas al modelo se sustituyen por respuestas fijas en las pruebas. Ninguna prueba automática gasta tokens.
