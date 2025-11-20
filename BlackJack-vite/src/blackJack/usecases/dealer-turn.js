import { accumulatePoints, takeCard } from "./index";
import { createCard } from "../index";
import { whosWhinner } from "../index";

/**
 *
 * @param {Number} minPoints
 * @param {Array<string>} deck
 * @param {Number} dealer
 * @param {Number} dealerAces
 */
//* Turno del dealer
export const dealerTurn = (minPoints, deck, dealer, dealerAces, playerPoints) => {
  if (!minPoints) throw new Error("minPoints es un argumento obligatorio");
  if (!deck || deck.length === 0) throw new Error("deck es obligatorio como un array de string");
  if (!dealer) throw new Error("dealer es un argumento obligatorio");
  if (!!dealerAces) throw new Error("dealerAces es un argumento obligatorio");

  let dealerPoints = 0;

  do {
    const card = takeCard(deck);
    const result = accumulatePoints(card, dealer, dealerAces, playerPoints);
    dealerPoints = result.points;
    dealerAces = result.pAces;
    createCard(card, dealer);
  } while (dealerPoints < minPoints && minPoints <= 21);

  whosWhinner();
};
