/**
 * @author Marcos Barrios
 * @since 14_10_2023
 * @desc Make the REST API requests to fill the data the model needs.
 * @module CardGoodsController
 */

'use strict';

/**
 * Checks the webcomponent values on the model and also passes the text
 * data from the REST server to the view.
 */

/**
 * Make the REST API requests to fill the data the model needs.
 */
export default class CardGoodsController {
  constructor() {
    
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === 'length') {
      const newLength = parseInt(newValue, 10);
      let oldLength;
      if (oldValue) {
        oldLength = parseInt(oldValue, 10);
      } else {
        const initialValue = this.#amountOfPlaceholderCards;
        oldLength = initialValue;
      }
      if (oldLength < newLength) {
        for (let i = oldLength + 1; i <= newLength; i++) {
          const newSlot = this.#originalSlot.cloneNode(true);
          newSlot.name = 'card-goods-slot' + i;
          this.#mainDiv.append(newSlot);
        }
      } else {
        for (let i = this.#amountOfPlaceholderCards; i >= newLength; i--) {
          const slotToRemove = document.getElementById('card-goods-slot' + i);
          slotToRemove.remove();
        }
      }
    } else if (attributeName === 'width') {
      const exampleArray = this.#shadow.querySelectorAll('.example');
      exampleArray.forEach((example) => {
        example.style.width = /\d+$/.test(newValue) ? newValue + 'px' : newValue;
      });
    } else if (attributeName === 'height') {
      const exampleArray = this.#shadow.querySelectorAll('.example');
      exampleArray.forEach((example) => {
        example.style.height = /\d+$/.test(newValue) ? newValue + 'px' : newValue;
      });
    }
  }
}
