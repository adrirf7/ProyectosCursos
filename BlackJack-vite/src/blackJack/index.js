import _ from "underscore";
import { takeCard, dealerTurn, accumulatePoints, stopAt21, createCard, startGame } from "./usecases/index";

//Baraja
let deck;

//*Variables del juego
let playerPoints = [],
  dealer;

let playerAces = 0,
  dealerAces = 0,
  players = 2,
  dealerHiddenCard = null;

//* Elementos del HTML
//Botones
export const btnNewGame = document.querySelector("#btn-new-game"),
  btnTake = document.querySelector("#btn-take"),
  btnStop = document.querySelector("#btn-stop");
//Puntos
export const HTMLplayersPoints = document.querySelectorAll("#players-points"),
  HTMLdealerPoints = document.querySelector(".dealer-points");

//Imagnes de las cartas
export const cardsDiv = document.querySelectorAll(".div-cards");

//? Eventos De los botones
//* Nuevo Juego
btnNewGame.addEventListener("click", () => {
  const newGame = startGame(players, deck, playerPoints, dealer, playerAces, dealerAces);
  deck = newGame.deck;
  playerPoints = newGame.playerPoints;
  dealer = newGame.dealer;
  playerAces = newGame.playerAces;
  dealerAces = newGame.dealerAces;
  dealerHiddenCard = newGame.hiddenCard;
  console.log(dealerHiddenCard);
});

//*Tomar una carta
btnTake.addEventListener("click", () => {
  const card = takeCard(deck);
  const result = accumulatePoints(card, 0, playerAces, playerPoints);

  playerAces = result.pAces;
  createCard(card, 0);
  stopAt21(result.points, deck, dealer, dealerAces, playerPoints, dealerHiddenCard);
});

//* Detener
btnStop.addEventListener("click", () => {
  btnTake.disabled = true;
  btnStop.disabled = true;
  dealerTurn(playerPoints[0], deck, dealer, dealerAces, playerPoints, dealerHiddenCard);
});
