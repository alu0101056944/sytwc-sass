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
 * Have an update method that is dispatched by the controller, which
 * gives the information. all the communication is done by events,
 * which is better than dependencies because we take advantage of a component
 * that is already in the arquitecture anyways instead of going our own way,
 * which would be the same than just passing the info by events.
 */

/**
 * Represents the html structure and the css style of dashboard with
 *    cards.
 */
export default class CardGoodsView {
  /** @private @constant */
  #originalSlot = undefined;
  #shadow = undefined;
  #mainDiv = undefined;

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

  update() {
    // controller is the one who updates.
    // but i dont want controller to have to specify all the info,
    // maybe have view get access to the model 
  }

  #updateLength() {
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
  }

  #appendSlotsIntoMainDiv() {
    for (let i = 1; i <= this.#amountOfPlaceholderCards; ++i) {
      const newSlot = this.#originalSlot.cloneNode(true);
      newSlot.name = 'card-goods-slot' + i;
      this.#mainDiv.append(newSlot);
    }
  }
}
