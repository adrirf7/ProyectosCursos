/**
 *
 * @param {Array<string>} deck
 * @returns {Array}
 */
//*Extrae la ultima carta del array
export const takeCard = (deck) => {
  if (!deck || deck.length === 0) throw new Error("deck es obligatorio como un array de string");

  //Verifica si la baraja no esta vacia y extrae el ultimo valor de la baraja
  return deck.length === 0 ? alert("No quedan cartas en la baraja") : deck.pop();
};
