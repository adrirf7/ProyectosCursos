import { accumulatePoints, takeCard, createCard } from "./index";

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

  whosWhinner(playerPoints);
};

//* Determinar un ganador
export const whosWhinner = (playerPoints) => {
  const [minPoints, dealerPoints] = playerPoints;

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
