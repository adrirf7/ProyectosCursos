let deck = [];

const suits = ["H", "D", "C", "S"]; //Palos de la baraja
const letterCards = ["A", "J", "Q", "K"]; //Cartas que no contienen numeros

let playerPoints = 0,
  dealerPoints = 0,
  ascesCount = 0;

const btnTake = document.querySelector("#btn-take");
const HTMLplayerPoints = document.querySelector("#player-points");
const HTMLdealerPoints = document.querySelector("#dealer-points");

//Crear la baraja ya mezclada
const createDeck = () => {
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

  deck = _.shuffle(deck); //Mezclar la baraja
  return deck;
};

//Tomar una carta
const takeCard = () => {
  //Verifica si la baraja esta vacia
  if (deck.length === 0) {
    alert("No quedan cartas en la baraja");
  }

  //Extraer la ultima carta de la baraja
  return deck.pop();
};

//Extraer el valor de la carta
const cardValue = (card) => {
  //Los strings en js pueden ser tratados como arrays. Substring extre el valor de la carta desde la posicion establecida, en este caso 0, hasta la ultima posicion de la carta -1. Que seria siempre el palo
  const value = card.substring(0, card.length - 1);

  return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
};

console.log(createDeck());

btnTake.addEventListener("click", () => {
  const card = takeCard();
  let thisValue = cardValue(card);

  //Aumentar contador ases
  if (thisValue === 11) ascesCount++;
  playerPoints += thisValue;

  //Siempre que el jugador supere 21 y tenga algun as en la mano, este necesitara que valga 1 y no 11, para ello se le restara 10 a los puntos del jugador y quita el as del contador
  while (playerPoints > 21 && ascesCount > 0) {
    playerPoints -= 10;
    ascesCount--;
  }

  HTMLplayerPoints.innerHTML = playerPoints;

  console.log(card, playerPoints);
});
