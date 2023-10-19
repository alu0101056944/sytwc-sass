/**
 * @author Marcos Barrios
 * @since 14_10_2023
 * @desc Represents a dashboard with cards.
 * @module CardGoodsModel
 */

'use strict';

/**
 * Represents a dashboard with cards.
 */
export default class CardGoodsModel {
  
  /** @private */
  #cards = undefined;

  constructor() {
    this.#cards = [];
  }

  getCards() {
    return this.#cards;
  }
}
