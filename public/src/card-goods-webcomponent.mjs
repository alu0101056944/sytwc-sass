/**
 * @author Marcos Barrios
 * @since 05_10_2023
 * @brief Component containing different cards with a table like appearance.
 * @module CardGoodsWebcomp
 */

'use strict';

/**
 * Component containing different cards with a table like appearance.
 */
export default class CardGoodsWebcomp extends HTMLElement {
  /** @static */
  static observedAttributes = ['width', 'height'];

  /** @private @constant */
  #shadow = undefined;

  constructor() {
    super();
    this.#shadow = this.attachShadow({mode: 'closed'});
    console.log('WebComponent CardGoods created.');
  }

  getShadow() {
    return this.#shadow;
  }

  connectedCallback() {
    console.log('WebComponent CardGoods connected.');
  }

  disconnectedCallback() {
    console.log('WebComponent CardGoods disconnected.');
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.log('Changed attribute ' + attributeName);
    if (attributeName === 'width' || attributeName === 'height') {
      const event = new CustomEvent('attributeChanged', {
        detail: {
          attributeName,
          oldValue,
          newValue,
        }
      });
      this.dispatchEvent(event);
      console.log('Dispatched attribute changed event with side info');
    }
  }
}
