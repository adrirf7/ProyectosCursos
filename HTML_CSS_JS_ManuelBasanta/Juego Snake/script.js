//Elementos del HTML
const board = document.getElementById("board");
const scoreBoard = document.getElementById("scoreBoard");
const startButton = document.getElementById("start");
const gameOverSign = document.getElementById("gameOver");
const sizeSelector = document.getElementById("sizeSelector");

const eatSounds = [new Audio("audio/c6-102822.mp3"), new Audio("audio/d6-82020.mp3"), new Audio("audio/f6-102819.mp3"), new Audio("audio/g6-82013.mp3")];
//Game Settings
let boardSize; //Tamaño del tablero

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
let boardSquares; //Array del tablero
let emptySquares; //Array de lugares vacios para generar la comida de la serpiente
let moveInterval; //Intervalo de tiempo para iterar el movimiento de la serpiente

const drawSnake = () => {
  snake.forEach((square) => drawSquare(square, "snakeSquare")); //Recorre el array donde almacenamos la serpiente y por cada valor que encuentre dentro(square) le aplicamos la funcion drawSquare pasandole como parametros el valor actual que va recorrido del array(square)(00, 01, 02...) y el tipo "snakeSquare"
};

const drawSquare = (square, type) => {
  const [row, column] = square.split("-").map(Number); //Separa cada fila de cada columna de las cordenadas introducidad. Ej: coordenada (02) las separa en (0 2)
  boardSquares[row][column] = squareTypes[type]; //Cambia el tipo de cuadrado (estado) al que se necesite (serpiente, comida, o vacio)
  const squareElement = document.getElementById(square); //Extraemos el id del cuadrado asignado en el html al crear el board
  squareElement.setAttribute("class", `square ${type}`); //Cambiamos el tipo de ese cuadrado en el html para modificarle el color que se establecio en el css

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

const moveSnake = () => {
  // Extraemos la cabeza actual de la serpiente, es decir, el último elemento del array "snake"
  // Mediante .split("-") separamos la coordenada (por ejemplo "5-7") en [5,7]
  // Luego usamos .map(Number) para convertir ambos valores a números (ya que .split devuelve strings)
  const [headRow, headCol] = snake[snake.length - 1].split("-").map(Number);

  // Creamos dos nuevas variables (fila y columna) que representarán la nueva posición
  // Inicialmente son iguales a la cabeza actual
  let newRow = headRow;
  let newCol = headCol;

  // Según la dirección actual, modificamos la fila o la columna para mover la cabeza
  switch (direction) {
    case "ArrowUp":
      newRow -= 1; // Si la dirección es hacia arriba, restamos 1 a la fila
      break;
    case "ArrowDown":
      newRow += 1; // Si es hacia abajo, sumamos 1 a la fila
      break;
    case "ArrowLeft":
      newCol -= 1; // Si es hacia la izquierda, restamos 1 a la columna
      break;
    case "ArrowRight":
      newCol += 1; // Si es hacia la derecha, sumamos 1 a la columna
      break;
  }

  // Creamos una nueva coordenada en formato "fila-columna" (por ejemplo "4-7")
  const newSquare = `${newRow}-${newCol}`;

  // ──────────────────────────────────────────────────────────────
  // Comprobamos si la serpiente se sale del tablero o choca consigo misma
  // ──────────────────────────────────────────────────────────────
  if (
    newRow < 0 || // Si la fila es menor que 0 → choca con el borde superior
    newRow >= boardSize || // Si la fila supera el tamaño del tablero → choca con el borde inferior
    newCol < 0 || // Si la columna es menor que 0 → choca con el borde izquierdo
    newCol >= boardSize || // Si la columna supera el tamaño del tablero → choca con el borde derecho
    boardSquares[newRow][newCol] === squareTypes.snakeSquare //Si el nuevo bloque es de tipo snake → choca contra sigo misma
  ) {
    gameOver();
  } else {
    snake.push(newSquare); // Si no hay colisión, añadimos el nuevo cuadrado al final del array "snake" (la nueva cabeza)

    // Si el nuevo cuadrado es de tipo "foodSquare", significa que ha comido
    if (boardSquares[newRow][newCol] === squareTypes.foodSquare) {
      addFood(); // Llamamos a la función para aumentar la puntuación y generar nueva comida
    } else {
      // Si no hay comida, significa que simplemente se ha movido
      const emptySquare = snake.shift(); // Eliminamos el primer elemento del array (la cola) para mantener la longitud

      const [tailRow, tailCol] = emptySquare.split("-").map(Number);
      const bg = (tailRow + tailCol) % 2 === 0 ? "lightSquare" : "darkSquare";
      drawSquare(emptySquare, `emptySquare ${bg}`); // Dibujamos un cuadrado vacío en la antigua posición de la cola
    }

    // Finalmente, dibujamos la serpiente actualizada con su nueva posición
    drawSnake();
  }
};

const addFood = () => {
  score++; //Aumenta el score
  updateScore(); //actualiza el score
  createRandomFood(); //Vuelve a crear un nuevo espacio con comida

  //Generar sonido aleatorio al comer
  let randomIndex = Math.floor(Math.random() * eatSounds.length);
  eatSounds[randomIndex].play();
};

const gameOver = () => {
  gameOverSign.style.display = "block"; //Se muestra el mensaje de derrota
  clearInterval(moveInterval); //Eliminamos el intervalo para que la serpiente deje de moverse
  //Se vuelven a habilitar los botones
  startButton.disabled = false;
  sizeSelector.disabled = false;
};

//Funcion para cambiar el valor que contiene la variable direccion
const setDirection = (newDirection) => {
  direction = newDirection;
};

const directionEvent = (key) => {
  //La funcion recibe internamente el objeto keyboardEvent(key) al establecerlo en el EventListener con el tipo "keydown"

  switch (key.code) {
    //Extraemos el objeto keyboardEvent(key) el valor .code, este contiene una clave de la tecla pulsada
    //Si cumple la condicion establecida, ejecuta la funcion y setea la direccion que el usuario pulso (key.code)
    //El switch tiene como objetivo, verificar que el usuario no este pulsando una direccion contraria a la que este yendo la serpiente. Ej: si va hacia arriba, no puede cambiar la direccion hacia abajo, si va hacia la derecha no puede cambiar la direccion hacia la izquierda, etc...
    case "ArrowUp":
      if (direction !== "ArrowDown") setDirection("ArrowUp");
      break;
    case "ArrowDown":
      if (direction !== "ArrowUp") setDirection("ArrowDown");
      break;
    case "ArrowLeft":
      if (direction !== "ArrowRight") setDirection("ArrowLeft");
      break;
    case "ArrowRight":
      if (direction !== "ArrowLeft") setDirection("ArrowRight");
      break;
  }
};

const createRandomFood = () => {
  const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)]; //Creacion un valor aleatorio dentro del largo actual del array de empySquares
  drawSquare(randomEmptySquare, "foodSquare"); //LLamamos a la funcion draw para mostrar por pantalla el color rojo
};

const updateScore = () => {
  scoreBoard.innerText = score; //Muestra el score
};

const createBoard = () => {
  boardSquares.forEach((row, rowIndex) => {
    //Recorre cada fila(row) del array y extrae su indice (rowIndex)
    row.forEach((column, columnIndex) => {
      //Recorre cada elemento(column) dentro de cada fila(row) y extrae su indice (columnIndex)
      const squareValue = `${rowIndex}-${columnIndex}`; //Creacion de una constante donde se asigan las coordenadas (valor del row + columna) (00, 01, 02, 03,...)
      const squareElement = document.createElement("div"); //creacion de un div en las coordenadas segun la iteracion del forEach

      const bgClass = (rowIndex + columnIndex) % 2 === 0 ? "lightSquare" : "darkSquare";

      squareElement.setAttribute("class", `square emptySquare ${bgClass}`); //Asignacion de clase al div
      squareElement.setAttribute("id", squareValue); //Asignacion de un id al div con las coordenadas extraidas anteriormente
      board.appendChild(squareElement); //Agregar cada que se crea un div al board
      emptySquares.push(squareValue); //Añade al array el identificador(coordenadas) de cada cuadrado vacío recién creado: [00, 01, 02, 03, 04, 05,...]
    });
  });
};

const setGame = () => {
  snake = ["0-0", "0-1", "0-2", "0-3"]; //Creacion inicial de la serpiente
  score = snake.length; //Puntuacion es igual al largo de la serpiente
  direction = "ArrowRight"; //Movimiento inicial hacia la derecha
  boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare)); //Creacion de un array del tamaño del tablero (10) y a cada uno de esos elementos del array se le pasa la funcion para que sean otro array, este se rellena de 0 (squareTypes.emptySquare) con .fill

  console.log(boardSquares);
  //resetear valores cada vez que se pulsa el boton start
  board.innerHTML = "";
  emptySquares = [];

  createBoard();
};

//Ajustar el tamaño del tablero introducido por el usuairo
const setBoardSize = (value) => {
  boardSize = Number(value);
  board.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
};

const startGame = () => {
  //Extraer el valor del tamaño del tablero e introducirlo como argumento en la funcion
  const selectedSize = sizeSelector.value;
  setBoardSize(selectedSize);

  setGame();
  gameOverSign.style.display = "none"; //Resetear el display del game over para cuando se juega mas de 1 partida consecutiva
  //Desabilitar el botones mientras esta jugando el usuario
  startButton.disabled = true;
  sizeSelector.disabled = true;

  drawSnake();
  updateScore();
  createRandomFood();
  document.addEventListener("keydown", directionEvent); //Cada vez que el usuario pulsa una tecla llama a la funcion
  moveInterval = setInterval(() => moveSnake(), gameSpeed); //Ejecutara la funcion moveSnake() en cada intervalo de tiempo establecido en gameSpeed
};
startButton.addEventListener("click", startGame);
