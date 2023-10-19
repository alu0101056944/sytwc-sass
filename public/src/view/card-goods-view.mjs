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
  #originalSlot = undefined;
  #shadow = undefined;
  #mainDiv = undefined;

  /** @private */
  #amountOfPlaceholderCards = undefined;
  #cardHeight = undefined;
  #cardWidth = undefined;

  constructor() {
    const template = this.#defineTemplate();
    const templateContent = template.content;
    const templateContentClone = templateContent.cloneNode(true);
    this.#originalSlot = this.#getSlotIn(templateContentClone);
    this.#originalSlot.remove();
    this.#mainDiv = templateContentClone.querySelector('.examples');
    this.#appendSlotsIntoMainDiv();
    this.#shadow = this.attachShadow({mode: 'closed'});
    this.#shadow.append(templateContentClone);
    this.#setTemplateStyle();
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

  #setTemplateStyle() {
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

  updateCardAmount(oldAmount, newAmount) {
    const newAmount = parseInt(newValue, 10);
    let oldAmount;
    if (oldValue) {
      oldAmount = parseInt(oldValue, 10);
    } else {
      const initialValue = this.#amountOfPlaceholderCards;
      oldAmount = initialValue;
    }
    if (oldAmount < newAmount) {
      for (let i = oldAmount + 1; i <= newAmount; i++) {
        const newSlot = this.#originalSlot.cloneNode(true);
        newSlot.name = 'card-goods-slot' + i;
        this.#mainDiv.append(newSlot);
      }
    } else {
      for (let i = this.#amountOfPlaceholderCards; i >= newAmount; i--) {
        const slotToRemove = document.getElementById('card-goods-slot' + i);
        slotToRemove.remove();
      }
    }
    this.#amountOfPlaceholderCards = newAmount;
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
