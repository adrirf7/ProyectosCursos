import { cardsDiv } from "../index";
/**
 *
 * @param {string} card
 * @param {Number} turn
 */
//* Crear la imagen de la carta
export const createCard = (card, turn) => {
  if (card === undefined || card === null) throw new Error("card es un argumento obligatorio");
  if (turn === undefined || turn === null) throw new Error("turn es un argumento obligatorio");

  //Establecer la iamgen de la carta
  const cardImg = document.createElement("img");
  cardImg.src = `assets/cartas/${card}.png`;
  cardImg.classList.add("game-card");
  cardsDiv[turn].append(cardImg); //Insertar la imagen
};
