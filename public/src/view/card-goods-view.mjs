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
  #parent = undefined;

  /** @private */
  #cardHeight = undefined;
  #cardWidth = undefined;

  // meter el estilo de los ejemplos aquí.
  // permitir una parte baja en cada carta, que sea un slot.

  constructor(parent) {
    this.#parent = parent;
    this.#cardWidth = 200;
    this.#cardHeight = 25;
    const content = document
        .getElementById('card-goods-template')
        .content
        .cloneNode(true);
    const cssLinkerNode = document.createElement('link');
    cssLinkerNode.setAttribute('rel', 'stylesheet');
    cssLinkerNode.setAttribute('href', 'styles/components/card-goods.css');
    cssLinkerNode.addEventListener('load', () => {
      console.log('CardGoodsView css style loaded.');
    });
    this.#parent.append(cssLinkerNode);
    this.#parent.append(content);
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
    const exampleArray = this.#parent.querySelectorAll('.example');
    exampleArray.forEach((example) => {
      example.style[sideName] = /\d+$/.test(newValue) ? newValue + 'px' : newValue;
    });
  }
}
