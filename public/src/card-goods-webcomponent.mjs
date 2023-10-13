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
    const template = this.#defineTemplate();
    const templateContent = template.content;
    const templateCloneContent = templateContent.cloneNode(true);
    this.#originalSlot = this.#getSlotIn(templateCloneContent);
    this.#originalSlot.remove();
    this.#mainDiv = templateCloneContent.querySelector('.examples');
    this.#appendSlotsIntoMainDiv();
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
    console.log('WebComponent CardGoods created.');
  }

  #defineTemplate() {
    const template = document.createElement('template');
    const content = template.content;
    const divOutermost = document.createElement('div');
    divOutermost.classList.add('examples');
    content.append(divOutermost);
    const slotForFutureDeletion = document.createElement('slot');
    divOutermost.append(slotForFutureDeletion);
    const divWithExample = document.createElement('div');
    divWithExample.classList.add('example');
    slotForFutureDeletion.append(divWithExample);
    return template;
  }

  #getSlotIn(templateContent) {
    const childSlots = templateContent.querySelectorAll('slot');
    const originalSlot = childSlots[0];
    if (!originalSlot) {
      throw new Error('Template does not have any slots.');
    }
    return originalSlot;
  }

  #appendSlotsIntoMainDiv() {
    for (let i = 1; i <= this.#amountOfPlaceholderCards; ++i) {
      const newSlot = this.#originalSlot.cloneNode(true);
      newSlot.name = 'card-goods-slot' + i;
      this.#mainDiv.append(newSlot);
    }
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
