let dia = Math.floor(Math.random() * 7);
let horaActual = Math.floor(Math.random() * 24);

const diasSemana = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miercoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sabado",
};

console.log(diasSemana[dia]);
console.log(`${horaActual}:00 horas`);

let horaApertura;
let mensaje;

// if ([0, 6].includes(dia)) {
//   console.log("Fin de Semana");
//   horaApertura = 9;
// } else {
//   console.log("Dia de semana");
//   horaApertura = 11;
// }

console.log("=====Operadores Ternarios=======");
horaApertura = [0, 6].includes(dia) ? 9 : 11;
console.log(`Hora de apertura: ${horaApertura}`);

mensaje = horaActual >= horaApertura ? "Esta Abierto" : `Esta Cerrado, abrimos a las ${horaApertura}`;
console.log(mensaje);

let diaTernario = dia === 0 ? "domingo" : dia === 1 ? "Lunes" : dia === 2 ? "martes" : dia === 3 ? "Miercoles" : dia === 4 ? "Jueves" : dia === 5 ? "Viernes" : "Sabado";

console.log(`Dia de la semana utilizando Ternatrios: ${diaTernario}`);
