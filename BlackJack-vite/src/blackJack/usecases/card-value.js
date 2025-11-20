/**
 *
 * @param {string} card - Cadena con formato número+Letra o letra+letra (ej: "AH", "10K").
 * @returns {number}
 */
//*Extraer el valor de la carta
export const cardValue = (card) => {
  if (!card) throw new Error("card es obligatorio como string");

  //Los strings en js pueden ser tratados como arrays. Substring extre el valor de la carta desde la posicion establecida, en este caso 0, hasta la ultima posicion de la carta -1. Que seria siempre el palo
  const value = card.substring(0, card.length - 1);

  //Si no es un numero solo hay dos opciones As o Figura. El as incialemnte vale 11, y las figuras 10. Si es numero devuelve el valor de la carta
  return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
};
