// Identificadores para lo que se crea en el cliente durante la demo.
let contador = 1000;

export function nuevoId(prefijo: string) {
  contador += 1;
  return `${prefijo}${contador}`;
}
