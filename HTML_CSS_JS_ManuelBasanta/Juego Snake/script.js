//Elementos del HTML
const board = document.getElementById("board");
const scoreBoard = document.getElementById("scoreBoard");
const startButton = document.getElementById("start");
const gameOverSign = document.getElementById("gameOver");

//Game Settings
const boardSize = 10; //tamaño del tablero
const gameSpeed = 100; //Velocidad del juego
const squareTypes = {
  emptySquare: 0,
  snakeSquare: 1,
  foodSquare: 2,
};
const directions = {
  ArrowUp: -10,
  ArrowDown: 10,
  ArrowRight: 1,
  ArrowLeft: -1,
};

//Variables del Juego
let snake; //Array de los valores que ocupa la serpiente
let score; //puntos del usuario
let direction; //Direccion de la serpiente
let boarSquares; //Array del tablero
let emptySquares; //Array de lugares vacios para generar la comida de la serpiente
let moveInterval; //Intervalo de tiempo para iterar el movimiento de la serpiente

const drawSquare = (square, type) => {
  const [row, column] = square.split(""); //Separa cada fila de cada columna de las cordenadas introducidad. Ej: coordenada (02) las separa en (0 2)
  boardSquares[row][column] = squareTypes[type]; //Cambia el tipo de cuadrado (estado) al que se necesite (serpiente, comida, o vacio)
  const squareElement = document.getElementById(square); //Extraemos el id del cuadrado asignado en el html al crear el board
  squareElement.setAttribute("class", `square${type}`); //Cambiamos el tipo de ese cuadrado en el html para modificarle el color que se establecio en el css

  //Condicional para agregar o sacar elementos del array emptySquares
  if (type === "emptySquare") {
    emptySquares.push(square); //Si ha sido creado un cuadrado vacio, se añade al array de caudrados vacios (emptySquares)
  } else {
    if (emptySquares.indexOf(square) !== -1) {
      //Busca dentro del array(emptySquares) si existe ese cuadrado mediante la funcion indexOf. La funcion devuelve 1 si existe y -1 cuando no
      emptySquares.splice(emptySquares.indexOf(square), 1);
      // Mediante la función .splice(indiceInicio, cantidadAEliminar) eliminamos del array el valor de "square".
      // Con indexOf buscamos el índice donde se encuentra "square" para poder eliminarlo correctamente.
    }
  }
};

const createBoard = () => {
  boardSquares.forEach((row, rowIndex) => {
    //Recorre cada fila(row) del array y extrae su indice (rowIndex)
    row.forEach((column, columnIndex) => {
      //Recorre cada elemento(column) dentro de cada fila(row) y extrae su indice (columnIndex)
      const squareValue = `${rowIndex}${columnIndex}`; //Creacion de una constante donde se asigan las coordenadas (valor del row + columna) (00, 01, 02, 03,...)
      const squareElement = document.createElement("div"); //creacion de un div en las coordenadas segun la iteracion del forEach
      squareElement.setAttribute("class", "square emptySquare"); //Asignacion de clase al div
      squareElement.setAttribute("id", squareValue); //Asignacion de un id al div con las coordenadas extraidas anteriormente
      board.appendChild(squareElement); //Agregar cada que se crea un div al board
      emptySquares.push(squareValue); //Añade al array el identificador(coordenadas) de cada cuadrado vacío recién creado: [00, 01, 02, 03, 04, 05,...]
    });
  });
};

const setGame = () => {
  snake = ["00", "01", "02", "03"]; //Creacion inicial de la serpiente
  score = snake.length; //Puntuacion es igual al largo de la serpiente
  direction = "ArrowRight"; //Movimiento inicial hacia la derecha
  boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare)); //Creacion de un array del tamaño del tablero (10) y a cada uno de esos elementos del array se le pasa la funcion para que sean otro array, este se rellena de 0 (squareTypes.emptySquare) con .fill

  console.log(boardSquares);
  //resetear valores cada vez que se pulsa el boton start
  board.innerHTML = " ";
  emptySquares = [];

  createBoard();
};

const startGame = () => {
  setGame();
  gameOverSign.style.display = "none"; //Resetear el display del game over para cuando se juega mas de 1 partida consecutiva
  startButton.disabled = true; //Desabilitar el boton de start mientras esta jugando el usuario
  drawSnake();
};
startButton.addEventListener("click", startGame);
