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
  #amountOfPlaceholderCards = undefined;
  #cardWidth = undefined;
  #cardHeight = undefined;

  /**
   * @param {number} length amount of cards
   */
  constructor(length) {
    this.#cardWidth = 90;
    this.#cardHeight = 130;
    this.#amountOfPlaceholderCards = length ? parseInt(this.length, 10) : 1;
  }

  getCardWidth() {
    return this.#cardWidth;
  }

  setCardWidth(cardWidth) {
    this.#cardWidth = cardWidth;
  }

  getCardHeight() {
    return this.#cardHeight;
  }

  setCardHeight(cardHeight) {
    this.#cardHeight = cardHeight;
  }

  /**
   * @return {number} amountOfPlaceholderCards
   */
  getLength() {
    return this.#amountOfPlaceholderCards;
  }

  setLength(length) {
    this.#amountOfPlaceholderCards = length;
  }
}
