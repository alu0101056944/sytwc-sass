/**
 * @author Marcos Barrios
 * @since 05_10_2023
 * @brief Component containing different cards with a table like appearance.
 * @module CardGoodsWebcomp
 */

'use strict';

import CardGoodsController from "./controller/card-goods-controller.mjs";

/**
 * Component containing different cards with a table like appearance.
 */
export default class CardGoodsWebcomp extends HTMLElement {
  /** @static */
  static observedAttributes = ["cardWidth", "cardHeight"];

  /** @private @constant */
  #shadow = undefined;
  #controller = undefined;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'closed' });
    this.#controller = new CardGoodsController(this.#shadow);
    console.log('WebComponent CardGoods created.');
  }

  connectedCallback() {
    console.log('WebComponent CardGoods connected.');
  }

  disconnectedCallback() {
    console.log('WebComponent CardGoods disconnected.');
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.log('Changed attribute ' + attributeName);
    if (attributeName === 'cardWidth' || attributeName === 'cardHeight') {
      this.#controller.updateGeometry(attributeName, newValue);
    }
  }
}
