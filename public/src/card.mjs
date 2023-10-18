/**
 * @author Marcos Barrios
 * @since 18_10_2023
 * @desc A card with a map of string information.
 */

export default class Card {
  /** @private */
  #data = undefined;
  constructor() {}
  addData(key, value) {
    this.#data[key] = value;
  }
}
