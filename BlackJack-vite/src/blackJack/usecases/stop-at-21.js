import { btnStop, btnTake } from "../index";
import { dealerTurn } from "./index";

/**
 *
 * @param {Number} points
 * @param {Array<string>} deck
 * @param {Number} dealer
 * @param {Number} dealerAces
 * @param {Array<Number>} playerPoints
 */
//* Detener al jugador una vez supera 21
export const stopAt21 = (points, deck, dealer, dealerAces, playerPoints, dealerHiddenCard) => {
  if (points > 21 || points === 21) {
    btnTake.disabled = true;
    btnStop.disabled = true;
    dealerTurn(points, deck, dealer, dealerAces, playerPoints, dealerHiddenCard);
  }
};
