import _ from "underscore";
import { createDeck, takeCard, dealerTurn, accumulatePoints, stopAt21 } from "./usecases/index";

//Baraja
let deck;

//*Variables del juego
let playerPoints = [],
  dealer;

let playerAces = 0,
  dealerAces = 0;

//* Elementos del HTML
//Botones
export const btnNewGame = document.querySelector("#btn-new-game"),
  btnTake = document.querySelector("#btn-take"),
  btnStop = document.querySelector("#btn-stop");
//Puntos
export const HTMLplayersPoints = document.querySelectorAll("#players-points");

//Imagnes de las cartas
const cardsDiv = document.querySelectorAll(".div-cards");

//* Empezar la partida
const startGame = (players = 2) => {
  deck = createDeck(); //Crear la baraja
  playerPoints = []; //vaciar los puntos

  //Llenar el array con los jugadores deseados
  for (let i = 0; i < players; i++) {
    playerPoints.push(0);
  }
  //El dealer siempre sera el ultimo jugador
  dealer = playerPoints.length - 1;

  //Resetar los ases de los jugadores
  playerAces = 0;
  dealerAces = 0;

  //Limpiar el html
  HTMLplayersPoints.forEach((elem) => (elem.innerHTML = 0));
  cardsDiv.forEach((elem) => (elem.innerHTML = ""));

  //Rehabilitar botones
  btnTake.disabled = false;
  btnStop.disabled = false;
};

//* Crear la imagen de la carta
export const createCard = (card, turn) => {
  //Establecer la iamgen de la carta
  const cardImg = document.createElement("img");
  cardImg.src = `assets/cartas/${card}.png`;
  cardImg.classList.add("game-card");
  cardsDiv[turn].append(cardImg); //Insertar la imagen
};

//* Determinar un ganador
export const whosWhinner = () => {
  const [minPoints, dealerPoints] = playerPoints;

  console.log(minPoints, dealerPoints);
  setTimeout(() => {
    if ((dealerPoints > minPoints && dealerPoints <= 21) || minPoints > 21) {
      alert("Perdiste");
    } else if (dealerPoints === minPoints) {
      alert("Empate");
    } else if (minPoints > dealerPoints || (minPoints <= 21 && dealerPoints > 21)) {
      alert("Ganaste");
    } else {
      alert("No Controlado");
    }
  }, 100);
};

//? Eventos De los botones

//*Tomar una carta
btnTake.addEventListener("click", () => {
  const card = takeCard(deck);
  const result = accumulatePoints(card, 0, playerAces, playerPoints);

  playerAces = result.pAces;
  createCard(card, 0);
  stopAt21(result.points, deck, dealer, dealerAces, playerPoints);
});

//* Detener
btnStop.addEventListener("click", () => {
  btnTake.disabled = true;
  btnStop.disabled = true;
  dealerTurn(playerPoints[0], deck, dealer, dealerAces, playerPoints);
});

//* Nuevo Juego
btnNewGame.addEventListener("click", () => {
  startGame();
});
