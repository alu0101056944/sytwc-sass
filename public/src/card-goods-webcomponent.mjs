/**
 * @author Marcos Barrios
 * @since 05_10_2023
 * @brief Component containing different cards with a table like appearance.
 * @module CardGoodsWebcomponent
 */

'use strict';

/**
 * This is one of the inputs for the controller; what the user specifies in the
 * html component goes to the controller which knows what to call in the model.
 */

/**
 * Component containing different cards with a table like appearance.
 */
export default class CardGoods extends HTMLElement {
  /** @static */
  static observedAttributes = ['length', 'width', 'height'];

  constructor() {
    super();
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
    if (attributeName === 'length') {
      
    } else if (attributeName === 'width') {
      
    } else if (attributeName === 'height') {
      
    }
  }
}
