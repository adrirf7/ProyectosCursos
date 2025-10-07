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
let boardSquares; //Array del tablero
let emptySquares; //Array de lugares vacios para generar la comida de la serpiente
let moveInterval; //Intervalo de tiempo para iterar el movimiento de la serpiente

const drawSnake = () => {
  snake.forEach((square) => drawSquare(square, "snakeSquare")); //Recorre el array donde almacenamos la serpiente y por cada valor que encuentre dentro(square) le aplicamos la funcion drawSquare pasandole como parametros el valor actual que va recorrido del array(square)(00, 01, 02...) y el tipo "snakeSquare"
};

const drawSquare = (square, type) => {
  const [row, column] = square.split(""); //Separa cada fila de cada columna de las cordenadas introducidad. Ej: coordenada (02) las separa en (0 2)
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
  const newSquare = String(Number(snake[snake.length - 1]) + directions[direction]).padStart(2, "0"); //toma la cabeza actual de la serpiente (snake.legnth -1) debibo a que como el array empieza desde 00 daria un numero superior al que corresponde
  //Despues le suma el valor de la direccion requerida que se establecio en los parametros para asi mover la serpiente
  //.padStart añade un 0 por delante de una cadena cuando esta es inferior a la longitud introducida

  const [row, column] = newSquare.split(""); //Extraemos la fila y la columna del nuevo cuadrado creado

  if (
    newSquare < 0 || //Si el nuevo cuadrado se genera en una posicion inferior a 0 significa que la serpiente se choco contra arriba
    newSquare > boardSize * boardSize || //si se genera en una posicion superior a boardsize * boardSize es decir 99 significa que se choco por abajo
    (direction === "ArrowRight" && column == 0) || //Las columnas llegan como maximo hasta 9, si la direccion de la serpiente es a la dercha y se genera en una columna que sea 0 se choco por la derecha
    (direction === "ArrowLeft" && column == 9) || //Igual que el limite derecho pero a la inversa
    boardSquares[row][column] === squareTypes.snakeSquare //Si el nuevo cuadrado se genero en una posicion ocupada por un square de tipo sanke significa que la serpiente se choco contra si misma
  ) {
    gameOver();
  } else {
    snake.push(newSquare); //Añadimos al array sanke el nuevo square
    if (boardSquares[row][column] === squareTypes.foodSquare) {
      //Si el nuevo cuadrado se genero en una posicion ocupada por comida, esta debera crecer
      addFood();
    } else {
      //Si el espacio donde se genero el nuevo cuadrado es un emptySquare
      const emptySquare = snake.shift(); //con la funcion shift, extraemos el primer valor del array, y este es eliminado de este
      drawSquare(emptySquare, "emptySquare"); //Llamamos a la funcion para dibujar un nuevo cuadrado vacio y le pasamos las coordenadas del valor extraido con el shift
    }
    drawSnake(); //Pintamos un nuevo cuadrado de tipo snake para que esta se mueva
  }
};

const addFood = () => {
  score++; //Aumenta el score
  updateScore(); //actualiza el score
  createRandomFood(); //Vuelve a crear un nuevo espacio con comida
};

const gameOver = () => {
  gameOverSign.style.display = "block"; //Se muestra el mensaje de derrota
  clearInterval(moveInterval); //Eliminamos el intervalo para que la serpiente deje de moverse
  startButton.disabled = false; //Se vuelve a habilitar el boton
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
      direction != "arrowDown" && setDirection(key.code);
      break;
    case "ArrowDown":
      direction != "arrowUp" && setDirection(key.code);
      break;
    case "ArrowLeft":
      direction != "arrowRight" && setDirection(key.code);
      break;
    case "ArrowRight":
      direction != "arrowLeft" && setDirection(key.code);
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
  board.innerHTML = "";
  emptySquares = [];

  createBoard();
};

const startGame = () => {
  setGame();
  gameOverSign.style.display = "none"; //Resetear el display del game over para cuando se juega mas de 1 partida consecutiva
  startButton.disabled = true; //Desabilitar el boton de start mientras esta jugando el usuario
  drawSnake();
  updateScore();
  createRandomFood();
  document.addEventListener("keydown", directionEvent); //Cada vez que el usuario pulsa una tecla llama a la funcion
  moveInterval = setInterval(() => moveSnake(), gameSpeed); //Ejecutara la funcion moveSnake() en cada intervalo de tiempo establecido en gameSpeed
};
startButton.addEventListener("click", startGame);
