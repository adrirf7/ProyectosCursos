import { cardValue } from "./card-value";
import { HTMLplayersPoints } from "../index";

//* Sumar Puntos
//Turno: 0 = primer jugador y el ultimo el dealer
export const accumulatePoints = (card, turn, pAces, playerPoints) => {
  //TODO: Validaciones y docuemntacion
  let thisValue = cardValue(card);
  //Aumentar contador ases
  if (thisValue === 11) pAces++;
  playerPoints[turn] += thisValue;

  //Siempre que el jugador supere 21 y tenga algun as en la mano, este necesitara que valga 1 y no 11, para ello se le restara 10 a los puntos del jugador y quita el as del contador
  while (playerPoints[turn] > 21 && pAces > 0) {
    playerPoints[turn] -= 10;
    pAces--;
  }

  HTMLplayersPoints[turn].innerHTML = playerPoints[turn]; //Insertar los puntos
  return { points: playerPoints[turn], pAces };
};
