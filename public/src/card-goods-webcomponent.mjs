/**
 * @author Marcos Barrios
 * @since 05_10_2023
 * @brief Component containing different cards with a table like appearance.
 *
 */

'use strict';

export default class CardGoods extends HTMLElement {
  static observedAttributes = ['length', 'width', 'height'];
  #amountOfPlaceholderCards = undefined;
  #originalSlot = undefined;
  #shadow = undefined;
  #mainDiv = undefined;
  #cardWidth = undefined;
  #cardHeight = undefined;

  constructor() {
    super();
    this.#cardWidth = this.width ? parseInt(this.width) : 90;
    this.#cardHeight = this.height ? parseInt(this.height) : 130;
    this.#amountOfPlaceholderCards = this.length ? parseInt(this.length, 10) : 1;
    const templateContent = document.getElementById('card-goods').content;
    const templateCloneContent = templateContent.cloneNode(true);
    const childSlots = templateCloneContent.querySelectorAll('slot');
    let originalSlot;
    for (let i = 0; i < childSlots.length; i++) {
      if (childSlots[i].getAttribute('name') === 'card-goods-slot') {
        originalSlot = childSlots[i];
        break;
      }
    }
    if (!originalSlot) {
      throw new Error('Template does not have any card-goods-slot slot.');
    }
    this.#originalSlot = originalSlot.cloneNode(true);
    originalSlot.remove();
    this.#mainDiv = templateCloneContent.querySelector('.examples');
    for (let i = 1; i <= this.#amountOfPlaceholderCards; ++i) {
      const newSlot = this.#originalSlot.cloneNode(true);
      newSlot.name = 'card-goods-slot' + i;
      this.#mainDiv.append(newSlot);
    }
    this.#shadow = this.attachShadow({mode: 'closed'});
    this.#shadow.append(templateCloneContent);
    const CSS_STYLING_STRING = `
      .examples {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        padding: 10px 3px 2px 3px;
        margin: 10px 3px 5px 3px;
      }
      .examples .example {
        background-color: IndianRed;
        width: ${this.#cardWidth}px;
        height: ${this.#cardHeight}px;
        margin: 8px 8px 8px 8px;
        padding: 5px 5px 5px 5px;
        border: 1px solid dimgray;
        border-radius: 20px;
      }`;
    const styleElement = document.createElement('style');
    styleElement.textContent = CSS_STYLING_STRING;
    this.#shadow.append(styleElement);
  }

  connectedCallback() {
    console.log('WebComponent CardGoods connected.');
  }

  disconnectedCallback() {
    console.log('WebComponent CardGoods disconnected.');
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
