/**
 * @author Marcos Barrios
 * @since 14_10_2023
 * @desc Represents the html structure and the css style of dashboard with
 *    cards.
 * @module CardGoodsView
 *
 */

'use strict';

import CardView from "./card-view.mjs";

/**
 * Represents the html structure and the css style of dashboard with
 *    cards.
 */
export default class CardGoodsView {
  /** @private @constant */
  #parent = undefined;
  #content = undefined;
  #placeholderSample = undefined;
  #divContainer = undefined;
  #placeholderContentArray = undefined;

  /** @private */
  #placeholdersHeight = undefined;
  #placeholdersWidth = undefined;
  #amountOfPlaceholders = undefined;

  constructor(parent) {
    this.#placeholderContentArray = [];
    this.#parent = parent;
    this.#placeholdersWidth = 200;
    this.#placeholdersHeight = 25;
    this.#amountOfPlaceholders = 0;
    this.#content = document
        .getElementById('card-goods-template')
        .content
        .cloneNode(true);
    this.#divContainer = this.#content.querySelector('.placeholders');
    this.#prepareTemplate();
    const cssLinkerNode = document.createElement('link');
    cssLinkerNode.setAttribute('rel', 'stylesheet');
    cssLinkerNode.setAttribute('href', 'styles/components/card-goods.css');
    cssLinkerNode.addEventListener('load', () => {
      console.log('CardGoodsView css style loaded.');
    });
    this.#parent.append(cssLinkerNode);
    this.#parent.append(this.#content);
  }

  #prepareTemplate() {
    this.#placeholderSample = this.#content.querySelectorAll('.placeholder')[0]
        .cloneNode(true);
    this.#content.querySelectorAll('.placeholder').forEach((e) => e.remove());
  }

  /**
   * Push a card content into 0 index in the placeholder content array.
   * @param {object} domElement A DOM element to insert into the placeholders
   *  array at index 0.
   */
  pushCardContents(domElement) {
    this.#placeholderContentArray.push(domElement);
  }

  setAmountOfPlaceholders(newAmountOfPlaceholders) {
    if (newAmountOfPlaceholders > this.#amountOfPlaceholders) {
      const INITIAL_AMOUNT = this.#amountOfPlaceholders;
      for (let i = 0; i < newAmountOfPlaceholders - INITIAL_AMOUNT; i++) {
        const newPlaceholder = this.#placeholderSample.cloneNode(true);
        this.#divContainer.append(newPlaceholder);
        this.#amountOfPlaceholders++;
      }
    } else if (newAmountOfPlaceholders < this.#amountOfPlaceholders) {
      const allPlaceholders = this.#divContainer.querySelectorAll('.placeholder');
      while (this.#amountOfPlaceholders > newAmountOfPlaceholders) {
        allPlaceholders[allPlaceholders.length - 1].remove();
        this.#amountOfPlaceholders--;
      }
    }
  }

  setPlaceholdersWidth(newWidth) {
    this.#setPlaceholderGeometry('width', newWidth);
    this.#placeholdersWidth = newWidth;
  }

  setPlaceholdersHeight(newHeight) {
    this.#setPlaceholderGeometry('height', newHeight);
    this.#placeholdersHeight = newHeight;
  }

  /**
   * @param {string} sideName either width or height
   */
  #setPlaceholderGeometry(sideName, newValue) {
    const allPlaceholders = this.#divContainer.querySelectorAll('.placeholder');
    allPlaceholders.forEach((placeeholder) => {
      placeeholder.style[sideName] = /\d+$/.test(newValue) ? newValue + 'px' : newValue;
    });
  }
}
