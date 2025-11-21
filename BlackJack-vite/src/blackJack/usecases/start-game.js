import { HTMLplayersPoints, btnTake, btnStop, cardsDiv } from "..";
import { createDeck } from "./create-deck";

/**
 *
 * @param {Number} players
 * @param {Array<string>} deck
 * @param {Array<Number>} playerPoints
 * @param {Number} dealer
 * @param {Number} playerAces
 * @param {Number} dealerAces
 * @returns
 */
//* Empezar la partida
export const startGame = (players = 2, deck, playerPoints, dealer, playerAces, dealerAces) => {
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

  return { playerPoints, deck, dealer };
};
