/**
 * @author Marcos Barrios
 * @since 14_10_2023
 * @desc Represents the html structure and the css style of dashboard with
 *    cards.
 * @module CardGoodsView
 *
 */

'use strict';

/**
 * Represents the html structure and the css style of dashboard with
 *    cards.
 */
export default class CardGoodsView {
  /** @private @constant */
  #shadow = undefined;

  /** @private */
  #cardHeight = undefined;
  #cardWidth = undefined;

  constructor() {
    const content = document
                      .getElementById('card-goods-template')
                      .content
                      .cloneNode(true);
    this.#shadow = this.attachShadow({mode: 'closed'});
    this.#shadow.append(content);
  }

  updateCardWidth(newWidth) {
    this.#updateCardGeometry('width', newWidth);
    this.#cardWidth = newWidth;
  }

  updateCardHeight(newHeight) {
    this.#updateCardGeometry('height', newHeight);
    this.#cardHeight = newHeight;
  }

  /**
   * @param {string} sideName either width or height
   */
  #updateCardGeometry(sideName, newValue) {
    const exampleArray = this.#shadow.querySelectorAll('.example');
    exampleArray.forEach((example) => {
      example.style[sideName] = /\d+$/.test(newValue) ? newValue + 'px' : newValue;
    });
  }
}
