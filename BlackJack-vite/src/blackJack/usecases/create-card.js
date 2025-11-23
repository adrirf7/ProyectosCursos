import { cardsDiv } from "../index";
/**
 *
 * @param {string} card
 * @param {Number} turn
 */
//* Crear la imagen de la carta
export const createCard = (card, turn, pos) => {
  if (card === undefined || card === null) throw new Error("card es un argumento obligatorio");
  if (turn === undefined || turn === null) throw new Error("turn es un argumento obligatorio");

  // Obtener posiciones
  const deckContainer = document.getElementById("deck-container");
  const targetContainer = cardsDiv[turn];

  const deckRect = deckContainer.getBoundingClientRect();

  //Establecer la imagen de la carta
  const cardImg = document.createElement("img");
  pos === 0 ? (cardImg.src = `assets/cartas/red_back.png`) : (cardImg.src = `assets/cartas/${card}.png`);
  cardImg.classList.add("game-card");

  // Posicionar la carta en la baraja inicialmente
  cardImg.style.position = "fixed";
  cardImg.style.left = `${deckRect.left + deckRect.width / 2 - 75}px`;
  cardImg.style.top = `${deckRect.top}px`;
  cardImg.style.zIndex = "1000";
  cardImg.style.transition = "all 0.5s ease-out";

  document.body.appendChild(cardImg);

  // Forzar reflow y animar
  cardImg.offsetHeight;

  animateCard(cardImg, targetContainer);
};

const animateCard = (cardImg, targetContainer, onFinish) => {
  const targetRect = targetContainer.getBoundingClientRect();
  const finalX = targetRect.left + targetRect.width / 2 - 75;
  const finalY = targetRect.top + targetRect.height / 2 - 105;

  // Mover la carta
  cardImg.style.left = `${finalX}px`;
  cardImg.style.top = `${finalY}px`;

  // Después de la animación, mover al contenedor final
  setTimeout(() => {
    cardImg.style.position = "";
    cardImg.style.left = "";
    cardImg.style.top = "";
    cardImg.style.zIndex = "";
    cardImg.style.transition = "";
    targetContainer.appendChild(cardImg);
  }, 500);
};
