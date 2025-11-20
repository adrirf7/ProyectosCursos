const blackJack = (() => {
  "use strict";

  let deck = []; //Baraja

  const suits = ["H", "D", "C", "S"], //Palos de la baraja
    letterCards = ["A", "J", "Q", "K"]; //Cartas que no contienen numeros

  //*Variables del juego
  let playerPoints = [],
    dealer;

  let playerAsces = 0,
    dealerAces = 0;

  //* Elementos del HTML
  //Botones
  const btnNewGame = document.querySelector("#btn-new-game"),
    btnTake = document.querySelector("#btn-take"),
    btnStop = document.querySelector("#btn-stop");
  //Puntos
  const HTMLplayersPoints = document.querySelectorAll("#players-points");
  //Imagnes de las cartas
  const cardsDiv = document.querySelectorAll(".div-cards");

  //* Empezar la partida
  const startGame = (players = 2) => {
    deck = createDeck(); //Crear la baraja
    playerPoints = []; //vaciar los puntos

    //Llenar el array con los jugadores deseados
    for (let i = 0; i < players; i++) {
      playerPoints.push(0);
    }
    //El dealer siempre sera el ultimo jugador
    dealer = playerPoints.length - 1;

    //Resetar variables el juego
    playerAsces = 0;
    dealerAces = 0;

    //Limpiar el html
    HTMLplayersPoints.forEach((elem) => (elem.innerHTML = 0));
    cardsDiv.forEach((elem) => (elem.innerHTML = ""));

    //Rehabilitar botones
    btnTake.disabled = false;
    btnStop.disabled = false;
  };

  //*Crear la baraja ya mezclada
  const createDeck = () => {
    deck = []; //Reiniclializar la baraja

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

  //*Tomar una carta
  const takeCard = () => {
    //Verifica si la baraja no esta vacia y extrae el ultimo valor de la baraja
    return deck.length === 0 ? alert("No quedan cartas en la baraja") : deck.pop();
  };

  //*Extraer el valor de la carta
  const cardValue = (card) => {
    //Los strings en js pueden ser tratados como arrays. Substring extre el valor de la carta desde la posicion establecida, en este caso 0, hasta la ultima posicion de la carta -1. Que seria siempre el palo
    const value = card.substring(0, card.length - 1);

    //Si no es un numero solo hay dos opciones As o Figura. El as incialemnte vale 11, y las figuras 10. Si es numero devuelve el valor de la carta
    return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
  };

  //* Sumar Puntos
  //Turno: 0 = primer jugador y el ultimo el dealer
  const accumulatePoints = (card, turn, pAsces) => {
    let thisValue = cardValue(card);
    //Aumentar contador ases
    if (thisValue === 11) pAsces++;
    playerPoints[turn] += thisValue;

    //Siempre que el jugador supere 21 y tenga algun as en la mano, este necesitara que valga 1 y no 11, para ello se le restara 10 a los puntos del jugador y quita el as del contador
    while (playerPoints[turn] > 21 && pAsces > 0) {
      playerPoints[turn] -= 10;
      pAsces--;
    }

    HTMLplayersPoints[turn].innerHTML = playerPoints[turn]; //Insertar los puntos
    return playerPoints[turn];
  };

  //* Crear la imagen de la carta
  const createCard = (card, turn) => {
    //Establecer la iamgen de la carta
    const cardImg = document.createElement("img");
    cardImg.src = `assets/cartas/${card}.png`;
    cardImg.classList.add("game-card");
    cardsDiv[turn].append(cardImg); //Insertar la imagen
  };

  //* Determinar un ganador
  const whoswhinner = () => {
    const [minPoints, dealerPoints] = playerPoints;

    console.log(minPoints, dealerPoints);
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

  //* Detener al jugador una vez supera 21
  const stopAt21 = (pPoints) => {
    if (pPoints > 21) {
      btnTake.disabled = true;
      btnStop.disabled = true;
      dealerTurn(pPoints);
    } else if (pPoints === 21) {
      btnTake.disabled = true;
      btnStop.disabled = true;
      dealerTurn(pPoints);
    }
  };

  //* Turno del dealer
  const dealerTurn = (minPoints) => {
    let dealerPoints = 0;

    do {
      const card = takeCard();
      dealerPoints = accumulatePoints(card, dealer, dealerAces);
      createCard(card, dealer);
    } while (dealerPoints < minPoints && minPoints <= 21);

    whoswhinner();
  };

  //? Eventos De los botones

  //*Tomar una carta
  btnTake.addEventListener("click", () => {
    const card = takeCard();
    const points = accumulatePoints(card, 0, playerAsces);
    createCard(card, 0);
    stopAt21(points);
  });

  //* Detener
  btnStop.addEventListener("click", () => {
    btnTake.disabled = true;
    btnStop.disabled = true;
    dealerTurn(playerPoints[0]);
  });

  //* Nuevo Juego
  btnNewGame.addEventListener("click", () => {
    startGame();
  });

  //Esto es una forma de declarar metodos publicos. Estos peuden ser utilizados desde otros archivos. Es importante que todo nuestro flujo este dentro de la funcion anonima autoinvocada. Ademas a esta le hemos añadido el nombre de "blackJack" para que pueda ser identificada con ese nombre. Importante tambien que se le ha asignado otro nombre al metodo startGame como newGame
  return {
    newGame: startGame,
  };
})();
