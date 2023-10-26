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
    for (let child of this.#placeholders[this.#amountOfPlaceholders - 1].children) {
      child.remove();
    }
    for (let i = this.#amountOfPlaceholders - 1; i > 0; i--) {
      for (let child of this.#placeholders[i - 1].children) {
        this.#placeholders[i].append(child);
      }
    }
    this.#placeholders[0].append(domElement);
  }

  /**
   * @param {object} infoObject with a domNode property for the element to insert
   *  and optionally with a scoringObject property that must have a getScore()
   *  so that it can get sorted by it.
   */
  insertContent(infoObject) {
    this.#placeholdersContentArray.unshift({
      domNode: infoObject.domNode,
      scoringObject: infoObject.scoringObject ?? { getScore: () => Math.floor(Math.random() * 10) },
    });
    this.update();
  }

  update() {
    this.#placeholdersContentArray.sort((a, b) => {
      return b.scoringObject.getScore() - a.scoringObject.getScore()
    });
    for (let i = 0; i < this.#amountOfPlaceholders; i++) {
      if (this.#placeholdersContentArray[i]) {
        this.pushToPlaceholder(this.#placeholdersContentArray[i].domNode);
      }
    }
  }

  setAmountOfPlaceholders(newAmountOfPlaceholders) {
    if (newAmountOfPlaceholders > this.#amountOfPlaceholders) {
      const INITIAL_AMOUNT = this.#amountOfPlaceholders;
      for (let i = 0; i < newAmountOfPlaceholders - INITIAL_AMOUNT; i++) {
        const newPlaceholder = this.#placeholderSample.cloneNode(true);
        this.#placeholders.push(newPlaceholder);
        this.#divContainer.append(newPlaceholder);
        this.updatePlaceholdersGeometry();
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

  updatePlaceholdersGeometry() {
    this.#setPlaceholderGeometry('width', `${this.#placeholdersWidth}`);
    this.#setPlaceholderGeometry('height', `${this.#placeholdersHeight}`);
  }

  /**
   * @param {string} sideName either width or height
   */
  #setPlaceholderGeometry(sideName, newValue) {
    const allPlaceholders = this.#divContainer.querySelectorAll('.placeholder');
    allPlaceholders.forEach((placeholder) => {
      placeholder.style[sideName] = /\d+$/.test(newValue) ? newValue + 'px' : newValue;
    });
  }

  getPlaceholdersHeight() {
    return this.#placeholdersHeight;
  }

  getPlaceholdersWidth() {
    return this.#placeholdersWidth;
  }

}
