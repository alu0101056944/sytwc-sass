/**
 * @author Marcos Barrios
 * @since 18_10_2023
 * @desc A card with a map of string information.
 * @module CardModel
 */

'use strict';

export default class CardModel {
  /** @private */
  #data = undefined;

  constructor() {
    this.#data = {};
  }

  addData(key, value) {
    this.#data[key] = value;
  }
}
