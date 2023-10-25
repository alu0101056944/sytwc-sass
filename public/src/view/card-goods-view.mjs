/**
 * @author Marcos Barrios
 * @since 14_10_2023
 * @desc Represents the html structure and the css style of dashboard with
 *    placeholders.
 * @module CardGoodsView
 *
 */

'use strict';

/**
 * Represents the html structure and the css style of dashboard with
 *    placeholders.
 */
export default class CardGoodsView {
  /** @private @constant */
  #parent = undefined;
  #content = undefined;
  #placeholderSample = undefined;
  #divContainer = undefined;
  #placeholdersContentArray = undefined;
  #placeholders = undefined;

  /** @private */
  #placeholdersHeight = undefined;
  #placeholdersWidth = undefined;
  #amountOfPlaceholders = undefined;

  constructor(parent) {
    this.#parent = parent;
    this.#placeholdersContentArray = [];
    this.#placeholders = [];
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
    this.#placeholderSample.querySelector('slot').remove();
    this.#content.querySelectorAll('.placeholder').forEach((e) => e.remove());
  }

  /**
   * Push a card content into 0 index in the placeholder content array.
   * Some nodes from the html have slot initially because the template uses it
   * but once read, the template is removed the slots. purpose is to allow
   * the user to have initial inserts into placeholders from html.
   * @param {object} domElement A DOM element to insert into the placeholders
   *  array at index 0.
   */
  pushToPlaceholder(domElement) {
    domElement.removeAttribute('slot');
    for (let i = this.#amountOfPlaceholders - 1; i > 0; i--) {
      this.#placeholders[i].children.forEach(child => child.remove());
      this.#placeholders[i - 1].children.forEach(child => {
        this.#placeholders[i].append(child.cloneNode(true));
      });
    }
    this.#placeholders[0].children.forEach(child => child.remove());
    this.#placeholders[0].append(domElement);
    this.#placeholdersContentArray.push(domElement);
  }

  setAmountOfPlaceholders(newAmountOfPlaceholders) {
    if (newAmountOfPlaceholders > this.#amountOfPlaceholders) {
      const INITIAL_AMOUNT = this.#amountOfPlaceholders;
      for (let i = 0; i < newAmountOfPlaceholders - INITIAL_AMOUNT; i++) {
        const newPlaceholder = this.#placeholderSample.cloneNode(true);
        this.#placeholders.push(newPlaceholder);
        this.#divContainer.append(newPlaceholder);
        this.#amountOfPlaceholders++;
      }
    } else if (newAmountOfPlaceholders < this.#amountOfPlaceholders) {
      const allPlaceholders = this.#divContainer.querySelectorAll('.placeholder');
      while (this.#amountOfPlaceholders > newAmountOfPlaceholders) {
        allPlaceholders[allPlaceholders.length - 1].remove();
        this.#placeholders.pop();
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
