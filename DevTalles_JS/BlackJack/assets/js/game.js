let deck = [];

const suits = ["H", "D", "C", "S"]; //Palos de la baraja
const letterCards = ["A", "J", "Q", "K"]; //Cartas que no contienen numeros

//Crear la baraja ya mezclada
const createDeck = () => {
  // Crear las cartas del 2 al 10
  for (let i = 2; i <= 10; i++) {
    for (let k = 0; k < suits.length; k++) {
      deck.push(i + suits[k]);
    }
  }

  //Crear las cartas especiales (As, Caballo, Reina y Rey)
  for (let i = 0; i < suits.length; i++) {
    for (let k = 0; k < letterCards.length; k++) {
      deck.push(letterCards[i] + suits[k]);
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
  //Los estrings en js pueden ser tratados como arrays. Substring extre el valor de la carta desde la posicion establecida (0) hasta la ultima posicion de la carta -1. Que seria siempre el palo
  const value = card.substring(0, card.length - 1);

  return (points = isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value));
};

console.log(createDeck());
console.log(cardValue(takeCard()));
