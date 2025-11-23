import _ from "underscore";

const suits = ["H", "D", "C", "S"], //Palos de la baraja
  letterCards = ["A", "J", "Q", "K"]; //Cartas que no contienen numeros

//*Crear la baraja ya mezclada
export const createDeck = () => {
  let deck = []; //Reiniclializar la baraja

  // Crear las cartas del 2 al 10
  for (let i = 2; i <= 10; i++) {
    for (let suit of suits) {
      deck.push(i + suit);
    }
  }

  //Crear las cartas especiales (As, Caballo, Reina y Rey)
  for (let suit of suits) {
    for (let letterCard of letterCards) {
      deck.push(letterCard + suit);
    }
  }

  return _.shuffle(deck); //Mezclar la baraja
};

export const createFaceDownDeck = () => {
  const deckContainer = document.querySelector("#deck-container");

  for (let i = 0; i < 10; i++) {
    const faceCardImg = document.createElement("img");
    faceCardImg.src = `./public/assets/cartas/red_back.png`;
    faceCardImg.classList.add("game-card");
    deckContainer.append(faceCardImg);
  }
};
