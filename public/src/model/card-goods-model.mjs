/**
 * @author Marcos Barrios
 * @since 14_10_2023
 * @brief Dashboard with cards.
 *
 */

'use strict';

export default class CardGoodsModel {
  #amountOfPlaceholderCards = undefined;
  #cardWidth = undefined;
  #cardHeight = undefined;
  constructor(length) {
    this.#cardWidth = this.width ? parseInt(this.width) : 90;
    this.#cardHeight = this.height ? parseInt(this.height) : 130;
    this.#amountOfPlaceholderCards = this.length ? parseInt(this.length, 10) : 1;
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
