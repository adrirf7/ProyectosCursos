import { accumulatePoints, takeCard, createCard } from "./index";
import { cardsDiv, HTMLdealerPoints } from "..";

/**
 *
 * @param {Number} minPoints
 * @param {Array<string>} deck
 * @param {Number} dealer
 * @param {Number} dealerAces
 */
//* Turno del dealer
export const dealerTurn = (minPoints, deck, dealer, dealerAces, playerPoints, dealerHiddenCard) => {
  if (!minPoints) throw new Error("minPoints es un argumento obligatorio");
  if (!deck || deck.length === 0) throw new Error("deck es obligatorio como un array de string");
  if (!dealer) throw new Error("dealer es un argumento obligatorio");
  if (dealerAces === null || dealerAces === undefined) throw new Error("dealerAces es un argumento obligatorio");

  // Mostrar los puntos del dealer
  HTMLdealerPoints.style.display = "inline";
  HTMLdealerPoints.innerHTML = playerPoints[dealer];

  let dealerPoints = playerPoints[dealer];

  if (dealerHiddenCard) {
    const dealerCards = cardsDiv[dealer].querySelectorAll(".game-card");
    const lastCard = dealerCards[dealerCards.length - 1];
    lastCard.src = `assets/cartas/${dealerHiddenCard}.png`;
  }

  while (dealerPoints < minPoints && minPoints <= 21) {
    const card = takeCard(deck);
    const result = accumulatePoints(card, dealer, dealerAces, playerPoints);
    dealerPoints = result.points;
    dealerAces = result.pAces;
    createCard(card, dealer);

    // Actualizar los puntos del dealer en pantalla
    HTMLdealerPoints.innerHTML = dealerPoints;
  }

  whosWhinner(playerPoints);
};

//* Determinar un ganador
export const whosWhinner = (playerPoints) => {
  const [minPoints, dealerPoints] = playerPoints;

  setTimeout(() => {
    if ((dealerPoints > minPoints && dealerPoints <= 21) || minPoints > 21) {
      document.getElementById("overlay-lose").style.display = "flex";
    } else if (dealerPoints === minPoints) {
      document.getElementById("overlay-tie").style.display = "flex";
    } else if (minPoints > dealerPoints || (minPoints <= 21 && dealerPoints > 21)) {
      document.getElementById("overlay-win").style.display = "flex";
    } else {
      alert("No Controlado");
    }
  }, 700);
};
