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
export default class CardGoodsView extends HTMLElement {
  /** @static */
  static observedAttributes = ['length', 'width', 'height'];

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
}
